/*
  Note: IndexedDB does not support field sizes they are included for HTML
        data entry validation
*/

/*
  Note: IndexedDB does not support field sizes they are included for HTML
        data entry validation
*/

//**************tables schema************
"use strict";

export const aryTables = [
  {
    tblName: "CV_Colours",
    aryFields: [
      {
        fieldName: "COL_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "COL_Section",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "COL_Back",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "COL_Font",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVT_ID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
    ],
  },

  {
    tblName: "CV_Contact",
    aryFields: [
      {
        fieldName: "CVC_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "CVC_Address1",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVC_Address2",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: false,
      },
      {
        fieldName: "CVC_Address3",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: false,
      },
      {
        fieldName: "CVC_Address4",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: false,
      },
      {
        fieldName: "CVC_Landline",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 15,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVC_CellPhone",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 15,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVC_Postcode",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 15,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVC_TownCity",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 30,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVC_Email",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: true,
      },
    ],
  },

  {
    tblName: "CV_CSS",
    aryFields: [
      {
        fieldName: "CSS_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "CSS_CSS",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 4096,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CSS_CSSName",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: true,
      },
    ],
  },

  {
    tblName: "CV_CurrentFocus",
    aryFields: [
      {
        fieldName: "CVF_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "CVF_Details",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 4096,
        fieldValue: "",
        requiredField: true,
      },
    ],
  },

  {
    tblName: "CV_Education",
    aryFields: [
      {
        fieldName: "CVED_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "CVED_YearStarted",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: true,
      },
      {
        fieldName: "CVED_YearEnded",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: true,
      },
      {
        fieldName: "CVED_Where",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVED_What",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 50,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVED_Grade",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 30,
        fieldValue: "",
        requiredField: true,
      },
    ],
  },

  {
    tblName: "CV_Experience",
    aryFields: [
      {
        fieldName: "CVE_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "CVE_YearStarted",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: true,
      },
      {
        fieldName: "CVE_YearEnded",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: true,
      },
      {
        fieldName: "CVE_Where",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVE_Role",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 75,
        fieldValue: 0,
        requiredField: true,
      },
      {
        fieldName: "CVE_Responsibilities",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 4096,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVE_Achievements",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 4096,
        fieldValue: "",
        requiredField: false,
      },
    ],
  },

  {
    tblName: "CV_Highlights",
    aryFields: [
      {
        fieldName: "CVH_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "CVH_Name",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 50,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVH_Details",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 4096,
        fieldValue: "",
        requiredField: true,
      },
    ],
  },

  {
    tblName: "CV_HTML",
    aryFields: [
      {
        fieldName: "CVW_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "CVW_HTML",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 4096,
        fieldValue: "",
        requiredField: false,
      },
      {
        fieldName: "CVW_Name",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: true,
      },
    ],
  },

  {
    tblName: "CV_Images",
    aryFields: [
      {
        fieldName: "CVM_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "CVM_FileName",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: true,
      },
    ],
  },

  {
    tblName: "CV_Interests",
    aryFields: [
      {
        fieldName: "CVI_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "CVI_Name",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 50,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVI_Details",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 4096,
        fieldValue: "",
        requiredField: true,
      },
    ],
  },

  {
    tblName: "CV_Other",
    aryFields: [
      {
        fieldName: "CVO_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "CVO_Name",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 50,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVO_Details",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 4096,
        fieldValue: "",
        requiredField: false,
      },
      {
        fieldName: "CVO_WebLink",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 1024,
        fieldValue: "",
        requiredField: false,
      },
    ],
  },

  {
    tblName: "CV_PersonalInfo",
    aryFields: [
      {
        fieldName: "CVP_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "CVP_Name",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVP_Nationality",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 30,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVP_DOB",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 12,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVP_SalaryRange",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 10,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVP_Image",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 4096,
        fieldValue: "",
        requiredField: false,
      },
    ],
  },

  {
    tblName: "CV_Personality",
    aryFields: [
      {
        fieldName: "CVPP_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "CVPP_Details",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 4096,
        fieldValue: "",
        requiredField: true,
      },
    ],
  },

  {
    tblName: "CV_Responsibilites",
    aryFields: [
      {
        fieldName: "CVRR_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "CVRR_Name",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 50,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVRR_Details",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 4096,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVR_Name",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 50,
        fieldValue: "",
        requiredField: true,
      },
    ],
  },

  // {
  //   tblName: "CV_Roles",
  //   aryFields: [
  //     {
  //       fieldName: "CVR_ID",
  //       primaryKey: true,
  //       autoNumber: true,
  //       fieldSize: 0,
  //       fieldValue: 0,
  //       requiredField: false,
  //     },
  //     {
  //       fieldName: "CVR_Name",
  //       primaryKey: false,
  //       autoNumber: false,
  //       fieldSize: 50,
  //       fieldValue: "",
  //       requiredField: true,
  //     },
  //   ],
  // },

  {
    tblName: "CV_Skills",
    aryFields: [
      {
        fieldName: "CVS_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "CVS_SkillName",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 50,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVS_Details",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 4096,
        fieldValue: "",
        requiredField: true,
      },
    ],
  },

  {
    tblName: "CV_Templates",
    aryFields: [
      {
        fieldName: "CVT_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "CVT_Name",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 100,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVT_JobTitle",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "CVT_IncludeAddress",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
    ],
  },

  {
    tblName: "Link_CV_Contact",
    aryFields: [
      {
        fieldName: "LC_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LC_CVC_ID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LC_GroupID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
    ],
  },

  {
    tblName: "Link_CV_CSS",
    aryFields: [
      {
        fieldName: "LY_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LY_CSS_ID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LV__GroupID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
    ],
  },

  {
    tblName: "Link_CV_CurrentFocus",
    aryFields: [
      {
        fieldName: "LF_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LF_CVF_ID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LF_GroupID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
    ],
  },

  {
    tblName: "Link_CV_Education",
    aryFields: [
      {
        fieldName: "LE_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LE_CVED_ID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LE_GroupID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
    ],
  },

  {
    tblName: "Link_CV_Experience",
    aryFields: [
      {
        fieldName: "LX_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LX_CVE_ID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LX_GroupID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
    ],
  },

  {
    tblName: "Link_CV_Highlights",
    aryFields: [
      {
        fieldName: "LH_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LH_CVH_ID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LH_GroupID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
    ],
  },

  {
    tblName: "Link_CV_HTML",
    aryFields: [
      {
        fieldName: "LW_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LW_CVW_ID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LW__GroupID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
    ],
  },

  {
    tblName: "Link_CV_Interests",
    aryFields: [
      {
        fieldName: "LI_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LI_CVI_ID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LI_GroupID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
    ],
  },

  {
    tblName: "Link_CV_Other",
    aryFields: [
      {
        fieldName: "LO_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LO_CVO_ID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LO_GroupID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
    ],
  },

  {
    tblName: "Link_CV_PersonalInfo",
    aryFields: [
      {
        fieldName: "LP_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LP_CVP_ID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LP_GroupID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
    ],
  },

  {
    tblName: "Link_CV_Personality",
    aryFields: [
      {
        fieldName: "LPP_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LPP_CVPP_ID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LPP_GroupID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
    ],
  },

  {
    tblName: "Link_CV_Roles",
    aryFields: [
      {
        fieldName: "LR_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LR_CVR_ID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LR_GroupID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
    ],
  },

  {
    tblName: "Link_CV_Skills",
    aryFields: [
      {
        fieldName: "LS_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LS_CVS_ID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "LS_GroupID",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
    ],
  },

  {
    tblName: "Mainmenu",
    aryFields: [
      {
        fieldName: "MNU_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "MNU_Name",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: false,
      },
      {
        fieldName: "MNU_Object",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: false,
      },
      {
        fieldName: "MNU_Type",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "MNU_CVCreator",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
    ],
  },

  {
    tblName: "Seekers_Areas",
    aryFields: [
      {
        fieldName: "ARE_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "ARE_Name",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 30,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "ARE_PartialPostCode",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 5,
        fieldValue: "",
        requiredField: false,
      },
    ],
  },

  {
    tblName: "Seekers_Hours",
    aryFields: [
      {
        fieldName: "HRS_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "HRS_Hours",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 30,
        fieldValue: "",
        requiredField: true,
      },
    ],
  },

  {
    tblName: "Seekers_Jobs",
    aryFields: [
      {
        fieldName: "JOB_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "JOB_Title",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 50,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "JOB_Description",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 50,
        fieldValue: "",
        requiredField: false,
      },
      {
        fieldName: "JOB_Details",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 4096,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "JOB_DateApplied",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 12,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "JOB_DateExpires",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 12,
        fieldValue: "",
        requiredField: false,
      },
      {
        fieldName: "JOB_Status",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 20,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "JOB_PhoneNumber",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 20,
        fieldValue: "",
        requiredField: false,
      },
      {
        fieldName: "JOB_ContactName",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 30,
        fieldValue: "",
        requiredField: false,
      },
      {
        fieldName: "JOB_Direct",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "JOB_Company",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 50,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "JOB_Salary",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 10,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "JOB_TownCity",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 30,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "JOB_Postcode",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 10,
        fieldValue: "",
        requiredField: false,
      },
      {
        fieldName: "JOB_Sector",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 50,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "JOB_Type",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 30,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "JOB_Hours",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 30,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "JOB_Where",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: true,
      },
    ],
  },

  {
    tblName: "Seekers_Mailshot_Header",
    aryFields: [
      {
        fieldName: "MSH_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "MSH_MailshotName",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 50,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "MSH_CVPath",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 4096,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "MSH_EnvelopeSize",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 20,
        fieldValue: "",
        requiredField: false,
      },
      {
        fieldName: "MSH_Left",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "MSH_Top",
        primaryKey: false,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "MSH_LetterPath",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 4096,
        fieldValue: "",
        requiredField: false,
      },
      {
        fieldName: "MSH_PrintedDate",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 12,
        fieldValue: "",
        requiredField: false,
      },
      {
        fieldName: "MSH_PrintContact",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
    ],
  },

  {
    tblName: "Seekers_Mailshot_Lines",
    aryFields: [
      {
        fieldName: "MSL_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "MSL_CompanyName",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 50,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "MSL_Address1",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "MSL_Address2",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: false,
      },
      {
        fieldName: "MSL_Address3",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: false,
      },
      {
        fieldName: "MSL_Address4",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: false,
      },
      {
        fieldName: "MSL_TownCity",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 30,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "MSL_Postcode",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 15,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "MSL_Contact",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 30,
        fieldValue: "",
        requiredField: false,
      },
      {
        fieldName: "MSH_MailshotName",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 50,
        fieldValue: "",
        requiredField: true,
      },
    ],
  },

  {
    tblName: "Seekers_Sectors",
    aryFields: [
      {
        fieldName: "SEC_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "SEC_Name",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 50,
        fieldValue: "",
        requiredField: true,
      },
      {
        fieldName: "SEC_Description",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: true,
      },
    ],
  },

  {
    tblName: "Seekers_Status",
    aryFields: [
      {
        fieldName: "STA_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "STA_Status",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 30,
        fieldValue: "",
        requiredField: true,
      },
    ],
  },

  {
    tblName: "Seekers_Types",
    aryFields: [
      {
        fieldName: "TYP_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "TYP_Type",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 30,
        fieldValue: "",
        requiredField: true,
      },
    ],
  },

  {
    tblName: "Seekers_Where",
    aryFields: [
      {
        fieldName: "WHR_ID",
        primaryKey: true,
        autoNumber: true,
        fieldSize: 0,
        fieldValue: 0,
        requiredField: false,
      },
      {
        fieldName: "WHR_Where",
        primaryKey: false,
        autoNumber: false,
        fieldSize: 255,
        fieldValue: "",
        requiredField: true,
      },
    ],
  },
];
//************end tables*********

/*
  Created 19/01/2025 By Roger Williams

  holds constants for all available table names


*/
//**************table names***********

export const constCV_Colours = "CV_Colours";
export const constCV_Contact = "CV_Contact";
export const constCV_CSS = "CV_CSS";
export const constCV_CurrentFocus = "CV_CurrentFocus";
export const constCV_Education = "CV_Education";
export const constCV_Experience = "CV_Experience";
export const constCV_Highlights = "CV_Highlights";
export const constCV_HTML = "CV_HTML";
export const constCV_Images = "CV_Images";
export const constCV_Interests = "CV_Interests";
export const constCV_Other = "CV_Other";
export const constCV_PersonalInfo = "CV_PersonalInfo";
export const constCV_Personality = "CV_Personality";
export const constCV_Responsibilites = "CV_Responsibilites";
export const constCV_Roles = "CV_Roles";
export const constCV_Skills = "CV_Skills";
export const constCV_Templates = "CV_Templates";
export const constLink_CV_Contact = "Link_CV_Contact";
export const constLink_CV_CSS = "Link_CV_CSS";
export const constLink_CV_CurrentFocus = "Link_CV_CurrentFocus";
export const constLink_CV_Education = "Link_CV_Education";
export const constLink_CV_Experience = "Link_CV_Experience";
export const constLink_CV_Highlights = "Link_CV_Highlights";
export const constLink_CV_HTML = "Link_CV_HTML";
export const constLink_CV_Interests = "Link_CV_Interests";
export const constLink_CV_Other = "Link_CV_Other";
export const constLink_CV_PersonalInfo = "Link_CV_PersonalInfo";
export const constLink_CV_Personality = "Link_CV_Personality";
export const constLink_CV_Roles = "Link_CV_Roles";
export const constLink_CV_Skills = "Link_CV_Skills";
export const constMainmenu = "Mainmenu";
export const constSeekers_Areas = "Seekers_Areas";
export const constSeekers_Hours = "Seekers_Hours";
export const constSeekers_Jobs = "Seekers_Jobs";
export const constSeekers_Mailshot_Header = "Seekers_Mailshot_Header";
export const constSeekers_Mailshot_Lines = "Seekers_Mailshot_Lines";
export const constSeekers_Sectors = "Seekers_Sectors";
export const constSeekers_Status = "Seekers_Status";
export const constSeekers_Types = "Seekers_Types";
export const constSeekers_Where = "Seekers_Where";
export const constUSysRibbons = "USysRibbons";

//************end tables*********

export const constDBName = "RogsJobSeekerCRM";

export const funcGetFieldSize = (strTable = "", strFieldName = "") => {
  /*
     Created 09/01/2024 By Roger Williams

     Returns field size from array for HTML validation

  */

  //first find table
  const objResult1 = aryTables.find((objTemp) => {
    return objTemp.tblName === strTable;
  });

  //now find field
  const objResult2 = objResult1.aryFields.find((objTemp) => {
    return objTemp.fieldName === strFieldName;
  });

  return objResult2.fieldSize;
};

export const funcCreateFromSchema = (event) => {
  /*
 Creates DB from aryTables

 NOTE; indexedDB does not support field sizes so there are only two properties
       Primary Key - field name(s), is auto number
       Fields      - field name, is unique  
*/

  let fldCreate;
  let dbJobSeekerCRM = event.target.result;

  aryTables.forEach((objTable) => {
    //create table

    //create primary key
    fldCreate = dbJobSeekerCRM.createObjectStore(objTable.tblName, {
      keyPath: objTable.aryFields[0].fieldName,
      autoIncrement: true,
    });
    //create rest of fields as indexes
    objTable.aryFields.forEach((objField) => {
      //dont duplicate the primary key!
      if (objField.fieldName != objTable.aryFields[0].fieldName) {
        fldCreate.createIndex(objField.fieldName, objField.fieldName, {
          unique: false,
        });
      }
    });
  });
};

export function funcOpenDatabase() {
  let dbJobSeekerCRM;
  let dbopenRequest = indexedDB.open(constDBName, 1);

  dbopenRequest.onupgradeneeded = (event) => {
    //if no database create it from the schema file
    funcCreateFromSchema(event);
    alert("Created");
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

    //return db object
    return dbJobSeekerCRM;
  };
}

export function funcDeleteDatabase() {
  /*
    Created 10/01/2024 By Roger Williams

    if schemna.jd upgraded delete then use funcOpenDatabase
    to create again

  */

  const reqTemp = indexedDB.deleteDatabase(constDBName);

  reqTemp.onsuccess = () => {
    alert("Database Deleted From Schema");
  };
}

export function funcIndexedDBSupport() {
  return "indexedDB" in window;
}
// export const funcGetSchemaName = (strTable = "") => {
//   /*
//   Created 30/01/2025 By Roger Williams

//   checks if passed table exists if so returns name

//   used by modmodel.funcinitcomboboxes
//   */

//   //find table
//   const objResult1 = aryTables.find((objTemp) => {
//     return objTemp.tblName === strTable;
//   });

//   if (objResult1) {
//     return objResult1.tblName;
//   } else {
//     return "";
//   }
// };
export const funcGetSchema = (strTable = "") => {
  /*
  Created 10/01/2025 By Roger Williams
  
  Creates and returns an object comprising of this structure:

  
   tableName : "<value>"
   aryFields : [ 
       {
         fieldname  :  "<name>"
         fieldValue : <value>
       }
    ]

   This is used for saving data 
  */
  //find table
  const objResult1 = aryTables.find((objTemp) => {
    return objTemp.tblName === strTable;
  });

  return objResult1;
};

export function funcValidateForm(aryElements, strTable) {
  /*
  checks form INPUT elements values with schema

  Returns array of controls missing required data

*/
  let intNum = 0;
  let strName = "";
  let strValue = "";
  let aryErrors = [];

  //get schema from tables array
  const objFound = aryTables.find((objTemp) => {
    return objTemp.tblName === strTable;
  });

  for (intNum = 0; intNum < aryElements.length; intNum++) {
    //get field name
    strName = aryElements[intNum].id.substring(
      3,
      aryElements[intNum].id.length
    );

    strValue = aryElements[intNum].value;

    //see if required
    const aryResult = objFound.aryFields.find((objTemp) => {
      if (objTemp.fieldName === strName) {
        return objTemp.requiredField;
      }
    });

    //if required check length
    if (aryResult?.requiredField && strValue.length === 0) {
      //add to errors array
      aryErrors.push(aryResult);
    }
  }

  return aryErrors;
}
