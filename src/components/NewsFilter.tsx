
import { useState } from "react";
import { ChevronDown, ChevronUp, Filter, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FilterOption {
  id: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface NewsFilterProps {
  groups: FilterGroup[];
  onFilterChange: (filters: Record<string, string[]>) => void;
  className?: string;
}

const NewsFilter = ({ groups, onFilterChange, className }: NewsFilterProps) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const [activeTab, setActiveTab] = useState<string>("all");

  const handleFilterToggle = (groupId: string, optionId: string) => {
    setSelectedFilters(prevFilters => {
      const currentGroupFilters = prevFilters[groupId] || [];
      const updatedFilters = currentGroupFilters.includes(optionId)
        ? currentGroupFilters.filter(id => id !== optionId)
        : [...currentGroupFilters, optionId];
      
      const newFilters = {
        ...prevFilters,
        [groupId]: updatedFilters
      };
      
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  const toggleGroupExpand = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  const isFilterSelected = (groupId: string, optionId: string) => {
    return (selectedFilters[groupId] || []).includes(optionId);
  };

  const getActiveFilterCount = () => {
    return Object.values(selectedFilters).reduce(
      (total, group) => total + group.length,
      0
    );
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    onFilterChange({});
  };

  const filterTabs = [
    { id: "all", label: "Tümü" },
    { id: "news", label: "Haberler" },
    { id: "video", label: "Videolar" },
    { id: "social", label: "Sosyal Medya" }
  ];

  return (
    <div className={cn("bg-white rounded-xl shadow-sm border border-gray-100", className)}>
      <div className="p-3 border-b border-gray-100">
        <Tabs 
          defaultValue="all" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="w-full grid grid-cols-4">
            {filterTabs.map(tab => (
              <TabsTrigger key={tab.id} value={tab.id} className="text-sm font-medium">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      
      <div className="px-3 py-2.5 border-b border-gray-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-500" />
          <span className="font-medium text-sm">Filtreler</span>
          {getActiveFilterCount() > 0 && (
            <Badge variant="secondary" className="ml-1 text-xs font-semibold">
              {getActiveFilterCount()}
            </Badge>
          )}
        </div>
        
        {getActiveFilterCount() > 0 && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-7 px-2 text-gray-600 hover:text-gray-900"
            onClick={clearAllFilters}
          >
            Tümünü Temizle
          </Button>
        )}
      </div>
      
      <div className="p-3 space-y-3 max-h-[350px] overflow-y-auto hide-scrollbar">
        {groups.map((group) => (
          <div key={group.id} className="space-y-2">
            <div 
              className="flex items-center justify-between cursor-pointer"
              onClick={() => toggleGroupExpand(group.id)}
            >
              <span className="font-medium text-sm">{group.label}</span>
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                {expandedGroups[group.id] ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </Button>
            </div>
            
            {expandedGroups[group.id] && (
              <div className="space-y-1.5 pl-1 pt-1">
                {group.options.map((option) => (
                  <div 
                    key={option.id}
                    className={cn(
                      "flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors",
                      isFilterSelected(group.id, option.id)
                        ? "bg-brand-blue/10 text-brand-blue"
                        : "hover:bg-gray-50"
                    )}
                    onClick={() => handleFilterToggle(group.id, option.id)}
                  >
                    <div className={cn(
                      "w-4 h-4 flex items-center justify-center rounded border",
                      isFilterSelected(group.id, option.id)
                        ? "bg-brand-blue border-brand-blue text-white"
                        : "border-gray-300"
                    )}>
                      {isFilterSelected(group.id, option.id) && (
                        <Check size={12} />
                      )}
                    </div>
                    <span className="text-sm">{option.label}</span>
                    {option.count !== undefined && (
                      <span className="ml-auto text-xs text-gray-500">
                        {option.count}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            <Separator />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFilter;
