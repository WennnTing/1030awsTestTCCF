/** @type {import('next').NextConfig} */
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
const nextConfig = {
  reactStrictMode: false,
  sassOptions: {
    includePaths: ["styles"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tccf-file-storage.s3.amazonaws.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/pitching",
        destination: "https://www.tccf.tw/zh/pitching",
        permanent: true,
      },
      {
        source: "/market",
        destination: "https://www.tccf.tw/zh/market",
        permanent: true,
      },
      {
        source: "/post/pitching2024",
        destination: "https://www.tccf.tw/zh/about/news/20240510",
        permanent: true,
      },
      {
        source: "/post-en/pitching2024",
        destination: "https://www.tccf.tw/en/about/news/20240510",
        permanent: true,
      },
      {
        source: "/post/2024intro",
        destination: "https://www.tccf.tw/zh/about/news/20240502",
        permanent: true,
      },
      {
        source: "/post-en/2024intro",
        destination: "https://www.tccf.tw/en/about/news/20240502",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
