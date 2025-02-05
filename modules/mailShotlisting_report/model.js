"use strict";

import * as modSchema from "../schema.js";
import * as modMessageBox from "../messageBox.js";
import * as modView from "./view.js";

/*
  Created 08/01/2025 By Roger Williams

  Data handling/events etc.

  
*/
//export vars
//Note: due to unfixable bug btnNew is called btnNew2
export const btnPrint = document.getElementById("btnPrint");
export const btnPreview = document.getElementById("btnPreview");

export const cmbID = document.getElementById("cmbID");
export const lblAllMailshots = document.getElementById("lblAllMailshots");
export const chkAllMailshots = document.getElementById("chkAllMailshots");
export const lblDateFrom = document.getElementById("lblDateFrom");
export const txtDateFrom = document.getElementById("txtDateFrom");
export const lblDateTo = document.getElementById("lblDateTo");
export const txtDateTo = document.getElementById("txtDateTo");
export const lblAllDates = document.getElementById("lblAllDates");
export const chkAllDates = document.getElementById("chkAllDates");
export const divMSH_MailshotName = document.getElementById(
  "divMSH_MailshotName"
);

export const txtHidden = document.getElementById("txtHidden");
//local

//db var
export let dbJobSeekerCRM;
//table schema var
export let objTable;

//report vars
const intNumDetailsRows = 174; //@14px; //max number of detail lines
const intNumHeaderLines = 10;
const intNumFooterLines = 1;
//page(s)
let intPage = 1;
let intPages = 0;
//used for report put here so can be close if left open
//and run a second time!
let winTemp;

//event handlers
const funccmbIDSelect = (event) => {
  /*
   Created 08/01/2025 By Roger Williams

   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    modView.funcLoadData();
    cmbID.selectedIndex = 0;
    chkAllMailshots.checked = false;
  }
};
const funcComboboxSelect = (event) => {
  /*
  Created 30/01/2025 By Roger Williams
  
  when user selects from a combobox change the text control 
  to have text e.g. cmbJOB_Sector.value => cmbJOB_Sector
  
*/
  if (event.target.value !== "none") {
    document.getElementById(
      "cmb" + event.target.id.substring(3, event.target.id.length)
    ).value = event.target.options[event.target.selectedIndex].text;
    event.target.selectedIndex = 0;
  }
};
export function funcClearCombobox(cmbWhat) {
  /*
  Created 23/01/2025 By Roger Williams

  clears passed combobox
 */
  if (cmbWhat.length > 0) {
    while (cmbWhat.length > 0) {
      cmbWhat.remove(cmbWhat.length - 1);
    }
  }
}
export function funcInitComboboxes() {
  /*
   Created 30/01/2025 By Roger Williams

   Creates combobox items from db

   Reads from Seekers_Mailshots_Header
 
   txtDateFrom
   txtDateTo

  */
  let elFirst;
  let intNum = 0;
  let aryTemp;

  function funcCreateItems(strCombo = "", strTable = "", strField = "") {
    //Creates combobox items from db
    let elTemp;
    const trnTemp = dbJobSeekerCRM.transaction(strTable, "readonly");
    const objTemp = trnTemp.objectStore(strTable);
    const qryTemp = objTemp.openCursor();

    // create first item = null
    elTemp = document.createElement("option");
    elTemp.value = "none";
    elTemp.innerText = document.getElementById(strCombo).innerText;
    document.getElementById(strCombo).appendChild(elTemp);

    qryTemp.onsuccess = (event) => {
      const curTemp = event.target.result;

      if (curTemp) {
        if (curTemp.value[strField]) {
          //create new option element inside the combobox
          elTemp = document.createElement("option");
          elTemp.value = curTemp.key;
          elTemp.innerText = curTemp.value[strField];
          document.getElementById(strCombo).appendChild(elTemp);
          curTemp.continue();
        }
      }
    };
  }

  //first clear any existing items EXCEPT first
  aryTemp = document.getElementsByTagName("select");

  for (intNum = 0; intNum !== aryTemp.length; intNum++) {
    if (aryTemp[intNum].id !== "cmbID") {
      while (aryTemp[intNum].length > 1) {
        aryTemp[intNum].remove(aryTemp[intNum].length - 1);
      }
    }
  }

  intNum = 0;
  //get from static tables
  funcCreateItems(
    "cmbDateFrom",
    modSchema.constSeekers_Mailshot_Header,
    "MSH_PrintedDate"
  );
  funcCreateItems(
    "cmbDateTo",
    modSchema.constSeekers_Mailshot_Header,
    "MSH_PrintedDate"
  );
}

export function funcPopulateCombobox() {
  /*
   Created 09/01/2025 By Roger Williams

   Creates combobox items from db

   fields:

   autonumber - hidden
   next primary key

  */
  let elFirst;

  function funcCreateItems() {
    //Creates combobox items from db
    let elTemp;
    const trnTemp = dbJobSeekerCRM.transaction(
      modSchema.constSeekers_Mailshot_Header,
      "readonly"
    );
    const objTemp = trnTemp.objectStore(modSchema.constSeekers_Mailshot_Header);
    const qryTemp = objTemp.openCursor();

    qryTemp.onsuccess = (event) => {
      const curTemp = event.target.result;

      if (curTemp) {
        //create new option element inside the combobox
        elTemp = document.createElement("option");
        elTemp.value = curTemp.key;
        elTemp.innerText = curTemp.value.MSH_MailshotName;
        cmbID.appendChild(elTemp);
        curTemp.continue();
      }
    };
  }

  //first clear any existing items
  if (cmbID.length > 0) {
    while (cmbID.length > 0) {
      cmbID.remove(cmbID.length - 1);
    }
  }
  // create first item
  elFirst = document.createElement("option");
  elFirst.value = "none";
  elFirst.innerText = "Select ID";
  cmbID.appendChild(elFirst);
  //populate from db
  funcCreateItems();
}

const funcShowReport = (blnPrint = false) => {
  /*
   Created 31/01/2025 By Roger Williams

   prints/previews the report

   gets records and stores into array of objects BEFORE printing avoids
   any asynch issues using cursor

  */
  //form vars
  let divDummy;
  let blnFilter = false;
  let trnTemp;
  let objTemp;
  let qryTemp;
  let trnLines;
  let objLinesRecords;
  let qryLines;
  let curTempLines;
  let curTempHeader;
  let aryHeader = [];
  let aryLines = [];
  let objHeader;
  let objLines;
  let aryResult = [];

  let intNum1 = 0;
  let intNum2 = 0;
  let intNum3 = 0;

  function funcCreateFooter() {
    /*
    Creates report footer div and elements

    add page number to end of IDs to create unique items
    also creates CSS classname same way

    Adds to footer grid
    
  */
    let divFooter;
    let lblDate;
    let txtDate;
    let lblPages;

    //create footer
    divFooter = document.createElement("div");
    divFooter.id = "divFooter" + intPage;
    divFooter.className = "clhFooter";
    divDummy.appendChild(divFooter);

    lblDate = document.createElement("div");
    lblDate.id = "lblDate" + intPage;
    lblDate.innerText = "Date:";
    lblDate.className = "clhLabelFooter1";
    divFooter.appendChild(lblDate);
    txtDate = document.createElement("div");
    txtDate.id = "txtDate" + intPage;
    txtDate.innerText = new Date().toISOString().substring(0, 10);
    txtDate.className = "clhTextFooter1";
    divFooter.appendChild(txtDate);

    lblPages = document.createElement("div");
    lblPages.id = "lblPages" + intPage;
    //16px
    lblPages.innerText = "Page: " + intPage + " of " + intPages;
    lblPages.className = "clhLabelFooter2";
    divFooter.appendChild(lblPages);
  }

  function funcCreateDetail(aryData) {
    /*
    Creates report detail div and elements

    add page number to end of IDs to create unique items
    also creates CSS classname same way

    if there are not as many rows as intNumDetailsRows
    create BLANK innertext elements to pad the gap

    Note: uses dviDummy as does not work as part of a grid!
    
  */

    let txtCompanyName;
    let intNum = 0;
    let intNum2 = 0;

    divDummy = document.createElement("div");
    divDummy.id = "divDummy" + intPage;
    divDummy.className = "clhDummy";
    winTemp.document.body.appendChild(divDummy);

    //create detail elements
    for (intNum = 0; intNum !== aryData.length; intNum++) {
      //create unique ID from page number and ROW
      txtCompanyName = document.createElement("div");
      txtCompanyName.id = "txtCompanyName" + intPage + "_" + intNum;
      txtCompanyName.className = "clhTextDetail1";
      txtCompanyName.innerText = aryData[intNum].aryFields[1].fieldValue;
      divDummy.appendChild(txtCompanyName);
    }

    if (intNum !== intNumDetailsRows) {
      //pad gap!
      for (intNum2 = intNum; intNum2 !== intNumDetailsRows; intNum2++) {
        txtCompanyName = document.createElement("div");
        txtCompanyName.id = "txtCompanyName" + intPage + "_" + intNum2;
        txtCompanyName.className = "clhTextDetail1";
        divDummy.appendChild(txtCompanyName);
      }
    }

    funcCreateFooter();
  }

  function funcCreateHeader(aryData) {
    /*
       Creates report header div and elements
   
       add page number to end of IDs to create unique items
       also creates CSS classname same way
   
     */

    let divHeader;
    let txtTitle;

    let lblDatePrinted;
    let txtDatePrinted;
    let lblMailshotName;
    let txtMailshotName;
    let lblCVPath;
    let txtCVPath;
    let lblLetterPath;
    let txtLetterPath;
    let lblCompanyName;
    let divLine;

    //create header div
    divHeader = winTemp.document.createElement("div");
    divHeader.id = "divHeader" + intPage;
    divHeader.className = "clhHeader";
    winTemp.document.body.appendChild(divHeader);

    //create report title
    txtTitle = document.createElement("div");
    txtTitle.id = "txtTitle" + intPage;
    txtTitle.className = "clhTitle";
    txtTitle.innerText = "Mailshots Listing Report";
    divHeader.appendChild(txtTitle);

    //create sub elements
    lblDatePrinted = document.createElement("div");
    lblDatePrinted.id = "lblDatePrinted" + intPage;
    lblDatePrinted.className = "clhLabelHeader1";
    lblDatePrinted.innerText = "Date Printed:";
    divHeader.appendChild(lblDatePrinted);

    txtDatePrinted = document.createElement("div");
    txtDatePrinted.id = "txtDatePrinted" + intPage;
    txtDatePrinted.innerText = aryData.aryFields[7].fieldValue;
    txtDatePrinted.className = "clhTextHeader1";
    divHeader.appendChild(txtDatePrinted);

    lblMailshotName = document.createElement("div");
    lblMailshotName.id = "lblMailshotName" + intPage;
    lblMailshotName.innerText = "Mailshot Name:";
    lblMailshotName.className = "clhLabelHeader2";
    divHeader.appendChild(lblMailshotName);
    txtMailshotName = document.createElement("div");
    txtMailshotName.id = "txtMailshotName" + intPage;
    txtMailshotName.className = "clhTextHeader2";
    txtMailshotName.innerText = aryData.aryFields[1].fieldValue;
    divHeader.appendChild(txtMailshotName);

    lblCVPath = document.createElement("div");
    lblCVPath.id = "lblCVPath" + intPage;
    lblCVPath.innerText = "CV Path:";
    lblCVPath.className = "clhLabelHeader3";
    divHeader.appendChild(lblCVPath);
    txtCVPath = document.createElement("div");
    txtCVPath.id = "txtCVPath" + intPage;
    txtCVPath.className = "clhTextHeader3";
    txtCVPath.innerText = aryData.aryFields[2].fieldValue;
    divHeader.appendChild(txtCVPath);

    lblLetterPath = document.createElement("div");
    lblLetterPath.id = "lblLetterPath" + intPage;
    lblLetterPath.innerText = "Letter Path:";
    lblLetterPath.className = "clhLabelHeader4";
    divHeader.appendChild(lblLetterPath);
    txtLetterPath = document.createElement("div");
    txtLetterPath.id = "txtLetterPath" + intPage;
    txtLetterPath.className = "clhTextHeader4";
    txtLetterPath.innerText = aryData.aryFields[6].fieldValue;
    divHeader.appendChild(txtLetterPath);

    divLine = document.createElement("div");
    divLine.id = "divLine1" + intPage;
    divLine.className = "clhLineHeader1";
    divHeader.appendChild(divLine);

    lblCompanyName = document.createElement("div");
    lblCompanyName.id = "lblCompanyName" + intPage;
    lblCompanyName.innerText = "Company Name";
    lblCompanyName.className = "clhLabelHeader5";
    divHeader.appendChild(lblCompanyName);

    divLine = document.createElement("div");
    divLine.id = "divLine2" + intPage;
    divLine.className = "clhLineHeader2";
    divHeader.appendChild(divLine);
  }

  //get table schemas
  //Note: can't use these directly due to JS "unique" approach to obj1 = obj2
  objHeader = new Object(
    modSchema.funcGetSchema(modSchema.constSeekers_Mailshot_Header)
  );
  objLines = new Object(
    modSchema.funcGetSchema(modSchema.constSeekers_Mailshot_Lines)
  );

  //read through table find header matches and add to aryHeader
  trnTemp = dbJobSeekerCRM.transaction(
    modSchema.constSeekers_Mailshot_Header,
    "readonly"
  );

  objTemp = trnTemp.objectStore(modSchema.constSeekers_Mailshot_Header);
  qryTemp = objTemp.openCursor();

  qryTemp.onsuccess = (event) => {
    blnFilter = false;
    curTempHeader = event.target.result;

    if (curTempHeader) {
      //see if record matches any form criteria
      if (chkAllDates.checked === false) {
        if (txtDateTo.value !== "none" && txtDateTo.value !== "none") {
          if (curTempHeader.value.MSH_PrintedDate >= txtDateFrom.value) {
            if (curTempHeader.value.MSH_PrintedDate <= txtDateTo.value) {
              blnFilter = true;
            }
          }
        }
      }

      if (chkAllMailshots.checked === false) {
        if (
          curTempHeader.value.MSH_MailshotName === divMSH_MailshotName.innerText
        ) {
          blnFilter = true;
        }
      }

      if (blnFilter || (chkAllDates.checked && chkAllMailshots.checked)) {
        //date match found store in array
        let objHeaderTemp = new Object();
        objHeaderTemp = JSON.parse(JSON.stringify(objHeader));
        objHeaderTemp.aryFields[1].fieldValue =
          curTempHeader.value.MSH_MailshotName;
        objHeaderTemp.aryFields[7].fieldValue =
          curTempHeader.value.MSH_PrintedDate;
        objHeaderTemp.aryFields[2].fieldValue = curTempHeader.value.MSH_CVPath;
        objHeaderTemp.aryFields[6].fieldValue =
          curTempHeader.value.MSH_LetterPath;
        //add to array
        aryHeader.push(objHeaderTemp);
      }
      curTempHeader.continue();
    } else {
      trnLines = dbJobSeekerCRM.transaction(
        modSchema.constSeekers_Mailshot_Lines,
        "readonly"
      );
      objLinesRecords = trnLines.objectStore(
        modSchema.constSeekers_Mailshot_Lines
      );
      qryLines = objLinesRecords.openCursor();

      qryLines.onsuccess = (event) => {
        curTempLines = event.target.result;

        if (curTempLines) {
          //load ALL records into array
          let objLinesTemp = new Object();
          objLinesTemp = JSON.parse(JSON.stringify(objLines));

          objLinesTemp.aryFields[1].fieldValue =
            curTempLines.value.MSL_CompanyName;
          objLinesTemp.aryFields[2].fieldValue =
            curTempLines.value.MSL_Address1;
          objLinesTemp.aryFields[3].fieldValue =
            curTempLines.value.MSL_Address2;
          objLinesTemp.aryFields[4].fieldValue =
            curTempLines.value.MSL_Address3;
          objLinesTemp.aryFields[6].fieldValue =
            curTempLines.value.MSL_TownCity;
          objLinesTemp.aryFields[7].fieldValue =
            curTempLines.value.MSL_Postcode;
          objLinesTemp.aryFields[8].fieldValue = curTempLines.value.MSL_Contact;
          objLinesTemp.aryFields[9].fieldValue =
            curTempLines.value.MSH_MailshotName;

          //add to array
          aryLines.push(objLinesTemp);
          curTempLines.continue();
        } else {
          //no more records - now print report!
          intPage = 1;
          intPages = aryHeader.length;

          //if no records show message exit routine
          if (aryHeader.length === 0) {
            modMessageBox.funcMessageBox(
              "No Records Found!",
              modMessageBox.objIcons.error,
              modMessageBox.objButtons.ok,
              -1,
              "none",
              1,
              "btnNew",
              document.getElementsByTagName("html")
            );
            return;
          }

          //calculate how many pages
          for (intNum1 = 0; intNum1 != aryHeader.length; intNum1++) {
            //find lines
            intNum2 = 0;

            for (intNum2 = 0; intNum2 != aryLines.length; intNum2++) {
              const arySearchLines = aryLines[intNum2].aryFields.filter(
                (objData) => {
                  if (
                    objData.fieldName === "MSH_MailshotName" &&
                    objData.fieldValue ===
                      aryHeader[intNum1].aryFields[1].fieldValue
                  ) {
                    return objData;
                  }
                }
              );

              //process returned records count
              if (arySearchLines.length > intNumDetailsRows) {
                intNum3 = arySearchLines.length - intNumDetailsRows;
                intPages = intPages + Number(intNum3.toFixed(0));
              }
              //  if (arySearchLines.length != 0) {
              //   intPages++;
              //  }
            }
          }
          //print report

          //if previous report window open close it!
          if (winTemp) {
            winTemp.close();
            //clear aryResult
            aryResult.forEach((objData) => {
              aryResult.remove(objData);
            });
          }
          //create report window
          winTemp = window.open("mailShot_listing_report_output.html");
          winTemp.addEventListener("afterprint", (event) => {
            //close after print
            winTemp.setTimeout(winTemp.close, 0);
          });

          winTemp.onload = () => {
            //create event handlers
            //  winTemp.document
            //    .getElementById("txtHidden")
            //    .addEventListener("focus", functxtHiddenFocus);
            //    };

            for (intNum1 = 0; intNum1 != aryHeader.length; intNum1++) {
              //find lines
              for (intNum3 = 0; intNum3 != aryLines.length; intNum3++) {
                aryLines[intNum3].aryFields.forEach((element) => {
                  if (
                    element.fieldName === "MSH_MailshotName" &&
                    element.fieldValue ===
                      aryHeader[intNum1].aryFields[1].fieldValue
                  ) {
                    aryResult.push(aryLines[intNum3]);
                  }
                });
              }
              if (aryResult.length != 0) {
                //create header
                funcCreateHeader(aryHeader[intNum1]);
                intNum2 = 0;

                while (intNum2 != aryResult.length) {
                  //find ALL matching lines
                  //   for (intNum2 = 0; intNum2 != aryLines.length; intNum2++) {
                  //process returned records count
                  if (aryResult.length > 0) {
                    if (aryResult.length > intNumDetailsRows) {
                      /*
                     - print first page (numdetailrows)
                     - increment intnum1 to intnum1 + numdetailrows
                     - print header
                     - print detail
                     - loop until aryresults.length < numdetailrows
                     - print header
                     - print remaining detail
                     - increment intnum1 to intnum1 + aryresults.length
                  */
                      //print first page
                      funcCreateDetail(aryResult);
                      intPage++;
                      intNum2 = intNum2 + intNumDetailsRows;

                      while (aryResult.length > intNumDetailsRows) {
                        aryResult = aryResult.slice(0, intNumDetailsRows - 1);
                        //make sure not printing blank page
                        if (aryResult.length != 0) {
                          funcCreateHeader(aryHeader[intNum1]);
                          funcCreateDetail(aryResult);
                          intPage++;
                          intNum2 = intNum2 + aryResult.length;
                        }
                      }
                      funcCreateHeader(aryHeader[intNum1]);
                      funcCreateDetail(aryResult);
                      intNum2 = intNum2 + aryResult.length;
                      intPage++;
                    } else {
                      funcCreateDetail(aryResult);
                      intPage++;
                      intNum2 = intNum2 + aryResult.length;
                    }
                  } else {
                    //just one page to print
                    funcCreateDetail(aryResult);
                    intPage++;
                    intNum2 = intNum2 + aryResult.length;
                  }
                }
              }
            }
          };
        }
      };
    }
  };
};
const funcbtnPrintClick = (event) => {
  funcShowReport(true);
};

const funcbtnPreviewClick = (event) => {
  funcShowReport(false);
};

const funcchkAllDatesChanged = (event) => {
  //
  if (chkAllDates.checked) {
    chkAllMailshots.checked = true;
  } else {
    chkAllMailshots.checked = true;
  }
};

const funcchkAllMailshotsChanged = (event) => {
  //
  if (chkAllMailshots) {
    chkAllDates.checked = true;
    divMSH_MailshotName.innerText = "";
  } else {
    chkAllDates.checked = true;
  }
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
  //handle if not blnOk and save is context
  else {
    if (modMessageBox.strContext === "load") {
      blnNew = false;
      //load data into form
      modView.funcLoadData();
    }
  }
};

function funcOpenDatabase() {
  let dbopenRequest = indexedDB.open(modSchema.constDBName, 1);

  dbopenRequest.onupgradeneeded = (event) => {
    //if no database create it from the schema file
    funcCreateFromSchema(event);
    modMessageBox.funcMessageBox(
      "Database Created",
      modMessageBox.objIcons.information,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "btnNew",
      document.getElementsByTagName("html")
    );
  };

  dbopenRequest.onerror = () => {
    modMessageBox.funcMessageBox(
      `Error Accessing Database ${dbopenRequest.error}`,
      modMessageBox.objIcons.error,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "btnNew",
      document.getElementsByTagName("html")
    );
  };

  dbopenRequest.onsuccess = () => {
    dbJobSeekerCRM = dbopenRequest.result;
    //work with database

    dbJobSeekerCRM.onversionchange = () => {
      dbJobSeekerCRM.close();
      modMessageBox.funcMessageBox(
        "Database Version Out of Date Reload Page",
        modMessageBox.objIcons.information,
        modMessageBox.objButtons.ok,
        -1,
        "none",
        1,
        "btnNew",
        document.getElementsByTagName("html")
      );
    };

    //activate "action" buttons
    btnPrint.style.display = "block";
    btnPreview.style.display = "block";

    //populate combobox
    funcPopulateCombobox();
    //init other combos
    funcInitComboboxes();
  };
}

//exports
export function funcCreateMessageBoxResultHandler() {
  txtHidden.addEventListener("focus", funcHiddenTextBoxHandler);
}

export function funcInitDB() {
  /*
  Created 19/02/2025 By Roger Williams

  gets schema for table
  opens db
  gets first record
 */

  //open db
  dbJobSeekerCRM = funcOpenDatabase();
}
export function funcInitHandlers() {
  /*
   Creates handlers for the detail "treeviews" and print/preview buttons
   
  */

  cmbID.addEventListener("change", funccmbIDSelect);
  btnPrint.addEventListener("click", funcbtnPrintClick);
  btnPreview.addEventListener("click", funcbtnPreviewClick);

  chkAllDates.addEventListener("change", funcchkAllDatesChanged);
  chkAllMailshots.addEventListener("change", funcchkAllMailshotsChanged);
}
