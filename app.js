import express from "express";
const app = express();
import path from "path";
import { fileURLToPath } from "url";
import fetch from "node-fetch";

const __filename = fileURLToPath(import.meta.url);
import fs from "fs";
const __dirname = path.dirname(__filename);
app.use(express.static(__dirname + "/public"));
app.use(
  "/build/",
  express.static(path.join(__dirname, "node_modules/three/build"))
);
app.use(
  "/jsm/",
  express.static(path.join(__dirname, "node_modules/three/examples/jsm"))
);

app.listen(3000, () => console.log("Visit http://127.0.0.1:3000"));
var data = fs
  .readFileSync("./span.csv")
  .toString() // convert Buffer to string
  .split("\n") // split string to lines
  .map((e) => e.trim()) // remove white spaces for each line
  .map((e) => e.split(",").map((e) => e.trim())); // split each line to array

// console.log(data)
var array_x_coordinate = [];
var array_y_coordinate = [];
var array_z_coordinate = [];
// let regExpLiteral = /(.*?)\)/
for (let step = 1; step < data.length - 1; step++) {
  let x_coordinate = parseFloat(data[step][0]);
  let y_coordinate = parseFloat(data[step][1]);
  let z_coordinate = parseFloat(data[step][2]);
  let i = step - 1;
  array_x_coordinate[i] = x_coordinate;
  array_y_coordinate[i] = y_coordinate;
  array_z_coordinate[i] = z_coordinate;
}

//   console.log(array_x_coordinate)
//   console.log(array_y_coordinate)
//   console.log(array_z_coordinate)
// console.log(array_x_coordinate.length)
app.get("/get_coordinates", function (req, res) {
  res
    .status(200)
    .json({
      x: array_x_coordinate,
      y: array_y_coordinate,
      z: array_z_coordinate,
    });
});

let payload;
payload =
  {"name":"Adrian","point1":[1.0,0.0,1.0],"point2":[5.5,0.0,0.80],"point3":[10.0,0.0,1.0],"end1":[0.0,0.0],"end2":[13.0,0.0],"points":[[0.14205182496663768, 0.1416422571787171, 1.289745124140968], [1.4386806338732994, 0.08171185677596166, 0.9968232823854244], [2.606386932650505, 0.14524071584300963, 0.9091032145129639], [3.9024174722867477, 0.05100926825328858, 0.836107831994011], [5.2, 0.0, 0.8008888888888884], [0.18452639447233454, 0.016481756363204546, 0.12598245516955564], [6.628501806586528, 0.06232067652426459, 0.912815666366341], [7.991125030444873, 0.006444662550676661, 0.893470094909051], [9.295854230022295, 0.06958201296267601, 1.0863089765693248], [10.44955441877392, 0.18160986267224682, 1.0861536377990944], [11.831377163634771, 0.08944660591696114, 1.3384475677288492], [13.17625843207497, 0.08630473695477231, 1.4782954519065932]]};
let data_out={};
// function createGist(opts) {
//   // console.log("Posting request to GitHub API...");
//   fetch("http://localhost:80/jsonpayload", {
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     method: "post",
//     body: JSON.stringify(opts),
//   }).then((response) => response.json()
//   )
//   .then((data) => console.log(data));
//     // .then(function (data) {
//     //   console.log("Created Gist:", data.html_url);
//     // });
// }
// createGist(payload);
let data1
async function getResponse() {
	const response = await fetch(
		'http://localhost:80/jsonpayload',
		{
			method: 'post',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(payload)
		}
	);
	if (!response.ok) {
		throw new Error(`HTTP error! status: ${response.status}`);
	}
	const data_res = await response.json();
  data1=data_res
  // console.log(data_res)
  console.log(typeof data1)
  console.log(data1.catPoints)
  app.get("/catPoints", function (req, res) {
    res
      .status(200)
      .json(data1);
  });
}

getResponse()
// console.log( await console.log(data1) );


