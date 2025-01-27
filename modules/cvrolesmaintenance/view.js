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
// intSize = modSchema.funcGetFieldSize("CV_Roles", "CVI_Details");
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
//     modSchema.funcGetFieldSize("CV_Roles", "CVI_Details")
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
  modModel.funcClearCombobox(modModel.lstResponsibility_Name);
  modModel.funcClearCombobox(modModel.lstResponsibility_Details);

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
      modModel.txtCVR_Name.value = dbCursor.value.CVR_Name;
      modModel.txtCVRR_Name.value = dbCursor.value.CVRR_Name;
      modModel.txtCVRR_Details.value = dbCursor.value.CVRR_Details;

      //store in objTable in order they are in schema
      modModel.objTable.aryFields[0].fieldValue = modModel.cmbID.value;
      modModel.objTable.aryFields[1].fieldValue = dbCursor.value.CVRR_Name;
      modModel.objTable.aryFields[2].fieldValue = dbCursor.value.CVRR_Details;
      modModel.objTable.aryFields[3].fieldValue = dbCursor.value.CVR_Name;
      /*
      load ALL CRR_ fields from table into

       lstResponsibility_Name

      */
      elTemp = document.createElement("option");
      elTemp.innerText = dbCursor.value.CVRR_Name;
      elTemp.value = elTemp.innerText;
      modModel.lstResponsibility_Name.appendChild(elTemp);

      elTemp = document.createElement("option");
      elTemp.innerText = dbCursor.value.CVRR_Details;
      elTemp.value = elTemp.innerText;
      modModel.lstResponsibility_Details.appendChild(elTemp);
      //goto next record
      dbCursor.continue();
    }
    //reset new indicator
    modModel.funcResetblnNew(false);
  };
};
