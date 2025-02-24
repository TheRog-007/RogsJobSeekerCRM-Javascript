"use strict";

import * as modModel from "./model.js";
import * as modSchema from "../schema.js";
import * as modMessageBox from "../messageBox.js";
import * as modGlobalView from "../GlobalView.js";

/*
  Created 08/01/2025 By Roger Williams

 visual handling etc

*/

let intDivNumber = 1;
export let intNewRowTop = 0;
export const intRowHeight = 30;
export let intRows = 0;

export function funcRenumberRowsResetPositions() {
  /*
  Created 28/01/2025 By Roger Williams

  renumber button IDs to match ACTUAL row they are in
  AND set positions of container DIV to make sure no gaps
  if row deleted

  */
  let elTemp;
  let intNum = 0;
  let intRowNbr = 1;
  let btnTemp;
  let aryTemp = [];

  aryTemp = document.getElementsByClassName("clhResponsibilitiesRowContainer");

  for (intNum = 0; intNum < aryTemp.length; intNum++) {
    elTemp = aryTemp[intNum];
    //reset top
    elTemp.style.top = intRowHeight * intNum + "px";
    btnTemp = elTemp.childNodes[0].nextSibling;
    //reset "row" number
    btnTemp.id = "btnSelect" + intRowNbr;
    //reset DIV id
    elTemp.id = "divResponsibilitiesRowContainer" + intRowNbr;
    intRowNbr++;
  }

  intNewRowTop = intRowHeight * intNum;
  //resetintRows
  intRows = intNum;
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
  elTemp.id = "divResponsibilitiesRowContainer" + +intDivNumber;
  elTemp.className = "clhResponsibilitiesRowContainer";
  elTemp.style.top = intNewRowTop + "px";
  modModel.divTableResponsibilities.appendChild(elTemp);

  //create column one row select button
  elTemp2 = document.createElement("div");
  elTemp2.id = "divResponsibilitiesRow" + intDivNumber;
  elTemp2.className = "clhResponsibilityCol1";
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
  elTemp2.id = "divResponsibilitiesRow" + intDivNumber;
  elTemp2.className = "clhResponsibilityCol2";
  elTemp2.innerText = modModel.txtCVRR_Name.value;
  elTemp.appendChild(elTemp2);

  elTemp2 = document.createElement("div");
  elTemp2.id = "divResponsibilitiesRow" + intDivNumber;
  elTemp2.className = "clhResponsibilityCol3";
  elTemp2.innerText = modModel.txtCVRR_Details.value;
  elTemp.appendChild(elTemp2);

  intRows++;
  intDivNumber++;
  intNewRowTop = intNewRowTop + 30;

  //renumber button IDs to match ACTUAL row they are in and remove gaps in rows
  funcRenumberRowsResetPositions();
}

export function funcUpdateTableRow(intWhat = 0) {
  /*
   Created 28/01/2025 By Roger Williams

   updates row in table 

   VARS

   intWhat - row to update
  */

  let elTemp;
  //get row div container
  elTemp = document.getElementById("divResponsibilitiesRowContainer" + intWhat);
  //update list
  elTemp.childNodes[2].innerText = modModel.txtCVRR_Name.value;
  elTemp.childNodes[3].innerText = modModel.txtCVRR_Details.value;
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

  aryTemp = modModel.divTableResponsibilities.getElementsByClassName(
    "clhResponsibilitiesRowContainer"
  );

  while (intNum !== aryTemp.length) {
    elTemp = aryTemp[intNum];
    modModel.divTableResponsibilities.removeChild(elTemp);
    intNum = 0;
  }
}
export function funcInitView() {
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

  funcInitTable();
  modGlobalView.funcDisableForm(document);
}

export const funcLoadData = () => {
  /*
   Created 20/01/2025 By Roger Williams

   loads record selected from combobox
   ALSO loads data into objTable -> the table schema
   THIS IS USED FOR UNDO

*/
  let qryTemp;
  let elTemp;
  const trnTemp = modModel.dbJobSeekerCRM.transaction(
    modSchema.constCV_Responsibilites,
    "readonly"
  );
  const objTemp = trnTemp.objectStore(modSchema.constCV_Responsibilites);
  //find record by key: modModel.cmbID.value
  //Note: have to convert to number as get() does not convert string!
  const idxTemp = objTemp.index("CVR_Name");
  //set value to look for from combobox
  const keyRange = IDBKeyRange.only(
    modModel.cmbID.options[modModel.cmbID.selectedIndex].text
  );

  //first clear any existing items before looking for item
  funcInitTable();

  const dbQuery = idxTemp.openCursor(keyRange);

  dbQuery.onerror = (event) => {
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

  dbQuery.onsuccess = (event) => {
    //read through data to find the matching record(s)
    const dbCursor = event.target.result;

    if (dbCursor) {
      //load data!
      modModel.txtCVR_Name.value = dbCursor.value.CVR_Name;
      modModel.txtCVRR_Name.value = dbCursor.value.CVRR_Name;
      modModel.txtCVRR_Details.value = dbCursor.value.CVRR_Details;

      //store in objTable in order they are in schema
      modModel.objTable.aryFields[0].fieldValue = modModel.cmbID.value;
      modModel.objTable.aryFields[1].fieldValue = dbCursor.value.CVRR_Name;
      modModel.objTable.aryFields[2].fieldValue = dbCursor.value.CVRR_Details;
      modModel.objTable.aryFields[3].fieldValue = dbCursor.value.CVR_Name;
      /*
      load ALL CRR_ fields from table into responsibility table

      populate address controls then add to table
      */
      modModel.txtCVRR_Name.value = dbCursor.value.CVRR_Name;
      modModel.txtCVRR_Details.value = dbCursor.value.CVRR_Details;

      funcCreateTableRow();
      //goto next record
      dbCursor.continue();
    } else {
      //clear any existing address data
      modModel.funcbtnClearResponsibilityClick();
      //reset new indicator
      modModel.funcResetblnNew(false);
      modGlobalView.funcEnableForm(document);
    }
  };
};
