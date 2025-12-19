import type { LucideIcon } from "lucide-react";

export type Transaction = {
  id: string;
  name: string;
  category: string;
  amount: number;
  type: "income" | "expense";
  date: string;
  icon: LucideIcon;
  mode: "Cash" | "UPI" | "Card";
};
