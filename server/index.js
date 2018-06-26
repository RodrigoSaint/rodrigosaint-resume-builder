const Repository = require("./repository");
Repository.User.getUserSummary("5b2287d9551af0261c80c13f")
  .then(result => console.log(result))
  .catch(error => console.log(error));
