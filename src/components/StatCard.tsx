
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const statCardVariants = cva(
  "rounded-xl p-4 transition-all duration-300 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-white border border-gray-100 shadow-sm hover:shadow-md",
        primary: "bg-brand-blue text-white",
        secondary: "bg-gray-50 border border-gray-200",
        success: "bg-green-50 border border-green-100",
        warning: "bg-amber-50 border border-amber-100",
        destructive: "bg-red-50 border border-red-100",
        glass: "glass-effect",
        gradient: "bg-gradient-to-br from-brand-blue to-brand-lightBlue text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "destructive" | "glass" | "gradient";
  className?: string;
}

const StatCard = ({
  title,
  value,
  description,
  icon,
  trend,
  variant = "default",
  className,
}: StatCardProps) => {
  return (
    <div className={cn(statCardVariants({ variant }), className)}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className={cn(
            "text-sm font-medium opacity-80",
            variant === "default" ? "text-gray-500" : ""
          )}>
            {title}
          </h3>
          <div className="mt-2 mb-1">
            <span className="text-2xl font-semibold">{value}</span>
          </div>
          
          {description && (
            <p className={cn(
              "text-xs",
              variant === "default" ? "text-gray-500" : "opacity-70"
            )}>
              {description}
            </p>
          )}
          
          {trend && (
            <div className="mt-2 flex items-center text-xs">
              <span
                className={cn(
                  "inline-flex items-center font-medium",
                  trend.isPositive 
                    ? variant === "default" ? "text-green-600" : "text-green-200" 
                    : variant === "default" ? "text-red-600" : "text-red-200"
                )}
              >
                {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
              </span>
              <span className={cn(
                "ml-1",
                variant === "default" ? "text-gray-500" : "opacity-70"
              )}>
                {trend.isPositive ? "artış" : "azalış"}
              </span>
            </div>
          )}
        </div>
        
        {icon && (
          <div className={cn(
            "p-2 rounded-lg",
            variant === "default" ? "text-brand-blue bg-blue-50" : "bg-white/20"
          )}>
            {icon}
          </div>
        )}
      </div>
      
      {variant === "gradient" && (
        <div className="absolute -right-2 -bottom-2 w-20 h-20 bg-white/10 rounded-full blur-xl opacity-50" />
      )}
    </div>
  );
};

export default StatCard;
