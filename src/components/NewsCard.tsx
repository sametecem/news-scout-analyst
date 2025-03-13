
import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, ExternalLink, Eye, Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface NewsCardProps {
  id: string;
  title: string;
  source: string;
  date: string;
  time: string;
  image?: string;
  sourceLogo?: string;
  keywords?: string[];
  summary?: string;
  url?: string;
}

const NewsCard = ({
  id,
  title,
  source,
  date,
  time,
  image,
  sourceLogo,
  keywords,
  summary,
  url,
}: NewsCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group relative rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
        {image && (
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
              imageLoaded ? "image-loaded" : "image-loading"
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        )}
        {sourceLogo && (
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm p-1 rounded-md">
            <img 
              src={sourceLogo} 
              alt={source} 
              className="h-7 w-7 rounded-sm object-contain" 
            />
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2 text-xs text-gray-500">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{time}</span>
            </div>
          </div>
          <div className="font-medium">{source}</div>
        </div>
        
        <Link to={`/news/${id}`}>
          <h3 className="text-lg font-medium mb-2 line-clamp-2 group-hover:text-brand-blue transition-colors duration-200">
            {title}
          </h3>
        </Link>
        
        {summary && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{summary}</p>
        )}
        
        {keywords && keywords.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {keywords.map((keyword, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
              >
                {keyword}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <Link 
            to={`/news/${id}`}
            className="text-sm font-medium text-brand-blue hover:text-brand-lightBlue flex items-center gap-1"
          >
            Detayları Gör
            <Eye size={14} />
          </Link>
          
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Bookmark size={16} className="text-gray-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Kaydet</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
                    <Share2 size={16} className="text-gray-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Paylaş</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {url && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full"
                      onClick={() => window.open(url, '_blank')}
                    >
                      <ExternalLink size={16} className="text-gray-500" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Kaynağa Git</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
