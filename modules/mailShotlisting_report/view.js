"use strict";

import * as modModel from "./model.js";
import * as modSchema from "../schema.js";
import * as modMessageBox from "../messageBox.js";
/*
  Created 08/01/2025 By Roger Williams

  Visual handling


*/

export function funcInitView() {
  //disable "action" buttons opendb activates them
  modModel.btnPrint.style.display = "none";
  modModel.btnPreview.style.display = "none";
}

export const funcLoadData = () => {
  /*
   Created 20/01/2025 By Roger Williams

   loads record selected from combobox
   ALSO loads data into objTable -> the table schema
   THIS IS USED FOR UNDO

*/
  const trnTemp = modModel.dbJobSeekerCRM.transaction(
    modSchema.constSeekers_Mailshot_Header,
    "readonly"
  );
  const objTemp = trnTemp.objectStore(modSchema.constSeekers_Mailshot_Header);
  //find record by key: modModel.cmbID.value
  //Note: have to convert to number as get() does not convert string!
  const objData = objTemp.get(Number(modModel.cmbID.value));

  objData.onsuccess = () => {
    const objFound = objData.result;
    //load data!
    modModel.divMSH_MailshotName.innerText = objFound.MSH_MailshotName;
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
