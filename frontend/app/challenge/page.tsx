"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Target, Clock, Plus, Heart, Users, MessageCircle, Share2, CheckCircle, Play, Pause } from "lucide-react"
import Link from "next/link"
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"

// Define Challenge interface for type safety, aligned with backend
interface Challenge {
  id: number;
  title: string;
  description: string;
  category?: string;
  difficulty?: string;
  estimatedTime?: string;
  participants?: number;
  likes?: number;
  comments?: number;
  status?: string;
  author?: string;
  authorAvatar?: string;
  completions?: number;
  level?: string; // Corresponds to backend's 'Level'
  photo_url: string; // Corresponds to backend's 'PhotoURL'
  user_id: number; // Corresponds to backend's 'UserID'
  created_at: string; // Corresponds to backend's 'CreatedAt'
}

const categories = ["全て", "料理", "ウェルネス", "学習", "健康", "創作", "その他"]
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
  const [challenges, setChallenges] = useState<Challenge[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        setLoading(true)
        setError(null)
        const response = await fetch("http://localhost:8080/challenges")
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data: Challenge[] = await response.json()
        setChallenges(data)
      } catch (e: any) {
        setError(e.message)
        toast({
          title: "エラー",
          description: "チャレンジの読み込みに失敗しました。",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchChallenges()
  }, [])

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch =
      challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      challenge.description.toLowerCase().includes(searchTerm.toLowerCase())
    // Filter by category (if backend provides it, otherwise remove)
    // For now, assuming category is not directly from backend, so removing this filter
    // const matchesCategory = selectedCategory === "全て" || challenge.category === selectedCategory;

    const matchesDifficulty = selectedDifficulty === "全て" || challenge.level === selectedDifficulty
    const matchesStatus = selectedStatus === "全て" || challenge.status === selectedStatus

    return matchesSearch && matchesDifficulty && matchesStatus // Adjusted filters
  })

  const sortedChallenges = [...filteredChallenges].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime() // Use created_at
      // Removed popular and likes as they are not provided by backend
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
                  {difficulties.map((diff) => (
                    <SelectItem key={diff} value={diff}>
                      {diff}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Removed status filter as it's not provided by backend */} いや、これは必要

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="並び順" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">新着順</SelectItem>
                  {/* Removed popular and likes sort as they are not provided by backend */} いや、これは必要
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Challenge Grid */}
      {loading && (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <Card key={i} className="overflow-hidden">
        <Skeleton className="aspect-video w-full" />
        <CardHeader className="pb-3" />
      </Card>
    ))}
  </div>
      )}

      {error && (
        <div className="text-center py-12 text-red-500">
          <p className="text-lg">エラーが発生しました: {error}</p>
          <p className="text-sm mt-2">ページをリロードするか、後でもう一度お試しください。</p>
        </div>
      )}

      {!loading && !error && sortedChallenges.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">条件に一致するチャレンジが見つかりませんでした</p>
          <p className="text-gray-400 text-sm mt-2">検索条件を変更してみてください</p>
        </div>
      )}

      {!loading && !error && sortedChallenges.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedChallenges.map((challenge) => {
            const StatusIcon = statusIcons[challenge.status as keyof typeof statusIcons] || Play

            return (
              <Card
                key={challenge.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="aspect-video relative">
                  <img
                    src={challenge.photo_url || "/placeholder.svg"}
                    alt={challenge.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge className="bg-white/90 text-gray-700" variant="secondary">
                      {challenge.category || "その他"}
                    </Badge>
                    <Badge
                      className={`text-white ${
                        challenge.status === "active"
                          ? "bg-green-500"
                          : challenge.status === "completed"
                            ? "bg-blue-500"
                            : challenge.status === "paused"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                      }`}
                    >
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {statusLabels[challenge.status as keyof typeof statusLabels] || "進行中"}
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
                      <AvatarFallback>{challenge.author ? challenge.author[0] : "U"}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-600">{challenge.author || "Unknown"}</span>
                    <span className="text-xs text-gray-400">・</span>
                    <span className="text-xs text-gray-400">{new Date(challenge.created_at).toLocaleDateString()}</span>
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
                        {challenge.difficulty || challenge.level}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {challenge.estimatedTime || "-"}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      {challenge.completions ?? 0}完了
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {challenge.participants ?? 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="w-4 h-4" />
                        {challenge.likes ?? 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {challenge.comments ?? 0}
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
                    <Button variant="outline" size="icon">
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Floating Action Button */}
      <Link href="/challenge/new" passHref>
        <Button
          className="fixed bottom-8 right-8 rounded-full w-16 h-16 p-0 shadow-lg bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white text-3xl flex items-center justify-center"
        >
          <Plus className="w-8 h-8" />
        </Button>
      </Link>

    </div>
  )
}
