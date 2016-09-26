(function(global) {
	var openMenu = {};

	function toggleMenu() {
		var mainContent = document.getElementById('mainContent');
		var mobileMenu = document.getElementById('mobileMenu');

		utils.toggleClass(mainContent, 'menu-open');
		utils.toggleClass(mobileMenu, 'mobile-menu_show');
		utils.toggleClass(document.documentElement, 'menu-open');
	}

	function eventListener(el, func) { // this function fixes bug for IE8
		if (document.getElementById(el).addEventListener){
			document.getElementById(el).addEventListener('click', func);
		} else {
			document.getElementById(el).attachEvent('click', func);
		}
	}

	openMenu.init = function init() {
		document.getElementById('mobileMenu') !== null && eventListener('menu', toggleMenu);
	};

	global.openMenu = openMenu;

})(this);