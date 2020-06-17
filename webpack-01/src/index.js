// const json = require("./index.json");
// import { add } from "./other";
// import "./index.css";

// console.log(json, add(2, 3));
import pic from "./logo.png";

var img = new Image();
img.src = pic;

var root = document.getElementById("root");
root.append(img);