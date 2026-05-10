import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

interface SkillsRadarProps {
  data: Array<{ subject: string; A: number; B: number; fullMark: number }>;
}

export function SkillsRadar({ data }: SkillsRadarProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
        <PolarGrid stroke="rgba(242, 240, 235, 0.1)" />
        <PolarAngleAxis 
          dataKey="subject" 
          tick={{ fill: 'rgba(242, 240, 235, 0.6)', fontSize: 10, fontFamily: 'var(--font-sans)', fontWeight: 300 }} 
        />
        <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
        <Radar
          name="My Skills"
          dataKey="A"
          stroke="#C9A84C"
          strokeWidth={2}
          fill="#C9A84C"
          fillOpacity={0.3}
        />
        <Radar
          name="Required"
          dataKey="B"
          stroke="rgba(242, 240, 235, 0.4)"
          strokeWidth={1}
          fill="rgba(242, 240, 235, 0.1)"
          fillOpacity={0.1}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
