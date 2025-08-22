
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const categories = ["料理", "ウェルネス", "学習", "健康", "創作"]
const difficulties = ["初級", "中級", "上級"]

export default function NewChallengePage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [estimatedTime, setEstimatedTime] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement challenge creation logic
    console.log({
      title,
      description,
      category,
      difficulty,
      estimatedTime,
    })
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href="/challenge" className="flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          チャレンジ一覧に戻る
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">新しいチャレンジを作成</h1>
        <p className="text-gray-600 mt-2">
          新しい目標を設定して、みんなと共有しましょう。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>チャレンジの詳細</CardTitle>
          <CardDescription>他の人が参加したくなるような、明確で魅力的な情報を入力してください。</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">チャレンジ名</Label>
              <Input
                id="title"
                placeholder="例：毎日10分間の読書"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">説明</Label>
              <Textarea
                id="description"
                placeholder="例：新しい知識を身につけるために、毎日欠かさず10分間読書する習慣をつけます。"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="category">カテゴリー</Label>
                <Select onValueChange={setCategory} value={category}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="カテゴリーを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="difficulty">難易度</Label>
                <Select onValueChange={setDifficulty} value={difficulty}>
                  <SelectTrigger id="difficulty">
                    <SelectValue placeholder="難易度を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    {difficulties.map((diff) => (
                      <SelectItem key={diff} value={diff}>
                        {diff}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimated-time">予想時間</Label>
              <Input
                id="estimated-time"
                placeholder="例：10分"
                value={estimatedTime}
                onChange={(e) => setEstimatedTime(e.target.value)}
              />
            </div>
            
            <div className="flex justify-end pt-4">
              <Button type="submit" className="bg-gradient-to-r from-pink-500 to-blue-500 text-white">
                チャレンジを作成
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
