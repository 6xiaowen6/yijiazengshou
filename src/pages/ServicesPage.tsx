import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Phone, ChevronRight, Zap, Shield, Wrench, Fuel, Car } from "lucide-react";
import { TabBar } from "../components/MobileFrame";

const CATEGORIES = [
  { key: "all", label: "全部", icon: "🏠" },
  { key: "charge", label: "充电", icon: "⚡" },
  { key: "insurance", label: "保险", icon: "🛡" },
  { key: "repair", label: "养护", icon: "🔧" },
  { key: "fuel", label: "加油", icon: "⛽" },
  { key: "wash", label: "洗车", icon: "🚗" },
];

const SERVICES = [
  {
    id: 1, category: "charge", name: "星星充电 府西街广场站",
    discount: "充100送15", distance: "0.8km", time: "24小时",
    tag: "热门", rating: 4.8, reviews: 328, icon: "⚡",
    desc: "60个快充桩，平均等待5分钟",
  },
  {
    id: 2, category: "charge", name: "特来电 太原长风街站",
    discount: "会员7折", distance: "1.2km", time: "06:00-23:00",
    tag: "新", rating: 4.6, reviews: 156, icon: "⚡",
    desc: "支持国标直流快充，最大功率120kW",
  },
  {
    id: 3, category: "insurance", name: "平安车险 司机专属套餐",
    discount: "年费立省680元", distance: "线上购买", time: "全天候",
    tag: "推荐", rating: 4.9, reviews: 512, icon: "🛡",
    desc: "三者险+车损险+营运险，一键投保",
  },
  {
    id: 4, category: "insurance", name: "人保司机意外险",
    discount: "首月1元体验", distance: "线上购买", time: "全天候",
    tag: "特惠", rating: 4.7, reviews: 203, icon: "🛡",
    desc: "意外伤害+住院津贴，营运专属保障",
  },
  {
    id: 5, category: "repair", name: "途虎养车 府西街店",
    discount: "保养8折", distance: "2.1km", time: "08:30-20:00",
    tag: "热门", rating: 4.7, reviews: 445, icon: "🔧",
    desc: "全合成机油+滤芯更换，原厂品质",
  },
  {
    id: 6, category: "fuel", name: "中石化太原府西街加油站",
    discount: "0.15元/升优惠", distance: "1.5km", time: "24小时",
    tag: "优惠", rating: 4.5, reviews: 892, icon: "⛽",
    desc: "92#/95#全品种，刷IC卡享折扣",
  },
  {
    id: 7, category: "wash", name: "闪洗洗车 府西街店",
    discount: "首次5折", distance: "0.6km", time: "08:00-21:00",
    tag: "新店", rating: 4.6, reviews: 78, icon: "🚗",
    desc: "精洗+打蜡，专业设备无损车漆",
  },
];

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  "热门": { bg: "var(--red-light)", text: "var(--destructive)" },
  "新": { bg: "var(--blue-light)", text: "var(--primary)" },
  "推荐": { bg: "var(--green-light)", text: "var(--success)" },
  "特惠": { bg: "var(--orange-light)", text: "var(--warning)" },
  "优惠": { bg: "var(--green-light)", text: "var(--success)" },
  "新店": { bg: "var(--blue-light)", text: "var(--primary)" },
};

const ServicesPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered = SERVICES.filter((s) => activeCategory === "all" || s.category === activeCategory);

  return (
    <div className="mobile-container" style={{ background: "var(--background)" }}>
      {/* Header */}
      <div style={{ background: "var(--gradient-header)", paddingBottom: "16px" }}>
        <div style={{ height: "44px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
          <span style={{ color: "white", fontSize: "12px" }}>9:41</span>
          <span style={{ color: "white", fontSize: "17px", fontWeight: "600" }}>优惠服务</span>
          <MapPin size={18} color="white" />
        </div>
        <div style={{ padding: "0 16px" }}>
          <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: "10px", padding: "8px 14px", display: "flex", alignItems: "center", gap: "8px" }}>
            <MapPin size={14} color="rgba(255,255,255,0.8)" />
            <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "13px" }}>太原市 · 迎泽区 · 府西街广场附近</span>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ background: "var(--card)", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", overflowX: "auto", padding: "0 12px", gap: "8px", scrollbarWidth: "none" }}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "3px",
                padding: "6px 12px",
                borderRadius: "10px",
                border: `1px solid ${activeCategory === cat.key ? "var(--primary)" : "transparent"}`,
                background: activeCategory === cat.key ? "var(--blue-light)" : "transparent",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: "20px" }}>{cat.icon}</span>
              <span style={{ fontSize: "12px", color: activeCategory === cat.key ? "var(--primary)" : "var(--muted-foreground)", fontWeight: activeCategory === cat.key ? "600" : "400" }}>
                {cat.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Services list */}
      <div className="page-scroll" style={{ height: "812px - 44px - 118px - 56px", maxHeight: "594px", overflowY: "auto", padding: "12px 16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.map((service) => {
            const tagColor = TAG_COLORS[service.tag] || { bg: "var(--blue-light)", text: "var(--primary)" };
            return (
              <div
                key={service.id}
                onClick={() => navigate("/service-detail")}
                style={{ background: "var(--card)", borderRadius: "14px", padding: "14px", cursor: "pointer", boxShadow: "0 1px 8px rgba(27,108,242,0.06)" }}
              >
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: "var(--blue-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: "24px" }}>{service.icon}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "3px" }}>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)" }}>{service.name}</span>
                      <span style={{ padding: "2px 8px", borderRadius: "5px", background: tagColor.bg, color: tagColor.text, fontSize: "11px", fontWeight: "600", flexShrink: 0, marginLeft: "6px" }}>{service.tag}</span>
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--muted-foreground)", marginBottom: "6px" }}>{service.desc}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--success)" }}>{service.discount}</span>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); }}
                          style={{ padding: "5px 10px", borderRadius: "8px", background: "var(--blue-light)", border: "none", color: "var(--primary)", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                        >
                          <MapPin size={11} /> 导航
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); }}
                          style={{ padding: "5px 10px", borderRadius: "8px", background: "var(--green-light)", border: "none", color: "var(--success)", fontSize: "12px", cursor: "pointer", display: "flex", alignItems: "center", gap: "4px" }}
                        >
                          <Phone size={11} /> 电话
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", gap: "16px", marginTop: "10px", paddingTop: "10px", borderTop: "1px solid var(--border)" }}>
                  <span style={{ fontSize: "12px", color: "var(--muted-foreground)", display: "flex", alignItems: "center", gap: "4px" }}>
                    <MapPin size={11} /> {service.distance}
                  </span>
                  <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>⏰ {service.time}</span>
                  <span style={{ fontSize: "12px", color: "var(--warning)" }}>⭐ {service.rating} ({service.reviews}条评价)</span>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ height: "20px" }}></div>
      </div>

      <TabBar />
    </div>
  );
};

export default ServicesPage;
