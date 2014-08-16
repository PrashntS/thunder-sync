/************************************************************************
The contents of this file are Subject of the GNU GENERAL PUBLIC LICENSE 

FileName:   ThunderSYNCMainClass.js
Version:    V0.3.8
Date:       2012-11-17
Author:     Andreas Schaller	email: schallera72@gmail.com

*************************************************************************/



var ThunderSYNCMainClass = {

	ShowMenuItem: false,
	Ready: false, 		
	
	OnLoad: function(event)
	{
		var service = Components.classes["@mozilla.org/intl/stringbundle;1"].getService(Components.interfaces.nsIStringBundleService);
		var StringBundle = service.createBundle("chrome://Thunder-Sync" + "/locale" + "/Thunder-Sync.properties");
		var runningVista = false;
				
		try
		{
			var wrk = Components.classes["@mozilla.org/windows-registry-key;1"]
				.createInstance(Components.interfaces.nsIWindowsRegKey);
			wrk.open(wrk.ROOT_KEY_LOCAL_MACHINE,
							 "Software\\Microsoft\\Windows NT\\CurrentVersion",
							 wrk.ACCESS_READ);
			var id = wrk.readStringValue("CurrentVersion");
			runningVista = (id && id.indexOf("6.") == 0);
			wrk.close();
		}
		catch(err)
		{
			dump(err);
		}	
		if (runningVista)
		{
			this.ShowMenuItem = true;
			this.Ready = true;
			this.SetupUI();
			if (ThunderSYNCPreferences.startOnLoad == true || ThunderSYNCPreferences.startOnDay == true)
			{
				this.LoadContacts();
			}
		}	
	},
	
	SetupUI: function()
	{
		if (this.ShowMenuItem)
		{
			var menuItem = document.getElementById("Thunder-Sync-menuitem");
			menuItem.setAttribute("collapsed", "false");			
		}			
	},
	
	LoadContacts: function()
	{
		var dirName = ThunderSYNCPreferences.getContactDirectory();
		if (dirName && this.Ready) {
			var dir = Components.classes["@mozilla.org/file/local;1"]
				.createInstance(Components.interfaces.nsIFile);
			dir.initWithPath(dirName);
			dir = dir.QueryInterface(Components.interfaces.nsIFile);
			ThunderSYNCClass.LoadContactsFromDir(dir);
		}		
	}
}

window.addEventListener("load", function(e) { ThunderSYNCMainClass.OnLoad(); }, false);
