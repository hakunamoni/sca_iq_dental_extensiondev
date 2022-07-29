define('IQDental.CliaNumber.CliaNumber.View'
, [
    'Wizard.Module',
    'LiveOrder.Model',
    'iqdental_clianumber_clianumber.tpl'
    , 'underscore'
  ]
, function (
    WizardModule,
    LiveOrderModel,
    iqdental_clianumber_clianumber_tpl
    , _
  )
{
  'use strict';

  // We have to use the Wizard.Module class because it is special for the checkout
  return WizardModule.extend({

    template: iqdental_clianumber_clianumber_tpl,

    initialize: function initialize() {
        this.model = LiveOrderModel.getInstance();
    },
  
    getContext: function getContext()
    {
      var cartLines = this.model.get('lines');
      var isShowCLIA = false;
      console.log(isShowCLIA);
      cartLines.forEach(function (cartLine) {
        var itemData = cartLine.get('item');
        var itemId = itemData.get('internalid');
        if (itemId == 52413) isShowCLIA = true;
        return true;
      });

      console.log(isShowCLIA);

      return {
        isShowCLIA: isShowCLIA
      };
    }
  });
});