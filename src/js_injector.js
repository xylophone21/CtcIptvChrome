function injectJs(link) {
	var scr = document.createElement('script');
	scr.type="text/javascript";
	scr.src=link;

	var head = document.getElementsByTagName('head')[0];
	head.insertBefore(scr,head.firstChild)
}

injectJs(chrome.extension.getURL('ctc_iptv.js'));