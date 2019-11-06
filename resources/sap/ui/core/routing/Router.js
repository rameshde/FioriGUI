/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/library','sap/ui/base/EventProvider','./HashChanger','./Route','./Views','./Targets','./History','sap/ui/thirdparty/crossroads',"sap/base/util/UriParameters","sap/base/util/deepEqual","sap/base/Log","sap/ui/thirdparty/jquery"],function(l,E,H,R,V,T,a,c,U,d,L,q){"use strict";var r={};var b=E.extend("sap.ui.core.routing.Router",{constructor:function(o,C,O,t,f){E.apply(this);this._oConfig=C||{};this._oRouter=c.create();this._oRouter.ignoreState=true;this._oRoutes={};this._oOwner=O;function h(){if(U.fromQuery(window.location.search).get("sap-ui-xx-asyncRouting")==="true"){L.warning("Activation of async view loading in routing via url parameter is only temporarily supported and may be removed soon","Router");return true;}return false;}this._oConfig._async=this._oConfig.async;if(this._oConfig._async===undefined){this._oConfig._async=h();}this._oViews=new V({component:O,async:this._oConfig._async});if(t){this._oTargets=this._createTargets(this._oConfig,t);}var i=this,j;if(!o){o={};}if(Array.isArray(o)){j=o;o={};j.forEach(function(k){o[k.name]=k;});}q.each(o,function(s,k){if(k.name===undefined){k.name=s;}i.addRoute(k);});this._oRouter.bypassed.add(q.proxy(this._onBypassed,this));if(f){this.setHashChanger(f);}},addRoute:function(C,p){if(!C.name){L.error("A name has to be specified for every route",this);}if(this._oRoutes[C.name]){L.error("Route with name "+C.name+" already exists",this);}this._oRoutes[C.name]=this._createRoute(this,C,p);},parse:function(n){if(this._oRouter){this._oRouter.parse(n);}else{L.warning("This router has been destroyed while the hash changed. No routing events where fired by the destroyed instance.",this);}},initialize:function(i){var t=this;if(!this.oHashChanger){this.oHashChanger=H.getInstance().createRouterHashChanger();}if(this._bIsInitialized){L.warning("Router is already initialized.",this);return this;}this._bIsInitialized=true;this._bLastHashReplaced=false;this._bHashChangedAfterTitleChange=false;this.fnHashChanged=function(f){t.parse(f.getParameter("newHash"));t._bHashChangedAfterTitleChange=true;};if(!this.oHashChanger){L.error("navTo of the router is called before the router is initialized. If you want to replace the current hash before you initialize the router you may use getUrl and use replaceHash of the Hashchanger.",this);return this;}if(this._oTargets){var h=this._oRoutes[this._oConfig.homeRoute];this._oTargets.attachTitleChanged(function(f){var j=f.getParameters();if(h&&e(j.name,h._oConfig.name)){j.isHome=true;}this.fireTitleChanged(j);},this);this._aHistory=[];var o=h&&g(this._oOwner,h);if(o){this._aHistory.push(o);}}this.oHashChanger.init();this.oHashChanger.attachEvent("hashChanged",this.fnHashChanged);if(!i){this.parse(this.oHashChanger.getHash());}return this;},stop:function(){if(!this._bIsInitialized){L.warning("Router is not initialized. But it got stopped",this);}if(this.fnHashChanged){this.oHashChanger.detachEvent("hashChanged",this.fnHashChanged);}if(this.fnHashReplaced){this.oHashChanger.detachEvent("hashReplaced",this.fnHashReplaced);}if(this._matchedRoute){this._matchedRoute.fireEvent("switched");this._matchedRoute=null;}this._bIsInitialized=false;return this;},isStopped:function(){return this._bIsInitialized===false;},isInitialized:function(){return this._bIsInitialized===true;},getHashChanger:function(){return this.oHashChanger;},setHashChanger:function(h){if(this.oHashChanger){L.warning("The Router already has a HashChanger set and this call is ignored");}else{this.oHashChanger=h;}return this;},destroy:function(){if(this.bIsDestroyed){return this;}E.prototype.destroy.apply(this);if(this._oViews){this._oViews.destroy();this._oViews=null;}if(!this._bIsInitialized){L.info("Router is not initialized, but got destroyed.",this);}if(this.fnHashChanged){this.oHashChanger.detachEvent("hashChanged",this.fnHashChanged);}if(this.fnHashReplaced){this.oHashChanger.detachEvent("hashReplaced",this.fnHashReplaced);}this._oRouter.removeAllRoutes();this._oRouter=null;q.each(this._oRoutes,function(i,o){o.destroy();});this._oRoutes=null;this._oConfig=null;if(this._oTargets){this._oTargets.destroy();this._oTargets=null;}delete this._bIsInitialized;this.bIsDestroyed=true;return this;},getURL:function(n,p){if(p===undefined){p={};}var o=this.getRoute(n);if(!o){L.warning("Route with name "+n+" does not exist",this);return;}return o.getURL(p);},match:function(h){return Object.keys(this._oRoutes).some(function(s){return this._oRoutes[s].match(h);}.bind(this));},getRoute:function(n){return this._oRoutes[n];},getViews:function(){return this._oViews;},_createTargets:function(C,t){return new T({views:this._oViews,config:C,targets:t});},_createRoute:function(o,C,p){return new R(o,C,p);},getView:function(v,s,f){L.warning("Deprecated API Router#getView called - use Router#getViews instead.",this);var o=this._oViews._getViewWithGlobalId({viewName:v,type:s,id:f});this.fireViewCreated({view:o,viewName:v,type:s});return o;},setView:function(v,o){this._oViews.setView(v,o);return this;},navTo:function(n,p,f){var u=this.getURL(n,p);if(u===undefined){L.error("Can not navigate to route with name "+n+" because the route does not exist");}if(f){this._bLastHashReplaced=true;this.oHashChanger.replaceHash(u);}else{this.oHashChanger.setHash(u);}return this;},getTargets:function(){return this._oTargets;},getTarget:function(n){return this._oTargets.getTarget(n);},attachRouteMatched:function(D,f,o){this.attachEvent("routeMatched",D,f,o);return this;},detachRouteMatched:function(f,o){this.detachEvent("routeMatched",f,o);return this;},fireRouteMatched:function(p){this.fireEvent("routeMatched",p);if(b._interceptRouteMatched){b._interceptRouteMatched(this._oConfig.controlId,this);}return this;},attachBeforeRouteMatched:function(D,f,o){this.attachEvent("beforeRouteMatched",D,f,o);return this;},detachBeforeRouteMatched:function(f,o){this.detachEvent("beforeRouteMatched",f,o);return this;},fireBeforeRouteMatched:function(p){this.fireEvent("beforeRouteMatched",p);return this;},attachViewCreated:function(D,f,o){this.attachEvent("viewCreated",D,f,o);return this;},detachViewCreated:function(f,o){this.detachEvent("viewCreated",f,o);return this;},fireViewCreated:function(p){this.fireEvent("viewCreated",p);return this;},attachRoutePatternMatched:function(D,f,o){this.attachEvent("routePatternMatched",D,f,o);return this;},detachRoutePatternMatched:function(f,o){this.detachEvent("routePatternMatched",f,o);return this;},fireRoutePatternMatched:function(p){this.fireEvent("routePatternMatched",p);return this;},attachBypassed:function(D,f,o){return this.attachEvent(b.M_EVENTS.BYPASSED,D,f,o);},detachBypassed:function(f,o){return this.detachEvent(b.M_EVENTS.BYPASSED,f,o);},fireBypassed:function(p){return this.fireEvent(b.M_EVENTS.BYPASSED,p);},attachTitleChanged:function(D,f,o){this.attachEvent(b.M_EVENTS.TITLE_CHANGED,D,f,o);return this;},detachTitleChanged:function(f,o){return this.detachEvent(b.M_EVENTS.TITLE_CHANGED,f,o);},fireTitleChanged:function(p){var D=a.getInstance().getDirection(),h=this.oHashChanger.getHash(),f=l.routing.HistoryDirection,o=this._aHistory[this._aHistory.length-1],n;if(D===f.Backwards&&o&&!o.isHome){if(o&&o.title!==p.title){this._aHistory.pop();}}else if(o&&o.hash==h){o.title=p.title;this._aHistory.some(function(j,i,k){if(i<k.length-1&&d(j,o)){return k.splice(i,1);}});}else{if(this._bLastHashReplaced){this._aHistory.pop();}n={hash:h,title:p.title};this._aHistory.some(function(j,i,k){if(d(j,n)){return k.splice(i,1);}});this._aHistory.push(n);}p.history=this._aHistory.slice(0,-1);this.fireEvent(b.M_EVENTS.TITLE_CHANGED,p);this._bLastHashReplaced=false;return this;},getTitleHistory:function(){return this._aHistory||[];},register:function(n){r[n]=this;return this;},_onBypassed:function(h){var f=function(){this.fireBypassed({hash:h});}.bind(this);if(this._oConfig.bypassed){var o=this._oTargets.display(this._oConfig.bypassed.target,{hash:h});if(o instanceof Promise){o.then(f);return;}}f();},_isAsync:function(){return this._oConfig._async;},metadata:{publicMethods:["initialize","getURL","register","getRoute"]}});function e(s,h){return h&&h.indexOf(s)>-1;}function g(o,h){var s=h.getPattern(),A=o&&o.getManifestEntry("sap.app/title");if(s===""||(s!==undefined&&!/({.*})+/.test(s))){return{hash:s,isHome:true,title:A};}else{L.error("Routes with dynamic parts cannot be resolved as home route.");}}b.M_EVENTS={BEFORE_ROUTE_MATCHED:"beforeRouteMatched",ROUTE_MATCHED:"routeMatched",ROUTE_PATTERN_MATCHED:"routePatternMatched",VIEW_CREATED:"viewCreated",BYPASSED:"bypassed",TITLE_CHANGED:"titleChanged"};b._interceptRouteMatched=undefined;b.getRouter=function(n){return r[n];};return b;});
