import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SubCategory {
  id: string;
  name: string;
  rate?: number;
}

const CategoryManagement = () => {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Record<string, SubCategory[]>>({
    travel: [],
    localConvenience: [],
    equipment: []
  });
  const [newSubCategory, setNewSubCategory] = useState<Record<string, string>>({
    travel: '',
    localConvenience: '',
    equipment: ''
  });
  const [newRate, setNewRate] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('');

  const addSubCategory = (categoryKey: string) => {
    const name = newSubCategory[categoryKey].trim();
    if (!name) return;

    const newSub: SubCategory = {
      id: Date.now().toString(),
      name,
      ...(categoryKey === 'localConvenience' && newRate ? { rate: parseFloat(newRate) } : {})
    };

    setCategories({
      ...categories,
      [categoryKey]: [...categories[categoryKey], newSub]
    });

    setNewSubCategory({ ...newSubCategory, [categoryKey]: '' });
    setNewRate('');
    setActiveCategory('');

    toast({
      title: "Subcategory Added",
      description: `${name} has been added successfully.`,
    });
  };

  const removeSubCategory = (categoryKey: string, id: string) => {
    setCategories({
      ...categories,
      [categoryKey]: categories[categoryKey].filter(sub => sub.id !== id)
    });
  };

  const categoryConfig = [
    { key: 'travel', title: 'Travel', showRate: false },
    { key: 'localConvenience', title: 'Local Convenience', showRate: true },
    { key: 'equipment', title: 'Equipment', showRate: false }
  ];

  return (
    <Card className="border-border/50 shadow-xl backdrop-blur-sm bg-card/95">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Category Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {categoryConfig.map(({ key, title, showRate }) => (
          <div key={key} className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
            
            <div className="flex flex-wrap gap-2 min-h-[40px]">
              {categories[key].map((sub) => (
                <Badge key={sub.id} variant="secondary" className="px-3 py-1.5 text-sm">
                  {sub.name}
                  {sub.rate && ` - ₹${sub.rate}/km`}
                  <button
                    onClick={() => removeSubCategory(key, sub.id)}
                    className="ml-2 hover:text-destructive"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>

            {activeCategory === key ? (
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <Input
                    placeholder="Subcategory name"
                    value={newSubCategory[key]}
                    onChange={(e) => setNewSubCategory({ ...newSubCategory, [key]: e.target.value })}
                    onKeyDown={(e) => e.key === 'Enter' && addSubCategory(key)}
                  />
                </div>
                {showRate && (
                  <div className="w-32">
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="Rate/km"
                      value={newRate}
                      onChange={(e) => setNewRate(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && addSubCategory(key)}
                    />
                  </div>
                )}
                <Button size="sm" onClick={() => addSubCategory(key)}>
                  Add
                </Button>
                <Button size="sm" variant="outline" onClick={() => setActiveCategory('')}>
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="outline"
                onClick={() => setActiveCategory(key)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Subcategory
              </Button>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CategoryManagement;
