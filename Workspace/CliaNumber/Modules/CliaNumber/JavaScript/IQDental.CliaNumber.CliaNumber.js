
define(
	'IQDental.CliaNumber.CliaNumber'
,   [
		'IQDental.CliaNumber.CliaNumber.View'
	]
,   function (
		CliaNumberContainerView
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{
			var checkout = container.getComponent('Checkout');

			checkout.addModuleToStep(
			{
				step_url: 'shipping/address' // if you're using a non-OPC checkout, then you will need to put the specific step URL in instead
				, module: {
					id: 'CliaNumberView'
					, index: 6
					, classname: 'IQDental.CliaNumber.CliaNumber.View'
				}
			});

		}
	};
});
