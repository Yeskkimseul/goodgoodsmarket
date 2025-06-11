import React from "react";
import styles from "./ChatInput.module.css";

interface ChatInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

function ChatInput({ value, onChange, onSend }: ChatInputProps) {
  return (
    <div className={styles.chatInputWrap}>
      <button className={styles.attachBtn} type="button" tabIndex={-1}>
        {/* 실제 이미지 경로 맞는지 확인 필요 */}
        <img src="../images/chat/clip.svg" alt="첨부" />
      </button>
      <input
        className={styles.input}
        type="text"
        placeholder="메시지를 입력해주세요."
        value={value}
        onChange={onChange}
      />
      <button className={styles.sendBtn} type="button" onClick={onSend}>
        {/* 전송 아이콘 (Paper plane, SVG) */}
        <img src="../images/chat/send.svg" alt="전송" />
      </button>
    </div>
  );
}

export default ChatInput;
