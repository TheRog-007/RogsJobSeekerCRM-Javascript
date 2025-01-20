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
// intSize = modSchema.funcGetFieldSize("Seekers_Types", "TYP_Type");
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

//   modModel.txtTYP_Type.style.marginTop = "10px";
//   modModel.txtTYP_Type.style.width = "228px";
//   modModel.txtTYP_Type.attributes.required = true;
//   modModel.txtTYP_Type.setAttribute(
//     "maxLength",
//     modSchema.funcGetFieldSize("Seekers_Types", "TYP_Type")
//   );
//   modModel.btnSave.style.marginTop = "20px";

//   modModel.btnUndo.style.marginTop = "20px";
//   modModel.btnUndo.style.left = "100px";

//   modModel.btnDelete.style.marginTop = "20px";
//   modModel.btnDelete.style.left = "200px";

//   modModel.txtHidden.style.backgroundColor = "darkslategrey";
// };
export function funcShowFirstRecord() {
  /*
   Created 19/01/2025 By Roger Williams

   gets first record data and displays in form

  */
  const objData = modSchema.funcGetFirstRecord();
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
  //text control
  let aryElements = document.getElementsByTagName("input");

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

*/
  const trnTemp = modModel.dbJobSeekerCRM.transaction(
    modSchema.constSeekers_Types,
    "readonly"
  );
  const objTemp = trnTemp.objectStore(modSchema.constSeekers_Types);
  console.log(objTemp);
  const objData = objTemp.get(modModel.cmbID.value);

  objData.onsuccess = () => {
    const objFound = objData.result;
    console.table(objFound);
    modModel.txtTYP_Type.value = objFound.TYP_Type;
    //reset combobox
    modModel.cmbID.value = "none";
  };

  objData.onerror = (error) => {
    alert(error);
  };
};
