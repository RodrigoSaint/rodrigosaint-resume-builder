const AssistantV1 = require("watson-developer-cloud/assistant/v1");
const { Response } = require("../lambda");
const dotenv = require("dotenv");
dotenv.load();

const watsonAssistant = new AssistantV1({
  version: "2018-02-16",
  iam_apikey: process.env.iam_apikey,
  url: "https://gateway-wdc.watsonplatform.net/assistant/api"
});

function getIntent(text) {
  return new Promise((resolve, reject) => {
    watsonAssistant.message(
      {
        workspace_id: process.env.workspace_id,
        input: { text }
      },
      (err, response) => {
        resolve(response.intents[0]);
      }
    );
  });
}

async function message(event) {
  const intent = await getIntent(event.body);
  const actions = {
    greeting: () =>
      new Response(
        200,
        "Hello! I am {username}'s bot. I am here to help you to tell a little bit more about {username}. What would you like to know?"
      ),
    introduce: () =>
      new Response(
        200,
        "My name is Rodrigo Santos da Silva and I'm 23 years old. I've started programming when I was 12, and since then I didn't stop. I've learned C#, Node, Typescript, Mongo, Cordova, SQL, Vue.js, React and Angular2^. I'm a good developer and I'm always interested to learn new things."
      ),
    "recruiter-introduction": () => new Response(200, "Hi {recruiter}"),
    skills: () => new Response(200, "I know many stuff"),
    "experience-time": () => new Response(200, "I have 5 years of experience"),
    "current-experience": () => new Response(200, "I work at talk telecom")
  };

  return intent
    ? actions[intent.intent]()
    : new Response(200, "I couldn't understand you. Could you re-phrase it?");
}

module.exports = {
  message
};
