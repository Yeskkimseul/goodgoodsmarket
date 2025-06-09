import { useEffect } from "react";

declare global {
  interface Window {
    chatbase?: any;
  }
}

const ChatbaseWidget = () => {
  useEffect(() => {
    const scriptId = "R5jk6ydB6lnN4fTbS7Cy5";

    // 이미 로드된 경우는 무시
    if (document.getElementById(scriptId)) return;

    const _chatbase = Object.assign((...args: any[]) => {
      (_chatbase.q = _chatbase.q || []).push(args);
    }, { q: [] as any[] });

    window.chatbase = new Proxy(_chatbase, {
      get(target, prop) {
        if (prop === "q") return target.q;
        return (...args: any[]) => (target as any)(prop, ...args);
      },
    });

    const script = document.createElement("script");
    script.src = "https://www.chatbase.co/embed.min.js";
    script.id = scriptId;
    script.async = true;
    document.body.appendChild(script);

    const style = document.createElement("style");
    style.innerHTML = `
      .chatbase-container {
        left: 16px !important;
        bottom: 24px !important;
        right: auto !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // 1. script 제거
      script.remove();
      style.remove();

      // 2. 위젯 DOM 제거 (iframe 포함)
      const iframe = document.querySelector("iframe[src*='chatbase']");
      if (iframe) {
        const wrapper = iframe.closest(".chatbase-container");
        if (wrapper) wrapper.remove(); // Shadow DOM이 아니면 이걸로 제거
        else iframe.remove(); // 혹시 모를 fallback
      }

      // 3. chatbase 전역 제거
      delete window.chatbase;
    };
  }, []);

  return null;
};

export default ChatbaseWidget;
