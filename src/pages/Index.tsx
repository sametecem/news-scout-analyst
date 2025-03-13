
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Newspaper, 
  Filter, 
  ArrowDown, 
  ArrowUp, 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw,
  Calendar,
  Languages,
  Bookmark
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import SearchBar from "@/components/SearchBar";
import NewsCard from "@/components/NewsCard";
import NewsFilter from "@/components/NewsFilter";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

// Mock data for news items
const mockNews = [
  {
    id: "1",
    title: "Siz Kimin Vekilisisiniz? Halkın Haber Alma Hakkını Kim Savunacak?",
    source: "kocaelimanset.com",
    date: "13 Mart 2025",
    time: "17:27",
    image: "https://via.placeholder.com/600x400",
    sourceLogo: "https://via.placeholder.com/40",
    keywords: ["Siber Güvenlik", "Kocaeli", "TBMM"],
    summary: "TBMM'de kabul edilen Siber Güvenlik Kanunu, veri şizntısı haberlerine 5 yıla kadar hapis cezası öngören maddesiyle tartışma yarattı."
  },
  {
    id: "2",
    title: "Oyları Aldınız, Haklarımızı Verdiniz! Kocaeli Vekilleri Halkı Yüzüstü Bıraktı",
    source: "kocaelisehirgazetesi.com",
    date: "13 Mart 2025",
    time: "17:27",
    image: "https://via.placeholder.com/600x400",
    sourceLogo: "https://via.placeholder.com/40",
    keywords: ["Siber Güvenlik", "Kocaeli", "TBMM"],
    summary: "Gazeteciler ve ifade özgürlüğünü teklit ettiği iddia edilen Siber Güvenlik Kanunu, Kocaeli milletvekillerinden 5'i \"ret\" oyu verirken..."
  },
  {
    id: "3",
    title: "Siz Kimin Vekilisisiniz? Halkın Haber Hakkını Kim Savunacak?",
    source: "kocaelihalkgazetesi.com",
    date: "13 Mart 2025",
    time: "17:27",
    image: "https://via.placeholder.com/600x400",
    sourceLogo: "https://via.placeholder.com/40",
    keywords: ["Siber Güvenlik", "Kocaeli", "TBMM"],
    summary: "TBMM'de kabul edilen Siber Güvenlik Kanunu, veri şizntısı haberlerine 5 yıla kadar hapis cezası öngören maddesiyle tartışma yarattı."
  },
  {
    id: "4",
    title: "MHP Kocaeli İl Başkanı Tuncay Batı İle Dobra Dobra",
    source: "kocaelisehirgazetesi.com",
    date: "13 Mart 2025",
    time: "14:47",
    image: "https://via.placeholder.com/600x400",
    sourceLogo: "https://via.placeholder.com/40",
    keywords: ["MHP", "Kocaeli", "Tuncay Batı"],
    summary: "MHP Kocaeli İl Başkanı Tuncay Batı ile özel röportaj gerçekleştirdik. Parti çalışmaları ve gündeme dair açıklamalarda bulundu."
  },
  {
    id: "5",
    title: "Kocaeli'de Spor Aktiviteleri Hız Kazanıyor",
    source: "marmaragazetesi.com",
    date: "13 Mart 2025",
    time: "13:47",
    image: "https://via.placeholder.com/600x400",
    sourceLogo: "https://via.placeholder.com/40",
    keywords: ["Spor", "Kocaeli", "Aktivite"],
    summary: "Kocaeli'de düzenlenen spor aktiviteleri ile gençler ve sporseverler bir araya geldi. Etkinlikler yoğun katılımla gerçekleşti."
  },
  {
    id: "6",
    title: "Kocaeli'de Trafik Sorunu İçin Yeni Çözümler",
    source: "kocaelimeydan.com",
    date: "13 Mart 2025",
    time: "11:17",
    image: "https://via.placeholder.com/600x400",
    sourceLogo: "https://via.placeholder.com/40",
    keywords: ["Trafik", "Kocaeli", "Belediye"],
    summary: "Kocaeli Büyükşehir Belediyesi trafik sorununa yönelik yeni düzenlemeler planladığını açıkladı. Projeler ile ilgili detaylar paylaşıldı."
  }
];

// Mock filter groups
const filterGroups = [
  {
    id: "source",
    label: "Haber Kaynakları",
    options: [
      { id: "kocaelimanset", label: "Kocaeli Manşet", count: 12 },
      { id: "kocaelihalk", label: "Kocaeli Halk", count: 8 },
      { id: "kocaelisehir", label: "Kocaeli Şehir", count: 15 },
      { id: "marmara", label: "Marmara Gazetesi", count: 7 },
      { id: "kocaelimeydan", label: "Kocaeli Meydan", count: 5 }
    ]
  },
  {
    id: "date",
    label: "Tarih",
    options: [
      { id: "today", label: "Bugün", count: 14 },
      { id: "yesterday", label: "Dün", count: 23 },
      { id: "lastWeek", label: "Son 7 Gün", count: 47 },
      { id: "lastMonth", label: "Son 30 Gün", count: 103 }
    ]
  },
  {
    id: "topics",
    label: "Konular",
    options: [
      { id: "politics", label: "Siyaset", count: 34 },
      { id: "economy", label: "Ekonomi", count: 18 },
      { id: "sports", label: "Spor", count: 22 },
      { id: "technology", label: "Teknoloji", count: 15 },
      { id: "culture", label: "Kültür Sanat", count: 9 },
      { id: "health", label: "Sağlık", count: 12 },
      { id: "education", label: "Eğitim", count: 8 }
    ]
  }
];

const Index = () => {
  const [selectedSort, setSelectedSort] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedView, setSelectedView] = useState("grid");
  const [activeNewsFilters, setActiveNewsFilters] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Simulate loading state when filters or search changes
  useEffect(() => {
    if (Object.keys(activeNewsFilters).length > 0 || searchQuery !== "") {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [activeNewsFilters, searchQuery]);

  const handleSearch = (query: string, filters: any) => {
    setSearchQuery(query);
    console.log("Search query:", query, "Filters:", filters);
  };

  const handleFilterChange = (filters: Record<string, string[]>) => {
    setActiveNewsFilters(filters);
    console.log("Filters changed:", filters);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto py-6 px-4 max-w-7xl">
            <div className="mb-6">
              <SearchBar 
                onSearch={handleSearch} 
                placeholder="Haber, kelime veya kaynak ara..."
              />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <NewsFilter 
                  groups={filterGroups} 
                  onFilterChange={handleFilterChange}
                />
                
                <div className="mt-6 space-y-4">
                  <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
                      <Calendar size={16} className="text-gray-500" />
                      Tarih Seçin
                    </h3>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        Son 30 Gün
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        Son 7 Gün
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        Bugün
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        Özel Tarih Aralığı
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
                      <Languages size={16} className="text-gray-500" />
                      Dil Seçin
                    </h3>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        Türkçe
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        İngilizce
                      </Button>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                    <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
                      <Bookmark size={16} className="text-gray-500" />
                      Kaydedilenler
                    </h3>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      Kayıtlı Haberleri Göster
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <Newspaper className="text-brand-blue h-5 w-5" />
                        <h2 className="font-medium">Haberler</h2>
                      </div>
                      <Badge variant="secondary" className="text-xs font-semibold">
                        61 sonuç
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Select
                          value={selectedSort}
                          onValueChange={setSelectedSort}
                        >
                          <SelectTrigger className="h-9 w-[180px]">
                            <SelectValue placeholder="Sıralama" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="newest">
                              <div className="flex items-center gap-2">
                                <ArrowDown className="h-3.5 w-3.5" />
                                <span>En Yeni</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="oldest">
                              <div className="flex items-center gap-2">
                                <ArrowUp className="h-3.5 w-3.5" />
                                <span>En Eski</span>
                              </div>
                            </SelectItem>
                            <SelectItem value="relevant">Öne Çıkan</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center">
                        <Tabs value={selectedView} onValueChange={setSelectedView}>
                          <TabsList className="h-9">
                            <TabsTrigger value="grid" className="px-3">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect width="7" height="7" x="3" y="3" rx="1" />
                                <rect width="7" height="7" x="14" y="3" rx="1" />
                                <rect width="7" height="7" x="3" y="14" rx="1" />
                                <rect width="7" height="7" x="14" y="14" rx="1" />
                              </svg>
                            </TabsTrigger>
                            <TabsTrigger value="list" className="px-3">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="8" y1="6" x2="21" y2="6" />
                                <line x1="8" y1="12" x2="21" y2="12" />
                                <line x1="8" y1="18" x2="21" y2="18" />
                                <line x1="3" y1="6" x2="3.01" y2="6" />
                                <line x1="3" y1="12" x2="3.01" y2="12" />
                                <line x1="3" y1="18" x2="3.01" y2="18" />
                              </svg>
                            </TabsTrigger>
                          </TabsList>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                </div>
                
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div key={item} className="rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm">
                        <div className="aspect-video w-full bg-gray-200 animate-pulse" />
                        <div className="p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="w-24 h-3 bg-gray-200 rounded animate-pulse" />
                            <div className="w-12 h-3 bg-gray-200 rounded animate-pulse" />
                          </div>
                          <div className="w-full h-5 bg-gray-200 rounded animate-pulse" />
                          <div className="w-2/3 h-5 bg-gray-200 rounded animate-pulse" />
                          <div className="w-full h-3 bg-gray-200 rounded animate-pulse" />
                          <div className="w-3/4 h-3 bg-gray-200 rounded animate-pulse" />
                          <div className="pt-2 flex items-center justify-between">
                            <div className="w-20 h-3 bg-gray-200 rounded animate-pulse" />
                            <div className="w-16 h-3 bg-gray-200 rounded animate-pulse" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <>
                    <div className={selectedView === "grid" 
                      ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6" 
                      : "space-y-4"
                    }>
                      {mockNews.map((news) => (
                        <NewsCard
                          key={news.id}
                          id={news.id}
                          title={news.title}
                          source={news.source}
                          date={news.date}
                          time={news.time}
                          image={news.image}
                          sourceLogo={news.sourceLogo}
                          keywords={news.keywords}
                          summary={news.summary}
                        />
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between mt-8">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                      >
                        <ChevronLeft className="mr-1 h-4 w-4" />
                        Önceki
                      </Button>
                      
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-gray-600">
                          Sayfa {currentPage} / 7
                        </span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="p-0 w-8 h-8"
                          onClick={() => setIsLoading(true)}
                        >
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setCurrentPage(currentPage + 1)}
                      >
                        Sonraki
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
