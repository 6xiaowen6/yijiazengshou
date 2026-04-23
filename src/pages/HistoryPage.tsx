import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Trash2, ChevronRight, TrendingUp } from "lucide-react";
import { PageWrapper } from "../components/MobileFrame";

const MOCK_RECORDS = [
  { id: 1, date: "2024-01-15 18:32", mileage: 12.3, income: 38.50, originalRate: 21, newRate: 12, increase: 3.46, timeSlot: "晚高峰" },
  { id: 2, date: "2024-01-15 09:14", mileage: 8.6, income: 26.80, originalRate: 21, newRate: 13, increase: 2.14, timeSlot: "早高峰" },
  { id: 3, date: "2024-01-14 20:05", mileage: 25.1, income: 68.30, originalRate: 22, newRate: 11, increase: 7.51, timeSlot: "夜间" },
  { id: 4, date: "2024-01-14 14:22", mileage: 6.9, income: 22.50, originalRate: 21, newRate: 15, increase: 1.35, timeSlot: "平峰" },
  { id: 5, date: "2024-01-13 17:48", mileage: 18.4, income: 52.60, originalRate: 21, newRate: 12, increase: 4.73, timeSlot: "晚高峰" },
  { id: 6, date: "2024-01-13 08:30", mileage: 9.2, income: 29.40, originalRate: 21, newRate: 14, increase: 2.06, timeSlot: "早高峰" },
];

const HistoryPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [records, setRecords] = useState(MOCK_RECORDS);
  const [filter, setFilter] = useState("全部");

  const FILTERS = ["全部", "今日", "本周", "本月"];

  const totalIncrease = records.reduce((sum, r) => sum + r.increase, 0);
  const avgIncrease = (totalIncrease / records.length).toFixed(2);

  const filtered = records.filter((r) => {
    if (search) return r.date.includes(search) || r.timeSlot.includes(search);
    return true;
  });

  const handleDelete = (id: number) => {
    setRecords(records.filter((r) => r.id !== id));
  };

  return (
    <PageWrapper title="历史测算记录" showBack backPath="/profile">
      <div style={{ padding: "16px" }}>
        {/* Summary */}
        <div style={{ background: "var(--gradient-primary)", borderRadius: "14px", padding: "16px", marginBottom: "14px", display: "flex", gap: "0" }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", marginBottom: "4px" }}>累计增收</div>
            <div style={{ color: "white", fontSize: "22px", fontWeight: "700" }}>¥{totalIncrease.toFixed(2)}</div>
          </div>
          <div style={{ width: "1px", background: "rgba(255,255,255,0.3)" }}></div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", marginBottom: "4px" }}>测算次数</div>
            <div style={{ color: "white", fontSize: "22px", fontWeight: "700" }}>{records.length}</div>
          </div>
          <div style={{ width: "1px", background: "rgba(255,255,255,0.3)" }}></div>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", marginBottom: "4px" }}>均次增收</div>
            <div style={{ color: "rgba(18,201,142,1)", fontSize: "22px", fontWeight: "700" }}>¥{avgIncrease}</div>
          </div>
        </div>

        {/* Search */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
          <div style={{ flex: 1, display: "flex", alignItems: "center", background: "var(--card)", borderRadius: "10px", padding: "0 12px", height: "40px", gap: "8px", border: "1px solid var(--border)" }}>
            <Search size={16} color="var(--muted-foreground)" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索记录"
              style={{ background: "none", border: "none", outline: "none", flex: 1, fontSize: "14px", color: "var(--foreground)" }}
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: "6px 16px",
                borderRadius: "20px",
                border: `1px solid ${filter === f ? "var(--primary)" : "var(--border)"}`,
                background: filter === f ? "var(--blue-light)" : "var(--card)",
                color: filter === f ? "var(--primary)" : "var(--muted-foreground)",
                fontSize: "13px",
                cursor: "pointer",
                fontWeight: filter === f ? "600" : "400",
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Records list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {filtered.map((record) => (
            <div
              key={record.id}
              style={{ background: "var(--card)", borderRadius: "14px", padding: "14px 16px", boxShadow: "0 1px 8px rgba(27,108,242,0.06)" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                <div>
                  <span style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>{record.date}</span>
                  <div style={{ display: "flex", gap: "6px", marginTop: "4px" }}>
                    <span className="badge-blue">{record.mileage}km</span>
                    <span className="badge-orange">{record.timeSlot}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "3px", justifyContent: "flex-end" }}>
                      <TrendingUp size={13} color="var(--success)" />
                      <span style={{ fontSize: "17px", fontWeight: "700", color: "var(--success)" }}>+¥{record.increase}</span>
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>{record.originalRate}% → {record.newRate}%</div>
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "12px", borderTop: "1px solid var(--border)", paddingTop: "10px", alignItems: "center" }}>
                <span style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>原收入: <span style={{ color: "var(--foreground)", fontWeight: "500" }}>¥{record.income}</span></span>
                <span style={{ fontSize: "13px", color: "var(--muted-foreground)" }}>原到手: <span style={{ color: "var(--foreground)", fontWeight: "500" }}>¥{(record.income * (1 - record.originalRate / 100)).toFixed(2)}</span></span>
                <div style={{ flex: 1 }}></div>
                <button
                  onClick={() => handleDelete(record.id)}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
                >
                  <Trash2 size={16} color="var(--muted-foreground)" />
                </button>
                <button
                  onClick={() => navigate("/result")}
                  style={{ background: "none", border: "none", cursor: "pointer", padding: "4px" }}
                >
                  <ChevronRight size={16} color="var(--primary)" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted-foreground)" }}>
            <div style={{ fontSize: "40px", marginBottom: "12px" }}>📋</div>
            <div style={{ fontSize: "15px" }}>暂无测算记录</div>
            <button onClick={() => navigate("/ocr")} style={{ marginTop: "16px", background: "none", border: "none", color: "var(--primary)", fontSize: "14px", cursor: "pointer" }}>
              立即测算 →
            </button>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default HistoryPage;
