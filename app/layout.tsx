import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "MentionHub — All-Platform Mention Manager", description: "One inbox for Facebook, Instagram and YouTube mentions. Reply fast, stay compliant, grow reach without spamming." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
