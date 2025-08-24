"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Target, Heart, MessageCircle, Share2, CheckCircle, Play, Pause, TrendingUp, Edit } from "lucide-react"
import Link from "next/link"
import useSWR from "swr"
import { Label } from "@/components/ui/label"

const userProfile = {
  name: "田中太郎",
  username: "@tanaka_taro",
  avatar: "/placeholder.svg?height=120&width=120",
  bio: "新しいことに挑戦するのが好きです。料理と読書が趣味で、毎日少しずつ成長していきたいと思っています。",
  joinDate: "2024年1月",
  location: "東京都",
  stats: {
    totalChallenges: 24,
    completedChallenges: 18,
    ongoingChallenges: 4,
    totalLikes: 156,
    totalComments: 89,
    streakDays: 12,
    level: 8,
    experiencePoints: 2340,
    nextLevelXP: 2500,
  },
}

const achievements = [
  {
    id: 1,
    name: "初挑戦",
    description: "初めてのチャレンジを完了",
    icon: "🌱",
    earned: true,
    earnedDate: "2024-01-16",
    rarity: "common",
  },
  {
    id: 2,
    name: "継続力",
    description: "7日連続でチャレンジを実行",
    icon: "🔥",
    earned: true,
    earnedDate: "2024-01-22",
    rarity: "uncommon",
  },
  {
    id: 3,
    name: "人気者",
    description: "投稿が50いいねを獲得",
    icon: "❤️",
    earned: true,
    earnedDate: "2024-01-25",
    rarity: "rare",
  },
  {
    id: 4,
    name: "チャレンジマスター",
    description: "20個のチャレンジを完了",
    icon: "🏆",
    earned: true,
    earnedDate: "2024-01-30",
    rarity: "epic",
  },
  {
    id: 5,
    name: "コミュニティリーダー",
    description: "100個のコメントを投稿",
    icon: "👑",
    earned: false,
    progress: 89,
    total: 100,
    rarity: "legendary",
  },
  {
    id: 6,
    name: "完璧主義者",
    description: "30日連続でチャレンジを実行",
    icon: "💎",
    earned: false,
    progress: 12,
    total: 30,
    rarity: "legendary",
  },
]

const challengeHistory = [
  {
    id: 1,
    title: "新しいレシピに挑戦",
    category: "料理",
    status: "completed",
    completedDate: "2024-01-30",
    duration: "5日間",
    likes: 23,
    comments: 8,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    title: "毎日読書30分",
    category: "学習",
    status: "ongoing",
    startDate: "2024-01-25",
    progress: 80,
    likes: 15,
    comments: 4,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    title: "朝のストレッチ",
    category: "健康",
    status: "completed",
    completedDate: "2024-01-28",
    duration: "14日間",
    likes: 31,
    comments: 12,
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 4,
    title: "写真撮影",
    category: "創作",
    status: "paused",
    startDate: "2024-01-20",
    progress: 45,
    likes: 8,
    comments: 3,
    image: "/placeholder.svg?height=60&width=60",
  },
]

const activityTimeline = [
  {
    id: 1,
    type: "comment_received",
    user: "佐藤さん",
    userAvatar: "/placeholder.svg?height=32&width=32",
    action: "があなたの「新しいレシピに挑戦」にコメントしました",
    content: "とても美味しそうですね！レシピを教えてください。",
    time: "2時間前",
    challengeTitle: "新しいレシピに挑戦",
  },
  {
    id: 2,
    type: "like_received",
    user: "山田さん",
    userAvatar: "/placeholder.svg?height=32&width=32",
    action: "があなたの「朝のストレッチ」にいいねしました",
    time: "4時間前",
    challengeTitle: "朝のストレッチ",
  },
  {
    id: 3,
    type: "achievement_earned",
    action: "新しい実績「チャレンジマスター」を獲得しました",
    time: "1日前",
    achievement: "チャレンジマスター",
  },
  {
    id: 4,
    type: "challenge_completed",
    action: "「新しいレシピに挑戦」を完了しました",
    time: "1日前",
    challengeTitle: "新しいレシピに挑戦",
  },
  {
    id: 5,
    type: "comment_received",
    user: "鈴木さん",
    userAvatar: "/placeholder.svg?height=32&width=32",
    action: "があなたの「朝のストレッチ」にコメントしました",
    content: "私も始めてみました！とても気持ちいいですね。",
    time: "2日前",
    challengeTitle: "朝のストレッチ",
  },
]

const monthlyStats = [
  { month: "1月", completed: 6, started: 8 },
  { month: "2月", completed: 4, started: 5 },
  { month: "3月", completed: 8, started: 9 },
  { month: "4月", completed: 5, started: 6 },
]

const rarityColors = {
  common: "bg-gray-100 text-gray-700 border-gray-300",
  uncommon: "bg-green-100 text-green-700 border-green-300",
  rare: "bg-blue-100 text-blue-700 border-blue-300",
  epic: "bg-purple-100 text-purple-700 border-purple-300",
  legendary: "bg-yellow-100 text-yellow-700 border-yellow-300",
}

const statusIcons = {
  completed: CheckCircle,
  ongoing: Play,
  paused: Pause,
}

const statusColors = {
  completed: "text-green-600",
  ongoing: "text-blue-600",
  paused: "text-yellow-600",
}

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview")
  // Try to fetch session info from Auth0 route; if unauthorized, show login prompt
  const { data: session, error: sessionError, isLoading: sessionLoading } = useSWR(
    "/api/auth/me",
    (url) => fetch(url, { credentials: "include" }).then((r) => {
      if (!r.ok) throw new Error("unauthenticated")
      return r.json()
    }),
  )

  const completionRate = Math.round((userProfile.stats.completedChallenges / userProfile.stats.totalChallenges) * 100)
  const levelProgress = Math.round((userProfile.stats.experiencePoints / userProfile.stats.nextLevelXP) * 100)

  if (!session && !sessionLoading) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">プロフィール</h1>
        <p className="text-gray-600 mb-4">プロフィールを見るにはログインしてください。</p>
        <Link href="/api/auth/login" className="text-pink-600 underline">ログイン</Link>
      </div>
    )
  }
  return (
     <div className="p-8 max-w-6xl mx-auto">
      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start">
              <Avatar className="w-32 h-32 mb-4">
                <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">{userProfile.name[0]}</AvatarFallback>
              </Avatar>
              <Button variant="outline" className="w-full md:w-auto bg-transparent">
                <Edit className="w-4 h-4 mr-2" />
                プロフィール編集
              </Button>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-1">{userProfile.name}</h1>
                  <p className="text-gray-600 mb-2">{userProfile.username}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>📍 {userProfile.location}</span>
                    <span>📅 {userProfile.joinDate}から参加</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">Lv.{userProfile.stats.level}</div>
                    <div className="text-xs text-gray-500">レベル</div>
                  </div>
                  <div className="w-24">
                    <Progress value={levelProgress} className="h-2 mb-1" />
                    <div className="text-xs text-gray-500 text-center">
                      {userProfile.stats.experiencePoints}/{userProfile.stats.nextLevelXP} XP
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{userProfile.bio}</p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg">
                  <div className="text-2xl font-bold text-pink-600">{userProfile.stats.totalChallenges}</div>
                  <div className="text-sm text-gray-600">総チャレンジ数</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{userProfile.stats.completedChallenges}</div>
                  <div className="text-sm text-gray-600">完了数</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{userProfile.stats.totalLikes}</div>
                  <div className="text-sm text-gray-600">獲得いいね</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{userProfile.stats.streakDays}</div>
                  <div className="text-sm text-gray-600">連続日数</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">概要</TabsTrigger>
          <TabsTrigger value="achievements">実績</TabsTrigger>
          <TabsTrigger value="challenges">チャレンジ履歴</TabsTrigger>
          <TabsTrigger value="activity">アクティビティ</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Completion Rate */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-green-500" />
                  完了率
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-green-600 mb-2">{completionRate}%</div>
                  <Progress value={completionRate} className="h-3" />
                </div>
                <div className="text-sm text-gray-600 text-center">
                  {userProfile.stats.totalChallenges}個中{userProfile.stats.completedChallenges}個完了
                </div>
              </CardContent>
            </Card>

            {/* Recent Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  最近の実績
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements
                    .filter((a) => a.earned)
                    .slice(0, 3)
                    .map((achievement) => (
                      <div key={achievement.id} className="flex items-center gap-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
                          <p className="font-medium text-sm">{achievement.name}</p>
                          <p className="text-xs text-gray-500">{achievement.earnedDate}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Progress Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                月別進捗
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-4">
                {monthlyStats.map((stat) => (
                  <div key={stat.month} className="text-center">
                    <div className="text-lg font-bold text-gray-900">{stat.month}</div>
                    <div className="text-sm text-green-600">完了: {stat.completed}</div>
                    <div className="text-sm text-blue-600">開始: {stat.started}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Achievements Tab */}
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`${achievement.earned ? "bg-gradient-to-br from-yellow-50 to-orange-50" : "opacity-60"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold">{achievement.name}</h3>
                        <Badge className={`text-xs ${rarityColors[achievement.rarity as keyof typeof rarityColors]}`}>
                          {achievement.rarity}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>

                      {achievement.earned ? (
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <CheckCircle className="w-3 h-3" />
                          {achievement.earnedDate}に獲得
                        </div>
                      ) : achievement.progress !== undefined ? (
                        <div>
                          <div className="flex justify-between text-xs text-gray-500 mb-1">
                            <span>進捗</span>
                            <span>
                              {achievement.progress}/{achievement.total}
                            </span>
                          </div>
                          <Progress value={(achievement.progress / achievement.total) * 100} className="h-2" />
                        </div>
                      ) : (
                        <div className="text-xs text-gray-500">未獲得</div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Challenge History Tab */}
        <TabsContent value="challenges" className="space-y-6">
          <div className="space-y-4">
            {challengeHistory.map((challenge) => {
              const StatusIcon = statusIcons[challenge.status as keyof typeof statusIcons]
              const statusColor = statusColors[challenge.status as keyof typeof statusColors]

              return (
                <Card key={challenge.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={challenge.image || "/placeholder.svg"}
                        alt={challenge.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg">{challenge.title}</h3>
                          <Badge variant="outline">{challenge.category}</Badge>
                          <div className={`flex items-center gap-1 ${statusColor}`}>
                            <StatusIcon className="w-4 h-4" />
                            <span className="text-sm">
                              {challenge.status === "completed"
                                ? "完了"
                                : challenge.status === "ongoing"
                                  ? "進行中"
                                  : "一時停止"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                          {challenge.status === "completed" ? (
                            <>
                              <span>📅 {challenge.completedDate}に完了</span>
                              <span>⏱️ {challenge.duration}</span>
                            </>
                          ) : (
                            <>
                              <span>📅 {challenge.startDate}に開始</span>
                              {challenge.progress && <span>📊 {challenge.progress}% 完了</span>}
                            </>
                          )}
                        </div>

                        {challenge.progress && challenge.status === "ongoing" && (
                          <Progress value={challenge.progress} className="h-2 mb-2" />
                        )}

                        <div className="flex items-center gap-4 text-sm text-gray-500">
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

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/challenge/${challenge.id}`}>詳細</Link>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>最近のアクティビティ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityTimeline.map((activity) => (
                  <div key={activity.id} className="flex gap-3 p-3 rounded-lg hover:bg-gray-50">
                    {activity.type === "comment_received" || activity.type === "like_received" ? (
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={activity.userAvatar || "/placeholder.svg"} />
                        <AvatarFallback>{activity.user?.[0]}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full flex items-center justify-center">
                        {activity.type === "achievement_earned" ? (
                          <Trophy className="w-4 h-4 text-white" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                    )}

                    <div className="flex-1">
                      <p className="text-sm">
                        {activity.user && <span className="font-medium">{activity.user}</span>}
                        <span className={activity.user ? "ml-1" : ""}>{activity.action}</span>
                      </p>
                      {activity.content && (
                        <p className="text-sm text-gray-600 mt-1 p-2 bg-gray-100 rounded">"{activity.content}"</p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{activity.time}</span>
                        {activity.challengeTitle && (
                          <>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs text-blue-600">{activity.challengeTitle}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
