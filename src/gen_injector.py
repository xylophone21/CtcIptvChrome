import sys

s_injector_header = """function injectJs(text) {
	var scr = document.createElement('script');
	scr.type="text/javascript";
	scr.textContent=text;
	document.documentElement.appendChild(scr);
}

"""

def openInjector(filename):
	fd = open(sys.path[0]+"/"+filename,"w")
	fd.write(s_injector_header)
	return fd

def closeInjector(fd):
	fd.close()

def injectJs(fd,filename):
	jsfd = open(sys.path[0]+"/"+filename,"r")
	text = jsfd.read()
	text = text.replace("\\","\\\\")
	text = text.replace("'","\\'")
	text = text.replace('"','\\"')
	text = text.replace('\n','\\n')
	fd.write("injectJs('"+text+"');\n\n")
	
def main():
	fd = openInjector("js_injector.js")
	injectJs(fd,"md5.js")
	injectJs(fd,"dessrc.js")
	injectJs(fd,"ctc_iptv.js")
	closeInjector(fd)

	fd = openInjector("gdiptv_injector.js")	
	injectJs(fd,"gdiptv_fixer.js")
	closeInjector(fd)

if __name__ == '__main__':
	main()