import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "xs-laptop": "600px", // Small laptops (12-13 inches)
        "s-laptop": "777px", // Smaller laptops (14 inches)
        "m-laptop": "900px", // Medium laptops (15.6 inches)
        "l-laptop": "1050px", // Large laptops
        "xl-laptop": "1200px", // Extra-large laptops
        tablet: "960px", // Larger tablets
        "l-tablet": "1028px", // Tablets in landscape mode
        "u-s-desktop": "1288px", // Larger desktops
        "s-desktop": "1380px", // Small desktops
        "m-desktop": "1448px", // Desktops and large screens
        "xl-desktop": "1688px", // Extra-large desktops
        "ultra-desktop": "1920px", // Ultra-wide screens
        "4k-desktop": "2560px", // 4K screens
        "5k-desktop": "3200px", // 5K screens
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: "#3B41E9",
        secondary: "#F3F5F6",
        lightprimany: "#EFF0FD",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        heading: ["sans-serif"],
        blogText: ["sans-serif"],
        body: ["Lato", "sans-serif"],
        // font for resume`
        montserrat: ['"Montserrat"', "sans-serif"], // Add Montserrat as a custom font
        merriweather: ['"Merriweather"', "sans-serif"], // Add Montserrat as a custom font
        roboto: ['"Roboto"', "sans-serif"],
        poppins: ['"Poppins"', "sans-serif"], // not good
        lato: ['"Lato"', "sans-serif"], // ok
        nunito: ['"Nunito"', "sans-serif"], // ok too
        inter: ['"Inter"', "sans-serif"], // good (main font for the resume)
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
// import type { Config } from "tailwindcss";

// const config: Config = {
//   content: [
//     "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
//     "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {
//       colors: {
//         background: "var(--background)",
//         foreground: "var(--foreground)",
// primary: "#3B41E9",
// secondary: "#F3F5F6",
// lightprimany: "#EFF0FD",
//       },
//       fontFamily: {
//         heading: ["Nunito", "sans-serif"],
//         body: ["Lato", "sans-serif"],
//       },
//     },
//   },
//   plugins: [],
// };
// export default config;
