/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "avatar-frame": "url('/public/ui_assets/Avatar_frame.png')"
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  variants: {
    extend: {
     backgroundOpacity: ['active'],
    }
  }
}

