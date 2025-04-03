import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurUser, fetchHistory } from "../actions/actionindex";

export default function Dashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const curUser = useSelector((state) => state.current_user);
    const history = useSelector((state) => state.history); // ✅ Corrected
    const [inputType, setInputType] = useState("file");
    const [textInput, setTextInput] = useState("");
    const [file, setFile] = useState(null);
    const [records, setRecords] = useState([]); // Stores fetched history

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
            setRecords(history); // ✅ Updates state after history is fetched
        }
    }, [history]);

    const handleInputChange = (e) => {
        setTextInput(e.target.value);
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = () => {
        if (curUser.verified_email) {
            if (inputType === "text" && textInput.trim()) {
                setTextInput("");
            } else if (inputType === "file" && file) {
                setFile(null);
            }
        }
    };

    return (
        <>
            {!curUser.verified_email && (
                <div className="h-25 bg-danger text-white text-center">
                    Please verify your email to use our service
                </div>
            )}

            <div className="container d-flex flex-column align-items-center mt-5 justify-content-center">
                <select
                    className="form-select w-50 mb-3"
                    value={inputType}
                    onChange={(e) => setInputType(e.target.value)}
                    disabled={!curUser.verified_email}
                >
                    <option value="file">Direct Video Upload</option>
                    <option value="ig">Instagram Reel</option>
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
                        records.map((record) => (
                            <li key={record.pred_id} className="list-group-item">
                                <strong>{record.pred_label}</strong> - {record.filename} ({record.source})
                                {record.url !== "NA" && (
                                    <a href={record.url} target="_blank" rel="noopener noreferrer" className="ms-2">
                                        View
                                    </a>
                                )}
                            </li>
                        ))
                    ) : (
                        <li className="list-group-item text-muted">No records found.</li>
                    )}
                </ul>
            </div>
        </>
    );
}
