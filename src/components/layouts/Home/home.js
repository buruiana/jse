import React from "react";
import "react-sortable-tree/style.css";
import isEmpty from "lodash/isEmpty";
import JsonFormSettingsForm from "../JsonFormSettingsForm";
import JsonFormInfoForm from "../JsonFormInfoForm";
import "../../../stylesheets/main.scss";

const Home = props => {
  const { currentNode } = props;
  console.log("console: currentNode", currentNode);
  const renderView = () =>
    isEmpty(currentNode) ? <JsonFormSettingsForm /> : <JsonFormInfoForm />;
  return (
    <div>
      <div className="infoform">{renderView()}</div>
    </div>
  );
};

export default Home;
