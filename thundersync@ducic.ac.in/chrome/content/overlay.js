window.addEventListener("load", function(e) { 
	startup(); 
}, false);

window.setInterval(
	function() {
		startup(); 
	}, 60000); //update date every minute

function clickHandler() {
	
	var myPanel = document.getElementById("my-panel");
	myPanel.label = "LOL, Broken!";
	
	const Cu = Components.utils;
	Cu.import("resource://gre/modules/XPCOMUtils.jsm");
	Cu.import("resource://gre/modules/AddonManager.jsm");

	var addressBook  = 'MSME';
	
	var abURI = AddCards(addressBook);
}

function AddCards(addressBook) {

	var ab = null;
	var dirName = addressBook;	
	
	try	{	
		var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
		converter.charset = "UTF-8";
		dirName = converter.ConvertToUnicode(dirName);
	}
	catch(err) {
		alert("within catch");
		dump(err);
	}



	var abManager = Components.classes["@mozilla.org/abmanager;1"].getService(Components.interfaces.nsIAbManager);
	alert("here1");

	//access address books
	/*
    var directories = [];
	directories = abManager.directories;
	while (directories.hasMoreElements()) {  
        addressBook = directories.getNext().QueryInterface(Components.interfaces.nsIAbDirectory); 
        if (addressBook instanceof Components.interfaces.nsIAbDirectory) {
			if (addressBook.dirName == dirName) {
				ab = addressBook;
			}
        }  
    }*/


    //check if address book with name MSME exists or not
    var directories = [];
	directories = abManager.directories;
	alert(Object.getOwnPropertyNames(directories));
	var flag = false;
	while (directories.hasMoreElements()) {  
        addressBook = directories.getNext().QueryInterface(Components.interfaces.nsIAbDirectory); 
        if (addressBook instanceof Components.interfaces.nsIAbDirectory) {
			if (addressBook.dirName != dirName) {
				alert("within if - here6");
			}
			else if (addressBook.dirName == dirName)
			{
				alert("within else if - here7");
				ab = addressBook;
				flag = true;
			}
        }  
    }
    alert(flag);
    /**
     * if flag = true -> address book with this name exists, so delete the existing one
     * if flag = false -> no such address book exists, so create one
     */
    if(flag == true)
    {
    	abManager.deleteAddressBook(ab.URI);
		alert("address book deleted"); 	
		abManager.newAddressBook( dirName, "", PABDIRECTORY, "ldap_2.servers." + dirName);
    	alert("new address book created");    	
    }
    else 
    {
    	alert("NO AB");
    	alert(PABDIRECTORY);
    	abManager.newAddressBook( dirName, "", PABDIRECTORY, "ldap_2.servers." + dirName);
    	alert("new address book created");    	
    }    

    var abooks = [];
    abooks = abManager.directories;
    while (abooks.hasMoreElements()) {  
        var hey = abooks.getNext().QueryInterface(Components.interfaces.nsIAbDirectory);
        if (hey instanceof Components.interfaces.nsIAbDirectory) {
			if (hey.dirName == dirName) {
				ab = hey;
			}
		}
	}

    alert(ab.dirName);
    alert(ab.URI);
    var abCard = Components.classes["@mozilla.org/addressbook/cardproperty;1"].createInstance(Components.interfaces.nsIAbCard);
    //set card properties
    try
	{
		abCard.setProperty("FirstName", "Pragya");
  		abCard.setProperty("LastName", "Jaiswal");
  		abCard.primaryEmail = "pragya.jswl@gmail.com";
	}
	catch(e) {
		alert("within catch in FillAbCard" + e);
		dump(e);
	}


	//add cards
	var num = 0;
	while(num!=4)
	{
		ab.addCard(abCard);
    	alert("card added");
    	num = num + 1;
	}
	
	return ab.URI;
}



function startup() {
	var myPanel = document.getElementById("my-panel");
	var date = new Date();
	var day = date.getDay();
	var dateString = date.getFullYear() + "." + (date.getMonth()+1) + "." + date.getDate();
	myPanel.label = "Date Is: " + dateString;

	var defaultPrefs = Components.classes["@mozilla.org/preferences-service;1"]
				.getService(Components.interfaces.nsIPrefBranch);
	defaultPrefs = defaultPrefs.getDefaultBranch("extensions.Thunder_Sync.");
	defaultPrefs = defaultPrefs.QueryInterface(Components.interfaces.nsIPrefBranch);

	var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                    .getService(Components.interfaces.nsIPrefBranch);
	prefs = prefs.getBranch("extensions.Thunder_Sync.");
	prefs = prefs.QueryInterface(Components.interfaces.nsIPrefBranch);
}