
define(
	'SameDayPickup.PickupDelivery.PickupDelivery'
,   [
		'OrderWizard.Module.Shipmethod',
    	'LiveOrder.Model',
    	'samedaypickup_pickupdelivery_pickupdelivery.tpl'
	]
,   function (
		OrderWizardShipMethod,
		LiveOrder,
		samedaypickup_pickupdelivery_pickupdelivery_tpl,
	)
{
	'use strict';

	return  {
		mountToApp: function mountToApp (container)
		{	
			var liveOrder = LiveOrder.getInstance();
			OrderWizardShipMethod.prototype.getContext = _.wrap(OrderWizardShipMethod.prototype.getContext, function (fn) {
				var context = fn.apply(this, _.toArray(arguments).slice(1));
				var cartLines = liveOrder.get('lines');	
			    var sameDayDelivery = true;
			    cartLines.forEach(function (cartLine) {
					var itemData = cartLine.get('item');
					var showBadges = itemData.get('custitem_ns_ib_show_badges');
					if(!showBadges) sameDayDelivery = false;
					return true;
	  		    });

	  		    console.log(sameDayDelivery);

				if(!sameDayDelivery) {
					context.shippingMethods = _.filter(context.shippingMethods, function(shipMethod) {
						return shipMethod.internalid != "43896";
					});
				}
				return context;
			});

			_.extend(OrderWizardShipMethod.prototype, {
				template: samedaypickup_pickupdelivery_pickupdelivery_tpl,
			});
		}
	};
});