import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { HashRouter, Route } from "react-router-dom";

import UserForm from "./user/components/form";
import ResumeView from "./user/components/resume-view";
import Homepage from "./homepage";
import Menu from "./menu";

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route path="/" exact component={Homepage} />
      <div id="page-content" className="ui grid centered">
        <div className="thirteen wide column">
          <Route path="/signin" component={UserForm} />
          <Route
            path="/resume/:username"
            render={props => <ResumeView {...props.match.params} />}
          />
          <Route
            path="/:username/edit"
            render={props => <UserForm {...props.match.params} />}
          />
        </div>
      </div>
    </div>
  </HashRouter>,
  document.getElementById("app")
);
module.hot.accept();
