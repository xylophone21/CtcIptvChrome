var default_iptvcfg = {
	//You must at least fill below items and re-run it
	"UserID"		: "",
	"_passwd"		: "",
	"STBID"			: "",
	"mac"			: "",
	
	//option items
	"_passwdMd5"	: true,
	"_ip"			: "192.168.1.1",
	"SupportHD"		: 1,
	"STBType"		: "EC2108B_pub",
	"STBVersion"	: "SBox8600",
	"templateName"	: "defaultwebkit",
	"boot_version"	: 86122334,
	"hardware_type"	: "EC2108B_pub",
	"ConnectType"	: 2,
	"areaid"		: 860755,
	"UserGroupNMB"	: -1,
	"PackageIDs"	: -1,
};

window.onload = function() {
	var inputstr = document.querySelector("#inputstr")
	var saver = document.querySelector("#dosave")

	var values = localStorage.getItem("iptv_settings");
	var json = JSON.parse(values)

	if (json == undefined) {
		console.log("No data, use default!")
		json = default_iptvcfg;
	}
	else {
		console.log("loaded saved data")
	}
	inputstr.value = JSON.stringify(json,undefined,4);

	saver.onclick = function() {
		console.log(inputstr.value)
		window.localStorage.setItem("iptv_settings", inputstr.value);
	}
}