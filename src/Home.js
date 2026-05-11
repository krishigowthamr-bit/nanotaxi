import { useState } from "react";
import { useNavigate } from "react-router-dom";

const G  = "#3DBE7A";
const GD = "#2aa065";
const GL = "#e8f8f0";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Nunito:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; overflow: hidden; background: #f4f6f8; }

  .hm-root {
    display: grid;
    grid-template-columns: 260px 1fr;
    height: 100vh;
    font-family: 'Nunito', sans-serif;
    overflow: hidden;
  }

  .hm-sidebar {
    background: ${G};
    display: flex; flex-direction: column;
    height: 100vh; overflow: hidden;
  }

  .hm-sb-header {
    padding: 28px 22px 20px;
    border-bottom: 1px solid rgba(255,255,255,0.15);
    flex-shrink: 0;
  }

  .hm-sb-logo { display: flex; align-items: center; gap: 12px; }

  .hm-sb-logo-icon {
    width: 42px; height: 42px;
    background: rgba(255,255,255,0.22);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.25rem; flex-shrink: 0;
  }

  .hm-sb-logo-name {
    font-family: 'Poppins', sans-serif;
    font-weight: 800; font-size: 1.15rem; color: #fff;
  }

  .hm-sb-logo-sub { font-size: 0.72rem; color: rgba(255,255,255,0.72); font-weight: 500; }

  .hm-sb-nav {
    flex: 1; padding: 16px 12px;
    display: flex; flex-direction: column; gap: 3px;
    overflow-y: auto;
  }

  .hm-sb-nav::-webkit-scrollbar { display: none; }

  .hm-sb-item {
    display: flex; align-items: center; gap: 12px;
    padding: 11px 14px; border-radius: 12px;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    font-weight: 600; font-size: 0.85rem;
    color: rgba(255,255,255,0.78);
    border: none; background: transparent;
    transition: background 0.15s, color 0.15s;
    text-align: left; width: 100%;
  }

  .hm-sb-item:hover { background: rgba(255,255,255,0.12); color: #fff; }
  .hm-sb-item.active { background: rgba(255,255,255,0.22); color: #fff; }
  .hm-sb-icon { font-size: 1rem; width: 20px; text-align: center; flex-shrink: 0; }

  .hm-sb-footer {
    padding: 16px 20px;
    border-top: 1px solid rgba(255,255,255,0.15);
    flex-shrink: 0;
  }

  .hm-sb-user { display: flex; align-items: center; gap: 10px; }

  .hm-sb-login-btn {
    width: 100%; padding: 11px;
    background: #fff; color: ${G};
    border: none; border-radius: 12px;
    font-family: 'Poppins', sans-serif;
    font-weight: 700; font-size: 0.9rem;
    cursor: pointer; transition: background 0.15s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }

  .hm-sb-login-btn:hover { background: #f0fdf6; }

  .hm-main { display: flex; flex-direction: column; height: 100vh; overflow: hidden; background: #fff; }

  .hm-topbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 20px 32px 16px;
    border-bottom: 1px solid #f0f0f0;
    flex-shrink: 0;
  }

  .hm-topbar-title { font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 1.2rem; color: #111; }
  .hm-topbar-sub { font-size: 0.8rem; color: #999; margin-top: 2px; font-weight: 500; }

  .hm-pricing-btn {
    display: inline-flex; align-items: center; gap: 7px;
    background: ${GL}; color: ${GD};
    border: none; border-radius: 10px; padding: 9px 18px;
    font-family: 'Poppins', sans-serif;
    font-weight: 700; font-size: 0.82rem; cursor: pointer;
    transition: background 0.15s;
  }

  .hm-pricing-btn:hover { background: #d2f0e2; }

  .hm-body {
    flex: 1; overflow-y: auto;
    padding: 24px 32px;
    display: flex; flex-direction: column; gap: 22px;
  }

  .hm-body::-webkit-scrollbar { width: 4px; }
  .hm-body::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 4px; }

  .hm-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

  .hm-stat { background: #f8f8f8; border-radius: 14px; padding: 18px 20px; }
  .hm-stat-label { font-size: 0.73rem; font-weight: 700; color: #aaa; text-transform: uppercase; letter-spacing: 0.6px; margin-bottom: 8px; }
  .hm-stat-value { font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 1.7rem; color: #111; line-height: 1; }
  .hm-stat-value span { font-size: 0.9rem; font-weight: 600; }
  .hm-stat-tag { display: inline-block; font-size: 0.7rem; font-weight: 700; padding: 3px 10px; border-radius: 6px; margin-top: 8px; }
  .hm-tag-g { background: ${GL}; color: ${GD}; }
  .hm-tag-b { background: #e6f1fb; color: #185fa5; }

  .hm-form-card { background: #fff; border: 1px solid #efefef; border-radius: 16px; padding: 24px; }
  .hm-form-card-title { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 0.95rem; color: #111; margin-bottom: 18px; display: flex; align-items: center; gap: 8px; }

  .hm-trip-tabs { display: flex; gap: 4px; background: #f4f4f4; border-radius: 12px; padding: 4px; margin-bottom: 20px; }

  .hm-trip-tab {
    flex: 1; padding: 10px 8px; border: none; background: transparent;
    font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 0.82rem;
    color: #999; border-radius: 9px; cursor: pointer; transition: all 0.18s;
  }

  .hm-trip-tab.active { background: ${G}; color: #fff; box-shadow: 0 3px 10px rgba(61,190,122,0.25); }

  .hm-form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
  .hm-form-group { display: flex; flex-direction: column; gap: 6px; }
  .hm-form-label { font-size: 0.76rem; font-weight: 700; color: #aaa; text-transform: uppercase; letter-spacing: 0.4px; }

  .hm-input-wrap {
    display: flex; align-items: center; gap: 10px;
    background: #f8f8f8; border: 1.5px solid #efefef;
    border-radius: 12px; padding: 12px 14px;
    transition: border-color 0.2s, background 0.2s;
  }

  .hm-input-wrap:focus-within { border-color: ${G}; background: #f0fdf6; }
  .hm-input-icon { font-size: 1rem; color: #bbb; flex-shrink: 0; }

  .hm-input-wrap input,
  .hm-input-wrap select {
    flex: 1; border: none; background: transparent;
    font-family: 'Nunito', sans-serif; font-size: 0.92rem; color: #222; outline: none;
  }

  .hm-input-wrap input::placeholder { color: #c0c0c0; }

  .hm-toggle-row { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
  .hm-toggle { position: relative; width: 46px; height: 25px; flex-shrink: 0; }
  .hm-toggle input { opacity: 0; width: 0; height: 0; }

  .hm-tslider {
    position: absolute; inset: 0; background: #d5d5d5;
    border-radius: 25px; cursor: pointer; transition: background 0.2s;
  }

  .hm-tslider::before {
    content: ''; position: absolute; width: 19px; height: 19px;
    left: 3px; top: 3px; background: #fff; border-radius: 50%;
    transition: transform 0.2s; box-shadow: 0 1px 4px rgba(0,0,0,0.12);
  }

  .hm-toggle input:checked + .hm-tslider { background: ${G}; }
  .hm-toggle input:checked + .hm-tslider::before { transform: translateX(21px); }
  .hm-toggle-label { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 0.88rem; color: #333; }

  .hm-form-actions { display: flex; gap: 12px; }

  .hm-btn-primary {
    flex: 1; padding: 14px; background: ${G}; color: #fff;
    border: none; border-radius: 12px;
    font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 0.95rem;
    cursor: pointer; transition: background 0.15s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }

  .hm-btn-primary:hover { background: ${GD}; }
  .hm-btn-primary:disabled { background: #ccc; cursor: not-allowed; }

  .hm-btn-secondary {
    padding: 14px 28px; background: #f4f4f4; color: #555;
    border: none; border-radius: 12px;
    font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 0.88rem;
    cursor: pointer; transition: background 0.15s;
  }

  .hm-btn-secondary:hover { background: #eaeaea; }

  .hm-driver-banner {
    display: flex; align-items: center; gap: 16px;
    background: linear-gradient(135deg, ${G} 0%, ${GD} 100%);
    border-radius: 16px; padding: 18px 22px; cursor: pointer;
  }

  .hm-driver-icon {
    width: 48px; height: 48px; background: rgba(255,255,255,0.2);
    border-radius: 50%; display: flex; align-items: center; justify-content: center;
    font-size: 1.4rem; flex-shrink: 0;
  }

  .hm-driver-text { flex: 1; }
  .hm-driver-text h4 { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 0.95rem; color: #fff; margin-bottom: 3px; }
  .hm-driver-text p { font-size: 0.78rem; color: rgba(255,255,255,0.85); }

  .hm-call-btn {
    background: #3B5BDB; color: #fff; border: none; border-radius: 11px;
    padding: 11px 20px; font-family: 'Poppins', sans-serif;
    font-weight: 700; font-size: 0.85rem; cursor: pointer;
    display: flex; align-items: center; gap: 8px; flex-shrink: 0;
    transition: background 0.15s;
  }

  .hm-call-btn:hover { background: #2f4abf; }

  /* Placeholder pages */
  .hm-placeholder {
    flex: 1; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 14px; color: #bbb;
  }

  .hm-placeholder-icon { font-size: 3rem; }
  .hm-placeholder-title { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 1.1rem; color: #555; }
  .hm-placeholder-sub { font-size: 0.85rem; color: #aaa; }

  @keyframes hmFade {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .hm-body > * { animation: hmFade 0.3s ease both; }
  .hm-body > *:nth-child(1) { animation-delay: 0.05s; }
  .hm-body > *:nth-child(2) { animation-delay: 0.12s; }
  .hm-body > *:nth-child(3) { animation-delay: 0.20s; }
`;



const TRIPS = ["Single / Round Trip", "Hourly Package", "Outstation"];

const NAV_ITEMS = [
  { icon: "🏠", label: "Dashboard" },
  { icon: "🗺️", label: "My Rides" },
  { icon: "🕐", label: "History" },
  { icon: "⚙️", label: "Settings" },
];

const PAGE_META = [
  { title: "Book a Ride",  sub: "Where would you like to go today?" },
  { title: "My Rides",     sub: "Your current and upcoming rides" },
  { title: "History",      sub: "All your past trips" },
  { title: "Pricing",      sub: "Plans & pricing information" },
  { title: "Drivers",      sub: "Find active drivers near you" },
  { title: "Settings",     sub: "Manage your account preferences" },
];

function PlaceholderPage({ icon, label }) {
  return (
    <div className="hm-placeholder">
      <div className="hm-placeholder-icon">{icon}</div>
      <div className="hm-placeholder-title">{label}</div>
      <div className="hm-placeholder-sub">This section is coming soon.</div>
    </div>
  );
}

export default function Home() {
  const [activeNav,  setActiveNav]  = useState(0);
  const [tripTab,    setTripTab]    = useState(0);
  const [roundTrip,  setRoundTrip]  = useState(false);
  const [pickup,     setPickup]     = useState("Bangalore");
  const [dropoff,    setDropoff]    = useState("");
  const [date,       setDate]       = useState("");
  const [time,       setTime]       = useState("");

  const isReady = dropoff.trim().length > 0;

  const { title, sub } = PAGE_META[activeNav];

  const naivgate = useNavigate();

  return (
    <>
      <style>{styles}</style>
      <div className="hm-root">

        {/* ── SIDEBAR ── */}
        <div className="hm-sidebar">
          <div className="hm-sb-header">
            <div className="hm-sb-logo">
              <div className="hm-sb-logo-icon">🚖</div>
              <div>
                <div className="hm-sb-logo-name">NANO Taxi</div>
                <div className="hm-sb-logo-sub">Your ride, simplified</div>
              </div>
            </div>
          </div>
          <div className="hm-sb-nav">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={i}
                className={`hm-sb-item ${activeNav === i ? "active" : ""}`}
                onClick={() => setActiveNav(i)}
              >
                <span className="hm-sb-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
          <div className="hm-sb-footer">
            <button className="hm-sb-login-btn" onClick={() => naivgate("/login")}>
              👤 Login / Sign Up
            </button>
          </div>
        </div>

        {/* ── MAIN ── */}
        <div className="hm-main">
          <div className="hm-topbar">
            <div>
              <div className="hm-topbar-title">{title}</div>
              <div className="hm-topbar-sub">{sub}</div>
            </div>
            {activeNav === 0 && (
              <button
                className="hm-pricing-btn"
                onClick={() => window.open("https://www.nanotaxibooking.com/", "_blank")}
              >
                🏷️ Plans &amp; Pricing Info
              </button>
            )}
          </div>

          {/* ── Dashboard / Book a Ride ── */}
          {activeNav === 0 && (
            <div className="hm-body" key="dashboard">
              <div className="hm-stats">
                <div className="hm-stat">
                  <div className="hm-stat-label">Starting Fare</div>
                  <div className="hm-stat-value">₹11<span>/km</span></div>
                  <div className="hm-stat-tag hm-tag-g">Lowest in city</div>
                </div>
                <div className="hm-stat">
                  <div className="hm-stat-label">Happy Customers</div>
                  <div className="hm-stat-value">5,000+</div>
                  <div className="hm-stat-tag hm-tag-g">And growing</div>
                </div>
                <div className="hm-stat">
                  <div className="hm-stat-label">Availability</div>
                  <div className="hm-stat-value">24/7</div>
                  <div className="hm-stat-tag hm-tag-b">Always on</div>
                </div>
              </div>

              <div className="hm-form-card">
                <div className="hm-form-card-title">🚗 Plan your trip</div>
                <div className="hm-trip-tabs">
                  {TRIPS.map((t, i) => (
                    <button key={i} className={`hm-trip-tab ${tripTab === i ? "active" : ""}`} onClick={() => setTripTab(i)}>{t}</button>
                  ))}
                </div>
                <div className="hm-form-grid">
                  <div className="hm-form-group">
                    <div className="hm-form-label">Pickup Location</div>
                    <div className="hm-input-wrap">
                      <span className="hm-input-icon">📗</span>
                      <input type="text" value={pickup} onChange={e => setPickup(e.target.value)} placeholder="Enter pickup location" />
                    </div>
                  </div>
                  <div className="hm-form-group">
                    <div className="hm-form-label">Drop Location</div>
                    <div className="hm-input-wrap">
                      <span className="hm-input-icon">📍</span>
                      <input type="text" value={dropoff} onChange={e => setDropoff(e.target.value)} placeholder="e.g., Chennai, Airport" />
                    </div>
                  </div>
                  <div className="hm-form-group">
                    <div className="hm-form-label">Pickup Date</div>
                    <div className="hm-input-wrap">
                      <span className="hm-input-icon">📅</span>
                      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
                    </div>
                  </div>
                  <div className="hm-form-group">
                    <div className="hm-form-label">Pickup Time</div>
                    <div className="hm-input-wrap">
                      <span className="hm-input-icon">🕐</span>
                      <input type="time" value={time} onChange={e => setTime(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="hm-toggle-row">
                  <label className="hm-toggle">
                    <input type="checkbox" checked={roundTrip} onChange={e => setRoundTrip(e.target.checked)} />
                    <span className="hm-tslider" />
                  </label>
                  <span className="hm-toggle-label">Round Trip</span>
                </div>
                <div className="hm-form-actions">
                  <button className="hm-btn-primary" disabled={!isReady}>Select Vehicle →</button>
                  <button className="hm-btn-secondary" onClick={() => { setDropoff(""); setDate(""); setTime(""); setRoundTrip(false); }}>Clear</button>
                </div>
              </div>

              <div className="hm-driver-banner">
                <div className="hm-driver-icon">👥</div>
                <div className="hm-driver-text">
                  <h4>Get Active Drivers</h4>
                  <p>Premium • Verified • 24/7 Available — Click to know more →</p>
                </div>
                <button className="hm-call-btn">📞 Call Now</button>
              </div>
            </div>
          )}

          {/* ── Other Pages ── */}
          {activeNav !== 0 && (
            <PlaceholderPage icon={NAV_ITEMS[activeNav].icon} label={NAV_ITEMS[activeNav].label} />
          )}

        </div>
      </div>
    </>
  );
}