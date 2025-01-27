"use strict";

import * as modSchema from "../schema.js";
import * as modMessageBox from "../messageBox.js";
import * as modView from "./view.js";

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
export const txtPrintedDate = document.getElementById("txtPrintedDate");
export const lblPrintedDate = document.getElementById("lblPrintedDate");
export const divMailshotAddresses = document.getElementById(
  "divMailshotAddresses"
);
// export const tblData = document.getElementById("tblData");
// //table data area
// export const tblDataArea = document
//  .getElementById("tblData")
//  .getElementsByTagName("tbody")[0];
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
export let objTable;

//new record
let blnNew = false;
//selected list item
let intSelectedRow = -1;

// export const funcTableButtonClick = (event) => {
//   /*
//     returns row selected when button clicked
//   */
//   return event.currentTarget.id;
// };

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
        "btnNew"
      );
    } else {
      modView.funcLoadData();
    }
  }
};

// const funcValidateTextLength = (strValue, intMaxLength) => {
//   /*
//        Created 10/01/2024 By Roger Williams

//        Checks if string passed greater than passed max length

//     */
// };
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

export const funcClearCombobox = (cmbWhat) => {
  /*
  Created 23/01/2025 By Roger Williams

  clears passed combobox
 */
  if (cmbWhat.length > 0) {
    while (cmbWhat.length > 0) {
      cmbWhat.remove(cmbWhat.length - 1);
    }
  }
};
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
  let elTemp;

  function funcExists() {
    /*
    Created 22/01/2025 By Roger Williams

    sees if data to add already exists

    Note: need to use TEXT property as value is number!
  */
    let intNum = 0;
    // let intRows;
    let rowTemp;
    let elTemp;

    // if (txtMSL_CompanyName.length === 0) {
    //   return false;
    // }

    // intRows = tblData.rows.length;

    // for (intNum = 1; intNum < intRows; intNum++) {
    //   rowTemp = tblData.rows[intNum];

    //   if (rowTemp.cells[1] === txtMSL_CompanyName.value) {
    //     return true;
    //   }
    // }

    return false;
  }
  //make sure not already in name list
  if (funcExists()) {
    modMessageBox.funcMessageBox(
      "Address Already Exists!",
      modMessageBox.objIcons.exclamation,
      modMessageBox.objButtons.ok,
      modMessageBox.objButtons.none,
      "none",
      1,
      "txtMSL_CompanyName"
    );
    return;
  }

  modView.funcCreateTableRow(true);
};
//handlers
export const funcSelectButtonClick = (event) => {
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
  // console.log(elTemp.childNodes[2].innerText);
  // console.log(elTemp.childNodes[3].innerText);
  txtMSL_CompanyName.value = elTemp.childNodes[2].innerText;
  txtMSL_Contact.value = elTemp.childNodes[3].innerText;
  txtMSL_Address1.value = elTemp.childNodes[4].innerText;
  txtMSL_Address2.value = elTemp.childNodes[5].innerText;
  txtMSL_Address3.value = elTemp.childNodes[6].innerText;
  txtMSL_TownCity.value = elTemp.childNodes[7].innerText;
  txtMSL_Postcode.value = elTemp.childNodes[8].innerText;
  strTemp = elTemp.childNodes[9].innerText;
  chkMSH_PrintContact.checked = strTemp = "true" ? true : false;
};

const funcbtnClearAddressClick = () => {
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
};
const funcbtnDeleteAddressClick = () => {
  /*
    Created 22/01/2025 By Roger Williams

    Deletes the selected item from the list and clears the
    details list 
  */

  let elTemp;
  let intNum = 0;
  let intNum2 = 0;
  let strTemp = "";

  //get row div container
  elTemp = document.getElementById("divAddressRowContainer" + intSelectedRow);
  //delete it
  divMailshotAddresses.removeChild(elTemp);
  //realign the rest of the div rows

  /*
   To Do

   - how know IF anymore divAddressRowContainer<num> exist
   - how got get their unique IDs or
     iterate through the divMailshotAddresses div and do it

  */
  intNum = Number(intSelectedRow) + 1;

  if (intNum > modView.intRows) {
    intNum--;
  }

  while (intNum < modView.intRows + 1) {
    elTemp = document.getElementById("divAddressRowContainer" + intNum);

    if (!elTemp) {
      elTemp = document.getElementById(
        "divAddressRowContainer" + Number(intNum + 1)
      );
    } else {
      elTemp = document.getElementById("divAddressRowContainer" + intNum);
    }

    strTemp = elTemp.style.top;
    intNum2 = Number(strTemp.replace(/[^0-9]/g, ""));
    intNum2 = intNum2 - modView.intRowHeight;
    elTemp.style.top = intNum2 + "px";
    intNum++;
  }

  modView.funcChangeNumberOfRow(modView.intRows - 1);

  if (intNum2 > 0) {
    modView.funcChangeNewRowPos(intNum2);
  } else {
    intNum = Number(intSelectedRow) - 1;
    modView.funcChangeNewRowPos(intNum * modView.intRowHeight);
  }
  funcbtnClearAddressClick();
};

const funcbtnNewAddressClick = () => {
  /*
    Created 22/01/2025 By Roger Williams

  */

  funcbtnClearAddressClick();
};

// const funclstAddressClick = () => {
//   /*
//     Created 22/01/2025 By Roger Williams

//     selects matching row in the details lst

//   */
//   const intIndex = lstAddress_Name.selectedIndex;

//   if (intIndex !== -1) {
//     lstAddress_Details.selectedIndex = intIndex;
//   }
// };
// const funclstAddressDblClick = () => {
//   /*
//     Created 22/01/2025 By Roger Williams

//     populates lstResponsibilities_Details using
//     selected item (CRR_Name)

//   */
//   let elTemp;
//   let qryTemp;
//   const trnTemp = dbJobSeekerCRM.transaction(
//     modSchema.constSeekers_Mailshot_Header,
//     "readonly"
//   );
//   const objTemp = trnTemp.objectStore(modSchema.constSeekers_Mailshot_Header);

//   qryTemp = objTemp.openCursor();
//   qryTemp.onsuccess = (event) => {
//     //create query to get data (cursor)
//     const qryRead = event.target.result;

//     if (lstAddress_Details.length > 0) {
//       while (lstAddress_Details.length > 0) {
//         lstAddress_Details.remove(lstAddress_Details.length - 1);
//       }
//     }
//     while (qryRead) {
//       //find matching role
//       if (qryRead.MSH_MailshotName === txtMSH_MailshotName.value) {
//         elTemp = document.createElement("li");
//         elTemp.innerText = qryRead.CVRR_Details;
//         elTemp.value = elTemp.innerText;
//         lstAddress_Details.appendChild(elTemp);
//       }
//       //goto next record
//       qryRead.continue();
//     }
//   };
// };
// let objTemp = modSchema.funcGetFirstRecord(constSeekers_Mailshot_Header);

// if (modSchema.funcValidateForm) {
//   //save data
// }
// funcPopulateobjData();
// modSchema.funcSaveData(objData);
// let transaction = db.transaction("books", "readwrite"); // (1)
// // get an object store to operate on it
// let books = transaction.objectStore("books"); // (2)
// let book = {
// id: 'js',
// price: 10,
// created: new Date()
// };
// let request = books.add(book); // (3)

//also transaction.oncompleted (event)
// request.onsuccess = function() { // (4)
// console.log("Book added to the store", request.result);
// };
export function funcDeleteRecord() {
  /*
   Created 24/01/2025 By Roger Willimas


*/
  const dbRequest = dbJobSeekerCRM.transaction(
    modSchema.constSeekers_Mailshot_Header,
    "readwrite"
  );
  const objTemp = dbRequest.objectStore(modSchema.constSeekers_Mailshot_Header);
  const idxTemp = objTemp.index("MSH_MailshotName");
  const keyRange = IDBKeyRange.only(txtMSH_MailshotName.value);
  const dbQuery1 = idxTemp.openCursor(keyRange);

  dbQuery1.onerror = (event) => {
    modMessageBox.funcMessageBox(
      "Error Accessing Table",
      modMessageBox.objIcons.error,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "btnNew"
    );
  };

  dbQuery1.onsuccess = (event) => {
    //delete header record
    dbQuery1.delete();

    //delete lines records
    const objTemp = dbRequest.objectStore(
      modSchema.constSeekers_Mailshot_Lines
    );
    const idxTemp = objTemp.index("MSH_MailshotName");
    const keyRange = IDBKeyRange.only(txtMSH_MailshotName.value);
    const dbQuery2 = idxTemp.openCursor(keyRange);

    dbQuery2.onerror = (event) => {
      modMessageBox.funcMessageBox(
        "Error Accessing Table",
        modMessageBox.objIcons.error,
        modMessageBox.objButtons.ok,
        -1,
        "none",
        1,
        "btnNew"
      );
    };

    dbQuery2.onsuccess = (event) => {
      const dbCursor = event.target.result;

      if (dbCursor) {
        dbCursor.delete();
        //    }
        dbCursor.continue();
      }

      //clear form
      funcResetForm();
      modMessageBox.funcMessageBox(
        "Record Deleted",
        modMessageBox.objIcons.information,
        modMessageBox.objButtons.ok,
        -1,
        "none",
        1,
        "btnNew"
      );
    };
  };

  const funcSaveData = () => {
    /*
  Created 08/01/2025 By Roger Williams
  
   processes save

*/
    let dbUpdate;
    let intNum = 0;
    //check all required fields filled
    const aryErrors1 = modSchema.funcValidateForm(
      document.getElementsByTagName("textarea"),
      modSchema.constSeekers_Mailshot_Header
    );
    const aryErrors2 = modSchema.funcValidateForm(
      document.getElementsByTagName("input"),
      modSchema.constSeekers_Mailshot_Header
    );

    //see if returned errors object is empty
    if (!aryErrors1 || !aryErrors2) {
      modMessageBox.funcMessageBox(
        "Please Enter Data In All Required Fields",
        modMessageBox.objIcons.error,
        modMessageBox.objButtons.ok,
        -1,
        "none",
        1,
        "txtSeekers_Mailshot_HeaderMSH_MailshotName"
      );
      return;
    }

    const dbRequest = dbJobSeekerCRM.transaction(
      modSchema.constSeekers_Mailshot_Header,
      "readwrite"
    );
    dbRequest.onerror = (event) => {
      modMessageBox.funcMessageBox(
        "Error Accessing Table",
        modMessageBox.objIcons.error,
        modMessageBox.objButtons.ok,
        -1,
        "none",
        1,
        "btnNew"
      );
    };

    const objTemp = dbRequest.objectStore(
      modSchema.constSeekers_Mailshot_Header
    );

    dbUpdate = objTemp.add({
      MSH_MailshotName: txtMSH_MailshotName.value,
      MSH_CVPath: txtMSH_CVPath.value,
      MSH_LetterPath: txtMSH_LetterPath.value,
      MSH_PrintedDate: txtPrintedDate.value,
      MSH_PrintContact: chkMSH_PrintContact.checked,
    });

    dbUpdate.onsuccess = (event) => {
      //save lines
      const dbRequest = dbJobSeekerCRM.transaction(
        modSchema.constSeekers_Mailshot_Lines,
        "readwrite"
      );
      dbRequest.onerror = (event) => {
        modMessageBox.funcMessageBox(
          "Error Accessing Table",
          modMessageBox.objIcons.error,
          modMessageBox.objButtons.ok,
          -1,
          "none",
          1,
          "btnNew"
        );
      };

      const objTemp = dbRequest.objectStore(
        modSchema.constSeekers_Mailshot_Lines
      );

      for (intNum = 0; tblData.length - 1; intNum++) {
        dbUpdate = objTemp.add({
          MSH_MailshotName: txtMSH_MailshotName.value,
          MSL_Address1: txtMSL_Address1.value,
          MSL_Address2: txtMSL_Address2.value,
          MSL_Address3: txtMSL_Address3.value,
          MSL_CompanyName: txtMSL_CompanyName.value,
          MSL_Contact: txtMSL_Contact.value,
          MSL_Postcode: txtMSL_Postcode.value,
          MSL_TownCity: txtMSL_TownCity.value,
        });
      }

      dbRequest.onsuccess = (event) => {
        //reset new indicator
        blnNew = false;
        //clear form
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
          "btnNew"
        );
      };
    };
  };

  dbUpdate.onerror = (event) => {
    modMessageBox.funcMessageBox(
      "Error Saving Record",
      modMessageBox.objIcons.error,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "btnNew"
    );
  };
}
//  else {
//   //update data
//   //find record by key: cmbID.value
//   //Note: have to convert to number as get() does not convert string!
//   const dbQuery = objTemp.get(Number(cmbID.value));

//   dbQuery.onsuccess = () => {
//     const dbData = dbQuery.result;

//     //edit
//     dbData.MSH_MailshotName = txtMSH_MailshotName.value;
//     dbData.CVRR_Details = txtCVRR_Details.value;
//     dbData.txtMSL_CompanyName = txtMSL_CompanyName.value;

//     //update
//     const dbUpdate = objTemp.put(dbData);

//     dbUpdate.onsuccess = () => {
//       blnNew = false;
//       funcPopulateCombobox();
//       //clear form
//       funcResetForm();
//       modMessageBox.funcMessageBox(
//         "Record Saved",
//         modMessageBox.objIcons.information,
//         modMessageBox.objButtons.ok,
//         -1,
//         "none",
//         1,
//         "btnNew"
//       );
//     };

//     dbUpdate.onerror = (event) => {
//       modMessageBox.funcMessageBox(
//         "Error Updating Record",
//         modMessageBox.objIcons.error,
//         modMessageBox.objButtons.ok,
//         -1,
//         "none",
//         1,
//         "btnNew"
//       );
//     };
//   };
// }

const funcbtnSaveClick = () => {
  /*
  Created 08/01/2025 By Roger Williams
  
   if funcvalidateform returns ok checks if responsibilities 
   combobox has contents if so save

*/
  //check all required fields filled
  const aryErrors = modSchema.funcValidateForm(
    document.getElementsByTagName("input"),
    modSchema.constSeekers_Types
  );

  //see if returned errors object is empty
  if (!aryErrors) {
    modMessageBox.funcMessageBox(
      "Please Enter Data In All Required Fields",
      modMessageBox.objIcons.error,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "btnNew"
    );
    return;
  }

  if (blnNew) {
    funcSaveData();
  } else {
    //erase existing data THEN save
    funcDeleteRecord(true);
    funcSaveData();
  }
};
export function funcUndoChanges() {
  /*
  Created 08/01/2025 By Roger Williams
  
   processes undo

   if not new record simply populates the form from objTable!

*/
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
    "btnNew"
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
    "btnNew"
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
  // modView.funcInitTable();
  intSelectedRow = -1;
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
      "txtMSH_MailshotName"
    );
  } else {
    blnNew = true;
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

function funcOpenDatabase() {
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
      "btnNew"
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
      "btnNew"
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
        "btnNew"
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
}

// let transaction = db.transaction("books", "readwrite"); // (1)
// // get an object store to operate on it
// let books = transaction.objectStore("books"); // (2)
// let book = {
// id: 'js',
// price: 10,
// created: new Date()
// };
// let request = books.add(book); // (3)

//also transaction.oncompleted (event)
// request.onsuccess = function() { // (4)
// console.log("Book added to the store", request.result);
// };
// request.onerror = function(event) {
//     // ConstraintError occurs when an object with the same id already exists
//     if (request.error.name == "ConstraintError") {
//     console.log("Book with such id already exists"); // handle the error
//     event.preventDefault(); // don't abort the transaction
//     // use another key for the book?
//     } else {
//     // unexpected error, can't handle it
//     // the transaction will abort
//     }
//     };
//     transaction.onabort = function() {
//     console.log("Error", transaction.error);
//     };

//search
// get one book
// books.get('js')
// // get books with 'css' <= id <= 'html'
// books.getAll(IDBKeyRange.bound('css', 'html'))
// // get books with id < 'html'
// books.getAll(IDBKeyRange.upperBound('html', true))
// // get all books
// books.getAll()
// // get all keys, where id > 'js'
// books.getAllKeys(IDBKeyRange.lowerBound('js', true))

//use index to search on non key fields
// let index = books.createIndex('price_idx', 'price');
// let priceIndex = books.index("price_idx");
// index.get("Donna").onsuccess = (event) => {
//     console.

//delete by index
// find the key where price = 5
// let request = priceIndex.getKey(5);
// request.onsuccess = function() {
// let id = request.result;
// let deleteRequest = books.delete(id);

//cursor
// called for each book found by the cursor
// request.onsuccess = function() {
//     let cursor = request.result;
//     if (cursor) {
//     let key = cursor.key; // book key (id field)
//     let value = cursor.value; // book object
//     console.log(key, value);
//     cursor.continue();
//     } else {
//     console.log("No more books");
//     }

// The main cursor methods are:
// advance(count) – advance the cursor count times, skipping values.
// continue([key]) – advance the cursor to the next value in range matching (or immediately after key if given).

//exports
export function funcCreateMessageBoxResultHandler() {
  txtHidden.addEventListener("focus", funcHiddenTextBoxHandler);
}

// export function funcOpenDatabase() {
//   let dbopenRequest = indexedDB.open("RogsJobSeekerCRM", 1);

//   // dbopenRequest.onupgradeneeded = (event) => {
//   //   //if no database create it from the schema file
//   //   funcCreateFromSchema(event);
//   // };

//   dbopenRequest.onerror = () => {
//     alert(`Error Accessing Database ${dbopenRequest.error}`);
//   };

//   dbopenRequest.onsuccess = () => {
//    modSchema.dbJobSeekerCRM = dbopenRequest.result;

//     dbJobSeekerCRM.onversionchange = () => {
//       dbJobSeekerCRM.close();
//       alert("Database Version Is Outdated Please Reload Page");
//     };
//     //populate combobox
//     funcPopulateCombobox();
//   };
// }
// export function funcOpenDB() {
//   /*
//   Created 13/01/2025 By Roger Williams

//   opens db and stores in local var
// */
//   modSchema.dbJobSeekerCRM = modSchema.funcOpenDatabase();
// }
export function funcInitSchema() {
  //get schema
  objTable = modSchema.funcGetSchema(modSchema.constSeekers_Mailshot_Header);
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
  // //get first record
  // objData = modSchema.funcGetFirstRecord(modSchema.constSeekers_Mailshot_Header);
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
}
