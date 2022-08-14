import React, {useState} from 'react';
import axios from  "axios";

function CreateUser() {

    const [username, setusername] = useState('');

    const createUser = (e) => {
        e.preventDefault()

        if(username){
            const user = {username:username}
            axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));
             alert('New User Created !');
            setusername('')
        }
    }

    return (
        <div>
        <h3>Create New User</h3>
        <form onSubmit={createUser}>
          <div className="form-group">
            <label>Username: </label>
            <input  type="text"
                required
                className="form-control"
                value={username}
                onChange={e => setusername(e.target.value)}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" className="btn btn-primary" />
          </div>
        </form>
        </div>
    )
}

export default CreateUser;
