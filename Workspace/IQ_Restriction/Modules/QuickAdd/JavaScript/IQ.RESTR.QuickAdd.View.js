define("IQ.RESTR.QuickAdd.View", [
  "QuickAdd.View",
  "IQ.RESTR.QuickAdd.Item.View",
  "IQ.RESTR.RestrictionMessage.View",
  "iq_restr_quick_add_item.tpl",
  "underscore",
], function (
  QuickAddView,
  IQRestrQuickAddItemView,
  RestrictionMessageView,
  iq_restr_quick_add_item,
  _
) {
  "use strict";

  return {
    loadModule: function (container) {
      _.extend(QuickAddView.prototype, {
        initialize: _.wrap(QuickAddView.prototype.initialize, function (fn) {
          fn.apply(this, _.toArray(arguments).slice(1));

          this.itemsSearcherComponent.options.itemView =
            IQRestrQuickAddItemView;
          this.itemsSearcherComponent.options.itemViewOptions.template =
            iq_restr_quick_add_item;
          this.itemsSearcherComponent.options.itemViewOptions.childViews =
            _.extend(
              this.itemsSearcherComponent.options.itemViewOptions.childViews ||
                {},
              {
                RestrictionMessage: function () {
                  return new RestrictionMessageView();
                },
              }
            );

          // remove "tt-selectable" attribute for unapproved items
          var self = this;
          this.itemsSearcherComponent.on("afterViewRender", function () {
            window.setTimeout(function () {
              self.itemsSearcherComponent.$searchElement.on(
                "typeahead:open",
                function (e) {
                  self.forceUnselectable(e);
                }
              );

              self.itemsSearcherComponent.$searchElement.on(
                "typeahead:render",
                function (e) {
                  self.forceUnselectable(e);
                }
              );
            }, 0);
          });
        }),

        forceUnselectable: function (inputDom) {
          var self = this;

          var $menu = self.$(inputDom.target).siblings(".tt-menu");

          if (
            !$menu.length ||
            !$menu.find(".tt-suggestion.tt-selectable").length
          ) {
            return;
          }

          $menu.find(".tt-suggestion.tt-selectable").each(function (index, e) {
            if (
              self
                .$(e)
                .find(".product-restriction-message")
                .hasClass("product-restriction-message")
            ) {
              self.$(e).removeClass("tt-selectable");
            }
          });
        },
      });
    },
  };
});
