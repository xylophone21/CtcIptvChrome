chrome.extension.sendMessage({text:"getStuff"},function(reponse){
  //This is where the stuff you want from the background page will be
  if(reponse.type == "test")
    console.log("Test received");
});