import express from "express";
import repository from "./repository";
import bodyParser from "body-parser";
import cors from "cors";

const mainApplication = express();
mainApplication.use(bodyParser.json());
mainApplication.use(cors());

mainApplication.get("/", (request, response) => {
  response.send("Hello world");
});

mainApplication.get("/user", (request, response) => {
  repository.User.find()
    .then(userCollection => response.status(200).send(userCollection))
    .catch(() => response.status(500));
});

mainApplication.get("/user/:username", (request, response) => {
  repository.User.findOne({ nameOnUrl: request.params.username })
    .then(user => response.status(200).send(user))
    .catch(() => response.status(500));
});

mainApplication.put("/user/:username", (request, response) => {
  repository.User.findOneAndUpdate(
    { nameOnUrl: request.params.username },
    this.body
  )
    .then(user => response.status(200).send(user))
    .catch(() => response.status(500));
});

mainApplication.post("/user", (request, response) => {
  repository.User.create(request.body)
    .then(() => response.status(201).send())
    .catch(() => response.status(500).send());
});

mainApplication.listen(8000, () => {
  console.log("I am listening");
});
