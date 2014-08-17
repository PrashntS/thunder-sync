window.addEventListener("load", function(e) {
	TABS_Class.putStatus();
	TABS_Class.putStatus("TABS is ready.", 2000);
}, false);

var TABS_Config = {
	serverURI : "http://erp:71/dev/echo",
	serverRequestType : "POST",
	serverAUTHData : {
		UserName : 'Prashant',
		Token : 'SOMETHING'
	},
	addressBookName : 'MSME',
	idleStatus : "TABS Task Done"
};

var TABS_Class = {
	addIntoAddressBook : function(abInstance, CardsData) {
		CardsData = {
			FirstName : "FirstName",
			LastName : "LastName",
			DisplayName : "DisplayName",
			NickName : "NickName",
			PrimaryEmail : "PrimaryEmail",
			SecondEmail : "SecondEmail",
			_AimScreenName : "_AimScreenName",
			HomeAddress : "HomeAddress",
			HomeAddress2 : "HomeAddress2",
			HomeCity : "HomeCity",
			HomeState : "HomeState",
			HomeZipCode : "HomeZipCode",
			HomeCountry : "HomeCountry",
			HomePhone : "HomePhone",
			HomePhoneType : "HomePhoneType",
			WorkAddress : "WorkAddress",
			WorkAddress2 : "WorkAddress2",
			WorkCity : "WorkCity",
			WorkState : "WorkState",
			WorkZipCode : "WorkZipCode",
			WorkCountry : "WorkCountry",
			WorkPhone : "WorkPhone",
			WorkPhoneType : "WorkPhoneType",
			JobTitle : "JobTitle",
			Department : "Department",
			Company : "Company",
			CellularNumber : "CellularNumber",
		};

		Things = [CardsData, CardsData];

		if ( abInstance != null ) {
			var abURI = abInstance.URI;
			var abCard = Components.classes["@mozilla.org/addressbook/cardproperty;1"].
				createInstance(Components.interfaces.nsIAbCard);

			try {
				for (var i = 0; i < Things.length; i++) {
					CardData = Things[i];
					alert(JSON.stringify(CardData));
					alert(i+"LastName"+(typeof CardData.LastName ? CardData.LastName : ""));
					abCard.setProperty("FirstName", typeof CardData.FirstName ? CardData.FirstName : "");
					abCard.setProperty("LastName", typeof CardData.LastName ? CardData.LastName : "");
					abCard.setProperty("DisplayName", typeof CardData.DisplayName ? CardData.DisplayName : "");
					abCard.setProperty("NickName", typeof CardData.NickName ? CardData.NickName : "");
					abCard.setProperty("PrimaryEmail", typeof CardData.PrimaryEmail ? CardData.PrimaryEmail : "");
					abCard.setProperty("SecondEmail", typeof CardData.SecondEmail ? CardData.SecondEmail : "");
					abCard.setProperty("_AimScreenName", typeof CardData._AimScreenName ? CardData._AimScreenName : "");
					abCard.setProperty("HomeAddress", typeof CardData.HomeAddress ? CardData.HomeAddress : "");
					abCard.setProperty("HomeAddress2", typeof CardData.HomeAddress2 ? CardData.HomeAddress2 : "");
					abCard.setProperty("HomeCity", typeof CardData.HomeCity ? CardData.HomeCity : "");
					abCard.setProperty("HomeState", typeof CardData.HomeState ? CardData.HomeState : "");
					abCard.setProperty("HomeZipCode", typeof CardData.HomeZipCode ? CardData.HomeZipCode : "");
					abCard.setProperty("HomeCountry", typeof CardData.HomeCountry ? CardData.HomeCountry : "");
					abCard.setProperty("HomePhone", typeof CardData.HomePhone ? CardData.HomePhone : "");
					abCard.setProperty("HomePhoneType", typeof CardData.HomePhoneType ? CardData.HomePhoneType : "");
					abCard.setProperty("WorkAddress", typeof CardData.WorkAddress ? CardData.WorkAddress : "");
					abCard.setProperty("WorkAddress2", typeof CardData.WorkAddress2 ? CardData.WorkAddress2 : "");
					abCard.setProperty("WorkCity", typeof CardData.WorkCity ? CardData.WorkCity : "");
					abCard.setProperty("WorkState", typeof CardData.WorkState ? CardData.WorkState : "");
					abCard.setProperty("WorkZipCode", typeof CardData.WorkZipCode ? CardData.WorkZipCode : "");
					abCard.setProperty("WorkCountry", typeof CardData.WorkCountry ? CardData.WorkCountry : "");
					abCard.setProperty("WorkPhone", typeof CardData.WorkPhone ? CardData.WorkPhone : "");
					abCard.setProperty("WorkPhoneType", typeof CardData.WorkPhoneType ? CardData.WorkPhoneType : "");
					abCard.setProperty("JobTitle", typeof CardData.JobTitle ? CardData.JobTitle : "");
					abCard.setProperty("Department", typeof CardData.Department ? CardData.Department : "");
					abCard.setProperty("Company", typeof CardData.Company ? CardData.Company : "");
					abCard.setProperty("CellularNumber", typeof CardData.CellularNumber ? CardData.CellularNumber : "");
					abInstance.addCard(abCard);
				};
			}
			catch(e) {
				// SHOW ERROR STATUS
				alert(e);
			}
		}
		else {
			// SHOW NULL STATUS.
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
				TABS_Class.initAddressBook(
					function(ab) {
						TABS_Class.addIntoAddressBook(ab, data);
					},
					function() {
						TABS_Class.putStatus("ERROR Canot Find Addressbook");
						// SHOW ERROR HERE! Addrebook couldnt be iitialized.
					}
				);
			},
			function (data) {
				// Show error here. NO DATA!
				TABS_Class.putStatus("ERROR. NO DATA!");
			}
		);

		//TABS_Class.addIntoAddressBook();
	},

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

	initAddressBook : function(nextAction, errorHandeler) {
		var ab = null;
		var dirName = TABS_Config.addressBookName;

		try	{
			var converter = Components.classes["@mozilla.org/intl/scriptableunicodeconverter"].
				createInstance(Components.interfaces.nsIScriptableUnicodeConverter);
			converter.charset = "UTF-8";
			dirName = converter.ConvertToUnicode(dirName);
			var abManager = Components.classes["@mozilla.org/abmanager;1"].
				getService(Components.interfaces.nsIAbManager);

			var directories = [];
			directories = abManager.directories;
			alert(Object.getOwnPropertyNames(directories));
			var flag = false;
			while (directories.hasMoreElements()) {
				addressBook = directories.getNext().QueryInterface(Components.interfaces.nsIAbDirectory);
				if (addressBook instanceof Components.interfaces.nsIAbDirectory) {
					if (addressBook.dirName == dirName) {
						ab = addressBook;
						flag = true;
						break;
					}
				}
			}

			if(flag == true) {
				abManager.deleteAddressBook(ab.URI);
				abManager.newAddressBook( dirName, "", 2, "ldap_2.servers." + dirName);
			}
			else {
				abManager.newAddressBook( dirName, "", 2, "ldap_2.servers." + dirName);
			}

			var abooks = [];
			abooks = abManager.directories;
			while (abooks.hasMoreElements()) {
				var abInstaces = abooks.getNext().QueryInterface(Components.interfaces.nsIAbDirectory);
				if (abInstaces instanceof Components.interfaces.nsIAbDirectory) {
					if (abInstaces.dirName == dirName) {
						ab = abInstaces;
						break;
					}
				}
			}

			nextAction(ab);
		}
		catch(err) {
			alert("ERROR" + err);
		}
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
	},

	validateData: function(data) {
		//

	}
};
