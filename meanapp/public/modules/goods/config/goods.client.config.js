'use strict';

// Configuring the Articles module
angular.module('goods').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Goods', 'goods', 'dropdown', '/goods(/create)?');
		Menus.addSubMenuItem('topbar', 'goods', 'List Goods', 'goods');
		Menus.addSubMenuItem('topbar', 'goods', 'New Good', 'goods/create');
	}
]);