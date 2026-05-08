import { useState, useRef } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Nunito:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { height: 100%; overflow: hidden; }

  .lp-page {
    position: fixed; inset: 0;
    font-family: 'Nunito', sans-serif;
    background: #f0f4f0;
    overflow: hidden;
  }

  /* ── GREEN TOP ── */
  .lp-top {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 42%;
    background: linear-gradient(160deg, #2ecc71 0%, #17a850 100%);
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    padding-bottom: 36px;
    z-index: 0;
  }

  .lp-top::after {
    content: '';
    position: absolute;
    bottom: -28px; left: 0; right: 0;
    height: 56px;
    background: #f0f4f0;
    border-radius: 50% 50% 0 0 / 28px 28px 0 0;
  }

  .lp-car-circle {
    width: 74px; height: 74px;
    background: rgba(255,255,255,0.22);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 10px;
    font-size: 2.1rem;
  }

  .lp-brand {
    font-family: 'Poppins', sans-serif;
    font-weight: 800; font-size: 1.75rem;
    color: #fff; margin-bottom: 3px;
  }

  .lp-brand-sub {
    font-size: 0.88rem;
    color: rgba(255,255,255,0.82);
    font-weight: 500;
  }

  /* ── CARD ── */
  .lp-card {
    position: absolute;
    top: 32%;
    left: 50%; transform: translateX(-50%);
    background: #fff;
    border-radius: 26px;
    padding: 24px 22px 20px;
    width: calc(100% - 32px);
    max-width: 400px;
    box-shadow: 0 8px 40px rgba(0,0,0,0.13);
    z-index: 10;
    animation: lpFadeIn 0.3s ease both;
  }

  .lp-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 800; font-size: 1.4rem;
    color: #111; margin-bottom: 2px;
  }

  .lp-sub {
    font-size: 0.84rem; color: #999;
    margin-bottom: 16px; font-weight: 500;
  }

  /* ── TABS ── */
  .lp-tabs {
    display: flex; gap: 10px; margin-bottom: 14px;
  }

  .lp-tab {
    flex: 1;
    display: flex; align-items: center; justify-content: center; gap: 6px;
    padding: 10px 8px;
    border-radius: 12px;
    border: 2px solid #e5e5e5;
    background: #fafafa;
    font-family: 'Poppins', sans-serif;
    font-weight: 600; font-size: 0.9rem;
    color: #17a850;
    cursor: pointer;
    transition: all 0.2s;
  }

  .lp-tab.active {
    background: #17a850; border-color: #17a850; color: #fff;
    box-shadow: 0 3px 12px rgba(23,168,80,0.26);
  }

  .lp-tab:not(.active):hover { border-color: #17a850; background: #f0fdf4; }

  /* ── INPUT ── */
  .lp-input-wrap {
    display: flex; align-items: center; gap: 10px;
    background: #f6f6f6; border: 2px solid #ebebeb;
    border-radius: 12px; padding: 12px 14px;
    margin-bottom: 10px;
    transition: border-color 0.2s, background 0.2s;
  }

  .lp-input-wrap:focus-within { border-color: #17a850; background: #f0fdf4; }

  .lp-icon { font-size: 1.05rem; color: #bbb; flex-shrink: 0; }

  .lp-input-wrap input {
    flex: 1; border: none; background: transparent;
    font-family: 'Nunito', sans-serif;
    font-size: 0.93rem; color: #222; outline: none;
  }

  .lp-input-wrap input::placeholder { color: #c0c0c0; }

  .lp-eye { background: none; border: none; cursor: pointer; font-size: 0.95rem; color: #bbb; padding: 0; }

  /* ── OTP ── */
  .lp-otp-label {
    font-size: 0.82rem; color: #888; font-weight: 600;
    margin-bottom: 10px; text-align: center;
  }

  .lp-otp-row { display: flex; gap: 10px; justify-content: center; margin-bottom: 12px; }

  .lp-otp-box {
    width: 48px; height: 50px;
    border: 2px solid #e0e0e0; border-radius: 11px;
    background: #f6f6f6;
    font-family: 'Poppins', sans-serif;
    font-size: 1.3rem; font-weight: 700;
    color: #17a850; text-align: center; outline: none;
    transition: border-color 0.2s;
  }

  .lp-otp-box:focus { border-color: #17a850; background: #f0fdf4; }

  .lp-resend { text-align: center; font-size: 0.82rem; color: #999; margin-bottom: 10px; }
  .lp-resend span { color: #17a850; font-weight: 700; cursor: pointer; }

  /* ── BUTTON ── */
  .lp-btn {
    width: 100%;
    background: linear-gradient(135deg, #2ecc71 0%, #17a850 100%);
    color: #fff; border: none; border-radius: 12px;
    padding: 13px;
    font-family: 'Poppins', sans-serif;
    font-weight: 700; font-size: 0.98rem;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    box-shadow: 0 4px 16px rgba(23,168,80,0.30);
    transition: transform 0.15s, box-shadow 0.15s;
    margin-top: 4px; margin-bottom: 14px;
  }

  .lp-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 22px rgba(23,168,80,0.40); }
  .lp-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  /* ── LINKS ── */
  .lp-divider { height: 1px; background: #f0f0f0; margin: 10px 0; }

  .lp-link-row {
    text-align: center; font-size: 0.85rem;
    color: #999; margin-bottom: 7px; font-weight: 500;
  }

  .lp-link-row a, .lp-inline-btn {
    color: #17a850; font-weight: 700;
    text-decoration: none; cursor: pointer;
    background: none; border: none; padding: 0;
    font-family: 'Nunito', sans-serif; font-size: 0.85rem;
  }
  .lp-link-row a:hover, .lp-inline-btn:hover { text-decoration: underline; }

  /* ── STEP DOTS ── */
  .lp-step-hint { display: flex; align-items: center; gap: 5px; margin-bottom: 12px; }
  .lp-step-dot { width: 7px; height: 7px; border-radius: 50%; background: #e0e0e0; transition: all 0.2s; }
  .lp-step-dot.active { background: #17a850; width: 18px; border-radius: 4px; }

  /* ── ANIMATION ── */
  @keyframes lpFadeIn {
    from { opacity: 0; transform: translateX(-50%) translateY(14px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }

  .lp-animate { animation: lpFadeIn2 0.25s ease both; }

  @keyframes lpFadeIn2 {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`;

const VIEW = { LOGIN: "login", SIGNUP: "signup", RESET: "reset" };
const TAB  = { EMAIL: "email", MOBILE: "mobile" };
const STEP = { FORM: "form", OTP: "otp" };

const headings = {
  [VIEW.LOGIN]:  { title: "Welcome Back",   sub: "Login to continue your journey" },
  [VIEW.SIGNUP]: { title: "Create Account", sub: "Sign up to get started" },
  [VIEW.RESET]:  { title: "Reset Password", sub: "We'll send an OTP to reset your password" },
};

export default function LogIn() {
  const [view, setView] = useState(VIEW.LOGIN);
  const [tab,  setTab]  = useState(TAB.EMAIL);
  const [step, setStep] = useState(STEP.FORM);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({ email: "", mobile: "", password: "" });
  const [otp,  setOtp]  = useState(["", "", "", ""]);
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  const handle = (f) => (e) => setForm({ ...form, [f]: e.target.value });

  const switchView = (v) => {
    setView(v); setStep(STEP.FORM); setTab(TAB.EMAIL);
    setForm({ email: "", mobile: "", password: "" });
    setOtp(["", "", "", ""]);
    setShowPass(false);
  };

  const handleOtp = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp]; next[i] = val; setOtp(next);
    if (val && i < 3) otpRefs[i + 1].current.focus();
  };

  const handleOtpKey = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs[i - 1].current.focus();
  };

  const contactVal = tab === TAB.EMAIL ? form.email : form.mobile;
  const isLoginReady   = contactVal && form.password;
  const isSendOtpReady = !!contactVal;
  const isOtpComplete  = otp.every(d => d !== "");

  const { title, sub } = headings[view];

  return (
    <>
      <style>{styles}</style>
      <div className="lp-page">

        {/* GREEN TOP */}
        <div className="lp-top">
          <div className="lp-car-circle">🚖</div>
          <div className="lp-brand">NANO Taxi</div>
          <div className="lp-brand-sub">Your ride, simplified</div>
        </div>

        {/* CARD */}
        <div className="lp-card" key={view + step}>

          {view !== VIEW.LOGIN && (
            <div className="lp-step-hint">
              <div className={`lp-step-dot ${step === STEP.FORM ? "active" : ""}`} />
              <div className={`lp-step-dot ${step === STEP.OTP  ? "active" : ""}`} />
            </div>
          )}

          <div className="lp-title">{title}</div>
          <div className="lp-sub">{sub}</div>

          {/* ── LOGIN ── */}
          {view === VIEW.LOGIN && (
            <>
              <div className="lp-tabs">
                <button className={`lp-tab ${tab === TAB.EMAIL ? "active" : ""}`} onClick={() => setTab(TAB.EMAIL)}>✉️ Email</button>
                <button className={`lp-tab ${tab === TAB.MOBILE ? "active" : ""}`} onClick={() => setTab(TAB.MOBILE)}>📱 Mobile</button>
              </div>
              <div className="lp-animate" key={tab}>
                {tab === TAB.EMAIL
                  ? <div className="lp-input-wrap"><span className="lp-icon">✉️</span><input type="email" placeholder="Enter your email" value={form.email} onChange={handle("email")} /></div>
                  : <div className="lp-input-wrap"><span className="lp-icon">📱</span><input type="tel" placeholder="Enter your mobile number" value={form.mobile} onChange={handle("mobile")} maxLength={10} /></div>
                }
                <div className="lp-input-wrap">
                  <span className="lp-icon">🔒</span>
                  <input type={showPass ? "text" : "password"} placeholder="Enter your password" value={form.password} onChange={handle("password")} />
                  <button className="lp-eye" onClick={() => setShowPass(!showPass)}>{showPass ? "👁️" : "🙈"}</button>
                </div>
              </div>
              <button className="lp-btn" disabled={!isLoginReady}>Login →</button>
              <div className="lp-link-row">Forgot your password? <button className="lp-inline-btn" onClick={() => switchView(VIEW.RESET)}>Reset it</button></div>
              <div className="lp-divider" />
              <div className="lp-link-row">Don't have an account? <button className="lp-inline-btn" onClick={() => switchView(VIEW.SIGNUP)}>Sign Up</button></div>
            </>
          )}

          {/* ── SIGNUP / RESET — STEP 1 ── */}
          {view !== VIEW.LOGIN && step === STEP.FORM && (
            <>
              <div className="lp-tabs">
                <button className={`lp-tab ${tab === TAB.EMAIL ? "active" : ""}`} onClick={() => setTab(TAB.EMAIL)}>✉️ Email</button>
                <button className={`lp-tab ${tab === TAB.MOBILE ? "active" : ""}`} onClick={() => setTab(TAB.MOBILE)}>📱 Mobile</button>
              </div>
              <div className="lp-animate" key={tab}>
                {tab === TAB.EMAIL
                  ? <div className="lp-input-wrap"><span className="lp-icon">✉️</span><input type="email" placeholder="Enter your email" value={form.email} onChange={handle("email")} /></div>
                  : <div className="lp-input-wrap"><span className="lp-icon">📱</span><input type="tel" placeholder="Enter your mobile number" value={form.mobile} onChange={handle("mobile")} maxLength={10} /></div>
                }
              </div>
              <button className="lp-btn" disabled={!isSendOtpReady} onClick={() => setStep(STEP.OTP)}>Send OTP →</button>
              <div className="lp-divider" />
              {view === VIEW.SIGNUP
                ? <div className="lp-link-row">Already have an account? <button className="lp-inline-btn" onClick={() => switchView(VIEW.LOGIN)}>Login</button></div>
                : <div className="lp-link-row">Remembered it? <button className="lp-inline-btn" onClick={() => switchView(VIEW.LOGIN)}>Login</button></div>
              }
            </>
          )}

          {/* ── SIGNUP / RESET — STEP 2 OTP ── */}
          {view !== VIEW.LOGIN && step === STEP.OTP && (
            <div className="lp-animate">
              <div className="lp-otp-label">
                OTP sent to <strong style={{ color: "#17a850" }}>{contactVal}</strong>
              </div>
              <div className="lp-otp-row">
                {otp.map((d, i) => (
                  <input key={i} ref={otpRefs[i]} className="lp-otp-box"
                    maxLength={1} value={d}
                    onChange={(e) => handleOtp(i, e.target.value)}
                    onKeyDown={(e) => handleOtpKey(i, e)}
                  />
                ))}
              </div>
              <div className="lp-resend">Didn't receive? <span onClick={() => setOtp(["","","",""])}>Resend OTP</span></div>
              <button className="lp-btn" disabled={!isOtpComplete}>
                {view === VIEW.SIGNUP ? "Verify & Sign Up →" : "Verify & Reset →"}
              </button>
              <div className="lp-link-row"><button className="lp-inline-btn" onClick={() => setStep(STEP.FORM)}>← Change {tab === TAB.EMAIL ? "email" : "number"}</button></div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}