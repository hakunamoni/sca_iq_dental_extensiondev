function service(request, response)
{
	'use strict';
	try
	{
		console.log('IQ.PO.ReorderItems.ServiceController try');
		require('IQ.PO.ReorderItems.ServiceController').handle(request, response);
	}
	catch(ex)
	{
		console.log('IQ.PO.ReorderItems.ServiceController ', ex);
		var controller = require('ServiceController');
		controller.response = response;
		controller.request = request;
		controller.sendError(ex);
	}
}