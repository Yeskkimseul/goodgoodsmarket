export interface Chatting {
  id: number;
  username: string;
  userProfile: string;
  productImage: string;
  message: string;
  userMessage : string;
  sender : string;
  createdAt: string; // ISO 8601 string
  unread: boolean;
  type: "판매" | "구매" | "교환";
  title : string;
  price : string;
}