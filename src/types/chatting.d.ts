export interface ChatMessage {
  sendId: number;               // 메시지 고유 ID
  sender: "me" | "you";         // 메시지 발신자
  message: string;              // 메시지 내용
  createdAt: string;            // 메시지 전송 시간
}

export interface Chatting {
  chatId: number;               // 채팅방 고유 ID
  username: string;             // 상대방 이름
  userProfile: string;          // 상대방 프로필 이미지
  productImage: string;         // 상품 이미지
  type: "판매" | "구매" | "교환";  // 거래 유형
  title: string;                // 상품 제목
  price: string;                // 가격
  createdAt: string;            // 채팅방 생성 시간
  chatinfotype?: "default" | "seller"; // 채팅 상단 표시 유형 (선택)
  messages: ChatMessage[];      // 메시지 배열
}