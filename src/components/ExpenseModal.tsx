import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

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
  onApprove?: (expenseId: number, approvedAmount: number, note: string) => void;
  onReject?: (expenseId: number, note: string) => void;
}

const ExpenseModal = ({ open, onOpenChange, expense, onApprove, onReject }: ExpenseModalProps) => {
  const [approvalAmount, setApprovalAmount] = useState('');
  const [note, setNote] = useState('');

  if (!expense) return null;

  const isPending = expense.status === 'pending';
  const approvedAmt = expense.approvedAmount || 0;
  const rejectedAmt = expense.status === 'approved' && expense.approvedAmount !== undefined 
    ? expense.amount - expense.approvedAmount 
    : 0;

  const handleApprove = () => {
    const amount = parseFloat(approvalAmount);
    if (!isNaN(amount) && amount > 0 && onApprove) {
      onApprove(expense.id, amount, note);
      setApprovalAmount('');
      setNote('');
      onOpenChange(false);
    }
  };

  const handleReject = () => {
    if (onReject) {
      onReject(expense.id, note);
      setApprovalAmount('');
      setNote('');
      onOpenChange(false);
    }
  };

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
            <>
              <div>
                <p className="text-sm text-muted-foreground">Approved Amount</p>
                <p className="text-xl font-semibold text-green-400">₹{expense.approvedAmount.toLocaleString()}</p>
              </div>
              {rejectedAmt > 0 && (
                <div>
                  <p className="text-sm text-muted-foreground">Rejected Amount</p>
                  <p className="text-xl font-semibold text-red-400">₹{rejectedAmt.toLocaleString()}</p>
                </div>
              )}
            </>
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
                  : 'bg-muted text-gray-400'
              }
            >
              {expense.status.charAt(0).toUpperCase() + expense.status.slice(1)}
            </Badge>
          </div>

          {isPending && (
            <div className="space-y-4 pt-4 border-t">
              <div>
                <Label htmlFor="approvalAmount">Approval Amount</Label>
                <Input
                  id="approvalAmount"
                  type="number"
                  placeholder="Enter amount to approve"
                  value={approvalAmount}
                  onChange={(e) => setApprovalAmount(e.target.value)}
                  max={expense.amount}
                />
              </div>
              <div>
                <Label htmlFor="note">Admin Note</Label>
                <Textarea
                  id="note"
                  placeholder="Add a note (optional)"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Button 
                  onClick={handleApprove} 
                  className="w-full"
                  disabled={!approvalAmount || parseFloat(approvalAmount) <= 0}
                >
                  Approve Amount
                </Button>
                <Button 
                  onClick={handleReject} 
                  variant="destructive"
                  className="w-full"
                >
                  Reject Expense
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseModal;
