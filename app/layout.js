import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  title: "Class Monitoring System",
  description: "Monitoring System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@300,301,400,401,500,700,701&display=swap" rel="stylesheet" />
       </head>
     <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
