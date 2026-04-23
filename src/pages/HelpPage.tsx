import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronRight, Camera, Calculator, BookOpen } from "lucide-react";
import { PageWrapper } from "../components/MobileFrame";

const HELP_SECTIONS = [
  {
    title: "如何使用OCR识别",
    icon: "📷",
    color: "var(--blue-light)",
    steps: [
      { step: 1, title: "打开订单截图识别", desc: "点击首页「订单识别」按钮或底部导航进入识别页面" },
      { step: 2, title: "选择截图方式", desc: "点击「拍照识别」实时拍摄，或点击「从相册选择」上传已有截图" },
      { step: 3, title: "等待AI识别", desc: "系统自动提取订单里程、时长、收入、抽成等关键数据，约1-3秒完成" },
      { step: 4, title: "确认识别结果", desc: "核对识别数据，如有误差可手动修改，点击「确认数据」进入下一步" },
    ],
  },
  {
    title: "如何看懂增收测算",
    icon: "📊",
    color: "var(--green-light)",
    steps: [
      { step: 1, title: "查看当前订单参数", desc: "页面顶部显示订单里程、时长、时段、天气等参数，确认无误后继续" },
      { step: 2, title: "了解计算因子", desc: "系统展示时段、里程、供需、天气四大优化因子，每项都会显示优化幅度" },
      { step: 3, title: "点击一键计算", desc: "点击「一键计算增收金额」，系统根据动态模型计算最优抽成方案" },
      { step: 4, title: "查看增收结果", desc: "结果页清晰对比原方案与益驾方案的到手收入差异，可保存或分享" },
    ],
  },
];

const FAQ_ITEMS = [
  { q: "为什么识别结果不准确？", a: "请确保截图清晰无遮挡，完整显示订单金额、里程、时长等信息。光线不足时建议从相册上传清晰截图。" },
  { q: "支持哪些网约车平台的截图？", a: "目前支持滴滴出行、T3出行、高德打车、曹操出行、享道出行等主流平台，持续扩展中。" },
  { q: "测算结果可以作为维权依据吗？", a: "测算结果为算法模型估算，仅供参考，不具有法律效力。如需维权请通过官方渠道提交证据。" },
  { q: "历史记录会保存多久？", a: "历史测算记录将永久保存在您的账号下，除非您主动删除。" },
  { q: "如何更准确地测算？", a: "填写准确的时段（早/晚高峰/平峰/夜间）、天气状况，系统会据此优化抽成比例，让结果更精准。" },
  { q: "增收测算功能是免费的吗？", a: "目前所有测算功能完全免费，未来可能推出高级版本，届时将提前通知用户。" },
];

const HelpPage = () => {
  const navigate = useNavigate();
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <PageWrapper title="使用帮助" showBack backPath="/profile">
      <div style={{ padding: "16px" }}>
        {/* Quick links */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "14px" }}>
          <button
            style={{ flex: 1, padding: "12px", background: "var(--card)", borderRadius: "12px", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}
          >
            <Camera size={24} color="var(--primary)" />
            <span style={{ fontSize: "12px", color: "var(--foreground)", fontWeight: "500" }}>OCR识别</span>
          </button>
          <button
            style={{ flex: 1, padding: "12px", background: "var(--card)", borderRadius: "12px", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}
          >
            <Calculator size={24} color="var(--success)" />
            <span style={{ fontSize: "12px", color: "var(--foreground)", fontWeight: "500" }}>增收测算</span>
          </button>
          <button
            onClick={() => navigate("/rules")}
            style={{ flex: 1, padding: "12px", background: "var(--card)", borderRadius: "12px", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}
          >
            <BookOpen size={24} color="var(--warning)" />
            <span style={{ fontSize: "12px", color: "var(--foreground)", fontWeight: "500" }}>规则说明</span>
          </button>
        </div>

        {/* Step-by-step guide */}
        <div style={{ marginBottom: "14px" }}>
          {HELP_SECTIONS.map((section, si) => (
            <div key={si} style={{ background: "var(--card)", borderRadius: "14px", overflow: "hidden", marginBottom: "10px" }}>
              <button
                onClick={() => setOpenSection(openSection === si ? null : si)}
                style={{ width: "100%", padding: "14px 16px", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: section.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: "18px" }}>{section.icon}</span>
                </div>
                <span style={{ flex: 1, fontSize: "15px", fontWeight: "600", color: "var(--foreground)", textAlign: "left" }}>{section.title}</span>
                {openSection === si ? <ChevronDown size={16} color="var(--primary)" /> : <ChevronRight size={16} color="var(--muted-foreground)" />}
              </button>

              {openSection === si && (
                <div style={{ padding: "0 16px 14px", borderTop: "1px solid var(--border)" }}>
                  {section.steps.map((step, i) => (
                    <div key={i} style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                      <div style={{ width: "28px", height: "28px", borderRadius: "50%", background: "var(--primary)", color: "white", fontSize: "13px", fontWeight: "700", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        {step.step}
                      </div>
                      <div>
                        <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)", marginBottom: "3px" }}>{step.title}</div>
                        <div style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.6" }}>{step.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: "14px" }}>
          <div style={{ fontSize: "15px", fontWeight: "700", color: "var(--foreground)", marginBottom: "10px", paddingLeft: "4px" }}>常见问题 FAQ</div>
          <div style={{ background: "var(--card)", borderRadius: "14px", overflow: "hidden" }}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} style={{ borderBottom: i < FAQ_ITEMS.length - 1 ? "1px solid var(--border)" : "none" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", padding: "13px 16px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px" }}
                >
                  <span style={{ fontSize: "14px", color: "var(--foreground)", textAlign: "left", lineHeight: "1.5" }}>Q. {item.q}</span>
                  {openFaq === i ? <ChevronDown size={15} color="var(--primary)" style={{ flexShrink: 0 }} /> : <ChevronRight size={15} color="var(--muted-foreground)" style={{ flexShrink: 0 }} />}
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 16px 12px", background: "var(--blue-light)" }}>
                    <p style={{ fontSize: "13px", color: "var(--muted-foreground)", lineHeight: "1.7" }}>A. {item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div style={{ background: "var(--card)", borderRadius: "14px", padding: "14px 16px", textAlign: "center" }}>
          <div style={{ fontSize: "14px", fontWeight: "600", color: "var(--foreground)", marginBottom: "6px" }}>没找到答案？</div>
          <p style={{ fontSize: "13px", color: "var(--muted-foreground)", marginBottom: "12px" }}>联系客服或提交意见反馈</p>
          <button
            onClick={() => navigate("/feedback")}
            style={{ padding: "8px 24px", borderRadius: "20px", background: "var(--gradient-primary)", border: "none", color: "white", fontSize: "14px", fontWeight: "500", cursor: "pointer" }}
          >
            提交意见反馈
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default HelpPage;
