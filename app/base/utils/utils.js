(function(global) {
  'use strict';

  var utils = {};

  utils.hasClass = function(el, className) {
    if (el.classList) {
      return el.classList.contains(className);
    }

    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  };

  utils.loadCSS = function(href) {
    var link = window.document.createElement("link");
    var ref = window.document.getElementsByTagName("script")[0];
    
    link.rel = "stylesheet";
    link.href = href;
    link.media = "all";
    ref.parentNode.insertBefore(link, ref);

    return link;
  };

  utils.addClass = function(el, className){
    if (el.classList) {
      el.classList.add(className);
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
  };

  utils.removeClass = function(el, className){
    if (el.classList) {
      el.classList.remove(className);
    } else {
      el.className = el.className.replace()
    }
  };

  utils.toggleClass = function(el, className) {
    if (el.classList) {
      el.classList.toggle(className);
    } else {
      var classes = el.className.split(' ');
      var existingIndex = classes.indexOf('className');

      if (existingIndex >= 0) {
        classes.splice(existingIndex, 1);
      } else {
        classes.push(className);
      }

      el.className = classes.join(' ');
    }
  };

  global.utils = utils;

})(this);