import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom";
import Home from "../components/layouts/Home";
import configureStore, { history } from "../redux/store";

const store = configureStore();
const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <Home history={history} />
    </Provider>,
    document.getElementById("react-root")
  );
};

render();
