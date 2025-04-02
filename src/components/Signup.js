import './css/login.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import urls from '../config/url.json';

export default function Signup() {
    const [form, setForm] = useState({
        username: "",
        name: "",
        email: "",
        password: "",
        cnf_password: ""
    });
    const [error, setError] = useState({});
    const navigate = useNavigate();

    function handleChange(event) {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value.trim() });
    }

    const validateForm = () => {
        let newErrors = {};

        if (!form.username) newErrors.username = "Username is required";
        else if (form.username.length < 3 || form.username.length > 20)
            newErrors.username = "Username must be 3-20 characters";
        else if (/\s/.test(form.username))
            newErrors.username = "No spaces allowed in username";

        if (!form.name) newErrors.name = "Name is required";
        else if (!/^[A-Za-z\s]+$/.test(form.name))
            newErrors.name = "Name can only contain letters and spaces";

        if (!form.email) newErrors.email = "Email is required";
        else if (!/^[\w.-]+@[\w-]+\.[a-zA-Z]{2,7}$/.test(form.email))
            newErrors.email = "Invalid email format";

        if (!form.password) newErrors.password = "Password is required";
        else if (form.password.length < 6)
            newErrors.password = "Must be at least 6 characters";
        else if (!/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/\d/.test(form.password) || !/[!@#$%^&*]/.test(form.password))
            newErrors.password = "Must include uppercase, lowercase, number, and special character";

        if (!form.cnf_password) newErrors.cnf_password = "Confirm password is required";
        else if (form.cnf_password !== form.password)
            newErrors.cnf_password = "Passwords do not match";

        setError(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    async function handleSubmit(event) {
        event.preventDefault();
        if (!validateForm()) return;

        const uri = urls.find(data => data.operationType === 'createUser')?.url;
        if (!uri) {
            alert("No signup endpoint found.");
            return;
        }

        try {
            const res = await axios.post(process.env.REACT_APP_API_URL + uri, form);
            const data = res.data;
            if (data.isSuccess) {
                alert("Signup successful! Redirecting to login...");
                navigate('/login');
            }
        } catch (error) {
            if (error.response?.data?.message) {
                setError({ form: error.response.data.message });
            } else {
                setError({ form: "Signup failed. Try again later." });
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
                                {error.form && <div className="alert alert-danger text-center">{error.form}</div>}
                                <div className="mb-4">
                                    <h3>Join Us</h3>
                                    <p className="mb-4">Together we will stop deepfakes</p>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="username" placeholder="Username" value={form.username} onChange={handleChange} />
                                        {error.username && <small className="text-danger">{error.username}</small>}
                                    </div>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name="name" placeholder="Display name" value={form.name} onChange={handleChange} />
                                        {error.name && <small className="text-danger">{error.name}</small>}
                                    </div>
                                    <div className="form-group">
                                        <input type="email" className="form-control" name="email" placeholder="Email" value={form.email} onChange={handleChange} />
                                        {error.email && <small className="text-danger">{error.email}</small>}
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" name="password" placeholder="Password" value={form.password} onChange={handleChange} />
                                        {error.password && <small className="text-danger">{error.password}</small>}
                                    </div>
                                    <div className="form-group mb-3">
                                        <input type="password" className="form-control" name="cnf_password" placeholder="Confirm password" value={form.cnf_password} onChange={handleChange} />
                                        {error.cnf_password && <small className="text-danger">{error.cnf_password}</small>}
                                    </div>

                                    <div className="d-flex mb-3 align-items-center">
                                        <span className="ml-auto">
                                            <Link to="/login" className="forgot-pass">Already a member?</Link>
                                        </span>
                                    </div>

                                    <input type="submit" value="Sign Up" className="btn btn-block btn-primary" />
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
