(function(global){
	global.buildEmail = function(usr, dom){
		document.write("<a href=\"mailto");
		document.write(":" + usr + "@");
		document.write(dom + "\">" + usr + "@" + dom + "<\/a>");
	};
})(this);