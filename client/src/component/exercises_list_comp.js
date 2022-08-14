import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";


var moment = require('moment');

const ExercisesList = () => {

    const [k1, setk1] = useState({hits:[]});

    useEffect(() => {

        async function all_exercises(){
            const response = await axios.get('http://localhost:5000/exercises/')


            setk1({hits:[...response.data]})

        }

       all_exercises()

    }, [])

    const deleteExercise = (id) => {

        axios.delete('http://localhost:5000/exercises/'+id)
        .then(response => { console.log(response.data)});

        setk1({
            hits: k1.hits.filter(exercise => exercise._id !== id)
        })
        alert('Exercise Record Deleted Successfully !');
    }


    return (
        <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>

          {!k1.hits.length}{

            k1.hits.map((exercise) =>  {



                return(
                    <tr key={exercise._id}>

                        <td>{exercise.username}</td>
                        <td>{exercise.description}</td>
                        <td>{exercise.duration}</td>
                        <td>{moment(exercise.date).utc().format('MM/DD/YYYY')}</td>
                        <td>
                        <Link to={"/edit/"+exercise._id}>Edit</Link> | <a href="#" onClick={() => {deleteExercise(exercise._id)}}>Delete</a>
                        </td>
                    </tr>
                )}
            )
          }

          </tbody>
        </table>
        </div>
    )
}

export default ExercisesList;
