module.exports = {
  plugins: [
    require('prettier-plugin-tailwindcss'),
    require('@prettier/plugin-xml')
  ],

  // Core
  semi: false,
  singleQuote: true,
  trailingComma: 'none',

  // XML Plugin
  xmlWhitespaceSensitivity: 'ignore'
}
