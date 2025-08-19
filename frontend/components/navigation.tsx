"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Target, Users, User, Settings, Sparkles } from "lucide-react"

const navigationItems = [
  {
    name: "ホーム",
    href: "/",
    icon: Home,
  },
  {
    name: "チャレンジ",
    href: "/challenge",
    icon: Target,
  },
  {
    name: "フレンド",
    href: "/friend",
    icon: Users,
  },
  {
    name: "プロフィール",
    href: "/profile",
    icon: User,
  },
  {
    name: "設定",
    href: "/settings",
    icon: Settings,
  },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 p-6">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-blue-400 rounded-lg flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Bini</h1>
      </div>

      <ul className="space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive
                    ? "bg-gradient-to-r from-pink-100 to-blue-100 text-pink-600 font-medium"
                    : "text-gray-600 hover:bg-gray-100",
                )}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            </li>
          )
        })}
      </ul>

      <div className="absolute bottom-6 left-6 right-6">
        <div className="bg-gradient-to-r from-pink-50 to-blue-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">今日の挑戦</p>
          <p className="text-xs text-gray-500">新しいレシピに挑戦してみよう！</p>
        </div>
      </div>
    </nav>
  )
}
