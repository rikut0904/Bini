"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Heart, MessageCircle, Share2, Search, Clock, Users, Target, CheckCircle, Play, Pause, Plus } from "lucide-react"
import Link from "next/link"

const challenges = [
  {
    id: 1,
    title: "新しいレシピに挑戦",
    description: "今まで作ったことのない料理を1品作ってみよう",
    category: "料理",
    difficulty: "初級",
    estimatedTime: "30分",
    participants: 124,
    likes: 45,
    comments: 12,
    status: "active",
    author: "田中さん",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-15",
    image: "/placeholder.svg?height=200&width=300",
    completions: 89,
  },
  {
    id: 2,
    title: "5分間瞑想",
    description: "心を落ち着かせて、今日一日をリフレッシュしよう",
    category: "ウェルネス",
    difficulty: "初級",
    estimatedTime: "5分",
    participants: 89,
    likes: 32,
    comments: 8,
    status: "completed",
    author: "佐藤さん",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-14",
    image: "/placeholder.svg?height=200&width=300",
    completions: 67,
  },
  {
    id: 3,
    title: "新しい言語を学ぶ",
    description: "興味のある言語の基本的な挨拶を覚えてみよう",
    category: "学習",
    difficulty: "中級",
    estimatedTime: "15分",
    participants: 67,
    likes: 28,
    comments: 15,
    status: "paused",
    author: "山田さん",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-13",
    image: "/placeholder.svg?height=200&width=300",
    completions: 45,
  },
  {
    id: 4,
    title: "朝のストレッチ",
    description: "毎朝10分間のストレッチで体をほぐそう",
    category: "健康",
    difficulty: "初級",
    estimatedTime: "10分",
    participants: 156,
    likes: 78,
    comments: 23,
    status: "active",
    author: "鈴木さん",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-12",
    image: "/placeholder.svg?height=200&width=300",
    completions: 134,
  },
  {
    id: 5,
    title: "読書習慣",
    description: "毎日30分間の読書時間を作ろう",
    category: "学習",
    difficulty: "中級",
    estimatedTime: "30分",
    participants: 203,
    likes: 95,
    comments: 34,
    status: "completed",
    author: "高橋さん",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-11",
    image: "/placeholder.svg?height=200&width=300",
    completions: 178,
  },
  {
    id: 6,
    title: "写真撮影",
    description: "毎日1枚、美しい瞬間を写真に収めよう",
    category: "創作",
    difficulty: "初級",
    estimatedTime: "15分",
    participants: 87,
    likes: 52,
    comments: 19,
    status: "active",
    author: "伊藤さん",
    authorAvatar: "/placeholder.svg?height=40&width=40",
    createdAt: "2024-01-10",
    image: "/placeholder.svg?height=200&width=300",
    completions: 63,
  },
]

const categories = ["全て", "料理", "ウェルネス", "学習", "健康", "創作"]
const difficulties = ["全て", "初級", "中級", "上級"]
const statuses = ["全て", "active", "completed", "paused"]

const statusLabels = {
  active: "進行中",
  completed: "完了",
  paused: "一時停止",
}

const statusIcons = {
  active: Play,
  completed: CheckCircle,
  paused: Pause,
}

export default function ChallengePage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("全て")
  const [selectedDifficulty, setSelectedDifficulty] = useState("全て")
  const [selectedStatus, setSelectedStatus] = useState("全て")
  const [sortBy, setSortBy] = useState("newest")

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "全て" || challenge.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === "全て" || challenge.difficulty === selectedDifficulty
    const matchesStatus = selectedStatus === "全て" || challenge.status === selectedStatus

    return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus
  })

  const sortedChallenges = [...filteredChallenges].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      case "popular":
        return b.participants - a.participants
      case "likes":
        return b.likes - a.likes
      default:
        return 0
    }
  })

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">チャレンジ一覧</h1>
        <p className="text-gray-600">みんなのチャレンジを見つけて、一緒に成長しましょう</p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="チャレンジを検索..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="カテゴリー" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="難易度" />
                </SelectTrigger>
                <SelectContent>
                  {difficulties.map((difficulty) => (
                    <SelectItem key={difficulty} value={difficulty}>
                      {difficulty}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="ステータス" />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status === "全て" ? status : statusLabels[status as keyof typeof statusLabels]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="並び順" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">新着順</SelectItem>
                  <SelectItem value="popular">人気順</SelectItem>
                  <SelectItem value="likes">いいね順</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Challenge Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedChallenges.map((challenge) => {
          const StatusIcon = statusIcons[challenge.status as keyof typeof statusIcons]

          return (
            <Card
              key={challenge.id}
              className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="aspect-video relative">
                <img
                  src={challenge.image || "/placeholder.svg"}
                  alt={challenge.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <Badge className="bg-white/90 text-gray-700" variant="secondary">
                    {challenge.category}
                  </Badge>
                  <Badge
                    className={`text-white ${
                      challenge.status === "active"
                        ? "bg-green-500"
                        : challenge.status === "completed"
                          ? "bg-blue-500"
                          : "bg-yellow-500"
                    }`}
                  >
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {statusLabels[challenge.status as keyof typeof statusLabels]}
                  </Badge>
                </div>
                <div className="absolute top-3 right-3">
                  <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={challenge.authorAvatar || "/placeholder.svg"} />
                    <AvatarFallback>{challenge.author[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-gray-600">{challenge.author}</span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-xs text-gray-400">{challenge.createdAt}</span>
                </div>
                <CardTitle className="text-lg">
                  <Link href={`/challenge/${challenge.id}`} className="hover:text-pink-600 transition-colors">
                    {challenge.title}
                  </Link>
                </CardTitle>
                <p className="text-sm text-gray-600">{challenge.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {challenge.difficulty}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {challenge.estimatedTime}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {challenge.completions}完了
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {challenge.participants}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      {challenge.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-4 h-4" />
                      {challenge.comments}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    asChild
                    className="flex-1 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
                  >
                    <Link href={`/challenge/${challenge.id}`}>詳細を見る</Link>
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {sortedChallenges.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">条件に一致するチャレンジが見つかりませんでした</p>
          <p className="text-gray-400 text-sm mt-2">検索条件を変更してみてください</p>
        </div>
      )}

      {/* Floating Action Button */}
      <Link href="/challenge/new" passHref>
        <Button
          className="fixed bottom-8 right-8 h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white shadow-lg hover:scale-110 transition-transform duration-300"
        >
          <Plus className="h-8 w-8" />
        </Button>
      </Link>
    </div>
  )
}
