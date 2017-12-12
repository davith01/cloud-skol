function AjaxServices(url,data,callback){
	$.ajax({
		url: url,
		type: data ? 'POST' : 'GET',
		dataType: "JSON",
		data: data
	}).done(function(data){
		callback(false,data.data);
	}).fail(function(xhr, status, error){
		console.log(xhr);
		callback(error);
	})
}

Services = {
	getRouter: function ($routeProvider,callback){
		AjaxServices('/services/routers',null,function(err,data){
			callback(err,data,$routeProvider);
		})
	}
}

