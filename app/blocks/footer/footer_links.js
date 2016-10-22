// Code for a responsive menu in footer

(function(global){
  'use strict';

  var footerLinks = {};

  function linksListener(){
    utils.toggleClass(this.parentNode, 'open-footer-menu');
  };

  footerLinks.init = function init(){
    
    var links = document.querySelectorAll('.footer__links-title');

    for (var i = 0, l = links.length; i < l; i++) {
      links[i].addEventListener('click', linksListener);
    }
  }

  global.footerLinks = footerLinks;
})(this);