define("IQ.RESTR.Item.Model", [
  "Item.Model",
  "Profile.Model",
  "underscore",
], function (ItemModel, ProfileModel, _) {
  "use strict";

  return {
    loadModule: function (container) {
      _.extend(ItemModel.prototype, {
        isAuthorized: function () {
          var authorized = false;
          var custIsRestricted = ProfileModel.getInstance().get("isRestricted");
          // console.log(
          //   "IQ.RESTR.Item.Model " + "custIsRestricted",
          //   custIsRestricted
          // );
          if (custIsRestricted) {
            var itemId = this.attributes["internalid"];
            var custApprovedItems =
              ProfileModel.getInstance().get("approvedItems");

            // console.log(
            //   "IQ.RESTR.Item.Model " + "custApprovedItems",
            //   custApprovedItems
            // );

            // var authorized = custApprovedItems.indexOf(itemId) !== -1;
            // console.log("ProfileModel.getInstance()", ProfileModel.getInstance());
            // console.log(authorized + " : " + itemId, custApprovedItems.length);

            for (var index = 0; index < custApprovedItems.length; index++) {
              if (custApprovedItems[index] == itemId) {
                authorized = true;
                // console.log(index, custApprovedItems[index]);
                break;
              }
            }
          } else {
            authorized = true;
          }

          // console.log("IQ.RESTR.Item.Model " + "authorized", authorized);

          return authorized;
        },
      });
    },
  };
});
