
define('CustomRegistration.DentalRegister.DentalRegister.Checkout'
, [
    'CustomRegistration.DentalRegister.DentalRegister.LoginRegister.View'
  ]
, function
  (
    DentalRegisterLoginRegisterView
  )
{
  'use strict';

  return  {
    mountToApp: function mountToApp (container)
    {
      var LoginRegisterPage = container.getComponent('LoginRegisterPage');

      if (LoginRegisterPage)
      {
        LoginRegisterPage.addChildView('Register.CustomFields', function ()
        {
          return new DentalRegisterLoginRegisterView
          ({
          	LoginRegisterPage: LoginRegisterPage
          })
        });
      }
    }
  };
});
