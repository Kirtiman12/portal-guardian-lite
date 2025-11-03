import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, CheckCircle, XCircle } from 'lucide-react';

const ExpenseStatsCards = () => {
  // Dummy data - replace with real data
  const totalExpense = 125000;
  const totalApproved = 95000;
  const totalRejected = 30000;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/95">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expense</CardTitle>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${totalExpense.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">Total expenses recorded</p>
        </CardContent>
      </Card>

      <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/95">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Approved</CardTitle>
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-500">${totalApproved.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">Approved expenses</p>
        </CardContent>
      </Card>

      <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/95">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Rejections</CardTitle>
          <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex items-center justify-center">
            <XCircle className="w-4 h-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-500">${totalRejected.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground mt-1">Rejected expenses</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseStatsCards;
