"use strict";

import * as modSchema from "../schema.js";
import * as modMessageBox from "../messageBox.js";
import * as modView from "./view.js";
import * as modGlobalView from "../GlobalView.js";

/*
  Created 08/01/2025 By Roger Williams

  Data handling/events etc.

  
*/
//export vars
export const cmbID = document.getElementById("cmbID");
export const btnSave = document.getElementById("btnSave");
//Note: due to unfixable bug btnNew is called btnNew2
export const btnNew = document.getElementById("btnNew");
export const btnUndo = document.getElementById("btnUndo");
export const btnDelete = document.getElementById("btnDelete");

export const btnNewAddress = document.getElementById("btnNewAddress");
export const btnSaveAddress = document.getElementById("btnSaveAddress");
export const btnDeleteAddress = document.getElementById("btnDeleteAddress");
export const btnClearAddress = document.getElementById("btnClearAddress");

export const txtMSH_MailshotName = document.getElementById(
  "txtMSH_MailshotName"
);
export const lblMSH_MailshotName = document.getElementById(
  "lblMSH_MailshotName"
);
//header controls
export const txtMSH_CVPath = document.getElementById("txtMSH_CVPath");
export const lblMSH_CVPath = document.getElementById("lblMSH_CVPath");
export const txtMSH_LetterPath = document.getElementById("txtMSH_LetterPath");
export const lblMSH_LetterPath = document.getElementById("lblMSH_LetterPath");
export const dteMSH_PrintedDate = document.getElementById("dteMSH_PrintedDate");
export const lblMSH_PrintedDate = document.getElementById("lblMSH_PrintedDate");
export const divMailshotAddresses = document.getElementById(
  "divMailshotAddresses"
);
export const btnPrintMailshot = document.getElementById("btnPrintMailshot");
export const btnPrintTestEnvelope = document.getElementById(
  "btnPrintTestEnvelope"
);

//lines
export const lblMSL_Contact = document.getElementById("lblMSL_Contact");
export const txtMSL_Contact = document.getElementById("txtMSL_Contact");
export const lblMSL_CompanyName = document.getElementById("lblMSL_CompanyName");
export const txtMSL_CompanyName = document.getElementById("txtMSL_CompanyName");
export const lblMSL_Address1 = document.getElementById("lblMSL_Address1");
export const txtMSL_Address1 = document.getElementById("txtMSL_Address1");
export const lblMSL_Address2 = document.getElementById("lblMSL_Address1");
export const txtMSL_Address2 = document.getElementById("txtMSL_Address2");
export const lblMSL_Address3 = document.getElementById("lblMSL_Address3");
export const txtMSL_Address3 = document.getElementById("txtMSL_Address3");
export const lblMSL_TownCity = document.getElementById("lblMSL_TownCity");
export const txtMSL_TownCity = document.getElementById("txtMSL_TownCity");
export const lblMSL_Postcode = document.getElementById("lblMSL_Postcode");
export const txtMSL_Postcode = document.getElementById("txtMSL_Postcode");
export const lblMSH_PrintContact = document.getElementById(
  "lblMSH_PrintContact"
);
export const chkMSH_PrintContact = document.getElementById(
  "chkMSH_PrintContact"
);

export const txtHidden = document.getElementById("txtHidden");
//local

//db var
export let dbJobSeekerCRM;
//table schema var
export let objTableHeader;
export let objTableLines;

//new record
let blnNew = false;
//selected list item
export let intSelectedRow = -1;

const funccmbIDSelect = (event) => {
  /*
   Created 08/01/2025 By Roger Williams

   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    if (blnNew) {
      modMessageBox.funcMessageBox(
        "Record Not Saved, Save?",
        modMessageBox.objIcons.exclamation,
        modMessageBox.objButtons.yes,
        modMessageBox.objButtons.no,
        "load",
        1,
        "btnNew",
        document.getElementsByTagName("html")
      );
    } else {
      modView.funcLoadData();
    }
  }
};

const functextboxKeyDown = (event) => {
  /*
  Created 08/01/2025 By Roger Williams
  
   processes textbox changes

   checks if textbox value > maxlength

   if length at max stops any new characters being added

*/
  let elTemp;
  //get text element
  elTemp = document.getElementById(event.target.id);

  //check if data at max
  if (elTemp.value.length > elTemp.attributes.maxLength - 1) {
    //make sure key pressed is not tab, backspace, delete or left/right cursor move
    //or enter!

    //check if date
    if (elTemp.id.contains("Date")) {
    }
    if (
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight" &&
      event.key !== "Backspace" &&
      event.key !== "Delete" &&
      event.key !== "Enter"
    ) {
      event.preventDefault();
    }
  }
};

export function funcClearCombobox(cmbWhat) {
  /*
  Created 23/01/2025 By Roger Williams

  clears passed combobox
 */
  if (cmbWhat.length > 0) {
    while (cmbWhat.length > 0) {
      cmbWhat.remove(cmbWhat.length - 1);
    }
  }
}
export function funcPopulateCombobox() {
  /*
   Created 09/01/2025 By Roger Williams

   Creates combobox items from db

   Note: because it is a many - many relationship filter
        duplicate values BEFORE adding to combos

  */
  let elFirst;
  let strTemp = "";

  function funcCreateItems() {
    //Creates combobox items from db
    let elTemp;
    const trnTemp = dbJobSeekerCRM.transaction(
      modSchema.constSeekers_Mailshot_Header,
      "readonly"
    );
    const objTemp = trnTemp.objectStore(modSchema.constSeekers_Mailshot_Header);
    const qryTemp = objTemp.openCursor();

    qryTemp.onsuccess = (event) => {
      const curTemp = event.target.result;

      if (curTemp) {
        //create new option element inside the combobox
        if (strTemp !== curTemp.value.MSH_MailshotName) {
          elTemp = document.createElement("option");
          elTemp.value = curTemp.key;
          elTemp.innerText = curTemp.value.MSH_MailshotName;
          cmbID.appendChild(elTemp);
          curTemp.continue();
        }

        if (strTemp !== curTemp.value.MSH_MailshotName) {
          strTemp = curTemp.value.MSH_MailshotName;
        }
      }
    };
  }

  //first clear any existing items
  funcClearCombobox(cmbID);
  // create first item
  // <option value="none" selected disabled hidden>Select ID</option>
  elFirst = document.createElement("option");
  elFirst.value = "none";
  elFirst.innerText = "Select ID";
  cmbID.appendChild(elFirst);
  //populate from db
  funcCreateItems();
}

const funcbtnSaveAddressClick = () => {
  /*
    Created 24/01/2025 By Roger Williams

    saves new data IF not already in list
    Note: not saved to DB ONLY list!
  */
  let intFound = 0;
  let aryErrors1;
  let aryErrors2;

  function funcExists() {
    /*
    Created 22/01/2025 By Roger Williams

    sees if data to add already exists
    specifically the company name

    returns false if not found else row number
   
  */

    let elTemp;
    let intNum = 0;
    let strTemp = "";
    let aryTemp = [];

    aryTemp = document.getElementsByClassName("clhAddressRowContainer");

    for (intNum = 0; intNum < aryTemp.length; intNum++) {
      elTemp = aryTemp[intNum];
      strTemp = elTemp.childNodes[2].innerText;

      if (strTemp === txtMSL_CompanyName.value) {
        return ++intNum;
      }
    }

    return false;
  }

  //check required fields completed
  aryErrors1 = modSchema.funcValidateForm(
    document.getElementsByTagName("textarea"),
    modSchema.constSeekers_Mailshot_Lines
  );
  aryErrors2 = modSchema.funcValidateForm(
    document.getElementsByTagName("input"),
    modSchema.constSeekers_Mailshot_Lines
  );

  //see if returned errors object is empty
  if (aryErrors1.length > 0 || aryErrors2.length > 0) {
    modMessageBox.funcMessageBox(
      "Please Enter Data In All Required Fields",
      modMessageBox.objIcons.error,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "txtMSL_CompanyName",
      document.getElementsByTagName("html")
    );
    return;
  }

  //if exists update
  intFound = funcExists();
  //make sure not already in name list
  if (intFound) {
    // modMessageBox.funcMessageBox(
    //   "Company Already Exists!",
    //   modMessageBox.objIcons.exclamation,
    //   modMessageBox.objButtons.ok,
    //   modMessageBox.objButtons.none,
    //   "none",
    //   1,
    //   "txtMSL_CompanyName"
    // );
    modView.funcUpdateTableRow(intFound);
  } else {
    //add new row
    modView.funcCreateTableRow(true);
  }
};
//handlers
const funcPrintMailshotClick = () => {
  /*
    Created 27/01/2025 By Roger Williams

    handles print mailshot click

    - iterates throuogh the list and prints envelopes
    - prints same numbers of CVs/letters as envelopes

    due to a flaw in browsers unable to iterate through and print 
    from a loop so had to slum it with a button!
  */

  function funcPrintMailshotEnvelopes() {
    let elTemp;
    let winTemp;
    let intNum = 0;
    let aryTemp = [];
    let elTemp2;

    //get all rows
    aryTemp = document.getElementsByClassName("clhAddressRowContainer");
    elTemp = aryTemp[intNum];
    //create first envelope
    winTemp = window.open("/screens/mailshot_Envelope.html");

    const funcPrintEnvelopes = () => {
      if (intNum === aryTemp.length) {
        winTemp.setTimeout(winTemp.close, 0);
      } else {
        elTemp = aryTemp[intNum];
        winTemp.document.getElementById("divCompany").innerText =
          elTemp.childNodes[2].innerText;
        winTemp.document.getElementById("divContact").innerText =
          elTemp.childNodes[3].innerText;
        winTemp.document.getElementById("divAddress1").innerText =
          elTemp.childNodes[4].innerText;
        winTemp.document.getElementById("divAddress2").innerText =
          elTemp.childNodes[5].innerText;
        winTemp.document.getElementById("divAddress3").innerText =
          elTemp.childNodes[6].innerText;
        winTemp.document.getElementById("divTownCity").innerText =
          elTemp.childNodes[7].innerText;
        winTemp.document.getElementById("divPostcode").innerText =
          elTemp.childNodes[8].innerText;
        winTemp.print();
      }
    };

    winTemp.addEventListener("afterprint", (event) => {
      intNum++;

      if (intNum === aryTemp.length) {
        winTemp.setTimeout(winTemp.close, 0);
      } else {
        elTemp2.innerText = `Print Envelope ${intNum + 1} of ${aryTemp.length}`;
      }
    });

    winTemp.onload = () => {
      elTemp2 = winTemp.document.getElementById("btnPrintEnvelope");
      elTemp2.addEventListener("click", funcPrintEnvelopes);
      elTemp2.innerText = `Print Envelope ${intNum + 1} of ${aryTemp.length}`;
    };
  }

  function funcPrintMailshotDocuments() {
    /*
     Created 31/01/2025 By Roger Williams

     Due to restrraints of JavaScript resorting to opening a HTML page
     with hyperlinks to the file(s) and message to user about how many copies to print

     due to browser security via live-server have no idea if link actually works!

    */
    let winTemp;
    let divCopies;
    let lnkDocumentCV;
    let lnkDocumentLetter;
    let aryTemp = [];

    const funcCloseDocumentWindow = () => {
      winTemp.close();
    };

    //get all rows
    aryTemp = document.getElementsByClassName("clhAddressRowContainer");
    //create print page
    winTemp = window.open("/screens/mailshot_Documents.html");

    winTemp.onload = () => {
      lnkDocumentCV = winTemp.document.getElementById("lnkDocumentCV");
      lnkDocumentLetter = winTemp.document.getElementById("lnkDocumentLetter");
      divCopies = winTemp.document.getElementById("divCopies");

      if (txtMSH_CVPath.value.length !== 0) {
        lnkDocumentCV.href = txtMSH_CVPath.value;
        lnkDocumentCV.innerText = "Click To Open CV For Printing";
      }
      if (txtMSH_LetterPath.value.length !== 0) {
        lnkDocumentLetter.href = txtMSH_LetterPath.value;
        lnkDocumentLetterV.innerText = "Click To Open Letter For Printing";
      } else {
        lnkDocumentLetter.style.display = "none";
      }

      divCopies.innerText = `Print ${
        aryTemp.length + 1
      } Copies Of Each Document Click Button When Finished`;
      winTemp.document
        .getElementById("btnClose")
        .addEventListener("click", funcCloseDocumentWindow);
    };
  }

  if (txtMSH_MailshotName.value === 0) return;

  funcPrintMailshotEnvelopes();
  funcPrintMailshotDocuments();
};
const funcPrintTestEnvelopeClick = () => {
  /*
    Created 28/01/2025 By Roger Williams

    handles print test envelope click
    Closes print form when printed
  */
  let winTemp;

  winTemp = window.open("/screens/mailshot_Envelope.html");

  winTemp.onload = () => {
    winTemp.document.getElementById("btnPrintEnvelope").style.display = "none";
    winTemp.document.getElementById("divContact").innerText = "Contact";
    winTemp.document.getElementById("divCompany").innerText = "Company";
    winTemp.document.getElementById("divAddress1").innerText = "Address1";
    winTemp.document.getElementById("divAddress2").innerText = "Address2";
    winTemp.document.getElementById("divAddress3").innerText = "Address3";
    winTemp.document.getElementById("divTownCity").innerText = "Town/City";
    winTemp.document.getElementById("divPostcode").innerText = "Postcode";
    winTemp.alert("Load Test Envelope Into Printer Then Click 'Ok'");
    winTemp.print();
    //close after print
    winTemp.setTimeout(winTemp.close, 0);
  };
};
export function funcSelectButtonClick(event) {
  /*
    Created 27/01/2025 By Roger Williams

    handles address list click
  */
  let elTemp;
  let intNum;
  let strTemp = event.target.id;
  //get row number
  intNum = strTemp.replace(/[^0-9]/g, "");
  //get row div container
  elTemp = document.getElementById("divAddressRowContainer" + intNum);
  //clear any existing address data
  funcbtnClearAddressClick();
  //set global selected row indicator
  intSelectedRow = intNum;
  //populate text boxes
  txtMSL_CompanyName.value = elTemp.childNodes[2].innerText;
  txtMSL_Contact.value = elTemp.childNodes[3].innerText;
  txtMSL_Address1.value = elTemp.childNodes[4].innerText;
  txtMSL_Address2.value = elTemp.childNodes[5].innerText;
  txtMSL_Address3.value = elTemp.childNodes[6].innerText;
  txtMSL_TownCity.value = elTemp.childNodes[7].innerText;
  txtMSL_Postcode.value = elTemp.childNodes[8].innerText;
  strTemp = elTemp.childNodes[9].innerText;
  chkMSH_PrintContact.checked = strTemp = "true" ? true : false;
}

export function funcbtnClearAddressClick() {
  /*
    Created 22/01/2025 By Roger Williams

  */

  txtMSL_CompanyName.value = "";
  txtMSL_Contact.value = "";
  txtMSL_Address1.value = "";
  txtMSL_Address2.value = "";
  txtMSL_Address3.value = "";
  txtMSL_TownCity.value = "";
  txtMSL_Postcode.value = "";
  chkMSH_PrintContact.checked = false;
  txtMSL_Contact.focus();
  intSelectedRow = -1; //reset selected row
}
const funcbtnDeleteAddressClick = () => {
  /*
    Created 22/01/2025 By Roger Williams

    Deletes the selected item from the list and clears the
    details list 
  */

  let elTemp;

  //get row div container
  elTemp = document.getElementById("divAddressRowContainer" + intSelectedRow);
  //delete it
  divMailshotAddresses.removeChild(elTemp);
  //renumber the buttons to reflect actual rows
  modView.funcRenumberRowsResetPositions();
  funcbtnClearAddressClick();
};

const funcbtnNewAddressClick = () => {
  /*
    Created 22/01/2025 By Roger Williams

  */

  funcbtnClearAddressClick();
};

export function funcDeleteRecord(blnSave = false) {
  /*
   Created 24/01/2025 By Roger Willimas
  
   Deletes record

   if blnSave then runs save after delete

*/
  if (txtMSH_MailshotName.value === 0) return;

  const dbRequest = dbJobSeekerCRM.transaction(
    modSchema.constSeekers_Mailshot_Header,
    "readwrite"
  );
  const objHead = dbRequest.objectStore(modSchema.constSeekers_Mailshot_Header);

  // const idxHead = objHead.index("MSH_MailshotName");
  // const keyRangeHead = IDBKeyRange.only(txtMSH_MailshotName.value);
  const dbQueryHead = objHead.openCursor();

  //set value to look for from combobox
  dbQueryHead.onerror = (event) => {
    modMessageBox.funcMessageBox(
      "Error Accessing Table",
      modMessageBox.objIcons.error,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "btnNew",
      document.getElementsByTagName("html")
    );
  };

  dbQueryHead.onsuccess = (event) => {
    //delete header record

    const dbCursorHead = event.target.result;

    if (dbCursorHead) {
      if (dbCursorHead.value.MSH_MailshotName === txtMSH_MailshotName.value) {
        dbCursorHead.delete();
      }
      dbCursorHead.continue();
    } else {
      //delete lines records
      const dbRequest = dbJobSeekerCRM.transaction(
        modSchema.constSeekers_Mailshot_Lines,
        "readwrite"
      );

      const objLines = dbRequest.objectStore(
        modSchema.constSeekers_Mailshot_Lines
      );
      const dbQueryLines = objLines.openCursor(); //(keyRangeLines);

      dbQueryLines.onerror = (event) => {
        modMessageBox.funcMessageBox(
          "Error Accessing Table",
          modMessageBox.objIcons.error,
          modMessageBox.objButtons.ok,
          -1,
          "none",
          1,
          "btnNew",
          document.getElementsByTagName("html")
        );
      };

      dbQueryLines.onsuccess = (event) => {
        const dbCursorLines = event.target.result;

        if (dbCursorLines) {
          if (
            dbCursorLines.value.MSH_MailshotName === txtMSH_MailshotName.value
          ) {
            const dbDeleteLines = dbCursorLines.delete();
            dbDeleteLines.onsuccess = (event) => {
              dbCursorLines.continue();
            };
          } else {
            dbCursorLines.continue();
          }
        } else {
          if (blnSave) {
            funcSaveData();
          }

          if (!blnSave) {
            //clear form
            funcResetForm();
            modMessageBox.funcMessageBox(
              "Record Deleted",
              modMessageBox.objIcons.information,
              modMessageBox.objButtons.ok,
              -1,
              "none",
              1,
              "btnNew",
              document.getElementsByTagName("html")
            );
          }
        }
      };
    }
  };
}
const funcSaveData = () => {
  /*
  Created 08/01/2025 By Roger Williams
  
   processes save

*/
  let intWritten = 0;
  let objTempHead;
  let dbAddHead;
  let qryAddHead;
  let strTemp = "";

  function funcSaveLines() {
    let elTemp;
    let intNum = 0;
    let aryTemp = [];
    let dbAddLines;
    let objTempLines;
    let qryAddLines;

    //save lines
    dbAddLines = dbJobSeekerCRM.transaction(
      modSchema.constSeekers_Mailshot_Lines,
      "readwrite"
    );
    dbAddLines.onerror = (event) => {
      modMessageBox.funcMessageBox(
        "Error Accessing Table",
        modMessageBox.objIcons.error,
        modMessageBox.objButtons.ok,
        -1,
        "none",
        1,
        "btnNew",
        document.getElementsByTagName("html")
      );
    };

    objTempLines = dbAddLines.objectStore(
      modSchema.constSeekers_Mailshot_Lines
    );

    aryTemp = document.getElementsByClassName("clhAddressRowContainer");

    for (intNum = 0; intNum !== aryTemp.length; intNum++) {
      elTemp = aryTemp[intNum];

      qryAddLines = objTempLines.add({
        MSH_MailshotName: txtMSH_MailshotName.value,
        MSL_Address1: elTemp.childNodes[4].innerText,
        MSL_Address2: elTemp.childNodes[5].innerText,
        MSL_Address3: elTemp.childNodes[6].innerText,
        MSL_CompanyName: elTemp.childNodes[2].innerText,
        MSL_Contact: elTemp.childNodes[3].innerText,
        MSL_Postcode: elTemp.childNodes[8].innerText,
        MSL_TownCity: elTemp.childNodes[7].innerText,
      });

      qryAddLines.onerror = (event) => {
        console.log(error);
      };
      qryAddLines.onsuccess = (event) => {
        intWritten = intNum;
      };
    }

    dbAddLines.oncomplete = () => {
      //reset new indicator
      blnNew = false;
      funcResetForm();
      //reload combobox with new values
      funcPopulateCombobox();
      modMessageBox.funcMessageBox(
        "Record Saved",
        modMessageBox.objIcons.information,
        modMessageBox.objButtons.ok,
        -1,
        "none",
        1,
        "btnNew",
        document.getElementsByTagName("html")
      );
    };
  }

  if (txtMSH_MailshotName.value.length === 0) return;

  //save header
  dbAddHead = dbJobSeekerCRM.transaction(
    modSchema.constSeekers_Mailshot_Header,
    "readwrite"
  );
  dbAddHead.onerror = (event) => {
    modMessageBox.funcMessageBox(
      "Error Accessing Table",
      modMessageBox.objIcons.error,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "btnNew",
      document.getElementsByTagName("html")
    );
  };

  objTempHead = dbAddHead.objectStore(modSchema.constSeekers_Mailshot_Header);

  qryAddHead = objTempHead.put({
    MSH_MailshotName: txtMSH_MailshotName.value,
    MSH_CVPath: txtMSH_CVPath.value,
    MSH_LetterPath: txtMSH_LetterPath.value,
    MSH_PrintedDate: dteMSH_PrintedDate.value,
    MSH_PrintContact: chkMSH_PrintContact.checked,
  });

  qryAddHead.onabort = (event) => {
    modMessageBox.funcMessageBox(
      "Error Saving Record",
      modMessageBox.objIcons.error,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "btnNew",
      document.getElementsByTagName("html")
    );
  };
  qryAddHead.onerror = (event) => {
    modMessageBox.funcMessageBox(
      "Error Saving Record",
      modMessageBox.objIcons.error,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "btnNew",
      document.getElementsByTagName("html")
    );
  };
  qryAddHead.onsuccess = (event) => {
    funcSaveLines();
  };
};

const funcbtnSaveClick = () => {
  /*
  Created 08/01/2025 By Roger Williams
  
   if funcvalidateform returns ok checks if responsibilities 
   combobox has contents if so save

*/
  let aryErrors1;
  let aryErrors2;

  //check all required fields filled - header
  aryErrors1 = modSchema.funcValidateForm(
    document.getElementsByTagName("textarea"),
    modSchema.constSeekers_Mailshot_Header
  );
  aryErrors2 = modSchema.funcValidateForm(
    document.getElementsByTagName("input"),
    modSchema.constSeekers_Mailshot_Header
  );

  //see if returned errors object is empty
  if (aryErrors1.length > 0 || aryErrors2.length > 0) {
    modMessageBox.funcMessageBox(
      "Please Enter Data In All Required Fields",
      modMessageBox.objIcons.error,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "txtMSH_MailshotName",
      document.getElementsByTagName("html")
    );
    return;
  }

  if (blnNew) {
    funcSaveData();
  } else {
    //erase existing data THEN save
    funcDeleteRecord(true);
    //  funcSaveData();
  }
};
export function funcUndoChanges() {
  /*
  Created 08/01/2025 By Roger Williams
  
   processes undo

   if not new record simply populates the form from objTable!

*/
  if (txtMSH_MailshotName.value === 0) return;

  blnNew = false;

  if (blnNew) {
    //reset form
    funcResetForm();
    blnNew = false;
  } else {
    modView.funcLoadData();
  }
}
const funcbtnDeleteClick = () => {
  /*
 asks user if wants to delete
 txtHidden handles response

*/
  modMessageBox.funcMessageBox(
    "Delete Record?",
    modMessageBox.objIcons.question,
    modMessageBox.objButtons.yes,
    modMessageBox.objButtons.no,
    "delete",
    2,
    "btnNew",
    document.getElementsByTagName("html")
  );
};
const funcbtnUndoClick = (event) => {
  /*
   asks user if wants to undo
   txtHidden handles response

*/
  modMessageBox.funcMessageBox(
    "Undo Changes",
    modMessageBox.objIcons.question,
    modMessageBox.objButtons.yes,
    modMessageBox.objButtons.no,
    "undo",
    2,
    "btnNew",
    document.getElementsByTagName("html")
  );
};

const funcResetForm = () => {
  /*
 Created 20/01/2025 By Roger Williams
 
 Resets the form and data table

*/

  txtMSH_CVPath.value = "";
  txtMSH_LetterPath.value = "";
  txtMSH_MailshotName.value = "";
  txtMSL_Address1.value = "";
  txtMSL_Address2.value = "";
  txtMSL_Address3.value = "";
  txtMSL_CompanyName.value = "";
  txtMSL_Contact.value = "";
  txtMSL_Postcode.value = "";
  txtMSL_TownCity.value = "";
  chkMSH_PrintContact.checked = false;
  intSelectedRow = -1;
  modView.funcInitTable();
};

const funcbtnNewClick = () => {
  /*
  Created 20/01/2025 By Roger Williams
  
   Creates new record by clearing form fields!

*/

  //if Already a new record been created and text entered in a control
  if (blnNew && txtMSH_MailshotName.value.length !== 0) {
    modMessageBox.funcMessageBox(
      "Record Not Saved, Save?",
      modMessageBox.objIcons.exclamation,
      modMessageBox.objButtons.yes,
      modMessageBox.objButtons.no,
      "save",
      1,
      "txtMSH_MailshotName",
      document.getElementsByTagName("html")
    );
  } else {
    blnNew = true;
    modGlobalView.funcEnableForm(document);
    funcResetForm();
  }
};

//other funcs
export function funcResetblnNew(blnValue = false) {
  /*
   Created 21/01/2025 By Roger Williams

   allows other modules to reset blnNew current modView needs this
   when cmbID is changed to an existing record
  */

  blnNew = blnValue;
}
/*
  event handler for "hidden" textbox whoes focus event tells the 
  program a messagebox button has been clicked so modMessageBox.blnOk
  can be checked to see the result
*/
const funcHiddenTextBoxHandler = (event) => {
  let elTemp;
  //"restore" page
  elTemp = document.getElementsByTagName("html");
  elTemp[0].style.opacity = "1";

  //show which button clicked true = ok false = cancel
  if (modMessageBox.blnOk) {
    if (modMessageBox.strContext === "close") {
      window.close();
    }
    if (modMessageBox.strContext === "save") {
      funcbtnSaveClick();
    }
    if (modMessageBox.strContext === "load") {
      funcbtnSaveClick();
      //load data into form
      modView.funcLoadData();
    }
    if (modMessageBox.strContext === "new") {
      blnNew = true;
      funcResetForm();
    }
    if (modMessageBox.strContext === "delete") {
      blnNew = false;
      funcDeleteRecord(false);
    }
    if (modMessageBox.strContext === "undo") {
      funcUndoChanges();
    }
  }
  //handle if not blnOk and save is context
  else {
    if (
      modMessageBox.strContext === "save" ||
      modMessageBox.strContext === "new"
    ) {
      blnNew = false;
    }
    if (modMessageBox.strContext === "load") {
      blnNew = false;
      //load data into form
      modView.funcLoadData();
    }
  }
};

const funcOpenDatabase = () => {
  let dbopenRequest = indexedDB.open(modSchema.constDBName, 1);

  dbopenRequest.onupgradeneeded = (event) => {
    //if no database create it from the schema file
    funcCreateFromSchema(event);
    modMessageBox.funcMessageBox(
      "Database Created",
      modMessageBox.objIcons.information,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "btnNew",
      document.getElementsByTagName("html")
    );
  };

  dbopenRequest.onerror = () => {
    modMessageBox.funcMessageBox(
      `Error Accessing Database ${dbopenRequest.error}`,
      modMessageBox.objIcons.error,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "btnNew",
      document.getElementsByTagName("html")
    );
  };

  dbopenRequest.onsuccess = () => {
    dbJobSeekerCRM = dbopenRequest.result;
    //work with database

    dbJobSeekerCRM.onversionchange = () => {
      dbJobSeekerCRM.close();
      modMessageBox.funcMessageBox(
        "Database Version Out of Date Reload Page",
        modMessageBox.objIcons.information,
        modMessageBox.objButtons.ok,
        -1,
        "none",
        1,
        "btnNew",
        document.getElementsByTagName("html")
      );
    };

    //activate "action" buttons
    btnSave.style.display = "block";
    btnUndo.style.display = "block";
    btnDelete.style.display = "block";
    btnNew.style.display = "block";
    //populate combobox
    funcPopulateCombobox();
  };
};

//exports
export function funcCreateMessageBoxResultHandler() {
  txtHidden.addEventListener("focus", funcHiddenTextBoxHandler);
}

export function funcInitSchema() {
  //get schema
  objTableHeader = modSchema.funcGetSchema(
    modSchema.constSeekers_Mailshot_Header
  );
  objTableLines = modSchema.funcGetSchema(
    modSchema.constSeekers_Mailshot_Lines
  );
}
export function funcInitDB() {
  /*
  Created 19/02/2025 By Roger Williams

  gets schema for table
  opens db
  gets first record
 */

  //open db
  dbJobSeekerCRM = funcOpenDatabase();
}
export function funcInitHandlers() {
  /*
   Creates handlers for the detail "treeviews" and print/preview buttons
   
  */

  cmbID.addEventListener("change", funccmbIDSelect);
  txtMSH_MailshotName.addEventListener("keydown", functextboxKeyDown);
  txtMSH_CVPath.addEventListener("keydown", functextboxKeyDown);
  txtMSH_LetterPath.addEventListener("keydown", functextboxKeyDown);
  txtMSL_Address1.addEventListener("keydown", functextboxKeyDown);
  txtMSL_Address2.addEventListener("keydown", functextboxKeyDown);
  txtMSL_Address3.addEventListener("keydown", functextboxKeyDown);
  txtMSL_CompanyName.addEventListener("keydown", functextboxKeyDown);
  txtMSL_Contact.addEventListener("keydown", functextboxKeyDown);
  txtMSL_Postcode.addEventListener("keydown", functextboxKeyDown);
  txtMSL_TownCity.addEventListener("keydown", functextboxKeyDown);

  btnSave.addEventListener("click", funcbtnSaveClick);
  btnUndo.addEventListener("click", funcbtnUndoClick);
  btnDelete.addEventListener("click", funcbtnDeleteClick);
  btnNew.addEventListener("click", funcbtnNewClick);

  btnClearAddress.addEventListener("click", funcbtnClearAddressClick);
  btnNewAddress.addEventListener("click", funcbtnNewAddressClick);
  btnSaveAddress.addEventListener("click", funcbtnSaveAddressClick);
  btnDeleteAddress.addEventListener("click", funcbtnDeleteAddressClick);

  btnPrintMailshot.addEventListener("click", funcPrintMailshotClick);
  btnPrintTestEnvelope.addEventListener("click", funcPrintTestEnvelopeClick);
}
