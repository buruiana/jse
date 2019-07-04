import React from "react";
import 'react-sortable-tree/style.css';
import JsonFormSettingsForm from '../JsonFormSettingsForm';
import JsonFormInfoForm from '../JsonFormInfoForm';
import '../../../stylesheets/main.scss';

const Home = props => {
  return (
    <div>
      <div className='infoform'>
        <JsonFormSettingsForm />
      </div>
      <div className='infoform'>
        <JsonFormInfoForm />
      </div>
    </div>
  );
};

export default Home;
