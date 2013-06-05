var values = localStorage.getItem("iptv_settings");
var iptvcfg = JSON.parse(values)
if (iptvcfg == undefined) {
	console.log("Warning: No data found, Please do config in Options page first.")
	iptvcfg = new Object();
}

function chars_from_hex(inputstr) {
	var outputstr = '';
	inputstr = inputstr.replace(/^(0x)?/g, '');
	inputstr = inputstr.replace(/[^A-Fa-f0-9]/g, '');
	inputstr = inputstr.split('');
	for(var i=0; i<inputstr.length; i+=2) {
		outputstr += String.fromCharCode(parseInt(inputstr[i]+''+inputstr[i+1], 16));
	}
	return outputstr;
}

function hex_from_chars(inputstr) {
	var delimiter = '';
	var outputstr = '';
	var hex = "0123456789abcdef";
	hex = hex.split('');
	var i, n;
	var inputarr = inputstr.split('');
	for(var i=0; i<inputarr.length; i++) {
		if(i > 0) outputstr += delimiter;
		//if(!delimiter && i % 32 == 0 && i > 0) outputstr += '\n';
		n = inputstr.charCodeAt(i);
		outputstr += hex[(n >> 4) & 0xf] + hex[n & 0xf];
	}
	return outputstr;
}

function buildpasswd() {
	psw = ""
	if(iptvcfg._passwdMd5) {
		md5_init();
		var len = iptvcfg._passwd.length;
    	for (i = 0; i < len; i++) {
    		var ch = iptvcfg._passwd.charCodeAt(i);
			md5_update(ch);
	    }
		md5_finish();

		var hex = "0123456789ABCDEF";
		hex = hex.split('');
    	for (i = 0; i < digestBits.length; i++) {
    		psw += hex[(digestBits[i] >> 4) & 0xf] + hex[digestBits[i] & 0xf]
	    }
	    //console.log("psw="+psw);
		//for(i=0; i<psw.length; i++) {
		//	console.log("psw.charCodeAt(i)="+psw.charCodeAt(i));
		//}

    	return psw;
	}
}

var Authentication = new Object();

Authentication.CTCSetConfig = function(key,value) {	
	console.log("set [[["+key+"]]]=[[["+value+"]]]");
	iptvcfg[key] = value;
	window.localStorage.setItem("iptv_settings",JSON.stringify(iptvcfg));
};


Authentication.CTCGetConfig = function(key) {
	var value = "";
	if (iptvcfg[key] != undefined) {
		value = iptvcfg[key];
	}
	console.log("get [[["+key+"]]]=[[["+value+"]]]");
	return value;
};

Authentication.CTCGetAuthInfo = function(EncryptToken) {
	psw = buildpasswd();
	var random = Math.floor(Math.random()*1000000);
	var UserID = Authentication.CTCGetConfig("UserID");
	var STBID = Authentication.CTCGetConfig("STBID");
	var IP = Authentication.CTCGetConfig("_ip");
	var MAC = Authentication.CTCGetConfig("mac");
	var Reserved = "";
	var CTC = "CTC";
	var input = random + "$" + EncryptToken + "$" + UserID + "$" + STBID + "$" + IP + "$" + MAC + "$" + Reserved + "$" + CTC
	console.log("CTCGetAuthInfo("+input+")")
	var output = des(psw, input, 1, null, null,1);
	output = hex_from_chars(output);
	console.log("output="+output)
	return output;
};

Authentication.CTCStartUpdate = function() {
	console.log("CTCStartUpdate");
}

function MediaPlayer() {
	this.initMediaPlayer = function() {console.log("initMediaPlayer");}
	this.leaveChannel = function() {console.log("leaveChannel");}
	this.setSingleMedia = function() {console.log("setSingleMedia");}
	this.setAllowTrickmodeFlag = function() {console.log("setAllowTrickmodeFlag");}
	this.setNativeUIFlag = function() {console.log("setNativeUIFlag");}
	this.setMuteUIFlag = function() {console.log("setMuteUIFlag");}
	this.setAudioVolumeUIFlag = function() {console.log("setAudioVolumeUIFlag");}
	this.setAudioTrackUIFlag = function() {console.log("setAudioTrackUIFlag");}
	this.setVideoDisplayArea = function() {console.log("setVideoDisplayArea");}
	this.setVideoDisplayMode = function() {console.log("setVideoDisplayMode");}
	this.refreshVideoDisplay = function() {console.log("refreshVideoDisplay");}
	this.joinChannel = function() {console.log("joinChannel");}
	this.stop = function() {console.log("stop ");}
	this.setMuteFlag = function() {console.log("setMuteFlag");}
	this.getMuteFlag = function() {console.log("getMuteFlag");}
	this.getNativePlayerInstanceID = function() {console.log("getNativePlayerInstanceID");}
	this.getVolume = function() {console.log("getVolume");}
	this.setVolume = function() {console.log("setVolume");}
	this.setProgressBarUIFlag = function() {console.log("setProgressBarUIFlag");}
	this.setChannelNoUIFlag = function() {console.log("setChannelNoUIFlag");}
}

var iPanel = new Object();

iPanel.ioctlRead = function (key) {
	return Authentication.CTCGetConfig(key);
}
