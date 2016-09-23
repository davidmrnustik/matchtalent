(function(global, document){
	var html = document.documentElement,
	_utils = global.utils;

	if (_utils.hasClass(html, 'no-flexbox')) {
		_utils.loadCSS('_dev/css/no-flexbox.css');
	}

})(window, document);