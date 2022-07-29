define('Dental.DentalOrderApproval.DentalOrderApproval', [
    'Header.MiniCart.View',
    'Cart.Summary.View',
    'Dental.DentalOrderApproval.Confirmation.View',
    'LiveOrder.Model',
    // 'Profile.Model',
    'Utils',
], function (
    HeaderMiniCartView,
    CartSummaryView,
    DentalApprovalConfirmationView,
    LiveOrderModel,
    // ProfileModel,
    Utils
) {
    'use strict';

    return {
        mountToApp: function mountToApp(container) {
            var orderModel = LiveOrderModel.getInstance();
            // console.log(orderModel);

            var customerId;
            var needApproval = false;
            this.UserProfile = container.getComponent('UserProfile');
            this.UserProfile.getUserProfile().then(function (profileData)
            {
                customerId = profileData.internalid;
                // console.log(profileData);
                needApproval = checkSupervisorCustomFields(profileData.customfields);
                console.log('needApproval:'+JSON.stringify(needApproval));
            });


            CartSummaryView.prototype.getContext = _.wrap(CartSummaryView.prototype.getContext, function (fn) {
                var context = fn.apply(this, _.toArray(arguments).slice(1));
                context.needApproval = needApproval;
                // console.log('CartSummaryView needApproval:'+needApproval);
                return context;
            });

            HeaderMiniCartView.prototype.getContext = _.wrap(HeaderMiniCartView.prototype.getContext, function (fn) {
                var context = fn.apply(this, _.toArray(arguments).slice(1));
                context.needApproval = needApproval;
                // console.log('HeaderMiniCartView needApproval:'+needApproval);
                return context;
            });

            _.extend(CartSummaryView.prototype, {
                events: {
                    'click [data-action="set-approval-order"]': 'placeApprovalOrder'
                },

                placeApprovalOrder: function() {
                    var items = new Array();
                    orderModel.get('lines').models.forEach(function(line) {
                        console.log('CartSummaryView line:'+JSON.stringify(line));
                        items.push({
                            item: line.get('item').get('internalid'),
                            type: line.get('item').get('type'),
                            rate: line.get('rate'),
                            amount: line.get('amount'),
                            quantity: line.get('quantity'),
                            description: line.get('description'),
                        });

                        return true;
                    });
                    console.log('CartSummaryView items:'+JSON.stringify(items));
                    var item_data = {
                        items: items,
                        customer: customerId,                        
                    }

                    jQuery.ajax({
                        url: '/app/site/hosting/scriptlet.nl?script=customscript_sl_supervisor_get_order&deploy=customdeploy_sl_supervisor_get_order&compid=' +
                        SC.ENVIRONMENT.companyId,
                        method: 'post',
                        data: JSON.stringify(item_data)
                    }).done(function(result) {
                        return new DentalApprovalConfirmationView({
                            application: container,
                            data: result,
                            view: self
                        }).popup();
                    }).fail(function(_err) {
                        return new DentalApprovalConfirmationView({
                            application: container,
                            data: {
                                success: false,
                                error: _err,
                            },
                            view: self
                        }).popup();
                    });
                }
            });

            _.extend(HeaderMiniCartView.prototype, {
                events: {
                    'click [data-action="set-approval-order"]': 'placeApprovalOrder'
                },

                placeApprovalOrder: function() {
                    var self = this;
                    // var orderModel = LiveOrderModel.getInstance();
                    var items = new Array();
                    orderModel.get('lines').models.forEach(function(line) {
                        console.log('HeaderMiniCartView line:'+JSON.stringify(line));
                        items.push({
                            item: line.get('item').get('internalid'),
                            type: line.get('item').get('type'),
                            rate: line.get('rate'),
                            amount: line.get('amount'),
                            quantity: line.get('quantity'),
                            description: line.get('description'),
                        });

                        return true;
                    });
                    console.log('HeaderMiniCartView items:'+JSON.stringify(items));
                    var item_data = {
                        items: items,
                        customer: customerId,                        
                    }

                    jQuery.ajax({
                        url: '/app/site/hosting/scriptlet.nl?script=customscript_sl_supervisor_get_order&deploy=customdeploy_sl_supervisor_get_order&compid=' +
                        SC.ENVIRONMENT.companyId,
                        method: 'post',
                        data: JSON.stringify(item_data)
                    }).done(function(result) {
                        return new DentalApprovalConfirmationView({
                            application: container,
                            data: result,
                            view: self
                        }).popup();
                    }).fail(function(_err) {
                        return new DentalApprovalConfirmationView({
                            application: container,
                            data: {
                                success: false,
                                error: _err,
                            },
                            view: self
                        }).popup();
                    });
                }
            });

            // function getBranch(customFields) {
            //     console.log("customFields:"+JSON.stringify(customFields));
            //     return _.filter(customFields, function (obj) {
            //         return obj.name === 'custentity_has_supervisor_yn';
            //     });
            // }

            function checkSupervisorCustomFields(customFields) {
                console.log("customFields:"+JSON.stringify(customFields));
                return _.filter(customFields, function (obj) {
                    // console.log('id:'+obj.id);
                    // console.log('value:'+obj.value);
                    return (obj.id === 'custentity_has_supervisor_yn') && (obj.value == true);
                });
            }
        },
    };
});
