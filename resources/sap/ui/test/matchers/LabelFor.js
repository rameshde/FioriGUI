/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/test/matchers/Matcher','sap/ui/test/matchers/I18NText'],function(M,I){"use strict";var i=new I();var N=["sap.ui.comp.navpopover.SmartLink","sap.m.Link","sap.m.Label","sap.m.Text"];var L=M.extend("sap.ui.test.matchers.LabelFor",{metadata:{publicMethods:["isMatching"],properties:{text:{type:"string"},modelName:{type:"string",defaultValue:"i18n"},key:{type:"string"},parameters:{type:"any"},propertyName:{type:"string",defaultValue:"text"}}},isMatching:function(c){var b;var p=sap.ui.test.Opa5.getPlugin();var m=this.getModelName();var l=this.getText();var P=this.getParameters();var s=this.getPropertyName();var k=this.getKey();if(l&&k){this._oLogger.error("Combination of text and key properties is not allowed");return false;}if(!l&&!k){this._oLogger.error("Text and key properties are not defined but exactly one is required");return false;}if(N.indexOf(c.getMetadata().getName())>-1){this._oLogger.error("Control cannot have an associated label according to HTML standard");return false;}var a=p.getMatchingControls({controlType:"sap.m.Label",visible:false});i.applySettings({key:k,modelName:m,parameters:P,propertyName:s});b=a.some(function(o){if(k&&i.isMatching(o)){return c.getId()===o.getLabelForRendering();}else if(l&&o.getText()===l){return c.getId()===o.getLabelForRendering();}});if(!b){var d=k?"I18N text key "+k:"text "+l;this._oLogger.debug("Control '"+c+"' does not have an associated label with "+d);}return b;}});return L;});
