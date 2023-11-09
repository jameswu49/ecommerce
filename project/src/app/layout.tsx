import './globals.css'
import type { Metadata } from 'next'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import Footer from './components/footer'
import { SidebarProvider } from './context/sidebarContext'
import { getServerSession } from "next-auth"
import SessionProvider from './components/sessionProvider'

export const metadata: Metadata = {
  title: 'Supreme',
  description: 'An e-commerce site for Supreme clothing',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession();
  return (
    <html lang="en" >
      <body>
        <SessionProvider>
          <SidebarProvider>
            <Navbar />
            <Sidebar />
            {children}
            <Footer />
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html >
  )
}
