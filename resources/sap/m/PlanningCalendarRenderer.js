/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText"],function(I){"use strict";var P={};P.render=function(r,p){var i=p.getId();var t=p.getTooltip_AsString();var h=p._getHeader();r.write("<div");r.writeControlData(p);r.writeAccessibilityState({role:"region",labelledby:I.getStaticId("sap.m",p._oRB.getText("PLANNINGCALENDAR"))});r.addClass("sapMPlanCal");if(p._iSize!==undefined&&p._iSize!==null){r.addClass("sapMSize"+p._iSize);}if(!p.getSingleSelection()){r.addClass("sapMPlanCalMultiSel");}if(!p.getShowRowHeaders()){r.addClass("sapMPlanCalNoHead");}if(p.getShowWeekNumbers()&&p._viewAllowsWeekNumbers(p.getViewKey())){r.addClass("sapMPlanCalWithWeekNumbers");}if(p.getShowDayNamesLine()&&p._viewAllowsDayNamesLine(p.getViewKey())){r.addClass("sapMPlanCalWithDayNamesLine");}if(t){r.writeAttributeEscaped('title',t);}var w=p.getWidth();if(w){r.addStyle("width",w);}var H=p.getHeight();if(H){r.addStyle("height",H);}r.writeAccessibilityState(p);r.writeClasses();r.writeStyles();r.write(">");r.renderControl(h);var T=p.getAggregation("table");r.renderControl(T);var a=p._oRB.getText("PLANNINGCALENDAR");r.write("<span id=\""+i+"-Descr\" class=\"sapUiInvisibleText\">"+a+"</span>");a=p._oRB.getText("PLANNINGCALENDAR_VIEW");r.write("<span id=\""+i+"-SelDescr\" class=\"sapUiInvisibleText\">"+a+"</span>");r.write("</div>");};return P;},true);
