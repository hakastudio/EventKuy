import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palet Clean Blue (Ala Yesplis)
        brand: {
          blue: "#0056D2",    // Biru Utama (Tombol, Header)
          light: "#E6F0FF",   // Biru Muda (Hover, Background item)
          dark: "#003580",    // Biru Gelap (Text Highlight)
          accent: "#00C2D1",  // Cyan (Aksen kecil)
        },
        bg: {
          main: "#F8F9FA",    // Abu-abu sangat muda (Background Halaman)
          card: "#FFFFFF",    // Putih (Card)
        },
        text: {
          main: "#1F2937",    // Hitam Abu (Teks Utama)
          muted: "#6B7280",   // Abu-abu (Teks Sekunder)
        }
      },
    },
  },
  plugins: [],
};
export default config;