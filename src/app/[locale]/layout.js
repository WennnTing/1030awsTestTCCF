import "./globals.scss";
import { Noto_Sans_TC, Montserrat, Poppins, Inter } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Script from "next/script";

const notoSansTc = Noto_Sans_TC({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-noto-sans-tc",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

export const metadata = {
  title: "TCCF | YOUR BEST PARTNER IN ASIA",
  description:
    "「2024 TCCF 創意內容大會」是亞洲重要內容產業盛會，每年吸引全球多國買賣家齊聚交流洽商，共分成「PITCHING 提案大會」、「MARKET 市場展」與「FORUM 國際論壇」三大單元，將於 11 月 5 日 至 8 日於南港展覽館二館 7 樓舉行。",
  icons: {
    icon: "/favicon.ico",
  },
};

export default async function RootLayout({ children, params: { locale } }) {
  const messages = await getMessages();

  const GoogleAnalytics = () => {
    return (
      <>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`}
        />

        <Script id="" strategy="lazyOnload">
          {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              });
          `}
        </Script>
      </>
    );
  };

  return (
    <html lang={locale}>
      <GoogleAnalytics />
      <body
        className={`${notoSansTc.variable} ${montserrat.variable} ${poppins.variable} ${inter.variable} font-sans,`}
      >
        <div className="frontend-layout-wrapper">
          <NextIntlClientProvider messages={messages}>
            {/* <MainHeader /> */}
            {children}
            {/* <MainFooter /> */}
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}
