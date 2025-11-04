import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

interface PendingRequest {
  id: number;
  name: string;
  email: string;
  employeeCode: string;
}

interface PendingRequestsBarProps {
  pendingUsers: PendingRequest[];
  onApprove: (userId: number) => void;
  onReject: (userId: number) => void;
}

const PendingRequestsBar = ({ pendingUsers, onApprove, onReject }: PendingRequestsBarProps) => {
  if (pendingUsers.length === 0) {
    return null;
  }

  return (
    <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/95">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-500" />
          <CardTitle className="text-xl font-semibold">Pending Requests</CardTitle>
          <Badge variant="secondary" className="ml-2">
            {pendingUsers.length}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {pendingUsers.map((user) => (
            <div
              key={user.id}
              className="min-w-[300px] p-4 rounded-lg border border-border/50 bg-secondary/20 hover:bg-secondary/30 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                  <Badge variant="secondary" className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                    Pending
                  </Badge>
                </div>
                <p className="text-xs font-mono text-muted-foreground">{user.employeeCode}</p>
                <div className="flex gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => onApprove(user.id)}
                    className="flex-1 bg-green-500/20 text-green-400 hover:bg-green-500/30 border border-green-500/30"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onReject(user.id)}
                    className="flex-1 border-red-500/30 text-red-400 hover:bg-red-500/20"
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingRequestsBar;
