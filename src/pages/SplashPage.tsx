import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="mobile-container"
      style={{
        background: "var(--gradient-header)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Logo area */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "40px" }}>
        {/* Icon */}
        <div
          style={{
            width: "96px",
            height: "96px",
            borderRadius: "24px",
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            border: "2px solid rgba(255,255,255,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <svg width="54" height="54" viewBox="0 0 54 54" fill="none">
            <circle cx="27" cy="27" r="27" fill="rgba(255,255,255,0.1)" />
            <path d="M14 38L20 24L27 32L33 20L40 38" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M27 16L30 22H24L27 16Z" fill="rgba(18,201,142,1)" />
            <circle cx="27" cy="27" r="3" fill="white" />
          </svg>
        </div>
        {/* App name */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <span style={{ fontSize: "32px", fontWeight: "700", color: "white", letterSpacing: "4px", lineHeight: "1.2" }}>益驾增收</span>
          <div style={{ width: "60px", height: "2px", background: "rgba(18,201,142,1)", borderRadius: "1px", margin: "10px 0" }}></div>
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", letterSpacing: "1px" }}>让司机收入更透明</span>
        </div>
      </div>

      {/* Feature tags */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "60px" }}>
        {["动态抽成", "智能测算", "透明增收"].map((tag) => (
          <div
            key={tag}
            style={{
              padding: "5px 14px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.15)",
              border: "1px solid rgba(255,255,255,0.3)",
              color: "white",
              fontSize: "12px",
              fontWeight: "500",
            }}
          >
            {tag}
          </div>
        ))}
      </div>

      {/* Loading dots */}
      <div style={{ position: "absolute", bottom: "100px", display: "flex", gap: "8px" }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: i === 0 ? "white" : "rgba(255,255,255,0.4)",
            }}
          ></div>
        ))}
      </div>

      {/* Bottom version */}
      <div style={{ position: "absolute", bottom: "40px", color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>
        v1.0.0 · 益驾增收平台
      </div>

      {/* Skip button */}
      <button
        onClick={() => navigate("/login")}
        style={{
          position: "absolute",
          top: "60px",
          right: "20px",
          background: "rgba(255,255,255,0.2)",
          border: "none",
          borderRadius: "20px",
          padding: "4px 14px",
          color: "white",
          fontSize: "13px",
          cursor: "pointer",
        }}
      >
        跳过
      </button>
    </div>
  );
};

export default SplashPage;
