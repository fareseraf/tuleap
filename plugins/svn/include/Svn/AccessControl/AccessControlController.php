<?php

/**
 * Copyright (c) Enalean, 2016. All rights reserved
 *
 * This file is a part of Tuleap.
 *
 * Tuleap is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Tuleap is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Tuleap. If not, see <http://www.gnu.org/licenses/
 */

namespace Tuleap\Svn\AccessControl;

use Tuleap\Svn\ServiceSvn;
use HTTPRequest;
use Tuleap\Svn\Repository\Repository;
use Tuleap\Svn\Repository\RepositoryManager;
use CSRFSynchronizerToken;

class AccessControlController {

    /** @var AccessFileHistoryCreator */
    private $access_file_creator;

    /** @var RepositoryManager */
    private $repository_manager;

    /** @var AccessFileHistoryFactory */
    private $access_file_factory;

    public function __construct(
        RepositoryManager $repository_manager,
        AccessFileHistoryFactory $access_file_factory,
        AccessFileHistoryCreator $access_file_creator
    ) {
        $this->repository_manager  = $repository_manager;
        $this->access_file_factory = $access_file_factory;
        $this->access_file_creator = $access_file_creator;
    }

    private function getToken(Repository $repository) {
        return new CSRFSynchronizerToken($this->getUrl($repository));
    }

    private function getUrl(Repository $repository) {
        return SVN_BASE_URL.'/?'. http_build_query(array(
            'group_id' => $repository->getProject()->getId(),
            'repo_id'  => $repository->getId(),
            'action'   => 'access-control'
        ));
    }

    public function displayAuthFile(ServiceSvn $service, HTTPRequest $request) {
        $repository = $this->repository_manager->getByIdAndProject($request->get('repo_id'), $request->getProject());

        $versions = array();
        foreach ($this->access_file_factory->getByRepository($repository) as $historised_accessfile) {
            $versions[] = array(
                'file_id' => $historised_accessfile->getId(),
                'version' => $historised_accessfile->getVersionNumber(),
                'date'    => format_date("Y-m-d", $historised_accessfile->getVersionDate())
            );
        }

        $current_version_number = $this->access_file_factory->getCurrentVersion($repository)->getVersionNumber();
        $last_version_number    = $this->access_file_factory->getLastVersion($repository)->getVersionNumber();

        $title = $GLOBALS['Language']->getText('global', 'Administration');

        $accessfile_reader = new AccessFileReader($repository);
        if ($request->exist('form_accessfile')) {
            $content = $request->get('form_accessfile');
        } else {
            $content = $accessfile_reader->readContentBlock($repository);
        }

        $service->renderInPage(
            $request,
            $title,
            'admin/edit_authfile',
            new AccessControlPresenter(
                    $this->getToken($repository),
                    $repository,
                    $title,
                    $accessfile_reader->readDefaultBlock($repository),
                    $content,
                    $versions,
                    $current_version_number,
                    $last_version_number
            )
        );
    }

    public function displayArchivedVersion(HTTPRequest $request) {
        $id         = $request->get('accessfile_history_id');
        $repository = $this->repository_manager->getByIdAndProject($request->get('repo_id'), $request->getProject());

        $access_file = $this->access_file_factory->getById($id, $repository);

        $GLOBALS['Response']->sendJSON(array('content' => $access_file->getContent()));
    }

    public function saveAuthFile(ServiceSvn $service, HTTPRequest $request){
        $repository = $this->repository_manager->getByIdAndProject($request->get('repo_id'), $request->getProject());
        $this->getToken($repository)->check();

        try {
            if ($request->exist('submit_other_version')) {
                $this->access_file_creator->useAnOldVersion($repository, $request->get('version_selected'));
            } else {
                $this->access_file_creator->create($repository, $request->get('form_accessfile'), $_SERVER['REQUEST_TIME']);
            }
            $GLOBALS['Response']->redirect($this->getUrl($repository));
        } catch (CannotCreateAccessFileHistoryException $exception) {
            $GLOBALS['Response']->addFeedback('error', $GLOBALS['Language']->getText('plugin_svn_admin','update_fail'));
            $GLOBALS['Response']->addFeedback('error', $exception->getMessage());
            $this->displayAuthFile($service, $request);
        }
    }
}
