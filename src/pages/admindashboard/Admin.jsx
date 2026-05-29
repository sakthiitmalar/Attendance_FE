// import React, { useEffect, useState, useRef } from "react";
// import API from "../../services/api";
// import "../../styles/AdminDashboard.css";

// function Admin() {
//   const [activeTab, setActiveTab] = useState("users");
//   const [users, setUsers] = useState([]);
//   const [attendance, setAttendance] = useState([]);

//   // 🔥 Prevent double API calls (StrictMode fix)
//   const didFetch = useRef(false);

//   // ================= USERS =================
//   const getUsers = async () => {
//     try {
//       const res = await API.get("/admin/users");

//       const flatUsers = res.data?.data?.flat() ?? [];

//       console.log("FLATTENED USERS:", flatUsers);

//       setUsers(flatUsers);
//     } catch (err) {
//       console.log("USERS ERROR:", err);
//     }
//   };

//   // ================= ATTENDANCE =================
//   const getAttendance = async () => {
//     try {
//       const res = await API.get("/admin/attendance");

//       const flatAttendance = res.data?.data?.flat() ?? [];

//       console.log("FLATTENED ATTENDANCE:", flatAttendance);

//       setAttendance(flatAttendance);
//     } catch (err) {
//       console.log("ATTENDANCE ERROR:", err);
//     }
//   };

//   // ================= INIT =================
//   useEffect(() => {
//     if (didFetch.current) return;

//     didFetch.current = true;

//     getUsers();
//     getAttendance();
//   }, []);

//   return (
//     <div className="admin-container">

//       {/* SIDEBAR */}
//       <div className="sidebar">
//         <h2>Admin Panel</h2>

//         <button onClick={() => setActiveTab("users")}>
//           👤 Users
//         </button>

//         <button onClick={() => setActiveTab("attendance")}>
//           📍 Attendance
//         </button>
//       </div>

//       {/* MAIN CONTENT */}
//       <div className="main">

//         {/* ================= USERS ================= */}
//         {activeTab === "users" && (
//           <div>
//             <h2>Users List</h2>

//             <table border="1" cellPadding="10">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Email</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {users.length > 0 ? (
//                   users.map((u, i) => (
//                     <tr key={u.id || i}>
//                       <td>{u.id ?? "-"}</td>
//                       <td>{u.name ?? "-"}</td>
//                       <td>{u.email ?? "-"}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="3">No Users Found</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* ================= ATTENDANCE ================= */}
//         {activeTab === "attendance" && (
//           <div>
//             <h2>Attendance List</h2>

//             <table border="1" cellPadding="10">
//               <thead>
//                 <tr>
//                   <th>User ID</th>
//                   <th>Date</th>
//                   <th>Status</th>
//                   <th>Latitude</th>
//                   <th>Longitude</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {attendance.length > 0 ? (
//                   attendance.map((a, i) => (
//                     <tr key={a.id || i}>
//                       <td>{a.user_id ?? "-"}</td>
//                       <td>{a.date ?? "-"}</td>
//                       <td>{a.status ?? "-"}</td>
//                       <td>{a.latitude ?? "-"}</td>
//                       <td>{a.longitude ?? "-"}</td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="5">No Attendance Found</td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//       </div>
//     </div>
//   );
// }

// export default Admin;
import  { useEffect, useState, useRef } from "react";
import API from "../../services/api";
import "../../styles/AdminDashboard.css";

function Admin() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState([]);

  // Prevent double API calls in React StrictMode
  const didFetch = useRef(false);

  // ================= USERS =================
  const getUsers = async () => {
    try {
      const res = await API.get("/admin/users");

      // Flatten nested arrays
      const flatUsers = res.data?.data?.flat() ?? [];

      // Remove duplicate users by ID
      const uniqueUsers = [
        ...new Map(flatUsers.map((item) => [item.id, item])).values(),
      ];

      console.log("UNIQUE USERS:", uniqueUsers);

      setUsers(uniqueUsers);
    } catch (err) {
      console.log("USERS ERROR:", err);
    }
  };

  // ================= ATTENDANCE =================
  const getAttendance = async () => {
    try {
      const res = await API.get("/admin/attendance");

      // Flatten nested arrays
      const flatAttendance = res.data?.data?.flat() ?? [];

      // Remove duplicate attendance by ID
      const uniqueAttendance = [
        ...new Map(flatAttendance.map((item) => [item.id, item])).values(),
      ];

      console.log("UNIQUE ATTENDANCE:", uniqueAttendance);

      setAttendance(uniqueAttendance);
    } catch (err) {
      console.log("ATTENDANCE ERROR:", err);
    }
  };

  // ================= INITIAL LOAD =================
  useEffect(() => {
    if (didFetch.current) return;

    didFetch.current = true;

    getUsers();
    getAttendance();
  }, []);

  return (
    <div className="admin-container">

      {/* ================= SIDEBAR ================= */}
      <div className="sidebar">
        <h2>Admin Panel</h2>

        <button onClick={() => setActiveTab("users")}>
          👤 Users
        </button>

        <button onClick={() => setActiveTab("attendance")}>
          📍 Attendance
        </button>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="main">

        {/* ================= USERS TABLE ================= */}
        {activeTab === "users" && (
          <div>
            <h2>Users List</h2>

            <table border="1" cellPadding="10">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                </tr>
              </thead>

              <tbody>
                {users.length > 0 ? (
                  users.map((u, i) => (
                    <tr key={`${u.id}-${i}`}>
                      <td>{u.id ?? "-"}</td>
                      <td>{u.name ?? "-"}</td>
                      <td>{u.email ?? "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No Users Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ================= ATTENDANCE TABLE ================= */}
        {activeTab === "attendance" && (
          <div>
            <h2>Attendance List</h2>

            <table border="1" cellPadding="10">
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                </tr>
              </thead>

              <tbody>
                {attendance.length > 0 ? (
                  attendance.map((a, i) => (
                    <tr key={`${a.id}-${i}`}>
                      <td>{a.user_id ?? "-"}</td>
                      <td>{a.date ?? "-"}</td>
                      <td>{a.status ?? "-"}</td>
                      <td>{a.latitude ?? "-"}</td>
                      <td>{a.longitude ?? "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No Attendance Found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}

export default Admin;