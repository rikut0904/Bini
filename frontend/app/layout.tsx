import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Navigation } from "@/components/navigation"
import Link from "next/link"
import AuthUserProvider from "@/components/auth/user-provider"

export const metadata: Metadata = {
  title: "Bini - 挑戦を始めよう",
  description: "新しいことへの挑戦を気軽に始められるアプリ",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
        <AuthUserProvider>
          <div className="flex min-h-screen">
            <Navigation />
            <main className="flex-1 ml-64">{children}</main>
          </div>
        </AuthUserProvider>
      </body>
    </html>
  )
}
