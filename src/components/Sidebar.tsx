
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  BarChart3, 
  Newspaper, 
  Clock, 
  BarChartHorizontal, 
  PieChart,
  MessageSquare, 
  Search, 
  Globe, 
  Youtube, 
  Twitter, 
  Facebook,
  Instagram,
  Menu,
  X
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  expanded: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, icon, label, expanded, onClick }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
          isActive
            ? "bg-brand-blue text-white"
            : "text-gray-600 hover:bg-gray-100"
        )
      }
    >
      <span className="flex-shrink-0">{icon}</span>
      {expanded && (
        <span className="font-medium whitespace-nowrap overflow-hidden animate-fade-in">
          {label}
        </span>
      )}
    </NavLink>
  );
};

const Sidebar = () => {
  const isMobile = useIsMobile();
  const [expanded, setExpanded] = useState(!isMobile);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const closeMobileMenu = () => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  };

  const sidebarContent = (
    <div className={cn(
      "flex flex-col h-full",
      expanded ? "w-60" : "w-16",
      "transition-all duration-300"
    )}>
      <div className="py-6 px-4 flex items-center">
        {expanded ? (
          <div className="flex items-center gap-2 animate-fade-in">
            <div className="h-8 w-8 rounded-md bg-brand-blue flex items-center justify-center">
              <span className="text-white font-bold">D</span>
            </div>
            <span className="font-display font-medium text-lg">Dedetect</span>
          </div>
        ) : (
          <div className="h-8 w-8 mx-auto rounded-md bg-brand-blue flex items-center justify-center">
            <span className="text-white font-bold">D</span>
          </div>
        )}
      </div>

      <div className="mt-2 px-3">
        <nav className="space-y-1.5">
          <NavItem
            to="/"
            icon={<Newspaper size={20} />}
            label="Haberler"
            expanded={expanded}
            onClick={closeMobileMenu}
          />
          <NavItem
            to="/analytics"
            icon={<BarChart3 size={20} />}
            label="Analitik"
            expanded={expanded}
            onClick={closeMobileMenu}
          />
          <NavItem
            to="/keyword-tracking"
            icon={<Search size={20} />}
            label="Anahtar Kelimeler"
            expanded={expanded}
            onClick={closeMobileMenu}
          />
          <NavItem
            to="/daily-report"
            icon={<Clock size={20} />}
            label="Günün Özeti"
            expanded={expanded}
            onClick={closeMobileMenu}
          />
        </nav>
      </div>

      <div className="mt-6 px-3">
        <div className={cn(
          "text-xs font-medium text-gray-500 px-3 mb-2",
          !expanded && "sr-only"
        )}>
          Kaynaklar
        </div>
        <nav className="space-y-1.5">
          <NavItem
            to="/web"
            icon={<Globe size={20} />}
            label="Web Arama"
            expanded={expanded}
            onClick={closeMobileMenu}
          />
          <NavItem
            to="/twitter"
            icon={<Twitter size={20} />}
            label="Twitter"
            expanded={expanded}
            onClick={closeMobileMenu}
          />
          <NavItem
            to="/youtube"
            icon={<Youtube size={20} />}
            label="Youtube"
            expanded={expanded}
            onClick={closeMobileMenu}
          />
          <NavItem
            to="/facebook"
            icon={<Facebook size={20} />}
            label="Facebook"
            expanded={expanded}
            onClick={closeMobileMenu}
          />
          <NavItem
            to="/instagram"
            icon={<Instagram size={20} />}
            label="Instagram"
            expanded={expanded}
            onClick={closeMobileMenu}
          />
        </nav>
      </div>

      <div className="mt-6 px-3">
        <div className={cn(
          "text-xs font-medium text-gray-500 px-3 mb-2",
          !expanded && "sr-only"
        )}>
          Raporlama
        </div>
        <nav className="space-y-1.5">
          <NavItem
            to="/reports-bar"
            icon={<BarChartHorizontal size={20} />}
            label="Genel Bakış"
            expanded={expanded}
            onClick={closeMobileMenu}
          />
          <NavItem
            to="/reports-pie"
            icon={<PieChart size={20} />}
            label="Rakip Analizi"
            expanded={expanded}
            onClick={closeMobileMenu}
          />
          <NavItem
            to="/mentions"
            icon={<MessageSquare size={20} />}
            label="Şikayet Var"
            expanded={expanded}
            onClick={closeMobileMenu}
          />
        </nav>
      </div>

      <div className="mt-auto p-3">
        {!isMobile && (
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center p-2 text-gray-500 hover:text-gray-900 bg-gray-100 rounded-lg"
          >
            <Menu size={20} className={cn("transition-all", expanded && "rotate-180")} />
          </button>
        )}
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md"
        >
          <Menu size={20} />
        </button>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 animate-fade-in">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl animate-slide-in">
              <div className="absolute right-4 top-4">
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full bg-gray-100 text-gray-500"
                >
                  <X size={20} />
                </button>
              </div>
              {sidebarContent}
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className={cn(
      "h-screen sticky top-0 left-0 border-r border-gray-200 bg-white",
      expanded ? "w-60" : "w-16",
      "transition-all duration-300 overflow-hidden"
    )}>
      {sidebarContent}
    </div>
  );
};

export default Sidebar;
