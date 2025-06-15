export interface Note {
  title: string;
  content: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
  id: number;
}

export interface NewNote {
  title: string;
  content?: string;
  tag: "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";
}
