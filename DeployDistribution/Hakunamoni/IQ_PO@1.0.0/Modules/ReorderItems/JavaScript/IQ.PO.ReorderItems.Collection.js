define("IQ.PO.ReorderItems.Collection", [
  "ReorderItems.Collection",
  "ReorderItems.Model",
  "Utils",
  "underscore",
], function (ReorderItemsCollection, ReorderItemsModel, Utils, _) {
  "use strict";

  return {
    loadModule: function (container) {
      _.extend(ReorderItemsCollection.prototype, {
        url: Utils.getAbsoluteUrl(
          getExtensionAssetsPath("services/IQ.PO.ReorderItems.Service.ss")
        ),

        update: _.wrap(ReorderItemsCollection.prototype.update, function (fn) {
          // var params = fn.apply(this, _.toArray(arguments).slice(1));
          var options = _.toArray(arguments).slice(1)[0];
          console.log("update options", options);
          var list_header = _.toArray(arguments).slice(1)[1];
          console.log("update list_header", list_header);

          const data_filters = {
            sort: options.sort.value,
            order_id: this.order_id,
            order: options.order,
            page: options.page,
            sku: options.sku,
          };

          if (!this.order_id) {
            let date_string = options.filter.value.apply(list_header.view);
            date_string = date_string && date_string.split("T");

            data_filters.from = date_string[0];
            data_filters.to = date_string[1];
          }

          this.fetch({
            data: data_filters,
            reset: true,
            killerId: options.killerId,
          });
          console.log("update data_filters", data_filters);

          // fn.apply(this, _.toArray(arguments).slice(1));
        }),
      });
    },
  };
});
