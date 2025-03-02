import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [events, setEvents] = useState([]);
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/events")
            .then(res => setEvents(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("date", date);
        formData.append("description", description);
        images.forEach(image => formData.append("images", image));

        await axios.post("http://localhost:5000/api/events", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        window.location.reload();
    };

    return (
        <div>
            <h2>Admin Panel</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Event Title" onChange={(e) => setTitle(e.target.value)} required />
                <input type="date" onChange={(e) => setDate(e.target.value)} required />
                <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
                <input type="file" multiple onChange={(e) => setImages([...e.target.files])} required />
                <button type="submit">Add Event</button>
            </form>

            <h2>Existing Events</h2>
            {events.map((event) => (
                <div key={event._id}>
                    <h3>{event.title}</h3>
                    <p>{event.date}</p>
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

