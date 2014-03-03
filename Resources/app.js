(function(){
	var osname = Ti.Platform.osname,
		// Open main window
		ApplicationWindow = require('/ui/ApplicationWindow');
	new ApplicationWindow(osname).open();
})();
