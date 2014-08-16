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
	
	let abManager = Components.classes["@mozilla.org/abmanager;1"].getService(Components.interfaces.nsIAbManager);
	var flag = 0;

	//Accessing one address book only - Doesn't work
	/*let addressBookURI = Components.interfaces.nsIAbDirectory.URI;

	let oneAddressBook = abManager.getDirectory(addressBookURI);
	alert(oneAddressBook);*/


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


	/*
	 *Accessing Mailing Lists - Adding Mailing Lists - Works Perfectly
	 */

/*	var mailList = Components.classes["@mozilla.org/addressbook/directoryproperty;1"]
                         .createInstance(Components.interfaces.nsIAbDirectory);
	mailList.isMailList = true;
	mailList.dirName = "My Mailing List";
	mailList.listNickName = "MSME";
	mailList.description = "List Description";
*/
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


    /*
     *Adding Contacts/Cards to address books
     */
    let card = Components.classes["@mozilla.org/addressbook/cardproperty;1"]
                     .createInstance(Components.interfaces.nsIAbCard);
  	 //</span>
  	let allAddressBooks = abManager.directories;
  	while (allAddressBooks.hasMoreElements())
	{
		let addressBook = allAddressBooks.getNext().QueryInterface(Components.interfaces.nsIAbDirectory);
		
  		if (addressBook instanceof Components.interfaces.nsIAbDirectory) { // or nsIAbItem or nsIAbCollection
  			alert(Components.interfaces.nsIAbDirectory.readOnly ? "True" : "Nay");
  			//alert("here");
  			alert(addressBook.dirName);
  			//let newCard = addressbook.addCard(card);
  			alert("Card object" + card);
  			alert("John " + card.setProperty("FirstName", "John"));
	  		alert("Smith " + card.setProperty("LastName", "Smith"));
  			card.primaryEmail = "john@invalid.com";
  	
  			//alert(addressbook.modifyCard(card));
  			alert("Card added to " + addressBook.dirName);
  			break;
  			//flag = 1;
  		}
  		//if(flag == 1) {
  		//	break;
  		//}
  	}
}


function startup() {
	var myPanel = document.getElementById("my-panel");
	var date = new Date();
	var day = date.getDay();
	var dateString = date.getFullYear() + "." + (date.getMonth()+1) + "." + date.getDate();
	myPanel.label = "Date Is: " + dateString;
}
