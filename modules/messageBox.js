"use strict";

/*
  structure:

       <input type="text" id="txtHidden"/>
      <dialog id="dlgMessage">
         <div id="divMessage">
            <img src="" id="imgMessage"/>
            <p id="pMessage"></p>
            <button id="btnMsgBox_Ok" hidden></button>
            <button id="btnMsgBox_Cancel" hidden></button> 
        </div>
      </dialog>

  What it is
  ==========

  A replica of the messagebox function from .Net

  - Can show 4 different icons and 8 different buttons
  - Default button can be specified
  - Text obviously can be specified

  How it works
  ------------

  When funcMessageBox is called uses dlgDialog.showModal to
  show the HTML dialog 
  When a button is clicked the blnOk value is sert to determine WHICh button was
  clicked, 1 = positive (ok etc) 2 = negative (cancel etc)
  Then the "hidden" text box txtHidden is given focus
  At that point the programmer can check blnOk and decide what processing
  needs to take place 
  then another controi on the page is given focus to stop an endless focus event 
  loop

*/
//HTML elements
const divMessage = document.getElementById("divMessage");
const dlgMessage = document.getElementById("dlgMessage");
const imgMessage = document.getElementById("imgMessage");
const pMessage = document.getElementById("pMessage");
const btnMsgBox_Ok = document.getElementById("btnMsgBox_Ok");
const btnMsgBox_Cancel = document.getElementById("btnMsgBox_Cancel");
const txtHidden = document.getElementById("txtHidden");

//used to specify control to set focus too AFTER txtHidden
let strFocus = "";

//determines if yes or no was clicked
export let blnOk;
//specifies context for the message
export let strContext = "none";

//for messagebox
const funcMessageBoxClick_Ok = (event) => {
  dlgMessage.close();
  blnOk = true;
  //"passback" value
  txtHidden.focus();
  document.getElementById(strFocus).focus();
};

const funcMessageBoxClick_Cancel = (event) => {
  dlgMessage.close();
  blnOk = false;
  //"passback" value
  txtHidden.focus();
  document.getElementById(strFocus).focus();
};

export const objButtons = {
  ok: 1,
  yes: 2,
  confirm: 3,
  close: 4,
  no: 5,
  cancel: 6,
  none: -1,
};

export const objIcons = {
  information: 1,
  question: 2,
  exclamation: 3,
  error: 4,
};

export const funcMessageBox = (
  strText = "",
  intIcon = 1,
  intButton1 = 1,
  intButton2 = -1,
  strMsgContext = "none",
  intButtonFocus = -1,
  strFocusTo = ""
) => {
  /*
    creates a mnessage box for the user to interact with

   VARS

  strText =             message
  intIcon =             icon to show e.g. information
  intButton1 =          yes/ok etc
  intButton2 =          no.cancel etc
  strMsgContext =       default "none" could be "close" "save" etc
                        txtHidden onfocus processes this and blnOk
  intButtonFocus =      set focus to which button default = 1
                        NOTE: -1 = no button/custom button focus 
  strFocusTo = ""       set focus to a control AFTER txtHidden gets focus
                        REQUIRED 
  */
  let elTemp;

  switch (intIcon) {
    case 1:
      imgMessage.src = "../images/msgInformation.png";
      break;
    case 2:
      imgMessage.src = "../images/msgQuestion.png";
      break;
    case 3:
      imgMessage.src = "../images/msgExclamation.png";
      break;
    case 4:
      imgMessage.src = "../images/msgError.png";
      break;
  }

  switch (intButton1) {
    case 1:
      btnMsgBox_Ok.innerText = "Ok";
      break;
    case 2:
      btnMsgBox_Ok.innerText = "Yes";
      break;
    case 3:
      btnMsgBox_Ok.innerText = "Confirm";
      break;
  }

  switch (intButton2) {
    case 4:
      btnMsgBox_Cancel.innerText = "Close";
      break;
    case 5:
      btnMsgBox_Cancel.innerText = "No";
      break;
    case 6:
      btnMsgBox_Cancel.innerText = "Cancel";
      break;
  }

  //set caption
  pMessage.innerText = strText;
  //hide cancel button
  btnMsgBox_Cancel.hidden = true;

  //show buttons and set handlers
  if (intButton1 != -1) {
    btnMsgBox_Ok.hidden = false;

    if (intButtonFocus === 1) {
      btnMsgBox_Ok.autofocus = true;
    }

    //if no button 2 centre
    if (intButton2 === -1) {
      // btnMsgBox_Ok.style.setProperty("--varButtonLeft_Ok", "140px");
      btnMsgBox_Ok.style.left = "150px";
    }
    //set click handler
    btnMsgBox_Ok.addEventListener("click", funcMessageBoxClick_Ok);
  }

  if (intButton2 != -1) {
    btnMsgBox_Cancel.hidden = false;

    if (intButtonFocus === 2) {
      btnMsgBox_Cancel.autofocus = true;
    }

    //set click handler
    btnMsgBox_Cancel.addEventListener("click", funcMessageBoxClick_Cancel);
  }
  //set control to get focus after dialog closed
  strFocus = strFocusTo;
  //set context for txtHidden handler to act upon
  strContext = strMsgContext;
  //"disable" page
  elTemp = document.getElementsByTagName("html");
  elTemp[0].style.opacity = "0.3";
  //show message
  dlgMessage.showModal();
};
