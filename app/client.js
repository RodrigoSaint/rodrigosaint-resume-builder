import React from "react";
import ReactDOM from "react-dom";

import UserCreation from "./user/components/creation";

ReactDOM.render(
  <div class="ui grid centered">
    <div class="twelve wide column">
      <UserCreation />
    </div>
  </div>,
  document.getElementById("app")
);
module.hot.accept();
