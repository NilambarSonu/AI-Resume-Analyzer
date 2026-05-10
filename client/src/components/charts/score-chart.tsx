import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";

interface ScoreChartProps {
  score: number;
}

export function ScoreChart({ score }: ScoreChartProps) {
  const data = [{ name: "Score", value: score, fill: "#C9A84C" }];
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          innerRadius="70%" 
          outerRadius="100%" 
          barSize={12} 
          data={data} 
          startAngle={180} 
          endAngle={-180}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            background={{ fill: 'rgba(201, 168, 76, 0.1)' }}
            dataKey="value"
            cornerRadius={10}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      
      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-6xl font-headline font-bold text-foreground">
          {score}
        </span>
        <span className="text-[11px] font-sans font-medium text-primary uppercase tracking-[1px] mt-1">
          Match Score
        </span>
      </div>
    </div>
  );
}
