"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, UserPlus, UserCheck, UserX, MessageCircle } from "lucide-react"

const friends = [
  {
    id: 1,
    name: "佐藤花子",
    username: "@sato_hanako",
    avatar: "/placeholder.svg?height=60&width=60",
    status: "online",
    mutualFriends: 5,
    completedChallenges: 23,
    currentStreak: 8,
    lastActivity: "2時間前",
    recentChallenge: "朝のヨガ",
    level: 12,
  },
  {
    id: 2,
    name: "山田太郎",
    username: "@yamada_taro",
    avatar: "/placeholder.svg?height=60&width=60",
    status: "offline",
    mutualFriends: 3,
    completedChallenges: 18,
    currentStreak: 5,
    lastActivity: "1日前",
    recentChallenge: "読書習慣",
    level: 9,
  },
  {
    id: 3,
    name: "鈴木美咲",
    username: "@suzuki_misaki",
    avatar: "/placeholder.svg?height=60&width=60",
    status: "online",
    mutualFriends: 8,
    completedChallenges: 31,
    currentStreak: 15,
    lastActivity: "30分前",
    recentChallenge: "料理チャレンジ",
    level: 15,
  },
  {
    id: 4,
    name: "高橋健一",
    username: "@takahashi_ken",
    avatar: "/placeholder.svg?height=60&width=60",
    status: "away",
    mutualFriends: 2,
    completedChallenges: 12,
    currentStreak: 3,
    lastActivity: "6時間前",
    recentChallenge: "筋トレ",
    level: 7,
  },
]

const friendRequests = [
  {
    id: 1,
    name: "伊藤雅子",
    username: "@ito_masako",
    avatar: "/placeholder.svg?height=60&width=60",
    mutualFriends: 4,
    requestDate: "2日前",
    bio: "料理と読書が好きです。一緒に頑張りましょう！",
  },
  {
    id: 2,
    name: "渡辺慎一",
    username: "@watanabe_shin",
    avatar: "/placeholder.svg?height=60&width=60",
    mutualFriends: 1,
    requestDate: "3日前",
    bio: "健康的な生活を目指しています。",
  },
]

const suggestedFriends = [
  {
    id: 1,
    name: "中村あゆみ",
    username: "@nakamura_ayumi",
    avatar: "/placeholder.svg?height=60&width=60",
    mutualFriends: 6,
    commonInterests: ["料理", "健康"],
    reason: "共通の友達が多い",
  },
  {
    id: 2,
    name: "小林大輔",
    username: "@kobayashi_dai",
    avatar: "/placeholder.svg?height=60&width=60",
    mutualFriends: 3,
    commonInterests: ["学習", "読書"],
    reason: "似たようなチャレンジに参加",
  },
  {
    id: 3,
    name: "森田麻衣",
    username: "@morita_mai",
    avatar: "/placeholder.svg?height=60&width=60",
    mutualFriends: 2,
    commonInterests: ["創作", "写真"],
    reason: "同じ地域",
  },
]

const statusColors = {
  online: "bg-green-500",
  offline: "bg-gray-400",
  away: "bg-yellow-500",
}

export default function FriendPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("friends")

  const filteredFriends = friends.filter(
    (friend) =>
      friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      friend.username.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">フレンド</h1>
        <p className="text-gray-600">友達と一緒にチャレンジを楽しみましょう</p>
      </div>

      {/* Search */}
      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="友達を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="friends">フレンド ({friends.length})</TabsTrigger>
          <TabsTrigger value="requests">リクエスト ({friendRequests.length})</TabsTrigger>
          <TabsTrigger value="suggestions">おすすめ</TabsTrigger>
        </TabsList>

        {/* Friends Tab */}
        <TabsContent value="friends" className="space-y-4">
          {filteredFriends.map((friend) => (
            <Card key={friend.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{friend.name[0]}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                        statusColors[friend.status as keyof typeof statusColors]
                      }`}
                    ></div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{friend.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        Lv.{friend.level}
                      </Badge>
                      <span className="text-sm text-gray-500">{friend.username}</span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{friend.completedChallenges}</div>
                        <div className="text-xs text-gray-500">完了</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">{friend.currentStreak}</div>
                        <div className="text-xs text-gray-500">連続日数</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-blue-600">{friend.mutualFriends}</div>
                        <div className="text-xs text-gray-500">共通の友達</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-600">{friend.lastActivity}</div>
                        <div className="text-xs text-gray-500">最終活動</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-sm text-gray-600">最近のチャレンジ:</span>
                      <Badge variant="secondary" className="text-xs">
                        {friend.recentChallenge}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      メッセージ
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      プロフィール
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredFriends.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">該当するフレンドが見つかりませんでした</p>
              <p className="text-gray-400 text-sm mt-2">検索条件を変更してみてください</p>
            </div>
          )}
        </TabsContent>

        {/* Friend Requests Tab */}
        <TabsContent value="requests" className="space-y-4">
          {friendRequests.map((request) => (
            <Card key={request.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={request.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{request.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{request.name}</h3>
                      <span className="text-sm text-gray-500">{request.username}</span>
                    </div>

                    <p className="text-sm text-gray-600 mb-2">{request.bio}</p>

                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>共通の友達: {request.mutualFriends}人</span>
                      <span>リクエスト日: {request.requestDate}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
                    >
                      <UserCheck className="w-4 h-4 mr-2" />
                      承認
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      <UserX className="w-4 h-4 mr-2" />
                      拒否
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {friendRequests.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">新しいフレンドリクエストはありません</p>
            </div>
          )}
        </TabsContent>

        {/* Suggestions Tab */}
        <TabsContent value="suggestions" className="space-y-4">
          {suggestedFriends.map((suggestion) => (
            <Card key={suggestion.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={suggestion.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{suggestion.name[0]}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg">{suggestion.name}</h3>
                      <span className="text-sm text-gray-500">{suggestion.username}</span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {suggestion.reason}
                      </Badge>
                      <span className="text-sm text-gray-500">共通の友達: {suggestion.mutualFriends}人</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">共通の興味:</span>
                      {suggestion.commonInterests.map((interest) => (
                        <Badge key={interest} variant="outline" className="text-xs">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      フレンド申請
                    </Button>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      プロフィール
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
