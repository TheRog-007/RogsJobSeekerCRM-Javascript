"use strict";

import * as modModel from "./model.js";
import * as modSchema from "../schema.js";
import * as modGlobalView from "../GlobalView.js";

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

  modGlobalView.funcDisableForm(document);
  modModel.funcResetForm();
}
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
export const funcLoadData = () => {
  /*
   Created 20/01/2025 By Roger Williams

   loads record selected from combobox
   ALSO loads data into objTable -> the table schema
   THIS IS USED FOR UNDO

*/
  const trnTemp = modModel.dbJobSeekerCRM.transaction(
    modSchema.constSeekers_Jobs,
    "readonly"
  );
  const objTemp = trnTemp.objectStore(modSchema.constSeekers_Jobs);
  //find record by key: modModel.cmbID.value
  //Note: have to convert to number as get() does not convert string!
  const objData = objTemp.get(Number(modModel.cmbID.value));

  objData.onsuccess = () => {
    const objFound = objData.result;
    //load data!
    txtJOB_Title.value = objFound.JOB_Title;
    txtJOB_Details.value = objFound.JOB_Details;
    dteJOB_DateApplied.value = objFound.JOB_DateApplied;
    dteJOB_DateExpires.value = objFound.JOB_DateExpires;
    txtJOB_Status.value = objFound.JOB_Status;
    txtJOB_PhoneNumber.value = objFound.JOB_PhoneNumber;
    txtJOB_ContactName.value = objFound.JOB_ContactName;
    chkJOB_Direct.checked = objFound.JOB_Direct;
    txtJOB_Company.value = objFound.JOB_Company;
    txtJOB_Salary.value = objFound.JOB_Salary;
    txtJOB_TownCity.value = objFound.JOB_TownCity;
    txtJOB_Sector.value = objFound.JOB_Sector;
    txtJOB_Type.value = objFound.JOB_Type;
    txtJOB_Hours.value = objFound.JOB_Hours;
    txtJOB_Where.value = objFound.JOB_Where;

    //store in objTable in order they are in schema
    modModel.objTable.aryFields[0].fieldValue = modModel.cmbID.value;
    modModel.objTable.aryFields[1].fieldValue = modModel.txtJOB_Title.value;
    modModel.objTable.aryFields[2].fieldValue = modModel.txtJOB_Details.value;
    modModel.objTable.aryFields[3].fieldValue =
      modModel.dteJOB_DateApplied.value;
    modModel.objTable.aryFields[4].fieldValue =
      modModel.dteJOB_DateExpires.value;
    modModel.objTable.aryFields[5].fieldValue = modModel.txtJOB_Status.value;
    modModel.objTable.aryFields[6].fieldValue =
      modModel.txtJOB_PhoneNumber.value;
    modModel.objTable.aryFields[7].fieldValue =
      modModel.txtJOB_ContactName.value;
    modModel.objTable.aryFields[8].fieldValue = modModel.chkJOB_Direct.value;
    modModel.objTable.aryFields[9].fieldValue = modModel.txtJOB_Company.value;
    modModel.objTable.aryFields[10].fieldValue = modModel.txtJOB_Salary.value;
    modModel.objTable.aryFields[11].fieldValue = modModel.txtJOB_TownCity.value;
    modModel.objTable.aryFields[12].fieldValue = modModel.txtJOB_Sector.value;
    modModel.objTable.aryFields[13].fieldValue = modModel.txtJOB_Type.value;
    modModel.objTable.aryFields[14].fieldValue = modModel.txtJOB_Hours.value;
    modModel.objTable.aryFields[15].fieldValue = modModel.txtJOB_Where.value;

    //reset new indicator
    modModel.funcResetblnNew(false);
    //populate data bound combos
    modModel.funcInitComboboxes();
    modGlobalView.funcEnableForm(document);
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
