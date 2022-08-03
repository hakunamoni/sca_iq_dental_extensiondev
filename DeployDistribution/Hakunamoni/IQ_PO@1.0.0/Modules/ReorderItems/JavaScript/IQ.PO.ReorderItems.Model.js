// Model.js
// -----------------------
// @module Case
define("IQ.PO.ReorderItems.Model", ["ReorderItems.Model"], function (
  ReorderItemsModel
) {
  "use strict";

  return {
    loadModule: function (container) {
      _.extend(ReorderItemsModel.prototype, {
        urlRoot: Utils.getAbsoluteUrl(
          getExtensionAssetsPath("services/IQ.PO.ReorderItems.Service.ss")
        ),
      });
    },
  };
});
