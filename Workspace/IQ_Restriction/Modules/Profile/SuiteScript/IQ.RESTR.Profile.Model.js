define("IQ.RESTR.Profile.Model", ["Profile.Model", "underscore"], function (
  ProfileModel,
  _
) {
  _.extend(ProfileModel, {
    get: _.wrap(ProfileModel.get, function (fn) {
      var profile = fn.apply(this, _.toArray(arguments).slice(1));

      var isLoggedIn = profile["isLoggedIn"];
      var isRestricted = false;
      var approvedItems = [];
      if (isLoggedIn) {
        var stSuiteletUrl = nlapiResolveURL(
          "SUITELET",
          "customscript_sl_sca_items_approved",
          "customdeploy_sl_sca_items_approved",
          true
        );
        stSuiteletUrl = stSuiteletUrl + "&customer=" + profile["internalid"];

        var headers = new Array();
        headers["Content-Type"] = "application/json";
        headers["User-Agent-x"] = "SuiteScript-Call";

        var response = nlapiRequestURL(stSuiteletUrl, null, headers, "GET");
        // nlapiLogExecution(
        //   "ERROR",
        //   profile["internalid"],
        //   JSON.parse(response.getBody())
        // );
        var respData = JSON.parse(response.getBody());
        isRestricted = respData.isRestricted;
        approvedItems = respData.items;
      }

      profile.isRestricted = isRestricted;
      profile.approvedItems = approvedItems;

      return profile;
    }),
  });
});
