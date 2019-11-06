/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./Filter','sap/base/Log','sap/ui/Device'],function(F,L,D){"use strict";if(!String.prototype.normalize&&!D.browser.mobile){var N=sap.ui.requireSync('sap/base/strings/NormalizePolyfill');N.apply();}var a={};a.groupFilters=function(f){var c,s={},r=[];function g(f,A){if(f.length===1){return f[0];}if(f.length>1){return new F(f,A);}return undefined;}if(!f||f.length===0){return undefined;}if(f.length===1){return f[0];}f.forEach(function(o){if(o.aFilters||o.sVariable){c="__multiFilter";}else{c=o.sPath;}if(!s[c]){s[c]=[];}s[c].push(o);});for(var p in s){r.push(g(s[p],p==="__multiFilter"));}return g(r,true);};a.combineFilters=function(f,A){var g,G,o,c=[];g=this.groupFilters(f);G=this.groupFilters(A);if(g){c.push(g);}if(G){c.push(G);}if(c.length===1){o=c[0];}else if(c.length>1){o=new F(c,true);}return o;};a.apply=function(d,f,g,n){var o=Array.isArray(f)?this.groupFilters(f):f,b,t=this;if(n){if(!n[true]){n[true]={};n[false]={};}}else{n={"true":{},"false":{}};}this._normalizeCache=n;if(!d){return[];}else if(!o){return d.slice();}b=d.filter(function(r){return t._evaluateFilter(o,r,g);});return b;};a._evaluateFilter=function(f,r,g){var v,t;if(f.aFilters){return this._evaluateMultiFilter(f,r,g);}v=g(r,f.sPath);t=this.getFilterFunction(f);if(!f.fnCompare||f.bCaseSensitive!==undefined){v=this.normalizeFilterValue(v,f.bCaseSensitive);}if(v!==undefined&&t(v)){return true;}return false;};a._evaluateMultiFilter=function(m,r,g){var t=this,A=!!m.bAnd,f=m.aFilters,o,M,R=A;for(var i=0;i<f.length;i++){o=f[i];M=t._evaluateFilter(o,r,g);if(A){if(!M){R=false;break;}}else{if(M){R=true;break;}}}return R;};a.normalizeFilterValue=function(v,c){if(typeof v=="string"){var r;if(c===undefined){c=false;}r=this._normalizeCache[c][v];if(r!==undefined){return r;}r=v;if(!c){if(String.prototype.normalize&&(D.browser.msie||D.browser.edge)){r=r.normalize("NFKD");}r=r.toUpperCase();}if(String.prototype.normalize){r=r.normalize("NFC");}this._normalizeCache[c][v]=r;return r;}if(v instanceof Date){return v.getTime();}return v;};a.getFilterFunction=function(f){if(f.fnTest){return f.fnTest;}var v=f.oValue1,V=f.oValue2,c=f.fnCompare||F.defaultComparator;if(!f.fnCompare||f.bCaseSensitive!==undefined){v=v?this.normalizeFilterValue(v,f.bCaseSensitive):v;V=V?this.normalizeFilterValue(V,f.bCaseSensitive):V;}var C=function(d){if(d==null){return false;}if(typeof d!="string"){throw new Error("Only \"String\" values are supported for the FilterOperator: \"Contains\".");}return d.indexOf(v)!=-1;};var s=function(d){if(d==null){return false;}if(typeof d!="string"){throw new Error("Only \"String\" values are supported for the FilterOperator: \"StartsWith\".");}return d.indexOf(v)==0;};var e=function(d){if(d==null){return false;}if(typeof d!="string"){throw new Error("Only \"String\" values are supported for the FilterOperator: \"EndsWith\".");}var p=d.lastIndexOf(v);if(p==-1){return false;}return p==d.length-v.length;};var b=function(d){return(c(d,v)>=0)&&(c(d,V)<=0);};switch(f.sOperator){case"EQ":f.fnTest=function(d){return c(d,v)===0;};break;case"NE":f.fnTest=function(d){return c(d,v)!==0;};break;case"LT":f.fnTest=function(d){return c(d,v)<0;};break;case"LE":f.fnTest=function(d){return c(d,v)<=0;};break;case"GT":f.fnTest=function(d){return c(d,v)>0;};break;case"GE":f.fnTest=function(d){return c(d,v)>=0;};break;case"BT":f.fnTest=b;break;case"NB":f.fnTest=function(d){return!b(d);};break;case"Contains":f.fnTest=C;break;case"NotContains":f.fnTest=function(d){return!C(d);};break;case"StartsWith":f.fnTest=s;break;case"NotStartsWith":f.fnTest=function(d){return!s(d);};break;case"EndsWith":f.fnTest=e;break;case"NotEndsWith":f.fnTest=function(d){return!e(d);};break;default:L.error("The filter operator \""+f.sOperator+"\" is unknown, filter will be ignored.");f.fnTest=function(d){return true;};}return f.fnTest;};return a;});
