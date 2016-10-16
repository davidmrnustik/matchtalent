(function() {
	openMenu.init();
	slider.init();
	footerLinks.init();
	header.init();
	sliderImage.init();
	ourPlans.init();
	contact.init();
	modal.init();
	smoothScroll.init({
	  selector: '[data-scroll]',
	  selectorHeader: '[data-scroll-header]',
	  speed: 1000,
	  easing: 'easeInOutQuad',
	  offset: 100,
	  updateURL: true,
	  callback: function ( anchor, toggle ) {}
	});
	intro.init();
})();