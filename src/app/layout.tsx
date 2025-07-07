
import "./globals.css"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Bank App",
  description: "Simple Bank Management System",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 min-h-screen`}>
        <main className="w-full mx-auto p-6">

      <div className=" grid grid-cols-2 gap-4 box-border border-blue-500 border-b-2 p-2">
        <h1 className="text-4xl font-[Verdana]">🏦SimpleBank</h1>
      </div>

          {children}
      <div className="fixed w-full bg-[#1f1f1f] text-[#ffffff] left-0 bottom-0 border-blue-500 border-t-2 pr-6 pl-6 gap-4" >
      <footer>
        SimpleBank pvt. LTD.    copyrights©
      </footer>
      </div>
        </main>
      </body>
    </html>
  )
}
