export interface Chatting {
  id: number;
  username: string;
  userProfile: string;
  productImage: string;
  message: string;
  userMessage: string;
  sender: string;
  createdAt: string;
  unread: boolean;
  type: "판매" | "구매" | "교환"; // ✅ 이렇게만!
  title: string;
  price: string;
}