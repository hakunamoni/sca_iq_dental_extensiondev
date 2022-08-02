define("IQ.PO.ReorderItems.ServiceController", [
  "ServiceController",
  "IQ.PO.ReorderItems.Model",
  "SiteSettings.Model",
], function (ServiceController, ReorderItemsModel, SiteSettingsModel) {
  // @class ReorderItems.ServiceController Manage reorder items requests
  // @extend ServiceController
  return ServiceController.extend({
    // @property {String} name Mandatory for all ssp-libraries model
    name: "ReorderItems.ServiceController",

    // @property {Service.ValidationOptions} options. All the required validation, permissions, etc.
    // The values in this object are the validation needed for the current service.
    // Can have values for all the request methods ('common' values) and specific for each one.
    options: function () {
      return {
        common: {
          requireLogin: true,
          requirePermissions: {
            list: [
              SiteSettingsModel.get().isSCISIntegrationEnabled
                ? "transactions.tranPurchases.1"
                : "transactions.tranSalesOrd.1",
              "transactions.tranFind.1",
            ],
          },
        },
      };
    },

    // @method get The call to ReorderItems.Service.ss with http method 'get' is managed by this function
    // @return {Array<ReorderItems.Model.Attributes>}
    get: function () {
      // Call the search function defined on ssp_libraries/models/ReorderItems.js and send the response
      return ReorderItemsModel.search(this.request.getParameter("order_id"), {
        date: {
          from: this.request.getParameter("from"),
          to: this.request.getParameter("to"),
        },
        page: this.request.getParameter("page") || 1,
        sort: this.request.getParameter("sort"),
        order: this.request.getParameter("order"),
        sku: this.request.getParameter("sku"),
      });
    },
  });
});
