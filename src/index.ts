import express, { Application } from "express";
import morgan from "morgan";
import Router from "./routes";
import swaggerUi from "swagger-ui-express";
import { WhatsappWeb } from "./whatsapp-web";


const PORT = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const app: Application = express();

// inicia el cliente whatsapp web js
WhatsappWeb.Inicia();


app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
  );
app.use(Router);

app.listen(+PORT,'0.0.0.0', () => {
  console.log("Server is running on port", PORT);
});