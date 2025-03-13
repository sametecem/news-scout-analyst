
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { cn } from '@/lib/utils';

const COLORS = ['#1245AC', '#34D399', '#F59E0B', '#EC4899', '#8B5CF6', '#0FA0CE'];

interface ChartProps {
  data: any[];
  type: 'line' | 'bar' | 'pie' | 'area';
  xAxisDataKey?: string;
  series: Array<{
    name: string;
    dataKey: string;
    color?: string;
  }>;
  title?: string;
  subtitle?: string;
  className?: string;
  height?: number;
  stacked?: boolean;
  showGrid?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 shadow-md rounded-lg backdrop-blur-sm">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={`tooltip-item-${index}`} className="flex items-center gap-2 text-sm">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            ></div>
            <span className="font-medium">
              {entry.name}: {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

const ChartComponent = ({
  data,
  type,
  xAxisDataKey = "name",
  series,
  title,
  subtitle,
  className,
  height = 300,
  stacked = false,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
}: ChartProps) => {
  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis 
              dataKey={xAxisDataKey} 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            {showLegend && <Legend verticalAlign="top" height={36} />}
            {series.map((s, index) => (
              <Line
                key={`line-${index}`}
                type="monotone"
                dataKey={s.dataKey}
                name={s.name}
                stroke={s.color || COLORS[index % COLORS.length]}
                strokeWidth={2}
                dot={{ r: 3 }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        );
        
      case 'bar':
        return (
          <BarChart
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis 
              dataKey={xAxisDataKey} 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            {showLegend && <Legend verticalAlign="top" height={36} />}
            {series.map((s, index) => (
              <Bar
                key={`bar-${index}`}
                dataKey={s.dataKey}
                name={s.name}
                fill={s.color || COLORS[index % COLORS.length]}
                radius={[4, 4, 0, 0]}
                stackId={stacked ? "stack" : undefined}
              />
            ))}
          </BarChart>
        );
        
      case 'pie':
        return (
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey={series[0].dataKey}
              nameKey={xAxisDataKey}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={series[0].color || COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            {showLegend && <Legend verticalAlign="bottom" height={36} />}
          </PieChart>
        );
      
      case 'area':
        return (
          <AreaChart
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />}
            <XAxis 
              dataKey={xAxisDataKey} 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            {showLegend && <Legend verticalAlign="top" height={36} />}
            {series.map((s, index) => (
              <Area
                key={`area-${index}`}
                type="monotone"
                dataKey={s.dataKey}
                name={s.name}
                fill={s.color || COLORS[index % COLORS.length]}
                stroke={s.color || COLORS[index % COLORS.length]}
                fillOpacity={0.3}
                stackId={stacked ? "stack" : undefined}
              />
            ))}
          </AreaChart>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className={cn("bg-white rounded-xl p-4 border border-gray-100 shadow-sm", className)}>
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-lg font-medium">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      <div className="w-full" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartComponent;
