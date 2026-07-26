import Hero from "@/components/Hero";
import JourneySelector from "@/components/services/JourneySelector";

export default function JourneyPage({ language }: { language: "en" | "zh" }) {
  return (
    <>
      <Hero
        eyebrow={language === "zh" ? "我的护理方向" : "Your Journey"}
        title={language === "zh" ? "从想要的感受与结果开始。" : "Begin with how you want to feel."}
        body={language === "zh" ? "用三个简单选择了解可能适合的护理方向。结果只用于引导，不作出诊断，也不会取代专业咨询。" : "Use three simple choices to find a suitable direction. The result is guidance only: it does not diagnose and never replaces professional consultation."}
        image="/images/mend-beauty-hero.png"
        imageAlt={language === "zh" ? "MEND 护理旅程" : "MEND care journey"}
      />
      <section className="wrap py-16 sm:py-24">
        <JourneySelector language={language} />
      </section>
    </>
  );
}
