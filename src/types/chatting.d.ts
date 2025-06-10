export interface Chatting {
  id: number;
  username: string;
  userProfile: string;
  productImage: string;
  message: string;
  createdAt: string; // ISO 8601 string
  unread: boolean;
  type: ChatType;
}