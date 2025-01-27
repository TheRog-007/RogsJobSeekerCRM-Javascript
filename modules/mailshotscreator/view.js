"use strict";

import * as modModel from "./model.js";
import * as modSchema from "../schema.js";

let intDivNumber = 1;
export let intNewRowTop = 0;
export const intRowHeight = 30;
export let intRows = 0;
/*
  Created 08/01/2025 By Roger Williams

  Visual handling

  Note: Due to an unfixable bug btnNew is renamed btnNew2
        leaving as btnNew means button cannot be repositioned!

*/

//config validation/max chars allowed etc
// intSize = modSchema.funcGetFieldSize("Seekers_Mailshot_Header", "CVI_Details");
// export const funcSetupScreen = () => {
//   /*
//   Created 08/01/2025 By Roger Williams

//   positions buttons etc where we need them for this screen

//   228px = 30 chars
// */

//   modModel.btnNew.style.top = "10px";
//   modModel.btnNew.style.marginTop = "10px";
//   modModel.btnNew.style.left = "250px";
//   modModel.btnNew.style.height = "35px";
//   modModel.btnNew.style.width = "60px";

//   modModel.txtCVI_Details.style.marginTop = "10px";
//   modModel.txtCVI_Details.style.width = "228px";
//   modModel.txtCVI_Details.attributes.required = true;
//   modModel.txtCVI_Details.setAttribute(
//     "maxLength",
//     modSchema.funcGetFieldSize("Seekers_Mailshot_Header", "CVI_Details")
//   );
//   modModel.btnSave.style.marginTop = "20px";

//   modModel.btnUndo.style.marginTop = "20px";
//   modModel.btnUndo.style.left = "100px";

//   modModel.btnDelete.style.marginTop = "20px";
//   modModel.btnDelete.style.left = "200px";

//   modModel.txtHidden.style.backgroundColor = "darkslategrey";
// };
// export function funcShowFirstRecord() {
//   /*
//    Created 19/01/2025 By Roger Williams

//    gets first record data and displays in form

//   */
//   const objData = modSchema.funcGetFirstRecord();
// }
export function funcChangeNumberOfRow(intValue = 0) {
  /*
  Created 27/01/2025 By Roger Williams

  used by modModel to change this exported variables value
  used when deleting an address record

  */
  intRows = intValue;
}
export function funcChangeNewRowPos(intValue = 0) {
  /*
  Created 27/01/2025 By Roger Williams

  used by modModel to change this exported variables value
  used when deleting an address record

  */
  intNewRowTop = intValue;
}
export function funcInitTable() {
  /*
  Created 24/01/2025 By Roger Williams

  clears table and creates row headers

  gives table headers an ID so CSS can format
  */
  // let tblRow;
  // let elTemp;
  // let rowHeader;
  // let intNum = 1;
  // //clear table
  // elTemp = modModel.tblData.getElementsByTagName("tbody")[0];
  // elTemp.innerHTML = "";
  // //create headers
  // tblRow = elTemp.insertRow();
  // rowHeader = document.createElement("th");
  // rowHeader.innerText = "Select";
  // rowHeader.id = "tblHeaderButton";
  // rowHeader.style.width = "8ch";
  // tblRow.appendChild(rowHeader);
  // rowHeader = document.createElement("th");
  // rowHeader.innerText = "Company";
  // rowHeader.id = "tblHeader" + intNum;
  // rowHeader.style.width = "10ch";
  // intNum++;
  // tblRow.appendChild(rowHeader);
  // rowHeader = document.createElement("th");
  // rowHeader.innerText = "Contact";
  // rowHeader.id = "tblHeader" + intNum;
  // rowHeader.style.width = "14ch";
  // intNum++;
  // tblRow.appendChild(rowHeader);
  // rowHeader = document.createElement("th");
  // rowHeader.innerText = "Address 1";
  // rowHeader.id = "tblHeader" + intNum;
  // rowHeader.style.width = "20ch";
  // intNum++;
  // tblRow.appendChild(rowHeader);
  // rowHeader = document.createElement("th");
  // rowHeader.innerText = "Address 2";
  // rowHeader.id = "tblHeader" + intNum;
  // rowHeader.style.width = "20ch";
  // intNum++;
  // tblRow.appendChild(rowHeader);
  // rowHeader = document.createElement("th");
  // rowHeader.innerText = "Address 3";
  // rowHeader.id = "tblHeader" + intNum;
  // rowHeader.style.width = "20ch";
  // intNum++;
  // tblRow.appendChild(rowHeader);
  // rowHeader = document.createElement("th");
  // rowHeader.innerText = "Town/City";
  // rowHeader.id = "tblHeader" + intNum;
  // rowHeader.style.width = "10ch";
  // intNum++;
  // tblRow.appendChild(rowHeader);
  // rowHeader = document.createElement("th");
  // rowHeader.innerText = "Postcode";
  // rowHeader.id = "tblHeader" + intNum;
  // rowHeader.style.width = "10ch";
  // intNum++;
  // tblRow.appendChild(rowHeader);
  // rowHeader = document.createElement("th");
  // rowHeader.innerText = "Print Contact";
  // rowHeader.id = "tblHeader" + intNum;
  // rowHeader.style.width = "13ch";
  // intNum++;
  // tblRow.appendChild(rowHeader);
}
export function funcInitView() {
  /*
  configures visibility of controls
  and other visual functions
  */
  let intNum = 0;
  let strName = "";
  //disable "action" buttons opendb activates them
  modModel.btnSave.style.display = "none";
  modModel.btnUndo.style.display = "none";
  modModel.btnDelete.style.display = "none";
  modModel.btnNew.style.display = "none";

  //set label font colour to RED if required field for each
  //textarea control
  let aryElements = document.getElementsByTagName("textarea");

  for (intNum = 0; intNum < aryElements.length; intNum++) {
    //get field name
    strName = aryElements[intNum].id.substring(
      3,
      aryElements[intNum].id.length
    );

    //see if required
    const aryResult = modModel.objTable.aryFields.find((objTemp) => {
      if (objTemp.fieldName === strName) {
        return objTemp.requiredField;
      }
    });

    if (aryResult?.requiredField) {
      //set label colour to red
      document.getElementById("lbl" + strName).style.color = "red";
    }
  }
  //set label font colour to RED if required field for each
  //text control
  aryElements = document.getElementsByTagName("input");

  for (intNum = 0; intNum < aryElements.length; intNum++) {
    //get field name
    strName = aryElements[intNum].id.substring(
      3,
      aryElements[intNum].id.length
    );

    //see if required
    const aryResult = modModel.objTable.aryFields.find((objTemp) => {
      if (objTemp.fieldName === strName) {
        return objTemp.requiredField;
      }
    });

    if (aryResult?.requiredField) {
      //set label colour to red
      document.getElementById("lbl" + strName).style.color = "red";
    }
  }

  //init table
  //funcInitTable();
}
export const funcCreateTableRow = (blnLocal = true, dbData) => {
  /*
   Created 24/01/2025 By Roger Williams

   puts new row in table 
   creates button for selecting the row

   VARS

   blnLocal - is this called from lines save button?
   dbData   - if from recordset this is the data to add

  */
  let btnTemp;
  let tblCell1;
  let tblCell2;
  let tblCell3;
  let tblCell4;
  let tblCell5;
  let tblCell6;
  let tblCell7;
  let tblCell8;
  let tblCell9;
  // let intNum = 0; //table rows are ZERO based
  // let tblRow;
  // tblRow = modModel.tblDataArea.insertRow();
  // //add select button
  // tblCell1 = tblRow.insertCell(0);
  // btnTemp = document.createElement("button");
  // btnTemp.innerText = "select";
  // btnTemp.id = intNum;
  // btnTemp.style.width = "8ch";
  // btnTemp.className = "btnTable";
  // btnTemp.addEventListener("click", modModel.funcTableButtonClick);
  // tblCell1.appendChild(btnTemp);
  // if (blnLocal) {
  //   //add row data
  //   tblCell2 = tblRow.insertCell(1);
  //   tblCell2.style.width = "10ch";
  //   tblCell2.innerText = modModel.txtMSL_CompanyName.value;
  //   tblCell3 = tblRow.insertCell(2);
  //   tblCell3.innerText = modModel.txtMSL_Contact.value;
  //   tblCell4 = tblRow.insertCell(3);
  //   tblCell4.innerText = modModel.txtMSL_Address1.value;
  //   tblCell5 = tblRow.insertCell(4);
  //   tblCell5.innerText = modModel.txtMSL_Address2.value;
  //   tblCell6 = tblRow.insertCell(5);
  //   tblCell6.innerText = modModel.txtMSL_Address3.value;
  //   tblCell7 = tblRow.insertCell(6);
  //   tblCell7.innerText = modModel.txtMSL_TownCity.value;
  //   tblCell8 = tblRow.insertCell(7);
  //   tblCell8.innerText = modModel.txtMSL_Postcode.value;
  //   tblCell9 = tblRow.insertCell(8);
  //   tblCell9.innerText = modModel.chkMSH_PrintContact.checked;
  // } else {
  //   //add row data
  //   tblCell2 = tblRow.insertCell(1);
  //   tblCell2.innerText = dbData.value.MSL_CompanyName;
  //   tblCell3 = tblRow.insertCell(2);
  //   tblCell3.innerText = dbData.value.MSL_Contact;
  //   tblCell4 = tblRow.insertCell(3);
  //   tblCell4.innerText = dbData.value.MSL_Address1;
  //   tblCell5 = tblRow.insertCell(4);
  //   tblCell5.innerText = dbData.value.MSL_Address2;
  //   tblCell6 = tblRow.insertCell(5);
  //   tblCell6.innerText = dbData.value.MSL_Address3;
  //   tblCell7 = tblRow.insertCell(6);
  //   tblCell7.innerText = dbData.value.MSL_TownCity;
  //   tblCell8 = tblRow.insertCell(7);
  //   tblCell8.innerText = dbData.value.MSL_Postcode;
  //   tblCell9 = tblRow.insertCell(8);
  //   tblCell9.innerText = dbData.value.MSH_PrintContact.checked;
  // }

  //creates 1 select button and 9 text rows ALL as divs
  let elTemp;
  let elTemp2;

  /*
    structure

    divMailShotAddresses
   |  |divAddressRowContainer+row nbr                                     | 
   |  | element1  elemen2 element3 elemen4 element5 element6 element7 etc |
   |  |divAddressRowContainer+row nbr                                     | 
   |  | element1  elemen2 element3 elemen4 element5 element6 element7 etc |
   
  */
  //create div to house the columns
  elTemp = document.createElement("div");
  elTemp.id = "divAddressRowContainer" + +intDivNumber;
  elTemp.className = "clhAddressRowContainer";

  //if (intDivNumber > 1) {

  elTemp.style.top = intNewRowTop + "px";
  //   if (intNewRowTop !== 30) {
  //     intNewRowTop = intNewRowTop + 30;
  //   }
  // }

  // elTemp.innerText = "" + intDivNumber;
  modModel.divMailshotAddresses.appendChild(elTemp);

  //create column one row select button
  elTemp2 = document.createElement("div");
  elTemp2.id = "divAddressRow" + intDivNumber;
  elTemp2.className = "clhAddressCol1";
  // elTemp.innerText = "" + intDivNumber;
  elTemp.appendChild(elTemp2);
  //add select button
  btnTemp = document.createElement("button");
  btnTemp.innerText = "select";
  //set button id to include ACTUAl row number
  if (intRows === 0) {
    btnTemp.id = "btnSelect1";
  } else {
    btnTemp.id = "btnSelect" + Number(intRows + 1);
  }
  btnTemp.style.width = "8ch";
  btnTemp.style.height = "30px";
  btnTemp.className = "btnSelect";
  btnTemp.addEventListener("click", modModel.funcSelectButtonClick);
  elTemp.appendChild(btnTemp);
  //intDivNumber++;

  //create the 9 columns divs that hold data
  elTemp2 = document.createElement("div");
  elTemp2.id = "divAddressRow" + intDivNumber;
  elTemp2.className = "clhAddressCol2";
  elTemp2.innerText = modModel.txtMSL_CompanyName.value;
  elTemp.appendChild(elTemp2);
  //intDivNumber++;

  elTemp2 = document.createElement("div");
  elTemp2.id = "divAddressRow" + intDivNumber;
  elTemp2.className = "clhAddressCol3";
  elTemp2.innerText = modModel.txtMSL_Contact.value;
  elTemp.appendChild(elTemp2);
  //intDivNumber++;

  elTemp2 = document.createElement("div");
  elTemp2.id = "divAddressRow" + intDivNumber;
  elTemp2.className = "clhAddressCol4";
  elTemp2.innerText = modModel.txtMSL_Address1.value;
  elTemp.appendChild(elTemp2);
  //intDivNumber++;

  elTemp2 = document.createElement("div");
  elTemp2.id = "divAddressRow" + intDivNumber;
  elTemp2.className = "clhAddressCol5";
  elTemp2.innerText = modModel.txtMSL_Address2.value;
  elTemp.appendChild(elTemp2);
  //  intDivNumber++;

  elTemp2 = document.createElement("div");
  elTemp2.id = "divAddressRow" + intDivNumber;
  elTemp2.className = "clhAddressCol6";
  elTemp2.innerText = modModel.txtMSL_Address3.value;
  elTemp.appendChild(elTemp2);
  //  intDivNumber++;

  elTemp2 = document.createElement("div");
  elTemp2.id = "divAddressRow" + intDivNumber;
  elTemp2.className = "clhAddressCol7";
  elTemp2.innerText = modModel.txtMSL_TownCity.value;
  elTemp.appendChild(elTemp2);
  // intDivNumber++;

  elTemp2 = document.createElement("div");
  elTemp2.id = "divAddressRow" + intDivNumber;
  elTemp2.className = "clhAddressCol8";
  elTemp2.innerText = modModel.txtMSL_Postcode.value;
  elTemp.appendChild(elTemp2);
  // intDivNumber++;

  elTemp2 = document.createElement("div");
  elTemp2.id = "divAddressRow" + intDivNumber;
  elTemp2.className = "clhAddressCol9";
  elTemp2.innerText = modModel.chkMSH_PrintContact.checked;
  elTemp.appendChild(elTemp2);
  intRows++;
  intDivNumber++;
  intNewRowTop = intNewRowTop + 30;

  //renumber button IDs to match ACTUAL row they are in
};
export const funcLoadData = () => {
  /*
   Created 24/01/2025 By Roger Williams

   loads record selected from combobox
   ALSO loads data into objTable -> the table schema
   THIS IS USED FOR UNDO

   populates the table with the mailshot addresses

*/
  let qryTemp;
  let elTemp;
  //read header records
  const trnTemp = modModel.dbJobSeekerCRM.transaction(
    modSchema.constSeekers_Mailshot_Header,
    "readonly"
  );
  const objTemp = trnTemp.objectStore(modSchema.constSeekers_Mailshot_Header);
  //find record by key: modModel.cmbID.value
  //Note: have to convert to number as get() does not convert string!
  const idxTemp = objTemp.index("MSH_MailshotName");
  //set value to look for from combobox
  const keyRange = IDBKeyRange.only(
    modModel.cmbID.options[modModel.cmbID.selectedIndex].text
  );

  const dbQuery = idxTemp.openCursor(keyRange);

  dbQuery.onerror = (event) => {
    modMessageBox.funcMessageBox(
      "Error Accessing Table",
      modMessageBox.objIcons.error,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "btnNew"
    );
    return;
  };

  dbQuery.onsuccess = (event) => {
    //read through data to find the matching record(s)
    const dbCursor = event.target.result;

    if (dbCursor) {
      //load data!
      modModel.txtMSH_MailshotName.value = dbCursor.value.MSH_MailshotName;
      modModel.txtMSH_CVPath.value = dbCursor.value.MSH_CVPath;
      modModel.txtPrintContact = dbCursor.value.MSH_PrintContact;
      modModel.txtPrintedDate = dbCursor.value.MSH_PrintedDate;
      modModel.txtMSH_LetterPath = dbCursor.value.MSH_LetterPath;
      //store in objTable in order they are in schema
      modModel.objTable.aryFields[0].fieldValue = modModel.cmbID.value;
      modModel.objTable.aryFields[1].fieldValue =
        dbCursor.value.MSH_MailshotName;
      modModel.objTable.aryFields[2].fieldValue = dbCursor.value.MSH_CVPath;
      modModel.objTable.aryFields[3].fieldValue = dbCursor.value.MSH_LetterPath;
      modModel.objTable.aryFields[4].fieldValue =
        dbCursor.value.MSH_PrintedDate;
      modModel.objTable.aryFields[5].fieldValue =
        dbCursor.value.MSH_PrintContact;

      /*
      load ALL mailshot_lines fields into table

      */
      funcInitTable();
      funcCreateTableRow(false, dbCursor.value);
      //goto next record
      dbCursor.continue();
    }
    //reset new indicator
    modModel.funcResetblnNew(false);
  };
};
