(function(global) {
  var cookies = {},
      cookiesAlert = document.getElementById('cookies'),
      cookiesClose = document.getElementById('cookies__close');

  cookies.init = function init() {
    cookiesClose.addEventListener('click', function(e){
      e.preventDefault();
      CookieLayerVisto()
    });

    function getCookie_Layer(e){
      var t = document.cookie;
      var n = t.indexOf(" "+e+"=");
      if(n == -1){
        n = t.indexOf(e+"=");
      }
      if(n == -1){
        t = null;
      } else {
        n = t.indexOf("=",n)+1;
        var r = t.indexOf(";",n);

        if(r == -1){
          r = t.length;
        }
        t = unescape(t.substring(n,r));
      }
      return t;
    }
    function setCookie_Layer(e,t,n){
      var r = new Date;
      r.setDate(r.getDate()+n);
      var i = escape(t)+(n == null?"":";expires="+r.toUTCString());
      document.cookie = e+"="+i;
    }

    function CookieLayerVisualizado(e){
      setCookie_Layer("cookie_matchtalent",e,365);
    }
    function CookieLayerVisto(){
      setCookie_Layer("cookie_matchtalent",2,365);
      cookiesAlert.style.display = "none";
    }
    var CookieLayer = getCookie_Layer("cookie_matchtalent");

    if(CookieLayer != null && CookieLayer != "" && CookieLayer !="0" && CookieLayer != "1"){
      cookiesAlert.style.display = "none";
    } else {
      if(CookieLayer == null)
        CookieLayer = 0;
      cookiesAlert.style.display = "block";
    }

  };

  global.cookies = cookies;
})(this);
