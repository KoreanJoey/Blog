module.exports = {
  // Your existing ESLint configuration
  extends: "next/core-web-vitals",

  // Add this to ignore generated Prisma files
  ignorePatterns: [
    "**/generated/**",
    "**/node_modules/**",
    "**/.next/**",
    "**/out/**",
    "**/build/**",
  ],

  // Optional: Add rules configuration if needed
  rules: {
    // Add any custom rules here
  },
};
