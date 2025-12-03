import { Onest, TikTok_Sans } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/context/AuthContext";
import ClientLayout from "@/components/layout/ClientLayout";

const onest = Onest({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-onest"
});

const tiktok = TikTok_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-tiktok"
});

export const metadata = {
  title: "TherapyTalks",
  description: "Platform for therapy sessions"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${onest.variable} ${tiktok.variable} antialiased`}
      >
          <AuthProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}
