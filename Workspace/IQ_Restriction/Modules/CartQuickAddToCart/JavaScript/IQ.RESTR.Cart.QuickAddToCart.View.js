define("IQ.RESTR.Cart.QuickAddToCart.View", [
  "Cart.QuickAddToCart.View",
  "IQ.RESTR.RestrictionMessage.View",
  "iq_restr_cart_quickaddtocart.tpl",
  "underscore",
], function (
  CartQuickAddToCartView,
  RestrictionMessageView,
  iq_restr_cart_quickaddtocart,
  _
) {
  "use strict";

  return {
    loadModule: function (container) {
      _.extend(CartQuickAddToCartView.prototype, {
        template: iq_restr_cart_quickaddtocart,

        childViews: _.extend(
          CartQuickAddToCartView.prototype.childViews || {},
          {
            RestrictionMessage: function () {
              return new RestrictionMessageView();
            },
          }
        ),

        getContext: _.wrap(
          CartQuickAddToCartView.prototype.getContext,
          function (fn) {
            var context = fn.apply(this, _.toArray(arguments).slice(1));
            // // console.log(
            // //   "CartQuickAddToCartView this.model",
            // //   this.model.getItem().get("internalid")
            // // );

            // var isAuthorized = true;
            // var isLoggedIn = ProfileModel.getInstance().isLoggedIn();
            // if (isLoggedIn) {
            //   var customerId = ProfileModel.getInstance().get("internalid");
            //   // console.log("CartQuickAddToCartView customerId", customerId);

            //   var restrictedCustomers = [
            //     "4154197",
            //     "4154299",
            //     "4154300",
            //     "4154301",
            //     "4154402",
            //     "4154403",
            //     "4154404",
            //   ];
            //   // console.log(
            //   //   "CartQuickAddToCartView restrictedCustomers",
            //   //   restrictedCustomers
            //   // );
            //   // console.log(
            //   //   "CartQuickAddToCartView checkAuthorized",
            //   //   restrictedCustomers.indexOf(customerId)
            //   // );
            //   var checkAuthorized =
            //     restrictedCustomers.indexOf(customerId) == -1 ? false : true;
            //   // console.log(
            //   //   "CartQuickAddToCartView checkAuthorized",
            //   //   checkAuthorized
            //   // );

            //   isAuthorized = checkAuthorized
            //     ? this.model.get("isAuthorized")
            //     : true;
            //   // console.log("CartQuickAddToCartView isAuthorized", isAuthorized);

            //   // if (this.model.get("isAuthorized")) {
            //   //   console.log(
            //   //     "CartQuickAddToCartView " +
            //   //       this.model.getItem().get("internalid"),
            //   //     this.model.get("isAuthorized")
            //   //   );
            //   // }
            // }
            // context.isAuthorized = isAuthorized;

            context.isAuthorized = this.model.get("isAuthorized");
            return context;
          }
        ),
      });
    },
  };
});
