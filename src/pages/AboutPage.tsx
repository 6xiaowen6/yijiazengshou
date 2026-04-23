import { useNavigate } from "react-router-dom";
import { Shield, FileText, ChevronRight } from "lucide-react";
import { PageWrapper } from "../components/MobileFrame";

const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper title="关于平台" showBack backPath="/profile">
      <div style={{ padding: "16px" }}>
        {/* Logo & name */}
        <div style={{ background: "var(--gradient-header)", borderRadius: "20px", padding: "32px 20px", textAlign: "center", marginBottom: "16px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "140px", height: "140px", borderRadius: "50%", background: "rgba(255,255,255,0.05)" }}></div>
          <div style={{ width: "72px", height: "72px", borderRadius: "20px", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px" }}>
            <svg width="40" height="40" viewBox="0 0 54 54" fill="none">
              <path d="M14 38L20 24L27 32L33 20L40 38" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M27 16L30 22H24L27 16Z" fill="rgba(18,201,142,1)" />
              <circle cx="27" cy="27" r="3" fill="white" />
            </svg>
          </div>
          <div style={{ color: "white", fontSize: "24px", fontWeight: "700", letterSpacing: "3px" }}>益驾增收</div>
          <div style={{ color: "rgba(255,255,255,0.75)", fontSize: "13px", marginTop: "6px" }}>让司机收入更透明</div>
          <div style={{ marginTop: "12px", display: "flex", justifyContent: "center", gap: "10px" }}>
            <span style={{ padding: "4px 12px", background: "rgba(255,255,255,0.15)", borderRadius: "20px", color: "white", fontSize: "12px" }}>v1.0.0</span>
            <span style={{ padding: "4px 12px", background: "rgba(18,201,142,0.3)", borderRadius: "20px", color: "rgba(18,201,142,1)", fontSize: "12px" }}>已认证</span>
          </div>
        </div>

        {/* Introduction */}
        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "16px", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <div style={{ width: "4px", height: "18px", background: "var(--primary)", borderRadius: "2px" }}></div>
            <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--foreground)" }}>平台介绍</span>
          </div>
          <p style={{ fontSize: "14px", color: "var(--muted-foreground)", lineHeight: "1.8" }}>
            益驾增收是一款专为网约车司机设计的轻量化增收测算与服务平台，通过创新的动态智能抽成机制，帮助司机了解自身收入潜力，推动行业收费透明化。
          </p>
          <p style={{ fontSize: "14px", color: "var(--muted-foreground)", lineHeight: "1.8", marginTop: "10px" }}>
            平台整合OCR智能识别、多维度抽成测算、本地服务商优惠资源，构建面向灵活就业者的一站式增收服务生态，积极响应国家关于平台经济规范发展的政策导向。
          </p>
        </div>

        {/* Compliance */}
        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "16px", marginBottom: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <Shield size={16} color="var(--success)" />
            <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--foreground)" }}>政策合规说明</span>
          </div>
          {[
            "本平台所有测算数据均基于公开行业数据与算法模型",
            "测算结果仅供参考，不代表任何网约车平台官方承诺",
            "平台运营符合《网络预约出租汽车经营服务管理暂行办法》",
            "用户数据依法保护，不向第三方出售或滥用",
            "积极配合相关部门推进网约车行业透明化监管",
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
              <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "var(--green-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                <svg width="10" height="8" viewBox="0 0 12 9" fill="none"><path d="M1 4.5L4.5 8L11 1" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <span style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.6" }}>{item}</span>
            </div>
          ))}
        </div>

        {/* Links */}
        <div style={{ background: "var(--card)", borderRadius: "14px", overflow: "hidden", marginBottom: "16px" }}>
          {[
            { label: "用户服务协议", icon: "📄" },
            { label: "隐私保护政策", icon: "🔒" },
            { label: "联系我们", icon: "📧" },
            { label: "加入我们", icon: "💼" },
          ].map((item, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", padding: "14px 16px", borderBottom: i < 3 ? "1px solid var(--border)" : "none", cursor: "pointer" }}
            >
              <span style={{ fontSize: "18px", marginRight: "10px" }}>{item.icon}</span>
              <span style={{ flex: 1, fontSize: "15px", color: "var(--foreground)" }}>{item.label}</span>
              <ChevronRight size={16} color="var(--muted-foreground)" />
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div style={{ textAlign: "center", color: "var(--muted-foreground)", fontSize: "12px", lineHeight: "1.8" }}>
          <div>太原益驾科技有限公司</div>
          <div>地址：太原市迎泽区府西街软件园A区18栋</div>
          <div>ICP备案：鄂ICP备XXXXXXXX号</div>
          <div style={{ marginTop: "8px" }}>© 2024 益驾增收. All Rights Reserved.</div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AboutPage;
