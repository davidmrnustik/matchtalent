(function(global){
	var sliderImage = {},
			breakpoints = {
		    small: 640,
		    medium: 800,
		    large: 1024,
		    extralarge: 1200
			},
			currentWidth = 0,
			currentBreakpoint = "",
			imgPath = "/img/",
			breakpointMethods = [];

	function getViewport() {
    var e = window, a = "inner";
    if (!("innerWidth" in window)) {
        a = "client";
        e = document.documentElement || document.body;
    }
    return { width: e[a + "Width"], height: e[a + "Height"] };
	};

	function responsive() {
    var oldBreakpoint = currentBreakpoint,
      newBreakpoint,
      width = currentWidth = getViewport().width;

    if (width < breakpoints.small) { newBreakpoint = "small"; }
    else if (width < breakpoints.medium) { newBreakpoint = "medium"; }
    else if (width < breakpoints.large) { newBreakpoint = "large"; }
    else if (width < breakpoints.large) { newBreakpoint = "large"; }
    else { newBreakpoint = "extralarge"; }

    currentBreakpoint = newBreakpoint;

    // Only run the breakpoint methods if the breakpoint actually changed
    if (oldBreakpoint === newBreakpoint) {
      return;
    }

    for (var i = 0; i < breakpointMethods.length; i++) {
      breakpointMethods[i](); // add relevant parameters if needed
    }
	}

	function DoResponsiveWork() {
    // use this approach to target more breakpoints at the same time
    /*if (currentWidth < breakpoints.medium) {
      console.log("MEDIUM");
    }
    else {
      console.log("OTRO");
    }*/
    responsive();
		applyBgImage();
	}

	function applyBgImage(){
		var imgUrl = "",
				imageSrc = document.querySelectorAll('.slider__image');

		for (var i = 0, l = imageSrc.length; i < l; i++) {
			imgUrl = 'url(' + imgPath + currentBreakpoint + '/' + imageSrc[i].getAttribute('data-img-src') + ')';
			imageSrc[i].style.backgroundImage = imgUrl;
		}
	}

	sliderImage.init = function init(){

		responsive();
		applyBgImage();
		
		(function ($) {
	    var w = $(window);

	    /* 
	      easy way of throttling calls to the resize event
	      listen to the resize event once, run the all the responsive methods, wait, repeat
	    */
	    var responsiveListener = function () {
	        w.one("resize", function () {
	            responsive();
	            setTimeout(responsiveListener, 200);
	        });
	    };

	    // kick of the listener and run all the methods once immediately
	    responsiveListener();
	    responsive();

	    w.load(function () {
        //responsive();
   		});

		})(jQuery);

		breakpointMethods.push(DoResponsiveWork);
	};

	global.sliderImage = sliderImage;
})(this);