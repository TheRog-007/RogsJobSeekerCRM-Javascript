"use strict";

import * as modSchema from "./schema.js";
import * as modMessageBox from "./messageBox.js";
//exports

//local

//db var
let dbJobSeekerCRM;
const txtHidden = document.getElementById("txtHidden");
const btnClose = document.getElementById("btnClose");
const cmbMaintenance = document.getElementById("cmbMaintenance");
const cmbMainScreens = document.getElementById("cmbMainScreens");
const cmbReports = document.getElementById("cmbReports");

// const funcbtnLoginClick = () => {
//   //dont act like a form and submit!
//   btnLogin.preventDefault();
//   //open connection
// };

/*
  event handler for "hidden" textbox whoes focus event tells the 
  program a messagebox button has been clicked so modMessageBox.blnOk
  can be checked to see the result
*/
const funcHiddenTextBoxHandler = (event) => {
  //show which button clicked true = ok false = cancel
  if (modMessageBox.blnOk) {
    if (modMessageBox.strContext === "close") {
      window.close();
    }
  }
};

const funcCloseClick = (event) => {
  modMessageBox.funcMessageBox(
    "Close Application?",
    modMessageBox.objIcons.question,
    modMessageBox.objButtons.yes,
    modMessageBox.objButtons.no,
    "close",
    2,
    "btnClose"
  );
};

const funccmbMaintenanceClick = (event) => {
  /*
   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    //show form
    alert(event.target.value);
    cmbMaintenance.value = "none";
  }
};
const funccmbMainScreensClick = (event) => {
  /*
   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    //show form
    alert(event.target.value);
    cmbMainScreens.value = "none";
  }
};
const funccmbReportsClick = (event) => {
  /*
   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    //show form
    alert(event.target.value);
    cmbReports.value = "none";
  }
};

const funcCreateFromSchema = (event) => {
  // const objectStore = db.createObjectStore("name", { keyPath: "myKey" });
  // let index = books.createIndex('price_idx', 'price');
  let fldCreate;

  dbJobSeekerCRM = event.target.result;

  modSchema.aryTables.forEach((objTable) => {
    //create table

    //create primary key
    fldCreate = dbJobSeekerCRM.createObjectStore(objTable.tblName, {
      keypath: objTable.aryFields[0].fieldName,
      autoIncrement: true,
    });
    //create rest of fields as indexes
    objTable.aryFields.forEach((objField) => {
      //dont duplicate the primary key!
      if (objField.fieldName != objTable.aryFields[0].fieldName) {
        fldCreate.createIndex("idx" + objField.fieldName, objField.fieldName, {
          unique: false,
        });
      }
    });
  });
};

// let transaction = db.transaction("books", "readwrite"); // (1)
// // get an object store to operate on it
// let books = transaction.objectStore("books"); // (2)
// let book = {
// id: 'js',
// price: 10,
// created: new Date()
// };
// let request = books.add(book); // (3)

//also transaction.oncompleted (event)
// request.onsuccess = function() { // (4)
// console.log("Book added to the store", request.result);
// };
// request.onerror = function(event) {
//     // ConstraintError occurs when an object with the same id already exists
//     if (request.error.name == "ConstraintError") {
//     console.log("Book with such id already exists"); // handle the error
//     event.preventDefault(); // don't abort the transaction
//     // use another key for the book?
//     } else {
//     // unexpected error, can't handle it
//     // the transaction will abort
//     }
//     };
//     transaction.onabort = function() {
//     console.log("Error", transaction.error);
//     };

//search
// get one book
// books.get('js')
// // get books with 'css' <= id <= 'html'
// books.getAll(IDBKeyRange.bound('css', 'html'))
// // get books with id < 'html'
// books.getAll(IDBKeyRange.upperBound('html', true))
// // get all books
// books.getAll()
// // get all keys, where id > 'js'
// books.getAllKeys(IDBKeyRange.lowerBound('js', true))

//use index to search on non key fields
// let index = books.createIndex('price_idx', 'price');
// let priceIndex = books.index("price_idx");
// index.get("Donna").onsuccess = (event) => {
//     console.

//delete by index
// find the key where price = 5
// let request = priceIndex.getKey(5);
// request.onsuccess = function() {
// let id = request.result;
// let deleteRequest = books.delete(id);

//cursor
// called for each book found by the cursor
// request.onsuccess = function() {
//     let cursor = request.result;
//     if (cursor) {
//     let key = cursor.key; // book key (id field)
//     let value = cursor.value; // book object
//     console.log(key, value);
//     cursor.continue();
//     } else {
//     console.log("No more books");
//     }

// The main cursor methods are:
// advance(count) – advance the cursor count times, skipping values.
// continue([key]) – advance the cursor to the next value in range matching (or immediately after key if given).

//exports
// export function funcCreateHandlers() {
//   btnLogin.addEventListener("click", funcbtnLoginClick);
// }

export function funcOpenDatabase() {
  let dbopenRequest = indexedDB.open("RogsJobSeekerCRM", 1);

  dbopenRequest.onupgradeneeded = (event) => {
    //if no database create it from the schema file
    funcCreateFromSchema(event);
  };

  dbopenRequest.onerror = () => {
    alert(`Error Accessing Database ${dbopenRequest.error}`);
  };

  dbopenRequest.onsuccess = () => {
    dbJobSeekerCRM = dbopenRequest.result;
    //work with database

    dbJobSeekerCRM.onversionchange = () => {
      dbJobSeekerCRM.close();
      alert("Database Version Is Outdated Please Reload Page");
    };
  };
}

export function funcIndexedDBSupport() {
  return "indexedDB" in window;
}

export function funcCreateMessageBoxResultHandler() {
  txtHidden.addEventListener("focus", funcHiddenTextBoxHandler);
}

export function funcInitHandlers() {
  /*
   Creates handlers for the detail "treeviews" and print/preview buttons
   
  */

  cmbMaintenance.addEventListener("click", funccmbMaintenanceClick);
  cmbMainScreens.addEventListener("click", funccmbMainScreensClick);
  cmbReports.addEventListener("click", funccmbReportsClick);
  btnClose.addEventListener("click", funcCloseClick);
}
