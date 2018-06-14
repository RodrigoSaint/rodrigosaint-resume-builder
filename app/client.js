import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import UserCreation from "./user/components/creation";

ReactDOM.render(
  <div className="ui grid centered">
    <div className="twelve wide column">
      <UserCreation />
    </div>
  </div>,
  document.getElementById("app")
);
module.hot.accept();
