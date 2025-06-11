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
      <button className={styles.attachBtn} type="button" onClick={() => alert("첨부 기능은 아직 구현되지 않았습니다.")}>
        <img src="../images/chat/clip.svg" alt="첨부"
          className={styles.icon}></img>
      </button>
      <input
        className={`caption ${styles.input}`}
        type="text"
        placeholder="메시지를 입력해주세요."
        value={value}
        onChange={onChange}
      />
      <button className={styles.sendBtn} type="button" onClick={onSend}>
        <img src="../images/chat/send.svg" alt="전송"
          className={styles.icon}
        />
      </button>
    </div>
  );
}

export default ChatInput;
