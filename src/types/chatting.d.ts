export interface Chatting {
  id: number;                     // 채팅 객체의 고유 ID
  username: string;               // 상대방의 이름
  userProfile: string;            // 상대방 프로필 이미지 URL
  productImage: string;           // 상품 이미지 URL
  message?: string;               // 상대방(또는 채팅에서 보여질 메시지) 내용
  messageSentAt?: string;         // 상대방 메시지 전송 시각 (ISO 포맷 문자열)
  userMessage?: string;           // 내가 보낸 메시지 내용
  userMessageSentAt?: string;     // 내 메시지 전송 시각 (ISO 포맷 문자열)
  sender: "me" | "you";  // 마지막으로 메시지를 보낸 사람 (여기선 "me"와 "you" 사용)
  createdAt: string;              // 채팅 객체 생성 시각 (요약 시각 등으로 활용)
  unread: boolean;                // 읽지 않은 메시지가 있는지 여부
  type: "판매" | "구매" | "교환";   // 거래 유형
  title: string;                  // 상품 제목
  price: string;                  // 상품 가격 또는 교환 희망 문구
  chatinfotype?: "default" | "seller"; // 채팅 상단 정보 표시 타입 (선택적)
}