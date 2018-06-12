import express from "express";
import repository from "./repository";
import bodyParser from "body-parser";

const mainApplication = express();
mainApplication.use(bodyParser.json());

mainApplication.get("/", (request, response) => {
  response.send("Hello world");
});

mainApplication.get("/user", (request, response) => {
  repository.User.find()
    .then(userCollection => response.status(200).send(userCollection))
    .catch(() => response.status(500));
});

mainApplication.get("/user/:id", (request, response) => {
  repository.User.findById(request.params.id)
    .then(userCollection => response.status(200).send(userCollection))
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
