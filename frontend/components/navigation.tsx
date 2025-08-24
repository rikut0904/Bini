"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Target, Users, User, Settings, Sparkles, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button"

const navigationItems = [
  {
    name: "今日のおすすめ",
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

  const NavLinks = () => (
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
  )

  return (
    <>
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:h-full lg:fixed lg:left-0 lg:top-0 lg:bg-white lg:border-r lg:border-gray-200 lg:p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-blue-400 rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Bini</h1>
        </div>
        <NavLinks />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-gradient-to-r from-pink-50 to-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">今日の挑戦</p>
            <p className="text-xs text-gray-500">新しいレシピに挑戦してみよう！</p>
          </div>
        </div>
      </div>
      <div className="lg:hidden p-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-6 bg-white dark:bg-gray-950">
            <SheetHeader>
              <SheetTitle>
                <div className="flex items-center gap-2 mb-8">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-blue-400 rounded-lg flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">Bini</span>
                </div>
              </SheetTitle>
              <SheetDescription className="sr-only">
                サイト内を移動するためのナビゲーションリンクのリストです。
              </SheetDescription>
            </SheetHeader>
            <NavLinks />
            
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
