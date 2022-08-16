define("IQ.RESTR.Main", [
  "IQ.RESTR.Item.Model",
  "IQ.RESTR.Facets.ItemCell.View",
  "IQ.RESTR.Cart.QuickAddToCart.View",
  "iq_restr_facets_item_cell_grid.tpl",
  "iq_restr_cart_quickaddtocart.tpl",
], function (ItemModel, FacetsItemCellView, CartQuickAddToCartView) {
  "use strict";

  return {
    mountToApp: function mountToApp(container) {
      ItemModel.loadModule(container);
      FacetsItemCellView.loadModule(container);
      CartQuickAddToCartView.loadModule(container);
    },
  };
});
