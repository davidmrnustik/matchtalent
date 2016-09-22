(function(global) {
	var openMenu = {};

	function toggleMenu() {
		var mainContent = document.getElementById('mainContent');
		var mobileMenu = document.getElementById('mobileMenu');

		utils.toggleClass(mainContent, 'menu-open');
		utils.toggleClass(mobileMenu, 'mobile-menu_show');
		utils.toggleClass(document.documentElement, 'menu-open');
	}

	openMenu.init = function init() {
		document.getElementById('mobileMenu') !== null && document.getElementById('menu').addEventListener('click', toggleMenu);
	};

	global.openMenu = openMenu;

})(this);