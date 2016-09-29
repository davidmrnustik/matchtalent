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
		var elem = document.getElementById(el);
		
		if (elem.addEventListener){
			elem.addEventListener('click', func);
		} else {
			elem.attachEvent('click', func);
		}
	}

	openMenu.init = function init() {
		document.getElementById('mobileMenu') !== null && eventListener('menu', toggleMenu);
	};

	global.openMenu = openMenu;

})(this);