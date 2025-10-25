import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface AddUserModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AddUserModal = ({ open, onOpenChange }: AddUserModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    employeeCode: '',
    name: '',
    designation: '',
    email: '',
    phone: '',
    jobLocation: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "User Added",
      description: `${formData.name} has been successfully registered.`,
    });
    setFormData({
      employeeCode: '',
      name: '',
      designation: '',
      email: '',
      phone: '',
      jobLocation: ''
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="employeeCode">Employee Code</Label>
            <Input
              id="employeeCode"
              value={formData.employeeCode}
              onChange={(e) => setFormData({ ...formData, employeeCode: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="designation">Designation</Label>
            <Input
              id="designation"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobLocation">Job Location</Label>
            <Select value={formData.jobLocation} onValueChange={(value) => setFormData({ ...formData, jobLocation: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new-york">New York</SelectItem>
                <SelectItem value="london">London</SelectItem>
                <SelectItem value="tokyo">Tokyo</SelectItem>
                <SelectItem value="singapore">Singapore</SelectItem>
                <SelectItem value="mumbai">Mumbai</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Register User
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddUserModal;
