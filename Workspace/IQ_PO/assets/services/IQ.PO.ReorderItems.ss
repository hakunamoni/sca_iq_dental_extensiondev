function service(request, response)
{
	'use strict';
	try
	{
		require('CT.PRD.ReorderItems.ServiceController').handle(request, response);
	}
	catch(ex)
	{
		console.log('CT.PRD.ReorderItems.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}