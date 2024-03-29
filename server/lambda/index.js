class Response {
  constructor(statusCode, body) {
    this.statusCode = statusCode;
    this.body = JSON.stringify(body);
    this.headers = {
      "Access-Control-Allow-Origin": "*"
    };
  }
}

module.exports = {
  Response
};
