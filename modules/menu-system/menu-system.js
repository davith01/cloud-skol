var roleMsql = require('../mysql-connect/role-system-mysql'),
	utils = require('../utils');

/*
Structure of classes css to menu
  sections -> sideMenu -> childMenu -> subChildMenu -> route
  sections -> sideMenu -> childMenu ->  route
  sections -> sideMenu -> route
*/

//Structure field permission by Rol {"permission": [{services: [action]}}]
function validatorRoute(route,roles){
	if(!route) return false;
	var permissions = null;
	for(var i=0; i<roles.permissions.permission.length; i++){
		permissions = roles.permissions.permission[i];
		if(permissions[route]) {
			for(var j=0; j<permissions[route].length;j++){
				if(permissions[route][j]==='index')
				 return true;
			}
		}
	}
	return false;	
}

var menuSystem = {
	getMenuRolePermission: function(req,callback) {
		utils.loadFile('routers.json',function(err,routers){
			routers = routers.routers;
			utils.loadFile('menu-side.json',function(err,nemuSide){
				
				function searchItem(list,data,attr){
					if(list) {
						var _item = list.filter(function(item, index){
							return item._label === data.label;
						});
						if(_item.length>0)  return _item[0];
					}
					_item = {};
					if(attr==='route') _item[attr] = {};
					else _item[attr] = [];
					
					if(data.label)  { 
						var lang = null;
						_item.label = utils.traslate(data.label,lang);
						_item._label = data.label;
					}
					if(data.icon)  _item.icon = data.icon;
					list.push(_item);
					return _item;
				}
				
				roleMsql.getRolePermissionByUser(req,function(err,roles){
					var section = nemuSide.sections,
						route = null,
						sectionRole = {"sections": []};
					for(var i=0;i<section.length;i++){
					if(section[i]['sideMenu'])
					for(var j=0;j<section[i]['sideMenu'].length;j++){
						route = section[i]['sideMenu'][j]['route'];
						if(validatorRoute(route,roles)){
							_section = searchItem(sectionRole.sections,section[i],'sideMenu');
							_sideMenu = searchItem(_section.sideMenu,section[i]['sideMenu'][j],'route');
							_sideMenu.route.href = routers[route].href;
						}
					if(section[i]['sideMenu'][j]['childMenu'])
					for(var k=0;k<section[i]['sideMenu'][j]['childMenu'].length;k++){
						route = section[i]['sideMenu'][j]['childMenu'][k]['route'];
						if(validatorRoute(route,roles)){
							_section = searchItem(sectionRole.sections,section[i],'sideMenu');
							_sideMenu = searchItem(_section.sideMenu,section[i]['sideMenu'][j],'childMenu');
							_sideMenu.sideMenu.push();
							_childMenu = searchItem(_sideMenu.childMenu,section[i]['sideMenu'][j]['childMenu'][k],'route');
							_childMenu.route.href = routers[route].href;
						}
					if(section[i]['sideMenu'][j]['childMenu'][k]['subChildMenu'])	
					for(var l=0;l<section[i]['sideMenu'][j]['childMenu'][k]['subChildMenu'].length;l++){
						route = section[i]['sideMenu'][j]['childMenu'][k]['subChildMenu'][l]['route'];					
						if(validatorRoute(route,roles)){
							_section = searchItem(sectionRole.sections,section[i],'sideMenu');
							_sideMenu = searchItem(_section.sideMenu,section[i]['sideMenu'][j],'childMenu');
							_childMenu = searchItem(_sideMenu.childMenu,section[i]['sideMenu'][j]['childMenu'][k],'subChildMenu');
							_subChildMenu = searchItem(_childMenu.subChildMenu,section[i]['sideMenu'][j]['childMenu'][k]['subChildMenu'][l],'route');
							_subChildMenu.route.href = routers[route].href;
						}
					}}}}
					callback(err,sectionRole);
				});	
			});
		});
	}
};

module.exports = menuSystem;
