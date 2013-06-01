To view CTC IPTV pages via chrome.
Implement javascript CTC IPTV extensions in chrome extensions.

### How to "build"
Since injected scripts, with src attributes are executed asynchronously in Chrome.
See http://stackoverflow.com/questions/15730869/my-injected-script-runs-after-the-target-pages-javascript-despite-using-run?rq=1 for details.
To confirm our code is run before any IPTV code, we put all code directly into js_injector.js.
gen_injector.py will read these code and generate js_injector.js.

### How to install
1.Go chrome://extensions/
2.Confirm the "Developer mode" is clecked.
3.Click "Load unpacked extension" button, select CtcIptvChrome/src dir and click OK button.

### How to use
go chrome://extensions/ and enter Options of this extension.
Fill at least UserId, _passwd, STBID and mac in json format and save them.
All these key-values will be the init value of CTC IPTV Authentication.CTCGetConfig function.

Then go to authentication home of IPTV, like: http://eds.iptv.gd.cn:8082/EDS/jsp/AuthenticationURL?UserID=xxxx&Action=Login.(Replace xxxx to your UserId).

### View logs among pages:
Inspect element --> settings -> checked "Preserve log upon navigation"
