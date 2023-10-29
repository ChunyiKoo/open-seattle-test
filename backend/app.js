const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());

app.use(
 cors({
  origin: "*",
  //origin: ["http://localhost:8081", "http://localhost:5000"],
  credentials: true, // allow sending and receiving cookies
 })
);

// app.use((req, res, next) => {
//  console.log(__dirname);
//  next();
// });

app.get("/", (req, res) => {
 // Define the path to the JSON file
 const filePath = path.join(__dirname, "data.json");
 // Read the file and send it as a response
 // Read the existing JSON data from the file
 fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
   return res.status(500).send("Error reading JSON file");
  }

  // Parse the existing data into a JavaScript object
  const jsonData = JSON.parse(data);

  // // Update the JSON data with the new data from the request body
  // jsonData.someKey = req.body.updatedValue; // Modify as needed

  // // Convert the updated data back to a JSON string
  // const updatedJson = JSON.stringify(jsonData, null, 2);

  // // Write the updated JSON data back to the file
  // // fs.writeFile(filePath, updatedJson, 'utf8', (err) => {
  // //   if (err) {
  // //     return res.status(500).send('Error writing JSON file');
  // //   }

  // //   res.send('JSON file updated successfully');
  // // });
  res.status(200);
  res.json(jsonData.donations);
 });
});

app.post("/donations", (req, res) => {
 const newDonation = req.body;

 // Define the path to the JSON file
 const filePath = path.join(__dirname, "data.json");
 // Read the file and send it as a response
 // Read the existing JSON data from the file
 fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
   return res.status(500).send("Error reading JSON file");
  }

  // Parse the existing data into a JavaScript object
  const jsonData = JSON.parse(data);

  const nextId = parseInt(jsonData.nextId);
  newDonation.id = nextId;

  //Update the JSON data with the new data from the request body
  jsonData.donations.push(newDonation); // Modify as needed
  jsonData.nextId = nextId + 1;
  const updatedJson = JSON.stringify(jsonData, null, 2);
  //Convert the updated data back to a JSON string

  //Write the updated JSON data back to the file
  fs.writeFile(filePath, updatedJson, "utf8", (err) => {
   if (err) {
    return res.status(500).send("Error writing JSON file");
   }

   //res.send("JSON file updated successfully");

   res.json(newDonation);
  });
 });
});

if (require.main === module) {
 // require.main === module: This condition checks if the current module is the main module being executed. In other words, it checks whether the current script is being run directly using the node command.
 const port = 8081;
 app.listen(port, () => console.log("Server is listening on port", port));
} else {
 module.exports = app;
 //When the condition is false (i.e., the script is required as a module in another script), it exports the app object. This allows other scripts to use the app object, typically for setting up routes and middleware for an Express.js application.
}
