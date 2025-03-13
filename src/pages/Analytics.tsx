
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ChartComponent from "@/components/ChartComponent";
import StatCard from "@/components/StatCard";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Activity, 
  Users, 
  Newspaper, 
  AlertTriangle,
  Calendar, 
  Clock, 
  Globe, 
  ThumbsUp
} from "lucide-react";

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for charts
  const overviewData = [
    { name: 'Pazartesi', news: 45, alerts: 12, engagement: 78 },
    { name: 'Salı', news: 52, alerts: 9, engagement: 85 },
    { name: 'Çarşamba', news: 49, alerts: 15, engagement: 90 },
    { name: 'Perşembe', news: 63, alerts: 18, engagement: 102 },
    { name: 'Cuma', news: 58, alerts: 14, engagement: 95 },
    { name: 'Cumartesi', news: 42, alerts: 8, engagement: 70 },
    { name: 'Pazar', news: 38, alerts: 6, engagement: 65 },
  ];

  const sourcesData = [
    { name: 'Hürriyet', articles: 235, alerts: 42, engagement: 5800 },
    { name: 'Sözcü', articles: 198, alerts: 35, engagement: 4900 },
    { name: 'Milliyet', articles: 174, alerts: 28, engagement: 4200 },
    { name: 'CNN Türk', articles: 163, alerts: 31, engagement: 3900 },
    { name: 'Habertürk', articles: 152, alerts: 27, engagement: 3700 },
  ];

  const topKeywordsData = [
    { name: 'Ekonomi', value: 420 },
    { name: 'Teknoloji', value: 380 },
    { name: 'Politika', value: 340 },
    { name: 'Spor', value: 310 },
    { name: 'Sağlık', value: 280 },
  ];

  const sentimentData = [
    { name: 'Olumlu', value: 42 },
    { name: 'Nötr', value: 48 },
    { name: 'Olumsuz', value: 10 },
  ];

  const recentAlerts = [
    { 
      id: 1, 
      keyword: "Yeni Teknoloji", 
      source: "TechNews", 
      date: "2023-10-05", 
      time: "15:30", 
      priority: "high" 
    },
    { 
      id: 2, 
      keyword: "Piyasa Değişimleri", 
      source: "Ekonomi Haber", 
      date: "2023-10-05", 
      time: "14:22", 
      priority: "medium" 
    },
    { 
      id: 3, 
      keyword: "Sağlık Raporu", 
      source: "Medikal Gündem", 
      date: "2023-10-05", 
      time: "12:15", 
      priority: "low" 
    },
    { 
      id: 4, 
      keyword: "Dijital Dönüşüm", 
      source: "Dijital Çağ", 
      date: "2023-10-05", 
      time: "11:05", 
      priority: "medium" 
    },
    { 
      id: 5, 
      keyword: "Veri Analizi", 
      source: "Veri Dünyası", 
      date: "2023-10-05", 
      time: "10:30", 
      priority: "high" 
    },
  ];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Analitik Paneli</h1>
        <p className="text-gray-500">
          Haber takibi ve anahtar kelime analizleriniz için kapsamlı istatistikler
        </p>
      </div>

      <Tabs 
        defaultValue="overview" 
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full space-y-5"
      >
        <TabsList className="grid grid-cols-4 md:w-[600px]">
          <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
          <TabsTrigger value="sources">Haber Kaynakları</TabsTrigger>
          <TabsTrigger value="keywords">Anahtar Kelimeler</TabsTrigger>
          <TabsTrigger value="sentiment">Duygu Analizi</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard 
              title="Toplam Haber Sayısı"
              value="1,542"
              description="Son 30 gün"
              trend={{ value: 12, isPositive: true }}
              icon={<Newspaper size={20} />}
            />
            <StatCard 
              title="Bildirim Sayısı"
              value="128"
              description="Son 30 gün"
              trend={{ value: 8, isPositive: true }}
              variant="warning"
              icon={<AlertTriangle size={20} />}
            />
            <StatCard 
              title="Aktif Müşteriler"
              value="32"
              trend={{ value: 4, isPositive: true }}
              variant="success"
              icon={<Users size={20} />}
            />
            <StatCard 
              title="Etkileşim Skoru"
              value="89.7"
              description="Ortalama"
              trend={{ value: 5, isPositive: true }}
              variant="primary"
              icon={<Activity size={20} />}
            />
          </div>

          {/* Main Chart */}
          <ChartComponent
            data={overviewData}
            type="line"
            xAxisDataKey="name"
            series={[
              { name: "Haberler", dataKey: "news", color: "#1245AC" },
              { name: "Bildirimler", dataKey: "alerts", color: "#F59E0B" },
              { name: "Etkileşim", dataKey: "engagement", color: "#34D399" }
            ]}
            title="Haftalık Özet"
            subtitle="Son 7 gün içindeki haber, bildirim ve etkileşim sayıları"
            height={350}
          />

          {/* Recent Alerts */}
          <Card>
            <CardHeader>
              <CardTitle>Son Bildirimler</CardTitle>
              <CardDescription>
                Anahtar kelimelerinizle eşleşen son bildirimleri takip edin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Anahtar Kelime</TableHead>
                    <TableHead>Kaynak</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead>Saat</TableHead>
                    <TableHead>Öncelik</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentAlerts.map((alert) => (
                    <TableRow key={alert.id}>
                      <TableCell className="font-medium">{alert.keyword}</TableCell>
                      <TableCell>{alert.source}</TableCell>
                      <TableCell>{alert.date}</TableCell>
                      <TableCell>{alert.time}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={
                            alert.priority === "high" 
                              ? "destructive" 
                              : alert.priority === "medium" 
                                ? "default" 
                                : "secondary"
                          }
                        >
                          {alert.priority === "high" 
                            ? "Yüksek" 
                            : alert.priority === "medium" 
                              ? "Orta" 
                              : "Düşük"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sources" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Kaynak Performansı</CardTitle>
                <CardDescription>
                  Kaynaklara göre makale ve bildirim dağılımı
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartComponent
                  data={sourcesData}
                  type="bar"
                  xAxisDataKey="name"
                  series={[
                    { name: "Makaleler", dataKey: "articles", color: "#1245AC" },
                    { name: "Bildirimler", dataKey: "alerts", color: "#F59E0B" }
                  ]}
                  height={350}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>En Çok Etkileşim</CardTitle>
                <CardDescription>
                  En yüksek etkileşim oranına sahip kaynaklar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {sourcesData.map((source, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{source.name}</span>
                      <span className="text-gray-500">{source.engagement.toLocaleString()}</span>
                    </div>
                    <Progress value={(source.engagement / 6000) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Kaynak Dağılımı</CardTitle>
              <CardDescription>
                Haber kaynakları kategorilerine göre dağılım
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Globe className="h-10 w-10 text-blue-500 mb-2" />
                  <span className="text-2xl font-bold">42%</span>
                  <span className="text-sm text-gray-500">Web Sitesi</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Newspaper className="h-10 w-10 text-green-500 mb-2" />
                  <span className="text-2xl font-bold">28%</span>
                  <span className="text-sm text-gray-500">Gazete</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Activity className="h-10 w-10 text-purple-500 mb-2" />
                  <span className="text-2xl font-bold">18%</span>
                  <span className="text-sm text-gray-500">Blog</span>
                </div>
                <div className="flex flex-col items-center p-4 bg-gray-50 rounded-lg">
                  <Users className="h-10 w-10 text-amber-500 mb-2" />
                  <span className="text-2xl font-bold">12%</span>
                  <span className="text-sm text-gray-500">Sosyal Medya</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>En Çok Kullanılan Anahtar Kelimeler</CardTitle>
                <CardDescription>
                  Haberlerde en sık geçen anahtar kelimeler
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartComponent
                  data={topKeywordsData}
                  type="bar"
                  xAxisDataKey="name"
                  series={[
                    { name: "Kullanım Sayısı", dataKey: "value", color: "#8B5CF6" }
                  ]}
                  height={350}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Anahtar Kelime Dağılımı</CardTitle>
                <CardDescription>
                  Kategorilere göre anahtar kelime dağılımı
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartComponent
                  data={topKeywordsData}
                  type="pie"
                  xAxisDataKey="name"
                  series={[
                    { name: "Dağılım", dataKey: "value" }
                  ]}
                  height={350}
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Keyword Trend Analizi</CardTitle>
              <CardDescription>
                Son 30 gündeki anahtar kelime trendleri
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Anahtar Kelime</TableHead>
                    <TableHead>Toplam Görünüm</TableHead>
                    <TableHead>Ortalama Günlük</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Başarı Oranı</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Ekonomi</TableCell>
                    <TableCell>2,458</TableCell>
                    <TableCell>82</TableCell>
                    <TableCell className="text-green-600 flex items-center">
                      <TrendingUp className="mr-1 h-4 w-4" /> 24%
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Progress value={85} className="h-2 w-24 mr-2" />
                        <span>85%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Teknoloji</TableCell>
                    <TableCell>1,896</TableCell>
                    <TableCell>63</TableCell>
                    <TableCell className="text-green-600 flex items-center">
                      <TrendingUp className="mr-1 h-4 w-4" /> 18%
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Progress value={78} className="h-2 w-24 mr-2" />
                        <span>78%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Politika</TableCell>
                    <TableCell>1,742</TableCell>
                    <TableCell>58</TableCell>
                    <TableCell className="text-amber-600 flex items-center">
                      <BarChart3 className="mr-1 h-4 w-4" /> 5%
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Progress value={72} className="h-2 w-24 mr-2" />
                        <span>72%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Spor</TableCell>
                    <TableCell>1,526</TableCell>
                    <TableCell>51</TableCell>
                    <TableCell className="text-red-600 flex items-center">
                      <TrendingUp className="mr-1 h-4 w-4 rotate-180" /> 8%
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Progress value={68} className="h-2 w-24 mr-2" />
                        <span>68%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sağlık</TableCell>
                    <TableCell>1,124</TableCell>
                    <TableCell>37</TableCell>
                    <TableCell className="text-green-600 flex items-center">
                      <TrendingUp className="mr-1 h-4 w-4" /> 12%
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Progress value={65} className="h-2 w-24 mr-2" />
                        <span>65%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sentiment" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard 
              title="Olumlu İçerik"
              value="42%"
              trend={{ value: 8, isPositive: true }}
              variant="success"
              icon={<ThumbsUp size={20} />}
            />
            <StatCard 
              title="Nötr İçerik"
              value="48%"
              trend={{ value: 3, isPositive: false }}
              variant="secondary"
              icon={<BarChart3 size={20} />}
            />
            <StatCard 
              title="Olumsuz İçerik"
              value="10%"
              trend={{ value: 5, isPositive: false }}
              variant="destructive"
              icon={<ThumbsUp size={20} className="rotate-180" />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Duygu Analizi Dağılımı</CardTitle>
                <CardDescription>
                  İçeriklerin duygu analizi sonucuna göre dağılımı
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartComponent
                  data={sentimentData}
                  type="pie"
                  xAxisDataKey="name"
                  series={[
                    { 
                      name: "Duygu Dağılımı", 
                      dataKey: "value",
                      // No specific color as it will use the default colors
                    }
                  ]}
                  height={350}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Duygu Trendi</CardTitle>
                <CardDescription>
                  Son 7 gündeki duygu analizi değişimi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartComponent
                  data={[
                    { name: 'Pazartesi', positive: 38, neutral: 52, negative: 10 },
                    { name: 'Salı', positive: 42, neutral: 48, negative: 10 },
                    { name: 'Çarşamba', positive: 40, neutral: 47, negative: 13 },
                    { name: 'Perşembe', positive: 45, neutral: 46, negative: 9 },
                    { name: 'Cuma', positive: 43, neutral: 49, negative: 8 },
                    { name: 'Cumartesi', positive: 40, neutral: 50, negative: 10 },
                    { name: 'Pazar', positive: 44, neutral: 47, negative: 9 },
                  ]}
                  type="area"
                  stacked={true}
                  xAxisDataKey="name"
                  series={[
                    { name: "Olumlu", dataKey: "positive", color: "#34D399" },
                    { name: "Nötr", dataKey: "neutral", color: "#94A3B8" },
                    { name: "Olumsuz", dataKey: "negative", color: "#F87171" }
                  ]}
                  height={350}
                />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Kaynaklara Göre Duygu Analizi</CardTitle>
              <CardDescription>
                Her bir kaynağın duygu analizi dağılımı
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kaynak</TableHead>
                    <TableHead>Olumlu</TableHead>
                    <TableHead>Nötr</TableHead>
                    <TableHead>Olumsuz</TableHead>
                    <TableHead>Durum</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sourcesData.map((source, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{source.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                            {(40 + index * 2)}%
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                            {(50 - index)}%
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <div className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">
                            {(10 - index + (index > 4 ? 4 : 0))}%
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={index < 2 ? "success" : (index < 4 ? "default" : "secondary")}
                          className="rounded-full px-3"
                        >
                          {index < 2 ? "Çok İyi" : (index < 4 ? "Normal" : "İyileştirilebilir")}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
