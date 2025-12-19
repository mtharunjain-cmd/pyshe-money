import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import type { Transaction } from "@/lib/types";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TransactionList({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          A log of your recent income and expenses.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id} className="group">
                <TableCell>
                  <div className="flex items-center gap-4">
                    <div className="p-2.5 bg-muted rounded-lg transition-colors group-hover:bg-secondary">
                      <transaction.icon className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{transaction.name}</div>
                      <div className="text-sm text-muted-foreground hidden md:inline">
                        {transaction.category}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge variant="outline" className="capitalize">
                    {transaction.type}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(transaction.date).toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="text-right">
                  <div
                    className={cn(
                      "flex items-center justify-end gap-2 font-medium",
                      transaction.type === "income" ? "text-green-600" : ""
                    )}
                  >
                    {transaction.type === "income" ? (
                      <ArrowUpCircle className="h-4 w-4" />
                    ) : (
                      <ArrowDownCircle className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span>
                      ₹{transaction.amount.toLocaleString("en-IN")}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
