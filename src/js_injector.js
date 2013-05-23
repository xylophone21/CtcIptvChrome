function injectJs(link) {
	var scr = document.createElement('script');
	scr.type="text/javascript";
	scr.src=link;

	document.documentElement.appendChild(scr);
}

injectJs(chrome.extension.getURL('md5.js'));
injectJs(chrome.extension.getURL('dessrc.js'));
injectJs(chrome.extension.getURL('ctc_iptv.js'));