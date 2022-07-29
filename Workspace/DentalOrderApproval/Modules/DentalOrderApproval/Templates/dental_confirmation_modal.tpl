<div class="modal-body dental-order-approval-confirmation-modal">
    {{#if warningMessage}}
        <span data-confirm-message class="global-views-message-warning">{{warningMessage}}</span>
    {{else}}
        <small>
            <p>Your order is on pending approval.</p>
            <p>{{translate "An e-mail has been sent to your sales representative."}}</p>
        </small>
    {{/if}}
</div>
<div class="modal-footer license-modal-footer">
    <a class="cart-confirmation-modal-view-cart-button" data-dismiss="modal" id="">{{translate 'Continue Shopping'}}</a>
</div>
