define("IQ.RESTR.ProductDetails.QuickView.View", [
  "ProductDetails.QuickView.View",
  "IQ.RESTR.RestrictionMessage.View",
  "iq_restr_product_details_quickview.tpl",
  "underscore",
], function (
  ProductDetailsQuickViewView,
  RestrictionMessageView,
  iq_restr_product_details_quickview,
  _
) {
  "use strict";

  return {
    loadModule: function (container) {
      _.extend(ProductDetailsQuickViewView.prototype, {
        template: iq_restr_product_details_quickview,

        childViews: _.extend(
          ProductDetailsQuickViewView.prototype.childViews || {},
          {
            RestrictionMessage: function () {
              return new RestrictionMessageView();
            },
          }
        ),

        getContext: _.wrap(
          ProductDetailsQuickViewView.prototype.getContext,
          function (fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            // console.log(
            //   "ProductDetailsQuickViewView this.model.get('item')",
            //   this.model.get("item")
            // );
            context.isAuthorized = this.model.get("item").isAuthorized();
            return context;
          }
        ),
      });
    },
  };
});
