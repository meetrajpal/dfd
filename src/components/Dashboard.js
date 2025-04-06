import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurUser, fetchHistory } from "../actions/actionindex";
import axios from "axios";
import urls from '../config/url.json';

export default function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const curUser = useSelector((state) => state.current_user);
    const history = useSelector((state) => state.history);
    const [inputType, setInputType] = useState("file");
    const [textInput, setTextInput] = useState("");
    const [file, setFile] = useState(null);
    const [records, setRecords] = useState([]);
    const [loader, setLoader] = useState(false);
    const formData = new FormData();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        } else {
            const userId = localStorage.getItem("user_id");
            dispatch(fetchCurUser(userId));
            dispatch(fetchHistory(userId));
        }
    }, []);

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        } else {
            const userId = localStorage.getItem("user_id");
            dispatch(fetchCurUser(userId));
            dispatch(fetchHistory(userId));
        }
    }, [dispatch, navigate]);

    useEffect(() => {
        if (history.length > 0) {
            setRecords(history);
        }
        else {
            setRecords([]);
        }
    }, [history, records]);

    const handleInputChange = (e) => {
        setTextInput(e.target.value);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const deleteHistory = async (pred_id) => {
        setLoader(true);

        const uri = urls.find(data => data.operationType === 'getPredictions')?.url;
        if (!uri) {
            alert("No endpoint found for getPredictions in deletePredictions.");
            setLoader(false);
            return;
        }

        try {
            const res = await axios.delete(process.env.REACT_APP_API_URL + uri + `?pred_id=${pred_id}`);
            const data = res.data;
            if (data.isSuccess) {
                dispatch(fetchHistory(localStorage.getItem('user_id')));
                setLoader(false);
            }
        } catch (error) {
            if (error.response?.data?.hasException) {
                alert(error.response.data.errorResDto.details);
                setLoader(false);
            } else if (error.response?.data?.detail?.msg) {
                alert(error.response?.data?.detail?.msg);
                setLoader(false);
            } else if (error.request) {
                alert("No response from server");
                setLoader(false);
            } else {
                alert("Error: " + error.message);
                setLoader(false);
            }
        }
    }

    const handleSubmit = async () => {
        if (!curUser.verified_email) return;

        switch (inputType) {
            case "file":
                if (file) {
                    setLoader(true);

                    const uri = urls.find(data => data.operationType === 'postDirectUpload')?.url;
                    if (!uri) {
                        alert("No endpoint found for postDirectUpload.");
                        setLoader(false);
                        return;
                    }

                    try {
                        formData.append("file", file);
                        const res = await axios.post(process.env.REACT_APP_API_URL + uri, formData,
                            {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                            }
                        );
                        const data = res.data;
                        if (data.isSuccess) {
                            dispatch(fetchHistory(localStorage.getItem('user_id')));
                            alert(data.message);
                            setLoader(false);
                        } else if (data.detail) {
                            setLoader(false);
                            alert(data.detail);
                        } else {
                            alert(data.message);
                            setLoader(false);
                        }
                    } catch (error) {
                        if (error.response?.data?.hasException) {
                            alert(error.response.data.errorResDto.details);
                            setLoader(false);
                        } else if (!error.response?.data?.isSuccess && !error.response?.data?.hasException) {
                            alert(error.response?.data?.message);
                            setLoader(false);
                        } else if (error.request) {
                            alert("No response from server");
                            setLoader(false);
                        } else {
                            alert("Error: " + error.message);
                            setLoader(false);
                        }
                    }
                } else {
                    alert("No file selected.");
                }
                break;

            case "ig":
                if (textInput.trim()) {
                    setLoader(true);

                    const uri = urls.find(data => data.operationType === 'getDetectIgReel')?.url;
                    if (!uri) {
                        alert("No endpoint found for getDetectIgReel.");
                        setLoader(false);
                        return;
                    }

                    try {
                        const res = await axios.get(process.env.REACT_APP_API_URL + uri + `?url=${textInput}`);
                        const data = res.data;
                        if (data.isSuccess) {
                            dispatch(fetchHistory(localStorage.getItem('user_id')));
                            alert(data.message);
                            setLoader(false);
                        } else if (data.detail) {
                            setLoader(false);
                            alert(data.detail);
                        } else {
                            alert(data.message);
                            setLoader(false);
                        }
                    } catch (error) {
                        if (error.response?.data?.hasException) {
                            alert(error.response.data.errorResDto.details);
                            setLoader(false);
                        } else if (!error.response?.data?.isSuccess && !error.response?.data?.hasException) {
                            alert(error.response?.data?.message);
                            setLoader(false);
                        } else if (error.request) {
                            alert("No response from server");
                            setLoader(false);
                        } else {
                            alert("Error: " + error.message);
                            setLoader(false);
                        }
                    }
                } else {
                    alert("No Instagram URL provided.");
                }
                break;

            case "fb":
                if (textInput.trim()) {
                    setLoader(true);

                    const uri = urls.find(data => data.operationType === 'getDetectFbVideo')?.url;
                    if (!uri) {
                        alert("No endpoint found for getDetectFbVideo.");
                        setLoader(false);
                        return;
                    }

                    try {
                        const res = await axios.get(process.env.REACT_APP_API_URL + uri + `?url=${textInput}`);
                        const data = res.data;
                        if (data.isSuccess) {
                            dispatch(fetchHistory(localStorage.getItem('user_id')));
                            alert(data.message);
                            setLoader(false);
                        } else if (data.detail) {
                            setLoader(false);
                            alert(data.detail);
                        } else {
                            alert(data.message);
                            setLoader(false);
                        }
                    } catch (error) {
                        if (error.response?.data?.hasException) {
                            alert(error.response.data.errorResDto.details);
                            setLoader(false);
                        } else if (!error.response?.data?.isSuccess && !error.response?.data?.hasException) {
                            alert(error.response?.data?.message);
                            setLoader(false);
                        } else if (error.request) {
                            alert("No response from server");
                            setLoader(false);
                        } else {
                            alert("Error: " + error.message);
                            setLoader(false);
                        }
                    }
                } else {
                    alert("No Facebook URL provided.");
                }
                break;

            case "xv":
                if (textInput.trim()) {
                    setLoader(true);

                    const uri = urls.find(data => data.operationType === 'getDetectTwitterVideo')?.url;
                    if (!uri) {
                        alert("No endpoint found for getDetectTwitterVideo.");
                        setLoader(false);
                        return;
                    }

                    try {
                        const res = await axios.get(process.env.REACT_APP_API_URL + uri + `?url=${textInput}`);
                        const data = res.data;
                        if (data.isSuccess) {
                            dispatch(fetchHistory(localStorage.getItem('user_id')));
                            alert(data.message);
                            setLoader(false);
                        } else if (data.detail) {
                            setLoader(false);
                            alert(data.detail);
                        } else {
                            alert(data.message);
                            setLoader(false);
                        }
                    } catch (error) {
                        if (error.response?.data?.hasException) {
                            alert(error.response.data.errorResDto.details);
                            setLoader(false);
                        } else if (!error.response?.data?.isSuccess && !error.response?.data?.hasException) {
                            alert(error.response?.data?.message);
                            setLoader(false);
                        } else if (error.request) {
                            alert("No response from server");
                            setLoader(false);
                        } else {
                            alert("Error: " + error.message);
                            setLoader(false);
                        }
                    }
                } else {
                    alert("No Twitter URL provided.");
                }
                break;

            case "yt":
                if (textInput.trim()) {
                    setLoader(true);

                    const uri = urls.find(data => data.operationType === 'getDetectYtVideo')?.url;
                    if (!uri) {
                        alert("No endpoint found for getDetectYtVideo.");
                        setLoader(false);
                        return;
                    }

                    try {
                        const res = await axios.get(process.env.REACT_APP_API_URL + uri + `?url=${textInput}`);
                        const data = res.data;
                        if (data.isSuccess) {
                            dispatch(fetchHistory(localStorage.getItem('user_id')));
                            alert(data.message);
                            setLoader(false);
                        } else if (data.detail) {
                            setLoader(false);
                            alert(data.detail);
                        } else {
                            alert(data.message);
                            setLoader(false);
                        }
                    } catch (error) {
                        if (error.response?.data?.hasException) {
                            alert(error.response.data.errorResDto.details);
                            setLoader(false);
                        } else if (!error.response?.data?.isSuccess && !error.response?.data?.hasException) {
                            alert(error.response?.data?.message);
                            setLoader(false);
                        } else if (error.request) {
                            alert("No response from server");
                            setLoader(false);
                        } else {
                            alert("Error: " + error.message);
                            setLoader(false);
                        }
                    }
                } else {
                    alert("No YouTube URL provided.");
                }
                break;

            default:
                alert("Invalid selection.");
                break;
        }
    };


    return (
        <>
            {
                loader && (<div id="preloader"></div>)
            }
            {!curUser.verified_email && (
                <div className="h-25 bg-danger text-white text-center">
                    Please verify your email to use the service
                </div>
            )}

            <div className="container d-flex flex-column align-items-center justify-content-center " style={(history.length < 6) ? (history.length < 4) ? { "height": "100vh", "margin-top":"-25vh" } : { "height": "100vh", "margin-top":"-15vh" } : { "margin": "5vh auto" }}>
                <select
                    className="form-select w-50 mb-3"
                    value={inputType}
                    onChange={(e) => setInputType(e.target.value)}
                    disabled={!curUser.verified_email}
                >
                    <option value="file">Direct Video Upload</option>
                    <option value="ig">Instagram Reel / Video</option>
                    <option value="fb">Facebook Video</option>
                    <option value="xv">Twitter Video / Status</option>
                    <option value="yt">YouTube Video</option>
                </select>

                {inputType !== "file" ? (
                    <input
                        type="text"
                        className="form-control w-50 mb-3"
                        placeholder="Enter URL copied from share option only"
                        value={textInput}
                        onChange={handleInputChange}
                        disabled={!curUser.verified_email}
                    />
                ) : (
                    <input
                        type="file"
                        className="form-control w-50 mb-3"
                        onChange={handleFileChange}
                        disabled={!curUser.verified_email}
                    />
                )}

                <button
                    className="btn btn-primary mb-3"
                    onClick={handleSubmit}
                    disabled={!curUser.verified_email}
                >
                    Detect
                </button>

                <ul className="list-group w-50">
                    {records.length > 0 ? (
                        [...records].reverse().map((record) => (
                            <li key={record.pred_id} className="list-group-item d-flex align-items-center justify-content-between">
                                <strong>{record.pred_label}</strong> {record.filename} ({record.source})

                                <div className="d-flex gap-2">
                                    {record.url !== "NA" && (
                                        <a href={record.url} target="_blank" rel="noopener noreferrer" className="btn border text-primary" title="View uploaded link">
                                            <i className="bi bi-link"></i>
                                        </a>
                                    )}

                                    <button className="btn border text-danger" title="Delete" onClick={() => { deleteHistory(record.pred_id) }}>
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </li>

                        ))
                    ) : (
                        <li className="list-group-item text-muted">You currently have no history - get started</li>
                    )}
                </ul>
            </div>
        </>
    );
}
