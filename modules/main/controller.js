"use strict";

/*
  Created 03/01/2024 By Roger Williams

  Javascript version of the JobseekersCRM

  Uses IndexedDB for quickness and portability

  Includes nmy custom message dialog "control" and tab "control"

  Works thus:

  - user selects what they want to open
  - that HTML page is loaded into a new tab in an iframe
  - user can switch between tabs and close all but the first one
  - all reports are seperate HTML files

  To Do:

  - check iframe HTML can be printed and not entire viewport contents
  - create system to populate comboboxes in sub forms with default values

*/
import * as modModel from "./model.js";
// import * as modMessageBox from "../messageBox.js";
import * as modTab from "../tab.js";
import * as modSchema from "../schema.js";

//see if indexeddb is supported
if (!modSchema.funcIndexedDBSupport) {
  alert("Cannot Run Program IndexedDb Not Supported In This Browser");
} else {
  //delete database (ONLY activate if schema changed)
  // modModel.funcDeleteDatabase();
  //init database
  modSchema.funcOpenDatabase();
}

//create event handler for textbox for messagebox button result
modModel.funcCreateMessageBoxResultHandler();
//create element event handlers
modModel.funcInitHandlers();
//show tab control
modTab.funcInit();
