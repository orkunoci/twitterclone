/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        twitterWhite: '#e7e9ea',
        twitterBlue:'#308CD8',
        tiwtterBorder:'#2f3336',
        twitterLightGray:'#71767b',
        twitterDarkGray:'#17181C'
      }
    },
  },
  plugins: [],
}
