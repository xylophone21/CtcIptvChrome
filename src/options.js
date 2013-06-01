var Authentication = new Object();



window.onload = function() {
	var inputstr = document.querySelector("#inputstr")
	var saver = document.querySelector("#dosave")

	var values = localStorage.getItem("iptv_settings");
	var json = JSON.parse(values)

	if (json == undefined) {
		console.log("No data, use default!")
		json = iptvcfg;
	}
	else {
		console.log("loaded saved data")
	}
	inputstr.innerHTML = JSON.stringify(json,undefined,4);

	saver.onclick = function() {
		console.log(inputstr.innerHTML)
		window.localStorage.setItem("iptv_settings", inputstr.innerHTML);
		chrome.extension.sendMessage({greeting:"hello to content script!"},function(reponse){
			console.log(reponse)
		});
	}
}

//window.localStorage.removeItem("iptv_settings")
//window.localStorage.setItem("iptv_settings", JSON.stringify(iptvcfg));
