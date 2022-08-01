define("IQ.PO.ReorderItems.Collection", [
  "ReorderItems.Collection",
  "ReorderItems.Model",
  "Utils",
  "underscore"
], function (
  ReorderItemsCollection,
  ReorderItemsModel,
  Utils,
  _,
) {
  "use strict";

  return {
    loadModule: function (container) {
      console.log('ReorderItemsCollection.prototype', ReorderItemsCollection.prototype);
      _.extend(ReorderItemsCollection.prototype, {
        // url: Utils.getAbsoluteUrl(
        //   getExtensionAssetsPath("services/ReorderItems.Service.ss"),
        //   true
        // ),

        update1: _.wrap(ReorderItemsCollection.prototype.update, function (fn) {
          var params = fn.apply(this, _.toArray(arguments).slice(1));
          console.log("update params", params);

          // const data_filters = {
          //   sort: options.sort.value,
          //   order_id: this.order_id,
          //   order: options.order,
          //   page: options.page,
          // };

          // if (!this.order_id) {
          //   let date_string = options.filter.value.apply(list_header.view);
          //   date_string = date_string && date_string.split("T");

          //   data_filters.from = date_string[0];
          //   data_filters.to = date_string[1];
          // }

          // this.fetch({
          //   data: data_filters,
          //   reset: true,
          //   killerId: options.killerId,
          // });
        }),
      });
    },
  };
});
