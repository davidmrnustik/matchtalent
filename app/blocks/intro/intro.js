// Code for a cover layer with logo animation. Layer disappears when page content is loaded:
// document.readyState === "complete"

(function(global){
  var intro = {};

  intro.init = function init (){
    document.onreadystatechange = function(){
      if (document.readyState === "complete") {
        document.getElementById('intro').style.opacity = 0;
        setTimeout(function(){
          document.getElementById('intro').style.display = 'none';
        }, 750);
      }
    }
  }

  global.intro = intro;
})(this);