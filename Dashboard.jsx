import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard({ apiBase = "" }) {
  const [telemetry, setTelemetry] = useState({ temperature_c: "--", humidity_rh: "--", pressure_kpa: "--" });
  const [latestImage, setLatestImage] = useState(null);
  const [queue, setQueue] = useState([]);

  async function fetchLatest() {
    try {
      const res = await axios.get(`${apiBase}/api/latest`);
      if (res.data) {
        setTelemetry(res.data.sensor || telemetry);
        setLatestImage(res.data.image_url || null);
      }
    } catch (e) { console.log("fetchLatest", e); }
  }

  async function fetchQueue() {
    try {
      const res = await axios.get(`${apiBase}/api/queue`);
      setQueue(res.data || []);
    } catch (e) { console.log("fetchQueue", e); }
  }

  useEffect(() => {
    fetchLatest();
    fetchQueue();
    const intv = setInterval(() => { fetchLatest(); fetchQueue(); }, 5000);
    return () => clearInterval(intv);
  }, []);

  async function takePhoto() {
    try {
      await axios.post(`${apiBase}/api/commands`, { device_id: "fruit_chamber_01", cmd: "capture" });
      alert("Capture command sent");
    } catch (e) {
      alert("Failed to send capture command");
    }
  }

  return (
    <div>
      <div className="grid">
        <div className="card">
          <h3>Temperature</h3>
          <div style={{fontSize: 28}}>{telemetry.temperature_c} °C</div>
        </div>
        <div className="card">
          <h3>Humidity</h3>
          <div style={{fontSize: 28}}>{telemetry.humidity_rh} %</div>
        </div>
        <div className="card">
          <h3>Pressure</h3>
          <div style={{fontSize: 28}}>{telemetry.pressure_kpa} kPa</div>
        </div>

        <div className="card large">
          <h3>Latest Image</h3>
          <div style={{height: 360, background: "#111", display: "flex", alignItems: "center", justifyContent: "center"}}>
            {latestImage ? <img alt="latest" src={latestImage} style={{maxWidth: "100%", maxHeight: "100%"}}/> : <div style={{color:"#eee"}}>No image</div>}
          </div>
          <div style={{marginTop:10}}>
            <button onClick={takePhoto}>Take Photo</button>
          </div>
        </div>

        <div className="card">
          <h3>Upload Queue</h3>
          <ul>
            {queue.length === 0 ? <li>No pending uploads</li> : queue.map(q => <li key={q.image_name}>{q.image_name} ({q.attempts} tries)</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}
