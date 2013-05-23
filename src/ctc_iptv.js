var Authentication = new Object();

var iptvcfg = new Object();
iptvcfg.passwd = "888888";
iptvcfg.passwdMd5 = true;
iptvcfg.ip = "172.168.5.16";

iptvcfg.UserID = "088820081217001";
iptvcfg.STBID = "00101000000132A0201300076360c3c3";
iptvcfg.mac = "00:07:63:60:c3:c3";



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
		if(!delimiter && i % 32 == 0 && i > 0) outputstr += '\n';
		n = inputstr.charCodeAt(i);
		outputstr += hex[(n >> 4) & 0xf] + hex[n & 0xf];
	}
	return outputstr;
}

function buildpasswd() {
	psw = ""
	if(iptvcfg.passwdMd5) {
		md5_init();
		var len = iptvcfg.passwd.length;
    	for (i = 0; i < len; i++) {
    		var ch = iptvcfg.passwd.charCodeAt(i);
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


Authentication.CTCSetConfig = function(key,value) {	
	console.log("set "+key+"="+value);
	iptvcfg[key] = value;
};


Authentication.CTCGetConfig = function(key) {
	var value = iptvcfg[key];
	console.log("get "+key+"="+value);
	return value;
};

Authentication.CTCGetAuthInfo = function(EncryptToken) {
	psw = buildpasswd();
	var random = Math.floor(Math.random()*1000000);
	var UserID = Authentication.CTCGetConfig("UserID");
	var STBID = Authentication.CTCGetConfig("STBID");
	var IP = Authentication.CTCGetConfig("ip");
	var MAC = Authentication.CTCGetConfig("mac");
	var Reserved = "";
	var CTC = "CTC";
	var input = random + "$" + EncryptToken + "$" + UserID + "$" + STBID + "$" + IP + "$" + MAC + "$" + Reserved + "$" + CTC
	console.log("input="+input)
	var output = des(psw, input, 1, null, null,1);
	console.log("output="+hex_from_chars(output))
	return "";
};





