import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { HashRouter, Route, Switch } from "react-router-dom";

import UserCreation from "./user/components/creation";
import ResumeView from "./user/components/resume-view";

ReactDOM.render(
  <div className="ui grid centered">
    <div className="twelve wide column">
      <HashRouter>
        <Switch>
          <Route path="/signin" component={UserCreation} />
          <Route
            path="/:username"
            render={props => <ResumeView {...props.match.params} />}
          />
        </Switch>
      </HashRouter>
    </div>
  </div>,
  document.getElementById("app")
);
module.hot.accept();
