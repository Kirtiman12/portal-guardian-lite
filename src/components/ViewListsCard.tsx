import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, FolderKanban, ArrowRight } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ViewListsCardProps {
  activeView: 'yearly' | 'project' | null;
  setActiveView: (view: 'yearly' | 'project' | null) => void;
}

const ViewListsCard = ({ activeView, setActiveView }: ViewListsCardProps) => {
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
      </CardContent>
    </Card>
  );
};

export default ViewListsCard;
