import React from "react";

const Home = props => {
  const navigate = e => {
    props.history.push(e.target.id);
  };

  const addNewModal = () => props.addModal("TEST_MODAL");

  return (
    <div>
      <p>
        <a onClick={addNewModal}>Modal</a>
      </p>
      <p>
        <img src="recipes.jpg" />
      </p>
    </div>
  );
};

export default Home;
