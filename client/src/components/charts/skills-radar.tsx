import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

interface SkillsRadarProps {
  data: Array<{ subject: string; A: number; B: number; fullMark: number }>;
}

export function SkillsRadar({ data }: SkillsRadarProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid stroke="rgba(255,255,255,0.1)" />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'var(--font-mono)' }} 
        />
        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
        <Radar
          name="My Skills"
          dataKey="A"
          stroke="#00f0ff"
          strokeWidth={2}
          fill="#00f0ff"
          fillOpacity={0.3}
        />
        <Radar
          name="Required"
          dataKey="B"
          stroke="#bf00ff"
          strokeWidth={2}
          fill="#bf00ff"
          fillOpacity={0.1}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
