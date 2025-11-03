import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, FolderKanban } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const ViewListsCard = () => {
  const [activeView, setActiveView] = useState<'yearly' | 'project' | null>(null);

  // Dummy data - replace with real data
  const yearlyData = [
    { year: '2024', amount: 125000 },
    { year: '2023', amount: 98000 },
    { year: '2022', amount: 87000 },
  ];

  const projectData = [
    { project: 'Website Redesign', amount: 45000 },
    { project: 'Mobile App Development', amount: 38000 },
    { project: 'Marketing Campaign', amount: 22000 },
    { project: 'Infrastructure Upgrade', amount: 20000 },
  ];

  return (
    <Card className="border-border/50 shadow-lg backdrop-blur-sm bg-card/95">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">View Lists</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-3">
          <Button
            onClick={() => setActiveView(activeView === 'yearly' ? null : 'yearly')}
            variant={activeView === 'yearly' ? 'default' : 'outline'}
            className="flex-1"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Check Yearly
          </Button>
          <Button
            onClick={() => setActiveView(activeView === 'project' ? null : 'project')}
            variant={activeView === 'project' ? 'default' : 'outline'}
            className="flex-1"
          >
            <FolderKanban className="w-4 h-4 mr-2" />
            Check Project Wise
          </Button>
        </div>

        {activeView === 'yearly' && (
          <div className="border border-border/50 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-secondary/50">
                  <TableHead className="text-muted-foreground font-semibold">Year</TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-right">Amount Spent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {yearlyData.map((item) => (
                  <TableRow key={item.year} className="border-border/50 hover:bg-secondary/50">
                    <TableCell className="font-medium">{item.year}</TableCell>
                    <TableCell className="text-right font-semibold">${item.amount.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {activeView === 'project' && (
          <div className="border border-border/50 rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-secondary/50">
                  <TableHead className="text-muted-foreground font-semibold">Project</TableHead>
                  <TableHead className="text-muted-foreground font-semibold text-right">Amount Spent</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projectData.map((item) => (
                  <TableRow key={item.project} className="border-border/50 hover:bg-secondary/50">
                    <TableCell className="font-medium">{item.project}</TableCell>
                    <TableCell className="text-right font-semibold">${item.amount.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ViewListsCard;
