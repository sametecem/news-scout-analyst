
import { ExternalLink, Star, AlertCircle, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NewsSourceProps {
  sourceName: string;
  sourceUrl: string;
  logoUrl?: string;
  articleCount: number;
  isActive?: boolean;
  isFavorite?: boolean;
  trustScore?: number;
  trendingScore?: number;
  onClick?: () => void;
  className?: string;
}

const NewsSource = ({
  sourceName,
  sourceUrl,
  logoUrl,
  articleCount,
  isActive = false,
  isFavorite = false,
  trustScore,
  trendingScore,
  onClick,
  className,
}: NewsSourceProps) => {
  return (
    <div 
      className={cn(
        "flex items-center gap-3 p-3 border rounded-lg transition-all duration-200",
        isActive
          ? "border-brand-blue bg-brand-blue/5"
          : "border-gray-100 hover:border-gray-200 bg-white",
        onClick ? "cursor-pointer" : "",
        className
      )}
      onClick={onClick}
    >
      <div className="flex-shrink-0 relative">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={sourceName}
            className="w-10 h-10 rounded-lg object-contain border border-gray-100"
          />
        ) : (
          <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-500">
              {sourceName.substring(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        {isFavorite && (
          <div className="absolute -top-1.5 -right-1.5 bg-amber-400 text-white rounded-full p-0.5">
            <Star size={10} fill="white" />
          </div>
        )}
      </div>
      
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h3 className="font-medium text-sm truncate" title={sourceName}>
            {sourceName}
          </h3>
          <div className="flex items-center gap-1">
            {trustScore !== undefined && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className={cn(
                      "flex items-center",
                      trustScore >= 70 ? "text-green-500" : 
                      trustScore >= 40 ? "text-amber-500" : "text-red-500"
                    )}>
                      <AlertCircle size={12} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Güvenilirlik: %{trustScore}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            
            {trendingScore !== undefined && trendingScore > 60 && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="text-brand-blue">
                      <TrendingUp size={12} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Trend: %{trendingScore}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
            
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink size={12} />
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-0.5">
          <p className="text-xs text-gray-500">
            {articleCount} {articleCount === 1 ? "haber" : "haber"}
          </p>
          
          {trendingScore !== undefined && trendingScore > 80 && (
            <Badge variant="outline" className="text-[10px] py-0 px-1.5 h-4 bg-red-50 text-red-600 border-red-100">
              Yüksek Trend
            </Badge>
          )}
        </div>
      </div>
      
      <div className="flex-shrink-0">
        <div 
          className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            isActive 
              ? "bg-brand-blue text-white" 
              : trendingScore && trendingScore > 70
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700"
          )}
        >
          {articleCount}
        </div>
      </div>
    </div>
  );
};

export default NewsSource;
