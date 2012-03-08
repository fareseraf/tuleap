<?php
/**
 * Copyright (c) Enalean, 2012. All Rights Reserved.
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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Tuleap. If not, see <http://www.gnu.org/licenses/>.
 */

require_once(dirname(__FILE__).'/../../../include/Tracker/Hierarchy/Presenter.class.php');
require_once(dirname(__FILE__).'/../../../include/Tracker/Hierarchy/Controller.class.php');
require_once(dirname(__FILE__).'/../../Test_Tracker_Builder.php');
Mock::generate('Tracker');
Mock::generate('Tracker_Hierarchy_HierarchicalTrackerFactory');
Mock::generate('TrackerFactory');
Mock::generate('Tracker_Hierarchy_Dao');

if (!defined('TRACKER_BASE_URL')) {
    define('TRACKER_BASE_URL', '/plugins/tracker');
}

class Tracker_Hierarchy_ControllerTest extends TuleapTestCase {
    
    function setUp() {
        parent::setUp();
        
        $this->tracker_id           = 3;
        $this->tracker              = aTracker()->withId($this->tracker_id)->withName('Stories')->withProjectId(101)->build();
        $this->hierarchical_tracker = new Tracker_Hierarchy_HierarchicalTracker($this->tracker, array());
        $this->request              = new Codendi_Request(array());
        $this->tracker_factory      = new MockTrackerFactory();
        $this->dao                  = new MockTracker_Hierarchy_Dao();
        $this->factory              = new MockTracker_Hierarchy_HierarchicalTrackerFactory($this->tracker_factory, $this->dao);
        $this->redirect_url         = TRACKER_BASE_URL."/?tracker=$this->tracker_id&func=admin-hierarchy";
    }

    public function testEditListsAllChildren() {
        $possible_children = array('1' => aTracker()->withId(1)->withName('Bugs')->build(), 
                                   '2' => aTracker()->withId(2)->withName('Tasks')->build());
        
        $this->factory->setReturnValue('getPossibleChildren', $possible_children, array($this->hierarchical_tracker));
        $this->factory->setReturnValue('getHierarchy', array());

        ob_start();
        $controller = new Tracker_Hierarchy_Controller($this->request, $this->hierarchical_tracker, $this->factory, $this->dao);
        $controller->edit();
        $content = ob_get_clean();
        
        $this->assertContainsAll(array('value="1".*Bugs', 'value="2".*Tasks'), $content);
    }
   
    public function testEditDisplaysTheWholeHierarchy() {
        $hierarchy = array(
            array('name' => 'Sprints', 'id' => '', 'children' => array(
                array('name' => 'Stories', 'id' => '', 'children' => array(
                    array('name' => 'Tasks', 'id' => '', 'children' => array()),
                    array('name' => 'Bugs', 'id' => '', 'children' => array()),
                )),
            ))
        );
        $this->factory->setReturnValue('getPossibleChildren', array());
        $this->factory->expectOnce('getHierarchy', array($this->tracker));
        $this->factory->setReturnValue('getHierarchy', $hierarchy);
        
        ob_start();
        $controller = new Tracker_Hierarchy_Controller($this->request, $this->hierarchical_tracker, $this->factory, $this->dao);
        $controller->edit();
        $content = ob_get_clean();
        
        $this->assertContainsAll(array('Sprint', 'Stories', 'Tasks', 'Bugs'), $content);
    }
    
    public function testEditProvidesUrlsToTheTrackersInTheHierarchy() {
        $sprints_id = 666;
        $stories_id = 999;
        $hierarchy = array(
            array('name' => 'Sprints', 'id' => $sprints_id, 'children' => array(
                array('name' => 'Stories', 'id' => $stories_id, 'children' => array())
            ))
        );
        $this->factory->setReturnValue('getPossibleChildren', array());
        $this->factory->expectOnce('getHierarchy', array($this->tracker));
        $this->factory->setReturnValue('getHierarchy', $hierarchy);
        
        ob_start();
        $controller = new Tracker_Hierarchy_Controller($this->request, $this->hierarchical_tracker, $this->factory, $this->dao);
        $controller->edit();
        $content = ob_get_clean();

        $this->assertPattern("%/plugins/tracker/\?tracker=$sprints_id&func=admin-hierarchy%", $content);
        $this->assertPattern("%/plugins/tracker/\?tracker=$stories_id&func=admin-hierarchy%", $content);
    }
    
    public function testUpdateHappyPathShouldCallDaoToSaveHierarchy() {
        $children_ids = array('1', '2');
        
        $this->request->set('children', $children_ids);
        $this->dao->expectOnce('updateChildren', array($this->tracker_id, $children_ids));
        
        $GLOBALS['Response']->expectOnce('redirect', array($this->redirect_url));
        
        $controller = new Tracker_Hierarchy_Controller($this->request, $this->hierarchical_tracker, $this->factory, $this->dao);
        $controller->update();
    }
    
    public function testWeCanDeleteAllChildrenByNOTprovidingAnArrayOfIds() {
        
        $this->dao->expectOnce('deleteAllChildren', array($this->tracker_id));
        
        $GLOBALS['Response']->expectOnce('redirect', array($this->redirect_url));
        
        $controller = new Tracker_Hierarchy_Controller($this->request, $this->hierarchical_tracker, $this->factory, $this->dao);
        $controller->update();
    }
    
    public function testUpdateWithNastyRequestShouldThrowErrors() {
        $this->request->set('children', array('DROP DATABASE http://xkcd.com/327/'));
        $this->dao->expectNever('updateChildren');
        
        $GLOBALS['Response']->expectOnce('addFeedback', array('error', '*'));
        $GLOBALS['Response']->expectOnce('redirect', array($this->redirect_url));
        
        $controller = new Tracker_Hierarchy_Controller($this->request, $this->hierarchical_tracker, $this->factory, $this->dao);
        $controller->update();
    }
    
    private function assertContainsAll($expected_strings, $actual_text) {
        foreach($expected_strings as $string) {
            $this->assertPattern('/'.$string.'/', $actual_text);
        }
    }
}

?>
