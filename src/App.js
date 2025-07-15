import { useEffect, useState } from "react";
import { getPositions, subscribe, unsubscribe } from "./api";
import "./index.css";

export default function App() {
  const [email, setEmail] = useState("");
  const [positions, setPositions] = useState([]);
  const [selectedPosition, setSelectedPosition] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getPositions()
      .then(data => {
        if (data.success) {
          setPositions(data.data);
          if (data.data.length > 0) setSelectedPosition(data.data[0]);
        } else {
          setMessage(data.message);
        }
      })
      .catch(err => {
        setMessage("Error fetching positions.");
      });
  }, []);

  const handleSubscribe = async () => {
    if (!email || !selectedPosition) {
      setMessage("Email and Position are required.");
      return;
    }
    const data = await subscribe(email, selectedPosition);
    setMessage(data.message);
  };

  const handleUnsubscribe = async () => {
    if (!email || !selectedPosition) {
      setMessage("Email and Position are required.");
      return;
    }
    const data = await unsubscribe(email, selectedPosition);
    setMessage(data.message);
  };

  return (
    <div className="container">
      <h1>LAST ONE HOUR</h1>
      <div className="form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <select
          value={selectedPosition}
          onChange={e => setSelectedPosition(e.target.value)}
        >
          {positions.map(pos => (
            <option key={pos} value={pos}>
              {pos.replace(/\+/g, " ")}
            </option>
          ))}
        </select>

        <div className="buttons">
          <button onClick={handleSubscribe}>Subscribe</button>
          <button onClick={handleUnsubscribe}>Unsubscribe</button>
        </div>

        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
