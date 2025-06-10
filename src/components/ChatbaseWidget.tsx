import { useEffect } from "react";

declare global {
  interface Window {
    chatbase?: any;
  }
}

const ChatbaseWidget = () => {
  useEffect(() => {
    const scriptId = "R5jk6ydB6lnN4fTbS7Cy5";
    let script: HTMLScriptElement | null = null;

    // 항상 cleanup을 먼저 실행 (SPA에서 재마운트 시 중복 방지)
    const cleanup = () => {
      // 스크립트 제거
      const oldScript = document.getElementById(scriptId);
      if (oldScript) oldScript.remove();

      // 반복적으로 iframe, container 제거 시도 (최대 1초)
      let tries = 0;
      const maxTries = 10;
      const interval = setInterval(() => {
        let removed = false;
        document.querySelectorAll("iframe[src*='chatbase']").forEach((iframe) => {
          const wrapper = iframe.closest(".chatbase-container");
          if (wrapper) {
            wrapper.remove();
            removed = true;
          } else {
            iframe.remove();
            removed = true;
          }
        });
        if (removed || ++tries >= maxTries) {
          clearInterval(interval);
        }
      }, 100);

      delete window.chatbase;
    };

    cleanup();

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

    script = document.createElement("script");
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

    return cleanup;
  }, []);

  return null;
};

export default ChatbaseWidget;