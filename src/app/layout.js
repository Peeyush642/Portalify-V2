import { ToastContainer } from "react-toastify";
import { Inter } from 'next/font/google'
import './globals.css'
import "font-awesome/css/font-awesome.min.css";
import AuthContextProvider from "../context/AuthContext"; 
import { GoogleOAuthProvider } from "@react-oauth/google";
const inter = Inter({ subsets: ["latin"] });



export const metadata = {
  title: "Portalify",
  description: "PWA application with Next 13",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "nextjs13", "next13", "pwa", "next-pwa"],

  authors: [
    { name: "Rajesh Prajapati" },
    {
      name: "Rajesh Prajapati",
      url: "https://www.linkedin.com/in/raazeshp96/",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
    themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-128x128.png" },
    { rel: "icon", url: "icons/icon-128x128.png" },
  ],
};


export default function RootLayout({ children }) {
  
  return (
    <GoogleOAuthProvider clientId="983405250182-bs2a5fkhlb6g989vd2bu44vk41p01ng6.apps.googleusercontent.com">
    <AuthContextProvider>
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
    </AuthContextProvider>
    </GoogleOAuthProvider>
  )
}
