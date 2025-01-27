"use strict";

import * as modModel from "./model.js";
import * as modSchema from "../schema.js";

/*
  Created 08/01/2025 By Roger Williams

  Visual handling

  Note: Due to an unfixable bug btnNew is renamed btnNew2
        leaving as btnNew means button cannot be repositioned!

*/

//config validation/max chars allowed etc
// intSize = modSchema.funcGetFieldSize("CV_Contact", "CVC_Nationality");
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

//   modModel.txtCVC_Nationality.style.marginTop = "10px";
//   modModel.txtCVC_Nationality.style.width = "228px";
//   modModel.txtCVC_Nationality.attributes.required = true;
//   modModel.txtCVC_Nationality.setAttribute(
//     "maxLength",
//     modSchema.funcGetFieldSize("CV_Contact", "CVC_Nationality")
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
}

export const funcLoadData = () => {
  /*
   Created 20/01/2025 By Roger Williams

   loads record selected from combobox
   ALSO loads data into objTable -> the table schema
   THIS IS USED FOR UNDO

*/
  const trnTemp = modModel.dbJobSeekerCRM.transaction(
    modSchema.constCV_Contact,
    "readonly"
  );
  const objTemp = trnTemp.objectStore(modSchema.constCV_Contact);
  //find record by key: modModel.cmbID.value
  //Note: have to convert to number as get() does not convert string!
  const objData = objTemp.get(Number(modModel.cmbID.value));

  objData.onsuccess = () => {
    const objFound = objData.result;
    //load data!
    modModel.txtCVC_Address1.value = objFound.CVC_Address1;
    modModel.txtCVC_Address2.value = objFound.CVC_Address2;
    modModel.txtCVC_Address3.value = objFound.CVC_Address3;
    modModel.txtCVC_TownCity.value = objFound.CVC_TownCity;
    modModel.txtCVC_Postcode.value = objFound.CVC_Postcode;
    modModel.txtCVC_LandLine.value = objFound.CVC_LandLine;
    modModel.txtCVC_CellPhone.value = objFound.CVC_CellPhone;
    modModel.txtCVC_Email.value = objFound.CVC_Email;
    //store in objTable in order they are in schema
    modModel.objTable.aryFields[0].fieldValue = modModel.cmbID.value;
    modModel.objTable.aryFields[1].fieldValue = objFound.CVC_Address1;
    modModel.objTable.aryFields[2].fieldValue = objFound.CVC_Address2;
    modModel.objTable.aryFields[3].fieldValue = objFound.CVC_Address3;
    modModel.objTable.aryFields[4].fieldValue = objFound.CVC_TownCity;
    modModel.objTable.aryFields[5].fieldValue = objFound.CVC_LandLine;
    modModel.objTable.aryFields[6].fieldValue = objFound.CVC_CellPhone;
    modModel.objTable.aryFields[7].fieldValue = objFound.CVC_Email;
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
      "btnNew"
    );
  };
};
