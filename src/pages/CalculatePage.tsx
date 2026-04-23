import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Zap, ChevronRight, Info, TrendingDown } from "lucide-react";
import { PageWrapper } from "../components/MobileFrame";
import { apiService, type EarningsCalculation } from "../lib/api";

const CalculatePage = () => {
  const navigate = useNavigate();
  const [calculated, setCalculated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [calculationResult, setCalculationResult] = useState<EarningsCalculation | null>(null);

  // Sample order parameters (in real app, this would come from previous page)
  const params = {
    distance: 12.5,
    revenue: 58.00,
    timeSlot: "平峰",
    weather: "晴天",
  };

  const handleCalculate = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await apiService.calculateEarnings(params);
      if (response.success && response.data) {
        setCalculationResult(response.data);
        setCalculated(true);
      } else {
        setError(response.message || "计算失败，请重试");
      }
    } catch (err) {
      setError("网络错误，请重试");
    } finally {
      setLoading(false);
    }
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
            <span className="badge-blue">{params.distance}km</span>
            <span className="badge-orange">{params.timeSlot}</span>
            <span className="badge-orange">{params.weather}</span>
          </div>
          <div style={{ display: "flex", gap: "16px", marginTop: "10px" }}>
            <div style={{ flex: 1, padding: "10px", background: "var(--blue-light)", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>订单金额</div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--primary)" }}>¥{params.revenue}</div>
            </div>
            <div style={{ flex: 1, padding: "10px", background: "var(--red-light)", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>原抽成</div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--destructive)" }}>
                ¥{calculationResult ? calculationResult.originalCommission.toFixed(2) : (params.revenue * 0.3).toFixed(2)}
              </div>
            </div>
            <div style={{ flex: 1, padding: "10px", background: "var(--orange-light)", borderRadius: "8px", textAlign: "center" }}>
              <div style={{ fontSize: "11px", color: "var(--muted-foreground)" }}>原抽成率</div>
              <div style={{ fontSize: "18px", fontWeight: "700", color: "var(--warning)" }}>
                {calculationResult ? `${calculationResult.originalCommissionRate}%` : "30%"}
              </div>
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
          <FactorRow label="基础抽成率" desc="平台基准费率" value={`${calculationResult?.originalCommissionRate || 30}%`} color="var(--destructive)" />
          <FactorRow label="时段调节" desc={`${params.timeSlot} 调节`} value={`${calculationResult ? (calculationResult.timeSlotFactor * 100).toFixed(1) : 0}%`} color={calculationResult && calculationResult.timeSlotFactor < 0 ? "var(--success)" : "var(--destructive)"} />
          <FactorRow label="里程调节" desc={`${params.distance}km 调节`} value={`${calculationResult ? (calculationResult.mileageFactor * 100).toFixed(1) : 0}%`} color={calculationResult && calculationResult.mileageFactor < 0 ? "var(--success)" : "var(--destructive)"} />
          <FactorRow label="供需调节" desc="当前供需比调节" value={`${calculationResult ? (calculationResult.demandFactor * 100).toFixed(1) : 0}%`} color={calculationResult && calculationResult.demandFactor < 0 ? "var(--success)" : "var(--destructive)"} />
          <div style={{ marginTop: "10px", padding: "10px", background: "var(--green-light)", borderRadius: "8px", display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <TrendingDown size={16} color="var(--success)" />
              <span style={{ fontSize: "14px", fontWeight: "600", color: "var(--success)" }}>优化后抽成率</span>
            </div>
            <span style={{ fontSize: "18px", fontWeight: "700", color: "var(--success)" }}>{calculationResult ? `${calculationResult.newCommissionRate.toFixed(2)}%` : "27.96%"}</span>
          </div>
        </div>

        {!calculated && !loading && (
          <>
            {error && (
              <div style={{
                background: "#fee",
                border: "1px solid #fcc",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "16px",
                color: "#c33"
              }}>
                {error}
              </div>
            )}
            <button
              className="btn-primary"
              onClick={handleCalculate}
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: "16px" }}
            >
              <Zap size={20} />
              一键计算增收金额
            </button>
          </>
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
                +¥<span>{calculationResult?.earnings.toFixed(2) || "0.00"}</span>
              </div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", marginTop: "8px" }}>
                抽成从 {calculationResult?.originalCommissionRate || 30}% 降至 {calculationResult?.newCommissionRate.toFixed(2) || "27.96"}%
              </div>
              <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "14px" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px" }}>原到手</div>
                  <div style={{ color: "white", fontSize: "18px", fontWeight: "600" }}>¥{calculationResult?.originalIncome.toFixed(2) || "0.00"}</div>
                </div>
                <div style={{ width: "1px", background: "rgba(255,255,255,0.3)" }}></div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px" }}>新到手</div>
                  <div style={{ color: "rgba(18,201,142,1)", fontSize: "18px", fontWeight: "700" }}>¥{calculationResult?.newIncome.toFixed(2) || "0.00"}</div>
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
