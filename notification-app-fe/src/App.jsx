import { useEffect, useState } from "react";
import { fetchNotifications } from "./api/notifications";

export default function App() {
  const [notifications, setNotifications] = useState([]);
  const [selectedType, setSelectedType] = useState("All");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("Latest");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  async function loadNotifications() {
    setLoading(true);

    try {
      const data = await fetchNotifications();
      setNotifications(data.notifications);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  const filteredNotifications = notifications
    .filter((notification) => {
      const typeMatch =
        selectedType === "All" || notification.Type === selectedType;

      const searchMatch = notification.Message.toLowerCase().includes(
        search.toLowerCase(),
      );

      return typeMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sortOrder === "Latest") {
        return new Date(b.Timestamp) - new Date(a.Timestamp);
      } else {
        return new Date(a.Timestamp) - new Date(b.Timestamp);
      }
    });

  return (
    <div>
      <h1>Notifications App</h1>

      <button onClick={loadNotifications}>Refresh</button>

      <p>Total Notifications: {filteredNotifications.length}</p>

      <input
        type="text"
        placeholder="Search by message"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <br />
      <br />

      <select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Placement">Placement</option>
        <option value="Result">Result</option>
        <option value="Event">Event</option>
      </select>

      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
        style={{ marginLeft: "10px" }}
      >
        <option value="Latest">Latest First</option>
        <option value="Oldest">Oldest First</option>
      </select>

      <hr />

      {loading ? (
        <h3>Loading...</h3>
      ) : (
        filteredNotifications.map((notification) => (
          <div key={notification.ID}>
            <p>
              <b>Type:</b> {notification.Type}
            </p>
            <p>
              <b>Message:</b> {notification.Message}
            </p>
            <p>
              <b>Time:</b> {new Date(notification.Timestamp).toLocaleString()}
            </p>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}
