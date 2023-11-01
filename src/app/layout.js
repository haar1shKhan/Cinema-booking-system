import Navbar from '@/component/Navbar'
import './globals.css'
import Userstate from "@/contextApi/Userstate";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Moonbeam Cinema',
  description: 'The Best cinema ever',
}

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Userstate>
       <Navbar/>
        {children}
      </Userstate>
      </body>
    </html>
  )
}
