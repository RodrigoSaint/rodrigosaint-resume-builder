import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import UserCreation from "./user/components/creation";
import ResumeView from "./user/components/resume-view";

ReactDOM.render(
  <div className="ui grid centered">
    <div className="twelve wide column">
      <ResumeView />
    </div>
  </div>,
  document.getElementById("app")
);
module.hot.accept();
