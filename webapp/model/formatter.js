sap.ui.define([], function () {
	"use strict";

	return {

		statusText: function (sStatus) {
			var oResourceBundle = this.getView().getModel("i18n").getResourceBundle();

			// Hier werden invoiceStatus geswitcht
			switch (sStatus) {
				case "A":
					return oResourceBundle.getText("invoiceStatusA");
				case "B":
					return oResourceBundle.getText("invoiceStatusB");
				case "C":
					return oResourceBundle.getText("invoiceStatusC");
				case "D":
					return oResourceBundle.getText("invoiceStatusD");
				case "E":
					return oResourceBundle.getText("invoiceStatusE");
				default:
					return sStatus;
			}
		}
	};
});