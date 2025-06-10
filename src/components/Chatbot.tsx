import { useEffect } from 'react';


declare global {
  interface Window {
    chatbaseConfig?: any;
  }
}


const Chatbot = () => {
  useEffect(() => {
    // 기존 스크립트가 있으면 제거
    const oldScript = document.getElementById("chatbase-script");
    if (oldScript) {
      oldScript.remove();
    }

    // config를 스크립트 삽입 직전에 항상 세팅
    window.chatbaseConfig = {
      chatbotId: "R5jk6ydB6lnN4fTbS7Cy5",
      alignment: "left",
      chatButtonSetting: {
        position: "left",
        backgroundColor: "#1DC6A7"
      }
    };

    // 새로 삽입
    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.async = true;
    script.id = "chatbase-script";
    document.body.appendChild(script);

    return () => {
      // 언마운트 시 제거
      const s = document.getElementById("chatbase-script");
      if (s) s.remove();
    };
  }, []);

  return null;
};

export default Chatbot;
