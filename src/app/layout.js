import "./globals.css";

import { Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "ATFS",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={raleway.className}>
      <body>{children}</body>
    </html>
  );
}
