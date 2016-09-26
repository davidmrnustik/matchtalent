(function(global){
	var slider = {};

	slider.init = function(){
		$('.slider').slick();
	};

	global.slider = slider;

})(this);