angular.module('ngSkol', ['ngRoute'])
 .run(function($rootScope) {
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
		if (typeof NProgress != 'undefined') { // NProgress
			NProgress.start();
		}		
	});
	//Others $rootScope listener includeContentLoaded,includeContentRequested
	$rootScope.$on('$locationChangeSuccess', function (event, next, current) {		
		if (typeof NProgress != 'undefined') {// NProgress
			NProgress.done();
		}
	});	
	
 })
 
 .controller('routeCtr', function($scope, $route, $routeParams, $location) {
	
	$scope.$route = $route;
	$scope.$location = $location;
	$scope.$routeParams = $routeParams;
	console.log($scope.$route);
	GENTELELLA.start();
 })
 
.config(['$routeProvider', function($routeProvider){

	$routeProvider
	.otherwise({
		redirectTo: '/',
		templateUrl: '/otherwise',
		controller: 'routeCtr'
	});

  Services.getRouter($routeProvider,function(err,services,$routeProvider){
	  
	if(services.routers) {
		$.each(services.routers,function(index, service){
			$routeProvider.when(service.href.replace('#!',''),service);
		});
	}
	
  });

}]);

