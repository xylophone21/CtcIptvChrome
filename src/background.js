chrome.extension.onMessage.addListener(function(message,sender,sendResponse) {
  if(message == "get_settings") {
  	var values = localStorage.getItem("iptv_settings");
  	sendResponse({rep_settings:values});
  }
});