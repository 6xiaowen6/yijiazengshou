import { useNavigate } from "react-router-dom";
import { Share2, RefreshCw, CheckCircle, TrendingDown } from "lucide-react";
import { PageWrapper } from "../components/MobileFrame";

const ResultPage = () => {
  const navigate = useNavigate();

  const data = {
    originalIncome: 38.50,
    originalCommission: 8.08,
    originalRate: 21,
    originalTake: 30.42,
    newCommission: 4.62,
    newRate: 12,
    newTake: 33.88,
    increase: 3.46,
    mileage: 12.3,
    duration: 24,
    timeSlot: "晚高峰",
    weather: "晴天",
  };

  const pct = ((data.increase / data.originalTake) * 100).toFixed(1);

  return (
    <PageWrapper title="增收结果明细" showBack backPath="/calculate">
      <div style={{ padding: "16px" }}>
        {/* Hero card */}
        <div style={{ background: "var(--gradient-header)", borderRadius: "20px", padding: "24px 20px", marginBottom: "14px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }}></div>
          <div style={{ position: "absolute", bottom: "-30px", left: "-20px", width: "100px", height: "100px", borderRadius: "50%", background: "rgba(18,201,142,0.1)" }}></div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            <CheckCircle size={18} color="rgba(18,201,142,1)" />
            <span style={{ color: "white", fontSize: "14px", fontWeight: "500" }}>测算完成 · 恭喜增收 🎉</span>
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", marginBottom: "6px" }}>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px" }}>本次增收</span>
            <span style={{ color: "rgba(18,201,142,1)", fontSize: "42px", fontWeight: "700", lineHeight: "1" }}>+¥{data.increase.toFixed(2)}</span>
          </div>
          <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "12px" }}>
            增收幅度 +{pct}% · 抽成率从 {data.originalRate}% 降至 {data.newRate}%
          </div>
        </div>

        {/* Comparison table */}
        <div style={{ background: "var(--card)", borderRadius: "16px", overflow: "hidden", marginBottom: "12px" }}>
          <div style={{ padding: "12px 16px", background: "var(--muted)", borderBottom: "1px solid var(--border)" }}>
            <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)" }}>收入对比详情</span>
          </div>
          <div style={{ padding: "0 16px" }}>
            {/* Header */}
            <div style={{ display: "flex", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <div style={{ flex: 2, fontSize: "13px", color: "var(--muted-foreground)" }}>项目</div>
              <div style={{ flex: 1.5, textAlign: "center", fontSize: "13px", color: "var(--destructive)", fontWeight: "500" }}>原方案</div>
              <div style={{ flex: 1.5, textAlign: "center", fontSize: "13px", color: "var(--success)", fontWeight: "500" }}>益驾方案</div>
              <div style={{ flex: 1.2, textAlign: "right", fontSize: "13px", color: "var(--primary)", fontWeight: "500" }}>变化</div>
            </div>

            {[
              { label: "总收入", orig: `¥${data.originalIncome}`, new_v: `¥${data.originalIncome}`, change: "持平", changeColor: "var(--muted-foreground)" },
              { label: "平台抽成", orig: `¥${data.originalCommission}`, new_v: `¥${data.newCommission}`, change: `-¥${(data.originalCommission - data.newCommission).toFixed(2)}`, changeColor: "var(--success)" },
              { label: "抽成比例", orig: `${data.originalRate}%`, new_v: `${data.newRate}%`, change: `-${data.originalRate - data.newRate}%`, changeColor: "var(--success)" },
              { label: "司机到手", orig: `¥${data.originalTake}`, new_v: `¥${data.newTake}`, change: `+¥${data.increase}`, changeColor: "var(--success)" },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", padding: "12px 0", borderBottom: i < 3 ? "1px solid var(--border)" : "none", alignItems: "center" }}>
                <div style={{ flex: 2, fontSize: "14px", color: "var(--foreground)" }}>{row.label}</div>
                <div style={{ flex: 1.5, textAlign: "center", fontSize: "14px", color: "var(--destructive)" }}>{row.orig}</div>
                <div style={{ flex: 1.5, textAlign: "center", fontSize: "14px", fontWeight: "600", color: "var(--success)" }}>{row.new_v}</div>
                <div style={{ flex: 1.2, textAlign: "right", fontSize: "13px", fontWeight: "600", color: row.changeColor }}>{row.change}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown factors */}
        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "14px 16px", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
            <TrendingDown size={16} color="var(--success)" />
            <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)" }}>抽成优化明细</span>
          </div>
          {[
            { label: "时段优化（晚高峰）", value: "-4%" },
            { label: "里程优化（5-15km）", value: "-3%" },
            { label: "供需调节", value: "-2%" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 10px", background: "var(--green-light)", borderRadius: "8px", marginBottom: "6px" }}>
              <span style={{ fontSize: "13px", color: "var(--foreground)" }}>{item.label}</span>
              <span style={{ fontSize: "14px", fontWeight: "700", color: "var(--success)" }}>{item.value}</span>
            </div>
          ))}
        </div>

        {/* Order info */}
        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "12px 16px", marginBottom: "16px" }}>
          <div style={{ fontSize: "13px", color: "var(--muted-foreground)", marginBottom: "8px" }}>订单信息</div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <span className="badge-blue">{data.mileage}km</span>
            <span className="badge-blue">{data.duration}分钟</span>
            <span className="badge-orange">{data.timeSlot}</span>
            <span className="badge-orange">{data.weather}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "12px" }}>
          <button
            style={{
              flex: 1, height: "48px", borderRadius: "24px", border: "1.5px solid var(--primary)",
              background: "transparent", color: "var(--primary)", fontSize: "15px", fontWeight: "500", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            }}
          >
            <Share2 size={16} /> 分享结果
          </button>
          <button
            onClick={() => navigate("/ocr")}
            style={{
              flex: 1, height: "48px", borderRadius: "24px", background: "var(--gradient-primary)", border: "none",
              color: "white", fontSize: "15px", fontWeight: "600", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            }}
          >
            <RefreshCw size={16} /> 再次测算
          </button>
        </div>

        <button
          onClick={() => navigate("/history")}
          style={{ width: "100%", background: "none", border: "none", color: "var(--primary)", fontSize: "14px", cursor: "pointer", padding: "8px" }}
        >
          查看历史测算记录 →
        </button>
      </div>
    </PageWrapper>
  );
};

export default ResultPage;
