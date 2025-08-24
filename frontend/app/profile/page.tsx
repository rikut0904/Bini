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
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">プロフィール</h1>
      <Card>
        <CardHeader>
          <CardTitle>あなたの情報</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-xl font-semibold">あなたの名前</p>
              <p className="text-gray-500">your.email@example.com</p>
            </div>
          </div>
          <div>
            <Label htmlFor="bio">自己紹介</Label>
            <p id="bio" className="text-gray-700">
              ここに自己紹介文が入ります。
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
