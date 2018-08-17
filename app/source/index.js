import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { HashRouter, Route } from "react-router-dom";

import UserForm from "./user/components/form";
import TalentDisplay from "./user/components/talent-display";
import ResumeView from "./user/components/resume-view";
import Homepage from "./homepage";
import Menu from "./menu";

function ShowMainPage() {
  if (window.location.hash == "#/") return null;
  return (
    <div id="page-content" className="ui grid centered">
      <div className="fifteen wide column">
        <Route path="/signin" component={UserForm} />
        <Route
          path="/resume/:username"
          render={props => <ResumeView {...props.match.params} />}
        />
        <Route
          path="/:username/edit"
          render={props => <UserForm {...props.match.params} />}
        />
        <Route path="/talents" component={TalentDisplay} />
      </div>
    </div>
  );
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route path="/" exact component={Homepage} />
      <ShowMainPage />
    </div>
  </HashRouter>,
  document.getElementById("app")
);

module.hot.accept();
