import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, FileText, Shield, TrendingDown } from "lucide-react";
import { useState } from "react";
import { PageWrapper } from "../components/MobileFrame";

const FAQ_ITEMS = [
  {
    q: "动态抽成与传统固定抽成有何区别？",
    a: "传统固定抽成无论何时何地均按固定比例抽取，而动态抽成会根据供需、时段、里程、天气等多维因素实时调整，让司机在高峰期、长途等有利情况下享受更低抽成，实现多劳多得。",
  },
  {
    q: "抽成比例最低可以降到多少？",
    a: "依据当前优化模型，综合所有优化因子，最低可降至基础费率的 50% 左右（即约 10%-11%），具体视实际订单参数而定。",
  },
  {
    q: "平台是否认可益驾测算结果？",
    a: "益驾增收平台的测算结果是基于行业公开数据与算法模型的理论测算，旨在帮助司机了解收入潜力，推动行业透明化，不代表任何网约车平台的官方承诺。",
  },
  {
    q: "动态抽成符合政策要求吗？",
    a: "完全符合。国家交通运输部、市场监管总局等部门明确要求网约车平台公示抽成比例，并逐步推行差异化、透明化收费机制，益驾增收平台的设计理念与此高度一致。",
  },
];

const POLICY_ITEMS = [
  "交通运输部《网络预约出租汽车经营服务管理暂行办法》",
  "国务院《关于加强灵活就业和新就业形态劳动者权益保障的意见》",
  "市场监管总局《互联网平台落实主体责任指引》",
  "国家发改委《关于促进平台经济规范健康发展的指导意见》",
];

const RulesPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <PageWrapper title="抽成规则说明" showBack backPath="/home">
      <div style={{ padding: "16px" }}>
        {/* Intro */}
        <div style={{ background: "var(--gradient-header)", borderRadius: "16px", padding: "20px", marginBottom: "14px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", right: "-20px", bottom: "-20px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }}></div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "12px", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <TrendingDown size={22} color="rgba(18,201,142,1)" />
            </div>
            <div>
              <div style={{ color: "white", fontSize: "16px", fontWeight: "700" }}>动态智能抽成机制</div>
              <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "12px" }}>多因子综合优化 · 让收入更透明</div>
            </div>
          </div>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px", lineHeight: "1.7" }}>
            传统固定抽成模式下，平台对每笔订单按固定比例抽取费用，不区分时段、里程、供需情况。益驾动态抽成模型引入多维度优化因子，使司机收益更公平。
          </p>
        </div>

        {/* Formula */}
        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "16px", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
            <div style={{ width: "4px", height: "18px", background: "var(--primary)", borderRadius: "2px" }}></div>
            <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--foreground)" }}>计算逻辑说明</span>
          </div>

          <div style={{ background: "var(--muted)", borderRadius: "10px", padding: "14px", marginBottom: "12px", fontFamily: "monospace" }}>
            <div style={{ fontSize: "13px", color: "var(--primary)", marginBottom: "4px" }}>// 动态抽成率计算</div>
            <div style={{ fontSize: "14px", color: "var(--foreground)", lineHeight: "1.8" }}>
              <span style={{ color: "var(--success)" }}>最终抽成率</span> = 基础抽成率
              <br />{"  "}- <span style={{ color: "var(--success)" }}>时段优化系数</span>
              <br />{"  "}- <span style={{ color: "var(--success)" }}>里程优化系数</span>
              <br />{"  "}- <span style={{ color: "var(--success)" }}>供需调节系数</span>
              <br />{"  "}- <span style={{ color: "var(--success)" }}>天气调节系数</span>
            </div>
          </div>

          {[
            { label: "时段优化", desc: "早晚高峰降低3-5%，平峰降低1-2%，夜间降低2-4%" },
            { label: "里程优化", desc: "5km以内基础，5-15km降低2-3%，15km以上降低4-6%" },
            { label: "供需调节", desc: "供不应求时段，综合降低抽成最多3%" },
            { label: "天气调节", desc: "雨雪雾天气，降低0.5-2%抽成" },
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", padding: "10px", background: "var(--blue-light)", borderRadius: "8px", marginBottom: "6px" }}>
              <div style={{ width: "24px", height: "24px", borderRadius: "6px", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ color: "white", fontSize: "11px", fontWeight: "700" }}>✓</span>
              </div>
              <div>
                <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)" }}>{item.label}</div>
                <div style={{ fontSize: "12px", color: "var(--muted-foreground)", marginTop: "2px" }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Policy basis */}
        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "16px", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <Shield size={16} color="var(--primary)" />
            <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--foreground)" }}>政策依据</span>
          </div>
          {POLICY_ITEMS.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start", marginBottom: "8px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--primary)", marginTop: "6px", flexShrink: 0 }}></div>
              <span style={{ fontSize: "13px", color: "var(--foreground)", lineHeight: "1.6" }}>{p}</span>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ background: "var(--card)", borderRadius: "14px", overflow: "hidden", marginBottom: "16px" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "8px" }}>
            <FileText size={16} color="var(--primary)" />
            <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--foreground)" }}>常见问题</span>
          </div>
          {FAQ_ITEMS.map((item, i) => (
            <div key={i} style={{ borderBottom: i < FAQ_ITEMS.length - 1 ? "1px solid var(--border)" : "none" }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{ width: "100%", padding: "14px 16px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "8px" }}
              >
                <span style={{ fontSize: "14px", fontWeight: "500", color: "var(--foreground)", textAlign: "left", lineHeight: "1.5" }}>Q. {item.q}</span>
                {openFaq === i ? <ChevronDown size={16} color="var(--primary)" style={{ flexShrink: 0 }} /> : <ChevronRight size={16} color="var(--muted-foreground)" style={{ flexShrink: 0 }} />}
              </button>
              {openFaq === i && (
                <div style={{ padding: "0 16px 14px", background: "var(--blue-light)" }}>
                  <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.7" }}>A. {item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default RulesPage;
