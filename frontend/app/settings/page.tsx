"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Bell, Shield, Palette, HelpCircle, LogOut, Camera, Save } from "lucide-react"

const userSettings = {
  profile: {
    name: "田中太郎",
    username: "tanaka_taro",
    email: "tanaka@example.com",
    bio: "新しいことに挑戦するのが好きです。料理と読書が趣味で、毎日少しずつ成長していきたいと思っています。",
    location: "東京都",
    website: "https://tanaka-blog.com",
    avatar: "/placeholder.svg?height=120&width=120",
  },
  notifications: {
    challengeReminders: true,
    friendActivity: true,
    comments: true,
    likes: false,
    achievements: true,
    weeklyReport: true,
    emailNotifications: true,
    pushNotifications: true,
  },
  privacy: {
    profileVisibility: "public",
    challengeVisibility: "friends",
    activityVisibility: "public",
    allowFriendRequests: true,
    showOnlineStatus: true,
    dataSharing: false,
  },
  preferences: {
    language: "ja",
    timezone: "Asia/Tokyo",
    theme: "light",
    challengeRemindTime: "09:00",
    weeklyReportDay: "sunday",
  },
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [settings, setSettings] = useState(userSettings)
  const [hasChanges, setHasChanges] = useState(false)

  const updateSetting = (section: string, key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value,
      },
    }))
    setHasChanges(true)
  }

  const handleSave = () => {
    // Here you would save to backend
    console.log("Saving settings:", settings)
    setHasChanges(false)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">設定</h1>
        <p className="text-gray-600">アカウントと環境設定を管理します</p>
      </div>

      {/* Save Changes Banner */}
      {hasChanges && (
        <Card className="mb-6 bg-gradient-to-r from-pink-50 to-blue-50 border-pink-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <p className="text-pink-800">変更が保存されていません</p>
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600"
              >
                <Save className="w-4 h-4 mr-2" />
                変更を保存
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">プロフィール</TabsTrigger>
          <TabsTrigger value="notifications">通知</TabsTrigger>
          <TabsTrigger value="privacy">プライバシー</TabsTrigger>
          <TabsTrigger value="preferences">環境設定</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                基本情報
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={settings.profile.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xl">{settings.profile.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" className="bg-transparent">
                    <Camera className="w-4 h-4 mr-2" />
                    写真を変更
                  </Button>
                  <p className="text-sm text-gray-500 mt-2">JPG、PNG形式、最大5MB</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">名前</Label>
                  <Input
                    id="name"
                    value={settings.profile.name}
                    onChange={(e) => updateSetting("profile", "name", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username">ユーザー名</Label>
                  <Input
                    id="username"
                    value={settings.profile.username}
                    onChange={(e) => updateSetting("profile", "username", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">メールアドレス</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.profile.email}
                  onChange={(e) => updateSetting("profile", "email", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">自己紹介</Label>
                <Textarea
                  id="bio"
                  value={settings.profile.bio}
                  onChange={(e) => updateSetting("profile", "bio", e.target.value)}
                  className="min-h-20"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">所在地</Label>
                  <Input
                    id="location"
                    value={settings.profile.location}
                    onChange={(e) => updateSetting("profile", "location", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">ウェブサイト</Label>
                  <Input
                    id="website"
                    value={settings.profile.website}
                    onChange={(e) => updateSetting("profile", "website", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                通知設定
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="challenge-reminders">チャレンジリマインダー</Label>
                    <p className="text-sm text-gray-500">設定した時間にチャレンジを通知します</p>
                  </div>
                  <Switch
                    id="challenge-reminders"
                    checked={settings.notifications.challengeReminders}
                    onCheckedChange={(checked) => updateSetting("notifications", "challengeReminders", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="friend-activity">フレンドのアクティビティ</Label>
                    <p className="text-sm text-gray-500">友達がチャレンジを完了した時に通知</p>
                  </div>
                  <Switch
                    id="friend-activity"
                    checked={settings.notifications.friendActivity}
                    onCheckedChange={(checked) => updateSetting("notifications", "friendActivity", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="comments">コメント</Label>
                    <p className="text-sm text-gray-500">投稿にコメントがついた時に通知</p>
                  </div>
                  <Switch
                    id="comments"
                    checked={settings.notifications.comments}
                    onCheckedChange={(checked) => updateSetting("notifications", "comments", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="likes">いいね</Label>
                    <p className="text-sm text-gray-500">投稿にいいねがついた時に通知</p>
                  </div>
                  <Switch
                    id="likes"
                    checked={settings.notifications.likes}
                    onCheckedChange={(checked) => updateSetting("notifications", "likes", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="achievements">実績獲得</Label>
                    <p className="text-sm text-gray-500">新しい実績を獲得した時に通知</p>
                  </div>
                  <Switch
                    id="achievements"
                    checked={settings.notifications.achievements}
                    onCheckedChange={(checked) => updateSetting("notifications", "achievements", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="weekly-report">週次レポート</Label>
                    <p className="text-sm text-gray-500">週間の活動サマリーを通知</p>
                  </div>
                  <Switch
                    id="weekly-report"
                    checked={settings.notifications.weeklyReport}
                    onCheckedChange={(checked) => updateSetting("notifications", "weeklyReport", checked)}
                  />
                </div>
              </div>

              <hr />

              <div className="space-y-4">
                <h3 className="font-medium">通知方法</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="email-notifications">メール通知</Label>
                    <p className="text-sm text-gray-500">メールで通知を受け取る</p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={settings.notifications.emailNotifications}
                    onCheckedChange={(checked) => updateSetting("notifications", "emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="push-notifications">プッシュ通知</Label>
                    <p className="text-sm text-gray-500">ブラウザでプッシュ通知を受け取る</p>
                  </div>
                  <Switch
                    id="push-notifications"
                    checked={settings.notifications.pushNotifications}
                    onCheckedChange={(checked) => updateSetting("notifications", "pushNotifications", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                プライバシー設定
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-visibility">プロフィールの公開範囲</Label>
                  <Select
                    value={settings.privacy.profileVisibility}
                    onValueChange={(value) => updateSetting("privacy", "profileVisibility", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">全体に公開</SelectItem>
                      <SelectItem value="friends">フレンドのみ</SelectItem>
                      <SelectItem value="private">非公開</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenge-visibility">チャレンジの公開範囲</Label>
                  <Select
                    value={settings.privacy.challengeVisibility}
                    onValueChange={(value) => updateSetting("privacy", "challengeVisibility", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">全体に公開</SelectItem>
                      <SelectItem value="friends">フレンドのみ</SelectItem>
                      <SelectItem value="private">非公開</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="activity-visibility">アクティビティの公開範囲</Label>
                  <Select
                    value={settings.privacy.activityVisibility}
                    onValueChange={(value) => updateSetting("privacy", "activityVisibility", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">全体に公開</SelectItem>
                      <SelectItem value="friends">フレンドのみ</SelectItem>
                      <SelectItem value="private">非公開</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="friend-requests">フレンドリクエストを許可</Label>
                    <p className="text-sm text-gray-500">他のユーザーからのフレンドリクエストを受け取る</p>
                  </div>
                  <Switch
                    id="friend-requests"
                    checked={settings.privacy.allowFriendRequests}
                    onCheckedChange={(checked) => updateSetting("privacy", "allowFriendRequests", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="online-status">オンライン状態を表示</Label>
                    <p className="text-sm text-gray-500">フレンドにオンライン状態を表示する</p>
                  </div>
                  <Switch
                    id="online-status"
                    checked={settings.privacy.showOnlineStatus}
                    onCheckedChange={(checked) => updateSetting("privacy", "showOnlineStatus", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="data-sharing">データ共有</Label>
                    <p className="text-sm text-gray-500">サービス改善のためのデータ共有に同意する</p>
                  </div>
                  <Switch
                    id="data-sharing"
                    checked={settings.privacy.dataSharing}
                    onCheckedChange={(checked) => updateSetting("privacy", "dataSharing", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="w-5 h-5" />
                環境設定
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">言語</Label>
                  <Select
                    value={settings.preferences.language}
                    onValueChange={(value) => updateSetting("preferences", "language", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ja">日本語</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">タイムゾーン</Label>
                  <Select
                    value={settings.preferences.timezone}
                    onValueChange={(value) => updateSetting("preferences", "timezone", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                      <SelectItem value="America/New_York">America/New_York</SelectItem>
                      <SelectItem value="Europe/London">Europe/London</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="theme">テーマ</Label>
                <Select
                  value={settings.preferences.theme}
                  onValueChange={(value) => updateSetting("preferences", "theme", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">ライト</SelectItem>
                    <SelectItem value="dark">ダーク</SelectItem>
                    <SelectItem value="auto">システム設定に従う</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="remind-time">チャレンジリマインド時刻</Label>
                  <Input
                    id="remind-time"
                    type="time"
                    value={settings.preferences.challengeRemindTime}
                    onChange={(e) => updateSetting("preferences", "challengeRemindTime", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weekly-report-day">週次レポート送信日</Label>
                  <Select
                    value={settings.preferences.weeklyReportDay}
                    onValueChange={(value) => updateSetting("preferences", "weeklyReportDay", value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sunday">日曜日</SelectItem>
                      <SelectItem value="monday">月曜日</SelectItem>
                      <SelectItem value="friday">金曜日</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5" />
                アカウント
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">データのエクスポート</p>
                  <p className="text-sm text-gray-500">あなたのデータをダウンロードします</p>
                </div>
                <Button variant="outline" className="bg-transparent">
                  エクスポート
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">アカウントの削除</p>
                  <p className="text-sm text-gray-500">アカウントとすべてのデータを削除します</p>
                </div>
                <Button variant="destructive">削除</Button>
              </div>

              <hr />

              <div className="flex justify-center">
                <Button variant="outline" className="bg-transparent">
                  <LogOut className="w-4 h-4 mr-2" />
                  ログアウト
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
