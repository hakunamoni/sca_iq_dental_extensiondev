define("IQ.RESTR.Facets.ItemCell.View", [
  "Facets.ItemCell.View",
  "Product.Model",
  "Cart.QuickAddToCart.View",
  // "IQ.RESTR.RestrictionMessage.View",
  "underscore",
], function (
  FacetsItemCellView,
  ProductModel,
  CartQuickAddToCartView,
  // RestrictionMessageView,
  _
) {
  "use strict";

  return {
    loadModule: function (container) {
      _.extend(FacetsItemCellView.prototype, {
        childViews: _.extend(FacetsItemCellView.prototype.childViews || {}, {
          "Cart.QuickAddToCart": function () {
            // console.log(
            //   "FacetsItemCellView this.model.isAuthorized()",
            //   this.model
            // );

            const product = new ProductModel({
              item: this.model,
              quantity: this.model.get("_minimumQuantity", true),
              isAuthorized: this.model.isAuthorized(),
            });

            return new CartQuickAddToCartView({
              model: product,
              application: this.options.application,
            });
          },

          // // for iq_restr_facets_item_cell_grid.tpl
          // RestrictionMessage: function () {
          //   return new RestrictionMessageView();
          // },
        }),

        // // for iq_restr_facets_item_cell_grid.tpl
        // getContext: _.wrap(
        //   FacetsItemCellView.prototype.getContext,
        //   function (fn) {
        //     var context = fn.apply(this, _.toArray(arguments).slice(1));

        //     context.isAuthorized = this.model.isAuthorized();
        //     console.log("FacetsItemCellView this.model", this.model);
        //     console.log("FacetsItemCellView context", context);
        //     return context;
        //   }
        // ),
      });
    },
  };
});
