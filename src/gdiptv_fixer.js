var UP=38;
var DOWN=40;
var LEFT=37;
var RIGHT=39;

document.onkeydown = function(event) {
	var keycode=event.which;
	if(!keycode) keycode=event.keyCode;

	if(keycode == LEFT || keycode == RIGHT || keycode == UP || keycode == DOWN) {
		document.onkeypress(event)
	}


}