define("IQ.PO.Main", [
  "IQ.PO.ReorderItems.List.View",
  "IQ.PO.ListHeader.View",
  "IQ.PO.ReorderItems.Collection",
  "IQ.PO.ReorderItems.Model",
], function (
  ReorderItemsListView,
  ListHeaderView,
  ReorderItemsCollection,
  ReorderItemsModel
) {
  "use strict";

  return {
    mountToApp: function mountToApp(container) {
      ReorderItemsListView.loadModule(container);
      ListHeaderView.loadModule(container);
      ReorderItemsCollection.loadModule(container);
      ReorderItemsModel.loadModule(container);
    },
  };
});
