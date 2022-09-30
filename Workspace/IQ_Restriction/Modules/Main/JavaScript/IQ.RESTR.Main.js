define("IQ.RESTR.Main", [
  "IQ.RESTR.Item.Model",
  "IQ.RESTR.Facets.ItemCell.View",
  "IQ.RESTR.Cart.QuickAddToCart.View",
  "IQ.RESTR.ProductDetails.Full.View",
  "IQ.RESTR.ProductDetails.QuickView.View",
  "IQ.RESTR.QuickAdd.View",
  "iq_restr_cart_quickaddtocart.tpl",
  "iq_restr_product_details_full.tpl",
  "iq_restr_product_details_quickview.tpl",
  "iq_restr_quick_add_item.tpl",
], function (
  ItemModel,
  FacetsItemCellView,
  CartQuickAddToCartView,
  ProductDetailsFullView,
  ProductDetailsQuickViewView,
  QuickAddView
) {
  "use strict";

  return {
    mountToApp: function mountToApp(container) {
      ItemModel.loadModule(container);
      FacetsItemCellView.loadModule(container);
      CartQuickAddToCartView.loadModule(container);
      ProductDetailsFullView.loadModule(container);
      ProductDetailsQuickViewView.loadModule(container);
      QuickAddView.loadModule(container);
    },
  };
});
