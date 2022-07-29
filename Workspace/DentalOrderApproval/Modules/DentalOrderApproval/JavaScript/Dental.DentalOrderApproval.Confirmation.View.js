define('Dental.DentalOrderApproval.Confirmation.View', [
    'dental_confirmation_modal.tpl',
    'Backbone',
    'underscore',
    'LiveOrder.Model',
    'Utils'
], function MHQuoteModuleConfirmationView(
    DentalOrderApprovalConfirmationTpl,
    Backbone,
    _,
    LiveOrderModel,
    Utils
) {
    'use strict';

    return Backbone.View.extend({
        title: Utils.translate('Confirmation'),

        events: {
            'click [data-action="proceed"]': 'onProceed',
            'click [data-dismiss="modal"]': 'backToHome',
        },

        template: DentalOrderApprovalConfirmationTpl,

        backToHome: function backToHome() {
            this.clearCart();
            Backbone.history.navigate('/', { trigger: true, replace: true });
            window.location.reload();

            return false;
        },

        clearCart: function clearCart() {
            var liveOrder = LiveOrderModel.getInstance();
            liveOrder.get('lines').models.forEach(function(line) {
                liveOrder.removeLine(line);
                return true;
            });
        },
       
        onClose: function onClose() {
            if (_(this.options && this.options.onClose).isFunction()) {
                return this.options.onClose.apply(this.options.view || this, []);
            }
            return true;
        },

        onProceed: function onProceed() {
            this.$containerModal.find('[data-dismiss="modal"]').trigger('click');
            if (_(this.options && this.options.onCancel).isFunction()) {
                return this.options.onCancel.apply(this.options.view || this, []);
            }
            return true;
        },

        initialize: function initialize(options) {
            this.options = options;
            this.on('afterViewRender', function afterRender() {
                try {
                    QuoteOrderStepperView.prototype.reviewStep();
                } catch (e) {}
            });
        },

        popup: function popup() {
            this.showInModal({
                modalOptions: { backdrop: 'static', keyboard: false },
            });
            // this.$containerModal.on('hide.bs.modal', jQuery.proxy(this, 'onClose'));
        },

        getContext: function getContext() {
            return {
                result: this.options.data.success,
                pageHeader: this.title,
                warningMessage: this.options.data.error || '',
            };
        },
    });
});