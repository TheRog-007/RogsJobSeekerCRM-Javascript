"use strict";

import * as modModel from "./model.js";
import * as modSchema from "../schema.js";
import * as modMessageBox from "../messageBox.js";
/*
  Created 08/01/2025 By Roger Williams

  Visual handling

*/

export const funcSetupScreen = () => {
  /*
  Created 08/01/2025 By Roger Williams

  positions buttons etc where we need them for this screen

  228px = 30 chars
*/

  modModel.btnNew.style.top = "10px";
  modModel.btnNew.style.marginTop = "10px";
  modModel.btnNew.style.left = "250px";
  modModel.btnNew.style.height = "35px";
  modModel.btnNew.style.width = "60px";

  modModel.txtTYP_Type.style.marginTop = "10px";
  modModel.txtTYP_Type.style.width = "228px";
  modModel.txtTYP_Type.attributes.required = true;
  modModel.txtTYP_Type.setAttribute(
    "maxLength",
    modSchema.funcGetFieldSize("Seekers_Types", "TYP_Type")
  );
  modModel.btnSave.style.marginTop = "20px";

  modModel.btnUndo.style.marginTop = "20px";
  modModel.btnUndo.style.left = "100px";

  modModel.btnDelete.style.marginTop = "20px";
  modModel.btnDelete.style.left = "200px";

  modModel.txtHidden.style.backgroundColor = "darkslategrey";
};
