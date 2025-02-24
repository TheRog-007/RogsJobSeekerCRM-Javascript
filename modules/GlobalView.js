"use strict";

//table names - used for RogTable
export const constTableCONTACT = "Contact";
export const constTableCURRENTFOCUS = "CurrentFocus";
export const constTableEDUCATION = "Education";
export const constTableEXPERIENCE = "Experience";
export const constTableHIGHLIGHTS = "Highlights";
export const constTableINTERESTS = "Interests";
export const constTableOTHER = "Other";
export const constTablePERSONALINFO = "Personalinfo";
export const constTablePERSONALITY = "Personality";
export const constTableRESPONSIBILITIES = "Reposnsibilities";
export const constTableSKILLS = "Skills";

export const funcDisableForm = (docTemp) => {
  /**
       Created 07/02/2025 By Roger Williams
       
       apart from cmbID and btnNew disables all controls
       in passed form        
     
     */

  let aryTemp = [];
  let intNum = 0;

  aryTemp = docTemp.getElementsByTagName("input");

  for (intNum = 0; intNum < aryTemp.length; intNum++) {
    if (aryTemp[intNum].id !== "txtHidden") {
      aryTemp[intNum].disabled = true;
    }
  }

  aryTemp = docTemp.getElementsByTagName("textarea");

  for (intNum = 0; intNum < aryTemp.length; intNum++) {
    aryTemp[intNum].disabled = true;
  }

  aryTemp = docTemp.getElementsByTagName("select");

  for (intNum = 0; intNum < aryTemp.length; intNum++) {
    if (aryTemp[intNum].id !== "cmbID") {
      aryTemp[intNum].disabled = true;
    }
  }

  aryTemp = docTemp.getElementsByTagName("button");

  for (intNum = 0; intNum < aryTemp.length; intNum++) {
    if (
      aryTemp[intNum].id !== "btnNew" &&
      aryTemp[intNum].id !== "btnNew2" &&
      aryTemp[intNum].id.indexOf("btnMsgBox") === -1
    ) {
      aryTemp[intNum].disabled = true;
    }
  }
};

export const funcEnableForm = (docTemp) => {
  /**
         Created 07/02/2025 By Roger Williams
         
         apart from cmbID and btnNew enables all controls
         in passed form        
       
       */

  let aryTemp = [];
  let intNum = 0;

  aryTemp = docTemp.getElementsByTagName("input");

  for (intNum = 0; intNum < aryTemp.length; intNum++) {
    if (aryTemp[intNum].id !== "txtHidden") {
      aryTemp[intNum].disabled = false;
    }
  }

  aryTemp = docTemp.getElementsByTagName("textarea");

  for (intNum = 0; intNum < aryTemp.length; intNum++) {
    aryTemp[intNum].disabled = false;
  }

  aryTemp = docTemp.getElementsByTagName("select");

  for (intNum = 0; intNum < aryTemp.length; intNum++) {
    if (aryTemp[intNum].id !== "cmbID") {
      aryTemp[intNum].disabled = false;
    }
  }

  aryTemp = docTemp.getElementsByTagName("button");

  for (intNum = 0; intNum < aryTemp.length; intNum++) {
    if (
      aryTemp[intNum].id !== "btnNew" &&
      aryTemp[intNum].id !== "btnNew2" &&
      aryTemp[intNum].id.indexOf("btnMsgBox") === -1
    ) {
      aryTemp[intNum].disabled = false;
    }
  }
};
