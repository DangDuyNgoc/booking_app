import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Booking Admin",
  description: "Booking Ship admin dashboard"
};

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/drivers", label: "Drivers" },
  { href: "/orders", label: "Orders" },
  { href: "/pricing", label: "Pricing" },
  { href: "/payouts", label: "Payouts" }
];

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-50 text-slate-950 md:grid md:grid-cols-[260px_1fr]">
          <aside className="border-b border-slate-200 bg-white p-6 md:min-h-screen md:border-b-0 md:border-r">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-brand">Booking Ship</p>
              <h1 className="mt-1 text-xl font-bold">Admin</h1>
            </div>
            <nav className="grid gap-2">
              {navItems.map((item) => (
                <Link
                  className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                  href={item.href}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>
          <main className="p-6 md:p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
