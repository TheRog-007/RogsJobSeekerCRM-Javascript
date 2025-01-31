"use strict";

import * as modModel from "./model.js";
import * as modSchema from "../schema.js";
import * as modMessageBox from "../messageBox.js";
/*
  Created 08/01/2025 By Roger Williams

  Visual handling


*/

export function funcInitView() {
  let intNum = 0;
  let strName = "";
  //disable "action" buttons opendb activates them
  modModel.btnSave.style.display = "none";
  modModel.btnUndo.style.display = "none";
  modModel.btnDelete.style.display = "none";
  modModel.btnNew.style.display = "none";

  //set label font colour to RED if required field for each
  //text control
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
}

export const funcLoadData = () => {
  /*
   Created 20/01/2025 By Roger Williams

   loads record selected from combobox
   ALSO loads data into objTable -> the table schema
   THIS IS USED FOR UNDO

*/
  const trnTemp = modModel.dbJobSeekerCRM.transaction(
    modSchema.constCV_Personality,
    "readonly"
  );
  const objTemp = trnTemp.objectStore(modSchema.constCV_Personality);
  //find record by key: modModel.cmbID.value
  //Note: have to convert to number as get() does not convert string!
  const objData = objTemp.get(Number(modModel.cmbID.value));

  objData.onsuccess = () => {
    const objFound = objData.result;
    //load data!
    modModel.txtCVPP_Personality.value = objFound.CVPP_Personality;
    //store in objTable in order they are in schema
    modModel.objTable.aryFields[0].fieldValue = modModel.cmbID.value;
    modModel.objTable.aryFields[1].fieldValue = objFound.CVPP_Personality;
    //reset new indicator
    modModel.funcResetblnNew(false);
  };

  objData.onerror = (error) => {
    modMessageBox.funcMessageBox(
      "Error Loading Data",
      modMessageBox.objIcons.error,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "btnNew",
      document.getElementsByTagName("html")
    );
  };
};
