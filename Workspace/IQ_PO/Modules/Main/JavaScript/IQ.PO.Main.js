define("IQ.PO.Main", [
  "IQ.PO.ReorderItems.List.View",
  "IQ.PO.ListHeader.View",
], function (ReorderItemsListView, ListHeaderView) {
  "use strict";

  return {
    mountToApp: function mountToApp(container) {
      ReorderItemsListView.loadModule(container);
      ListHeaderView.loadModule(container);
    },
  };
});
