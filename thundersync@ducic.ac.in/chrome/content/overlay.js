window.addEventListener("load", function(e) { 
	TABS_Class.putStatus();
	TABS_Class.putStatus("TABS is ready.", 2000);
}, false);

window.setInterval(
	function() {
		startup(); 
	}, 60000); //update date every minute

var TABS_Config = {
	serverURI : "http://erp:71/dev/echo",
	serverRequestType : "POST",
	serverAUTHData : {
		UserName : 'Prashant',
		Token : 'SOMETHING'
	},
	addressBookName : 'MSME',
	idleStatus : "TABS Task Done"
}

var TABS_Class = {
	addIntoAddressBook : function(CardData) {
		CardData = CardData ? CardData : {
			Name : 'Mr. Leo Waldez',
			FirstName: 'Leo',
			LastName: 'Waldez',
			EMail: 'waldez@camphalfbood.com'
		};

		var addressBook  = TABS_Config.addressBookName;
		var dirName = addressBook;	

		// Converting the addressbook name to Unicode, in case of other encoding.
		try	{	
			var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"].createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
			converter.charset = "UTF-8";
			dirName = converter.ConvertToUnicode(dirName);
		}
		catch(err) {
			return err;
		}

		/**
		 * ab Contains the final addressbook Object.
		 */
		var ab = null;
		var directories = [];

		var abManager = Components.classes["@mozilla.org/abmanager;1"].getService(Components.interfaces.nsIAbManager);
		directories = abManager.directories;

		// Get Address Book.
		while (directories.hasMoreElements()) {
			addressBook = directories.getNext().QueryInterface(Components.interfaces.nsIAbDirectory);
			if (addressBook instanceof Components.interfaces.nsIAbDirectory) {
				if (addressBook.dirName == dirName) {
					ab = addressBook;
				}
			}
		} 

		if ( ab != null ) {		
			var abURI = ab.URI;
			var abCard = Components.classes["@mozilla.org/addressbook/cardproperty;1"].createInstance(Components.interfaces.nsIAbCard);
			
			try
			{
				abCard.setProperty("FirstName", "John");
				abCard.setProperty("LastName", "Smith");
			}
			catch(e) {
				alert("within catch in FillAbCard"+e);
				dump(e);
			}
			ab.addCard(abCard)
			alert("card added");
		}
		else {
			alert("DIRECTORY IS NULL");
		}
	},

	/**
	 * Click handeler on the TABS button.
	 * @author Prashant Sinha, prashantsinha@outlook.com
	 */
	buttonClick : function() {
		TABS_Class.putStatus("TABS Sending...", 1000);

		TABS_Class.fetchFromServer(
			function(data){
				alert(JSON.stringify(data));
			},
			function (data) {
				alert("error");
			}
		);

		//TABS_Class.addIntoAddressBook();
	},

	clearAddressBook : function() {
		//
	}

	/**
	 * Fetches the JSON Data from the server.
	 * @param nextAction Callback Function. This is called on successful data retrieval.
	 * @param errorHandeler Callback Function. Called on any error.
	 * @return JSON Object, returned if no Callback function given.
	 * @author Mathias Bynens, https://mathiasbynens.be/notes/xhr-responsetype-json
	 */
	fetchFromServer : function(nextAction, errorHandeler) {
		//
		var xhr = typeof XMLHttpRequest != 'undefined' ? 
			new XMLHttpRequest() :
			new ActiveXObject('Microsoft.XMLHTTP');
		xhr.open(TABS_Config.serverRequestType, TABS_Config.serverURI, true);
		xhr.onreadystatechange = function() {
			var status;
			var data;
			if (xhr.readyState == 4) {
				status = xhr.status;
				if (status == 200) {
					data = JSON.parse(xhr.responseText);
					nextAction && nextAction(data);
				} else {
					errorHandeler && errorHandeler(status);
				}
			}
		};
		xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		var Data = "AUTH="+JSON.stringify(TABS_Config.serverAUTHData);
		xhr.send(Data);
	},

	/**
	 * Puts the String in `message` parameter into the Statusbar.
	 * @param message string The Message to be written in the Statusbar.
	 * @param timer integer If specified, it'd revert to the Idle message after the given time.
	 * @author Prashant Sinha, prashantsinha@outlook.com
	 */
	putStatus: function(message, timer) {
		var statusBar = document.getElementById("TABS-Status");
		message = message ? message : TABS_Config.idleStatus;
		statusBar.label = message;
		if (timer && Number(timer)) {
			window.setTimeout(
				function() {
					statusBar.label = TABS_Config.idleStatus;
				},
				timer
			);
		}
	}
};

function startup() {

	TABS_Class.putStatus("TABS IDLE!");

	var defaultPrefs = Components.classes["@mozilla.org/preferences-service;1"]
				.getService(Components.interfaces.nsIPrefBranch);
	defaultPrefs = defaultPrefs.getDefaultBranch("extensions.Thunder_Sync.");
	defaultPrefs = defaultPrefs.QueryInterface(Components.interfaces.nsIPrefBranch);

	var prefs = Components.classes["@mozilla.org/preferences-service;1"]
                   .getService(Components.interfaces.nsIPrefBranch);
	prefs = prefs.getBranch("extensions.Thunder_Sync.");
	prefs = prefs.QueryInterface(Components.interfaces.nsIPrefBranch);
}