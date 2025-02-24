"use strict";

import * as modModel from "./model.js";
import * as modSchema from "../schema.js";
import * as modMessageBox from "../messageBox.js";
import * as modGlobalView from "../GlobalView.js";

let intDivNumber = 1;
export let intNewRowTop = 0;
export const intRowHeight = 30;
export let intRows = 0;
/*
  Created 08/01/2025 By Roger Williams

  Visual handling

 
*/

export function funcChangeNumberOfRows(intValue = 0) {
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
  let elTemp;
  let intNum = 0;
  let aryTemp = [];

  aryTemp = modModel.divMailshotAddresses.getElementsByClassName(
    "clhAddressRowContainer"
  );

  while (intNum !== aryTemp.length) {
    elTemp = aryTemp[intNum];
    modModel.divMailshotAddresses.removeChild(elTemp);
    intNum = 0;
  }
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
    const aryResult = modModel.objTableHeader.aryFields.find((objTemp) => {
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
    const aryResult = modModel.objTableHeader.aryFields.find((objTemp) => {
      if (objTemp.fieldName === strName) {
        return objTemp.requiredField;
      }
    });

    if (aryResult?.requiredField) {
      //set label colour to red
      document.getElementById("lbl" + strName).style.color = "red";
    }
  }

  //set required fields colours for address lines
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
    const aryResult = modModel.objTableLines.aryFields.find((objTemp) => {
      if (objTemp.fieldName === strName) {
        return objTemp.requiredField;
      }
    });

    if (aryResult?.requiredField) {
      //set label colour to red
      document.getElementById("lbl" + strName).style.color = "red";
    }
  }
  modGlobalView.funcDisableForm(document);
}
export function funcRenumberRowsResetPositions() {
  /*
  Created 28/01/2025 By Roger Williams

  renumber button IDs to match ACTUAL row they are in
  AND set positions of container DIV to make sure no gaps
  if row deleted

  */
  // let elTemp;
  // let intNum = 0;
  // let intRowNbr = 1;
  // let btnTemp;
  // let aryTemp = [];

  // aryTemp = document.getElementsByClassName("clhAddressRowContainer");

  // for (intNum = 0; intNum < aryTemp.length; intNum++) {
  //   elTemp = aryTemp[intNum];
  //   //reset top
  //   elTemp.style.top = intRowHeight * intNum + "px";
  //   btnTemp = elTemp.childNodes[0].nextSibling;
  //   //reset "row" number
  //   btnTemp.id = "btnSelect" + intRowNbr;
  //   //reset DIV id
  //   elTemp.id = "divAddressRowContainer" + intRowNbr;
  //   intRowNbr++;
  // }

  // intNewRowTop = intRowHeight * intNum;
  // //resetintRows
  // intRows = intNum;

  let elTemp;
  let intNum1 = 0;
  let intNum2 = 0;
  let intRowNbr = 1;
  let btnTemp;

  let aryTableRows = [];
  let aryInternal = [];
  let elTable;
  let strTemp = "";

  //get table
  elTable = document.getElementById(strDivTable);
  aryTableRows = elTable.getElementsByClassName("clhAddressRowContainer");

  for (intNum1 = 0; intNum1 < aryTableRows.length; intNum1++) {
    elTemp = aryTableRows[intNum1];
    //reset top
    elTemp.style.top = intRowHeight * intNum1 + "px";
    btnTemp = elTemp.childNodes[0].nextSibling;
    //reset "row" number use intrownbr as set to start from 1 intnum 0!
    btnTemp.id = "btnSelect" + intRowNbr;
    //reset DIV id
    elTemp.id = "divAddressRowContainer" + intRowNbr;

    //renumber internal DIVs
    aryInternal = elTable.getElementsByTagName("div");

    for (intNum2 = 0; intNum2 < aryInternal.length; intNum2++) {
      //remove row number
      strTemp = aryInternal[intNum2].id.replace(/[^A-Z, a-z]/g, "") + intRowNbr;
      //reset row number
      aryInternal[intNum2].id = strTemp;
    }
    intRowNbr++;
  }

  intRowNbr++;
  intDivNumber = intRowNbr;
  intNewRowTop = intRowHeight * intNum1;
}

export function funcUpdateTableRow(intWhat = 0) {
  /*
   Created 28/01/2025 By Roger Williams

   updates row in table 

   VARS

   intWhat - row to update
  */

  let elTemp;
  let strTemp = "";
  //get row div container
  elTemp = document.getElementById("divAddressRowContainer" + intWhat);
  //update list
  elTemp.childNodes[2].innerText = modModel.txtMSL_CompanyName.value;
  elTemp.childNodes[3].innerText = modModel.txtMSL_Contact.value;
  elTemp.childNodes[4].innerText = modModel.txtMSL_Address1.value;
  elTemp.childNodes[5].innerText = modModel.txtMSL_Address2.value;
  elTemp.childNodes[6].innerText = modModel.txtMSL_Address3.value;
  elTemp.childNodes[7].innerText = modModel.txtMSL_TownCity.value;
  elTemp.childNodes[8].innerText = modModel.txtMSL_Postcode.value;
  strTemp = modModel.chkMSH_PrintContact.checked;
  elTemp.childNodes[9].innerText = strTemp;
}

export function funcCreateTableRow() {
  /*
   Created 24/01/2025 By Roger Williams

   puts new row in table 
   creates button for selecting the row

   VARS

   blnLocal - is this called from lines save button?
   dbData   - if from recordset this is the data to add

  creates 1 select button and 9 text rows ALL as divs

  */
  let btnTemp;
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
  elTemp.style.top = intNewRowTop + "px";
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

  //create the 9 columns divs that hold data
  elTemp2 = document.createElement("div");
  elTemp2.id = "divAddressRow" + intDivNumber;
  elTemp2.className = "clhAddressCol2";
  elTemp2.innerText = modModel.txtMSL_CompanyName.value;
  elTemp.appendChild(elTemp2);

  elTemp2 = document.createElement("div");
  elTemp2.id = "divAddressRow" + intDivNumber;
  elTemp2.className = "clhAddressCol3";
  elTemp2.innerText = modModel.txtMSL_Contact.value;
  elTemp.appendChild(elTemp2);

  elTemp2 = document.createElement("div");
  elTemp2.id = "divAddressRow" + intDivNumber;
  elTemp2.className = "clhAddressCol4";
  elTemp2.innerText = modModel.txtMSL_Address1.value;
  elTemp.appendChild(elTemp2);

  elTemp2 = document.createElement("div");
  elTemp2.id = "divAddressRow" + intDivNumber;
  elTemp2.className = "clhAddressCol5";
  elTemp2.innerText = modModel.txtMSL_Address2.value;
  elTemp.appendChild(elTemp2);

  elTemp2 = document.createElement("div");
  elTemp2.id = "divAddressRow" + intDivNumber;
  elTemp2.className = "clhAddressCol6";
  elTemp2.innerText = modModel.txtMSL_Address3.value;
  elTemp.appendChild(elTemp2);

  elTemp2 = document.createElement("div");
  elTemp2.id = "divAddressRow" + intDivNumber;
  elTemp2.className = "clhAddressCol7";
  elTemp2.innerText = modModel.txtMSL_TownCity.value;
  elTemp.appendChild(elTemp2);

  elTemp2 = document.createElement("div");
  elTemp2.id = "divAddressRow" + intDivNumber;
  elTemp2.className = "clhAddressCol8";
  elTemp2.innerText = modModel.txtMSL_Postcode.value;
  elTemp.appendChild(elTemp2);

  elTemp2 = document.createElement("div");
  elTemp2.id = "divAddressRow" + intDivNumber;
  elTemp2.className = "clhAddressCol9";
  elTemp2.innerText = modModel.chkMSH_PrintContact.checked;
  elTemp.appendChild(elTemp2);
  intRows++;
  intDivNumber++;
  intNewRowTop = intNewRowTop + 30;

  //renumber button IDs to match ACTUAL row they are in and remove gaps in rows
  funcRenumberRowsResetPositions();
}

export function funcLoadData() {
  /*
   Created 24/01/2025 By Roger Williams

   loads record selected from combobox
   ALSO loads data into objTable -> the table schema
   THIS IS USED FOR UNDO

   populates the table with the mailshot addresses

*/
  let dbQueryHead;
  let trnHead;
  let objHead;
  let idxHead;
  let keyRangeHead;
  let dbCursorHead;

  let dbQueryLines;
  let trnLines;
  let objLines;
  let idxLines;
  let keyRangeLines;
  let dbCursorLines;

  //read header records
  trnHead = modModel.dbJobSeekerCRM.transaction(
    modSchema.constSeekers_Mailshot_Header,
    "readonly"
  );
  objHead = trnHead.objectStore(modSchema.constSeekers_Mailshot_Header);
  //find record by key: modModel.cmbID.value
  //Note: have to convert to number as get() does not convert string!
  idxHead = objHead.index("MSH_MailshotName");
  //set value to look for from combobox
  keyRangeHead = IDBKeyRange.only(
    modModel.cmbID.options[modModel.cmbID.selectedIndex].text
  );

  dbQueryHead = idxHead.openCursor(keyRangeHead);

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
    return;
  };

  dbQueryHead.onsuccess = (event) => {
    //read through data to find the matching record(s)
    dbCursorHead = event.target.result;

    if (dbCursorHead) {
      //load data!
      modModel.txtMSH_MailshotName.value = dbCursorHead.value.MSH_MailshotName;
      modModel.txtMSH_CVPath.value = dbCursorHead.value.MSH_CVPath;
      modModel.chkMSH_PrintContact.value = dbCursorHead.value.MSH_PrintContact;
      modModel.dteMSH_PrintedDate.value = dbCursorHead.value.MSH_PrintedDate;
      modModel.txtMSH_LetterPath.value = dbCursorHead.value.MSH_LetterPath;
      //store in objTable in order they are in schema
      modModel.objTableHeader.aryFields[0].fieldValue = modModel.cmbID.value;
      modModel.objTableHeader.aryFields[1].fieldValue =
        dbCursorHead.value.MSH_MailshotName;
      modModel.objTableHeader.aryFields[2].fieldValue =
        dbCursorHead.value.MSH_CVPath;
      modModel.objTableHeader.aryFields[3].fieldValue =
        dbCursorHead.value.MSH_LetterPath;
      modModel.objTableHeader.aryFields[4].fieldValue =
        dbCursorHead.value.MSH_PrintedDate;
      modModel.objTableHeader.aryFields[5].fieldValue =
        dbCursorHead.value.MSH_PrintContact;

      /*
      load ALL mailshot_lines fields into table
      */

      trnLines = modModel.dbJobSeekerCRM.transaction(
        modSchema.constSeekers_Mailshot_Lines,
        "readonly"
      );
      objLines = trnLines.objectStore(modSchema.constSeekers_Mailshot_Lines);
      idxLines = objLines.index("MSH_MailshotName");
      //set value to look for from combobox
      // keyRangeLines = IDBKeyRange.only(
      //   modModel.cmbID.options[modModel.cmbID.selectedIndex].text
      // );
      keyRangeLines = IDBKeyRange.only(modModel.txtMSH_MailshotName.value);

      funcInitTable();

      dbQueryLines = idxLines.openCursor(keyRangeLines);

      dbQueryLines.onerror = (event) => {
        modMessageBox.funcMessageBox(
          "Error Accessing Mailshot_Lines Table",
          modMessageBox.objIcons.error,
          modMessageBox.objButtons.ok,
          -1,
          "none",
          1,
          "btnNew",
          document.getElementsByTagName("html")
        );
        return;
      };

      dbQueryLines.onsuccess = (event) => {
        //read through data to find the matching record(s)
        dbCursorLines = event.target.result;

        if (dbCursorLines) {
          modModel.txtMSL_CompanyName.value =
            dbCursorLines.value.MSL_CompanyName;
          modModel.txtMSL_Contact.value = dbCursorLines.value.MSL_Contact;
          modModel.txtMSL_Address1.value = dbCursorLines.value.MSL_Address1;
          modModel.txtMSL_Address2.value = dbCursorLines.value.MSL_Address2;
          modModel.txtMSL_Address3.value = dbCursorLines.value.MSL_Address3;
          modModel.txtMSL_TownCity.value = dbCursorLines.value.MSL_TownCity;
          modModel.txtMSL_Postcode.value = dbCursorLines.value.MSL_Postcode;
          funcCreateTableRow();
          dbCursorLines.continue();
        } else {
          //clear any existing address data
          modModel.funcbtnClearAddressClick();
        }
      };
    }
    //reset new indicator
    modModel.funcResetblnNew(false);
    modGlobalView.funcEnableForm(document);
  };
}
