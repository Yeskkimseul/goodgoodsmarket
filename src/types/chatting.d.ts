export type ChatType = "판매" | "구매" | "교환";

export interface Chat {
  id: number;
  username: string;
  userProfile: string;
  productImage: string;
  message: string;
  createdAt: string; // ISO 8601 string
  unread: boolean;
  type: ChatType;
}