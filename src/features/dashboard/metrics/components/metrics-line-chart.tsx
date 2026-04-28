import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LineConfig {
  dataKey: string;
  label: string;
  color: string;
}

interface IProps {
  title: string;
  data: Record<string, string | number>[];
  lines: LineConfig[];
  xKey?: string;
}

export const MetricsLineChart = ({
  title,
  data,
  lines,
  xKey = "date",
}: IProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ left: 0, right: 8, top: 4, bottom: 0 }}>
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
            {lines.length > 1 && <Legend />}
            {lines.map((l) => (
              <Line
                key={l.dataKey}
                dataKey={l.dataKey}
                name={l.label}
                type="monotone"
                stroke={l.color}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
