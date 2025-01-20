"use strict";

import * as modSchema from "../schema.js";
import * as modMessageBox from "../messageBox.js";
import * as modTab from "../tab.js";

//local

//db var
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
  let elTemp;
  //"restore" page
  elTemp = document.getElementsByTagName("html");
  elTemp[0].style.opacity = "1";
  //show which button clicked true = ok false = cancel
  if (modMessageBox.blnOk) {
    if (modMessageBox.strContext === "close") {
      window.close();
    }
  }
};

const funcCreateTab = (strPage) => {
  /*
    Creates tab for menu item to open

    To create title strips strpage of .html then replaces
    _ with space

    
  */

  let strChoice = strPage;
  //strip /screens/
  strChoice = strChoice.substring(9, strChoice.length);
  //strip .html
  strChoice = strChoice.substring(0, strChoice.indexOf("."));
  //replace _ with space Note: .replace only replaces FIRST occurrance
  //hence using split/join to replace ALL
  strChoice = strChoice.split("_").join(" ");
  modTab.funcAddTab(strChoice, strPage);
};

const funcCloseClick = (event) => {
  btnClose.preventDefault();
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
    funcCreateTab(event.target.value);
    cmbMaintenance.value = "none";
  }
};
const funccmbMainScreensClick = (event) => {
  /*
   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    //show form
    funcCreateTab(event.target.value);
    cmbMainScreens.value = "none";
  }
};
const funccmbReportsClick = (event) => {
  /*
   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    //show form
    funcCreateTab(event.target.value);
    cmbReports.value = "none";
  }
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

export function funcCreateMessageBoxResultHandler() {
  txtHidden.addEventListener("focus", funcHiddenTextBoxHandler);
}

function funcDeleteDB_Click() {
  modSchema.funcDeleteDatabase();
}
export function funcInitHandlers() {
  /*
   Creates handlers for the comboboxes and close buttons
   
  */

  cmbMaintenance.addEventListener("click", funccmbMaintenanceClick);
  cmbMainScreens.addEventListener("click", funccmbMainScreensClick);
  cmbReports.addEventListener("click", funccmbReportsClick);
  btnClose.addEventListener("click", funcCloseClick);

  //temp handlers
  document
    .getElementById("btnDeleteDB")
    .addEventListener("click", funcDeleteDB_Click);
}
