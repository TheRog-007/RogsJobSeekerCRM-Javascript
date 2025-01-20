"use strict";
/*
Created 08/12/2024 by Roger Williams

What It Is
==========

A simple dynamic tab control

- creates new tabs
- removes new tabs

opens a user specified webpage in each tab

This is a rough working as I get my teeth into more complex
uses of JavaScript, I need the component so why not try and write it?
*/

//tab element constants
let divTab = document.getElementById("divTab");
let divButtons = document.getElementById("divButtons");
let divFrame = document.getElementById("divFrame");

//tab bun colours
const strDefaultButtonColour = "#deb687";
const strActiveButtonColour = "#e69434";
//tab button 1 name
const constStrButton1 = "btnTab1";
//default tab button name minus button number
const constStrDefaultButtonName = "btnTab";
//default tab frame name minus button number
const constStrDefaultFrameName = "fraFrame";
//default tab frame class name
const constStrDefaultFrameClassName = "fraTabFrame";
//default tab button image id minus button number
const constStrDefaultButtonImageName = "imgTab";
//default button image class name
const constStrDefaultButtonImageClassName = "imgTab";
//location for button close icon
const constStrButtonIconPath = "./Icons/tabClose.jpg";

//tab element CSS constants
const constStrTabWidth = "1600px";
const constStrTabHeight = "800px";
const constStrTabButtonHeight = "50px";
const constStrTabButtonTop = "0px";
const constStrTabButtonBorderRadius = "12%";
const constStrTabFrameWidth = "1500px";
const constStrTabFrameHeight = "740px";
const constStrTabFrameBorderRadius = "0.5%";
const constButtonFontSize = "10px";
//Note: frame width is always 100px smaller than tab control
//      frame height is always 60px smaller than tab control

const constTab1HTML = "/Screens/instructions.html";

//holds each tab button and frame name
const objButtonandFrame = {
  tabCaption: "",
  btnName: "",
  fraName: "",
  strWebPage: "",
};

//Note: frame name stored for future development

//array of open tab
let aryTabs = [objButtonandFrame];
//unique tab number
let intUniqueTabNbr = 1; //1 as ALWAYS there is a tab 1 to start with!

//********normal functions********* */
// const funcInitHTML = () => {
//   /*
//   checks if required HTML elements to use tab are in page
//   if not creates them
//  */
//   let elTemp1;
//   let elTemp2;

//   if (divTab === null) {
//     //create divTab
//     elTemp1 = document.createElement("div");
//     elTemp1.id = "divTab";
//     //  <div id="divTab">
//     //    <div id="divButtons"></div>
//     //    <div id="divFrame"></div>
//     // </div>
//     divTab = elTemp1;
//     //create buttons
//     elTemp2 = document.createElement("div");
//     elTemp2.id = "divButtons";
//     elTemp1.appendChild(elTemp2);
//     divButtons = elTemp2;
//     //create frame
//     elTemp2 = document.createElement("div");
//     elTemp2.id = "divFrame";
//     elTemp1.appendChild(elTemp2);
//     divFrame = elTemp2;
//   }
// };
const funcInitCSS = () => {
  /*
   Sets CSS global vars to const vars in this module

   Allows developer to "tweak" the appearance of the tab control
*/

  document.documentElement.style.setProperty(
    "--varActiveTabButtonColour",
    strActiveButtonColour
  );
  document.documentElement.style.setProperty(
    "--varInActiveTabButtonColour",
    strDefaultButtonColour
  );
  document.documentElement.style.setProperty("--varTabWidth", constStrTabWidth);
  document.documentElement.style.setProperty(
    "--varTabHeight",
    constStrTabHeight
  );
  document.documentElement.style.setProperty(
    "--varTabButtonHeight",
    constStrTabButtonHeight
  );
  document.documentElement.style.setProperty(
    "--varTabButtonTop",
    constStrTabButtonTop
  );
  document.documentElement.style.setProperty(
    "--varTabButtonBorder-Radius",
    constStrTabButtonBorderRadius
  );
  document.documentElement.style.setProperty(
    "--varTabFrameWidth",
    constStrTabFrameWidth
  );
  document.documentElement.style.setProperty(
    "--varTabFrameHeight",
    constStrTabFrameHeight
  );
  document.documentElement.style.setProperty(
    "--varTabFrameBorder-Radius",
    constStrTabFrameBorderRadius
  );

  //set button default font
  divButtons.style.setProperty("font-size", constButtonFontSize);
  //print value for testing
  //console.log(
  //  document.documentElement.style.getPropertyValue("--varDefaultButtonImageName")
  //);
};

const funcConvertToNumber = (value) => {
  //converts a string containing a number to a pure number
  //e.g. a123g45 returns 12345
  let strTemp = value;
  strTemp = Number(strTemp.replace(/[^0-9]/g, ""));
  return strTemp;
};

const funcInArray = (strTitle, strPage) => {
  /*
    Checks if passed values already exist in aryTabs
    returns true if found

    VARS

    strTitle  - tab button caption
    strPage   - tab iframe webpage
  */
  let anyTemp;

  anyTemp = aryTabs.find((objTemp) => {
    return objTemp.tabCaption === strTitle && objTemp.strWebPage === strPage;
  });

  if (anyTemp === undefined) {
    return false;
  } else {
    return true;
  }
};

const funcSetTabActive = (strSet = constStrButton1) => {
  /*
   sets passed button number to selected colour

   VARS
       strSet   - button to set to selected
       Note: default is button 1
  */

  let intNum = 0;
  let objTemp;

  if (strSet !== constStrButton1) {
    //find button
    objTemp = aryTabs.find((objValue) => {
      return objValue.btnName === strSet;
    });

    //if found set to selected colour
    if (objTemp) {
      try {
        document.getElementById(objTemp.btnName).style.background =
          strActiveButtonColour;
      } catch (ex) {
        //catch no button found error
        console.log("Button " + objTemp.btnName + " Not Found!\n" + ex.error);
      }
    }
  }

  //set button 1 to selected
  if (strSet === constStrButton1) {
    try {
      document.getElementById(strSet).style.background = strActiveButtonColour;
    } catch (ex) {
      //catch no button found error
      console.log("Button " + strSet + " Not Found!\n" + ex.error);
    }
  }
};

const funcResetTabColour = () => {
  /*
    resets the tabs colours on all buttons
  
  */

  let intNum = 0;

  //reset all tabs
  //go through open tabs array
  for (intNum = 0; intNum < aryTabs.length; intNum++) {
    try {
      document.getElementById(aryTabs[intNum].btnName).style.background =
        strDefaultButtonColour;
    } catch (ex) {
      //catch no button found error
      console.log(
        "Button " + aryTabs[intNum].btnName + " Not Found!\n" + ex.error
      );
    }
  }
};

//create initial tab
const funcCreateFirstTab = function (
  strTitle = "Instructions",
  strPage = constTab1HTML
) {
  //create button
  let ndeTemp = document.createElement("span");
  ndeTemp.className = constStrDefaultButtonName;
  ndeTemp.id = constStrDefaultButtonName + intUniqueTabNbr;
  ndeTemp.innerHTML = " " + strTitle + " ";
  ndeTemp.style.background = strActiveButtonColour;

  ndeTemp.style.left = "0px";
  ndeTemp.addEventListener("click", funcButtonOnClick);
  divButtons.appendChild(ndeTemp);
  //create web page iframe
  ndeTemp = document.createElement("iframe");
  ndeTemp.className = constStrDefaultFrameClassName;
  ndeTemp.id = constStrDefaultFrameName + intUniqueTabNbr;
  ndeTemp.src = strPage;
  divTab.appendChild(ndeTemp);

  aryTabs[0] = {
    tabCaption: strTitle,
    btnName: constStrDefaultButtonName + intUniqueTabNbr,
    fraName: constStrDefaultFrameName + intUniqueTabNbr,
    strWebPage: strPage,
  };
};

export const funcAddTab = (
  strTitle = "Instructions",
  strPage = constTab1HTML
) => {
  /*
    Creates a new tab, this consists of:

    button
    iframe
    image

    button - sits above tab div
    image  - is the close symbol that is put top right hand corner of button
    iframe - webpage to show in tab

    CSS is created inline with the buttonn as a test due to need to faff
    about with HTML classnames for active/inactive button colours and the
    LEFT CSS property can only be determined dynamically


  VARS

    strTitle - title text for tab
    strpage  - web page to open when tab selected (opened in iframe) 

  
  */
  let btnTemp;
  let imgTemp;
  let fraTemp;

  //first check if user trying to add a tab that already exists
  if (funcInArray(strTitle, strPage)) {
    return;
  }

  //make sure other tabs are in default colour
  funcResetTabColour();
  //hide previous tab frame
  document.getElementById(
    constStrDefaultFrameName + intUniqueTabNbr
  ).hidden = true;

  btnTemp = document.createElement("span");
  btnTemp.className = constStrDefaultButtonName;
  btnTemp.innerHTML = " " + strTitle + " ";
  btnTemp.id = constStrDefaultButtonName + (intUniqueTabNbr + 1);
  btnTemp.style.background = strActiveButtonColour;
  btnTemp.addEventListener("click", funcButtonOnClick);
  divButtons.appendChild(btnTemp);
  //ceate tab close icon
  imgTemp = document.createElement("img");
  imgTemp.src = constStrButtonIconPath;
  imgTemp.alt = "no image";
  imgTemp.className = constStrDefaultButtonImageClassName;
  //image needs ID else event.target.id won't work when deleting tab!
  imgTemp.id = constStrDefaultButtonImageName + (intUniqueTabNbr + 1);
  imgTemp.style.top = "0px";
  imgTemp.style.height = "15px";
  imgTemp.addEventListener("click", funcImageClick);
  //add as child of new button
  btnTemp.appendChild(imgTemp);
  //add form frame
  fraTemp = document.createElement("iframe");
  fraTemp.className = constStrDefaultFrameClassName;
  fraTemp.id = constStrDefaultFrameName + (intUniqueTabNbr + 1);
  fraTemp.src = strPage;
  divTab.appendChild(fraTemp);

  // add new tab to open tabs array
  aryTabs.push({
    tabCaption: strTitle,
    btnName: constStrDefaultButtonName + (intUniqueTabNbr + 1),
    fraName: constStrDefaultFrameName + (intUniqueTabNbr + 1),
    strWebPage: strPage,
  });

  intUniqueTabNbr++;
};

export function funcInit() {
  /*
      Inits CSS and creates first tab
    */
  funcInitCSS();
  //create first tab
  funcCreateFirstTab("Instructions", constTab1HTML);
}

//************event handlers***********
const funcImageClick = (event) => {
  //global image handler - closes selected tab
  let intCurTab = funcConvertToNumber(event.target.id);
  // //delete tab elements from page
  // document.getElementById(constStrDefaultButtonName + intCurTab).remove();
  // document.getElementById(constStrDefaultFrameName + intCurTab).remove();

  //show previous tabs frame
  document.getElementById(
    constStrDefaultFrameName + (intCurTab - 1)
  ).hidden = false;

  //remove from array
  aryTabs = aryTabs.filter((objItems) => {
    return objItems.btnName !== constStrDefaultButtonName + intCurTab;
  });

  //reset other buttons colours
  funcResetTabColour();
  //set last tab in array to active colour
  funcSetTabActive(aryTabs[aryTabs.length - 1].btnName);
  //show webpage
  // funcButtonOnClick(aryTabs[aryTabs.length - 1].btnName);
  //as a failsafe set intUniqueTabNbr to the number of the last
  //button in aryTabs
  intUniqueTabNbr = funcConvertToNumber(aryTabs[aryTabs.length - 1].btnName);

  //delete tab elements from page
  document.getElementById(constStrDefaultButtonName + intCurTab).remove();
  document.getElementById(constStrDefaultFrameName + intCurTab).remove();
};

const funcButtonOnClick = (event) => {
  /*
    shows the selected tabs iframe and sets button colour to selected

    VARS
    
    event - can be object from onclick button handler OR a passed button name

    IF onclick object then: event.target.id = actual button clicked
  */
  let intCurTab = 0;
  let intNum = 0;
  let anyTemp;

  anyTemp = aryTabs.find((objTemp) => {
    return objTemp.btnName === event.target.id;
  });

  if (anyTemp === undefined) {
    return false;
  }
  //    else {
  //   return true;
  // }

  if (!anyTemp) {
    return false;
  }

  //reset other buttons colours
  funcResetTabColour();

  //get current tab number
  try {
    //as event can be an object OR a string first check if object
    if (event.target.id) {
      intCurTab = funcConvertToNumber(event.target.id);
    }
  } catch (ex) {
    try {
      //if not an object should be a string!
      intCurTab = funcConvertToNumber(event);
    } catch (ex) {
      //something bizarre and unusual has occured!!
      console.log("Error Selecting Tab Button: " + event);
    }
  }

  //hide all frames
  for (intNum = 0; intNum < aryTabs.length; intNum++) {
    try {
      document.getElementById(aryTabs[intNum].fraName).hidden = true;
    } catch (ex) {
      //catch no button found error
      console.log(ex.error);
    }
  }

  //make sure THIS tabs frame is visible
  document.getElementById(constStrDefaultFrameName + intCurTab).hidden = false;
  //change THIS buttons back colour to selected
  funcSetTabActive(constStrDefaultButtonName + intCurTab);
};

// const funcComboboxClick = (event) => {
//   //for combobox used to select pages
//   //and set tab button titles
//   let intSelected = document.getElementById("cmbComboBox").selectedIndex + 1;
//   funcAddTab(event.target.value, "./page" + intSelected + ".html");
// };

//*******main*******

//originally had html elements created if missing BUT
//for some reason while they are created they cannot be used!
// funcInitHTML();
// funcInitCSS();

// //create first tab
// funcCreateFirstTab("Tab1", constTab1HTML);

// //combobox handler
// document
//   .getElementById("cmbComboBox")
//   .addEventListener("change", funcComboboxClick);
