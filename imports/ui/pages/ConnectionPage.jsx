import React from 'react';

import  './ConnectionPageStyle.css';

import { LoginComponent } from '/imports/ui/components/LoginComponent';
import { RegisterComponent } from '/imports/ui/components/RegisterComponent';


export const ConnectionPage = () => (
  <div className="ui middle aligned center aligned grid child">
    <div className="column">
      <h1 className="ui teal image header">
        <div className="content">
          Welcome to Epsilon
        </div>
      </h1>
      <br/>
      <div className="ui large form">
        <div className="ui two column middle aligned very relaxed stackable grid">
          <LoginComponent />
          <div className="ui vertical divider">
            Or
          </div>
          <RegisterComponent />
        </div>
      </div>
    </div>
  </div>
);



