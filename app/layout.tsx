import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI로 앱 만들기 모임",
  description: "AI 도구로 앱을 만들어보는 6~8명 소모임. 주 1회 × 20회차, 약 5개월 커리큘럼",
  openGraph: {
    title: "AI로 앱 만들기 모임",
    description: "AI 도구로 앱을 만들어보는 6~8명 소모임. 주 1회 × 20회차, 약 5개월 커리큘럼",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        style={{
          fontFamily: "Pretendard Variable, -apple-system, sans-serif",
          background: "#0D0D0F",
          color: "#F0F0F5",
        }}
      >
        {children}
      </body>
    </html>
  );
}
