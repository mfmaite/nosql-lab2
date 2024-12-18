import cors from 'cors';
import pkg from 'body-parser';
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routerApi from './routes/index.js';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const whitelist = [
//   { dominio: "http://localhost:8080"},
//   { dominio: "http://localhost:80"},
//   { dominio: "http://localhost:5500"},
//   { dominio: "http://192.168.1.21:5500"},
//   { dominio: "http://127.0.0.1:5500"}
// ];

const options = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allowed?: boolean) => void
  ) => {
    // Uncomment this to limit origins
    // let valid_origin = false;
    // console.log("Intento de conexion de: ", origin);
    // for (let index = 0; index < whitelist.length; index++) {
    //   if (whitelist[index].dominio.includes(origin)) {
    //    let valid_origin = true;
    //   }
    // }

    const valid_origin = true;

    if (valid_origin) {
      callback(null, true);
    } else {
      callback(new Error("no permitido " + origin));
    }
  },
};

app.use(cors(options));

app.use(function customErrorHandler(
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (err) {
    res.status(400).send("Algo salio mal " + req.headers.origin);
  } else {
    next();
  }
});


app.use(express.static(join(__dirname, 'public')));
app.use(pkg.json());
app.use(pkg.urlencoded({ extended: true }));

app.listen(3000, () =>
  console.log("Express server is runnig at port no : 3000"),
);

routerApi(app);
