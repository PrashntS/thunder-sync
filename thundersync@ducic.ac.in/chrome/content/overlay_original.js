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
	
	let abManager = Components.classes["@mozilla.org/abmanager;1"].getService(Components.interfaces.nsIAbManager);

	var abURI = AddCards(addressBook);
}

function AddCards(addressBook) {
	
	var ab = null;
	var abCard = Components.classes["@mozilla.org/addressbook/cardproperty;1"].createInstance(Components.interfaces.nsIAbCard);

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

	//accessaddress books

    var directories = [];
	
	var abManager = Components.classes["@mozilla.org/abmanager;1"].getService(Components.interfaces.nsIAbManager);
	directories = abManager.directories;
	
	while (directories.hasMoreElements()) {  
        addressBook = directories.getNext()//.QueryInterface(Components.interfaces.nsIAbDirectory); 
        //alert(addressBook.getCardFromProperty("JobTitle", "software engineer", false); 
        if (addressBook instanceof Components.interfaces.nsIAbDirectory) {
        	alert("Collection");
			if (addressBook.dirName == dirName) {
				alert("dirName");
				ab = addressBook;
			}

	alert(Object.getOwnPropertyNames(ab));
	alert(Object.getOwnPropertyNames(abManager));

			var searchResult = abManager.getDirectory(ab.URI+"?"+"(FirstName,bw,Pragya)");
			alert(JSON.stringify(searchResult)+"CHIL"+ab.URI);
			
			/*if (addressBook instanceof Components.interfaces.nsIAbDirectory && !addressBook.isRemote) {
				let searchResult = abManager.getDirectory(ab.URI).childCards;
				alert(searchResult);
			}	*/   
        }  
    }

    var abURI = ab.URI;		//get ab URI
    alert(abURI);
    

    //set card properties
    try
	{
		abCard.setProperty("FirstName", "Pragya");
  		abCard.setProperty("LastName", "Jaiswal");
  		//abCard.primaryEmail = "pragya.jswl@gmail.com";
  		abCard.setProperty("Email", "pragya.jswl@gmail.com");
	}
	catch(e) {
		alert("within catch in FillAbCard" + e);
		dump(e);
	}

    ab.addCard(abCard);		//add cards
    alert("card added");
	
	alert(Object.getOwnPropertyNames(ab));
	
	//delete cards


		var cardID = abCard.getProperty("FirstName", false);
		alert(cardID);
		var card = ab.getCardFromProperty("FirstName", cardID , false);
		alert(card);
		
		var cardsToDelete = Components.classes["@mozilla.org/array;1"].createInstance(Components.interfaces.nsIMutableArray);
	    alert("here1");
	    cardsToDelete.appendElement(card, false);
	    alert(JSON.stringify(card));
	    ab.dropCard(cardsToDelete);
	   // ab.deleteCards(cardsToDelete);
	    alert("card deleted");	    
	
	return abURI;
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