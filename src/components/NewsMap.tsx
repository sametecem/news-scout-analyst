
import { useState, useEffect } from "react";

interface NewsMapProps {
  regionData: {
    regionName: string;
    count: number;
    id: string;
  }[];
  activeRegion?: string;
  onRegionClick?: (regionId: string) => void;
}

const NewsMap = ({ regionData, activeRegion, onRegionClick }: NewsMapProps) => {
  const [mapImage, setMapImage] = useState("");
  const [highlightStyle, setHighlightStyle] = useState<React.CSSProperties>({});
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // This would be replaced with the actual map image path
    setMapImage("/lovable-uploads/0b031919-2244-4404-8675-200a646feba7.png");
  }, []);

  // This would be replaced with actual positioning logic based on the map and regions
  useEffect(() => {
    if (activeRegion) {
      // Example positioning for a highlight - would be calculated based on region
      setHighlightStyle({
        left: "30%",
        top: "40%",
        width: "10%",
        height: "10%",
      });
    } else {
      setHighlightStyle({});
    }
  }, [activeRegion]);

  // Find the most active region to determine the highest count for color scaling
  const maxCount = Math.max(...regionData.map(region => region.count), 1);

  // Color intensity function - returns a more intense blue for higher counts
  const getRegionColor = (count: number) => {
    const intensity = Math.min(count / maxCount, 1);
    return `rgba(18, 69, 172, ${0.2 + intensity * 0.8})`;
  };

  return (
    <div className="relative w-full h-full min-h-[300px] rounded-xl overflow-hidden bg-gray-50">
      {mapImage && (
        <img
          src={mapImage}
          alt="Haber Haritası"
          className={`w-full h-full object-contain transition-opacity duration-500 ${
            mapLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setMapLoaded(true)}
        />
      )}

      {/* Map overlay with region indicators */}
      <div className="absolute inset-0 pointer-events-none">
        {regionData.map((region) => (
          <div
            key={region.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto"
            style={{
              // This would be replaced with actual positioning based on region coordinates
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
            onClick={() => onRegionClick && onRegionClick(region.id)}
          >
            <div
              className={`flex items-center justify-center rounded-full transition-all duration-300 border-2 ${
                activeRegion === region.id
                  ? "border-white scale-110"
                  : "border-transparent hover:scale-110"
              }`}
              style={{
                width: `${Math.max(region.count * 2, 20)}px`,
                height: `${Math.max(region.count * 2, 20)}px`,
                backgroundColor: getRegionColor(region.count),
              }}
            >
              <span className={`text-xs font-bold ${region.count > 10 ? "text-white" : "text-brand-blue"}`}>
                {region.count}
              </span>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white/80 backdrop-blur-sm rounded px-2 py-0.5 text-xs font-medium whitespace-nowrap">
              {region.regionName}
            </div>
          </div>
        ))}
      </div>

      {/* Active region highlight */}
      {activeRegion && Object.keys(highlightStyle).length > 0 && (
        <div
          className="absolute border-2 border-yellow-400 rounded-full animate-pulse pointer-events-none"
          style={highlightStyle}
        />
      )}

      {/* Legend */}
      <div className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-lg p-2 shadow-sm text-xs">
        <div className="font-medium mb-1">Haber Yoğunluğu</div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-full bg-brand-blue/20"></div>
          <span>Az</span>
          <div className="w-3 h-3 rounded-full bg-brand-blue/50 mx-1"></div>
          <div className="w-3 h-3 rounded-full bg-brand-blue/80 mr-1"></div>
          <div className="w-3 h-3 rounded-full bg-brand-blue"></div>
          <span>Çok</span>
        </div>
      </div>
    </div>
  );
};

export default NewsMap;
