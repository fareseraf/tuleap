BOOMR_start=(new Date).getTime(),function(a){a.parent!==a&&document.getElementById("boomr-if-as")&&"script"===document.getElementById("boomr-if-as").nodeName.toLowerCase()&&(a=a.parent);var b,c,d,e=a.document;if(void 0===a.BOOMR&&(a.BOOMR={}),BOOMR=a.BOOMR,!BOOMR.version){BOOMR.version="0.9.1370961061",BOOMR.window=a,b={beacon_url:"",site_domain:a.location.hostname.replace(/.*?([^.]+\.[^.]+)\.?$/,"$1").toLowerCase(),user_ip:"",onloadfired:!1,handlers_attached:!1,events:{page_ready:[],page_unload:[],dom_loaded:[],visibility_changed:[],before_beacon:[],click:[]},vars:{},disabled_plugins:{},onclick_handler:function(c){var d;c||(c=a.event),c.target?d=c.target:c.srcElement&&(d=c.srcElement),3===d.nodeType&&(d=d.parentNode),d&&"OBJECT"===d.nodeName.toUpperCase()&&"application/x-shockwave-flash"===d.type||b.fireEvent("click",d)},fireEvent:function(a,b){var c,d,e;if(!this.events.hasOwnProperty(a))return!1;for(e=this.events[a],c=0;c<e.length;c++)d=e[c],d[0].call(d[2],b,d[1]);return!0},addListener:function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent("on"+b,c)}},c={t_start:BOOMR_start,t_end:null,utils:{objectToString:function(a,b){var d,c=[];if(!a||"object"!=typeof a)return a;void 0===b&&(b="\n	");for(d in a)Object.prototype.hasOwnProperty.call(a,d)&&c.push(encodeURIComponent(d)+"="+encodeURIComponent(a[d]));return c.join(b)},getCookie:function(a){if(!a)return null;a=" "+a+"=";var b,c;return c=" "+e.cookie+";",(b=c.indexOf(a))>=0?(b+=a.length,c=c.substring(b,c.indexOf(";",b))):null},setCookie:function(a,c,d){var f,g,h,i;return a&&b.site_domain?(f=this.objectToString(c,"&"),g=a+"="+f,h=[g,"path=/","domain="+b.site_domain],d&&(i=new Date,i.setTime(i.getTime()+1e3*d),i=i.toGMTString(),h.push("expires="+i)),g.length<4e3?(e.cookie=h.join("; "),f===this.getCookie(a)):!1):!1},getSubCookies:function(a){var b,c,d,e,f={};if(!a)return null;if(b=a.split("&"),0===b.length)return null;for(c=0,d=b.length;d>c;c++)e=b[c].split("="),e.push(""),f[decodeURIComponent(e[0])]=decodeURIComponent(e[1]);return f},removeCookie:function(a){return this.setCookie(a,{},0)},pluginConfig:function(a,b,c,d){var e,f=0;if(!b||!b[c])return!1;for(e=0;e<d.length;e++)void 0!==b[c][d[e]]&&(a[d[e]]=b[c][d[e]],f++);return f>0}},init:function(c){var d,f,g=["beacon_url","site_domain","user_ip"];for(c||(c={}),d=0;d<g.length;d++)void 0!==c[g[d]]&&(b[g[d]]=c[g[d]]);void 0!==c.log&&(this.log=c.log),this.log||(this.log=function(){});for(f in this.plugins)if(this.plugins.hasOwnProperty(f)){if(c[f]&&c[f].hasOwnProperty("enabled")&&c[f].enabled===!1){b.disabled_plugins[f]=1;continue}b.disabled_plugins[f]&&delete b.disabled_plugins[f],"function"==typeof this.plugins[f].init&&this.plugins[f].init(c)}return b.handlers_attached?this:(b.onloadfired||void 0!==c.autorun&&c.autorun===!1||(e.readyState&&"complete"===e.readyState?this.setImmediate(BOOMR.page_ready,null,null,BOOMR):a.onpagehide||null===a.onpagehide?b.addListener(a,"pageshow",BOOMR.page_ready):b.addListener(a,"load",BOOMR.page_ready)),b.addListener(a,"DOMContentLoaded",function(){b.fireEvent("dom_loaded")}),function(){var c=function(){b.fireEvent("visibility_changed")};e.webkitVisibilityState?b.addListener(e,"webkitvisibilitychange",c):e.msVisibilityState?b.addListener(e,"msvisibilitychange",c):e.visibilityState&&b.addListener(e,"visibilitychange",c),b.addListener(e,"mouseup",b.onclick_handler),a.onpagehide||null===a.onpagehide||b.addListener(a,"unload",function(){BOOMR.window=a=null})}(),b.handlers_attached=!0,this)},page_ready:function(){return b.onloadfired?this:(b.fireEvent("page_ready"),b.onloadfired=!0,this)},setImmediate:function(b,c,d,e){var f=function(){b.call(e||null,c,d||{}),f=null};a.setImmediate?a.setImmediate(f):a.msSetImmediate?a.msSetImmediate(f):a.webkitSetImmediate?a.webkitSetImmediate(f):a.mozSetImmediate?a.mozSetImmediate(f):setTimeout(f,10)},subscribe:function(c,d,e,f){var g,h,i,j;if(!b.events.hasOwnProperty(c))return this;for(i=b.events[c],g=0;g<i.length;g++)if(h=i[g],h[0]===d&&h[1]===e&&h[2]===f)return this;return i.push([d,e||{},f||null]),"page_ready"===c&&b.onloadfired&&this.setImmediate(d,null,e,f),"page_unload"===c&&(j=function(b){d&&d.call(f,b||a.event,e)},a.onpagehide||null===a.onpagehide?b.addListener(a,"pagehide",j):b.addListener(a,"unload",j),b.addListener(a,"beforeunload",j)),this},addVar:function(a,c){if("string"==typeof a)b.vars[a]=c;else if("object"==typeof a){var e,d=a;for(e in d)d.hasOwnProperty(e)&&(b.vars[e]=d[e])}return this},removeVar:function(a){var c,d;if(!arguments.length)return this;for(d=1===arguments.length&&"[object Array]"===Object.prototype.toString.apply(a)?a:arguments,c=0;c<d.length;c++)b.vars.hasOwnProperty(d[c])&&delete b.vars[d[c]];return this},sendBeacon:function(){var c,d,f,g=0;for(c in this.plugins)if(this.plugins.hasOwnProperty(c)){if(b.disabled_plugins[c])continue;if(!this.plugins[c].is_complete())return this}if(b.vars.v=BOOMR.version,b.vars.u=e.URL.replace(/#.*/,""),a!==window&&(b.vars["if"]=""),b.fireEvent("before_beacon",b.vars),!b.beacon_url)return this;d=[];for(c in b.vars)b.vars.hasOwnProperty(c)&&(g++,d.push(encodeURIComponent(c)+"="+(void 0===b.vars[c]||null===b.vars[c]?"":encodeURIComponent(b.vars[c]))));return d=b.beacon_url+(b.beacon_url.indexOf("?")>-1?"&":"?")+d.join("&"),BOOMR.debug("Sending url: "+d.replace(/&/g,"\n	")),g&&(f=new Image,f.src=d),this}},delete BOOMR_start,function(){var a=function(a){return function(b,c){return this.log(b,a,"boomerang"+(c?"."+c:"")),this}};c.debug=a("debug"),c.info=a("info"),c.warn=a("warn"),c.error=a("error")}(),a.YAHOO&&a.YAHOO.widget&&a.YAHOO.widget.Logger?c.log=a.YAHOO.log:a.Y&&a.Y.log?c.log=a.Y.log:"object"==typeof console&&void 0!==console.log&&(c.log=function(a,b,c){console.log(c+": ["+b+"] "+a)});for(d in c)c.hasOwnProperty(d)&&(BOOMR[d]=c[d]);BOOMR.plugins=BOOMR.plugins||{}}}(window),function(){var a,b;BOOMR=BOOMR||{},BOOMR.plugins=BOOMR.plugins||{},b=[{name:"image-0.png",size:11483,timeout:1400},{name:"image-1.png",size:40658,timeout:1200},{name:"image-2.png",size:164897,timeout:1300},{name:"image-3.png",size:381756,timeout:1500},{name:"image-4.png",size:1234664,timeout:1200},{name:"image-5.png",size:4509613,timeout:1200},{name:"image-6.png",size:9084559,timeout:1200}],b.end=b.length,b.start=0,b.l={name:"image-l.gif",size:35,timeout:1e3},a={base_url:"",timeout:15e3,nruns:5,latency_runs:10,user_ip:"",cookie_exp:604800,cookie:"BA",results:[],latencies:[],latency:null,runs_left:0,aborted:!1,complete:!0,running:!1,initialized:!1,ncmp:function(a,b){return a-b},iqr:function(a){var c,d,e,g,b=a.length-1,f=[];for(c=(a[Math.floor(.25*b)]+a[Math.ceil(.25*b)])/2,d=(a[Math.floor(.75*b)]+a[Math.ceil(.75*b)])/2,e=1.5*(d-c),b++,g=0;b>g&&a[g]<d+e;g++)a[g]>c-e&&f.push(a[g]);return f},calc_latency:function(){var a,b,e,f,g,h,i,c=0,d=0;for(i=this.iqr(this.latencies.sort(this.ncmp)),b=i.length,BOOMR.debug(i,"bw"),a=1;b>a;a++)c+=i[a],d+=i[a]*i[a];return b--,e=Math.round(c/b),g=Math.sqrt(d/b-c*c/(b*b)),h=(1.96*g/Math.sqrt(b)).toFixed(2),g=g.toFixed(2),b=i.length-1,f=Math.round((i[Math.floor(b/2)]+i[Math.ceil(b/2)])/2),{mean:e,median:f,stddev:g,stderr:h}},calc_bw:function(){var a,c,e,l,m,n,o,p,q,r,s,t,u,v,d=0,f=[],g=[],h=0,i=0,j=0,k=0,w=[];for(a=0;a<this.nruns;a++)if(this.results[a]&&this.results[a].r)for(e=this.results[a].r,t=0,c=e.length-1;c>=0&&3>t&&e[c];c--)null!==e[c].t&&(d++,t++,u=1e3*b[c].size/e[c].t,f.push(u),v=1e3*b[c].size/(e[c].t-this.latency.mean),g.push(v),e[c].t<this.latency.mean&&w.push(c+"_"+e[c].t));for(BOOMR.debug("got "+d+" readings","bw"),BOOMR.debug("bandwidths: "+f,"bw"),BOOMR.debug("corrected: "+g,"bw"),f.length>3?(f=this.iqr(f.sort(this.ncmp)),g=this.iqr(g.sort(this.ncmp))):(f=f.sort(this.ncmp),g=g.sort(this.ncmp)),BOOMR.debug("after iqr: "+f,"bw"),BOOMR.debug("corrected: "+g,"bw"),d=Math.max(f.length,g.length),a=0;d>a;a++)a<f.length&&(h+=f[a],i+=Math.pow(f[a],2)),a<g.length&&(j+=g[a],k+=Math.pow(g[a],2));return d=f.length,l=Math.round(h/d),m=Math.sqrt(i/d-Math.pow(h/d,2)),n=Math.round(1.96*m/Math.sqrt(d)),m=Math.round(m),d=f.length-1,o=Math.round((f[Math.floor(d/2)]+f[Math.ceil(d/2)])/2),d=g.length,p=Math.round(j/d),q=Math.sqrt(k/d-Math.pow(j/d,2)),r=(1.96*q/Math.sqrt(d)).toFixed(2),q=q.toFixed(2),d=g.length-1,s=Math.round((g[Math.floor(d/2)]+g[Math.ceil(d/2)])/2),BOOMR.debug("amean: "+l+", median: "+o,"bw"),BOOMR.debug("corrected amean: "+p+", "+"median: "+s,"bw"),{mean:l,stddev:m,stderr:n,median:o,mean_corrected:p,stddev_corrected:q,stderr_corrected:r,median_corrected:s,debug_info:w}},defer:function(a){var b=this;return setTimeout(function(){a.call(b),b=null},10)},load_img:function(a,c,d){var e=this.base_url+b[a].name+"?t="+(new Date).getTime()+Math.random(),f=0,g=0,h=new Image,i=this;h.onload=function(){h.onload=h.onerror=null,h=null,clearTimeout(f),d&&d.call(i,a,g,c,!0),i=d=null},h.onerror=function(){h.onload=h.onerror=null,h=null,clearTimeout(f),d&&d.call(i,a,g,c,!1),i=d=null},f=setTimeout(function(){d&&d.call(i,a,g,c,null)},b[a].timeout+Math.min(400,this.latency?this.latency.mean:400)),g=(new Date).getTime(),h.src=e},lat_loaded:function(a,b,c,d){if(c===this.latency_runs+1){if(null!==d){var e=(new Date).getTime()-b;this.latencies.push(e)}0===this.latency_runs&&(this.latency=this.calc_latency()),this.defer(this.iterate)}},img_loaded:function(a,c,d,e){if(d===this.runs_left+1&&!this.results[this.nruns-d].r[a]){if(null===e)return this.results[this.nruns-d].r[a+1]={t:null,state:null,run:d},void 0;var f={start:c,end:(new Date).getTime(),t:null,state:e,run:d};e&&(f.t=f.end-f.start),this.results[this.nruns-d].r[a]=f,a>=b.end-1||void 0!==this.results[this.nruns-d].r[a+1]?(BOOMR.debug(this.results[this.nruns-d],"bw"),d===this.nruns&&(b.start=a),this.defer(this.iterate)):this.load_img(a+1,d,this.img_loaded)}},finish:function(){this.latency||(this.latency=this.calc_latency());var a=this.calc_bw(),b={bw:a.median_corrected,bw_err:parseFloat(a.stderr_corrected,10),lat:this.latency.mean,lat_err:parseFloat(this.latency.stderr,10),bw_time:Math.round((new Date).getTime()/1e3)};BOOMR.addVar(b),a.debug_info.length>0&&BOOMR.addVar("bw_debug",a.debug_info.join(",")),!isNaN(b.bw)&&b.bw>0&&BOOMR.utils.setCookie(this.cookie,{ba:Math.round(b.bw),be:b.bw_err,l:b.lat,le:b.lat_err,ip:this.user_ip,t:b.bw_time},this.user_ip?this.cookie_exp:0),this.complete=!0,BOOMR.sendBeacon(),this.running=!1},iterate:function(){return this.aborted?!1:(this.runs_left?this.latency_runs?this.load_img("l",this.latency_runs--,this.lat_loaded):(this.results.push({r:[]}),this.load_img(b.start,this.runs_left--,this.img_loaded)):this.finish(),void 0)},setVarsFromCookie:function(a){var b=parseInt(a.ba,10),c=parseFloat(a.be,10),d=parseInt(a.l,10)||0,e=parseFloat(a.le,10)||0,f=a.ip.replace(/\.\d+$/,"0"),g=parseInt(a.t,10),h=this.user_ip.replace(/\.\d+$/,"0"),i=Math.round((new Date).getTime()/1e3);return f===h&&g>=i-this.cookie_exp&&b>0?(this.complete=!0,BOOMR.addVar({bw:b,lat:d,bw_err:c,lat_err:e}),!0):!1}},BOOMR.plugins.BW={init:function(c){var d;return a.initialized?this:(BOOMR.utils.pluginConfig(a,c,"BW",["base_url","timeout","nruns","cookie","cookie_exp"]),c&&c.user_ip&&(a.user_ip=c.user_ip),a.base_url?(b.start=0,a.runs_left=a.nruns,a.latency_runs=10,a.results=[],a.latencies=[],a.latency=null,a.complete=!1,a.aborted=!1,BOOMR.removeVar("ba","ba_err","lat","lat_err"),d=BOOMR.utils.getSubCookies(BOOMR.utils.getCookie(a.cookie)),d&&d.ba&&a.setVarsFromCookie(d)||(BOOMR.subscribe("page_ready",this.run,null,this),BOOMR.subscribe("page_unload",this.skip,null,this)),a.initialized=!0,this):this)},run:function(){return a.running||a.complete?this:"https:"===BOOMR.window.location.protocol?(BOOMR.info("HTTPS detected, skipping bandwidth test","bw"),a.complete=!0,BOOMR.sendBeacon(),this):(a.running=!0,setTimeout(this.abort,a.timeout),a.defer(a.iterate),this)},abort:function(){return a.aborted=!0,a.running&&a.finish(),this},skip:function(){return a.complete||(a.complete=!0,BOOMR.sendBeacon()),this},is_complete:function(){return a.complete}}}(),function(a){var c,b=a.document;BOOMR=BOOMR||{},BOOMR.plugins=BOOMR.plugins||{},c={initialized:!1,complete:!1,timers:{},cookie:"RT",cookie_exp:600,strict_referrer:!0,navigationType:0,navigationStart:void 0,responseStart:void 0,t_start:void 0,t_fb_approx:void 0,r:void 0,r2:void 0,setCookie:function(a,c){var d,e,f;return this.cookie?(f=BOOMR.utils.getSubCookies(BOOMR.utils.getCookie(this.cookie))||{},"ul"===a&&(f.r=b.URL.replace(/#.*/,"")),"cl"===a&&(c?f.nu=c:f.nu&&delete f.nu),c===!1&&delete f.nu,e=(new Date).getTime(),a&&(f[a]=e),BOOMR.debug("Setting cookie "+BOOMR.utils.objectToString(f),"rt"),BOOMR.utils.setCookie(this.cookie,f,this.cookie_exp)?(d=(new Date).getTime(),d-e>50&&(BOOMR.utils.removeCookie(this.cookie),BOOMR.error("took more than 50ms to set cookie... aborting: "+e+" -> "+d,"rt")),this):(BOOMR.error("cannot set start cookie","rt"),this)):this},initFromCookie:function(){var a;this.cookie&&(a=BOOMR.utils.getSubCookies(BOOMR.utils.getCookie(this.cookie)),a&&(a.s=Math.max(+a.ul||0,+a.cl||0),BOOMR.debug("Read from cookie "+BOOMR.utils.objectToString(a),"rt"),a.s&&a.r&&(this.r=a.r,BOOMR.debug(this.r+" =?= "+this.r2,"rt"),BOOMR.debug(a.s+" <? "+(+a.cl+15),"rt"),BOOMR.debug(a.nu+" =?= "+b.URL.replace(/#.*/,""),"rt"),!this.strict_referrer||this.r===this.r2||a.s<+a.cl+15&&a.nu===b.URL.replace(/#.*/,"")?(this.t_start=a.s,+a.hd>a.s&&(this.t_fb_approx=parseInt(a.hd,10))):this.t_start=this.t_fb_approx=void 0)))},checkPreRender:function(){return b.webkitVisibilityState&&"prerender"===b.webkitVisibilityState||b.msVisibilityState&&3===b.msVisibilityState?(BOOMR.plugins.RT.startTimer("t_load",this.navigationStart),BOOMR.plugins.RT.endTimer("t_load"),BOOMR.plugins.RT.startTimer("t_prerender",this.navigationStart),BOOMR.plugins.RT.startTimer("t_postrender"),BOOMR.subscribe("visibility_changed",BOOMR.plugins.RT.done,null,BOOMR.plugins.RT),!0):!1},initNavTiming:function(){var b,c,d;this.navigationStart||(c=a.performance||a.msPerformance||a.webkitPerformance||a.mozPerformance,c&&c.navigation&&(this.navigationType=c.navigation.type),c&&c.timing?b=c.timing:a.chrome&&a.chrome.csi&&a.chrome.csi().startE?(b={navigationStart:a.chrome.csi().startE},d="csi"):a.gtbExternal&&a.gtbExternal.startE()&&(b={navigationStart:a.gtbExternal.startE()},d="gtb"),b?(BOOMR.addVar("rt.start",d||"navigation"),this.navigationStart=b.navigationStart||b.fetchStart||void 0,this.responseStart=b.responseStart||void 0,navigator.userAgent.match(/Firefox\/[78]\./)&&(this.navigationStart=b.unloadEventStart||b.fetchStart||void 0)):BOOMR.warn("This browser doesn't support the WebTiming API","rt"))},page_unload:function(a){BOOMR.debug("Unload called with "+BOOMR.utils.objectToString(a),"rt"),this.setCookie("beforeunload"===a.type?"ul":"hd")},onclick:function(a){if(a){for(BOOMR.debug("Click called with "+a.nodeName,"rt");a&&"A"!==a.nodeName.toUpperCase();)a=a.parentNode;a&&"A"===a.nodeName.toUpperCase()&&(BOOMR.debug("passing through","rt"),this.setCookie("cl",a.href))}},domloaded:function(){BOOMR.plugins.RT.endTimer("t_domloaded")}},BOOMR.plugins.RT={init:function(d){return BOOMR.debug("init RT","rt"),a!==BOOMR.window&&(a=BOOMR.window,b=a.document),BOOMR.utils.pluginConfig(c,d,"RT",["cookie","cookie_exp","strict_referrer"]),c.initFromCookie(),c.initialized?this:(c.complete=!1,c.timers={},BOOMR.subscribe("page_ready",this.done,null,this),BOOMR.subscribe("dom_loaded",c.domloaded,null,c),BOOMR.subscribe("page_unload",c.page_unload,null,c),BOOMR.subscribe("click",c.onclick,null,c),BOOMR.t_start&&(this.startTimer("boomerang",BOOMR.t_start),this.endTimer("boomerang",BOOMR.t_end),this.endTimer("boomr_fb",BOOMR.t_start)),c.r=c.r2=b.referrer.replace(/#.*/,""),c.initialized=!0,this)},startTimer:function(a,b){return a&&("t_page"===a&&this.endTimer("t_resp",b),c.timers[a]={start:"number"==typeof b?b:(new Date).getTime()},c.complete=!1),this},endTimer:function(a,b){return a&&(c.timers[a]=c.timers[a]||{},void 0===c.timers[a].end&&(c.timers[a].end="number"==typeof b?b:(new Date).getTime())),this},setTimer:function(a,b){return a&&(c.timers[a]={delta:b}),this},done:function(){BOOMR.debug("Called done","rt");var a,f,g,b=(new Date).getTime(),d={t_done:1,t_resp:1,t_page:1},e=0,h=[];if(c.complete=!1,c.initFromCookie(),c.initNavTiming(),c.checkPreRender())return this;c.responseStart?(this.endTimer("t_resp",c.responseStart),c.timers.t_load?this.setTimer("t_page",c.timers.t_load.end-c.responseStart):this.setTimer("t_page",b-c.responseStart)):c.timers.hasOwnProperty("t_page")?this.endTimer("t_page"):c.t_fb_approx&&(this.endTimer("t_resp",c.t_fb_approx),this.setTimer("t_page",b-c.t_fb_approx)),c.timers.hasOwnProperty("t_postrender")&&(this.endTimer("t_postrender"),this.endTimer("t_prerender")),c.navigationStart?a=c.navigationStart:c.t_start&&2!==c.navigationType?(a=c.t_start,BOOMR.addVar("rt.start","cookie")):(BOOMR.addVar("rt.start","none"),a=void 0),this.endTimer("t_done",b),BOOMR.removeVar("t_done","t_page","t_resp","r","r2","rt.tstart","rt.bstart","rt.end","t_postrender","t_prerender","t_load"),BOOMR.addVar("rt.tstart",a),BOOMR.addVar("rt.bstart",BOOMR.t_start),BOOMR.addVar("rt.end",c.timers.t_done.end);for(f in c.timers)if(c.timers.hasOwnProperty(f)){if(g=c.timers[f],"number"!=typeof g.delta&&("number"!=typeof g.start&&(g.start=a),g.delta=g.end-g.start),isNaN(g.delta))continue;d.hasOwnProperty(f)?BOOMR.addVar(f,g.delta):h.push(f+"|"+g.delta),e++}return e&&(BOOMR.addVar("r",c.r),c.r2!==c.r&&BOOMR.addVar("r2",c.r2),h.length&&BOOMR.addVar("t_other",h.join(","))),c.timers={},c.complete=!0,BOOMR.sendBeacon(),this},is_complete:function(){return c.complete}}}(window),BOOMR.t_end=(new Date).getTime(),BOOMR.t_end=(new Date).getTime();