const cafeList = document.querySelector("#cafe-list");
const form = document.querySelector("#add-cafe-form");

// create element and render cage
function renderCafe(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;

  li.appendChild(name);
  li.appendChild(city);

  cafeList.appendChild(li);
}

// Getting data
// db.collection(" ").get ==> it is async function it takes sometime to retrive data so we cant store in variable instead we use .then which performs after the db.collection().get opernation is performed
// db.collection("cafes")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => {
//       console.log(doc.data());
//       renderCafe(doc);
//     });
//     // console.log(snapshot.docs);
//   });

// Getting Data Realtime
db.collection("cafes")
  .orderBy("city")
  .onSnapshot((snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach((change) => {
      if (change.type == "added") {
        renderCafe(change.doc);
      } else if (change.type == "removed") {
        let li = cafeList.querySelector("[data-id=" + cahange.doc.id + "]");
        cafeList.removeChild(li);
      }
    });
  });

//  Saving data
form.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("Cafes").add({
    name: form.name.value,
    city: form.city.value,
  });
});

// To update or edit data in firestore
db.collection("cafes").doc("JMYuI6fClRCf0lTLQ").update({
  city: "Mysuru",
});
// update will update the perticular property - but set will completely set the value
