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
      },
      {
        fieldName: "COL_Section",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "COL_Back",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "COL_Font",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVT_ID",
        primaryKey: false,
        autoNumber: true,
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
      },
      {
        fieldName: "CVC_Address1",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVC_Address2",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVC_Address3",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVC_Address4",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVC_Landline",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVC_CellPhone",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVC_Postcode",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVC_TownCity",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVC_Email",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "CSS_CSS",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CSS_CSSName",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "CVF_Details",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "CVED_YearStarted",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVED_YearEnded",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVED_Where",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVED_What",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVED_Grade",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "CVE_YearStarted",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVE_YearEnded",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVE_Where",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVE_Role",
        primaryKey: false,
        autoNumber: true,
      },
      {
        fieldName: "CVE_Responsibilities",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVE_Achievements",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "CVH_Name",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVH_Details",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "CVW_HTML",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVW_Name",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "CVM_FileName",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "CVI_Name",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVI_Details",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "CVO_Name",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVO_Details",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVO_WebLink",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "CVP_Name",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVP_Nationality",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVP_DOB",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVP_SalaryRange",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVP_Image",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "CVPP_Details",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "CVRR_Name",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVRR_Details",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVR_ID",
        primaryKey: false,
        autoNumber: true,
      },
    ],
  },

  {
    tblName: "CV_Roles",
    aryFields: [
      {
        fieldName: "CVR_ID",
        primaryKey: true,
        autoNumber: true,
      },
      {
        fieldName: "CVR_Name",
        primaryKey: false,
        autoNumber: false,
      },
    ],
  },

  {
    tblName: "CV_Skills",
    aryFields: [
      {
        fieldName: "CVS_ID",
        primaryKey: true,
        autoNumber: true,
      },
      {
        fieldName: "CVS_Name",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVS_Details",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "CVT_Name",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVT_JobTitle",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "CVT_IncludeAddress",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "LC_CVC_ID",
        primaryKey: false,
        autoNumber: true,
      },
      {
        fieldName: "LC_GroupID",
        primaryKey: false,
        autoNumber: true,
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
      },
      {
        fieldName: "LY_CSS_ID",
        primaryKey: false,
        autoNumber: true,
      },
      {
        fieldName: "LV__GroupID",
        primaryKey: false,
        autoNumber: true,
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
      },
      {
        fieldName: "LF_CVF_ID",
        primaryKey: false,
        autoNumber: true,
      },
      {
        fieldName: "LF_GroupID",
        primaryKey: false,
        autoNumber: true,
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
      },
      {
        fieldName: "LE_CVED_ID",
        primaryKey: false,
        autoNumber: true,
      },
      {
        fieldName: "LE_GroupID",
        primaryKey: false,
        autoNumber: true,
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
      },
      {
        fieldName: "LX_CVE_ID",
        primaryKey: false,
        autoNumber: true,
      },
      {
        fieldName: "LX_GroupID",
        primaryKey: false,
        autoNumber: true,
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
      },
      {
        fieldName: "LH_CVH_ID",
        primaryKey: false,
        autoNumber: true,
      },
      {
        fieldName: "LH_GroupID",
        primaryKey: false,
        autoNumber: true,
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
      },
      {
        fieldName: "LW_CVW_ID",
        primaryKey: false,
        autoNumber: true,
      },
      {
        fieldName: "LW__GroupID",
        primaryKey: false,
        autoNumber: true,
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
      },
      {
        fieldName: "LI_CVI_ID",
        primaryKey: false,
        autoNumber: true,
      },
      {
        fieldName: "LI_GroupID",
        primaryKey: false,
        autoNumber: true,
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
      },
      {
        fieldName: "LO_CVO_ID",
        primaryKey: false,
        autoNumber: true,
      },
      {
        fieldName: "LO_GroupID",
        primaryKey: false,
        autoNumber: true,
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
      },
      {
        fieldName: "LP_CVP_ID",
        primaryKey: false,
        autoNumber: true,
      },
      {
        fieldName: "LP_GroupID",
        primaryKey: false,
        autoNumber: true,
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
      },
      {
        fieldName: "LPP_CVPP_ID",
        primaryKey: false,
        autoNumber: true,
      },
      {
        fieldName: "LPP_GroupID",
        primaryKey: false,
        autoNumber: true,
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
      },
      {
        fieldName: "LR_CVR_ID",
        primaryKey: false,
        autoNumber: true,
      },
      {
        fieldName: "LR_GroupID",
        primaryKey: false,
        autoNumber: true,
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
      },
      {
        fieldName: "LS_CVS_ID",
        primaryKey: false,
        autoNumber: true,
      },
      {
        fieldName: "LS_GroupID",
        primaryKey: false,
        autoNumber: true,
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
      },
      {
        fieldName: "MNU_Name",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "MNU_Object",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "MNU_Type",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "MNU_CVCreator",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "ARE_Name",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "ARE_PartialPostCode",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "HRS_Hours",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "JOB_Title",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "JOB_Description",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "JOB_Details",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "JOB_DateApplied",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "JOB_DateExpires",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "JOB_Status",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "JOB_PhoneNumber",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "JOB_ContactName",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "JOB_Direct",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "JOB_Company",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "JOB_Salary",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "JOB_TownCity",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "JOB_Postcode",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "JOB_Sector",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "JOB_Type",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "JOB_Hours",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "JOB_Where",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "MSH_MailshotName",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "MSH_CVPath",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "MSH_EnvelopeSize",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "MSH_Left",
        primaryKey: false,
        autoNumber: true,
      },
      {
        fieldName: "MSH_Top",
        primaryKey: false,
        autoNumber: true,
      },
      {
        fieldName: "MSH_LetterPath",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "MSH_PrintedDate",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "MSH_PrintContact",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "MSL_CompanyName",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "MSL_Address1",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "MSL_Address2",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "MSL_Address3",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "MSL_Address4",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "MSL_TownCity",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "MSL_Postcode",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "MSL_Contact",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "MSH_ID",
        primaryKey: false,
        autoNumber: true,
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
      },
      {
        fieldName: "SEC_Name",
        primaryKey: false,
        autoNumber: false,
      },
      {
        fieldName: "SEC_Description",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "STA_Status",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "TYP_Type",
        primaryKey: false,
        autoNumber: false,
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
      },
      {
        fieldName: "WHR_Where",
        primaryKey: false,
        autoNumber: false,
      },
    ],
  },
];
//************end tables*********
