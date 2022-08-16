define("IQ.RESTR.RestrictionMessage.View", [
  "iq_restr_restriction_message.tpl",
  "Backbone.View",
  "Profile.Model",
], function (restriction_message_tpl, BackboneView, ProfileModel) {
  "use strict";

  return BackboneView.extend({
    template: restriction_message_tpl,

    // getContext: function () {
    //   console.log(
    //     "IQ.RESTR.RestrictionMessage.View ProfileModel.getInstance().isLoggedIn()",
    //     ProfileModel.getInstance()
    //   );

    //   return {
    //     isLoggedIn: ProfileModel.getInstance().isLoggedIn(),
    //   };
    // },
  });
});
