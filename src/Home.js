import { useState } from "react";
import { useNavigate } from "react-router-dom";

const G  = "#3DBE7A";
const GD = "#2aa065";
const GL = "#e8f8f0";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Nunito:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { margin: 0; padding: 0; height: 100%; font-family: 'Nunito', sans-serif; background: #f4f6f8; }

  /* ══════════════════════════════════
     DESKTOP LAYOUT (≥ 769px)
     Permanent sidebar + content area
  ══════════════════════════════════ */
  .desk-root {
    display: grid;
    grid-template-columns: 260px 1fr;
    height: 100vh;
    overflow: hidden;
  }

  /* ── Sidebar ── */
  .desk-sidebar {
    background: ${G};
    display: flex; flex-direction: column;
    height: 100vh; overflow: hidden;
    flex-shrink: 0;
  }

  .desk-sb-header {
    padding: 24px 20px 18px;
    border-bottom: 1px solid rgba(255,255,255,0.15);
    flex-shrink: 0;
  }

  .desk-sb-logo { display: flex; align-items: center; gap: 11px; }

  .desk-sb-logo-icon {
    width: 40px; height: 40px;
    background: rgba(255,255,255,0.22);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.2rem; flex-shrink: 0;
  }

  .desk-sb-logo-name {
    font-family: 'Poppins', sans-serif;
    font-weight: 800; font-size: 1.1rem; color: #fff;
  }

  .desk-sb-logo-sub {
    font-size: 0.68rem; color: rgba(255,255,255,0.72); font-weight: 500;
  }

  .desk-sb-nav {
    flex: 1; padding: 14px 10px;
    display: flex; flex-direction: column; gap: 3px;
    overflow-y: auto;
  }

  .desk-sb-nav::-webkit-scrollbar { display: none; }

  .desk-sb-item {
    display: flex; align-items: center; gap: 12px;
    padding: 11px 14px; border-radius: 12px;
    cursor: pointer;
    font-family: 'Poppins', sans-serif;
    font-weight: 600; font-size: 0.88rem;
    color: rgba(255,255,255,0.75);
    border: none; background: transparent;
    transition: background 0.15s, color 0.15s;
    text-align: left; width: 100%;
  }

  .desk-sb-item:hover { background: rgba(255,255,255,0.12); color: #fff; }
  .desk-sb-item.active { background: rgba(255,255,255,0.22); color: #fff; }
  .desk-sb-icon { font-size: 1rem; width: 20px; text-align: center; flex-shrink: 0; }

  .desk-sb-footer {
    padding: 14px 16px;
    border-top: 1px solid rgba(255,255,255,0.15);
    flex-shrink: 0;
  }

  .desk-sb-login {
    width: 100%; padding: 11px;
    background: #fff; color: ${G};
    border: none; border-radius: 12px;
    font-family: 'Poppins', sans-serif;
    font-weight: 700; font-size: 0.88rem;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background 0.15s;
  }

  .desk-sb-login:hover { background: #f0fdf6; }

  /* ── Main area ── */
  .desk-main {
    display: flex; flex-direction: column;
    height: 100vh; overflow: hidden;
    background: #f4f6f8;
  }

  .desk-topbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 32px; height: 64px;
    background: #fff;
    border-bottom: 1.5px solid #f0f0f0;
    flex-shrink: 0;
  }

  .desk-topbar-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 800; font-size: 1.25rem; color: #111;
  }

  .desk-topbar-sub { font-size: 0.8rem; color: #bbb; margin-top: 2px; font-weight: 500; }

  .desk-pricing-btn {
    display: inline-flex; align-items: center; gap: 7px;
    background: ${GL}; color: ${GD};
    border: none; border-radius: 10px; padding: 9px 18px;
    font-family: 'Poppins', sans-serif;
    font-weight: 700; font-size: 0.8rem; cursor: pointer;
    white-space: nowrap; transition: background 0.15s;
  }

  .desk-pricing-btn:hover { background: #d2f0e2; }

  .desk-body {
    flex: 1; overflow-y: auto;
    padding: 24px 32px 40px;
    display: flex; flex-direction: column; gap: 20px;
  }

  .desk-body::-webkit-scrollbar { width: 4px; }
  .desk-body::-webkit-scrollbar-thumb { background: #e0e0e0; border-radius: 4px; }

  /* Stats */
  .desk-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }

  .desk-stat {
    background: linear-gradient(135deg, #f8fffe 0%, #f0fdf6 100%);
    border: 1.5px solid #d6f5e6; border-radius: 16px;
    padding: 20px 24px; display: flex; flex-direction: column; gap: 4px;
  }

  .desk-stat-label {
    font-size: 0.7rem; font-weight: 700; color: #aaa;
    text-transform: uppercase; letter-spacing: 0.6px;
  }

  .desk-stat-value {
    font-family: 'Poppins', sans-serif;
    font-weight: 800; font-size: 2rem; color: #111; line-height: 1.1;
  }

  .desk-stat-value span { font-size: 0.9rem; font-weight: 600; color: #555; }

  .desk-stat-tag {
    display: inline-block; font-size: 0.68rem; font-weight: 700;
    padding: 3px 10px; border-radius: 6px;
    margin-top: 6px; align-self: flex-start;
  }

  .desk-tag-g { background: ${GL}; color: ${GD}; }
  .desk-tag-b { background: #e6f1fb; color: #185fa5; }

  /* Form card */
  .desk-form-card {
    background: #fff; border: 1.5px solid #efefef;
    border-radius: 18px; padding: 26px;
    box-shadow: 0 2px 16px rgba(0,0,0,0.04);
  }

  .desk-form-title {
    font-family: 'Poppins', sans-serif; font-weight: 700;
    font-size: 1rem; color: #111;
    display: flex; align-items: center; gap: 8px;
    padding-bottom: 14px; margin-bottom: 18px;
    border-bottom: 1px solid #f5f5f5;
  }

  .desk-trip-tabs {
    display: flex; gap: 4px; background: #f4f4f4;
    border-radius: 12px; padding: 4px; margin-bottom: 20px;
  }

  .desk-trip-tab {
    flex: 1; padding: 10px 6px; border: none; background: transparent;
    border-radius: 9px; font-family: 'Poppins', sans-serif;
    font-weight: 600; font-size: 0.82rem; color: #999;
    cursor: pointer; transition: all 0.18s; text-align: center;
  }

  .desk-trip-tab.active {
    background: ${G}; color: #fff;
    box-shadow: 0 3px 10px rgba(61,190,122,0.25);
  }

  .desk-form-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 16px; margin-bottom: 16px;
  }

  .desk-form-group { display: flex; flex-direction: column; gap: 6px; }

  .desk-form-label {
    font-size: 0.72rem; font-weight: 700; color: #aaa;
    text-transform: uppercase; letter-spacing: 0.4px;
  }

  .desk-input-wrap {
    display: flex; align-items: center; gap: 10px;
    background: #f8f8f8; border: 1.5px solid #efefef;
    border-radius: 12px; padding: 12px 14px;
    transition: border-color 0.2s, background 0.2s;
  }

  .desk-input-wrap:focus-within { border-color: ${G}; background: #f0fdf6; }
  .desk-input-icon { font-size: 0.95rem; color: #bbb; flex-shrink: 0; }

  .desk-input-wrap input {
    flex: 1; border: none; background: transparent;
    font-family: 'Nunito', sans-serif;
    font-size: 0.9rem; color: #222; outline: none; min-width: 0;
  }

  .desk-input-wrap input::placeholder { color: #c0c0c0; }

  .desk-toggle-row { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
  .desk-toggle { position: relative; width: 46px; height: 25px; flex-shrink: 0; }
  .desk-toggle input { opacity: 0; width: 0; height: 0; }

  .desk-tslider {
    position: absolute; inset: 0; background: #d5d5d5;
    border-radius: 25px; cursor: pointer; transition: background 0.2s;
  }

  .desk-tslider::before {
    content: ''; position: absolute;
    width: 19px; height: 19px; left: 3px; top: 3px;
    background: #fff; border-radius: 50%;
    transition: transform 0.2s; box-shadow: 0 1px 4px rgba(0,0,0,0.12);
  }

  .desk-toggle input:checked + .desk-tslider { background: ${G}; }
  .desk-toggle input:checked + .desk-tslider::before { transform: translateX(21px); }
  .desk-toggle-label { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 0.88rem; color: #333; }

  .desk-form-actions { display: flex; gap: 12px; }

  .desk-btn-primary {
    flex: 1; padding: 13px; background: ${G}; color: #fff;
    border: none; border-radius: 12px;
    font-family: 'Poppins', sans-serif; font-weight: 700;
    font-size: 0.92rem; cursor: pointer; transition: background 0.15s;
  }

  .desk-btn-primary:hover { background: ${GD}; }
  .desk-btn-primary:disabled { background: #ccc; cursor: not-allowed; }

  .desk-btn-secondary {
    padding: 13px 24px; background: #f4f4f4; color: #555;
    border: none; border-radius: 12px;
    font-family: 'Poppins', sans-serif; font-weight: 600;
    font-size: 0.88rem; cursor: pointer; transition: background 0.15s;
  }

  .desk-btn-secondary:hover { background: #eaeaea; }

  /* Driver banner */
  .desk-driver-banner {
    display: flex; align-items: center; gap: 14px;
    background: linear-gradient(135deg, ${G} 0%, #1fa360 100%);
    border-radius: 16px; padding: 18px 22px; cursor: pointer;
    box-shadow: 0 4px 20px rgba(61,190,122,0.22);
  }

  .desk-driver-icon {
    width: 48px; height: 48px; background: rgba(255,255,255,0.2);
    border-radius: 50%; display: flex; align-items: center;
    justify-content: center; font-size: 1.4rem; flex-shrink: 0;
  }

  .desk-driver-text { flex: 1; min-width: 0; }
  .desk-driver-text h4 { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 0.95rem; color: #fff; margin-bottom: 3px; }
  .desk-driver-text p { font-size: 0.76rem; color: rgba(255,255,255,0.85); }

  .desk-call-btn {
    background: #3B5BDB; color: #fff; border: none; border-radius: 10px;
    padding: 10px 20px; font-family: 'Poppins', sans-serif;
    font-weight: 700; font-size: 0.82rem; cursor: pointer;
    display: flex; align-items: center; gap: 6px; flex-shrink: 0;
    transition: background 0.15s;
  }

  .desk-call-btn:hover { background: #2f4abf; }

  /* Placeholder */
  .desk-placeholder {
    flex: 1; display: flex; align-items: center; justify-content: center; padding: 24px;
  }

  .desk-placeholder-card {
    background: #fff; border: 1px solid #efefef; border-radius: 20px; padding: 48px 36px;
    display: flex; flex-direction: column; align-items: center; gap: 14px;
    max-width: 400px; width: 100%;
    box-shadow: 0 4px 24px rgba(0,0,0,0.06); text-align: center;
  }

  .desk-ph-icon { width: 70px; height: 70px; background: ${GL}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.9rem; }
  .desk-ph-title { font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 1.15rem; color: #111; }
  .desk-ph-sub { font-size: 0.85rem; color: #aaa; line-height: 1.6; }

  .desk-ph-btn {
    margin-top: 6px; width: 100%; padding: 13px;
    background: ${G}; color: #fff; border: none; border-radius: 12px;
    font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 0.92rem;
    cursor: pointer; transition: background 0.15s;
    display: flex; align-items: center; justify-content: center; gap: 8px;
  }

  .desk-ph-btn:hover { background: ${GD}; }

  /* animations */
  @keyframes deskFade {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .desk-body > * { animation: deskFade 0.3s ease both; }
  .desk-body > *:nth-child(1) { animation-delay: 0.04s; }
  .desk-body > *:nth-child(2) { animation-delay: 0.10s; }
  .desk-body > *:nth-child(3) { animation-delay: 0.16s; }
  .desk-body > *:nth-child(4) { animation-delay: 0.22s; }

  /* Hide desktop on mobile */
  @media (max-width: 768px) {
    .desk-root { display: none !important; }
  }

  /* ══════════════════════════════════
     MOBILE LAYOUT (≤ 768px)
     App-style with bottom tab bar
  ══════════════════════════════════ */
  .mob-root {
    display: none;
    flex-direction: column;
    height: 100vh; overflow: hidden;
    background: #fff;
  }

  @media (max-width: 768px) {
    .mob-root { display: flex; }

    .mob-header {
      display: flex; align-items: center; justify-content: space-between;
      padding: 18px 16px 12px;
      border-bottom: 1px solid #f0f0f0;
      flex-shrink: 0; background: #fff;
    }

    .mob-header-left h2 {
      font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 1.3rem; color: #111;
    }

    .mob-header-left p { font-size: 0.8rem; color: #999; margin-top: 2px; }

    .mob-avatar {
      width: 42px; height: 42px; background: #ebebeb; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.2rem; cursor: pointer; flex-shrink: 0; border: none;
    }

    .mob-body {
      flex: 1; overflow-y: auto; padding: 14px 16px 12px;
      display: flex; flex-direction: column; gap: 14px;
    }

    .mob-body::-webkit-scrollbar { display: none; }

    .mob-pricing-btn {
      display: inline-flex; align-items: center; gap: 7px;
      background: ${G}; color: #fff;
      font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 0.85rem;
      padding: 10px 18px; border-radius: 10px; border: none; cursor: pointer;
      align-self: flex-start;
    }

    .mob-trip-tabs {
      display: flex; background: #f2f2f2; border-radius: 14px; padding: 4px;
    }

    .mob-trip-tab {
      flex: 1; padding: 10px 4px; border: none; background: transparent;
      font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 0.78rem;
      color: #888; border-radius: 11px; cursor: pointer; transition: all 0.2s;
      text-align: center; line-height: 1.3;
    }

    .mob-trip-tab.active {
      background: ${G}; color: #fff;
      box-shadow: 0 3px 10px rgba(61,190,122,0.28);
    }

    .mob-loc-box {
      display: flex; align-items: center; gap: 12px;
      background: #fff; border: 1.5px solid #e8e8e8;
      border-radius: 14px; padding: 14px;
      transition: border-color 0.2s;
    }

    .mob-loc-box:focus-within { border-color: ${G}; }
    .mob-loc-icon { font-size: 1.2rem; flex-shrink: 0; }

    .mob-loc-input {
      flex: 1; border: none; outline: none;
      font-family: 'Nunito', sans-serif; font-size: 0.95rem;
      color: #222; background: transparent; min-width: 0;
    }

    .mob-loc-input::placeholder { color: #bbb; }
    .mob-loc-text { font-size: 0.95rem; color: #222; font-weight: 600; flex: 1; }
    .mob-loc-arrow { color: #ccc; font-size: 0.8rem; flex-shrink: 0; }

    .mob-toggle-row { display: flex; align-items: center; gap: 12px; padding: 4px 0; }
    .mob-toggle { position: relative; width: 46px; height: 26px; flex-shrink: 0; }
    .mob-toggle input { opacity: 0; width: 0; height: 0; }

    .mob-tslider {
      position: absolute; inset: 0; background: #d0d0d0;
      border-radius: 26px; cursor: pointer; transition: background 0.2s;
    }

    .mob-tslider::before {
      content: ''; position: absolute; width: 20px; height: 20px;
      left: 3px; top: 3px; background: #fff; border-radius: 50%;
      transition: transform 0.2s; box-shadow: 0 1px 4px rgba(0,0,0,0.15);
    }

    .mob-toggle input:checked + .mob-tslider { background: ${G}; }
    .mob-toggle input:checked + .mob-tslider::before { transform: translateX(20px); }
    .mob-toggle-label { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 0.95rem; color: #333; }

    .mob-actions {
      padding: 10px 16px 8px;
      display: flex; flex-direction: column; gap: 10px; flex-shrink: 0;
    }

    .mob-select-btn {
      width: 100%; padding: 16px; background: #9e9e9e;
      border: none; border-radius: 16px;
      font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 1rem;
      color: #fff; cursor: pointer; transition: background 0.2s;
      display: flex; align-items: center; justify-content: center; gap: 8px;
    }

    .mob-select-btn.ready { background: ${G}; box-shadow: 0 4px 16px rgba(61,190,122,0.3); }

    .mob-driver-banner {
      display: flex; align-items: center;
      background: linear-gradient(135deg, ${G} 0%, #2aad6e 70%);
      border-radius: 16px; overflow: hidden; cursor: pointer;
    }

    .mob-driver-left { display: flex; align-items: center; gap: 10px; flex: 1; padding: 14px; }
    .mob-driver-icon { font-size: 1.8rem; flex-shrink: 0; }
    .mob-driver-text h4 { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 0.88rem; color: #fff; margin-bottom: 2px; }
    .mob-driver-text p { font-size: 0.72rem; color: rgba(255,255,255,0.85); }
    .mob-driver-text span { font-size: 0.72rem; color: rgba(255,255,255,0.9); font-style: italic; font-weight: 600; }

    .mob-call-side {
      width: 58px; min-height: 80px; background: #3B5BDB;
      display: flex; align-items: center; justify-content: center;
      font-size: 1.4rem; flex-shrink: 0; border: none; cursor: pointer;
    }

    .mob-bottomnav {
      display: flex; background: #fff;
      border-top: 1.5px solid #f0f0f0;
      padding: 8px 0 12px; flex-shrink: 0;
    }

    .mob-nav-item {
      flex: 1; display: flex; flex-direction: column;
      align-items: center; gap: 3px; cursor: pointer;
      border: none; background: transparent; padding: 4px 0;
    }

    .mob-nav-icon { font-size: 1.25rem; }
    .mob-nav-label { font-family: 'Poppins', sans-serif; font-size: 0.68rem; font-weight: 600; color: #aaa; }

    .mob-placeholder {
      flex: 1; display: flex; align-items: center; justify-content: center; padding: 24px;
    }

    .mob-placeholder-card {
      background: #fff; border: 1px solid #efefef; border-radius: 20px; padding: 40px 24px;
      display: flex; flex-direction: column; align-items: center; gap: 14px;
      width: 100%; text-align: center; box-shadow: 0 4px 24px rgba(0,0,0,0.06);
    }

    .mob-ph-icon { width: 64px; height: 64px; background: ${GL}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.7rem; }
    .mob-ph-title { font-family: 'Poppins', sans-serif; font-weight: 800; font-size: 1.1rem; color: #111; }
    .mob-ph-sub { font-size: 0.83rem; color: #aaa; line-height: 1.6; }

    .mob-ph-btn {
      width: 100%; padding: 13px; background: ${G}; color: #fff;
      border: none; border-radius: 12px; font-family: 'Poppins', sans-serif;
      font-weight: 700; font-size: 0.92rem; cursor: pointer;
      display: flex; align-items: center; justify-content: center; gap: 8px;
    }
  }
`;

const DESK_NAV = [
  { icon: "🏠", label: "Dashboard" },
  { icon: "🗺️", label: "My Rides" },
  { icon: "🕐", label: "History" },
];

const MOB_NAV = [
  { icon: "🏠", label: "Home" },
  { icon: "📍", label: "My Rides" },
  { icon: "🕐", label: "History" },
  { icon: "👤", label: "Profile" },
];

const DESK_TRIPS = ["Single / Round Trip", "Hourly Package", "Outstation"];
const MOB_TRIPS  = ["Single /\nRound Trip", "Hourly\nPackage", "Outstation"];

const PAGE_META = [
  { title: "Book a Ride", sub: "Where would you like to go today?" },
  { title: "My Rides",    sub: "Your current and upcoming rides" },
  { title: "History",     sub: "All your past trips" },
];

export default function Home() {
  const navigate = useNavigate();

  // Desktop state
  const [activeNav,  setActiveNav]  = useState(0);
  const [tripTab,    setTripTab]    = useState(0);
  const [roundTrip,  setRoundTrip]  = useState(false);
  const [pickup,     setPickup]     = useState("Bangalore");
  const [dropoff,    setDropoff]    = useState("");
  const [date,       setDate]       = useState("");
  const [time,       setTime]       = useState("");

  // Mobile state
  const [mobNav,      setMobNav]     = useState(0);
  const [mobTripTab,  setMobTripTab] = useState(0);
  const [mobRound,    setMobRound]   = useState(false);
  const [mobDropoff,  setMobDropoff] = useState("");

  const isReady  = dropoff.trim().length > 0;
  const mobReady = mobDropoff.trim().length > 0;

  return (
    <>
      <style>{styles}</style>

      {/* ════════════════════════════════
          DESKTOP — permanent sidebar
      ════════════════════════════════ */}
      <div className="desk-root">

        {/* Sidebar */}
        <div className="desk-sidebar">
          <div className="desk-sb-header">
            <div className="desk-sb-logo">
              <div className="desk-sb-logo-icon">🚖</div>
              <div>
                <div className="desk-sb-logo-name">NANO Taxi</div>
                <div className="desk-sb-logo-sub">Your ride, simplified</div>
              </div>
            </div>
          </div>

          <div className="desk-sb-nav">
            {DESK_NAV.map((item, i) => (
              <button
                key={i}
                className={`desk-sb-item ${activeNav === i ? "active" : ""}`}
                onClick={() => setActiveNav(i)}
              >
                <span className="desk-sb-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>

          <div className="desk-sb-footer">
            <button className="desk-sb-login" onClick={() => navigate("/login")}>
              👤 Login / Sign Up
            </button>
          </div>
        </div>

        {/* Main */}
        <div className="desk-main">
          <div className="desk-topbar">
            <div>
              <div className="desk-topbar-title">{PAGE_META[activeNav]?.title}</div>
              <div className="desk-topbar-sub">{PAGE_META[activeNav]?.sub}</div>
            </div>
            {activeNav === 0 && (
              <button className="desk-pricing-btn" onClick={() => window.open("https://www.nanotaxibooking.com/", "_blank")}>
                🏷️ Plans &amp; Pricing Info
              </button>
            )}
          </div>

          {activeNav === 0 ? (
            <div className="desk-body" key="dashboard">
              <div className="desk-stats">
                <div className="desk-stat">
                  <div className="desk-stat-label">Starting Fare</div>
                  <div className="desk-stat-value">₹11<span>/km</span></div>
                  <div className="desk-stat-tag desk-tag-g">Lowest in city</div>
                </div>
                <div className="desk-stat">
                  <div className="desk-stat-label">Availability</div>
                  <div className="desk-stat-value">24/7</div>
                  <div className="desk-stat-tag desk-tag-b">Always on</div>
                </div>
              </div>

              <div className="desk-form-card">
                <div className="desk-form-title">🚗 Plan your trip</div>
                <div className="desk-trip-tabs">
                  {DESK_TRIPS.map((t, i) => (
                    <button key={i} className={`desk-trip-tab ${tripTab === i ? "active" : ""}`} onClick={() => setTripTab(i)}>{t}</button>
                  ))}
                </div>
                <div className="desk-form-grid">
                  <div className="desk-form-group">
                    <div className="desk-form-label">Pickup Location</div>
                    <div className="desk-input-wrap"><span className="desk-input-icon">📗</span><input type="text" value={pickup} onChange={e => setPickup(e.target.value)} placeholder="Enter pickup location" /></div>
                  </div>
                  <div className="desk-form-group">
                    <div className="desk-form-label">Drop Location</div>
                    <div className="desk-input-wrap"><span className="desk-input-icon">📍</span><input type="text" value={dropoff} onChange={e => setDropoff(e.target.value)} placeholder="e.g., Chennai, Airport" /></div>
                  </div>
                  <div className="desk-form-group">
                    <div className="desk-form-label">Pickup Date</div>
                    <div className="desk-input-wrap"><span className="desk-input-icon">📅</span><input type="date" value={date} onChange={e => setDate(e.target.value)} /></div>
                  </div>
                  <div className="desk-form-group">
                    <div className="desk-form-label">Pickup Time</div>
                    <div className="desk-input-wrap"><span className="desk-input-icon">🕐</span><input type="time" value={time} onChange={e => setTime(e.target.value)} /></div>
                  </div>
                </div>
                <div className="desk-toggle-row">
                  <label className="desk-toggle">
                    <input type="checkbox" checked={roundTrip} onChange={e => setRoundTrip(e.target.checked)} />
                    <span className="desk-tslider" />
                  </label>
                  <span className="desk-toggle-label">Round Trip</span>
                </div>
                <div className="desk-form-actions">
                  <button className="desk-btn-primary" disabled={!isReady}>Select Vehicle →</button>
                  <button className="desk-btn-secondary" onClick={() => { setDropoff(""); setDate(""); setTime(""); setRoundTrip(false); }}>Clear</button>
                </div>
              </div>

              <div className="desk-driver-banner">
                <div className="desk-driver-icon">👥</div>
                <div className="desk-driver-text">
                  <h4>Get Active Drivers</h4>
                  <p>Premium • Verified • 24/7 Available — Click to know more →</p>
                </div>
                <button className="desk-call-btn">📞 Call Now</button>
              </div>
            </div>
          ) : (
            <div className="desk-placeholder">
              <div className="desk-placeholder-card">
                <div className="desk-ph-icon">{DESK_NAV[activeNav].icon}</div>
                <div className="desk-ph-title">{DESK_NAV[activeNav].label}</div>
                <div className="desk-ph-sub">{PAGE_META[activeNav]?.sub}<br />Please login to access this section.</div>
                <button className="desk-ph-btn" onClick={() => navigate("/login")}>👤 Login / Sign Up</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ════════════════════════════════
          MOBILE — app style
      ════════════════════════════════ */}
      <div className="mob-root">

        {/* Dashboard */}
        {mobNav === 0 && (
          <>
            <div className="mob-header">
              <div className="mob-header-left">
                <h2>NANO Taxi</h2>
                <p>Where would you like to go?</p>
              </div>
              <button className="mob-avatar" onClick={() => navigate("/login")}>👤</button>
            </div>

            <div className="mob-body">
              <button className="mob-pricing-btn" onClick={() => window.open("https://www.nanotaxibooking.com/", "_blank")}>
                🏷️ Plans &amp; Pricing Info
              </button>

              <div className="mob-trip-tabs">
                {MOB_TRIPS.map((t, i) => (
                  <button key={i} className={`mob-trip-tab ${mobTripTab === i ? "active" : ""}`} onClick={() => setMobTripTab(i)}>
                    {t.split("\n").map((line, j) => <span key={j} style={{ display: "block" }}>{line}</span>)}
                  </button>
                ))}
              </div>

              <div className="mob-loc-box">
                <span className="mob-loc-icon">📗</span>
                <span className="mob-loc-text">Bangalore</span>
                <span style={{ fontSize: "0.9rem", color: "#888" }}>▲</span>
                <span className="mob-loc-arrow">›</span>
              </div>

              <div className="mob-loc-box">
                <span className="mob-loc-icon">📍</span>
                <input className="mob-loc-input" placeholder="Where to? (e.g., Chennai, Airport)" value={mobDropoff} onChange={e => setMobDropoff(e.target.value)} />
                <span className="mob-loc-arrow">›</span>
              </div>

              <div className="mob-toggle-row">
                <label className="mob-toggle">
                  <input type="checkbox" checked={mobRound} onChange={e => setMobRound(e.target.checked)} />
                  <span className="mob-tslider" />
                </label>
                <span className="mob-toggle-label">Round Trip</span>
              </div>
            </div>

            <div className="mob-actions">
              <button className={`mob-select-btn ${mobReady ? "ready" : ""}`}>Select Vehicle →</button>
              <div className="mob-driver-banner">
                <div className="mob-driver-left">
                  <span className="mob-driver-icon">👥</span>
                  <div className="mob-driver-text">
                    <h4>Get Active Drivers</h4>
                    <p>Premium • Verified • 24/7 Available</p>
                    <span>Click to know more →</span>
                  </div>
                </div>
                <button className="mob-call-side">📞</button>
              </div>
            </div>
          </>
        )}

        {/* My Rides / History */}
        {(mobNav === 1 || mobNav === 2) && (
          <>
            <div className="mob-header">
              <div className="mob-header-left">
                <h2>{MOB_NAV[mobNav].label}</h2>
                <p>{PAGE_META[mobNav]?.sub || ""}</p>
              </div>
              <button className="mob-avatar" onClick={() => navigate("/login")}>👤</button>
            </div>
            <div className="mob-placeholder">
              <div className="mob-placeholder-card">
                <div className="mob-ph-icon">{MOB_NAV[mobNav].icon}</div>
                <div className="mob-ph-title">{MOB_NAV[mobNav].label}</div>
                <div className="mob-ph-sub">{PAGE_META[mobNav]?.sub || ""}<br />Please login to access this section.</div>
                <button className="mob-ph-btn" onClick={() => navigate("/login")}>👤 Login / Sign Up</button>
              </div>
            </div>
          </>
        )}

        {/* Profile */}
        {mobNav === 3 && (
          <>
            <div className="mob-header">
              <div className="mob-header-left">
                <h2>Profile</h2>
                <p>Manage your account</p>
              </div>
              <button className="mob-avatar" onClick={() => navigate("/login")}>👤</button>
            </div>
            <div className="mob-placeholder">
              <div className="mob-placeholder-card">
                <div className="mob-ph-icon">👤</div>
                <div className="mob-ph-title">Profile</div>
                <div className="mob-ph-sub">Manage your account preferences.<br />Please login to access this section.</div>
                <button className="mob-ph-btn" onClick={() => navigate("/login")}>👤 Login / Sign Up</button>
              </div>
            </div>
          </>
        )}

        {/* Bottom Tab Bar */}
        <div className="mob-bottomnav">
          {MOB_NAV.map((n, i) => (
            <button key={i} className={`mob-nav-item ${mobNav === i ? "active" : ""}`} onClick={() => setMobNav(i)}>
              <span className="mob-nav-icon">{n.icon}</span>
              <span className="mob-nav-label" style={{ color: mobNav === i ? G : "#aaa" }}>{n.label}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}