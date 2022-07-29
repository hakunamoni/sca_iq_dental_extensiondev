
define('CustomRegistration.DentalRegister.DentalRegister.LoginRegister.View'
, [
    'Backbone'
  , 'jQuery'
  , 'customregistration_dentalregister_dentalregister_loginregister.tpl'
  , 'GlobalViews.Message.View'
  ]
,  function
  (
    Backbone
  , jQuery
  , customregistration_dentalregister_dentalregister_loginregister_tpl
  , GlobalViewsMessageView
  )
{
  'use strict';

  return Backbone.View.extend({
    template: customregistration_dentalregister_dentalregister_loginregister_tpl

  , events:
    {
      // Optional UX feature: when a user clicks on label/input it will trigger the built-in function to hide any errors attached to this element (see ErrorManagement.js)
      'click #login-register-register-custentity_is_sca': 'hideError',
      'click #login-register-register-custentity_sca_addr1': 'hideError',
      'click #login-register-register-custentity_sca_city': 'hideError',
      'click #login-register-register-custentity_sca_state': 'hideError',
      'click #login-register-register-custentity_sca_zip': 'hideError',
      'click #login-register-register-custentity_register_speciality': 'hideError',
      'click #login-register-register-custentity_sca_phone': 'hideError'
    }

  , initialize: function ()
    {
      var self = this;

      this.options.LoginRegisterPage.on('beforeRegister', function (formFields)
      {
        // Unchecked checkboxes are not included in the data object, so we need to check they exist
        if (!formFields.custentity_is_sca)
        {
          // All views have the ability to render error messages via ErrorManagement.js.
          // By default, they will automatically find the nearest alert-placeholder, so our template needs one.
          self.showError('You must check SCA Customer Field')
          return jQuery.Deferred().reject()
        }

        // Empty inputboxes are not included in the data object, so we need to check they exist
        if (!formFields.custentity_sca_phone)
        {
          self.showError('Phone is required')
          return jQuery.Deferred().reject()
        } else if (!formFields.custentity_sca_addr1)
        {
          self.showError('Address 1 is required')
          return jQuery.Deferred().reject()
        } else if (!formFields.custentity_sca_city)
        {
          self.showError('City is required')
          return jQuery.Deferred().reject()
        } else if (!formFields.custentity_sca_state)
        {
          self.showError('State is required')
          return jQuery.Deferred().reject()
        } else if (!formFields.custentity_sca_zip)
        {
          self.showError('Zip is required')
          return jQuery.Deferred().reject()
        } else if (!formFields.custentity_register_speciality)
        {
          self.showError('Zip is required')
          return jQuery.Deferred().reject()
        }

      });
    }

  // , showError: function showError(message_content, element_class) {
  //       const global_view_message = new GlobalViewsMessageView({
  //           message: message_content,
  //           type: 'error',
  //           closable: true
  //       });

  //       // Note: in special situations (like in payment-selector),
  //       // there are modules inside modules, so we have several place holders,
  //       // so we only want to show the error in the first place holder.
  //       this.$('[class="'+element_class+'"]:first').html(
  //           global_view_message.render().$el.html()
  //       );

  //       this.error = null;
  //   }
  });
});