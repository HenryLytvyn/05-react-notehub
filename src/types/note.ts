export interface Note {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  id?: number;
}
