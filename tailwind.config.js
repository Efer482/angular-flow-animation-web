/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          color1: "#6FD596"
        },
        secundary: {
          color1: "#DE554E",
          color2: "#4EDE53",
          color3: "#5E5150",
          color4: "#505E5A",
          color5: "#731702"
        },
        neutral: {
          color100: "#FFFFFF",
          color200: "#D9E1FA",
          color300: "#D1DBF9",
          color400: "#AEB9E1",
          color500: "#7E89AC",
          color600: "#0B1739",
          color700: "#0A1330",
          color800: "#081028",
        }
      },
      gridTemplateColumns: {
        '24': 'repeat(24, minmax(0, 1fr))'
      },
    },

    backgroundImage: (theme) => ({
      'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      'primary-gradial': `linear-gradient(127deg, ${theme('colors.primary.color1')} 20%, ${theme('colors.secundary.color2')} 77%)`,
    }),
  },
  plugins: [],
}

