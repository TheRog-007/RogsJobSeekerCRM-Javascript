What Is It?
===========

This is the JavaScript version of my JobseekersCRM using IndexedDB!

Yes this the conversion of a MSAccess database into JavaScript


Strategy and Construction
-------------------------

- IndexedDB used for portability
- Uses same table structure as the MS Access original
- MVC structure in EACH form
- global schema module which has the table layouts for every table which also includes:
  if field *required
  if field primary key
  if field autonumber
  field value -> populated during load data for undo functionality
  field size -> for text boxes used to ensure data entered does not exceed this length
- schema passes back a table schema which form can use for checking required fields 
  completed and for undo of changes to existing record as well as text field length
  enforcement 

*Required fields have red labels on forms this is done from the schema table in the modView
 PER form

- Uses my RogTab control to show the forms (web pages) in iFrames
- Uses global and local CSS files
- Uses RogMessageBox to show Windows style messageboxes
- Each form has its own CSS used absolute position INITIALLY as this is a desktop only
  application (currently around 1180x800) and I was more focused on getting it to work
  properly behind the scenes than spending time making it look aesthetically pretty!

Schema module provides:

An array of objects for each table and its fields in the system with extra field properties
as describe above, typical table example from the array:

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

Note: this array was created in MS Access using a custom written routine to extract the
      field properties and add the extra ones to a text file in JavaScript array format!

Schema module also holds constant vars for each table name e.g.:

export const constSeekers_Where = "Seekers_Where";

Schema module has following functions:

funcGetFieldSize - returns field size from the table array
funcCreateFromSchema - created the indexedDB database from the tables array
funcOpenDatabase - opens the indexedDB and passes back a var for the open database
                   Note: this function is also in each modModel module for each form
funcDeleteDatabase - for testing purposes deletes the indexedDB
funcIndexedDBSupport - checks for indexedDB support
funcGetSchema - used by every modModel in every form on start to get table form "bound" to
                Note: mailshots creator form uses TWO schemas mailshot_Header and mailshot_Lines
funcValidateForm - validates INPUT elements against the schema e.g. check if required fields
                   and if so do they have any data?

Currently viewport is 1024x1366