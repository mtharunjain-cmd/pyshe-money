
import Logo from "./logo";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-muted p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <Logo />
            <p className="text-sm text-muted-foreground">
              Financial management for students.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-2 md:grid-cols-3">
            <div>
              <h3 className="font-semibold text-foreground">Quick Links</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/dashboard"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/transactions"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Transactions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/budgets-goals"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Budgets & Goals
                  </Link>
                </li>
                 <li>
                  <Link
                    href="/dashboard/investment"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Investment
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/modules"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Modules
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/calculator"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Calculators
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Contact</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link
                    href="/dashboard/contact"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard/contact"
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PsycheMoney. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
