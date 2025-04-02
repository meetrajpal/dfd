import './css/login.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import urls from '../config/url.json';
import { decodeToken } from "../utils/decodeToken";

export default function Login() {
    const formData = new URLSearchParams();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function handleUsername(event) {
        setUsername(event.target.value);
    }

    function handlePassword(event) {
        setPassword(event.target.value);
    }

    async function submitLogin(event) {
        event.preventDefault();
        const uri = urls.find(data => data.operationType === 'postLogin')?.url;
        if (uri == null) {
            window.alert("No uri found for postlogin.");
            return;
        }
        try {
            formData.append("username", username);
            formData.append("password", password);
            const res = await axios.post(process.env.REACT_APP_API_URL + uri, formData, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            });
            const data = res.data;
            if (data.access_token) {
                localStorage.setItem('token', data.access_token);
                const token = decodeToken(localStorage.getItem('token'));
                localStorage.setItem('username', token.sub);
                localStorage.setItem('user_id', token.id);
                navigate('/dashboard');
            } else {
                setError(data.message);
            }
        } catch (error) {
            if (!error.response.data.isSuccess) {
                setError(error.response.data.errorResDto.details);
            } else if (error.request) {
                setError("No response from server");
            } else {
                setError("Error: " + error.message);
            }
        }
    }

    return (
        <div className="content">
            <div className="container">
                <div className="row">
                    <div className="col-md-6 contents">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                {error ? <div className="alert alert-danger mb-4 text-center" role="alert">
                                    {error}
                                </div> : ""}
                                <div className="mb-4">
                                    <h3>Welcome back!</h3>
                                    <p className="mb-4">Happy to see you again</p>
                                </div>
                                <form onSubmit={submitLogin}>
                                    <div className="form-group first">
                                        <input type="text" className="form-control" id="username" placeholder='Email or Username' onChange={handleUsername} required />

                                    </div>
                                    <div className="form-group last mb-4">
                                        <input type="password" className="form-control" id="password" placeholder='Password' onChange={handlePassword} required />

                                    </div>

                                    <div className="d-flex mb-4 align-items-center">
                                        <span className="ml-auto">
                                            <Link to="/forgot-password" className="forgot-pass">Forgot Password?</Link>
                                        </span>
                                    </div>
                                    <div className="mb-4">
                                        <Link to="/signup" className="forgot-pass">New to detecting deepfakes?</Link>
                                    </div>
                                    <input type="submit" value="Log In" className="btn btn-block btn-primary" />
                                </form>
                            </div>
                        </div>

                    </div>
                    <div className="col-md-6">
                        <img src="/assets/img/features-2.svg" alt="Image" className="img-fluid" />
                    </div>
                </div>
            </div>
        </div>
    );
}