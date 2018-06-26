const repository = require("../repository");

class Response {
  constructor(statusCode, body) {
    this.statusCode = statusCode;
    this.body = JSON.stringify(body);
    this.headers = {
      "Access-Control-Allow-Origin": "*"
    };
  }
}

async function findAll() {
  const userCollection = await repository.User.find();
  return new Response(200, userCollection);
}

async function create(event) {
  const creationResponse = await repository.User.create(JSON.parse(event.body));
  return new Response(201, creationResponse);
}

async function findByUserName(event) {
  const user = await repository.User.findOne({ nameOnUrl: getUsername(event) });
  return new Response(200, user);
}

async function updateByUserName(event) {
  const updateResponse = await repository.User.findOneAndUpdate(
    { nameOnUrl: getUsername(event) },
    event.body
  );
  return new Response(200, updateResponse);
}

function getUsername(event) {
  return event.pathParameters.username;
}

module.exports = {
  findAll,
  create,
  findByUserName,
  updateByUserName
};
