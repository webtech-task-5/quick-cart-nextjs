const path = require("path");
/** @type {import('next').NextConfig} */

const nextConfig = {
  // ...rest of options
  compiler: {
    styledComponents: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

module.exports = nextConfig;
