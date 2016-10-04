/*(function(global){
	var sliderImage = {},
			imgPath = "_dev/img/",
			imgBreakpoints = ['small', 'medium', 'large', 'extralarge'],
			breakpoints = [400, 640, 800, 1024, 1300],
			ticking = false,
			finalBreakpoint = "",
			latestKnownViewportWidth = window.innerWidth || document.documentElement.clientWidth;

	function onResize(){
		latestKnownViewportWidth = window.innerWidth || document.documentElement.clientWidth;
		requestTick();
	}

	function calculateBreakpoint(val){
		if(val < breakpoints[0] && finalBreakpoint != imgBreakpoints[0]){
			finalBreakpoint = imgBreakpoints[0];
		} else if (val > breakpoints[0] && val < breakpoints[1]){
			finalBreakpoint = imgBreakpoints[1];
			
		} else {
			finalBreakpoint = imgBreakpoints[2];
		}
	}

	function getBreakpoint(){
		ticking = false;
		var currentViewportWidth = latestKnownViewportWidth;
		calculateBreakpoint(currentViewportWidth);
		applyBgImage();
		console.log(finalBreakpoint);
	}

	function requestTick(){
		if(!ticking){
			requestAnimationFrame: window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame;
			requestAnimationFrame(getBreakpoint);
		}
		ticking = true;
	}

	function applyBgImage(){
		var imgUrl = "",
				imageSrc = document.querySelectorAll('.slider__image');

		for (var i = 0, l = imageSrc.length; i < l; i++) {
			imgUrl = 'url(' + imgPath + finalBreakpoint + '/' + imageSrc[i].getAttribute('data-img-src') + ')';
			imageSrc[i].style.backgroundImage = imgUrl;
		}
	}

	sliderImage.init = function init() {
		
		window.addEventListener('resize', onResize, false);

	};

	global.sliderImage = sliderImage;
})(this);*/