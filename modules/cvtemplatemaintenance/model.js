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

export const btnCreateCV = document.getElementById("btnPrint");
export const btnClearCV = document.getElementById("btnClearCV");

//header controls
export const txtJobTitle = document.getElementById("txtJobTitle");
export const lblJobTitle = document.getElementById("lblJobTitle");
export const chkPrintAddress = document.getElementById("chkPrintAddress");
export const lblPrintAddress = document.getElementById("lblPrintAddress");
export const txtCVTemplateName = document.getElementById("txtCVTemplateName");
export const lblCVTemplateName = document.getElementById("lblCVTemplateName");

//contact details
export const divContactDetails = document.getElementById("divContactDetails");
export const divTableContact = document.getElementById("divTableContact");
//all tables where data is copied to for use on CV have prefix: divTableCV
export const divTableCVContact = document.getElementById("divTableCVContact");

//current focus
export const divCurrentFocus = document.getElementById("divCurrentFocus");
export const divTableCurrentFocus = document.getElementById("divTableCurrentFocus");
export const divTableCVCurrentFocus = document.getElementById("divTableCVCurrentFocus");
//education
export const divEducation = document.getElementById("divEducationDetails");

export const divTableEducation = document.getElementById("divTableEducation");
export const divTableCVEducation = document.getElementById("divTableCVEducation");
//Experience
export const divExperience = document.getElementById("divExperienceDetails");
export const divTableExperience = document.getElementById("divTableExperience");
export const divTableCVExperience = document.getElementById("divTableCVExperience");
//Highlights
export const divHighlights = document.getElementById("divHighlightsDetails");
export const divTableHighlights = document.getElementById("divTableHighlights");
export const divTableCVHighlights = document.getElementById("divTableCVHighlights");
//Interests
export const divInterests = document.getElementById("divInterestsDetails");
//export const divCVInterests = document.getElementById("divCvInterestsDetails");
export const divTableInterests = document.getElementById("divTableInterests");
export const divTableCVInterests = document.getElementById("divTableCVInterests");
export const divOther = document.getElementById("divOtherDetails");
//export const divCVOther = document.getElementById("divCvOtherDetails");
export const divTableOther = document.getElementById("divTableOther");
export const divTableCVOther = document.getElementById("divTableCVOther");
//PersonalInfo
export const divPersonalInfo = document.getElementById("divPersonalInfo");
//export const divCVPersonalInfo = document.getElementById("divCvPersonalInfo");
export const divTablePersonalInfo = document.getElementById("divTablePersonalInfo");
export const divTableCVPersonalInfo = document.getElementById("divTableCVPersonalInfo");
//Personality
export const divPersonality = document.getElementById("divPersonalityDetails");
export const divTablePersonality = document.getElementById("divTablePersonality");
export const divTableCVPersonality = document.getElementById("divTableCVPersonality");
//Responsibilities
export const divResponsibilities = document.getElementById("divResponsibilitiesDetails");
export const divCVResponsibilities = document.getElementById("divCVResponsibilitiesDetails");
export const divTableResponsibilities = document.getElementById("divTableResponsibilities");
export const divTableCVResponsibilities = document.getElementById("divTableCVResponsibilites");
//Skills
export const divSkills = document.getElementById("divSkillsDetails");
export const divTableSkills = document.getElementById("divTableSkills");
export const divTableCVSkills = document.getElementById("divTableCVSkills");
//special hidden text box for messages
export const txtHidden = document.getElementById("txtHidden");

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
  // if (event.target.value != "none") {
  //   if (blnNew) {
  //     modMessageBox.funcMessageBox(
  //       "Record Not Saved, Save?",
  //       modMessageBox.objIcons.exclamation,
  //       modMessageBox.objButtons.yes,
  //       modMessageBox.objButtons.no,
  //       "load",
  //       1,
  //       "btnNew",
  //       document.getElementsByTagName("html")
  //     );
  //   } else {
  //     modView.funcLoadData();
  //   }
  // }
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
  // if (cmbWhat.length > 0) {
  //   while (cmbWhat.length > 0) {
  //     cmbWhat.remove(cmbWhat.length - 1);
  //   }
  // }
}
export function funcPopulateCombobox() {
  /*
   Created 09/01/2025 By Roger Williams

   Creates combobox items from db

   Note: because it is a many - many relationship filter
        duplicate values BEFORE adding to combos

  */
  // let elFirst;
  // let strTemp = "";
  // function funcCreateItems() {
  //   //Creates combobox items from db
  //   let elTemp;
  //   const trnTemp = dbJobSeekerCRM.transaction(
  //     modSchema.constSeekers_Mailshot_Header,
  //     "readonly"
  //   );
  //   const objTemp = trnTemp.objectStore(modSchema.constSeekers_Mailshot_Header);
  //   const qryTemp = objTemp.openCursor();
  //   qryTemp.onsuccess = (event) => {
  //     const curTemp = event.target.result;
  //     if (curTemp) {
  //       //create new option element inside the combobox
  //       if (strTemp !== curTemp.value.MSH_MailshotName) {
  //         elTemp = document.createElement("option");
  //         elTemp.value = curTemp.key;
  //         elTemp.innerText = curTemp.value.MSH_MailshotName;
  //         cmbID.appendChild(elTemp);
  //         curTemp.continue();
  //       }
  //       if (strTemp !== curTemp.value.MSH_MailshotName) {
  //         strTemp = curTemp.value.MSH_MailshotName;
  //       }
  //     }
  //   };
  // }
  // //first clear any existing items
  // funcClearCombobox(cmbID);
  // // create first item
  // // <option value="none" selected disabled hidden>Select ID</option>
  // elFirst = document.createElement("option");
  // elFirst.value = "none";
  // elFirst.innerText = "Select ID";
  // cmbID.appendChild(elFirst);
  // //populate from db
  // funcCreateItems();
  //populate table controls from database
  //  modView.funcLoadData();
}

//handlers

export function funcSelectButtonClick(event) {
  /*
    Created 27/01/2025 By Roger Williams

    handles address list click
  */
  //  let elTemp;
  let intNum;
  let strTable = "";
  let strTemp = event.target.id;
  //get row number
  intNum = strTemp.replace(/[^0-9]/g, "");
  //get row div container
  strTable = strTemp.substring(3, strTemp.indexOf("Select"));
  // elTemp = document.getElementById(
  //   "div" + strTable + "DataRowContainer" + intNum
  // );

  // if (strTable === modSchema.constCV_Contact) {
  modView.funcCopyTableRow(strTable, intNum);
  // }
}

const funcbtnAddClick = (event) => {
  /*
    Created 13/02/2025 By Roger Williams

    global handler for add to CV_ table
  */
  let strTemp = "";
  let intNum = 0;

  //get row number
  intNum = strTemp.replace(/[^0-9]/g, "");
  strTemp = event.target.id;
  //extract table name
  strTemp = strTemp.substring(6, strTemp.length);

  if (event.target.id === modSchema.constCV_Contact) {
    modView.funcCopyTableRow(strTable, intNum);
  }
};

export const funcbtnRemoveClick = (event) => {
  /*
    Created 20/02/2025 By Roger Williams

    global handler for remove from CV_ table
  */
  // let strTemp = "";
  // let intNum = 0;

  // //get row number
  // intNum = strTemp.replace(/[^0-9]/g, "");
  // strTemp = event.target.id;
  // //extract table name
  // strTemp = strTemp.substring(6, strTemp.length);

  modView.funcDeleteFromCVTable(event);
};

const funcbtnClearCVClick = () => {
  /*
    Created 13/02/2025 By Roger Williams

    resets form
  */

  funcResetForm();
};

const funcbtnCreateCVClick = () => {
  modView.funcCreateCV();
};
// export function funcDeleteRecord(blnSave = false) {
//   /*
//    Created 24/01/2025 By Roger Willimas

//    Deletes record

//    if blnSave then runs save after delete

// */
//   if (txtMSH_MailshotName.value === 0) return;

//   const dbRequest = dbJobSeekerCRM.transaction(
//     modSchema.constSeekers_Mailshot_Header,
//     "readwrite"
//   );
//   const objHead = dbRequest.objectStore(modSchema.constSeekers_Mailshot_Header);

//   // const idxHead = objHead.index("MSH_MailshotName");
//   // const keyRangeHead = IDBKeyRange.only(txtMSH_MailshotName.value);
//   const dbQueryHead = objHead.openCursor();

//   //set value to look for from combobox
//   dbQueryHead.onerror = (event) => {
//     modMessageBox.funcMessageBox(
//       "Error Accessing Table",
//       modMessageBox.objIcons.error,
//       modMessageBox.objButtons.ok,
//       -1,
//       "none",
//       1,
//       "btnNew",
//       document.getElementsByTagName("html")
//     );
//   };

//   dbQueryHead.onsuccess = (event) => {
//     //delete header record

//     const dbCursorHead = event.target.result;

//     if (dbCursorHead) {
//       if (dbCursorHead.value.MSH_MailshotName === txtMSH_MailshotName.value) {
//         dbCursorHead.delete();
//       }
//       dbCursorHead.continue();
//     } else {
//       //delete lines records
//       const dbRequest = dbJobSeekerCRM.transaction(
//         modSchema.constSeekers_Mailshot_Lines,
//         "readwrite"
//       );

//       const objLines = dbRequest.objectStore(
//         modSchema.constSeekers_Mailshot_Lines
//       );
//       const dbQueryLines = objLines.openCursor(); //(keyRangeLines);

//       dbQueryLines.onerror = (event) => {
//         modMessageBox.funcMessageBox(
//           "Error Accessing Table",
//           modMessageBox.objIcons.error,
//           modMessageBox.objButtons.ok,
//           -1,
//           "none",
//           1,
//           "btnNew",
//           document.getElementsByTagName("html")
//         );
//       };

//       dbQueryLines.onsuccess = (event) => {
//         const dbCursorLines = event.target.result;

//         if (dbCursorLines) {
//           if (
//             dbCursorLines.value.MSH_MailshotName === txtMSH_MailshotName.value
//           ) {
//             const dbDeleteLines = dbCursorLines.delete();
//             dbDeleteLines.onsuccess = (event) => {
//               dbCursorLines.continue();
//             };
//           } else {
//             dbCursorLines.continue();
//           }
//         } else {
//           if (blnSave) {
//             funcSaveData();
//           }

//           if (!blnSave) {
//             //clear form
//             funcResetForm();
//             modMessageBox.funcMessageBox(
//               "Record Deleted",
//               modMessageBox.objIcons.information,
//               modMessageBox.objButtons.ok,
//               -1,
//               "none",
//               1,
//               "btnNew",
//               document.getElementsByTagName("html")
//             );
//           }
//         }
//       };
//     }
//   };
// }
// const funcSaveData = () => {
//   /*
//   Created 08/01/2025 By Roger Williams

//    processes save

// */
//   let intWritten = 0;
//   let objTempHead;
//   let dbAddHead;
//   let qryAddHead;
//   let strTemp = "";

//   function funcSaveLines() {
//     let elTemp;
//     let intNum = 0;
//     let aryTemp = [];
//     let dbAddLines;
//     let objTempLines;
//     let qryAddLines;

//     //save lines
//     dbAddLines = dbJobSeekerCRM.transaction(
//       modSchema.constSeekers_Mailshot_Lines,
//       "readwrite"
//     );
//     dbAddLines.onerror = (event) => {
//       modMessageBox.funcMessageBox(
//         "Error Accessing Table",
//         modMessageBox.objIcons.error,
//         modMessageBox.objButtons.ok,
//         -1,
//         "none",
//         1,
//         "btnNew",
//         document.getElementsByTagName("html")
//       );
//     };

//     objTempLines = dbAddLines.objectStore(
//       modSchema.constSeekers_Mailshot_Lines
//     );

//     aryTemp = document.getElementsByClassName("clhAddressRowContainer");

//     for (intNum = 0; intNum !== aryTemp.length; intNum++) {
//       elTemp = aryTemp[intNum];

//       qryAddLines = objTempLines.add({
//         MSH_MailshotName: txtMSH_MailshotName.value,
//         MSL_Address1: elTemp.childNodes[4].innerText,
//         MSL_Address2: elTemp.childNodes[5].innerText,
//         MSL_Address3: elTemp.childNodes[6].innerText,
//         MSL_CompanyName: elTemp.childNodes[2].innerText,
//         MSL_Contact: elTemp.childNodes[3].innerText,
//         MSL_Postcode: elTemp.childNodes[8].innerText,
//         MSL_TownCity: elTemp.childNodes[7].innerText,
//       });

//       qryAddLines.onerror = (event) => {
//         console.log(error);
//       };
//       qryAddLines.onsuccess = (event) => {
//         intWritten = intNum;
//       };
//     }

//     dbAddLines.oncomplete = () => {
//       //reset new indicator
//       blnNew = false;
//       funcResetForm();
//       //reload combobox with new values
//       funcPopulateCombobox();
//       modMessageBox.funcMessageBox(
//         "Record Saved",
//         modMessageBox.objIcons.information,
//         modMessageBox.objButtons.ok,
//         -1,
//         "none",
//         1,
//         "btnNew",
//         document.getElementsByTagName("html")
//       );
//     };
//   }

//   if (txtMSH_MailshotName.value.length === 0) return;

//   //save header
//   dbAddHead = dbJobSeekerCRM.transaction(
//     modSchema.constSeekers_Mailshot_Header,
//     "readwrite"
//   );
//   dbAddHead.onerror = (event) => {
//     modMessageBox.funcMessageBox(
//       "Error Accessing Table",
//       modMessageBox.objIcons.error,
//       modMessageBox.objButtons.ok,
//       -1,
//       "none",
//       1,
//       "btnNew",
//       document.getElementsByTagName("html")
//     );
//   };

//   objTempHead = dbAddHead.objectStore(modSchema.constSeekers_Mailshot_Header);

//   qryAddHead = objTempHead.put({
//     MSH_MailshotName: txtMSH_MailshotName.value,
//     MSH_CVPath: txtMSH_CVPath.value,
//     MSH_LetterPath: txtMSH_LetterPath.value,
//     MSH_PrintedDate: dteMSH_PrintedDate.value,
//     MSH_PrintContact: chkMSH_PrintContact.checked,
//   });

//   qryAddHead.onabort = (event) => {
//     modMessageBox.funcMessageBox(
//       "Error Saving Record",
//       modMessageBox.objIcons.error,
//       modMessageBox.objButtons.ok,
//       -1,
//       "none",
//       1,
//       "btnNew",
//       document.getElementsByTagName("html")
//     );
//   };
//   qryAddHead.onerror = (event) => {
//     modMessageBox.funcMessageBox(
//       "Error Saving Record",
//       modMessageBox.objIcons.error,
//       modMessageBox.objButtons.ok,
//       -1,
//       "none",
//       1,
//       "btnNew",
//       document.getElementsByTagName("html")
//     );
//   };
//   qryAddHead.onsuccess = (event) => {
//     funcSaveLines();
//   };
// };

// const funcbtnSaveClick = () => {
//   /*
//   Created 08/01/2025 By Roger Williams

//    if funcvalidateform returns ok checks if responsibilities
//    combobox has contents if so save

// */
//   let aryErrors1;
//   let aryErrors2;

//   //check all required fields filled - header
//   aryErrors1 = modSchema.funcValidateForm(
//     document.getElementsByTagName("textarea"),
//     modSchema.constSeekers_Mailshot_Header
//   );
//   aryErrors2 = modSchema.funcValidateForm(
//     document.getElementsByTagName("input"),
//     modSchema.constSeekers_Mailshot_Header
//   );

//   //see if returned errors object is empty
//   if (aryErrors1.length > 0 || aryErrors2.length > 0) {
//     modMessageBox.funcMessageBox(
//       "Please Enter Data In All Required Fields",
//       modMessageBox.objIcons.error,
//       modMessageBox.objButtons.ok,
//       -1,
//       "none",
//       1,
//       "txtMSH_MailshotName",
//       document.getElementsByTagName("html")
//     );
//     return;
//   }

//   if (blnNew) {
//     funcSaveData();
//   } else {
//     //erase existing data THEN save
//     funcDeleteRecord(true);
//     //  funcSaveData();
//   }
// };
// export function funcUndoChanges() {
//   /*
//   Created 08/01/2025 By Roger Williams

//    processes undo

//    if not new record simply populates the form from objTable!

// */
//   if (txtMSH_MailshotName.value === 0) return;

//   blnNew = false;

//   if (blnNew) {
//     //reset form
//     funcResetForm();
//     blnNew = false;
//   } else {
//     modView.funcLoadData();
//   }
// }
// const funcbtnDeleteClick = () => {
//   /*
//  asks user if wants to delete
//  txtHidden handles response

// */
//   modMessageBox.funcMessageBox(
//     "Delete Record?",
//     modMessageBox.objIcons.question,
//     modMessageBox.objButtons.yes,
//     modMessageBox.objButtons.no,
//     "delete",
//     2,
//     "btnNew",
//     document.getElementsByTagName("html")
//   );
// };
// const funcbtnUndoClick = (event) => {
//   /*
//    asks user if wants to undo
//    txtHidden handles response

// */
//   modMessageBox.funcMessageBox(
//     "Undo Changes",
//     modMessageBox.objIcons.question,
//     modMessageBox.objButtons.yes,
//     modMessageBox.objButtons.no,
//     "undo",
//     2,
//     "btnNew",
//     document.getElementsByTagName("html")
//   );
// };

const funcResetForm = () => {
  /*
 Created 20/01/2025 By Roger Williams
 
 Resets the form and data table

*/

  txtCVTemplateName.innerText = "";
  txtJobTitle.innerText = "";
  chkPrintAddress.checked = false;
  modView.funcInitTable(modSchema.constCV_Contact);
  modView.funcInitTable(modSchema.constCV_CurrentFocus);
  modView.funcInitTable(modSchema.constCV_Education);
  modView.funcInitTable(modSchema.constCV_Experience);
  modView.funcInitTable(modSchema.constCV_Highlights);
  modView.funcInitTable(modSchema.constCV_Interests);
  modView.funcInitTable(modSchema.constCV_Other);
  modView.funcInitTable(modSchema.constCV_PersonalInfo);
  modView.funcInitTable(modSchema.constCV_Responsibilites);
  modView.funcInitTable(modSchema.constCV_Skills);
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
    if (modMessageBox.strContext === "save" || modMessageBox.strContext === "new") {
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
    // btnSave.style.display = "block";
    // btnUndo.style.display = "block";
    // btnDelete.style.display = "block";
    // btnNew.style.display = "block";
    //populate combobox
    //    funcPopulateCombobox();
    modView.funcLoadData();
  };
};

//exports
export function funcCreateMessageBoxResultHandler() {
  txtHidden.addEventListener("focus", funcHiddenTextBoxHandler);
}

export function funcInitSchema() {
  // //get schema
  // objTableHeader = modSchema.funcGetSchema(
  //   modSchema.constSeekers_Mailshot_Header
  // );
  // objTableLines = modSchema.funcGetSchema(
  //   modSchema.constSeekers_Mailshot_Lines
  // );
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

  txtCVTemplateName.addEventListener("change", functextboxKeyDown);
  txtJobTitle.addEventListener("change", functextboxKeyDown);

  //btnAddContact.addEventListener("click", funcbtnAddClick);
  // btnAddCV_CurrentFocus.addEventListener("click", funcbtnAddClick);
  // btnAddCV_Education.addEventListener("click", funcbtnAddClick);
  // btnAddCV_Experience.addEventListener("click", funcbtnAddClick);
  // btnAddCV_Highlights.addEventListener("click", funcbtnAddClick);
  // btnAddCV_Interests.addEventListener("click", funcbtnAddClick);
  // btnAddCV_Other.addEventListener("click", funcbtnAddClick);
  // btnAddCV_PersonalInfo.addEventListener("click", funcbtnAddClick);
  // btnAddCV_Personality.addEventListener("click", funcbtnAddClick);
  // btnAddCV_Responsibilities.addEventListener("click", funcbtnAddClick);
  // btnAddCV_Skills.addEventListener("click", funcbtnAddClick);

  // btnRemoveContact.addEventListener("click", funcbtnRemoveClick);
  // btnRemoveCV_CurrentFocus.RemoveEventListener("click", funcbtnRemoveClick);
  // btnRemoveCV_Education.RemoveEventListener("click", funcbtnRemoveClick);
  // btnRemoveCV_Experience.RemoveEventListener("click", funcbtnRemoveClick);
  // btnRemoveCV_Highlights.RemoveEventListener("click", funcbtnRemoveClick);
  // btnRemoveCV_Interests.RemoveEventListener("click", funcbtnRemoveClick);
  // btnRemoveCV_Other.RemoveEventListener("click", funcbtnRemoveClick);
  // btnRemoveCV_PersonalInfo.RemoveEventListener("click", funcbtnRemoveClick);
  // btnRemoveCV_Personality.RemoveEventListener("click", funcbtnRemoveClick);
  // btnRemoveCV_Responsibilities.RemoveEventListener("click", funcbtnRemoveClick);
  // btnRemoveCV_Skills.RemoveEventListener("click", funcbtnRemoveClick);

  btnCreateCV.addEventListener("click", funcbtnCreateCVClick);
  btnClearCV.addEventListener("click", funcbtnClearCVClick);
}
