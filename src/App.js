import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import QualificationsList from "./components/qualifications-list.component";
import EditQualification from "./components/edit-qualification.component";
import CreateQualification from "./components/create-qualification.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={QualificationsList} />
        <Route path="/edit/:id" component={EditQualification} />
        <Route path="/qualification" component={CreateQualification} />
      </div>
    </Router>
  );
}

export default App;
