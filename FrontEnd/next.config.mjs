/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals.push("pino-pretty", "lokijs", "encoding");
        return config;
    },
    images: {
        domains: ['*'],
        remotePatterns: [
          {
            protocol: 'https',
            hostname: '**',
          },
        ],
      },
    // images: {
    //     remotePatterns: [
    //     {
    //         protocol: 'https',
    //         hostname: 'assets.coingecko.com',
    //     }
    //     ],
    // },
}

export default nextConfig;