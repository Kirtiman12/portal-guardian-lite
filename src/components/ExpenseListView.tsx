import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ExpenseListViewProps {
  type: 'yearly' | 'project';
}

const ExpenseListView = ({ type }: ExpenseListViewProps) => {
  // Dummy data - replace with real data
  const yearlyData = [
    { year: '2024', total: 125000, approved: 95000, rejected: 30000 },
    { year: '2023', total: 98000, approved: 78000, rejected: 20000 },
    { year: '2022', total: 87000, approved: 70000, rejected: 17000 },
  ];

  const projectData = [
    { project: 'Website Redesign', total: 45000, approved: 40000, rejected: 5000 },
    { project: 'Mobile App Development', total: 38000, approved: 30000, rejected: 8000 },
    { project: 'Marketing Campaign', total: 22000, approved: 18000, rejected: 4000 },
    { project: 'Infrastructure Upgrade', total: 20000, approved: 15000, rejected: 5000 },
  ];

  const data = type === 'yearly' ? yearlyData : projectData;
  const headerLabel = type === 'yearly' ? 'Year' : 'Project';

  const handleViewDetails = (item: string) => {
    // Navigation logic here
    console.log(`Navigating to ${type} details for:`, item);
  };

  return (
    <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/95">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          {type === 'yearly' ? 'Yearly Expenses' : 'Project-wise Expenses'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-border/50 hover:bg-secondary/50">
              <TableHead className="text-muted-foreground font-semibold">{headerLabel}</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-right">Total</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-right">Total Approved</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-right">Total Rejected</TableHead>
              <TableHead className="text-muted-foreground font-semibold text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item: any) => {
              const identifier = type === 'yearly' ? item.year : item.project;
              return (
                <TableRow key={identifier} className="border-border/50 hover:bg-secondary/50">
                  <TableCell className="font-medium">{identifier}</TableCell>
                  <TableCell className="text-right font-semibold">${item.total.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-green-500 font-semibold">
                    ${item.approved.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right text-red-500 font-semibold">
                    ${item.rejected.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      onClick={() => handleViewDetails(identifier)}
                      variant="outline"
                      size="sm"
                      className="hover:bg-primary/10"
                    >
                      View Users
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ExpenseListView;
