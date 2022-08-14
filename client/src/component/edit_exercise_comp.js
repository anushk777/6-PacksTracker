import React, {useState, useEffect} from 'react';
import axios from "axios"

var moment = require('moment');

var ex_id = window.location.href.split('/').pop()

function EditExercise(props) {

    const [k1, setk1] = useState({hits:[]});

    const [exercise_details, set_exercise_details] = useState({
        username:'',
        description: '',
        duration: '',
        date:''
    })


    useEffect(() => {
        ex_id = window.location.href.split('/').pop()
        async function all_users(){
            const response = await axios.get('http://localhost:5000/users/')

            setk1({hits:[...response.data, ...k1.hits]})

        }

       all_users()

    }, [])


    useEffect(() => {

        async function users_data(){
            const response = await axios.get('http://localhost:5000/exercises/'+ex_id)

            set_exercise_details({
                username:response.data.username,
                description: response.data.description,
                duration: response.data.duration,
                date:moment(response.data.data).utc().format('YYYY-MM-DD')
            })

        }

       users_data()

    }, [])


    const formsubmit = (e) => {
        e.preventDefault();

        const exercise = {
            username: exercise_details.username,
            description: exercise_details.description,
            duration: exercise_details.duration,
            date: exercise_details.date
          }

        axios.post('http://localhost:5000/exercises/update/' + ex_id, exercise)
      .then(res => console.log(res.data));
       alert("Exercise log Updated Successfully !");
      window.location = '/'

    }

    return (
        <div>
        <h3>Edit New Exercise Log</h3>
      <form  onSubmit={formsubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
          required
          className="form-control"
          value={exercise_details.username}
          onChange={e => set_exercise_details({...exercise_details, username:e.target.value})}>

          {!k1.hits}{



            k1.hits.map(function(user) {

              return(
                <option
                key={user.username}
                value={user.username}>{user.username}
                </option>
                )
            })

          }
      </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input  id="hell" type="text"
              required
              className="form-control"
              value={exercise_details.description}
              onChange={(e) => set_exercise_details({...exercise_details,description:e.target.value})}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input
              type="text"
              className="form-control"
              value={exercise_details.duration}
              onChange={(e) => set_exercise_details({...exercise_details,duration:e.target.value})}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
          <input  type="date"
          required
          className="form-control"
          value={exercise_details.date}
          onChange={(e) => set_exercise_details({...exercise_details,date:e.target.value})}
          />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>

      </div>
    )
}

export default EditExercise;
