const express = require("express");
const path = require("path");

//*importing mongoose config file
const db = require("./config/mongoose");

//*importing module with which we can interact with collection created in the contact.js
const Contact = require("./models/contact");

const app = express();
app.listen(8000, () => console.log("Express Server is Running! "));
app.get("/home", (req, res) => res.send("<h1>Yay! Its Workin :) on home</h1>"));
// app.get("/", (req, res) => res.send("<h1>Yay! Its Workin :) on landing</h1>"));

// ! setting up the viewEngine

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* app.get("/", (req, res) => {
  return res.render("home", { title: "Contact List Page!" });
}); */

app.get("/practice", (req, res) => {
  return res.render("practice", { title: "Practice Page" });
});

//starting with contact list app

//*creating contacts array which will be storing our data for all contacts.
//*each contact is a object with name and phoneNo

var contactList = [
  { name: "Gaurav", phoneNo: "1290381204" },
  { name: "Akshay", phoneNo: "1234567890" },
  { name: "Rucha", phoneNo: "10923019233" },
];

//*now with app.get we set the context of the ejs page with contact-list set as above array.
//*we will use the contact-list in ejs file and loop over it to get the all the contact and display it on browser

app.get("/", (req, res) => {
  //! using mongodb to render the contacts

  Contact.find({})
    .then((contacts) => {
      return res.render("home", {
        title: "Contact_list",
        contact_list: contacts,
      });
    })
    .catch((err) => {
      console.log("error while fetching the contacts!");
      return;
    });

  //*old way to render the contact when we used array stored locally named contactList.

  /*   return res.render("home", {
    title: "Contact List",
    contact_list: contactList,
  }); */
});

//*using middleware to decode the data sent by browser.
//*It will be stored in req under body.

app.use(express.urlencoded());

//*we can chain multiple middlewares like this -

/*app.use((req, res, next) => {
  console.log("middleware 1 called !");
  next();
});
app.use((req, res, next) => {
  console.log("middleware 2 called !");
  console.log("--------------------------");
  next();
}); */

//*using middleware to serve static files such as css, js and images
//*app will look for static files inside the assets folder.

app.use(express.static("assets"));

//*accepting the data from Form from browser

app.post("/create-contact", (req, res) => {
  /*  contactList.push(req.body);
  return res.redirect("back"); */

  //!using mongodb to store the contacts
  //as usual getting the data from req.body which was decoded by 'app.use(express.urlencoded());' and stored in body object.
  Contact.create({
    name: req.body.name,
    phoneNo: req.body.phoneNo,
  })
    // .then((data) => console.log(data))
    .catch((err) => console.log(err));

  return res.redirect("back");

  /*
    (err, newContact) => {
      if (err) {
        console.log("Error occured while creating the contact!");
      }
      console.log(
        "--------------- \n",
        "Created following contact :- \n",
        newcontact,
        "---------------"
      );

      return res.redirect("back");
    }
  ); */
});

//*deleting a contact -

app.get("/delete-contact/", (req, res) => {
  //! deleting from database using deleteOne function. We got the id of a document to be deleted from click of on a tag (from ejs file).

  let contactToBeDeleted = req.query.id;
  Contact.deleteOne({ _id: contactToBeDeleted })
    // .then((result) => console.log(result))
    .catch((err) => console.log(err));
  return res.redirect("back");

  //! previously we got the phone number from click on a tag and compared it to stored array and deleted using splice function.

  /* let phoneToDelete = req.query.phoneNo;
  let indexToDelete = contactList.findIndex(
    (contact) => contact.phoneNo == phoneToDelete
  );
  if (indexToDelete != -1) {
    contactList.splice(indexToDelete, 1);
  }
  return res.redirect("back"); */
});
