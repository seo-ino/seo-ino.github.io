/** @type {import('next').NextConfig} */
const nextConfig = {
  // خروجی کاملاً ایستا (پوشه out) برای میزبانی رایگان روی GitHub Pages
  output: "export",
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false,
  trailingSlash: false,
};

export default nextConfig;
