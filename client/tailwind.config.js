/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT';
export default withMT({
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#523C1E",
        secondary: "#FAF7F0",
      },
      screens: {
        xs: "360px", // Extra-small screens
        sm: "576px", // Small screens
        md: "768px", // Medium screens
        lg: "1200px", // Large screens
        xl: "2560px", // Extra-large screens
      },
     
    },
  },
  plugins: [],
});