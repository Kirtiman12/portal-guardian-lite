import { ResponsiveBar } from '@nivo/bar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp } from 'lucide-react';

const monthlyExpenseData = [
  { month: 'Jan', approved: 45000, rejected: 8000, total: 53000 },
  { month: 'Feb', approved: 52000, rejected: 12000, total: 64000 },
  { month: 'Mar', approved: 48000, rejected: 9000, total: 57000 },
  { month: 'Apr', approved: 61000, rejected: 15000, total: 76000 },
  { month: 'May', approved: 55000, rejected: 11000, total: 66000 },
  { month: 'Jun', approved: 58000, rejected: 10000, total: 68000 },
  { month: 'Jul', approved: 63000, rejected: 14000, total: 77000 },
  { month: 'Aug', approved: 57000, rejected: 13000, total: 70000 },
  { month: 'Sep', approved: 60000, rejected: 9500, total: 69500 },
  { month: 'Oct', approved: 54000, rejected: 11500, total: 65500 },
  { month: 'Nov', approved: 59000, rejected: 12500, total: 71500 },
  { month: 'Dec', approved: 62000, rejected: 10500, total: 72500 },
];

const AnnualExpenseChart = () => {
  return (
    <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/95">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold">Annual Expense Overview</CardTitle>
        <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-glow">
          <TrendingUp className="w-6 h-6 text-primary-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div style={{ height: '400px' }}>
          <ResponsiveBar
            data={monthlyExpenseData}
            keys={['approved', 'rejected', 'total']}
            indexBy="month"
            layout="horizontal"
            margin={{ top: 20, right: 130, bottom: 50, left: 60 }}
            padding={0.3}
            groupMode="grouped"
            valueScale={{ type: 'linear' }}
            indexScale={{ type: 'band', round: true }}
            colors={['hsl(142, 76%, 36%)', 'hsl(0, 84%, 60%)', 'hsl(262, 83%, 58%)']}
            borderRadius={4}
            borderColor={{
              from: 'color',
              modifiers: [['darker', 0.2]],
            }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Amount (₹)',
              legendPosition: 'middle',
              legendOffset: 40,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: 'Month',
              legendPosition: 'middle',
              legendOffset: -50,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{
              from: 'color',
              modifiers: [['darker', 1.6]],
            }}
            legends={[
              {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: 'hover',
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
                data: [
                  { id: 'approved', label: 'Approved', color: 'hsl(142, 76%, 36%)' },
                  { id: 'rejected', label: 'Rejected', color: 'hsl(0, 84%, 60%)' },
                  { id: 'total', label: 'Total', color: 'hsl(262, 83%, 58%)' },
                ],
              },
            ]}
            theme={{
              axis: {
                ticks: {
                  text: {
                    fill: 'hsl(var(--muted-foreground))',
                  },
                },
                legend: {
                  text: {
                    fill: 'hsl(var(--foreground))',
                    fontSize: 12,
                    fontWeight: 600,
                  },
                },
              },
              legends: {
                text: {
                  fill: 'hsl(var(--foreground))',
                },
              },
              tooltip: {
                container: {
                  background: 'hsl(var(--card))',
                  color: 'hsl(var(--foreground))',
                  fontSize: 12,
                  borderRadius: 6,
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                },
              },
            }}
            role="application"
            ariaLabel="Annual expense bar chart"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default AnnualExpenseChart;
