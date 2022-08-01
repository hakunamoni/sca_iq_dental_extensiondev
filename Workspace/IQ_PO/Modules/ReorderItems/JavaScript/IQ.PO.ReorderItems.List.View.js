// @module IQ.PO.ReorderItems
define("IQ.PO.ReorderItems.List.View", [
  "iq_po_reorderitems.tpl",
  "ReorderItems.List.View",
  "ListHeader.View",
  "IQ.PO.ReorderItems.Model",
  "ReorderItems.Collection",

  "Backbone",
  "Utils",
  "underscore",
  "jQuery",
], function (
  iq_po_reorderitems_tpl,
  ReorderItemsListView,
  ListHeaderView,
  IQPOReorderItemsModel,
  ReorderItemsCollection,

  Backbone,
  Utils,
  _,
  $
) {
  "use strict";

  return {
    loadModule: function (container) {
      _.extend(ReorderItemsListView.prototype, {
        template: iq_po_reorderitems_tpl,
        initialize: _.wrap(
          ReorderItemsListView.prototype.initialize,
          function (fn) {
            fn.apply(this, _.toArray(arguments).slice(1));

            this.collection = new ReorderItemsCollection();

            console.log("prior filterOptions", this.filterOptions);
            var isShowAll = false;
            this.filterOptions.forEach(function (filterOption) {
              filterOption.selected = false;
              if (filterOption.className == "reorder-items-filter-all-days") {
                filterOption.selected = true;
                isShowAll = true;
              }
              return true;
            });
            if (!isShowAll) {
              this.filterOptions.push({
                value: function () {
                  return "";
                },
                name: Utils.translate("Show All"),
                className: "reorder-items-filter-all-days",
                selected: true,
              });
            }
            console.log("updated filterOptions", this.filterOptions);

            console.log("prior listHeader", this.listHeader);
            var options = _.toArray(arguments).slice(1)[0];
            var routerOptions;
            if (options.routerArguments && options.routerArguments[0]) {
              routerOptions = Utils.parseUrlOptions(options.routerArguments[0]);
            } else {
              routerOptions = { page: 1 };
            }
            this.options.showCurrentPage = true;

            if (routerOptions.order_id) {
              this.collection.order_id = routerOptions.order_id;
              this.order_id = routerOptions.order_id;
              this.order_number = routerOptions.order_number || 0;
            }
            this.listHeader = new ListHeaderView({
              view: this,
              application: options.application,
              collection: this.collection,
              filters: routerOptions.order_id ? null : this.filterOptions,
              sorts: routerOptions.order_id
                ? this.sortOptionsSingleOrder
                : this.sortOptions,
              searchable: true,
              hidePagination: true,
              headerMarkup: routerOptions.order_id ? this.getOrderLink() : "",
            });
            console.log("updated listHeader", this.listHeader);

            console.log("updated collection", this.collection);
          }
        ),

        getContext: _.wrap(
          ReorderItemsListView.prototype.getContext,
          function (fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            return context;
          }
        ),
      });
    },
  };
});
