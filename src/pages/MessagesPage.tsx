import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Tag, Megaphone, ChevronRight } from "lucide-react";
import { TabBar } from "../components/MobileFrame";

const MESSAGES = [
  {
    id: 1, type: "policy", icon: "📢", title: "重要政策更新",
    desc: "交通运输部最新发布网约车平台抽成上限管理规定，最高抽成不超过30%，详情请查看",
    time: "10分钟前", unread: true,
  },
  {
    id: 2, type: "discount", icon: "🎁", title: "专属优惠来了",
    desc: "太原府西街区域充电站本周三至周五享受7折优惠，限时领取，先到先得",
    time: "2小时前", unread: true,
  },
  {
    id: 3, type: "system", icon: "🔔", title: "您的测算记录已保存",
    desc: "2024-01-15 晚高峰测算结果已保存至历史记录，累计增收 +¥3.46",
    time: "昨天 18:32", unread: false,
  },
  {
    id: 4, type: "policy", icon: "📋", title: "平台政策透明化倡议",
    desc: "益驾增收联合多家平台推进抽成公示制度，您的参与将推动行业透明化进程",
    time: "昨天 10:00", unread: false,
  },
  {
    id: 5, type: "discount", icon: "🛡", title: "保险团购开始了",
    desc: "平安车险司机专属套餐团购已开启，年费立省680元，已有3,284位司机参与",
    time: "2天前", unread: false,
  },
  {
    id: 6, type: "system", icon: "✅", title: "个人信息完善成功",
    desc: "您的车辆信息已更新：经济型 · 1-3年车龄 · 太原市，测算将更加精准",
    time: "3天前", unread: false,
  },
];

const TYPE_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  policy: { label: "政策公告", color: "var(--destructive)", bg: "var(--red-light)" },
  discount: { label: "优惠推送", color: "var(--success)", bg: "var(--green-light)" },
  system: { label: "系统通知", color: "var(--primary)", bg: "var(--blue-light)" },
};

const MessagesPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [messages, setMessages] = useState(MESSAGES);

  const TABS = [
    { key: "all", label: "全部" },
    { key: "policy", label: "公告" },
    { key: "discount", label: "优惠" },
    { key: "system", label: "系统" },
  ];

  const filtered = messages.filter((m) => activeTab === "all" || m.type === activeTab);
  const unreadCount = messages.filter((m) => m.unread).length;

  const markAllRead = () => {
    setMessages(messages.map((m) => ({ ...m, unread: false })));
  };

  return (
    <div className="mobile-container" style={{ background: "var(--background)" }}>
      {/* Header */}
      <div style={{ background: "var(--gradient-header)", paddingBottom: "0" }}>
        <div style={{ height: "44px", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
          <span style={{ color: "white", fontSize: "12px" }}>9:41</span>
          <span style={{ color: "white", fontSize: "17px", fontWeight: "600" }}>消息通知</span>
          <button onClick={markAllRead} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.8)", fontSize: "12px", cursor: "pointer" }}>
            全部已读
          </button>
        </div>

        {unreadCount > 0 && (
          <div style={{ padding: "0 16px 12px", display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#FF4D4F" }}></div>
            <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "13px" }}>您有 {unreadCount} 条未读消息</span>
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: "flex", padding: "0 16px" }}>
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                flex: 1,
                padding: "10px 0",
                background: "none",
                border: "none",
                cursor: "pointer",
                color: activeTab === tab.key ? "white" : "rgba(255,255,255,0.6)",
                fontWeight: activeTab === tab.key ? "600" : "400",
                fontSize: "14px",
                borderBottom: activeTab === tab.key ? "2px solid white" : "2px solid transparent",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Messages list */}
      <div className="page-scroll" style={{ height: "636px", overflowY: "auto", padding: "12px 16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.map((msg) => {
            const typeInfo = TYPE_LABELS[msg.type];
            return (
              <div
                key={msg.id}
                style={{
                  background: "var(--card)",
                  borderRadius: "14px",
                  padding: "14px",
                  position: "relative",
                  boxShadow: msg.unread ? "0 2px 12px rgba(27,108,242,0.1)" : "0 1px 6px rgba(0,0,0,0.04)",
                  border: msg.unread ? "1px solid var(--blue-light)" : "1px solid transparent",
                }}
              >
                {msg.unread && (
                  <div style={{ position: "absolute", top: "14px", right: "14px", width: "8px", height: "8px", borderRadius: "50%", background: "var(--destructive)" }}></div>
                )}
                <div style={{ display: "flex", gap: "12px" }}>
                  <div style={{ width: "44px", height: "44px", borderRadius: "12px", background: typeInfo.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <span style={{ fontSize: "22px" }}>{msg.icon}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                      <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)" }}>{msg.title}</span>
                    </div>
                    <span style={{ padding: "1px 8px", borderRadius: "4px", background: typeInfo.bg, color: typeInfo.color, fontSize: "11px", fontWeight: "500" }}>{typeInfo.label}</span>
                    <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.6", marginTop: "6px" }}>{msg.desc}</p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                      <span style={{ fontSize: "12px", color: "var(--muted-foreground)" }}>{msg.time}</span>
                      <span style={{ fontSize: "12px", color: "var(--primary)", cursor: "pointer" }}>查看详情</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted-foreground)" }}>
            <Bell size={40} color="var(--muted-foreground)" style={{ margin: "0 auto 12px", display: "block" }} />
            <div>暂无相关消息</div>
          </div>
        )}
        <div style={{ height: "20px" }}></div>
      </div>

      <TabBar />
    </div>
  );
};

export default MessagesPage;
