define("IQ.RESTR.ProductDetails.Full.View", [
  "ProductDetails.Full.View",
  "IQ.RESTR.RestrictionMessage.View",
  "iq_restr_product_details_full.tpl",
  "underscore",
], function (
  ProductDetailsFullView,
  RestrictionMessageView,
  iq_restr_product_details_full,
  _
) {
  "use strict";

  return {
    loadModule: function (container) {
      _.extend(ProductDetailsFullView.prototype, {
        template: iq_restr_product_details_full,

        childViews: _.extend(
          ProductDetailsFullView.prototype.childViews || {},
          {
            RestrictionMessage: function () {
              return new RestrictionMessageView();
            },
          }
        ),

        getContext: _.wrap(
          ProductDetailsFullView.prototype.getContext,
          function (fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            // console.log(
            //   "ProductDetailsFullView this.model.get('item')",
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
