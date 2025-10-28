import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedAmount?: number;
}

interface ExpenseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  expense: Expense | null;
}

const ExpenseModal = ({ open, onOpenChange, expense }: ExpenseModalProps) => {
  if (!expense) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Expense Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Category</p>
              <p className="font-medium">{expense.category}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{expense.date}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Requested Amount</p>
            <p className="text-2xl font-bold text-primary">₹{expense.amount.toLocaleString()}</p>
          </div>

          {expense.status === 'approved' && expense.approvedAmount !== undefined && (
            <div>
              <p className="text-sm text-muted-foreground">Approved Amount</p>
              <p className="text-xl font-semibold text-green-400">₹{expense.approvedAmount.toLocaleString()}</p>
            </div>
          )}

          <div>
            <p className="text-sm text-muted-foreground">Description</p>
            <p className="text-foreground">{expense.description}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <Badge 
              variant={expense.status === 'approved' ? 'default' : expense.status === 'rejected' ? 'destructive' : 'secondary'}
              className={
                expense.status === 'approved' 
                  ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                  : expense.status === 'rejected'
                  ? 'bg-red-500/20 text-red-400 border-red-500/30'
                  : 'bg-muted text-muted-foreground'
              }
            >
              {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseModal;
