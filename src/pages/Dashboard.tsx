import { useEffect } from 'react';
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
import { LogOut, Users } from 'lucide-react';

const dummyUsers = [
  { id: 1, name: 'John Smith', email: 'john.smith@example.com', role: 'User', status: 'Active' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'User', status: 'Active' },
  { id: 3, name: 'Michael Chen', email: 'mchen@example.com', role: 'Manager', status: 'Active' },
  { id: 4, name: 'Emily Davis', email: 'emily.d@example.com', role: 'User', status: 'Inactive' },
  { id: 5, name: 'David Wilson', email: 'dwilson@example.com', role: 'Manager', status: 'Active' },
  { id: 6, name: 'Lisa Anderson', email: 'l.anderson@example.com', role: 'User', status: 'Active' },
];

const Dashboard = () => {
  const { isAuthenticated, adminEmail, logout } = useAuth();
  const navigate = useNavigate();

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

        {/* Stats Card */}
        <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/95">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl font-semibold">User Overview</CardTitle>
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center shadow-glow">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold text-foreground">{dummyUsers.length}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Active</p>
                <p className="text-3xl font-bold text-green-500">
                  {dummyUsers.filter(u => u.status === 'Active').length}
                </p>
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

        {/* Users Table */}
        <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/95">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-secondary/50">
                  <TableHead className="text-muted-foreground font-semibold">Name</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Email</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Role</TableHead>
                  <TableHead className="text-muted-foreground font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dummyUsers.map((user) => (
                  <TableRow 
                    key={user.id} 
                    className="border-border/50 hover:bg-secondary/50 transition-colors"
                  >
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
