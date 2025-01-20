"use strict";

/*
  Created 08/01/2025 By Roger Williams

  Data maintenance screen

  cmdID - populated by query from indexeddb->Seekers_Types
  
  fields:

  TYP_ID    - autonumber
  TYP_Type  - string

*/
import * as modModel from "./model.js";
import * as modView from "./view.js";
import * as modSchema from "../schema.js";

//create element event handlers
modModel.funcInitHandlers();
//init database

//format screen layout
modView.funcSetupScreen();
