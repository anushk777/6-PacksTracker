import React from "react"
import {BrowserRouter as Router, Route} from "react-router-dom"
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

import Navbar from "./component/navbar_comp";
import ExercisesList from "./component/exercises_list_comp";
import EditExercise from "./component/edit_exercise_comp";
import CreateExercise from "./component/create_exercise";
import CreateUser from "./component/create_user_comp"




function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact>
          <ExercisesList />
        </Route>

        <Route path="/edit/:id">
          <EditExercise />
        </Route>

        <Route path = "/create">
          <CreateExercise />
        </Route>

        <Route path="/user">
          <CreateUser />
        </Route>
      </div>
    </Router>
  );
}

export default App;
