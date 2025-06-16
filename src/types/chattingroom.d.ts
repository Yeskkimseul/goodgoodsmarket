export interface ChattingRoom {
  roomId: string;
  productId: string;
  title: string;
  price: string;
  productImage: string;
  sellerName: string;
  sellerProfile: string;
  messages: Chatting[]; // 💬 실제 채팅 메시지 배열
}