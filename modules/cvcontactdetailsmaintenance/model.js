"use strict";

import * as modSchema from "../schema.js";
import * as modMessageBox from "../messageBox.js";

/*
  Created 08/01/2025 By Roger Williams

  Data handling/events etc.

  
*/
//export vars

export const btnSave = document.getElementById("btnSave");
export const btnNew = document.getElementById("btnNew");
export const btnUndo = document.getElementById("btnUndo");
export const btnDelete = document.getElementById("btnDelete");

export const cmbID = document.getElementById("cmbContactID");
export const txtCVC_Address1 = document.getElementById("txtCVC_Address1");
export const txtCVC_Address2 = document.getElementById("txtCVC_Address2");
export const txtCVC_Address3 = document.getElementById("txtCVC_Address3");
export const txtCVC_TownCity = document.getElementById("txtCVC_TownCity");
export const txtCVC_Postcode = document.getElementById("txtCVC_Postcode");
export const txtCVC_Landline = document.getElementById("txtCVC_Landline");
export const txtCVC_CellPhone = document.getElementById("txtCVC_CellPhone");
export const txtCVC_Email = document.getElementById("txtCVC_Email");
export const txtHidden = document.getElementById("txtHidden");
//local

//db var
let dbJobSeekerCRM;

// const funcbtnLoginClick = () => {
//   //dont act like a form and submit!
//   btnLogin.preventDefault();
//   //open connection
// };

//event handlers
const funccmbIDClick = (event) => {
  /*
   Created 08/01/2025 By Roger Williams

   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    //show form
    alert(event.target.value);
    cmbID.value = "none";
  }
};

// const funcValidateTextLength = (strValue, intMaxLength) => {
//   /*
//        Created 10/01/2024 By Roger Williams

//        Checks if string passed greater than passed max length

//     */
// };
const functextboxKeyDown = (event) => {
  /*
  Created 08/01/2025 By Roger Williams
  
   processes textbox changes

   checks if textbox value > maxlength

   if length at max stops any new characters being added

*/
  let elTemp;
  //get text element
  elTemp = document.getElementById(event.target.id);
  console.log(event.target.id);
  console.log(elTemp);
  console.log(event);
  //check if data at max
  if (elTemp.value.length > elTemp.attributes.maxLength - 1) {
    //make sure key pressed is not tab, backspace, delete or left/right cursor move
    //or enter!

    //check if date
    if (elTemp.id.contains("Date")) {
    }
    if (
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight" &&
      event.key !== "Backspace" &&
      event.key !== "Delete" &&
      event.key !== "Enter"
    ) {
      event.preventDefault();
    }
  }
};

const funcbtnSaveClick = (event) => {
  /*
  Created 08/01/2025 By Roger Williams
  
   processes save

*/
  // const trnTemp = dbJobSeekerCRM.transaction("Seekers_Types", "readonly");
  // const objTemp = trnTemp.objectStore("Seekers_Types");
  //dont allow submit to work!
  // btnSave.preventDefault();
  let objTemp = modSchema.funcGetFirstRecord("Seekers_Types");

  if (modSchema.funcValidateForm) {
    //save data
  }
};
const funcbtnUndoClick = (event) => {
  /*
  Created 08/01/2025 By Roger Williams
  
   processes undo

*/

  const trnTemp = dbJobSeekerCRM.transaction("Seekers_Types", "readonly");
  const objTemp = trnTemp.objectStore("Seekers_Types");
};
const funcbtnDeleteClick = (event) => {
  /*
   proceses delete

*/
  const trnTemp = dbJobSeekerCRM.transaction("Seekers_Types", "readonly");
  const objTemp = trnTemp.objectStore("Seekers_Types");
};

//other funcs

const funcPopulateCombobox = () => {
  /*
   Created 09/01/2025 By Roger Williams

  fields:

  TYP_ID    - autonumber
  TYP_Type  - string

  */
  const trnTemp = dbJobSeekerCRM.transaction("Seekers_Types", "readonly");
  const objTemp = trnTemp.objectStore("Seekers_Types");
  const qryTemp = objTemp.openCursor();

  qryTemp.onsuccess = (event) => {
    const curTemp = event.target.result;

    if (curTemp) {
      console.log(curTemp.value);

      //curTemp.continue();
    }
  };
};

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
export function funcCreateMessageBoxResultHandler() {
  txtHidden.addEventListener("focus", funcHiddenTextBoxHandler);
}

// export function funcOpenDatabase() {
//   let dbopenRequest = indexedDB.open("RogsJobSeekerCRM", 1);

//   // dbopenRequest.onupgradeneeded = (event) => {
//   //   //if no database create it from the schema file
//   //   funcCreateFromSchema(event);
//   // };

//   dbopenRequest.onerror = () => {
//     alert(`Error Accessing Database ${dbopenRequest.error}`);
//   };

//   dbopenRequest.onsuccess = () => {
//    modSchema.dbJobSeekerCRM = dbopenRequest.result;

//     dbJobSeekerCRM.onversionchange = () => {
//       dbJobSeekerCRM.close();
//       alert("Database Version Is Outdated Please Reload Page");
//     };
//     //populate combobox
//     funcPopulateCombobox();
//   };
// }
export function funcOpenDB() {
  /*
  Created 13/01/2025 By Roger Williams

  opens db and stores in local var
*/
  dbJobSeekerCRM = modSchema.funcOpenDatabase();
}
export function funcInitHandlers() {
  /*
   Creates handlers for the detail "treeviews" and print/preview buttons
   
  */

  cmbID.addEventListener("click", funccmbIDClick);
  txtCVC_Address1.addEventListener("keydown", functextboxKeyDown);
  btnSave.addEventListener("click", funcbtnSaveClick);
  btnUndo.addEventListener("click", funcbtnUndoClick);
  btnDelete.addEventListener("click", funcbtnDeleteClick);
}
