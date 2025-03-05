import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";

function App() {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const server = process.env.REACT_APP_SERVER;

    useEffect(() => {
        axios.get(`${server}/api/events`)
            .then(res => setEvents(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("date", date);
        // formData.append("description", description);
        images.forEach(image => formData.append("images", image));
        await axios.post(`${server}/api/events`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        window.location.reload();
    };

    return (
        <div className="container">
            <h1>Upload Images to Disha Convent School</h1>
            <h2 className="heading">Admin Panel</h2>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <div className="input-container">
                        <label htmlFor="title">Title:</label>
                        <input className="input" type="text" id="title" placeholder="Event Title" onChange={(e) => setTitle(e.target.value)} required />
                    </div>
                    <div className="input-container">
                        <label htmlFor="date">Date:</label>
                        <input className="input" type="date" id="date" onChange={(e) => setDate(e.target.value)} required />
                    </div>
                    {/* <div className="input-container">
                        <label htmlFor="desc">Desription</label>
                        <textarea placeholder="Description" id="desc" onChange={(e) => setDescription(e.target.value)} />
                    </div> */}
                    <div className="input-container">
                        <label htmlFor="files">Upload Images:</label>
                        <input
                            type="file"
                            id="files"
                            className="input-uploadFiles"
                            multiple
                            onChange={(e) => setImages(Array.from(e.target.files))}
                            required
                        />
                    </div>
                </div>
                <button type="submit">Add Event</button>
            </form>

            <h2 className="heading">Existing Events</h2>
            {events.map((event) => (
                <div key={event._id} className="event-container">
                    <h3 className="title">{event.title}</h3>
                    <p className="date">{event.date}</p>
                    {event.images.map(img => <img key={img} src={img} alt="event" width="100" />)}
                    <button onClick={() => axios.delete(`http://localhost:5000/api/events/${event._id}`).then(() => window.location.reload())}>
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default App;