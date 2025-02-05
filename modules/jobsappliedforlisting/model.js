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
export const lblAllJobID = document.getElementById("lblAllJobID");
export const chkAllJobID = document.getElementById("chkAllJobID");
export const divJobTitle = document.getElementById("divJobTitle");
export const lblJobTitle = document.getElementById("lblJobTitle");
export const cmbJobTitle = document.getElementById("cmbJobTitle");
export const lblAllJobTitle = document.getElementById("lblAllJobTitle");
export const chkAllJobTitle = document.getElementById("chkAllJobTitle");
export const divDateAppliedFrom = document.getElementById("divDateAppliedFrom");
export const lblDateAppliedFrom = document.getElementById("lblDateAppliedFrom");
export const cmbDateAppliedFrom = document.getElementById("cmbDateAppliedFrom");
export const divDateAppliedTo = document.getElementById("divDateAppliedTo");
export const lblDateAppliedTo = document.getElementById("lblDateAppliedTo");
export const cmbDateAppliedTo = document.getElementById("cmbDateAppliedTo");
export const lblAllDateApplied = document.getElementById("lblAllDateApplied");
export const chkAllDateApplied = document.getElementById("chkAllDateApplied");
export const lblDateExpiresFrom = document.getElementById("lblDateExpiresFrom");
export const divDateExpiresFrom = document.getElementById("divDateExpiresFrom");
export const cmbDateExpiresFrom = document.getElementById("cmbDateExpiresFrom");
export const lblDateExpiresTo = document.getElementById("lblDateExpiresTo");
export const cmbDateExpiresTo = document.getElementById("cmbDateExpiresTo");
export const divDateExpiresTo = document.getElementById("divDateExpiresTo");
export const lblAllDateExpires = document.getElementById("lblAllDateExpires");
export const chkAllDateExpires = document.getElementById("chkAllDateExpires");
export const divStatus = document.getElementById("divStatus");
export const lblStatus = document.getElementById("lblStatus");
export const cmbStatus = document.getElementById("cmbStatus");
export const lblAllStatus = document.getElementById("lblAllStatus");
export const chkAllStatus = document.getElementById("chkAllStatus");
export const divSector = document.getElementById("divSector");
export const lblSector = document.getElementById("lblSector");
export const cmbSector = document.getElementById("cmbSector");
export const lblAllSector = document.getElementById("lblAllSectors");
export const chkAllSector = document.getElementById("chkAllSectors");

export const txtHidden = document.getElementById("txtHidden");
//local

//db var
export let dbJobSeekerCRM;
//table schema var
export let objTable;

//report vars
const intNumDetailsRows = 36; //detail lines
const intCharsPerLine = 80; //chars per row in detail

const intNumHeaderLines = 10;
const intNumFooterLines = 1;
//page(s)
let intPage = 1;
let intPages = 0;
//used for report put here so can be close if left open
//and run a second time!
let winTemp;
//new record
let blnNew = false;

//event handlers
const funccmbIDSelect = (event) => {
  /*
   Created 08/01/2025 By Roger Williams

   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    modView.funcResetForm();
    divJobTitle.innerText = cmbID.options[cmbID.selectedIndex].text;
    chkAllJobTitle.checked = false;
    cmbID.selectedIndex = 0;
    chkAllJobID.checked = false;
  }
};
const funccmbJobTitleSelect = (event) => {
  /*
   Created 08/01/2025 By Roger Williams

   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    divJobTitle.innerText = cmbJobTitle.options[cmbJobTitle.selectedIndex].text;
    cmbJobTitle.selectedIndex = 0;
    chkAllJobTitle.checked = false;
  }
};
const funccmbDateAppliedFromSelect = (event) => {
  /*
   Created 08/01/2025 By Roger Williams

   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    divDateAppliedFrom.innerText =
      cmbDateAppliedFrom.options[cmbDateAppliedFrom.selectedIndex].text;
    divDateAppliedTo.innerText = divDateAppliedFrom.innerText;
    divJobTitle.innerText = "";
    cmbJobTitle.selectedIndex = 0;
    cmbDateAppliedFrom.selectedIndex = 0;
    chkAllDateApplied.checked = false;
  }
};
const funccmbDateAppliedToSelect = (event) => {
  /*
   Created 08/01/2025 By Roger Williams

   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    divDateAppliedTo.innerText =
      cmbDateAppliedFrom.options[cmbDateAppliedTo.selectedIndex].text;
    divJobTitle.innerText = "";
    cmbJobTitle.selectedIndex = 0;
    cmbDateAppliedTo.selectedIndex = 0;
    chkAllDateApplied.checked = false;
  }
};
const funccmbDateExpiresFromSelect = (event) => {
  /*
   Created 08/01/2025 By Roger Williams

   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    divDateExpiresFrom.innerText =
      cmbDateExpiresFrom.options[cmbDateExpiresFrom.selectedIndex].text;
    divDateExpiresTo.innerText = divDateExpiresFrom.innerText;
    divJobTitle.innerText = "";
    cmbJobTitle.selectedIndex = 0;
    cmbDateExpiresFrom.selectedIndex = 0;
    chkAllDateExpires.checked = false;
  }
};
const funccmbDateExpiresToSelect = (event) => {
  /*
   Created 08/01/2025 By Roger Williams

   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    divDateExpiresTo.innerText =
      cmbDateAppliedFrom.options[cmbDateExpiresTo.selectedIndex].text;
    divJobTitle.innerText = "";
    cmbJobTitle.selectedIndex = 0;
    cmbDateExpiresTo.selectedIndex = 0;
    chkAllDateExpires.checked = false;
  }
};
const funccmbStatusSelect = (event) => {
  /*
   Created 08/01/2025 By Roger Williams

   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    divStatus.innerText = cmbStatus.options[cmbStatus.selectedIndex].text;
    divJobTitle.innerText = "";
    cmbJobTitle.selectedIndex = 0;
    cmbStatus.selectedIndex = 0;
    chkAllStatus.checked = false;
  }
};
const funccmbSectorSelect = (event) => {
  /*
   Created 08/01/2025 By Roger Williams

   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    divSector.innerText = cmbSector.options[cmbSector.selectedIndex].text;
    divJobTitle.innerText = "";
    cmbJobTitle.selectedIndex = 0;
    cmbSector.selectedIndex = 0;
    chkAllSector.checked = false;
  }
};

const funcComboboxSelect = (event) => {
  /*
  Created 30/01/2025 By Roger Williams
  
  when user selects from a combobox change the text control 
  to have text e.g. cmbJOB_Sector.value => txtJOB_Sector
  
*/
  if (event.target.value !== "none") {
    document.getElementById(
      "txt" + event.target.id.substring(3, event.target.id.length)
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
 
   cmbDateFrom
   cmbDateTo

  */
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
  funcCreateItems("cmbJobTitle", modSchema.constSeekers_Jobs, "JOB_Title");
  funcCreateItems(
    "cmbDateAppliedFrom",
    modSchema.constSeekers_Jobs,
    "JOB_DateApplied"
  );
  funcCreateItems(
    "cmbDateAppliedTo",
    modSchema.constSeekers_Jobs,
    "JOB_DateApplied"
  );
  funcCreateItems(
    "cmbDateExpiresFrom",
    modSchema.constSeekers_Jobs,
    "JOB_DateExpires"
  );
  funcCreateItems(
    "cmbDateExpiresTo",
    modSchema.constSeekers_Jobs,
    "JOB_DateExpires"
  );
  funcCreateItems("cmbStatus", modSchema.constSeekers_Jobs, "JOB_Status");
  funcCreateItems("cmbSector", modSchema.constSeekers_Jobs, "JOB_Sector");
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
      modSchema.constSeekers_Jobs,
      "readonly"
    );
    const objTemp = trnTemp.objectStore(modSchema.constSeekers_Jobs);
    const qryTemp = objTemp.openCursor();

    qryTemp.onsuccess = (event) => {
      const curTemp = event.target.result;

      if (curTemp) {
        //create new option element inside the combobox
        elTemp = document.createElement("option");
        elTemp.value = curTemp.key;
        elTemp.innerText = curTemp.value.JOB_Title;
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
  let trnTemp;
  let objTemp;
  let qryTemp;
  let curTempHeader;
  let aryHeader = [];
  let objHeader;
  let aryResult = [];

  let intNum1 = 0;
  let objHeaderTemp;
  let blnFiltered = false;

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
    let divLine;
    let intNum1 = 0;
    let intNum2 = 0;

    divDummy = document.createElement("div");
    divDummy.id = "divDummy" + intPage;
    divDummy.className = "clhDummy";
    winTemp.document.body.appendChild(divDummy);

    divLine = document.createElement("div");
    divLine.id = "divLine1" + intPage;
    divLine.className = "clhLineHeader1";
    divDummy.appendChild(divLine);

    //create detail elements
    //   for (intNum = 0; intNum !== aryData.length; intNum++) {
    //create unique ID from page number and ROW
    txtCompanyName = document.createElement("div");
    txtCompanyName.id = "txtDetails" + intPage;
    txtCompanyName.className = "clhTextDetail1";
    txtCompanyName.innerText = aryData.JOB_Details;

    divDummy.appendChild(txtCompanyName);
    intNum1 = intNumDetailsRows * intCharsPerLine;
    intNum1 = intNum1 - txtCompanyName.innerText.length;
    intNum1 = intNum1 / intCharsPerLine;

    if (intNum1 > 0) {
      intNum1 = Number(intNum1.toFixed(0)) * 2;
      // if (intNum !== intNumDetailsRows) {
      //pad gap!
      for (intNum2 = 0; intNum2 !== intNum1; intNum2++) {
        txtCompanyName = document.createElement("div");
        txtCompanyName.id = "txtDetails" + intPage + "_" + intNum2;
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

    let lblJobTitle;
    let txtJobTitle;
    let lblDateApplied;
    let txtDateApplied;
    let lblDateExpires;
    let txtDateExpires;
    let lblStatus;
    let txtStatus;
    let lblCompanyName;
    let txtCompanyName;
    let lblContact;
    let txtContact;
    let lblDirect;
    let txtDirect;
    let lblSalary;
    let txtSalary;
    let lblTownCity;
    let txtTownCity;
    let lblSector;
    let txtSector;
    let lblType;
    let txtType;
    let lblHours;
    let txtHours;
    let lblWhere;
    let txtWhere;

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
    txtTitle.innerText = "Jobs Applied For Listing Report";
    divHeader.appendChild(txtTitle);

    //create sub elements
    lblJobTitle = document.createElement("div");
    lblJobTitle.id = "lblJobTitle" + intPage;
    lblJobTitle.className = "clhLabelHeader1";
    lblJobTitle.innerText = "Job Title:";
    divHeader.appendChild(lblJobTitle);

    txtJobTitle = document.createElement("div");
    txtJobTitle.id = "txtJobTitle" + intPage;
    txtJobTitle.innerText = aryData.JOB_Title;
    txtJobTitle.className = "clhTextHeader1";
    divHeader.appendChild(txtJobTitle);

    lblDateApplied = document.createElement("div");
    lblDateApplied.id = "lblDateApplied" + intPage;
    lblDateApplied.className = "clhLabelHeader2";
    lblDateApplied.innerText = "Date Applied:";
    divHeader.appendChild(lblDateApplied);

    txtDateApplied = document.createElement("div");
    txtDateApplied.id = "txtDateApplied" + intPage;
    txtDateApplied.innerText = aryData.JOB_DateApplied;
    txtDateApplied.className = "clhTextHeader2";
    divHeader.appendChild(txtDateApplied);

    lblDateExpires = document.createElement("div");
    lblDateExpires.id = "lblDateExpires" + intPage;
    lblDateExpires.className = "clhLabelHeader3";
    lblDateExpires.innerText = "Date Expires:";
    divHeader.appendChild(lblDateExpires);

    txtDateExpires = document.createElement("div");
    txtDateExpires.id = "txtDateExpires" + intPage;
    txtDateExpires.innerText = aryData.JOB_DateExpires;
    txtDateExpires.className = "clhTextHeader3";
    divHeader.appendChild(txtDateExpires);

    lblStatus = document.createElement("div");
    lblStatus.id = "lblStatus" + intPage;
    lblStatus.innerText = "Status:";
    lblStatus.className = "clhLabelHeader4";
    divHeader.appendChild(lblStatus);

    txtStatus = document.createElement("div");
    txtStatus.id = "txtStatus" + intPage;
    txtStatus.className = "clhTextHeader4";
    txtStatus.innerText = aryData.JOB_Status;
    divHeader.appendChild(txtStatus);

    lblCompanyName = document.createElement("div");
    lblCompanyName.id = "lblCompany" + intPage;
    lblCompanyName.innerText = "Company Name:";
    lblCompanyName.className = "clhLabelHeader5";
    divHeader.appendChild(lblCompanyName);

    txtCompanyName = document.createElement("div");
    txtCompanyName.id = "txtCompany" + intPage;
    txtCompanyName.className = "clhTextHeader5";
    txtCompanyName.innerText = aryData.JOB_Company;
    divHeader.appendChild(txtCompanyName);

    lblContact = document.createElement("div");
    lblContact.id = "lblContact" + intPage;
    lblContact.innerText = "Contact Name:";
    lblContact.className = "clhLabelHeader6";
    divHeader.appendChild(lblContact);

    txtContact = document.createElement("div");
    txtContact.id = "txtContact" + intPage;
    txtContact.className = "clhTextHeader6";
    txtContact.innerText = aryData.JOB_ContactName;
    divHeader.appendChild(txtContact);

    lblDirect = document.createElement("div");
    lblDirect.id = "lblDirect" + intPage;
    lblDirect.className = "clhLabelHeader7";
    lblDirect.innerText = "Direct Contact?:";
    divHeader.appendChild(lblDirect);

    txtDirect = document.createElement("div");
    txtDirect.id = "txtDirect" + intPage;

    if (aryData.JOB_Direct) {
      txtDirect.innerText = "Yes";
    } else {
      txtDirect.innerText = "No";
    }
    txtDirect.className = "clhTextHeader7";
    divHeader.appendChild(txtDirect);

    lblSalary = document.createElement("div");
    lblSalary.id = "lblSalary" + intPage;
    lblSalary.className = "clhLabelHeader8";
    lblSalary.innerText = "Salary:";
    divHeader.appendChild(lblSalary);

    txtSalary = document.createElement("div");
    txtSalary.id = "txtSalary" + intPage;
    txtSalary.innerText = aryData.JOB_Salary;
    txtSalary.className = "clhTextHeader8";
    divHeader.appendChild(txtSalary);

    lblSector = document.createElement("div");
    lblSector.id = "lblSector" + intPage;
    lblSector.className = "clhLabelHeader9";
    lblSector.innerText = "Sector:";
    divHeader.appendChild(lblSector);

    txtSector = document.createElement("div");
    txtSector.id = "txtSector" + intPage;
    txtSector.innerText = aryData.JOB_Sector;
    txtSector.className = "clhTextHeader9";
    divHeader.appendChild(txtSector);

    lblTownCity = document.createElement("div");
    lblTownCity.id = "lblTownCity" + intPage;
    lblTownCity.className = "clhLabelHeader10";
    lblTownCity.innerText = "Town/City:";
    divHeader.appendChild(lblTownCity);

    txtTownCity = document.createElement("div");
    txtTownCity.id = "txtTownCity" + intPage;
    txtTownCity.innerText = aryData.JOB_TownCity;
    txtTownCity.className = "clhTextHeader10";
    divHeader.appendChild(txtTownCity);

    lblType = document.createElement("div");
    lblType.id = "lblType" + intPage;
    lblType.className = "clhLabelHeader11";
    lblType.innerText = "Type:";
    divHeader.appendChild(lblType);

    txtType = document.createElement("div");
    txtType.id = "txtType" + intPage;
    txtType.innerText = aryData.JOB_Type;
    txtType.className = "clhTextHeader11";
    divHeader.appendChild(txtType);

    lblHours = document.createElement("div");
    lblHours.id = "lblHours" + intPage;
    lblHours.className = "clhLabelHeader12";
    lblHours.innerText = "Hours:";
    divHeader.appendChild(lblHours);

    txtHours = document.createElement("div");
    txtHours.id = "txtHours" + intPage;
    txtHours.innerText = aryData.JOB_Hours;
    txtHours.className = "clhTextHeader12";
    divHeader.appendChild(txtHours);

    lblWhere = document.createElement("div");
    lblWhere.id = "lblWhere" + intPage;
    lblWhere.className = "clhLabelHeader13";
    lblWhere.innerText = "Where:";
    divHeader.appendChild(lblWhere);

    txtWhere = document.createElement("div");
    txtWhere.id = "txtWhere" + intPage;
    txtWhere.innerText = aryData.JOB_Where;
    txtWhere.className = "clhTextHeader13";
    divHeader.appendChild(txtWhere);
  }

  //get table schemas
  //Note: can't use these directly due to JS "unique" approach to obj1 = obj2
  objHeader = new Object(modSchema.funcGetSchema(modSchema.constSeekers_Jobs));
  //read through table find header matches and add to aryHeader
  trnTemp = dbJobSeekerCRM.transaction(modSchema.constSeekers_Jobs, "readonly");
  objTemp = trnTemp.objectStore(modSchema.constSeekers_Jobs);
  qryTemp = objTemp.openCursor();

  qryTemp.onsuccess = (event) => {
    curTempHeader = event.target.result;
    blnFiltered = false;

    if (curTempHeader) {
      //see if record matches any form criteria
      if (chkAllJobTitle.checked === false) {
        if (curTempHeader.value.JOB_Title === divJobTitle.innerText) {
          blnFiltered = true;
        }
      }
      if (chkAllDateApplied.checked === false) {
        if (
          cmbDateAppliedTo.value !== "none" &&
          cmbDateAppliedTo.value !== "none"
        ) {
          if (curTempHeader.value.JOB_DateApplied >= cmbDateAppliedFrom.value) {
            if (curTempHeader.value.JOB_DateApplied <= cmbDateAppliedTo.value) {
              blnFiltered = true;
            }
          }
        }
      }
      if (chkAllDateExpires.checked === false) {
        if (
          cmbDateExpiresTo.value !== "none" &&
          cmbDateExpiresTo.value !== "none"
        ) {
          if (curTempHeader.value.JOB_DateExpires >= cmbDateExpiresFrom.value) {
            if (curTempHeader.value.JOB_DateExpires <= cmbDateExpiresTo.value) {
              blnFiltered = true;
            }
          }
        }
      }
      if (chkAllStatus.checked === false) {
        if (curTempHeader.value.JOB_Status === divJobStatus.innerText) {
          blnFiltered = true;
        }
      }
      if (chkAllSector.checked === false) {
        if (curTempHeader.value.JOB_Sector === divSector.innerText) {
          blnFiltered = true;
        }
      }
      //if matches found add or if user printing ALL records
      if (
        blnFiltered ||
        (chkAllDateApplied.checked &&
          chkAllDateExpires.checked &&
          chkAllJobTitle.checked &&
          chkAllJobID.checked &&
          chkAllSector.checked &&
          chkAllStatus.checked)
      ) {
        //date match found store in array
        objHeaderTemp = new Object(objHeader);
        objHeaderTemp = JSON.parse(JSON.stringify(objHeader));
        objHeaderTemp.JOB_Title = curTempHeader.value.JOB_Title;
        objHeaderTemp.JOB_DateApplied = curTempHeader.value.JOB_DateApplied;
        objHeaderTemp.JOB_Details = curTempHeader.value.JOB_Details;
        objHeaderTemp.JOB_DateExpires = curTempHeader.value.JOB_DateExpires;
        objHeaderTemp.JOB_Status = curTempHeader.value.JOB_Status;
        objHeaderTemp.JOB_Company = curTempHeader.value.JOB_Company;
        objHeaderTemp.JOB_ContactName = curTempHeader.value.JOB_ContactName;
        objHeaderTemp.JOB_Direct = curTempHeader.value.JOB_Direct;
        objHeaderTemp.JOB_Salary = curTempHeader.value.JOB_Salary;
        objHeaderTemp.JOB_TownCity = curTempHeader.value.JOB_TownCity;
        objHeaderTemp.JOB_Sector = curTempHeader.value.JOB_Sector;
        objHeaderTemp.JOB_Type = curTempHeader.value.JOB_Type;
        objHeaderTemp.JOB_Hours = curTempHeader.value.JOB_Hours;
        objHeaderTemp.JOB_Where = curTempHeader.value.JOB_Where;
        //add to arracy
        aryHeader.push(objHeaderTemp);
      }
      curTempHeader.continue();
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

      // for (intNum1 = 0; intNum1 != aryHeader.length; intNum1++) {
      //   //find lines
      //   intNum2 = 0;

      //   for (intNum2 = 0; intNum2 != aryLines.length; intNum2++) {
      //     const arySearchLines = aryLines[intNum2].aryFields.filter(
      //       (objData) => {
      //         if (
      //           objData.fieldName === "JOB_MailshotName" &&
      //           objData.fieldValue ===
      //             aryHeader[intNum1].aryFields[1].fieldValue
      //         ) {
      //           return objData;
      //         }
      //       }
      //     );

      //     //process returned records count
      //     if (arySearchLines.length > intNumDetailsRows) {
      //       intNum3 = arySearchLines.length - intNumDetailsRows;
      //       intPages = intPages + Number(intNum3.toFixed(0));
      //     }
      //     if (arySearchLines.length != 0) {
      //       intPages++;
      //     }
      //   }
      // }
      /*
                 print each line

                 if aryresults.length > numdetailrows:
                     - print first page (numdetailrows)
                     - increment intnum1 to intnum1 + numdetailrows
                     - print header
                     - print detail
                     - loop until aryresults.length < numdetailrows
                     - print header
                     - print remaining detail
                     - increment intnum1 to intnum1 + aryresults.length
                 else
                     - print page
                     - increment intnum1 to intnum1 + aryresults.length    
              */

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
      winTemp = window.open("jobs_applied_for_listing_report_output.html");
      //      winTemp.document.getElementsByTagName("title").innerText = "Mailshot Listing";
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
          funcCreateHeader(aryHeader[intNum1]);
          funcCreateDetail(aryHeader[intNum1]);
          intPage++;
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

const funcchkAllJobTitleChanged = (event) => {
  //
  if (chkAllJobTitle.checked) {
    divJobTitle.innerText = "";
  }
};
const funcchkAllDateAppliedChanged = (event) => {
  //
  if (chkAllDateApplied.checked) {
    divDateAppliedFrom.innerText = "";
    divDateAppliedTo.innerText = "";
  }
};

const funcchkAllDateExpiresChanged = (event) => {
  //
  if (chkAllDateExpires.checked) {
    divDateExpiresFrom.innerText = "";
    divDateExpiresTo.innerText = "";
  }
};
const funcchkAllStatusChanged = (event) => {
  //
  if (chkAllStatus.checked) {
    divStatus.innerText = "";
  }
};
const funcchkAllSectorChanged = (event) => {
  //
  if (chkAllSector.checked) {
    divSector.innerText = "";
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
  //comboboxes
  cmbJobTitle.addEventListener("change", funccmbJobTitleSelect);
  cmbDateAppliedFrom.addEventListener("change", funccmbDateAppliedFromSelect);
  cmbDateAppliedTo.addEventListener("change", funccmbDateAppliedToSelect);
  cmbDateExpiresFrom.addEventListener("change", funccmbDateExpiresFromSelect);
  cmbDateExpiresTo.addEventListener("change", funccmbDateExpiresToSelect);
  cmbSector.addEventListener("change", funccmbSectorSelect);
  cmbStatus.addEventListener("change", funccmbStatusSelect);

  //checkboxes
  chkAllJobTitle.addEventListener("change", funcchkAllJobTitleChanged);
  chkAllDateApplied.addEventListener("change", funcchkAllDateAppliedChanged);
  chkAllDateExpires.addEventListener("change", funcchkAllDateExpiresChanged);
  chkAllStatus.addEventListener("change", funcchkAllStatusChanged);
  chkAllSector.addEventListener("change", funcchkAllSectorChanged);
}
