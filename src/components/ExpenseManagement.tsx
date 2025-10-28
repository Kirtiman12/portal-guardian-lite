import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import ExpenseModal from './ExpenseModal';

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedAmount?: number;
}

interface UserExpenses {
  userId: number;
  name: string;
  email: string;
  employeeCode: string;
  expenses: Expense[];
}

const dummyExpenses: UserExpenses[] = [
  {
    userId: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    employeeCode: 'EMP001',
    expenses: [
      { id: 1, category: 'Travel', amount: 5000, date: '2024-01-15', description: 'Client meeting in Mumbai', status: 'approved', approvedAmount: 4500 },
      { id: 2, category: 'Food', amount: 1200, date: '2024-01-20', description: 'Team lunch', status: 'approved', approvedAmount: 1200 },
      { id: 3, category: 'Office Supplies', amount: 800, date: '2024-01-22', description: 'Stationery items', status: 'pending' },
    ]
  },
  {
    userId: 2,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    employeeCode: 'EMP002',
    expenses: [
      { id: 4, category: 'Travel', amount: 3000, date: '2024-01-18', description: 'Conference attendance', status: 'approved', approvedAmount: 3000 },
      { id: 5, category: 'Software', amount: 2500, date: '2024-01-25', description: 'Annual software license', status: 'rejected' },
    ]
  },
  {
    userId: 4,
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    employeeCode: 'EMP004',
    expenses: [
      { id: 6, category: 'Training', amount: 10000, date: '2024-01-10', description: 'Professional certification course', status: 'approved', approvedAmount: 8000 },
      { id: 7, category: 'Travel', amount: 4000, date: '2024-01-28', description: 'Business trip', status: 'pending' },
      { id: 8, category: 'Food', amount: 600, date: '2024-01-29', description: 'Client dinner', status: 'pending' },
    ]
  },
  {
    userId: 6,
    name: 'Lisa Anderson',
    email: 'l.anderson@example.com',
    employeeCode: 'EMP006',
    expenses: [
      { id: 9, category: 'Office Supplies', amount: 1500, date: '2024-01-12', description: 'Desk equipment', status: 'approved', approvedAmount: 1500 },
    ]
  }
];

const ExpenseManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedUsers, setExpandedUsers] = useState<Set<number>>(new Set());
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);

  const toggleUserExpanded = (userId: number) => {
    setExpandedUsers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(userId)) {
        newSet.delete(userId);
      } else {
        newSet.add(userId);
      }
      return newSet;
    });
  };

  const handleViewExpense = (expense: Expense) => {
    setSelectedExpense(expense);
    setIsExpenseModalOpen(true);
  };

  const calculateTotals = (expenses: Expense[]) => {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const approved = expenses
      .filter(exp => exp.status === 'approved')
      .reduce((sum, exp) => sum + (exp.approvedAmount || exp.amount), 0);
    const rejected = expenses
      .filter(exp => exp.status === 'rejected')
      .reduce((sum, exp) => sum + exp.amount, 0);
    return { total, approved, rejected };
  };

  const filteredUsers = dummyExpenses.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.employeeCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/95">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-semibold">User Expenses</CardTitle>
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => {
              const { total, approved, rejected } = calculateTotals(user.expenses);
              const isExpanded = expandedUsers.has(user.userId);

              return (
                <Card key={user.userId} className="border-border/30">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-foreground">{user.name}</h3>
                          <Badge variant="secondary" className="font-mono text-xs">
                            {user.employeeCode}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleUserExpanded(user.userId)}
                        className="ml-4"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-3 gap-4 p-4 bg-secondary/30 rounded-lg">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Total Amount</p>
                        <p className="text-lg font-bold text-primary">₹{total.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Approved Amount</p>
                        <p className="text-lg font-semibold text-green-400">₹{approved.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Rejected Amount</p>
                        <p className="text-lg font-semibold text-red-400">₹{rejected.toLocaleString()}</p>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="space-y-2 mt-4">
                        <h4 className="text-sm font-semibold text-muted-foreground">Individual Expenses</h4>
                        {user.expenses.map((expense) => (
                          <div
                            key={expense.id}
                            className="flex items-center justify-between p-3 border border-border/50 rounded-lg hover:bg-secondary/50 transition-colors"
                          >
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-foreground">{expense.category}</p>
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
                                  {expense.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{expense.date} • ₹{expense.amount.toLocaleString()}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewExpense(expense)}
                              className="ml-4"
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <ExpenseModal 
        open={isExpenseModalOpen}
        onOpenChange={setIsExpenseModalOpen}
        expense={selectedExpense}
      />
    </>
  );
};

export default ExpenseManagement;
