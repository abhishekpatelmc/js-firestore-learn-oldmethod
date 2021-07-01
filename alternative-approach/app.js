let name = document.getElementById("name");
let usm = document.getElementById("usn");
let department = document.getElementById("department");
let college = document.getElementById("college");

let nameVal, usnVal, departmentVal, collegeVal;

function update(val, type) {
  if (type == "name") nameVal = val;
  else if (type == "usn") usnVal = val;
  else if (type == "department") departmentVal = val;
  else if (type == "college") collegeVal = val;
}

// ================================================ firestore Configuration ========================================================
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

firebase.initializeApp(firebaseConfig);
let db = firebase.firestore();

// ------------------------------------------------- Writing Data to firestore ------------------------------------------------------

function addDocWithAutoID() {
  db.collection("students")
    .add({
      name: nameVal,
      usn: number(usnVal),
      department: departmentVal,
      college: collegeVal,
    })
    .then(function (docRef) {
      console.log("document written with ID ", docRef.id);
    })
    .catch(function (err) {
      console.log("Error adding document", err);
    });
}

// ------------------------------------------------- Button Events ----------------------------------------------------------------------

document.getElementById("insetBtn").onclick = function () {
  addDocWithAutoID();
};

document.getElementById("selectBtn").onclick = function () {};

document.getElementById("updateBtn").onclick = function () {};

document.getElementById("deleteBtn").onclick = function () {};
