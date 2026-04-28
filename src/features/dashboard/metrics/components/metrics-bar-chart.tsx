import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BarConfig {
  dataKey: string;
  label: string;
  color: string;
}

interface IProps {
  title: string;
  data: Record<string, string | number>[];
  bars: BarConfig[];
  xKey?: string;
}

export const MetricsBarChart = ({
  title,
  data,
  bars,
  xKey = "date",
}: IProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ left: 0, right: 8, top: 4, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey={xKey}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11 }}
              tickMargin={6}
            />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11 }} width={48} />
            <Tooltip />
            {bars.length > 1 && <Legend />}
            {bars.map((b) => (
              <Bar key={b.dataKey} dataKey={b.dataKey} name={b.label} fill={b.color} radius={[3, 3, 0, 0]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
