import  { useState } from "react";
import API from "../../services/api";
import "../../styles/Attendance.css";

function Attendance() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const markAttendance = () => {
    setLoading(true);
    setMessage("");

    if (!navigator.geolocation) {
      setMessage("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        console.log("GPS:", latitude, longitude);

        try {
          const user = JSON.parse(localStorage.getItem("user"));

          const res = await API.post("/attendance/mark", {
            user_id: user?.id,
            latitude,
            longitude
          });

          setMessage(res.data.message);
        } catch (err) {
          setMessage("Error marking attendance");
        }

        setLoading(false);
      },

      (error) => {
        console.log("GPS ERROR:", error);

        if (error.code === 1) {
          setMessage("Permission denied ❌");
        } else if (error.code === 2) {
          setMessage("Location unavailable ❌");
        } else if (error.code === 3) {
          setMessage("Location timeout ❌");
        } else {
          setMessage("Unknown GPS error");
        }

        setLoading(false);
      },

      {
        enableHighAccuracy: true,   // 🔥 IMPORTANT
        timeout: 15000,             // wait 15 sec
        maximumAge: 0               // no cached location
      }
    );
  };

  return (
    <div className="att-container">
      <div className="att-card">
        <h2>📍 Mark Attendance</h2>

        <button
          className="att-btn"
          onClick={markAttendance}
          disabled={loading}
        >
          {loading ? "Getting GPS..." : "Get Attendance"}
        </button>

        {message && <p className="msg">{message}</p>}
      </div>
    </div>
  );
}

export default Attendance;