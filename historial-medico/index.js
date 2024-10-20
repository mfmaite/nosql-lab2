const express = require("express");
const cors = require("cors");
const bp = require("body-parser");
const routerApi = require("./routes");
const path = require('path');

let app = express();
// const whitelist = [
//   { dominio: "http://localhost:8080"},
//   { dominio: "http://localhost:80"},
//   { dominio: "http://localhost:5500"},
//   { dominio: "http://192.168.1.21:5500"},
//   { dominio: "http://127.0.0.1:5500"}
// ];

const options = {
  origin: (origin, callback) => {
    // let valid_origin = false;
    // console.log("Intento de conexion de: ", origin);
    // for (let index = 0; index < whitelist.length; index++) {
      // if (whitelist[index].dominio.includes(origin)) {
       let valid_origin = true;
      // }
    // }
    if (valid_origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido " + origin));
    }
  },
};

app.use(cors(options));

app.use(function customErrorHandler(err, req, res, next) {
  if (err) {
    res.status(400).send("Algo salio mal " + req.headers.origin);
  } else {
    next();
  }
});


app.use(express.static(path.join(__dirname, 'public')));
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

app.listen(3000, () =>
  console.log("Express server is runnig at port no : 3000"),
);

routerApi(app);