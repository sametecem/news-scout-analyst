
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { 
  Bell, 
  ChevronDown, 
  Search, 
  User, 
  Settings, 
  LogOut, 
  Sun, 
  Moon 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const getPageTitle = (pathname: string) => {
  switch (pathname) {
    case "/":
      return "Haberler";
    case "/analytics":
      return "Analitik";
    case "/keyword-tracking":
      return "Anahtar Kelimeler";
    case "/daily-report":
      return "Günün Özeti";
    case "/news-detail":
      return "Haber Detayı";
    default:
      const pathSegments = pathname.split("/").filter(Boolean);
      if (pathSegments.length > 0) {
        return pathSegments[0].charAt(0).toUpperCase() + pathSegments[0].slice(1);
      }
      return "Dashboard";
  }
};

const Header = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("content");
  
  return (
    <header className="sticky top-0 z-10 w-full bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-medium">
            {getPageTitle(location.pathname)}
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-blue text-[10px] font-medium text-white">
              4
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">Admin</span>
                <ChevronDown size={14} className="text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="flex items-center gap-2 p-2">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Admin</span>
                  <span className="text-xs text-gray-500">admin@dedetect.com</span>
                </div>
              </div>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Ayarlar</span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem>
                <span className="flex items-center w-full justify-between">
                  <span className="flex items-center">
                    <Sun className="mr-2 h-4 w-4" />
                    <span>Tema</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Sun size={14} className="text-amber-500" />
                    <Moon size={14} className="text-gray-400" />
                  </span>
                </span>
              </DropdownMenuItem>
              
              <DropdownMenuSeparator />
              
              <DropdownMenuItem className="text-red-500 focus:bg-red-50 focus:text-red-500">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Çıkış Yap</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {(location.pathname === "/" || location.pathname === "/analytics") && (
        <div className="border-b border-gray-200 px-6">
          <Tabs 
            defaultValue="content" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="w-auto">
              <TabsTrigger value="content" className="text-sm font-medium">
                İçerik
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-sm font-medium">
                Analitik
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      )}
    </header>
  );
};

export default Header;
