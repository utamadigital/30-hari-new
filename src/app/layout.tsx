import type { Metadata } from "next";
import "./globals.css";
import TrackingProvider from "@/components/TrackingProvider";
import { Nunito_Sans } from "next/font/google";

const font = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata = {
  title: "1000 Lembar Printable Anak Muslim",
  description: "Printable islami anak siap cetak A4",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        {/* META PIXEL */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1048911139808299');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1048911139808299&ev=PageView&noscript=1"
          />
        </noscript>
        {/* END META PIXEL */}
      </head>

      <body className={font.className}>
        {/* CLIENT TRACKING (EVENTS) */}
        <TrackingProvider />

        {children}
      </body>
    </html>
  );
}
