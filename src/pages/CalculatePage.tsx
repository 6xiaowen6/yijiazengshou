import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, ChevronRight, Info, TrendingDown } from "lucide-react";
import { PageWrapper } from "../components/MobileFrame";

const CalculatePage = () => {
  const navigate = useNavigate();
  const [calculated, setCalculated] = useState(false);
  const [loading, setLoading] = useState(false);

  const params = {
    mileage: 12.3,
    duration: 24,
    income: 38.50,
    commission: 8.08,
    commissionRate: 21,
    timeSlot: "晚高峰",
    weather: "晴天",
    mileageRange: "5-15km",
  };

  const result = {
    originalCommission: 8.08,
    newCommission: 4.62,
    originalRate: 21,
    newRate: 12,
    originalIncome: 30.42,
    newIncome: 33.88,
    increase: 3.46,
    mileageBonus: -0.5,
    timeBonus: -1.2,
    weatherBonus: -0.2,
    demandBonus: -1.64,
  };

  const handleCalculate = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCalculated(true);
    }, 1500);
  };

  const FactorRow = ({ label, desc, value, color }: { label: string; desc: string; value: string; color: string }) => (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
      <div>
        <div style={{ fontSize: "14px", fontWeight: "500", color: "var(--foreground)" }}>{label}</div>
        <div style={{ fontSize: "12px", color: "var(--muted-foreground)", marginTop: "2px" }}>{desc}</div>
      </div>
      <span style={{ fontSize: "14px", fontWeight: "600", color }}>{value}</span>
    </div>
  );

  return (
    <PageWrapper title="动态增收测算" showBack backPath="/order-edit">
      <div style={{ padding: "16px" }}>
        {/* Order summary */}
        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "14px 16px", marginBottom: "12px" }}>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)", marginBottom: "10px" }}>当前订单参数</div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <span className="badge-blue">{params.mileage}km · {params.duration}分钟</span>
            <span className="badge-orange">{params.timeSlot}</span>
            <span className="badge-orange">{params.weather}</span>
            <span className="badge-green">{params.mileageRange}</span>
          </div>
          <div style={{ display: "flex", gap: "16px", marginTop: "10px" }}>
            <div style={{ flex: 1, padding: "10px", background: "var(--blue-light)", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>原始收入</div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--primary)" }}>¥{params.income}</div>
            </div>
            <div style={{ flex: 1, padding: "10px", background: "var(--red-light)", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>原抽成</div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--destructive)" }}>¥{params.commission}</div>
            </div>
            <div style={{ flex: 1, padding: "10px", background: "var(--orange-light)", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>抽成率</div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--warning)" }}>{params.commissionRate}%</div>
            </div>
          </div>
        </div>

        {/* Formula explanation */}
        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "14px 16px", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)" }}>动态抽成计算因子</div>
            <button onClick={() => navigate("/rules")} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--primary)", fontSize: "12px", display: "flex", alignItems: "center", gap: "2px" }}>
              <Info size={13} /> 规则说明
            </button>
          </div>
          <FactorRow label="基础抽成率" desc="平台基准费率" value="21%" color="var(--destructive)" />
          <FactorRow label="时段调节" desc={`${params.timeSlot} 高峰优化`} value="-4%" color="var(--success)" />
          <FactorRow label="里程调节" desc={`${params.mileageRange} 中程优化`} value="-3%" color="var(--success)" />
          <FactorRow label="供需调节" desc="当前供需比优化" value="-2%" color="var(--success)" />
          <div style={{ marginTop: "10px", padding: "10px", background: "var(--green-light)", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <TrendingDown size={16} color="var(--success)" />
              <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--success)" }}>优化后抽成率</span>
            </div>
            <span style={{ fontSize: "18px", fontWeight: "700", color: "var(--success)" }}>12%</span>
          </div>
        </div>

        {!calculated && !loading && (
          <button
            className="btn-primary"
            onClick={handleCalculate}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}
          >
            <Zap size={20} />
            一键计算增收金额
          </button>
        )}

        {loading && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 0", gap: "14px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: "var(--blue-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={24} color="var(--primary)" className="animate-pulse" />
            </div>
            <span style={{ fontSize: "15px", color: "var(--muted-foreground)" }}>计算中...</span>
          </div>
        )}

        {calculated && (
          <>
            {/* Result preview */}
            <div style={{ background: "var(--gradient-primary)", borderRadius: "16px", padding: "20px", marginBottom: "12px", textAlign: "center" }}>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "13px", marginBottom: "6px" }}>本次预计增收金额</div>
              <div style={{ color: "white", fontSize: "40px", fontWeight: "700", lineHeight: "1.1" }}>
                +¥<span>{result.increase.toFixed(2)}</span>
              </div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", marginTop: "8px" }}>抽成从 {result.originalRate}% 降至 {result.newRate}%</div>
              <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "14px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px" }}>原到手</div>
                  <div style={{ color: "white", fontSize: "18px", fontWeight: "600" }}>¥{result.originalIncome}</div>
                </div>
                <div style={{ width: "1px", background: "rgba(255,255,255,0.3)" }}></div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px" }}>新到手</div>
                  <div style={{ color: "rgba(18,201,142,1)", fontSize: "18px", fontWeight: "700" }}>¥{result.newIncome}</div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                style={{ flex: 1, height: "48px", borderRadius: "24px", border: "1.5px solid var(--primary)", background: "transparent", color: "var(--primary)", fontSize: "15px", fontWeight: "500", cursor: "pointer" }}
                onClick={() => navigate("/history")}
              >
                保存记录
              </button>
              <button
                style={{ flex: 1, height: "48px", borderRadius: "24px", background: "var(--gradient-primary)", border: "none", color: "white", fontSize: "15px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}
                onClick={() => navigate("/result")}
              >
                查看明细 <ChevronRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
};

export default CalculatePage;
