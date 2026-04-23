import { useNavigate } from "react-router-dom";
import { MapPin, Phone, Share2, Clock, Star, ChevronLeft } from "lucide-react";

const ServiceDetailPage = () => {
  const navigate = useNavigate();

  const service = {
    name: "星星充电 府西街广场站",
    category: "充电优惠",
    icon: "⚡",
    discount: "充100送15",
    desc: "府西街广场地下一层充电站，60个快充桩全天候开放。支持国标直流快充，最大功率120kW，平均充电30分钟补能200km以上。",
    rules: [
      "充值100元赠15元余额，可叠加使用",
      "每日10:00-16:00享受9折优惠",
      "新用户首次充电立享5折优惠",
      "累计充电满500元升级VIP享8折常态优惠",
    ],
    validity: "2024-12-31",
    address: "太原市迎泽区府西街广场地下一层B3区",
    phone: "0351-8888-6666",
    hours: "24小时",
    distance: "0.8km",
    rating: 4.8,
    reviews: 328,
  };

  return (
    <div className="mobile-container" style={{ background: "var(--background)" }}>
      {/* Header image area */}
      <div style={{ height: "200px", background: "var(--gradient-header)", position: "relative" }}>
        {/* Status bar */}
        <div style={{ height: "44px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", position: "relative", zIndex: 10 }}>
          <button onClick={() => navigate("/services")} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <ChevronLeft size={16} color="white" />
          </button>
          <button style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
            <Share2 size={14} color="white" />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "136px" }}>
          <div style={{ width: "72px", height: "72px", borderRadius: "20px", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
            <span style={{ fontSize: "38px" }}>{service.icon}</span>
          </div>
          <span style={{ color: "white", fontSize: "18px", fontWeight: "700" }}>{service.name}</span>
          <span className="badge-blue" style={{ marginTop: "6px", background: "rgba(255,255,255,0.2)", color: "white", border: "1px solid rgba(255,255,255,0.3)" }}>{service.category}</span>
        </div>
      </div>

      <div className="page-scroll" style={{ height: "556px", overflowY: "auto", padding: "0 16px 16px" }}>
        {/* Discount highlight */}
        <div style={{ background: "var(--gradient-primary)", borderRadius: "14px", padding: "16px", margin: "14px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", marginBottom: "4px" }}>专属优惠</div>
            <div style={{ color: "white", fontSize: "24px", fontWeight: "700" }}>{service.discount}</div>
          </div>
          <div style={{ display: "flex", gap: "4px" }}>
            <Star size={14} color="rgba(255,255,255,0.8)" fill="rgba(255,255,255,0.6)" />
            <span style={{ color: "white", fontSize: "14px", fontWeight: "600" }}>{service.rating}</span>
            <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>({service.reviews})</span>
          </div>
        </div>

        {/* Location & contact */}
        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "14px 16px", marginBottom: "12px" }}>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)", marginBottom: "12px" }}>门店信息</div>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "flex-start" }}>
            <MapPin size={16} color="var(--primary)" style={{ marginTop: "2px", flexShrink: 0 }} />
            <span style={{ fontSize: "14px", color: "var(--foreground)", lineHeight: "1.5" }}>{service.address}</span>
          </div>
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px", alignItems: "center" }}>
            <Phone size={16} color="var(--primary)" />
            <span style={{ fontSize: "14px", color: "var(--foreground)" }}>{service.phone}</span>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <Clock size={16} color="var(--primary)" />
            <span style={{ fontSize: "14px", color: "var(--foreground)" }}>营业时间：{service.hours}</span>
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
            <button style={{ flex: 1, height: "40px", borderRadius: "10px", background: "var(--blue-light)", border: "none", color: "var(--primary)", fontSize: "14px", fontWeight: "500", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
              <MapPin size={14} /> 一键导航
            </button>
            <button style={{ flex: 1, height: "40px", borderRadius: "10px", background: "var(--green-light)", border: "none", color: "var(--success)", fontSize: "14px", fontWeight: "500", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
              <Phone size={14} /> 电话联系
            </button>
          </div>
        </div>

        {/* Description */}
        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "14px 16px", marginBottom: "12px" }}>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)", marginBottom: "10px" }}>优惠介绍</div>
          <p style={{ fontSize: "14px", color: "var(--muted-foreground)", lineHeight: "1.8" }}>{service.desc}</p>
        </div>

        {/* Rules */}
        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "14px 16px", marginBottom: "12px" }}>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)", marginBottom: "10px" }}>使用规则</div>
          {service.rules.map((rule, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "8px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--primary)", marginTop: "7px", flexShrink: 0 }}></div>
              <span style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.6" }}>{rule}</span>
            </div>
          ))}
          <div style={{ marginTop: "10px", padding: "8px 12px", background: "var(--orange-light)", borderRadius: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
            <Clock size={13} color="var(--warning)" />
            <span style={{ fontSize: "12px", color: "var(--warning)" }}>有效期至：{service.validity}</span>
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div style={{ position: "absolute", bottom: 0, left: 0, width: "375px", padding: "12px 16px", background: "white", borderTop: "1px solid var(--border)" }}>
        <button className="btn-primary" style={{ height: "52px" }}>
          立即领取优惠
        </button>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
