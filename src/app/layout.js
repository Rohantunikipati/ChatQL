import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import ClientProvider from "@/Providers/SessionProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ChatQL",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
