chrome.extension.sendMessage("get_settings",function(reponse){
    console.log("get settings:"+reponse.rep_settings);
    var setGot = JSON.parse(reponse.rep_settings)

    var localSetStr = localStorage.getItem("iptv_settings");    
    var localSet = JSON.parse(localSetStr);
    if(localSet == undefined) {
    	localSet = new Object();
    }

    for(key in setGot) {
    	localSet[key] = setGot[key];
    }

    localSetStr = JSON.stringify(localSet);
    console.log("Local setings:"+localSetStr);
    localStorage.setItem("iptv_settings", localSetStr);
});