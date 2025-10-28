import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { LogOut, Users, Plus, Search, Receipt } from 'lucide-react';
import AddUserModal from '@/components/AddUserModal';
import CategoryManagement from '@/components/CategoryManagement';
import ExpenseManagement from '@/components/ExpenseManagement';

const dummyUsers = [
  { id: 1, name: 'John Smith', email: 'john.smith@example.com', employeeCode: 'EMP001', role: 'User', status: 'Active', approved: true },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.j@example.com', employeeCode: 'EMP002', role: 'User', status: 'Active', approved: true },
  { id: 3, name: 'Michael Chen', email: 'mchen@example.com', employeeCode: 'EMP003', role: 'Manager', status: 'Active', approved: true },
  { id: 4, name: 'Emily Davis', email: 'emily.d@example.com', employeeCode: 'EMP004', role: 'User', status: 'Inactive', approved: false },
  { id: 5, name: 'David Wilson', email: 'dwilson@example.com', employeeCode: 'EMP005', role: 'Manager', status: 'Active', approved: true },
  { id: 6, name: 'Lisa Anderson', email: 'l.anderson@example.com', employeeCode: 'EMP006', role: 'User', status: 'Active', approved: false },
];

const Dashboard = () => {
  const { isAuthenticated, adminEmail, logout } = useAuth();
  const navigate = useNavigate();
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [showExpenses, setShowExpenses] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userApprovals, setUserApprovals] = useState<Record<number, 'pending' | 'approved' | 'rejected'>>(
    dummyUsers.reduce((acc, user) => ({ ...acc, [user.id]: user.approved ? 'approved' : 'pending' }), {})
  );

  const handleApprovalToggle = (userId: number) => {
    setUserApprovals(prev => {
      const currentState = prev[userId];
      if (currentState === 'pending' || currentState === 'rejected') {
        return { ...prev, [userId]: 'approved' };
      } else {
        return { ...prev, [userId]: 'rejected' };
      }
    });
  };

  const filteredUsers = dummyUsers
    .filter(user => user.role === 'User')
    .filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const getAdminName = (email: string | null) => {
    if (!email) return 'Admin';
    return email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-background/95 p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,51,234,0.1),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-primary bg-clip-text text-transparent">
              Welcome, {getAdminName(adminEmail)}
            </h1>
            <p className="text-muted-foreground">Manage your users and monitor activity</p>
          </div>
          <Button 
            onClick={logout}
            variant="outline"
            className="border-border/50 hover:border-primary transition-all duration-300"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Add Users Section */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">
            {showExpenses ? 'User Expenses' : 'Add Users'}
          </h2>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowExpenses(!showExpenses)}
              variant="outline"
              className="border-border/50 hover:border-primary transition-all duration-300"
            >
              <Receipt className="w-4 h-4 mr-2" />
              {showExpenses ? 'Back to Users' : 'Check Expenses'}
            </Button>
            {!showExpenses && (
              <Button
                onClick={() => setIsAddUserModalOpen(true)}
                className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            )}
          </div>
        </div>

        {/* Stats Card */}
        <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/95">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold">User Overview</CardTitle>
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-glow">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold text-foreground">{dummyUsers.length}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Managers</p>
                <p className="text-3xl font-bold text-purple-500">
                  {dummyUsers.filter(u => u.role === 'Manager').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Management */}
        {!showExpenses && <CategoryManagement />}

        {/* Conditional Content */}
        {showExpenses ? (
          <ExpenseManagement />
        ) : (
          <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/95">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold">Users</CardTitle>
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-secondary/50">
                  <TableHead className="text-muted-foreground font-semibold">Employee Code</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Name</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Email</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Role</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Status</TableHead>
                  <TableHead className="text-muted-foreground font-semibold"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow 
                    key={user.id} 
                    className="border-border/50 hover:bg-secondary/50 transition-colors"
                  >
                    <TableCell className="font-mono text-sm text-muted-foreground">{user.employeeCode}</TableCell>
                    <TableCell className="font-medium text-foreground">{user.name}</TableCell>
                    <TableCell className="text-muted-foreground">{user.email}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.role === 'Manager' ? 'default' : 'secondary'}
                        className={user.role === 'Manager' 
                          ? 'bg-gradient-to-r from-primary to-purple-600 text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                        }
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.status === 'Active' ? 'default' : 'secondary'}
                        className={user.status === 'Active' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/30' 
                          : 'bg-muted text-muted-foreground'
                        }
                      >
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Switch
                          checked={userApprovals[user.id] === 'approved'}
                          onCheckedChange={() => handleApprovalToggle(user.id)}
                          className={
                            userApprovals[user.id] === 'approved'
                              ? 'data-[state=checked]:bg-green-500' 
                              : 'data-[state=unchecked]:bg-red-500'
                          }
                        />
                        <span
                          className={
                            userApprovals[user.id] === 'approved'
                              ? 'text-green-400 font-medium'
                              : userApprovals[user.id] === 'rejected'
                              ? 'text-red-400 font-medium'
                              : 'text-gray-400 font-medium'
                          }
                        >
                          {userApprovals[user.id] === 'approved'
                            ? 'Approved'
                            : userApprovals[user.id] === 'rejected'
                            ? 'Rejected'
                            : 'Pending'}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        )}
      </div>

      <AddUserModal open={isAddUserModalOpen} onOpenChange={setIsAddUserModalOpen} />
    </div>
  );
};

export default Dashboard;
