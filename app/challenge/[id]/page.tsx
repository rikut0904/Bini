import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Share2, Clock, Users, Target, CheckCircle, Play, Trophy, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Mock data - in real app this would come from API/database
const challengeData = {
  id: 1,
  title: "新しいレシピに挑戦",
  description: "今まで作ったことのない料理を1品作ってみよう。新しい味覚の発見や料理スキルの向上を目指します。",
  longDescription:
    "このチャレンジでは、普段作らない料理に挑戦することで、料理の幅を広げ、新しい味覚を発見することを目的としています。レシピは自由に選んでいただけますが、できるだけ今まで作ったことのないものを選んでください。",
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
  image: "/placeholder.svg?height=400&width=600",
  completions: 89,
  tags: ["料理", "初心者向け", "創作", "スキルアップ"],
  steps: [
    "作りたい料理のレシピを選ぶ",
    "必要な材料を準備する",
    "レシピに従って調理する",
    "完成した料理の写真を撮る",
    "感想をシェアする",
  ],
  tips: [
    "簡単なレシピから始めることをおすすめします",
    "材料は事前に準備しておきましょう",
    "失敗を恐れずに挑戦してください",
  ],
}

const comments = [
  {
    id: 1,
    user: "佐藤さん",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "昨日パエリアに挑戦しました！思ったより簡単で美味しくできました。",
    time: "2時間前",
    likes: 5,
  },
  {
    id: 2,
    user: "山田さん",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "タイ料理のガパオライスを作ってみました。スパイシーで美味しかったです！",
    time: "5時間前",
    likes: 8,
  },
  {
    id: 3,
    user: "鈴木さん",
    avatar: "/placeholder.svg?height=40&width=40",
    content: "フランス料理のラタトゥイユに挑戦中です。野菜の切り方が難しいですが頑張ります！",
    time: "1日前",
    likes: 3,
  },
]

const recentCompletions = [
  {
    user: "高橋さん",
    avatar: "/placeholder.svg?height=32&width=32",
    dish: "手作りパスタ",
    time: "30分前",
  },
  {
    user: "伊藤さん",
    avatar: "/placeholder.svg?height=32&width=32",
    dish: "韓国料理キンパ",
    time: "1時間前",
  },
  {
    user: "渡辺さん",
    avatar: "/placeholder.svg?height=32&width=32",
    dish: "インドカレー",
    time: "2時間前",
  },
]

export default async function ChallengeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // In Next.js 15, route params are provided as a Promise
  const { id } = await params
  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/challenge" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            チャレンジ一覧に戻る
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Challenge Header */}
          <Card>
            <div className="aspect-video relative">
              <img
                src={challengeData.image || "/placeholder.svg"}
                alt={challengeData.title}
                className="w-full h-full object-cover rounded-t-lg"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-white/90 text-gray-700" variant="secondary">
                  {challengeData.category}
                </Badge>
                <Badge className="bg-green-500 text-white">
                  <Play className="w-3 h-3 mr-1" />
                  進行中
                </Badge>
              </div>
            </div>

            <CardHeader>
              <div className="flex items-center gap-2 mb-4">
                <Avatar>
                  <AvatarImage src={challengeData.authorAvatar || "/placeholder.svg"} />
                  <AvatarFallback>{challengeData.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{challengeData.author}</p>
                  <p className="text-sm text-gray-500">{challengeData.createdAt}</p>
                </div>
              </div>

              <CardTitle className="text-2xl mb-2">{challengeData.title}</CardTitle>
              <p className="text-gray-600 mb-4">{challengeData.longDescription}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {challengeData.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {challengeData.difficulty}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {challengeData.estimatedTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {challengeData.participants}人参加中
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {challengeData.completions}人完了
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4 mr-1" />
                    {challengeData.likes}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Challenge Steps */}
          <Card>
            <CardHeader>
              <CardTitle>チャレンジの手順</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {challengeData.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <p className="text-gray-700">{step}</p>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle>成功のコツ</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {challengeData.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-pink-500 rounded-full mt-2"></div>
                    <p className="text-gray-700">{tip}</p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Comments Section */}
          <Card>
            <CardHeader>
              <CardTitle>コメント ({challengeData.comments})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Add Comment */}
              <div className="space-y-3">
                <Textarea placeholder="コメントを書く..." className="min-h-20" />
                <Button className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600">
                  コメントする
                </Button>
              </div>

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3 p-4 bg-gray-50 rounded-lg">
                    <Avatar>
                      <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{comment.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{comment.user}</span>
                        <span className="text-sm text-gray-500">{comment.time}</span>
                      </div>
                      <p className="text-gray-700 mb-2">{comment.content}</p>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-pink-600">
                          <Heart className="w-4 h-4 mr-1" />
                          {comment.likes}
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-500">
                          返信
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Card */}
          <Card>
            <CardContent className="p-6">
              <Button className="w-full mb-4 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600">
                このチャレンジを始める
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                お気に入りに追加
              </Button>
            </CardContent>
          </Card>

          {/* Recent Completions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                最近の完了者
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentCompletions.map((completion, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={completion.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{completion.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{completion.user}</p>
                    <p className="text-xs text-gray-500">
                      {completion.dish} • {completion.time}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Progress Stats */}
          <Card>
            <CardHeader>
              <CardTitle>進捗統計</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>完了率</span>
                  <span>72%</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div className="flex justify-between text-sm">
                <span>平均完了時間</span>
                <span>25分</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>満足度</span>
                <span>4.8/5.0</span>
              </div>
            </CardContent>
          </Card>

          {/* Related Challenges */}
          <Card>
            <CardHeader>
              <CardTitle>関連チャレンジ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <p className="font-medium text-sm">お菓子作りに挑戦</p>
                <p className="text-xs text-gray-500">料理 • 初級 • 45分</p>
              </div>
              <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <p className="font-medium text-sm">世界の朝食</p>
                <p className="text-xs text-gray-500">料理 • 中級 • 30分</p>
              </div>
              <div className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                <p className="font-medium text-sm">発酵食品作り</p>
                <p className="text-xs text-gray-500">料理 • 上級 • 2時間</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
