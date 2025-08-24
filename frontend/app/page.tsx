import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Heart, MessageCircle, Share2, Sparkles, TrendingUp, Bell, X, Trophy, Target, Clock, Users } from "lucide-react"

const todaysChallenges = [
  {
    id: 1,
    title: "新しいレシピに挑戦",
    description: "今まで作ったことのない料理を1品作ってみよう",
    difficulty: "初級",
    category: "料理",
    estimatedTime: "30分",
    participants: 124,
    likes: 45,
    image: "/placeholder.jpg",
    progress: 0,
    isRecommended: true,
  },
  {
    id: 2,
    title: "5分間瞑想",
    description: "心を落ち着かせて、今日一日をリフレッシュしよう",
    difficulty: "初級",
    category: "ウェルネス",
    estimatedTime: "5分",
    participants: 89,
    likes: 32,
    image: "/placeholder.jpg",
    progress: 0,
    isRecommended: true,
  },
  {
    id: 3,
    title: "新しい言語を学ぶ",
    description: "興味のある言語の基本的な挨拶を覚えてみよう",
    difficulty: "中級",
    category: "学習",
    estimatedTime: "15分",
    participants: 67,
    likes: 28,
    image: "/placeholder.jpg",
    progress: 0,
    isRecommended: false,
  },
]

const ongoingChallenges = [
  {
    id: 4,
    title: "毎日読書30分",
    progress: 65,
    daysLeft: 12,
    category: "学習",
  },
  {
    id: 5,
    title: "朝のストレッチ",
    progress: 80,
    daysLeft: 5,
    category: "健康",
  },
]

const recentActivities = [
  {
    user: "田中さん",
    action: "「手作りパンに挑戦」を完了しました",
    time: "2時間前",
    avatar: "/placeholder-user.jpg",
    type: "completion",
  },
]

const achievements = [
  { name: "初挑戦", icon: "🌱", description: "初めてのチャレンジを完了" },
  { name: "継続力", icon: "🔥", description: "7日連続でチャレンジを実行" },
  { name: "人気者", icon: "❤️", description: "投稿が10いいねを獲得" },
]

export default function HomePage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Notification Banner */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-pink-100 to-blue-100 border-pink-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-pink-600" />
                <div>
                  <p className="font-medium text-pink-800">今日のモチベーション</p>
                  <p className="text-sm text-pink-700">小さな一歩が大きな変化を生み出します！今日も頑張りましょう 🌟</p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-pink-600 hover:bg-pink-200">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">おはようございます！</h1>
        <p className="text-gray-600">今日も新しい挑戦を始めてみませんか？</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Today's Recommended Challenges */}
          <section>
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-pink-500" />
              <h2 className="text-2xl font-semibold text-gray-900">今日のおすすめチャレンジ</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {todaysChallenges.map((challenge) => (
                <Card
                  key={challenge.id}
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="aspect-video relative">
                    <img
                      src={challenge.image || "/placeholder.jpg"}
                      alt={challenge.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className="bg-white/90 text-gray-700" variant="secondary">
                        {challenge.category}
                      </Badge>
                      {challenge.isRecommended && <Badge className="bg-pink-500 text-white">おすすめ</Badge>}
                    </div>
                    <div className="absolute top-3 right-3">
                      <Button variant="ghost" size="sm" className="bg-white/80 hover:bg-white">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{challenge.title}</CardTitle>
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
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {challenge.participants}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          {challenge.likes}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button className="flex-1 bg-gradient-to-r from-pink-500 to-blue-500 text-white hover:from-pink-600 hover:to-blue-600">
                        挑戦を始める
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Recent Activities */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">最近のアクティビティ</h2>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Avatar>
                        <AvatarImage src={activity.avatar || "/placeholder-user.jpg"} />
                        <AvatarFallback>{activity.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm">
                          <span className="font-medium">{activity.user}</span>
                          <span className="text-gray-600 ml-1">{activity.action}</span>
                        </p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Ongoing Challenges */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                進行中のチャレンジ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {ongoingChallenges.map((challenge) => (
                <div key={challenge.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{challenge.title}</h4>
                    <Badge variant="outline" className="text-xs">
                      {challenge.category}
                    </Badge>
                  </div>
                  <Progress value={challenge.progress} className="h-2" />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>{challenge.progress}% 完了</span>
                    <span>残り{challenge.daysLeft}日</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                最近の達成
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-2 rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50"
                >
                  <div className="text-2xl">{achievement.icon}</div>
                  <div>
                    <p className="font-medium text-sm">{achievement.name}</p>
                    <p className="text-xs text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">今週の統計</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">完了したチャレンジ</span>
                <span className="font-bold text-lg text-green-600">5</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">獲得いいね</span>
                <span className="font-bold text-lg text-pink-600">23</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">連続日数</span>
                <span className="font-bold text-lg text-blue-600">7日</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
