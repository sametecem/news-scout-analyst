
import { useState } from "react";
import { Search, X, Filter, ArrowDown } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface SearchBarProps {
  onSearch: (query: string, filters: any) => void;
  placeholder?: string;
}

const SearchBar = ({ onSearch, placeholder = "Haber ara..." }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    sources: [],
    dateRange: "last30",
    sortOrder: "newest",
    contentTypes: ["news", "article"]
  });

  const handleSearch = () => {
    onSearch(searchQuery, filters);
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const newsSourceOptions = [
    { id: "kocaeli", label: "Kocaeli Gazeteleri" },
    { id: "national", label: "Ulusal Gazeteler" },
    { id: "web", label: "Web Siteleri" },
    { id: "social", label: "Sosyal Medya" }
  ];

  const handleSourceChange = (sourceId: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      sources: checked 
        ? [...prev.sources, sourceId]
        : prev.sources.filter(id => id !== sourceId)
    }));
  };

  return (
    <div className="relative w-full">
      <div className="relative flex items-center w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        
        <Input
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-10 pr-16 py-6 rounded-xl border-gray-200 focus:border-brand-blue focus:ring-brand-blue/10 bg-white shadow-sm"
          placeholder={placeholder}
        />
        
        <div className="absolute inset-y-0 right-0 flex items-center gap-1 pr-3">
          {searchQuery && (
            <button
              onClick={handleClear}
              className="p-1 rounded-full hover:bg-gray-100"
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-gray-400" />
            </button>
          )}
          
          <Popover>
            <PopoverTrigger asChild>
              <button
                className="p-1 rounded-full hover:bg-gray-100"
                aria-label="Filters"
              >
                <Filter className="h-4 w-4 text-gray-400" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4 animate-scale-in" align="end">
              <div className="space-y-4">
                <h3 className="font-medium mb-2">Filtreler</h3>
                
                <div className="space-y-3">
                  <Label>Kaynaklar</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {newsSourceOptions.map((source) => (
                      <div className="flex items-center space-x-2" key={source.id}>
                        <Checkbox 
                          id={`source-${source.id}`} 
                          checked={filters.sources.includes(source.id)}
                          onCheckedChange={(checked) => 
                            handleSourceChange(source.id, checked as boolean)
                          }
                        />
                        <Label 
                          htmlFor={`source-${source.id}`}
                          className="text-sm font-normal"
                        >
                          {source.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label>Tarih Aralığı</Label>
                  <Select
                    value={filters.dateRange}
                    onValueChange={(value) => 
                      setFilters(prev => ({ ...prev, dateRange: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Tarih seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Bugün</SelectItem>
                      <SelectItem value="yesterday">Dün</SelectItem>
                      <SelectItem value="last7">Son 7 gün</SelectItem>
                      <SelectItem value="last30">Son 30 gün</SelectItem>
                      <SelectItem value="custom">Özel Aralık</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-3">
                  <Label>Sıralama</Label>
                  <Select
                    value={filters.sortOrder}
                    onValueChange={(value) => 
                      setFilters(prev => ({ ...prev, sortOrder: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Sıralama seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">
                        <div className="flex items-center">
                          <span>En Yeni</span>
                          <ArrowDown className="ml-2 h-3 w-3" />
                        </div>
                      </SelectItem>
                      <SelectItem value="oldest">
                        <div className="flex items-center">
                          <span>En Eski</span>
                          <ArrowDown className="ml-2 h-3 w-3 rotate-180" />
                        </div>
                      </SelectItem>
                      <SelectItem value="relevant">Öne Çıkan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex justify-end gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setFilters({
                      sources: [],
                      dateRange: "last30",
                      sortOrder: "newest",
                      contentTypes: ["news", "article"]
                    })}
                  >
                    Sıfırla
                  </Button>
                  <Button onClick={handleSearch}>
                    Uygula
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
