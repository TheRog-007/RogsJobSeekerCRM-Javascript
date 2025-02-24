"use strict";

import * as modModel from "./model.js";
import * as modSchema from "../schema.js";
import * as modMessageBox from "../messageBox.js";
import * as modGlobalView from "../GlobalView.js";

//table vars
let intContactDivNumber = 1;
let intCurrentFocusDivNumber = 1;
let intEducationDivNumber = 1;
let intExperienceDivNumber = 1;
let intHighlightsDivNumber = 1;
let intInterestsDivNumber = 1;
let intOtherDivNumber = 1;
let intPersonalInfoDivNumber = 1;
let intPersonalityDivNumber = 1;
let intResponsibilitiesDivNumber = 1;
let intSkillsDivNumber = 1;

let intContactDivNumberCopy = 1;
let intCurrentFocusDivNumberCopy = 1;
let intEducationDivNumberCopy = 1;
let intExperienceDivNumberCopy = 1;
let intHighlightsDivNumberCopy = 1;
let intInterestsDivNumberCopy = 1;
let intOtherDivNumberCopy = 1;
let intPersonalInfoDivNumberCopy = 1;
let intPersonalityDivNumberCopy = 1;
let intResponsibilitiesDivNumberCopy = 1;
let intSkillsDivNumberCopy = 1;

///inc duing row add to space rows
export let intNewRowTopCV_Contact = 0;
export let intNewRowTopCV_ContactCopy = 0;
export let intNewRowTopCV_CurrentFocus = 0;
export let intNewRowTopCV_CurrentFocusCopy = 0;
export let intNewRowTopCV_Education = 0;
export let intNewRowTopCV_EducationCopy = 0;
export let intNewRowTopCV_Experience = 0;
export let intNewRowTopCV_ExperienceCopy = 0;
export let intNewRowTopCV_Highlights = 0;
export let intNewRowTopCV_HighlightsCopy = 0;
export let intNewRowTopCV_Interests = 0;
export let intNewRowTopCV_InterestsCopy = 0;
export let intNewRowTopCV_Other = 0;
export let intNewRowTopCV_OtherCopy = 0;
export let intNewRowTopCV_PersonalInfo = 0;
export let intNewRowTopCV_PersonalInfoCopy = 0;
export let intNewRowTopCV_Personality = 0;
export let intNewRowTopCV_PersonalityCopy = 0;
export let intNewRowTopCV_Responsibilities = 0;
export let intNewRowTopCV_ResponsibilitiesCopy = 0;
export let intNewRowTopCV_Skills = 0;
export let intNewRowTopCV_SkillsCopy = 0;

export const intRowHeight = 30;
/*
  Created 08/01/2025 By Roger Williams

  Visual handling

 
*/
export function funcChangeNumberOfRows(intValue = 0) {
  /*
  Created 27/01/2025 By Roger Williams

  used by modModel to change this exported variables value
  used when deleting an address record

  */
  intRows = intValue;
}
export function funcChangeNewRowPos(intValue = 0) {
  /*
  Created 27/01/2025 By Roger Williams

  used by modModel to change this exported variables value
  used when deleting an address record

  */
  intNewRowTop = intValue;
}
export function funcInitTable(strTable = "") {
  /*
     Created 24/01/2025 By Roger Williams

     clears table
     
     uses to clear the user edited "CV" tables
     the tables without "CV" in the name are static data
     from the database, so do not need to be cleared!

  */
  let elTemp;
  let intNum = 0;
  let aryTemp = [];

  if (strTable === modSchema.constCV_Contact) {
    aryTemp = modModel.divCVContactDetails.getElementsByClassName(
      "clh" + strTable + "RowContainer"
    );

    while (intNum !== aryTemp.length) {
      elTemp = aryTemp[intNum];
      modModel.divCVContactDetails.removeChild(elTemp);
      intNum = 0;
    }
  }

  if (strTable === modSchema.constCV_CurrentFocus) {
    aryTemp = modModel.divCVCurrentFocus.getElementsByClassName("clh" + strTable + "RowContainer");

    while (intNum !== aryTemp.length) {
      elTemp = aryTemp[intNum];
      modModel.divCVCurrentFocus.removeChild(elTemp);
      intNum = 0;
    }
  }
  if (strTable === modSchema.constCV_Education) {
    aryTemp = modModel.divCVCurrentFocus.getElementsByClassName("clh" + strTable + "RowContainer");

    while (intNum !== aryTemp.length) {
      elTemp = aryTemp[intNum];
      modModel.divCVCurrentFocus.removeChild(elTemp);
      intNum = 0;
    }
  }

  if (strTable === modSchema.constCV_Experience) {
    aryTemp = modModel.divCVCurrentFocus.getElementsByClassName("clh" + strTable + "RowContainer");

    while (intNum !== aryTemp.length) {
      elTemp = aryTemp[intNum];
      modModel.divCVCurrentFocus.removeChild(elTemp);
      intNum = 0;
    }
  }

  if (strTable === modSchema.constCV_Highlights) {
    aryTemp = modModel.divCVCurrentFocus.getElementsByClassName("clh" + strTable + "RowContainer");

    while (intNum !== aryTemp.length) {
      elTemp = aryTemp[intNum];
      modModel.divCVCurrentFocus.removeChild(elTemp);
      intNum = 0;
    }
  }

  if (strTable === modSchema.constCV_Interests) {
    aryTemp = modModel.divCVCurrentFocus.getElementsByClassName("clh" + strTable + "RowContainer");

    while (intNum !== aryTemp.length) {
      elTemp = aryTemp[intNum];
      modModel.divCVCurrentFocus.removeChild(elTemp);
      intNum = 0;
    }
  }

  if (strTable === modSchema.constCV_Other) {
    aryTemp = modModel.divCVCurrentFocus.getElementsByClassName("clh" + strTable + "RowContainer");

    while (intNum !== aryTemp.length) {
      elTemp = aryTemp[intNum];
      modModel.divCVCurrentFocus.removeChild(elTemp);
      intNum = 0;
    }
  }

  if (strTable === modSchema.constCV_PersonalInfo) {
    aryTemp = modModel.divCVCurrentFocus.getElementsByClassName("clh" + strTable + "RowContainer");

    while (intNum !== aryTemp.length) {
      elTemp = aryTemp[intNum];
      modModel.divCVCurrentFocus.removeChild(elTemp);
      intNum = 0;
    }
  }

  if (strTable === modSchema.constCV_Personality) {
    aryTemp = modModel.divCVCurrentFocus.getElementsByClassName("clh" + strTable + "RowContainer");

    while (intNum !== aryTemp.length) {
      elTemp = aryTemp[intNum];
      modModel.divCVCurrentFocus.removeChild(elTemp);
      intNum = 0;
    }
  }

  if (strTable === modSchema.constCV_Responsibilites) {
    aryTemp = modModel.divCVCurrentFocus.getElementsByClassName("clh" + strTable + "RowContainer");

    while (intNum !== aryTemp.length) {
      elTemp = aryTemp[intNum];
      modModel.divCVCurrentFocus.removeChild(elTemp);
      intNum = 0;
    }
  }

  if (strTable === modSchema.constCV_Skills) {
    aryTemp = modModel.divCVCurrentFocus.getElementsByClassName("clh" + strTable + "RowContainer");

    while (intNum !== aryTemp.length) {
      elTemp = aryTemp[intNum];
      modModel.divCVCurrentFocus.removeChild(elTemp);
      intNum = 0;
    }
  }
}
export const funcCreateCV = () => {
  /*
    Created 21/02/2025 By Roger Williams

    Creates new winodw using CustomCVTemalpte_Blank.html

    Looks for entires in the CV tables and puts them into the CV page
  */
  let elHeader;
  let elAddress;
  let elWhere;
  let elDataRow;
  let elTemp1;
  let elTemp2;
  let winTemp;
  let intNum1 = 0;
  let aryDivs = [];
  let intNum2 = 0;
  let arySubDivs = [];
  let dteTemp;
  let strTemp = "";

  winTemp = window.open("../../CustomCV/CustomCVTemplate_Blank.html");

  // winTemp.setTimeout(winTemp.close, 0);

  // elTemp = aryTemp[intNum];
  // winTemp.document.getElementById("divCompany").innerText =
  //   elTemp.childNodes[2].innerText;

  // winTemp.addEventListener("afterprint", (event) => {
  //   intNum++;

  //   if (intNum === aryTemp.length) {
  //     winTemp.setTimeout(winTemp.close, 0);
  //   } else {
  //     elTemp2.innerText = `Print Envelope ${intNum + 1} of ${aryTemp.length}`;
  //   }
  // });

  /*
   divContactWEB 
   divCurrentFocusWEB 
   divEducationWEB 
   divExperienceWEB 
   divHighlightsWEB 
   divInterestsWEB 
   divOtherWEB 
   divPersonalInfoWEB 
   divPersonalityWEB 
   divResponsibilitiesWEB 
   divSkillsWEB 
  
   imgImageWEB
   divPreferredRoleTitle

   CV order:

   name
   preferred job title / image

   address (if chosen to include else just town / postcode)  phone / email

   dob / salary range

   education 
   experience
   responsibilities
   highlights
   skills
   currentfocus
   other
   interests
   personality
  
    */
  winTemp.onload = () => {
    //get users name/preffered job ttile and image
    aryDivs = divTableCVPersonalInfo.getElementsByClassName(
      "clhCopy" + modSchema.constCV_PersonalInfo + "DataRowContainer"
    );

    //write to divheader name/preferred job title and photo
    elHeader = aryDivs[0];

    //change on page
    winTemp.document.getElementById("divName").innerText = elHeader.childNodes[2].innerText;
    winTemp.document
      .getElementById("imgImageWEB")
      .setAttribute("src", elHeader.childNodes[6].innerText);
    winTemp.document.getElementById("divPreferredRoleTitle").innerText = txtJobTitle.value;

    //get address details
    /*
      <div id="divCVContactWEB">    
              <div id="divAddress1"></div>
              <div id="divAddress2"></div>
              <div id="divAddress3"></div>
              <div id="divTownCity"></div>
              <div id="divPostcode"></div>
              <div id="divLandlinePhone">
              <div id="divCellPhone"></div>
              <div id="divEmail"></div>
*/
    aryDivs = modModel.divTableCVContact.getElementsByClassName(
      "clhCopy" + modSchema.constCV_Contact + "DataRowContainer"
    );

    //write to divheader name/preferred job title and photo
    elAddress = aryDivs[0];

    if (modModel.chkPrintAddress.checked === true) {
      //create grid for the address/phone data
      winTemp.document.getElementById("divCVContactWEB").style.gridTemplateColumns = "530px 200px";

      if (elAddress.childNodes[4].innerText.length !== 0) {
        winTemp.document.getElementById("divCVContactWEB").style.gridTemplateRows =
          "repeat(5, 30px)";
      } else {
        winTemp.document.getElementById("divCVContactWEB").style.gridTemplateRows =
          "repeat(4, 30px)";
      }

      winTemp.document.getElementById("divAddress1").innerText = elAddress.childNodes[2].innerText;
      winTemp.document.getElementById("divAddress1").style.gridColumn = "1";
      winTemp.document.getElementById("divAddress1").style.gridRow = "1";

      winTemp.document.getElementById("divAddress2").innerText = elAddress.childNodes[3].innerText;
      winTemp.document.getElementById("divAddress2").style.gridColumn = "1";
      winTemp.document.getElementById("divAddress2").style.gridRow = "2";

      //handle if  address 3
      if (elAddress.childNodes[4].innerText.length !== 0) {
        winTemp.document.getElementById("divAddress3").innerText =
          elAddress.childNodes[4].innerText;
        winTemp.document.getElementById("divAddress3").style.gridColumn = "1";
        winTemp.document.getElementById("divAddress3").style.gridRow = "3";

        winTemp.document.getElementById("divTownCity").innerText =
          elAddress.childNodes[5].innerText;
        winTemp.document.getElementById("divTownCity").style.gridColumn = "1";
        winTemp.document.getElementById("divTownCity").style.gridRow = "4";

        winTemp.document.getElementById("divPostcode").innerText =
          elAddress.childNodes[6].innerText;
        winTemp.document.getElementById("divPostcode").style.gridColumn = "1";
        winTemp.document.getElementById("divPostcode").style.gridRow = "5";
        winTemp.document.getElementById("divAddresContainer").style.height = "106px";
        winTemp.document.getElementById("divPhoneContainer").style.height = "106px";
      } else {
        //no address 3
        winTemp.document.getElementById("divTownCity").innerText =
          elAddress.childNodes[5].innerText;
        winTemp.document.getElementById("divTownCity").style.gridColumn = "1";
        winTemp.document.getElementById("divTownCity").style.gridRow = "3";

        winTemp.document.getElementById("divPostcode").innerText =
          elAddress.childNodes[6].innerText;
        winTemp.document.getElementById("divPostcode").style.gridColumn = "1";
        winTemp.document.getElementById("divPostcode").style.gridRow = "4";
        winTemp.document.getElementById("divAddresContainer").style.height = "86px";
        winTemp.document.getElementById("divPhoneContainer").style.height = "86px";
      }
    } else {
      //create grid for the address/phone data
      winTemp.document.getElementById("divCVContactWEB").style.gridTemplateColumns = "530px 200px";
      winTemp.document.getElementById("divCVContactWEB").style.gridTemplateRows = "repeat(3, 30px)";

      winTemp.document.getElementById("divTownCity").innerText = elAddress.childNodes[5].innerText;
      winTemp.document.getElementById("divTownCity").style.gridColumn = "1";
      winTemp.document.getElementById("divTownCity").style.gridRow = "1";

      winTemp.document.getElementById("divPostcode").innerText = elAddress.childNodes[6].innerText;
      winTemp.document.getElementById("divPostcode").style.gridColumn = "1";
      winTemp.document.getElementById("divPostcode").style.gridColumn = "2";
    }

    //phone details
    winTemp.document.getElementById("divLandlinePhone").style.gridColumn = "2";
    winTemp.document.getElementById("divLandlinePhone").style.gridRow1 = "1";
    winTemp.document.getElementById("divLandlinePhone").innerText =
      elAddress.childNodes[7].innerText;

    winTemp.document.getElementById("divCellPhone").style.gridColumn = "2";
    winTemp.document.getElementById("divCellPhone").style.gridRow1 = "2";
    winTemp.document.getElementById("divCellPhone").innerText = elAddress.childNodes[8].innerText;

    winTemp.document.getElementById("divEmail").style.gridColumn = "2";
    winTemp.document.getElementById("divEmail").style.gridRow1 = "3";
    winTemp.document.getElementById("divEmail").innerText = elAddress.childNodes[9].innerText;
    winTemp.document.getElementById("divAddresContainer").style.height = "66px";
    winTemp.document.getElementById("divPhoneContainer").style.height = "66px";

    //dob/salary range
    dteTemp = new Date(elHeader.childNodes[4].innerText);
    winTemp.document.getElementById("divDOB").innerText =
      "Date Of Birth: " + dteTemp.toLocaleString("EN-GB");
    winTemp.document.getElementById("divSalaryRange").innerText =
      "Salary Range: " + elHeader.childNodes[5].innerText;

    //education - onwards

    /*
          being one - many:
          
            create "where" div store innertext in strtemp if strtemp = ""
            else use current "where" div
  
            create row div in "where" div as flex direction row
            create sub divs for the row data
        */

    aryDivs = modModel.divTableCVEducation.getElementsByClassName(
      "clhCopy" + modSchema.constCV_Education + "DataRowContainer"
    );

    for (intNum1 = 0; intNum1 != aryDivs.length; intNum1++) {
      elTemp2 = aryDivs[intNum1];

      //if first where
      if (!elWhere) {
        elWhere = winTemp.document.createElement("div");
        elWhere.id = "divWhereEducation" + intNum1;
        elWhere.className = "clhWhere";
        elWhere.innerText = elTemp2.childNodes[2].innerText + ":";
        //set a current "header" record
        strTemp = elTemp2.childNodes[2].innerText;
        //add to education container div
        winTemp.document.getElementById("divCVEducationWEB").appendChild(elWhere);
      }
      if (strTemp !== elTemp2.childNodes[2].innerText) {
        elWhere = winTemp.document.createElement("div");
        elWhere.id = "divWhereEducation" + intNum1;
        elWhere.className = "clhWhere";
        elWhere.innerText = elTemp2.childNodes[2].innerText + ":";
        //set a current "header" record
        strTemp = elTemp2.childNodes[2].innerText;
        //add to education container div
        winTemp.document.getElementById("divCVEducationWEB").appendChild(elWhere);
      }

      //create data row container
      elTemp1 = winTemp.document.createElement("div");
      elTemp1.id = "divRow" + intNum1 + "DataCol1";
      elTemp1.className = "clhEducationRow";
      elWhere.appendChild(elTemp1);
      //add indent div
      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divEducationIndent" + intNum1;
      elDataRow.className = "clhEducationIndent";
      elTemp1.appendChild(elDataRow);

      //add row data
      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divEducationStart" + intNum1;
      elDataRow.innerText = elTemp2.childNodes[3].innerText;
      elTemp1.appendChild(elDataRow);

      //add "to" div
      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divEducationTo" + intNum1;
      elDataRow.className = "clhEducationTo";
      elDataRow.innerText = "To";
      elTemp1.appendChild(elDataRow);

      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divEducationEnd" + intNum1;
      elDataRow.innerText = elTemp2.childNodes[4].innerText;
      elTemp1.appendChild(elDataRow);

      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divEducationWhat" + intNum1;
      elDataRow.innerText = elTemp2.childNodes[5].innerText;
      elTemp1.appendChild(elDataRow);

      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divEducationGrade" + intNum1;
      elDataRow.innerText = elTemp2.childNodes[6].innerText;
      elTemp1.appendChild(elDataRow);
    }

    //experience
    aryDivs = modModel.divTableCVExperience.getElementsByClassName(
      "clhCopy" + modSchema.constCV_Experience + "DataRowContainer"
    );

    for (intNum1 = 0; intNum1 != aryDivs.length; intNum1++) {
      elTemp2 = aryDivs[intNum1];

      //if first where
      if (!elWhere) {
        elWhere = winTemp.document.createElement("div");
        elWhere.id = "divWhereExperience" + intNum1;
        elWhere.className = "clhWhere";
        elWhere.innerText = elTemp2.childNodes[2].innerText + ":";
        //set a current "header" record
        strTemp = elTemp2.childNodes[2].innerText;
        //add to Experience container div
        winTemp.document.getElementById("divCVExperienceWEB").appendChild(elWhere);
      }
      if (strTemp !== elTemp2.childNodes[2].innerText) {
        elWhere = winTemp.document.createElement("div");
        elWhere.id = "divWhereExperience" + intNum1;
        elWhere.className = "clhWhere";
        elWhere.innerText = elTemp2.childNodes[2].innerText + ":";
        //set a current "header" record
        strTemp = elTemp2.childNodes[2].innerText;
        //add to Experience container div
        winTemp.document.getElementById("divCVExperienceWEB").appendChild(elWhere);
      }

      //create data row container
      elTemp1 = winTemp.document.createElement("div");
      elTemp1.id = "divRow" + intNum1 + "DataCol1";
      elTemp1.className = "clhExperienceRow";
      elWhere.appendChild(elTemp1);
      //add indent div
      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divExperienceIndent" + intNum1;
      elDataRow.className = "clhExperienceIndent";
      elTemp1.appendChild(elDataRow);

      //add row data
      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divExperienceStart" + intNum1;
      elDataRow.innerText = elTemp2.childNodes[3].innerText;
      elTemp1.appendChild(elDataRow);

      //add "to" div
      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divExperienceTo" + intNum1;
      elDataRow.className = "clhExperienceTo";
      elDataRow.innerText = "To";
      elTemp1.appendChild(elDataRow);

      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divExperienceEnd" + intNum1;
      elDataRow.innerText = elTemp2.childNodes[4].innerText;
      elTemp1.appendChild(elDataRow);

      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divExperienceWhat + intNum1";
      elDataRow.innerText = elTemp2.childNodes[5].innerText;
      elTemp1.appendChild(elDataRow);

      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divExperienceRole" + intNum1;
      elDataRow.innerText = elTemp2.childNodes[6].innerText;
      elTemp1.appendChild(elDataRow);
    }

    //Responsibilites
    aryDivs = modModel.divTableCVResponsibilities.getElementsByClassName(
      "clhCopy" + modSchema.constCV_Responsibilities + "DataRowContainer"
    );

    if (aryDivs.length === 0) {
      winTemp.document.getElementById("divResponsibilitesHeader").hidden = true;
      winTemp.document.getElementById("divLine6").hidden = true;
    }

    for (intNum1 = 0; intNum1 != aryDivs.length; intNum1++) {
      elTemp2 = aryDivs[intNum1];

      //if first where
      if (!elWhere) {
        elWhere = winTemp.document.createElement("div");
        elWhere.id = "divWhereResponsibilites" + intNum1;
        elWhere.className = "clhWhere";
        elWhere.innerText = elTemp2.childNodes[2].innerText + ":";
        //set a current "header" record
        strTemp = elTemp2.childNodes[2].innerText;
        //add to Responsibilites container div
        winTemp.document.getElementById("divCVResponsibilitesWEB").appendChild(elWhere);
      }
      if (strTemp !== elTemp2.childNodes[2].innerText) {
        elWhere = winTemp.document.createElement("div");
        elWhere.id = "divWhereResponsibilites" + intNum1;
        elWhere.className = "clhWhere";
        elWhere.innerText = elTemp2.childNodes[2].innerText + ":";
        //set a current "header" record
        strTemp = elTemp2.childNodes[2].innerText;
        //add to Responsibilites container div
        winTemp.document.getElementById("divCVResponsibilitesWEB").appendChild(elWhere);
      }

      //create data row container
      elTemp1 = winTemp.document.createElement("div");
      elTemp1.id = "divRow" + intNum1 + "DataCol1";
      elTemp1.className = "clhResponsibilitesRow";
      elWhere.appendChild(elTemp1);
      //add indent div
      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divResponsibilitesIndent" + intNum1;
      elDataRow.className = "clhResponsibilitesIndent";
      elTemp1.appendChild(elDataRow);

      //add row data
      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divResponsibilitesRole" + intNum1;
      elDataRow.className = "clhResponsibilitesRole";
      elDataRow.innerText = elTemp2.childNodes[4].innerText;
      elTemp1.appendChild(elDataRow);

      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divResponsibilitesDetails" + intNum1;
      elDataRow.className = "clhResponsibilitesDetails";
      elDataRow.innerText = elTemp2.childNodes[3].innerText;
      elTemp1.appendChild(elDataRow);
    }

    //Highlights
    aryDivs = modModel.divTableCVHighlights.getElementsByClassName(
      "clhCopy" + modSchema.constCV_Highlights + "DataRowContainer"
    );

    if (aryDivs.length === 0) {
      winTemp.document.getElementById("divHighlightsHeader").hidden = true;
      winTemp.document.getElementById("divLine7").hidden = true;
    }

    for (intNum1 = 0; intNum1 != aryDivs.length; intNum1++) {
      elTemp2 = aryDivs[intNum1];

      //if first where
      if (!elWhere) {
        elWhere = winTemp.document.createElement("div");
        elWhere.id = "divWhereHighlights" + intNum1;
        elWhere.className = "clhWhere";
        elWhere.innerText = elTemp2.childNodes[2].innerText + ":";
        //set a current "header" record
        strTemp = elTemp2.childNodes[2].innerText;
        //add to Highlights container div
        winTemp.document.getElementById("divCVHighlightsWEB").appendChild(elWhere);
      }
      if (strTemp !== elTemp2.childNodes[2].innerText) {
        elWhere = winTemp.document.createElement("div");
        elWhere.id = "divWhereHighlights" + intNum1;
        elWhere.className = "clhWhere";
        elWhere.innerText = elTemp2.childNodes[2].innerText + ":";
        //set a current "header" record
        strTemp = elTemp2.childNodes[2].innerText;
        //add to Highlights container div
        winTemp.document.getElementById("divCVHighlightsWEB").appendChild(elWhere);
      }

      //create data row container
      elTemp1 = winTemp.document.createElement("div");
      elTemp1.id = "divRow" + intNum1 + "DataCol1";
      elTemp1.className = "clhHighlightsRow";
      elWhere.appendChild(elTemp1);
      //add indent div
      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divHighlightsIndent" + intNum1;
      elDataRow.className = "clhHighlightsIndent";
      elTemp1.appendChild(elDataRow);

      //add row data
      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divHighlightsStart" + intNum1;
      elDataRow.innerText = elTemp2.childNodes[3].innerText;
      elTemp1.appendChild(elDataRow);
    }

    //Skills
    aryDivs = modModel.divTableCVSkills.getElementsByClassName(
      "clhCopy" + modSchema.constCV_Skills + "DataRowContainer"
    );

    if (aryDivs.length === 0) {
      winTemp.document.getElementById("divSkillsHeader").hidden = true;
      winTemp.document.getElementById("divLine8").hidden = true;
    }

    for (intNum1 = 0; intNum1 != aryDivs.length; intNum1++) {
      elTemp2 = aryDivs[intNum1];

      //if first where
      if (!elWhere) {
        elWhere = winTemp.document.createElement("div");
        elWhere.id = "divWhereSkills" + intNum1;
        elWhere.className = "clhWhere";
        elWhere.innerText = elTemp2.childNodes[2].innerText + ":";
        //set a current "header" record
        strTemp = elTemp2.childNodes[2].innerText;
        //add to Skills container div
        winTemp.document.getElementById("divCVSkillsWEB").appendChild(elWhere);
      }
      if (strTemp !== elTemp2.childNodes[2].innerText) {
        elWhere = winTemp.document.createElement("div");
        elWhere.id = "divWhere" + intNum1;
        elWhere.className = "clhWhere";
        elWhere.innerText = elTemp2.childNodes[2].innerText + ":";
        //set a current "header" record
        strTemp = elTemp2.childNodes[2].innerText;
        //add to Skills container div
        winTemp.document.getElementById("divCVSkillsWEB").appendChild(elWhere);
      }

      //create data row container
      elTemp1 = winTemp.document.createElement("div");
      elTemp1.id = "divRow" + intNum1 + "DataCol1";
      elTemp1.className = "clhSkillsRow";
      elWhere.appendChild(elTemp1);
      //add indent div
      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divSkillsIndent" + intNum1;
      elDataRow.className = "clhSkillsIndent";
      elTemp1.appendChild(elDataRow);

      //add row data
      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divSkillsStart" + intNum1;
      elDataRow.innerText = elTemp2.childNodes[3].innerText;
      elTemp1.appendChild(elDataRow);
    }

    //Current Focus
    aryDivs = modModel.divTableCVCurrentFocus.getElementsByClassName(
      "clhCopy" + modSchema.constCV_CurrentFocus + "DataRowContainer"
    );

    if (aryDivs.length === 0) {
      winTemp.document.getElementById("divCurrentFocusHeader").hidden = true;
      winTemp.document.getElementById("divLine9").hidden = true;
    }

    for (intNum1 = 0; intNum1 != aryDivs.length; intNum1++) {
      elTemp2 = aryDivs[intNum1];

      //create data row container
      elTemp1 = winTemp.document.createElement("div");
      elTemp1.id = "divRow" + intNum1 + "DataCol1";
      elTemp1.className = "clhCurrentFocusRow";
      winTemp.document.getElementById("divCVCurrentFocusWEB").appendChild(elTemp1);
      //add indent div
      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divCurrentFocusIndent" + intNum1;
      elDataRow.className = "clhCurrentFocusIndent";
      elTemp1.appendChild(elDataRow);

      //add row data
      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divCurrentFocusStart" + intNum1;
      elDataRow.innerText = elTemp2.childNodes[2].innerText;
      elTemp1.appendChild(elDataRow);
    }

    //Other
    aryDivs = modModel.divTableCVOther.getElementsByClassName(
      "clhCopy" + modSchema.constCV_Other + "DataRowContainer"
    );

    if (aryDivs.length === 0) {
      winTemp.document.getElementById("divOtherHeader").hidden = true;
      winTemp.document.getElementById("divLine10").hidden = true;
    }

    for (intNum1 = 0; intNum1 != aryDivs.length; intNum1++) {
      elTemp2 = aryDivs[intNum1];

      //if first where
      if (!elWhere) {
        elWhere = winTemp.document.createElement("div");
        elWhere.id = "divWhereOther" + intNum1;
        elWhere.className = "clhWhere";
        elWhere.innerText = elTemp2.childNodes[2].innerText + ":";
        //set a current "header" record
        strTemp = elTemp2.childNodes[2].innerText;
        //add to Other container div
        winTemp.document.getElementById("divCVOtherWEB").appendChild(elWhere);
      }
      if (strTemp !== elTemp2.childNodes[2].innerText) {
        elWhere = winTemp.document.createElement("div");
        elWhere.id = "divWhere" + intNum1;
        elWhere.className = "clhWhere";
        elWhere.innerText = elTemp2.childNodes[2].innerText + ":";
        //set a current "header" record
        strTemp = elTemp2.childNodes[2].innerText;
        //add to Other container div
        winTemp.document.getElementById("divCVOtherWEB").appendChild(elWhere);
      }

      //create data row container
      elTemp1 = winTemp.document.createElement("div");
      elTemp1.id = "divRow" + intNum1 + "DataCol1";
      elTemp1.className = "clhOtherRow";
      elWhere.appendChild(elTemp1);
      //add indent div
      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divOtherIndent" + intNum1;
      elDataRow.className = "clhOtherIndent";
      elTemp1.appendChild(elDataRow);

      //add row data
      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divOtherName" + intNum1;
      elDataRow.innerText = elTemp2.childNodes[3].innerText;
      elTemp1.appendChild(elDataRow);

      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divOtherDetails" + intNum1;
      elDataRow.innerText = elTemp2.childNodes[4].innerText;
      elTemp1.appendChild(elDataRow);
    }

    //Interests
    aryDivs = modModel.divTableCVInterests.getElementsByClassName(
      "clhCopy" + modSchema.constCV_Interests + "DataRowContainer"
    );

    if (aryDivs.length === 0) {
      winTemp.document.getElementById("divInterestsHeader").hidden = true;
      winTemp.document.getElementById("divLine11").hidden = true;
    }

    for (intNum1 = 0; intNum1 != aryDivs.length; intNum1++) {
      elTemp2 = aryDivs[intNum1];

      //if first where
      if (!elWhere) {
        elWhere = winTemp.document.createElement("div");
        elWhere.id = "divWhereInterests" + intNum1;
        elWhere.className = "clhWhere";
        elWhere.innerText = elTemp2.childNodes[2].innerText + ":";
        //set a current "header" record
        strTemp = elTemp2.childNodes[2].innerText;
        //add to Interests container div
        winTemp.document.getElementById("divCVInterestsWEB").appendChild(elWhere);
      }
      if (strTemp !== elTemp2.childNodes[2].innerText) {
        elWhere = winTemp.document.createElement("div");
        elWhere.id = "divWhere" + intNum1;
        elWhere.className = "clhWhere";
        elWhere.innerText = elTemp2.childNodes[2].innerText + ":";
        //set a current "header" record
        strTemp = elTemp2.childNodes[2].innerText;
        //add to Interests container div
        winTemp.document.getElementById("divCVInterestsWEB").appendChild(elWhere);
      }

      //create data row container
      elTemp1 = winTemp.document.createElement("div");
      elTemp1.id = "divRow" + intNum1 + "DataCol1";
      elTemp1.className = "clhInterestsRow";
      elWhere.appendChild(elTemp1);
      //add indent div
      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divInterestsIndent" + intNum1;
      elDataRow.className = "clhInterestsIndent";
      elTemp1.appendChild(elDataRow);

      //add row data
      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divInterestsStart" + intNum1;
      elDataRow.innerText = elTemp2.childNodes[3].innerText;
      elTemp1.appendChild(elDataRow);
    }

    //Personality
    aryDivs = modModel.divTableCVPersonality.getElementsByClassName(
      "clhCopy" + modSchema.constCV_Personality + "DataRowContainer"
    );

    if (aryDivs.length === 0) {
      winTemp.document.getElementById("divPersonalityHeader").hidden = true;
      winTemp.document.getElementById("divLine12").hidden = true;
    }

    for (intNum1 = 0; intNum1 != aryDivs.length; intNum1++) {
      elTemp2 = aryDivs[intNum1];

      //if first where
      // if (!elWhere) {
      //   elWhere = winTemp.document.createElement("div");
      //   elWhere.id = "divWherePersonality" + intNum1;
      //   elWhere.className = "clhWhere";
      //   elWhere.innerText = elTemp2.childNodes[2].innerText + ":";
      //   //set a current "header" record
      //   strTemp = elTemp2.childNodes[2].innerText;
      //   //add to Personality container div
      //   winTemp.document.getElementById("divCVPersonalityWEB").appendChild(elWhere);
      // }
      // if (strTemp !== elTemp2.childNodes[2].innerText) {
      //   elWhere = winTemp.document.createElement("div");
      //   elWhere.id = "divWhere" + intNum1;
      //   elWhere.className = "clhWhere";
      //   elWhere.innerText = elTemp2.childNodes[2].innerText + ":";
      //   //set a current "header" record
      //   strTemp = elTemp2.childNodes[2].innerText;
      //   //add to Personality container div
      //   winTemp.document.getElementById("divCVPersonalityWEB").appendChild(elWhere);
      // }

      //create data row container
      elTemp1 = winTemp.document.createElement("div");
      elTemp1.id = "divRow" + intNum1 + "DataCol1";
      elTemp1.className = "clhPersonalityRow";
      winTemp.document.getElementById("divCVPersonalityWEB").appendChild(elTemp1);
      //add indent div
      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divPersonalityIndent" + intNum1;
      elDataRow.className = "clhPersonalityIndent";
      elTemp1.appendChild(elDataRow);

      //add row data
      elDataRow = winTemp.document.createElement("div");
      elDataRow.id = "divPersonalityStart" + intNum1;
      elDataRow.innerText = elTemp2.childNodes[2].innerText;
      elTemp1.appendChild(elDataRow);
    }
  };
};
export function funcInitView() {
  /*
  configures visibility of controls
  and other visual functions
  */
  let intNum = 0;
  let strName = "";

  modModel.chkPrintAddress.checked = false;
  //disable "action" buttons opendb activates them
  // modModel.btnSave.style.display = "none";
  // modModel.btnUndo.style.display = "none";
  // modModel.btnDelete.style.display = "none";
  // modModel.btnNew.style.display = "none";

  //set label font colour to RED if required field for each
  //textarea control
  // let aryElements = document.getElementsByTagName("textarea");

  // for (intNum = 0; intNum < aryElements.length; intNum++) {
  //   //get field name
  //   strName = aryElements[intNum].id.substring(
  //     3,
  //     aryElements[intNum].id.length
  //   );

  //   //see if required
  //   const aryResult = modModel.objTableHeader.aryFields.find((objTemp) => {
  //     if (objTemp.fieldName === strName) {
  //       return objTemp.requiredField;
  //     }
  //   });

  //   if (aryResult?.requiredField) {
  //     //set label colour to red
  //     document.getElementById("lbl" + strName).style.color = "red";
  //   }
  // }
  //set label font colour to RED if required field for each
  //text control
  // aryElements = document.getElementsByTagName("input");

  // for (intNum = 0; intNum < aryElements.length; intNum++) {
  //   //get field name
  //   strName = aryElements[intNum].id.substring(
  //     3,
  //     aryElements[intNum].id.length
  //   );

  //see if required
  // const aryResult = modModel.objTableHeader.aryFields.find((objTemp) => {
  //   if (objTemp.fieldName === strName) {
  //     return objTemp.requiredField;
  //   }
  // });

  // if (aryResult?.requiredField) {
  //   //set label colour to red
  //   document.getElementById("lbl" + strName).style.color = "red";
  // }
  //}

  //set required fields colours for address lines
  //set label font colour to RED if required field for each
  //text control
  // aryElements = document.getElementsByTagName("input");

  // for (intNum = 0; intNum < aryElements.length; intNum++) {
  //   //get field name
  //   strName = aryElements[intNum].id.substring(
  //     3,
  //     aryElements[intNum].id.length
  //   );

  //   //see if required
  //   const aryResult = modModel.objTableLines.aryFields.find((objTemp) => {
  //     if (objTemp.fieldName === strName) {
  //       return objTemp.requiredField;
  //     }
  //   });

  //   if (aryResult?.requiredField) {
  //     //set label colour to red
  //     document.getElementById("lbl" + strName).style.color = "red";
  //   }
  // }
  // modGlobalView.funcDisableForm(document);
}
export function funcRenumberRowsResetPositions(strDivTable, strTable) {
  /*
  Created 28/01/2025 By Roger Williams

  renumber button IDs to match ACTUAL row they are in
  AND set positions of container DIV to make sure no gaps
  if row deleted

  VARS

  strTable      - name of table to reorder
  strDivTable   - name of div table

  */
  let elTemp;
  let intNum1 = 0;
  let intNum2 = 0;
  let intRowNbr = 1;
  let btnTemp;

  let aryTableRows = [];
  let aryInternal = [];
  let elTable;
  let strTemp = "";

  //get table
  elTable = document.getElementById(strDivTable);
  //clhCopyCV_EducationDataRowContainer
  // aryTemp = elTable.getElementsByTagName("div");
  aryTableRows = elTable.getElementsByClassName("clhCopy" + strTable + "DataRowContainer");

  for (intNum1 = 0; intNum1 < aryTableRows.length; intNum1++) {
    elTemp = aryTableRows[intNum1];
    //reset top
    elTemp.style.top = intRowHeight * intNum1 + "px";
    btnTemp = elTemp.childNodes[0].nextSibling;
    //reset "row" number use intrownbr as set to start from 1 intnum 0!
    btnTemp.id = "btnCopy" + strTable + "Select" + intRowNbr;
    //reset DIV id
    elTemp.id = "divCopy" + strTable + "DataRowContainer" + intRowNbr;

    //renumber internal DIVs
    aryInternal = elTable.getElementsByTagName("div");

    for (intNum2 = 0; intNum2 < aryInternal.length; intNum2++) {
      //remove row number
      strTemp = aryInternal[intNum2].id.replace(/[^A-Z, a-z]/g, "") + intRowNbr;
      //reset row number
      aryInternal[intNum2].id = strTemp;
    }
    intRowNbr++;
  }

  if (strTable === modSchema.constCV_Contact) {
    intContactDivNumberCopy = intRowNbr;
    intNewRowTopCV_ContactCopy = intRowHeight * intNum1;
  }
  if (strTable === modSchema.constCV_CurrentFocus) {
    intCurrentFocusDivNumberCopy = intRowNbr;
    intNewRowTopCV_CurrentFocusCopy = intRowHeight * intNum1;
  }
  if (strTable === modSchema.constCV_Education) {
    intEducationDivNumberCopy = intRowNbr;
    intNewRowTopCV_EducationCopy = intRowHeight * intNum1;
  }
  if (strTable === modSchema.constCV_Experience) {
    intExperienceDivNumberCopy = intRowNbr;
    intNewRowTopCV_ExperienceCopy = intRowHeight * intNum1;
  }
  if (strTable === modSchema.constCV_Highlights) {
    intHighlightsDivNumberCopy = intRowNbr;
    intNewRowTopCV_HighlightsCopy = intRowHeight * intNum1;
  }
  if (strTable === modSchema.constCV_Interests) {
    intInterestsDivNumberCopy = intRowNbr;
    intNewRowTopCV_InterestsCopy = intRowHeight * intNum1;
  }
  if (strTable === modSchema.constCV_Other) {
    intOtherDivNumberCopy = intRowNbr;
    intNewRowTopCV_OtherCopy = intRowHeight * intNum1;
  }
  if (strTable === modSchema.constCV_PersonalInfo) {
    intPersonalInfoDivNumberCopy = intRowNbr;
    intNewRowTopCV_PersonalInfoCopy = intRowHeight * intNum1;
  }
  if (strTable === modSchema.constCV_Personality) {
    intPersonalityDivNumberCopy = intRowNbr;
    intNewRowTopCV_PersonalityCopy = intRowHeight * intNum1;
  }
  if (strTable === modSchema.constCV_Responsibilites) {
    intResponsibilitiesDivNumberCopy = intRowNbr;
    intNewRowTopCV_ResponsibilitiesCopy = intRowHeight * intNum1;
  }
  if (strTable === modSchema.constCV_Skills) {
    intSkillsDivNumberCopy = intRowNbr;
    intNewRowTopCV_SkillsCopy = intRowHeight * intNum1;
  }
}

export const funcDeleteFromCVTable = (event) =>
  /*
    Created 20/02/2025 By Roger Williams

    global handler for remove from CV_ table

    VARS
     
  */
  {
    let intNum = 0;
    let intCounter = 0;
    let strTemp = event.target.id;
    let strTable = "";
    let elTable;
    let aryTemp = [];

    //get row number
    intNum = strTemp.replace(/[^0-9]/g, "");
    //get table by removing the DIVCOPY text
    strTemp = strTemp.substring(7, strTemp.indexOf("Select"));
    strTable = strTemp;
    strTable = strTable.replace("_", "");

    //get table DIV
    elTable = document.getElementById("divTable" + strTable);
    //delete row
    aryTemp = elTable.getElementsByTagName("div");
    //divCopy" + strTemp + "DataRowContainer" + intNum
    for (intCounter = 0; intCounter != aryTemp.length; intCounter++) {
      if ((aryTemp[intCounter].id = "divCopy" + strTemp + "DataRowContainer" + intNum)) {
        elTable.removeChild(aryTemp[intCounter]);
        break;
      }
    }

    funcRenumberRowsResetPositions("divTable" + strTable, strTemp);
  };

export function funcUpdateTableRow(intWhat = 0) {
  /*
   Created 28/01/2025 By Roger Williams

   updates row in table 

   VARS

   intWhat - row to update
  */
  // let elTemp;
  // let strTemp = "";
  // //get row div container
  // elTemp = document.getElementById("divAddressRowContainer" + intWhat);
  // //update list
  // elTemp.childNodes[2].innerText = modModel.txtMSL_CompanyName.value;
  // elTemp.childNodes[3].innerText = modModel.txtMSL_Contact.value;
  // elTemp.childNodes[4].innerText = modModel.txtMSL_Address1.value;
  // elTemp.childNodes[5].innerText = modModel.txtMSL_Address2.value;
  // elTemp.childNodes[6].innerText = modModel.txtMSL_Address3.value;
  // elTemp.childNodes[7].innerText = modModel.txtMSL_TownCity.value;
  // elTemp.childNodes[8].innerText = modModel.txtMSL_Postcode.value;
  // strTemp = modModel.chkMSH_PrintContact.checked;
  // elTemp.childNodes[9].innerText = strTemp;
}
export function funcCopyTableRow(strTable = "", intRow = 0) {
  /*
   Created 13/02/2025 By Roger Williams

   copies one row from one table to another

   VARS

   strTable   - table e.g. CV_Contact
   intRow     - row to copy
  */

  let elTempCopy;
  let elTemp1;
  let elTemp2;
  let intNum = 0;
  let btnTemp;
  let strTemp = "";
  let intRows = 0;

  intRows = 0;
  //select row to copy
  elTempCopy = document.getElementById("div" + strTable + "DataRowContainer" + intRow);

  if (strTable === modSchema.constCV_Contact) {
    intRows = modModel.divTableCVContact.childNodes.length;

    //create select button and row div
    //create div to house the columns
    elTemp1 = document.createElement("div");
    elTemp1.id = "divCopy" + strTable + "DataRowContainer" + intContactDivNumberCopy;
    elTemp1.className = "clhCopy" + strTable + "DataRowContainer";
    elTemp1.style.top = intNewRowTopCV_ContactCopy + "px";
    modModel.divTableCVContact.appendChild(elTemp1);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "divCopy" + strTable + "Row" + intContactDivNumberCopy;
    elTemp2.className = "clhCopy" + strTable + "SelectCol1";
    elTemp1.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btnCopy" + strTable + "Select1";
    } else {
      btnTemp.id = "btnCopy" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcbtnRemoveClick);
    elTemp1.appendChild(btnTemp);

    //copy rest of elements
    for (intNum = 2; intNum != elTempCopy.childNodes.length; intNum++) {
      elTemp2 = document.createElement("div");
      strTemp = elTempCopy.childNodes[intNum].id;
      //insert "copy" after DIV
      strTemp = strTemp.substring(0, 3) + "Copy" + strTemp.substring(6, strTemp.length);
      //strip numbers
      strTemp = strTemp.replace(/[^A-Z, a-z]/g, "");

      elTemp2.id = strTemp + intContactDivNumberCopy;
      elTemp2.className = "clhCopy" + strTable + "DataCol" + Number(intNum - 1);
      elTemp2.innerText = elTempCopy.childNodes[intNum].innerText;
      elTemp1.appendChild(elTemp2);
    }

    intContactDivNumberCopy++;
    intNewRowTopCV_ContactCopy = intNewRowTopCV_ContactCopy + 30;
  }

  if (strTable === modSchema.constCV_CurrentFocus) {
    intRows = modModel.divTableCVCurrentFocus.childNodes.length;

    //create select button and row div
    //create div to house the columns
    elTemp1 = document.createElement("div");
    elTemp1.id = "divCopy" + strTable + "DataRowContainer" + intCurrentFocusDivNumberCopy;
    elTemp1.className = "clhCopy" + strTable + "DataRowContainer";
    elTemp1.style.top = intNewRowTopCV_CurrentFocusCopy + "px";
    modModel.divTableCVCurrentFocus.appendChild(elTemp1);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "divCopy" + strTable + "Row" + intCurrentFocusDivNumberCopy;
    elTemp2.className = "clhCopy" + strTable + "SelectCol1";
    elTemp1.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btnCopy" + strTable + "Select1";
    } else {
      btnTemp.id = "btnCopy" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcbtnRemoveClick);
    elTemp1.appendChild(btnTemp);

    //copy rest of elements
    for (intNum = 2; intNum != elTempCopy.childNodes.length; intNum++) {
      elTemp2 = document.createElement("div");
      strTemp = elTempCopy.childNodes[intNum].id;
      //insert "copy" after DIV
      strTemp = strTemp.substring(0, 3) + "Copy" + strTemp.substring(6, strTemp.length);
      //strip numbers
      strTemp = strTemp.replace(/[^A-Z, a-z]/g, "");

      elTemp2.id = strTemp + intCurrentFocusDivNumberCopy;
      elTemp2.className = "clhCopy" + strTable + "DataCol" + Number(intNum - 1);
      elTemp2.innerText = elTempCopy.childNodes[intNum].innerText;
      elTemp1.appendChild(elTemp2);
    }

    intCurrentFocusDivNumberCopy++;
    intNewRowTopCV_CurrentFocusCopy = intNewRowTopCV_CurrentFocusCopy + 30;
  }

  if (strTable === modSchema.constCV_Education) {
    intRows = modModel.divTableCVEducation.childNodes.length;

    //create select button and row div
    //create div to house the columns
    elTemp1 = document.createElement("div");
    elTemp1.id = "divCopy" + strTable + "DataRowContainer" + intEducationDivNumberCopy;
    elTemp1.className = "clhCopy" + strTable + "DataRowContainer";
    elTemp1.style.top = intNewRowTopCV_EducationCopy + "px";
    modModel.divTableCVEducation.appendChild(elTemp1);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "divCopy" + strTable + "Row" + intEducationDivNumberCopy;
    elTemp2.className = "clhCopy" + strTable + "SelectCol1";
    elTemp1.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btnCopy" + strTable + "Select1";
    } else {
      btnTemp.id = "btnCopy" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcbtnRemoveClick);
    elTemp1.appendChild(btnTemp);

    //copy rest of elements
    for (intNum = 2; intNum != elTempCopy.childNodes.length; intNum++) {
      elTemp2 = document.createElement("div");
      strTemp = elTempCopy.childNodes[intNum].id;
      //insert "copy" after DIV
      strTemp = strTemp.substring(0, 3) + "Copy" + strTemp.substring(6, strTemp.length);
      //strip numbers
      strTemp = strTemp.replace(/[^A-Z, a-z]/g, "");

      elTemp2.id = strTemp + intEducationDivNumberCopy;
      elTemp2.className = "clhCopy" + strTable + "DataCol" + Number(intNum - 1);
      elTemp2.innerText = elTempCopy.childNodes[intNum].innerText;
      elTemp1.appendChild(elTemp2);
    }

    intEducationDivNumberCopy++;
    intNewRowTopCV_EducationCopy = intNewRowTopCV_EducationCopy + 30;
  }

  if (strTable === modSchema.constCV_Experience) {
    intRows = modModel.divTableCVExperience.childNodes.length;

    //create select button and row div
    //create div to house the columns
    elTemp1 = document.createElement("div");
    elTemp1.id = "divCopy" + strTable + "DataRowContainer" + intExperienceDivNumberCopy;
    elTemp1.className = "clhCopy" + strTable + "DataRowContainer";
    elTemp1.style.top = intNewRowTopCV_ExperienceCopy + "px";
    modModel.divTableCVExperience.appendChild(elTemp1);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "divCopy" + strTable + "Row" + intExperienceDivNumberCopy;
    elTemp2.className = "clhCopy" + strTable + "SelectCol1";
    elTemp1.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btnCopy" + strTable + "Select1";
    } else {
      btnTemp.id = "btnCopy" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcbtnRemoveClick);
    elTemp1.appendChild(btnTemp);

    //copy rest of elements
    for (intNum = 2; intNum != elTempCopy.childNodes.length; intNum++) {
      elTemp2 = document.createElement("div");
      strTemp = elTempCopy.childNodes[intNum].id;
      //insert "copy" after DIV
      strTemp = strTemp.substring(0, 3) + "Copy" + strTemp.substring(6, strTemp.length);
      //strip numbers
      strTemp = strTemp.replace(/[^A-Z, a-z]/g, "");

      elTemp2.id = strTemp + intExperienceDivNumberCopy;
      elTemp2.className = "clhCopy" + strTable + "DataCol" + Number(intNum - 1);
      elTemp2.innerText = elTempCopy.childNodes[intNum].innerText;
      elTemp1.appendChild(elTemp2);
    }

    intExperienceDivNumberCopy++;
    intNewRowTopCV_ExperienceCopy = intNewRowTopCV_ExperienceCopy + 30;
  }

  if (strTable === modSchema.constCV_Highlights) {
    intRows = modModel.divTableCVHighlights.childNodes.length;

    //create select button and row div
    //create div to house the columns
    elTemp1 = document.createElement("div");
    elTemp1.id = "divCopy" + strTable + "DataRowContainer" + intHighlightsDivNumberCopy;
    elTemp1.className = "clhCopy" + strTable + "DataRowContainer";
    elTemp1.style.top = intNewRowTopCV_HighlightsCopy + "px";
    modModel.divTableCVHighlights.appendChild(elTemp1);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "divCopy" + strTable + "Row" + intHighlightsDivNumberCopy;
    elTemp2.className = "clhCopy" + strTable + "SelectCol1";
    elTemp1.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btnCopy" + strTable + "Select1";
    } else {
      btnTemp.id = "btnCopy" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcbtnRemoveClick);
    elTemp1.appendChild(btnTemp);

    //copy rest of elements
    for (intNum = 2; intNum != elTempCopy.childNodes.length; intNum++) {
      elTemp2 = document.createElement("div");
      strTemp = elTempCopy.childNodes[intNum].id;
      //insert "copy" after DIV
      strTemp = strTemp.substring(0, 3) + "Copy" + strTemp.substring(6, strTemp.length);
      //strip numbers
      strTemp = strTemp.replace(/[^A-Z, a-z]/g, "");

      elTemp2.id = strTemp + intHighlightsDivNumberCopy;
      elTemp2.className = "clhCopy" + strTable + "DataCol" + Number(intNum - 1);
      elTemp2.innerText = elTempCopy.childNodes[intNum].innerText;
      elTemp1.appendChild(elTemp2);
    }

    intHighlightsDivNumberCopy++;
    intNewRowTopCV_HighlightsCopy = intNewRowTopCV_HighlightsCopy + 30;
  }
  if (strTable === modSchema.constCV_Interests) {
    intRows = modModel.divTableCVInterests.childNodes.length;

    //create select button and row div
    //create div to house the columns
    elTemp1 = document.createElement("div");
    elTemp1.id = "divCopy" + strTable + "DataRowContainer" + intInterestsDivNumberCopy;
    elTemp1.className = "clhCopy" + strTable + "DataRowContainer";
    elTemp1.style.top = intNewRowTopCV_InterestsCopy + "px";
    modModel.divTableCVInterests.appendChild(elTemp1);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "divCopy" + strTable + "Row" + intInterestsDivNumberCopy;
    elTemp2.className = "clhCopy" + strTable + "SelectCol1";
    elTemp1.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btnCopy" + strTable + "Select1";
    } else {
      btnTemp.id = "btnCopy" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcbtnRemoveClick);
    elTemp1.appendChild(btnTemp);

    //copy rest of elements
    for (intNum = 2; intNum != elTempCopy.childNodes.length; intNum++) {
      elTemp2 = document.createElement("div");
      strTemp = elTempCopy.childNodes[intNum].id;
      //insert "copy" after DIV
      strTemp = strTemp.substring(0, 3) + "Copy" + strTemp.substring(6, strTemp.length);
      //strip numbers
      strTemp = strTemp.replace(/[^A-Z, a-z]/g, "");

      elTemp2.id = strTemp + intInterestsDivNumberCopy;
      elTemp2.className = "clhCopy" + strTable + "DataCol" + Number(intNum - 1);
      elTemp2.innerText = elTempCopy.childNodes[intNum].innerText;
      elTemp1.appendChild(elTemp2);
    }

    intInterestsDivNumberCopy++;
    intNewRowTopCV_InterestsCopy = intNewRowTopCV_InterestsCopy + 30;
  }
  if (strTable === modSchema.constCV_Other) {
    intRows = modModel.divTableCVOther.childNodes.length;

    //create select button and row div
    //create div to house the columns
    elTemp1 = document.createElement("div");
    elTemp1.id = "divCopy" + strTable + "DataRowContainer" + intOtherDivNumberCopy;
    elTemp1.className = "clhCopy" + strTable + "DataRowContainer";
    elTemp1.style.top = intNewRowTopCV_OtherCopy + "px";
    modModel.divTableCVOther.appendChild(elTemp1);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "divCopy" + strTable + "Row" + intOtherDivNumberCopy;
    elTemp2.className = "clhCopy" + strTable + "SelectCol1";
    elTemp1.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btnCopy" + strTable + "Select1";
    } else {
      btnTemp.id = "btnCopy" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcbtnRemoveClick);
    elTemp1.appendChild(btnTemp);

    //copy rest of elements
    for (intNum = 2; intNum != elTempCopy.childNodes.length; intNum++) {
      elTemp2 = document.createElement("div");
      strTemp = elTempCopy.childNodes[intNum].id;
      //insert "copy" after DIV
      strTemp = strTemp.substring(0, 3) + "Copy" + strTemp.substring(6, strTemp.length);
      //strip numbers
      strTemp = strTemp.replace(/[^A-Z, a-z]/g, "");

      elTemp2.id = strTemp + intOtherDivNumberCopy;
      elTemp2.className = "clhCopy" + strTable + "DataCol" + Number(intNum - 1);
      elTemp2.innerText = elTempCopy.childNodes[intNum].innerText;
      elTemp1.appendChild(elTemp2);
    }

    intOtherDivNumberCopy++;
    intNewRowTopCV_OtherCopy = intNewRowTopCV_OtherCopy + 30;
  }

  if (strTable === modSchema.constCV_PersonalInfo) {
    intRows = modModel.divTableCVPersonalInfo.childNodes.length;

    //create select button and row div
    //create div to house the columns
    elTemp1 = document.createElement("div");
    elTemp1.id = "divCopy" + strTable + "DataRowContainer" + intPersonalInfoDivNumberCopy;
    elTemp1.className = "clhCopy" + strTable + "DataRowContainer";
    elTemp1.style.top = intNewRowTopCV_PersonalInfoCopy + "px";
    modModel.divTableCVPersonalInfo.appendChild(elTemp1);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "divCopy" + strTable + "Row" + intPersonalInfoDivNumberCopy;
    elTemp2.className = "clhCopy" + strTable + "SelectCol1";
    elTemp1.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btnCopy" + strTable + "Select1";
    } else {
      btnTemp.id = "btnCopy" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcbtnRemoveClick);
    elTemp1.appendChild(btnTemp);

    //copy rest of elements
    for (intNum = 2; intNum != elTempCopy.childNodes.length; intNum++) {
      elTemp2 = document.createElement("div");
      strTemp = elTempCopy.childNodes[intNum].id;
      //insert "copy" after DIV
      strTemp = strTemp.substring(0, 3) + "Copy" + strTemp.substring(6, strTemp.length);
      //strip numbers
      strTemp = strTemp.replace(/[^A-Z, a-z]/g, "");

      elTemp2.id = strTemp + intPersonalInfoDivNumberCopy;
      elTemp2.className = "clhCopy" + strTable + "DataCol" + Number(intNum - 1);
      elTemp2.innerText = elTempCopy.childNodes[intNum].innerText;
      elTemp1.appendChild(elTemp2);
    }

    intPersonalInfoDivNumberCopy++;
    intNewRowTopCV_PersonalInfoCopy = intNewRowTopCV_PersonalInfoCopy + 30;
  }

  if (strTable === modSchema.constCV_Personality) {
    intRows = modModel.divTableCVPersonality.childNodes.length;

    //create select button and row div
    //create div to house the columns
    elTemp1 = document.createElement("div");
    elTemp1.id = "divCopy" + strTable + "DataRowContainer" + intPersonalityDivNumberCopy;
    elTemp1.className = "clhCopy" + strTable + "DataRowContainer";
    elTemp1.style.top = intNewRowTopCV_PersonalityCopy + "px";
    modModel.divTableCVPersonality.appendChild(elTemp1);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "divCopy" + strTable + "Row" + intPersonalityDivNumberCopy;
    elTemp2.className = "clhCopy" + strTable + "SelectCol1";
    elTemp1.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btnCopy" + strTable + "Select1";
    } else {
      btnTemp.id = "btnCopy" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcbtnRemoveClick);
    elTemp1.appendChild(btnTemp);

    //copy rest of elements
    for (intNum = 2; intNum != elTempCopy.childNodes.length; intNum++) {
      elTemp2 = document.createElement("div");
      strTemp = elTempCopy.childNodes[intNum].id;
      //insert "copy" after DIV
      strTemp = strTemp.substring(0, 3) + "Copy" + strTemp.substring(6, strTemp.length);
      //strip numbers
      strTemp = strTemp.replace(/[^A-Z, a-z]/g, "");

      elTemp2.id = strTemp + intPersonalityDivNumberCopy;
      elTemp2.className = "clhCopy" + strTable + "DataCol" + Number(intNum - 1);
      elTemp2.innerText = elTempCopy.childNodes[intNum].innerText;
      elTemp1.appendChild(elTemp2);
    }

    intPersonalityDivNumberCopy++;
    intNewRowTopCV_PersonalityCopy = intNewRowTopCV_PersonalityCopy + 30;
  }

  if (strTable === modSchema.constCV_Responsibilities) {
    intRows = modModel.divTableCVResponsibilities.childNodes.length;

    //create select button and row div
    //create div to house the columns
    elTemp1 = document.createElement("div");
    elTemp1.id = "divCopy" + strTable + "DataRowContainer" + intResponsibilitiesDivNumberCopy;
    elTemp1.className = "clhCopy" + strTable + "DataRowContainer";
    elTemp1.style.top = intNewRowTopCV_ResponsibilitiesCopy + "px";
    modModel.divTableCVResponsibilities.appendChild(elTemp1);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "divCopy" + strTable + "Row" + intResponsibilitiesDivNumberCopy;
    elTemp2.className = "clhCopy" + strTable + "SelectCol1";
    elTemp1.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btnCopy" + strTable + "Select1";
    } else {
      btnTemp.id = "btnCopy" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcbtnRemoveClick);
    elTemp1.appendChild(btnTemp);

    //copy rest of elements
    for (intNum = 2; intNum != elTempCopy.childNodes.length; intNum++) {
      elTemp2 = document.createElement("div");
      strTemp = elTempCopy.childNodes[intNum].id;
      //insert "copy" after DIV
      strTemp = strTemp.substring(0, 3) + "Copy" + strTemp.substring(6, strTemp.length);
      //strip numbers
      strTemp = strTemp.replace(/[^A-Z, a-z]/g, "");

      elTemp2.id = strTemp + intResponsibilitiesDivNumberCopy;
      elTemp2.className = "clhCopy" + strTable + "DataCol" + Number(intNum - 1);
      elTemp2.innerText = elTempCopy.childNodes[intNum].innerText;
      elTemp1.appendChild(elTemp2);
    }

    intResponsibilitiesDivNumberCopy++;
    intNewRowTopCV_ResponsibilitiesCopy = intNewRowTopCV_ResponsibilitiesCopy + 30;
  }
  if (strTable === modSchema.constCV_Skills) {
    intRows = modModel.divTableCVSkills.childNodes.length;

    //create select button and row div
    //create div to house the columns
    elTemp1 = document.createElement("div");
    elTemp1.id = "divCopy" + strTable + "DataRowContainer" + intSkillsDivNumberCopy;
    elTemp1.className = "clhCopy" + strTable + "DataRowContainer";
    elTemp1.style.top = intNewRowTopCV_SkillsCopy + "px";
    modModel.divTableCVSkills.appendChild(elTemp1);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "divCopy" + strTable + "Row" + intSkillsDivNumberCopy;
    elTemp2.className = "clhCopy" + strTable + "SelectCol1";
    elTemp1.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btnCopy" + strTable + "Select1";
    } else {
      btnTemp.id = "btnCopy" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcbtnRemoveClick);
    elTemp1.appendChild(btnTemp);

    //copy rest of elements
    for (intNum = 2; intNum != elTempCopy.childNodes.length; intNum++) {
      elTemp2 = document.createElement("div");
      strTemp = elTempCopy.childNodes[intNum].id;
      //insert "copy" after DIV
      strTemp = strTemp.substring(0, 3) + "Copy" + strTemp.substring(6, strTemp.length);
      //strip numbers
      strTemp = strTemp.replace(/[^A-Z, a-z]/g, "");

      elTemp2.id = strTemp + intSkillsDivNumberCopy;
      elTemp2.className = "clhCopy" + strTable + "DataCol" + Number(intNum - 1);
      elTemp2.innerText = elTempCopy.childNodes[intNum].innerText;
      elTemp1.appendChild(elTemp2);
    }

    intSkillsDivNumberCopy++;
    intNewRowTopCV_SkillsCopy = intNewRowTopCV_SkillsCopy + 30;
  }
}
export function funcCreateTableRow(strTable = "", objValues) {
  /*
   Created 24/01/2025 By Roger Williams

   puts new row in table 
   creates button for selecting the row

   VARS

   strTable  : table to add to 
   objValues : cursor object with values to add

   creates 1 select button and 9 text rows ALL as divs

   Note: "CV" named tables do not use this function this is for data
         loaded from the database ONLY

  tables are:
   - contact
   - currentfocus
   - education
   - experience
   - highlights
   - interests
   - other
   - personalinfo
   - personality
   - Responsibilities
   - skills       

  */
  let btnTemp;
  let elTemp;
  let elTemp2;
  let intRows = 0;
  let dteTemp;
  /*
    structure example:

    divMailShotAddresses
   |  |divAddressRowContainer+row nbr                                     | 
   |  | element1  elemen2 element3 elemen4 element5 element6 element7 etc |
   |  |divAddressRowContainer+row nbr                                     | 
   |  | element1  elemen2 element3 elemen4 element5 element6 element7 etc |
   
  */

  if (strTable === modSchema.constCV_Contact) {
    intRows = modModel.divTableContact.childNodes.length;
    //create div to house the columns
    elTemp = document.createElement("div");
    elTemp.id = "div" + strTable + "DataRowContainer" + intContactDivNumber;
    elTemp.className = "clh" + strTable + "DataRowContainer";
    elTemp.style.top = intNewRowTopCV_Contact + "px";
    modModel.divTableContact.appendChild(elTemp);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intContactDivNumber;
    elTemp2.className = "clh" + strTable + "SelectCol1";
    elTemp.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btn" + strTable + "Select1";
    } else {
      btnTemp.id = "btn" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcSelectButtonClick);
    elTemp.appendChild(btnTemp);

    //create the columns divs that hold data
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intContactDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol1";
    elTemp2.innerText = objValues.value.CVC_Address1;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intContactDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol2";
    elTemp2.innerText = objValues.value.CVC_Address2;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intContactDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol3";
    elTemp2.innerText = objValues.value.CVC_Address3;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intContactDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol4";
    elTemp2.innerText = objValues.value.CVC_TownCity;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intContactDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol5";
    elTemp2.innerText = objValues.value.CVC_Postcode;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intContactDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol6";
    elTemp2.innerText = objValues.value.CVC_LandLine;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intContactDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol7";
    elTemp2.innerText = objValues.value.CVC_CellPhone;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intContactDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol8";
    elTemp2.innerText = objValues.value.CVC_Email;
    elTemp.appendChild(elTemp2);
    intContactDivNumber++;
    intNewRowTopCV_Contact = intNewRowTopCV_Contact + 30;
  }

  //current focus
  if (strTable === modSchema.constCV_CurrentFocus) {
    intRows = modModel.divTableCurrentFocus.childNodes.length;
    //create div to house the columns
    elTemp = document.createElement("div");
    elTemp.id = "div" + strTable + "DataRowContainer" + intCurrentFocusDivNumber;
    elTemp.className = "clh" + strTable + "DataRowContainer";
    elTemp.style.top = intNewRowTopCV_CurrentFocus + "px";
    modModel.divTableCurrentFocus.appendChild(elTemp);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intCurrentFocusDivNumber;
    elTemp2.className = "cl" + strTable + "SelectCol1";
    elTemp.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btn" + strTable + "Select1";
    } else {
      btnTemp.id = "btn" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcSelectButtonClick);
    elTemp.appendChild(btnTemp);

    //create the columns divs that hold data
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intCurrentFocusDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol1";
    elTemp2.innerText = objValues.value.CVF_Details;
    elTemp.appendChild(elTemp2);

    intCurrentFocusDivNumber++;
    intNewRowTopCV_CurrentFocus = intNewRowTopCV_CurrentFocus + 30;
  }

  if (strTable === modSchema.constCV_Education) {
    intRows = modModel.divTableEducation.childNodes.length;
    //create div to house the columns
    elTemp = document.createElement("div");
    elTemp.id = "div" + strTable + "DataRowContainer" + intEducationDivNumber;
    elTemp.className = "clh" + strTable + "DataRowContainer";
    elTemp.style.top = intNewRowTopCV_Education + "px";
    modModel.divTableEducation.appendChild(elTemp);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intEducationDivNumber;
    elTemp2.className = "clh" + strTable + "SelectCol1";
    elTemp.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btn" + strTable + "Select1";
    } else {
      btnTemp.id = "btn" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcSelectButtonClick);
    elTemp.appendChild(btnTemp);

    //create the columns divs that hold data
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intEducationDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol1";
    elTemp2.innerText = objValues.value.CVED_Where;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intEducationDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol2";

    dteTemp = new Date(objValues.value.CVED_YearStarted);
    elTemp2.innerText = dteTemp.toLocaleDateString("en-GB");
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intEducationDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol3";
    dteTemp = new Date(objValues.value.CVED_YearEnded);
    elTemp2.innerText = dteTemp.toLocaleDateString("en-GB");
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intEducationDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol4";
    elTemp2.innerText = objValues.value.CVED_What;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intEducationDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol5";
    elTemp2.innerText = objValues.value.CVED_Grade;
    elTemp.appendChild(elTemp2);

    intEducationDivNumber++;
    intNewRowTopCV_Education = intNewRowTopCV_Education + 30;
  }

  if (strTable === modSchema.constCV_Experience) {
    intRows = modModel.divTableExperience.childNodes.length;
    //create div to house the columns
    elTemp = document.createElement("div");
    elTemp.id = "div" + strTable + "DataRowContainer" + intExperienceDivNumber;
    elTemp.className = "clh" + strTable + "DataRowContainer";
    elTemp.style.top = intNewRowTopCV_Experience + "px";
    modModel.divTableExperience.appendChild(elTemp);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intExperienceDivNumber;
    elTemp2.className = "clh" + strTable + "SelectCol1";
    elTemp.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btn" + strTable + "Select1";
    } else {
      btnTemp.id = "btn" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcSelectButtonClick);
    elTemp.appendChild(btnTemp);

    //create the columns divs that hold data
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intExperienceDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol1";
    elTemp2.innerText = objValues.value.CVE_Where;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intExperienceDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol2";

    dteTemp = new Date(objValues.value.CVE_YearStarted);
    elTemp2.innerText = dteTemp.toLocaleDateString("en-GB");
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intExperienceDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol3";
    dteTemp = new Date(objValues.value.CVE_YearEnded);
    elTemp2.innerText = dteTemp.toLocaleDateString("en-GB");
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intExperienceDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol4";
    elTemp2.innerText = objValues.value.CVE_Role;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intExperienceDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol5";
    elTemp2.innerText = objValues.value.CVE_Achievements;
    elTemp.appendChild(elTemp2);

    intExperienceDivNumber++;
    intNewRowTopCV_Experience = intNewRowTopCV_Experience + 30;
  }

  if (strTable === modSchema.constCV_Highlights) {
    intRows = modModel.divTableHighlights.childNodes.length;
    //create div to house the columns
    elTemp = document.createElement("div");
    elTemp.id = "div" + strTable + "DataRowContainer" + intHighlightsDivNumber;
    elTemp.className = "clh" + strTable + "DataRowContainer";
    elTemp.style.top = intNewRowTopCV_Highlights + "px";
    modModel.divTableHighlights.appendChild(elTemp);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intHighlightsDivNumber;
    elTemp2.className = "clh" + strTable + "SelectCol1";
    elTemp.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btn" + strTable + "Select1";
    } else {
      btnTemp.id = "btn" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcSelectButtonClick);
    elTemp.appendChild(btnTemp);

    //create the columns divs that hold data
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intHighlightsDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol1";
    elTemp2.innerText = objValues.value.CVH_Name;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intHighlightsDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol2";
    elTemp2.innerText = objValues.value.CVH_Details;
    elTemp.appendChild(elTemp2);

    intHighlightsDivNumber++;
    intNewRowTopCV_Highlights = intNewRowTopCV_Highlights + 30;
  }

  if (strTable === modSchema.constCV_Interests) {
    intRows = modModel.divTableInterests.childNodes.length;
    //create div to house the columns
    elTemp = document.createElement("div");
    elTemp.id = "div" + strTable + "DataRowContainer" + intInterestsDivNumber;
    elTemp.className = "clh" + strTable + "DataRowContainer";
    elTemp.style.top = intNewRowTopCV_Interests + "px";
    modModel.divTableInterests.appendChild(elTemp);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intInterestsDivNumber;
    elTemp2.className = "clh" + strTable + "SelectCol1";
    elTemp.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btn" + strTable + "Select1";
    } else {
      btnTemp.id = "btn" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcSelectButtonClick);
    elTemp.appendChild(btnTemp);

    //create the columns divs that hold data
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intInterestsDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol1";
    elTemp2.innerText = objValues.value.CVI_Name;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intInterestsDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol2";
    elTemp2.innerText = objValues.value.CVI_Details;
    elTemp.appendChild(elTemp2);

    intInterestsDivNumber++;
    intNewRowTopCV_Interests = intNewRowTopCV_Interests + 30;
  }

  if (strTable === modSchema.constCV_Other) {
    intRows = modModel.divTableOther.childNodes.length;
    //create div to house the columns
    elTemp = document.createElement("div");
    elTemp.id = "div" + strTable + "DataRowContainer" + intOtherDivNumber;
    elTemp.className = "clh" + strTable + "DataRowContainer";
    elTemp.style.top = intNewRowTopCV_Other + "px";
    modModel.divTableOther.appendChild(elTemp);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intOtherDivNumber;
    elTemp2.className = "clh" + strTable + "SelectCol1";
    elTemp.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btn" + strTable + "Select1";
    } else {
      btnTemp.id = "btn" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcSelectButtonClick);
    elTemp.appendChild(btnTemp);

    //create the columns divs that hold data
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intOtherDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol1";
    elTemp2.innerText = objValues.value.CVO_Name;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intOtherDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol2";
    elTemp2.innerText = objValues.value.CVO_Details;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intOtherDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol3";
    elTemp2.innerText = objValues.value.CVO_WebLink;
    elTemp.appendChild(elTemp2);

    intOtherDivNumber++;
    intNewRowTopCV_Other = intNewRowTopCV_Other + 30;
  }

  if (strTable === modSchema.constCV_PersonalInfo) {
    intRows = modModel.divTablePersonalInfo.childNodes.length;
    //create div to house the columns
    elTemp = document.createElement("div");
    elTemp.id = "div" + strTable + "DataRowContainer" + intPersonalInfoDivNumber;
    elTemp.className = "clh" + strTable + "DataRowContainer";
    elTemp.style.top = intNewRowTopCV_PersonalInfo + "px";
    modModel.divTablePersonalInfo.appendChild(elTemp);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intPersonalInfoDivNumber;
    elTemp2.className = "clh" + strTable + "SelectCol1";
    elTemp.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btn" + strTable + "Select1";
    } else {
      btnTemp.id = "btn" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcSelectButtonClick);
    elTemp.appendChild(btnTemp);

    //create the columns divs that hold data
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intPersonalInfoDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol1";
    elTemp2.innerText = objValues.value.CVP_Name;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intPersonalInfoDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol2";
    elTemp2.innerText = objValues.value.CVP_Nationality;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intPersonalInfoDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol3";
    elTemp2.innerText = objValues.value.CVP_DOB;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intPersonalInfoDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol4";
    elTemp2.innerText = objValues.value.CVP_SalaryRange;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intPersonalInfoDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol5";
    elTemp2.innerText = objValues.value.CVP_Image;
    elTemp.appendChild(elTemp2);

    intPersonalInfoDivNumber++;
    intNewRowTopCV_PersonalInfo = intNewRowTopCV_PersonalInfo + 30;
  }

  if (strTable === modSchema.constCV_Personality) {
    intRows = modModel.divTablePersonality.childNodes.length;
    //create div to house the columns
    elTemp = document.createElement("div");
    elTemp.id = "div" + strTable + "DataRowContainer" + intPersonalityDivNumber;
    elTemp.className = "clh" + strTable + "DataRowContainer";
    elTemp.style.top = intNewRowTopCV_Personality + "px";
    modModel.divTablePersonality.appendChild(elTemp);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intPersonalityDivNumber;
    elTemp2.className = "clh" + strTable + "SelectCol1";
    elTemp.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btn" + strTable + "Select1";
    } else {
      btnTemp.id = "btn" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcSelectButtonClick);
    elTemp.appendChild(btnTemp);

    //create the columns divs that hold data
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intPersonalityDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol1";
    elTemp2.innerText = objValues.value.CVPP_Personality;
    elTemp.appendChild(elTemp2);

    intPersonalityDivNumber++;
    intNewRowTopCV_Personality = intNewRowTopCV_Personality + 30;
  }

  if (strTable === modSchema.constCV_Responsibilities) {
    intRows = modModel.divTableResponsibilities.childNodes.length;
    //create div to house the columns
    elTemp = document.createElement("div");
    elTemp.id = "div" + strTable + "DataRowContainer" + intResponsibilitiesDivNumber;
    elTemp.className = "clh" + strTable + "DataRowContainer";
    elTemp.style.top = intNewRowTopCV_Responsibilities + "px";
    modModel.divTableResponsibilities.appendChild(elTemp);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intResponsibilitiesDivNumber;
    elTemp2.className = "clh" + strTable + "SelectCol1";
    elTemp.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btn" + strTable + "Select1";
    } else {
      btnTemp.id = "btn" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcSelectButtonClick);
    elTemp.appendChild(btnTemp);

    //create the columns divs that hold data
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intResponsibilitiesDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol1";
    elTemp2.innerText = objValues.value.CVRR_Name;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intResponsibilitiesDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol2";
    elTemp2.innerText = objValues.value.CVRR_Details;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intResponsibilitiesDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol3";
    elTemp2.innerText = objValues.value.CVR_Name;
    elTemp.appendChild(elTemp2);

    intResponsibilitiesDivNumber++;
    intNewRowTopCV_Responsibilities = intNewRowTopCV_Responsibilities + 30;
  }

  if (strTable === modSchema.constCV_Skills) {
    intRows = modModel.divTableSkills.childNodes.length;
    //create div to house the columns
    elTemp = document.createElement("div");
    elTemp.id = "div" + strTable + "DataRowContainer" + intSkillsDivNumber;
    elTemp.className = "clh" + strTable + "DataRowContainer";
    elTemp.style.top = intNewRowTopCV_Skills + "px";
    modModel.divTableSkills.appendChild(elTemp);

    //create column one row select button
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intSkillsDivNumber;
    elTemp2.className = "clh" + strTable + "SelectCol1";
    elTemp.appendChild(elTemp2);
    //add select button
    btnTemp = document.createElement("button");
    btnTemp.innerText = "select";
    //set button id to include ACTUAl row number
    if (intRows === 0) {
      btnTemp.id = "btn" + strTable + "Select1";
    } else {
      btnTemp.id = "btn" + strTable + "Select" + Number(intRows + 1);
    }
    btnTemp.style.width = "8ch";
    btnTemp.style.height = "30px";
    btnTemp.className = "btnSelect";
    btnTemp.addEventListener("click", modModel.funcSelectButtonClick);
    elTemp.appendChild(btnTemp);

    //create the columns divs that hold data
    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intSkillsDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol1";
    elTemp2.innerText = objValues.value.CVS_Name;
    elTemp.appendChild(elTemp2);

    elTemp2 = document.createElement("div");
    elTemp2.id = "div" + strTable + "Row" + intSkillsDivNumber;
    elTemp2.className = "clh" + strTable + "DataCol2";
    elTemp2.innerText = objValues.value.CVS_Details;
    elTemp.appendChild(elTemp2);

    intSkillsDivNumber++;
    intNewRowTopCV_Skills = intNewRowTopCV_Skills + 30;
  }
}

export function funcLoadData() {
  /*
   Created 24/01/2025 By Roger Williams

   loads record selected from combobox
   populates table with the data

   loads data into tables:

   - contact
   - currentfocus
   - education
   - experience
   - highlights
   - interests
   - other
   - personalinfo
   - personality
   - Responsibilities
   - skills
   

*/

  //constCV_Colours = "CV_Colours";
  // modSchema.constCV_CSS = "CV_CSS";
  // = "CV_CurrentFocus";
  //  = "CV_Education";
  //  = "CV_Experience";
  //  = "CV_Highlights";
  // modSchema.constCV_HTML = "CV_HTML";
  // modSchema.constCV_Images = "CV_Images";
  //  = "CV_Interests";
  //  = "CV_Other";
  //  = "CV_PersonalInfo";
  //  = "CV_Personality";
  //  = "CV_Responsibilites";
  //  = "CV_Roles";
  //  = "CV_Skills";
  // modSchema.constCV_Templates = "CV_Templates";
  //    modSchema.constCV_Roles,
  let aryTables = [
    modSchema.constCV_Contact,
    modSchema.constCV_CurrentFocus,
    modSchema.constCV_Education,
    modSchema.constCV_Experience,
    modSchema.constCV_Highlights,
    modSchema.constCV_Interests,
    modSchema.constCV_Other,
    modSchema.constCV_PersonalInfo,
    modSchema.constCV_Personality,
    modSchema.constCV_Responsibilities,
    modSchema.constCV_Skills,
  ];

  let intNum = 0;

  function funcReadDataIntoTable(strWhat = "") {
    /*
      Created 13/02/2025 By Roger Williams

      reads data into table

    */
    let trnRead;
    let objRead;
    let curRead;
    let qryRead;

    //read header records
    trnRead = modModel.dbJobSeekerCRM.transaction(strWhat, "readonly");

    trnRead.onerror = (event) => {
      modMessageBox.funcMessageBox(
        "Error Accessing Database!",
        modMessageBox.objIcons.error,
        modMessageBox.objButtons.ok,
        -1,
        "none",
        1,
        "txtJobTitle",
        document.getElementsByTagName("html")
      );
      return;
    };

    objRead = trnRead.objectStore(strWhat);
    qryRead = objRead.openCursor();

    qryRead.onerror = (event) => {
      modMessageBox.funcMessageBox(
        "Error Accessing Table: " + strWhat + "!",
        modMessageBox.objIcons.error,
        modMessageBox.objButtons.ok,
        -1,
        "none",
        1,
        "txtJobTitle",
        document.getElementsByTagName("html")
      );
      return;
    };

    qryRead.onsuccess = (event) => {
      //read through data to find the matching record(s)
      curRead = event.target.result;

      if (curRead) {
        //load data!
        funcCreateTableRow(strWhat, curRead);
        curRead.continue();
      } else {
      }
    };
  }

  intNewRowTopCV_Contact = 0;
  intNewRowTopCV_ContactCopy = 0;
  intNewRowTopCV_CurrentFocus = 0;
  intNewRowTopCV_CurrentFocusCopy = 0;
  intNewRowTopCV_Education = 0;
  intNewRowTopCV_EducationCopy = 0;
  intNewRowTopCV_Experience = 0;
  intNewRowTopCV_ExperienceCopy = 0;
  intNewRowTopCV_Highlights = 0;
  intNewRowTopCV_HighlightsCopy = 0;
  intNewRowTopCV_Interests = 0;
  intNewRowTopCV_InterestsCopy = 0;
  intNewRowTopCV_Other = 0;
  intNewRowTopCV_OtherCopy = 0;
  intNewRowTopCV_PersonalInfo = 0;
  intNewRowTopCV_PersonalInfoCopy = 0;
  intNewRowTopCV_Personality = 0;
  intNewRowTopCV_PersonalityCopy = 0;
  intNewRowTopCV_Responsibilities = 0;
  intNewRowTopCV_ResponsibilitiesCopy = 0;
  intNewRowTopCV_Skills = 0;
  intNewRowTopCV_SkillsCopy = 0;

  for (intNum = 0; intNum != aryTables.length; intNum++) {
    funcReadDataIntoTable(aryTables[intNum]);
  }
}
