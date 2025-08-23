"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import Image from "next/image"

export default function NewChallengePage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("")
  const [estimatedTime, setEstimatedTime] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const categories = ["料理", "ウェルネス", "学習", "健康", "創作", "システム関係", "その他"]
  const difficulties = ["easy", "medium", "hard"]
  const estimatedTimes = ["5分", "15分", "30分", "1時間", "半日", "1日以上"]

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    } else {
      setImageFile(null)
      setImagePreview(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("level", difficulty) // Changed from category to level, and uses difficulty
    formData.append("user_id", "1") // Added a default user_id
    if (imageFile) {
      formData.append("image", imageFile)
    }

    try {
      // Replace with your actual API endpoint
      const response = await fetch("http://localhost:8080/challenges", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "チャレンジの作成に失敗しました。")
      }

      toast({
        title: "チャレンジを作成しました！",
        description: "新しいチャレンジが追加されました。",
      })
      router.push("/challenge") // Redirect to challenge list page
    } catch (error: any) {
      toast({
        title: "エラー",
        description: error.message || "チャレンジの作成中にエラーが発生しました。",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">新しいチャレンジを作成</h1>
        <p className="text-gray-600">あなたのアイデアをみんなと共有しましょう</p>
      </div>

      <Card className="bg-white/80">
        <CardHeader>
          <CardTitle>チャレンジ詳細</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">タイトル</Label>
              <Input
                id="title"
                placeholder="例: 毎日5分間の瞑想"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">説明</Label>
              <Textarea
                id="description"
                placeholder="チャレンジの内容を具体的に説明してください"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">カテゴリー</Label>
              <Select value={category} onValueChange={setCategory} required>
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
              <Select value={difficulty} onValueChange={setDifficulty} required>
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

            <div className="space-y-2">
              <Label htmlFor="estimatedTime">推定時間</Label>
              <Select value={estimatedTime} onValueChange={setEstimatedTime} required>
                <SelectTrigger id="estimatedTime">
                  <SelectValue placeholder="推定時間を選択" />
                </SelectTrigger>
                <SelectContent>
                  {estimatedTimes.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">チャレンジ画像</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <div className="mt-4">
                  <Image src={imagePreview} alt="Image Preview" width={200} height={200} className="rounded-md object-cover" />
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white"
              disabled={loading}
            >
              {loading ? "作成中..." : "チャレンジを作成"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}