"use strict";
import * as modModel from "./model.js";
import * as modMessageBox from "./messageBox.js";
import * as modTab from "./tab.js";

//see if indexeddb is supported
if (!modModel.funcIndexedDBSupport) {
  alert("Cannot Run Program IndexedDb Not Supported In This Browser");
} else {
  //init event handlers
  //modModel.funcCreateHandlers();
  //init database
  modModel.funcOpenDatabase();
}

//create event handler for textbox for messagebox button result
modModel.funcCreateMessageBoxResultHandler();
//create element event handlers
modModel.funcInitHandlers();
//show tab control
modTab.funcInit();
