import { useEffect } from "react";

declare global {
  interface Window {
    chatbase?: any;
  }
}

const ChatbaseWidget1 = () => {
  useEffect(() => {
    const scriptId = "R5jk6ydB6lnN4fTbS7Cy5";

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

    // ✅ 로드 후 위치 스타일 적용 (지연 적용)
    const waitAndStyle = () => {
      const interval = setInterval(() => {
        const container = document.querySelector(".chatbase-container") as HTMLElement;
        if (container) {
          container.style.left = "auto";
          container.style.right = "16px";
          container.style.bottom = "100px";
          container.style.top = "auto";
          container.style.transform = "none";
          clearInterval(interval);
        }
      }, 100);
    };

    waitAndStyle();

    return () => {
      script.remove();

      const iframe = document.querySelector("iframe[src*='chatbase']");
      if (iframe) {
        const wrapper = iframe.closest(".chatbase-container");
        if (wrapper) wrapper.remove();
        else iframe.remove();
      }

      delete window.chatbase;
    };
  }, []);

  return null;
};

export default ChatbaseWidget1;
