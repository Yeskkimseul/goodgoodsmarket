export interface Message {
  sender: "me" | "other";
  content: string;
  createdAt: string;
}