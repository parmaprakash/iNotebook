import React, { useState, useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";

const Signup = (props) => {
    let history = useHistory();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
    useEffect(() => {
        if (localStorage.getItem('auth-token')) {
            props.showAlert("You have to Logout before making new account !", "danger");
            history.push("/")
        }
        // eslint-disable-next-line
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (credentials.cpassword === credentials.password) {
            //API Call
            const response = await fetch(`http://localhost:5000/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
            });
            const json = await response.json();
            if (json.success) {
                //save the auth token and redirect
                // localStorage.removeItem("auth-token");
                props.showAlert("Account Created successfully", "success");
                history.push("/login");
            }
            else {
                props.showAlert(json.error, "danger");
            }
        }
        else {
            props.showAlert("Password and confirm password must same.", "danger");
        }

    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="container mt-3">
            <h2>Create an Account to use iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Enter your Name</label>
                    <input type="text" onChange={onChange} value={credentials.name} className="form-control" id="name" name="name" placeholder="Enter username" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" onChange={onChange} value={credentials.email} className="form-control" id="email" name="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={onChange} value={credentials.password} className="form-control" id="password" name="password" placeholder="Password" />
                </div>
                <div className="form-group">
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input type="password" onChange={onChange} value={credentials.cpassword} className="form-control" id="cpassword" name="cpassword" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary my-2">Submit</button>
            </form>
            <div className="my-3">
                <h6>Have iNotebook Account ?? <Link to="/login">Login here...</Link></h6>
            </div>
        </div>
    )
}

export default Signup
