import { RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer } from "recharts";

interface ScoreChartProps {
  score: number;
}

export function ScoreChart({ score }: ScoreChartProps) {
  const data = [{ name: "Score", value: score, fill: score > 75 ? "#00f0ff" : score > 50 ? "#bf00ff" : "#ff0055" }];
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart 
          innerRadius="70%" 
          outerRadius="100%" 
          barSize={20} 
          data={data} 
          startAngle={180} 
          endAngle={-180}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            background={{ fill: 'rgba(255,255,255,0.05)' }}
            dataKey="value"
            cornerRadius={30} // Use cornerRadius instead of corner
          />
        </RadialBarChart>
      </ResponsiveContainer>
      
      {/* Center Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-6xl font-display font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
          {score}
        </span>
        <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest mt-1">
          Match Score
        </span>
      </div>
    </div>
  );
}
