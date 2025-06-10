import { useEffect } from "react";

const ChatbaseWidget = () => {
  useEffect(() => {
    const scriptId = "chatbase-script";
    const chatbotId = "R5jk6ydB6lnN4fTbS7Cy5";

    if (document.getElementById(scriptId)) return;

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://www.chatbase.co/embed.min.js";
    script.async = true;

    script.onload = () => {
      // 안전하게 함수가 정의되었는지 확인
      const tryInit = () => {
        if (typeof window.chatbase === "function") {
          try {
            window.chatbase("config", {
              chatbotId,
              host: "https://www.chatbase.co",
            });
          } catch (e) {
            console.error("Chatbase config error:", e);
          }
        } else {
          console.error("Chatbase failed to load: window.chatbase is not a function");
        }
      };
      // 조금 딜레이를 주고 실행 (정의 타이밍 문제 방지)
      setTimeout(tryInit, 300);
    };

    document.body.appendChild(script);

    return () => {
      document.getElementById(scriptId)?.remove();
      document.querySelector('iframe[src*="chatbase.co"]')?.remove();
      document.querySelector(".chatbase-bubble-container")?.remove();
    };
  }, []);

  return null;
};

export default ChatbaseWidget;
