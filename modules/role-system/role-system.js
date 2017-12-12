var roleMsql = require('../mysql-connect/role-system-mysql'),
	utils = require('../utils');;

var roleSystem = {
	getMenuRolePermission: function(req,callback) {
		var resource = './menu-system/menu-side.json';
		
		function validatePermision(route,roles){
			var permissions = null;
			for(var i=0; i<roles.length; i++){
				permissions = roles[i].permissions;
				if(permissions[sideMenu.route.services]) {
					return true;
				}
			}
			return false;
		}
		function hasSubChildMenu(subChildMenu,roles){
			if(subChildMenu.route){
				return validatePermision(subChildMenu.route,roles);
			}
			else {
				return false;
			}			
		}
		function hasSideMenu(sideMenu,roles){
			if(sideMenu.childMenu) {
				var sideMenuByRol = sideMenu.childMenu.filter(function(childMenu,index){
					if(childMenu.subChildMenu){
						return hasSubChildMenu(childMenu.subChildMenu,roles)
					}
					else if(childMenu.route){
						return validatePermision(childMenu.route,roles);
					}
					else {
						return false;
					}
					
				});
				return sideMenuByRol.lengh > 0 ;
			}
			else if(sideMenu.route){
				return validatePermision(sideMenu.route,roles);
			}
			else {
				return false;
			}
		}
		
		function hasSection(section,roles){
			
			if(section.sideMenu) {
				var sectionByRol = section.sideMenu.filter(function(sideMenu,index){
					return hasSideMenu(sideMenu,roles);
				});
				return sectionByRol.lengh > 0 ;
			}
			else { 
				return false;
			}
		}
		
		utils.loadFile(resource,function(err,menuSystem){
			
			if(menuSystem.sections){
				roleMsql.getRolePermissionByUser(req,function(err,roles){
					if(roles){
						var sectionByRol = menuSystem.sections.filter(function(itemSection,index){
							return true;//hasSection(itemSection,roles);
						});	
						callback(err,{"sections":sectionByRol});
					}					
				});
			} else {
				callback(err,{"sections":[]});
			}
		});
	}
};
module.exports = roleSystem;
