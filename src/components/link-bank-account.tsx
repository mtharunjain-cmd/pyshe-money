import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link, Wallet } from "lucide-react";

export default function LinkBankAccount() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Link Bank Account</CardTitle>
          <CardDescription>
            Automatically import your transactions.
          </CardDescription>
        </div>
        <Badge variant="outline">Coming Soon</Badge>
      </CardHeader>
      <CardContent>
        <Button disabled>
          <Wallet className="mr-2 h-4 w-4" />
          Link Account
        </Button>
      </CardContent>
    </Card>
  );
}
