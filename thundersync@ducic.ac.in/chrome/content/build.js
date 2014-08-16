var TABS_Config = {
	serverURI : "http://erp:71/twodot7/bit/in.ac.ducic.tabs/getJSON",
	serverRequestType : "POST",
	serverAUTHData : {
		UserName : 'Prashant',
		Token : 'SOMETHING'
	}
	addressBookName : 'MSME'
}

var TABS_Class = {
	/**
	 * Fetches the JSON Data from the server.
	 * @param nextAction Callback Function. This is called on successful data retrieval.
	 * @param errorHandeler Callback Function. Called on any error.
	 * @return JSON Object, returned if no Callback function given.
	 * @author Prashant Sinha
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
		xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
		var Data = "AUTH="+JSON.stringify(TABS_Config.serverAUTHData);
		xmlhttp.send(Data);
	},

};

function clickHandler() {
	var myPanel = document.getElementById("my-panel");
	myPanel.label = "LOL, Broken!";

	TABS_Class.fetchFromServer(
		function(data){
			alert(data);
		},
		function (data) {
			alert("error");
		}
	);
}


**********************************
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
	var flag = 0;
	
	//Accessing one address book only - Doesn't work
	/*let addressBookURI = Components.interfaces.nsIAbDirectory.URI;

	let oneAddressBook = abManager.getDirectory(addressBookURI);
	alert(oneAddressBook);*/
	
	//var addrBookDir = abManager.getDirectory(abURI);
	//return addrBookDir;


	var AB = AddCards(addressBook);

	/*
	 *Accessing multiple address books
	 *Works perfectly
	 */
	
	/*let allAddressBooks = abManager.directories;

	while (allAddressBooks.hasMoreElements())
	{
		let addressBook = allAddressBooks.getNext().QueryInterface(Components.interfaces.nsIAbDirectory);

  		if (addressBook instanceof Components.interfaces.nsIAbDirectory) { // or nsIAbItem or nsIAbCollection
    		alert ("Directory Name:" + addressBook.dirName);
     	}
	}*/

	//alert(allAddressBooks);
}

/*
 *Accessing Mailing Lists - Adding Mailing Lists - Works Perfectly
 */

function addMailList()
{
	var mailList = Components.classes["@mozilla.org/addressbook/directoryproperty;1"]
                         .createInstance(Components.interfaces.nsIAbDirectory);
	mailList.isMailList = true;
	mailList.dirName = "My Mailing List";
	mailList.listNickName = "MSME";
	mailList.description = "List Description";

	/*
	Adding Card to Mail Lists
	*/
	//for (let i = 0; i < 4; i++)
  	//	mailList.addressLists.appendElement(card[i], false);

/*	let allAddressBooks = abManager.directories;

  	while (allAddressBooks.hasMoreElements())
	{
		let addressBook = allAddressBooks.getNext().QueryInterface(Components.interfaces.nsIAbDirectory);
		var parentDirectory = addressBook;
  		if (addressBook instanceof Components.interfaces.nsIAbDirectory) { // or nsIAbItem or nsIAbCollection
    		//alert ("Directory Name:" + addressBook.dirName);
    		parentDirectory.addMailList(mailList);
     		flag = flag+1;
     	}
     	else
     		flag = 0;
    }
    if(flag == 3)
    {
    	alert("Mail List Added! Woohoo!");
    	flag = 0;
    }
*/
}



function AddCards(addressBook) {
	
	alert("started - here1");
	var allCards = [];
	var ab = GetAbDirectory(addressBook);	//Get Address Book	
	alert("back from GetAbDirectory");
	var abURI = GetURI(ab);
	var abCard = GetAbCard();
	alert("back from GetAbCard");
	allCards.push(ab.addCard(abCard));
	alert("card added");
	return abURI;
	//ab.addMailList(abDirectory);		
}



function GetAbDirectory(addressBook) {	
	alert("in GetAbDirectory");
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
		
	var directory = GetLocalAbDirectory(dirName);
	alert("back to GetAbDirectory");
	return directory;
}


function GetLocalAbDirectory(dirName) {
	alert("in GetLocalAbDirectory");

	var myDirectory = null;
    var directories = [];
	
	// [AS/07.12.2011] Hint: Components.classes["@mozilla.org/rdf/rdf-service;1"] failed !!!
	var abManager = Components.classes["@mozilla.org/abmanager;1"].getService(Components.interfaces.nsIAbManager);
	directories = abManager.directories;
	
	while (directories.hasMoreElements()) {  
        addressBook = directories.getNext().QueryInterface(Components.interfaces.nsIAbDirectory);  
        if (addressBook instanceof Components.interfaces.nsIAbDirectory) {
			if (addressBook.dirName == dirName) {
				myDirectory = addressBook;
			}    
        }  
    }  		
	 
	return myDirectory;
}


function GetURI(directory)
{
	if ( directory != null ) {		
		var abManager = Components.classes["@mozilla.org/abmanager;1"].getService(Components.interfaces.nsIAbManager);
		var abURI = directory.URI;
		alert("URI: " + directory.URI);
	}
	else {
		alert("DIRECTORY IS NULL");
	}
	return abURI;
}


function GetAbCard() {
	alert("in GetAbCard");
	var abCard = Components.classes["@mozilla.org/addressbook/cardproperty;1"].createInstance(Components.interfaces.nsIAbCard);
	
	FillAbCard(abCard);
	alert("back from FillAbCard");
	return abCard;
}

function FillAbCard(card) {	
	try
	{
		card.setProperty("FirstName", "John");
  		card.setProperty("LastName", "Smith");
	}
	catch(e) {
		alert("within catch in FillAbCard");
		dump(e);
	}
}

/*function deleteCard(card)
{
	ab.
}*/


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