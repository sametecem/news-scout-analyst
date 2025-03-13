
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsSourceProps {
  sourceName: string;
  sourceUrl: string;
  logoUrl?: string;
  articleCount: number;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const NewsSource = ({
  sourceName,
  sourceUrl,
  logoUrl,
  articleCount,
  isActive = false,
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
      <div className="flex-shrink-0">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={sourceName}
            className="w-8 h-8 rounded object-contain"
          />
        ) : (
          <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
            <span className="text-sm font-medium text-gray-500">
              {sourceName.substring(0, 2).toUpperCase()}
            </span>
          </div>
        )}
      </div>
      
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <h3 className="font-medium text-sm truncate" title={sourceName}>
            {sourceName}
          </h3>
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
        <p className="text-xs text-gray-500">
          {articleCount} {articleCount === 1 ? "haber" : "haber"}
        </p>
      </div>
      
      <div className="flex-shrink-0">
        <div 
          className={cn(
            "px-2 py-1 rounded-full text-xs font-medium",
            isActive 
              ? "bg-brand-blue text-white" 
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
