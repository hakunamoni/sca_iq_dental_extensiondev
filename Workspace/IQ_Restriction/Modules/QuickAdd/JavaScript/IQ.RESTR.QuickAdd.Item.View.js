define("IQ.RESTR.QuickAdd.Item.View", [
  "ItemsSearcher.Item.View",
  "IQ.RESTR.RestrictionMessage.View",
  "underscore",
], function (ItemsSearcherItemView, RestrictionMessageView, _) {
  "use strict";

  return ItemsSearcherItemView.extend({
    getContext: function getContext() {
      // console.log("QuickAddView this.options", this.options);
      // console.log(
      //   "QuickAddView this.model",
      //   this.model.get("item").isAuthorized()
      // );

      return _.extend(
        ItemsSearcherItemView.prototype.getContext.apply(this, arguments),
        this.options.areResults
          ? {
              thumbnail: this.model.getThumbnail(),
              isAuthorized: this.model.get("item").isAuthorized(),
            }
          : {}
      );
    },
  });
});
