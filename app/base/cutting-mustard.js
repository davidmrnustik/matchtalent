// Cutting mustard: detection if browser supports modern features on not.

(function(window, document){
  if ('querySelector' in document && 'localStorage' in window && 'addEventListener' in window) {
    window.utils.addClass(document.documentElement, 'is-modern');
  } else {
    window.utils.addClass(document.documentElement, 'is-legacy');
  }
}(window, document));