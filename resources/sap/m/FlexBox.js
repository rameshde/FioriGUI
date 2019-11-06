/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./FlexBoxStylingHelper','./FlexItemData','./library','sap/ui/core/Control','sap/ui/core/InvisibleRenderer','./FlexBoxRenderer','sap/ui/thirdparty/jquery'],function(F,a,l,C,I,b,q){"use strict";var B=l.BackgroundDesign;var c=l.FlexAlignContent;var d=l.FlexWrap;var e=l.FlexAlignItems;var f=l.FlexJustifyContent;var g=l.FlexRendertype;var h=l.FlexDirection;var j=C.extend("sap.m.FlexBox",{metadata:{library:"sap.m",properties:{height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:''},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:''},displayInline:{type:"boolean",group:"Appearance",defaultValue:false},direction:{type:"sap.m.FlexDirection",group:"Appearance",defaultValue:h.Row},fitContainer:{type:"boolean",group:"Appearance",defaultValue:false},renderType:{type:"sap.m.FlexRendertype",group:"Misc",defaultValue:g.Div},justifyContent:{type:"sap.m.FlexJustifyContent",group:"Appearance",defaultValue:f.Start},alignItems:{type:"sap.m.FlexAlignItems",group:"Appearance",defaultValue:e.Stretch},wrap:{type:"sap.m.FlexWrap",group:"Appearance",defaultValue:d.NoWrap},alignContent:{type:"sap.m.FlexAlignContent",group:"Appearance",defaultValue:c.Stretch},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:B.Transparent}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.core.Control",multiple:true,singularName:"item"}},designtime:"sap/m/designtime/FlexBox.designtime",dnd:{draggable:false,droppable:true}}});j.prototype.init=function(){if(this instanceof sap.m.HBox&&(this.getDirection()!==h.Row||this.getDirection()!==h.RowReverse)){this.setDirection('Row');}if(this instanceof sap.m.VBox&&(this.getDirection()!==h.Column||this.getDirection()!==h.ColumnReverse)){this.setDirection('Column');}this._oItemDelegate={onAfterRendering:this._onAfterItemRendering};};j.prototype.addItem=function(i){this.addAggregation("items",i);this._onItemInserted(i);return this;};j.prototype.insertItem=function(i,k){this.insertAggregation("items",i,k);this._onItemInserted(i);return this;};j.prototype.removeItem=function(i){var o=this.removeAggregation("items",i);this._onItemRemoved(o);return o;};j.prototype.removeAllItems=function(){var k=this.getItems();for(var i=0;i<k.length;i++){this._onItemRemoved(k[i]);}return this.removeAllAggregation("items");};j.prototype._onItemInserted=function(i){if(i&&!(i instanceof j)){i.attachEvent("_change",this._onItemChange,this);if(this.getRenderType()===g.Bare){i.addEventDelegate(this._oItemDelegate,i);}}};j.prototype._onItemRemoved=function(i){if(i&&!(i instanceof j)){i.detachEvent("_change",this._onItemChange,this);if(this.getRenderType()===g.Bare){i.removeEventDelegate(this._oItemDelegate,i);}}};j.prototype._onItemChange=function(o){if(o.getParameter("name")!=="visible"||(this.getRenderType()!==g.List&&this.getRenderType()!==g.Div)){return;}var i=sap.ui.getCore().byId(o.getParameter("id")),w=null;if(i.getLayoutData()){w=q(document.getElementById(i.getLayoutData().getId()));}else{w=q(document.getElementById(I.createInvisiblePlaceholderId(i))).parent();}if(o.getParameter("newValue")){w.removeClass("sapUiHiddenPlaceholder").removeAttr("aria-hidden");}else{w.addClass("sapUiHiddenPlaceholder").attr("aria-hidden","true");}};j.prototype._onAfterItemRendering=function(){var L=this.getLayoutData();if(L instanceof a){F.setFlexItemStyles(null,L);}};j.prototype.setRenderType=function(v){var o=this.getRenderType(),i=this.getItems();if(v===o){return this;}this.setProperty("renderType",v);if(o==="Bare"){i.forEach(this._onItemRemoved,this);}if(v==="Bare"){i.forEach(this._onItemInserted,this);}return this;};j.prototype.setDisplayInline=function(i){this.setProperty("displayInline",i,true);this.$().toggleClass("sapMFlexBoxInline",this.getDisplayInline());return this;};j.prototype.setDirection=function(v){this.setProperty("direction",v,true);if(this.getDirection()===h.Column||this.getDirection()===h.ColumnReverse){this.$().removeClass("sapMHBox").addClass("sapMVBox");}else{this.$().removeClass("sapMVBox").addClass("sapMHBox");}if(this.getDirection()===h.RowReverse||this.getDirection()===h.ColumnReverse){this.$().addClass("sapMFlexBoxReverse");}else{this.$().removeClass("sapMFlexBoxReverse");}return this;};j.prototype.setFitContainer=function(v){this.setProperty("fitContainer",v,true);this.$().toggleClass("sapMFlexBoxFit",this.getFitContainer());return this;};j.prototype.setWrap=function(v){var o=this.getWrap();this.setProperty("wrap",v,true);this.$().removeClass("sapMFlexBoxWrap"+o).addClass("sapMFlexBoxWrap"+this.getWrap());return this;};j.prototype.setJustifyContent=function(v){var o=this.getJustifyContent();this.setProperty("justifyContent",v,true);this.$().removeClass("sapMFlexBoxJustify"+o).addClass("sapMFlexBoxJustify"+this.getJustifyContent());return this;};j.prototype.setAlignItems=function(v){var o=this.getAlignItems();this.setProperty("alignItems",v,true);this.$().removeClass("sapMFlexBoxAlignItems"+o).addClass("sapMFlexBoxAlignItems"+this.getAlignItems());return this;};j.prototype.setAlignContent=function(v){var o=this.getAlignContent();this.setProperty("alignContent",v,true);this.$().removeClass("sapMFlexBoxAlignContent"+o).addClass("sapMFlexBoxAlignContent"+this.getAlignContent());return this;};j.prototype.setHeight=function(v){this.setProperty("height",v,true);this.$().css("height",this.getHeight());return this;};j.prototype.setWidth=function(v){this.setProperty("width",v,true);this.$().css("width",this.getWidth());return this;};j.prototype.setBackgroundDesign=function(v){var o=this.getBackgroundDesign();this.setProperty("backgroundDesign",v,true);this.$().removeClass("sapMFlexBoxBG"+o).addClass("sapMFlexBoxBG"+this.getBackgroundDesign());return this;};j.prototype.getAccessibilityInfo=function(){return{children:this.getItems()};};return j;});
