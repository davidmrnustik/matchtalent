// Open / Close responsive top navigation menu.

(function(global) {
  var openMenu = {},
      mobileMenu = document.getElementById('mobileMenu'),
      menuIcon = document.querySelector('.mobile-menu__menu-icon'),
      header = document.querySelector('.header');

  openMenu.toggle = function toggle() {
    utils.toggleClass(mobileMenu, 'mobile-menu_show');
    utils.toggleClass(document.body, 'menu-open');

    if(!utils.hasClass(header, 'header_fixed')){
      menuIcon.style.marginTop = "20px";
    } else {
      menuIcon.style.marginTop = "0px";
    }
  }

  function eventListener(el, func) { // this function fixes bug for IE8
    var elem = document.querySelectorAll(el);
    
    for (var i = 0, l = elem.length; i < l; i++) {
      if (elem[i].addEventListener){
        elem[i].addEventListener('click', func);
      } else {
        elem[i].attachEvent('click', func);
      }
    }
  }

  openMenu.init = function init() {
    document.getElementById('mobileMenu') !== null && eventListener('.menu-icon', openMenu.toggle);
  };

  global.openMenu = openMenu;

})(this);