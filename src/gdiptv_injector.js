function injectJs(text) {
	var scr = document.createElement('script');
	scr.type="text/javascript";
	scr.textContent=text;
	document.documentElement.appendChild(scr);
}

injectJs('var UP=38;\nvar DOWN=40;\nvar LEFT=37;\nvar RIGHT=39;\n\ndocument.onkeydown = function(event) {\n	var keycode=event.which;\n	if(!keycode) keycode=event.keyCode;\n\n	if(keycode == LEFT || keycode == RIGHT || keycode == UP || keycode == DOWN) {\n		document.onkeypress(event)\n	}\n\n\n}');

