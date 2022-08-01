define("IQ.PO.Main", [
  "IQ.PO.ReorderItems.List.View",
  "IQ.PO.ListHeader.View",
  "IQ.PO.ReorderItems.Collection",
], function (ReorderItemsListView, ListHeaderView, ReorderItemsCollection) {
  "use strict";

  return {
    mountToApp: function mountToApp(container) {
      ReorderItemsListView.loadModule(container);
      ListHeaderView.loadModule(container);
      ReorderItemsCollection.loadModule(container);
    },
  };
});
