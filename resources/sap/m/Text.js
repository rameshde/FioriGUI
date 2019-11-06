/*!
* OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(['./library','sap/ui/core/Core','sap/ui/core/Control','sap/ui/core/library','sap/ui/Device','sap/m/HyphenationSupport',"./TextRenderer"],function(l,C,a,c,D,H,T){"use strict";var b=c.TextAlign;var d=c.TextDirection;var W=l.WrappingType;var e=a.extend("sap.m.Text",{metadata:{interfaces:["sap.ui.core.IShrinkable","sap.ui.core.IFormContent","sap.m.IHyphenation"],library:"sap.m",properties:{text:{type:"string",defaultValue:'',bindable:"bindable"},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:d.Inherit},wrapping:{type:"boolean",group:"Appearance",defaultValue:true},wrappingType:{type:"sap.m.WrappingType",group:"Appearance",defaultValue:W.Normal},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:b.Begin},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},maxLines:{type:"int",group:"Appearance",defaultValue:null},renderWhitespace:{type:"boolean",group:"Appearance",defaultValue:false}},designtime:"sap/m/designtime/Text.designtime"}});e.prototype.normalLineHeight=1.2;e.prototype.cacheLineHeight=true;e.prototype.ellipsis='...';e.hasNativeLineClamp=("webkitLineClamp"in document.documentElement.style);e.setNodeValue=function(o,n){n=n||"";var f=o.childNodes;if(f.length===1&&f[0].nodeType===window.Node.TEXT_NODE){f[0].nodeValue=n;}else{o.textContent=n;}};e.prototype.getText=function(n){var t=this.getProperty("text");if(n){return t.replace(/\r\n|\n\r|\r/g,"\n");}return t;};e.prototype.onAfterRendering=function(){if(this.getVisible()&&this.hasMaxLines()&&!this.canUseNativeLineClamp()){if(C.isThemeApplied()){this.clampHeight();}else{C.attachThemeChanged(this._handleThemeLoad,this);}}};e.prototype._handleThemeLoad=function(){this.clampHeight();C.detachThemeChanged(this._handleThemeLoad,this);};e.prototype.hasMaxLines=function(){return(this.getWrapping()&&this.getMaxLines()>1);};e.prototype.getTextDomRef=function(){if(!this.getVisible()){return null;}if(this.hasMaxLines()){return this.getDomRef("inner");}return this.getDomRef();};e.prototype.canUseNativeLineClamp=function(){if(!e.hasNativeLineClamp){return false;}if(this.getTextDirection()==d.RTL){return false;}if(this.getTextDirection()==d.Inherit&&C.getConfiguration().getRTL()){return false;}return true;};e.prototype.getLineHeight=function(o){if(this.cacheLineHeight&&this._fLineHeight){return this._fLineHeight;}o=o||this.getTextDomRef();if(!o){return 0;}var s=window.getComputedStyle(o),L=s.lineHeight,f;if(/px$/i.test(L)){f=parseFloat(L);}else if(/^normal$/i.test(L)){f=parseFloat(s.fontSize)*this.normalLineHeight;}else{f=parseFloat(s.fontSize)*parseFloat(L);}if(!D.browser.firefox){f=Math.floor(f);}if(this.cacheLineHeight&&f){this._fLineHeight=f;}return f;};e.prototype.getClampHeight=function(o){o=o||this.getTextDomRef();return this.getMaxLines()*this.getLineHeight(o);};e.prototype.clampHeight=function(o){o=o||this.getTextDomRef();if(!o){return 0;}var m=this.getClampHeight(o);if(m){o.style.maxHeight=m+"px";}return m;};e.prototype.clampText=function(o,s,E){o=o||this.getTextDomRef();if(!o){return;}var i;var t=this.getText(true);var m=this.getClampHeight(o);s=s||0;E=E||t.length;e.setNodeValue(o,t.slice(0,E));if(o.scrollHeight>m){var S=o.style,h=S.height,f=this.ellipsis,g=f.length;S.height=m+"px";while((E-s)>g){i=(s+E)>>1;e.setNodeValue(o,t.slice(0,i-g)+f);if(o.scrollHeight>m){E=i;}else{s=i;}}if(o.scrollHeight>m&&s>0){i=s;o.textContent=t.slice(0,i-g)+f;}S.height=h;}return i;};e.prototype.getAccessibilityInfo=function(){return{description:this.getText()};};e.prototype.getTextsToBeHyphenated=function(){return{"main":this.getText(true)};};e.prototype.getDomRefsForHyphenatedTexts=function(){return{"main":this.getTextDomRef()};};H.mixInto(e.prototype);return e;});
