"use strict";

import * as modModel from "./model.js";
import * as modSchema from "../schema.js";

/*
  Created 08/01/2025 By Roger Williams

  Visual handling

*/

export const funcSetupScreen = () => {
  /*
  Created 08/01/2025 By Roger Williams

  positions buttons etc where we need them for this screen

  228px = 30 chars

  Note: can use CH as this represents char width of char 0
*/

  modModel.txtCVC_Address1.setAttribute(
    "maxLength",
    modSchema.funcGetFieldSize("CV_Contact", "CVC_Address1")
  );
  modModel.txtCVC_Address1.style.width =
    modModel.txtCVC_Address1.getAttribute("maxLength") + "ch";

  // modModel.txtHidden.style.backgroundColor = "darkslategrey";
  //config validation/max chars allowed etc
  // intSize = modSchema.funcGetFieldSize("Seekers_Types", "TYP_Type");
};
