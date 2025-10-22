/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unitybrindes.com.br",
      },
      {
        protocol: "https",
        hostname: "unitycorp.com.br",
      },
      {
        protocol: "https",
        hostname: "constellation.unitycorp.com.br",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "http",
        hostname: "unity-n-14",
      },
    ],
  },
  // Aqui libera IPs e origens específicas em dev
  allowedDevOrigins: ["http://localhost:3000", "https://constellation.unitycorp.com.br", "http://unity-n-14:3000"],
};

export default nextConfig;
