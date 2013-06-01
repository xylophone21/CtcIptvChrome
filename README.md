To view CTC IPTV pages via chrome.
Implement javascript CTC IPTV extensions in chrome extensions.

### How to "build"
Since injected scripts, with src attributes are executed asynchronously in Chrome.
See http://stackoverflow.com/questions/15730869/my-injected-script-runs-after-the-target-pages-javascript-despite-using-run?rq=1 for details.
To confirm our code is run before any IPTV code, we put all code directly into js_injector.js.
gen_injector.py will read all our code and generate js_injector.js.


### View logs among pages:
Inspect element --> settings -> checked "Preserve log upon navigation"
