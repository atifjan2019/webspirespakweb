/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.webspires.com.pk",
        pathname: "/wp-content/uploads/**",
      },
      {
        protocol: "https",
        hostname: "wordpress-1196470-4364598.cloudwaysapps.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
