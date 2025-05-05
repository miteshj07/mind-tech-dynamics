
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash, Plus } from 'lucide-react';
import { toast } from "@/components/ui/sonner";
import { useCms } from '@/cms/context/CmsContext';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
  rating: number;
}

interface TestimonialManagerProps {
  testimonials: Testimonial[];
  sectionName: string;
  pathName: string;
}

const TestimonialManager: React.FC<TestimonialManagerProps> = ({ testimonials, sectionName, pathName }) => {
  const { updateContent, refreshData } = useCms();
  const [localTestimonials, setLocalTestimonials] = useState<Testimonial[]>(testimonials || []);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<number>(-1);

  const addNewTestimonial = () => {
    setLocalTestimonials([...localTestimonials, {
      quote: "New testimonial quote...",
      author: "Client Name",
      position: "Position",
      company: "Company Name",
      rating: 5
    }]);
  };

  const updateTestimonialField = (index: number, field: keyof Testimonial, value: string | number) => {
    const updatedTestimonials = [...localTestimonials];
    updatedTestimonials[index] = {
      ...updatedTestimonials[index],
      [field]: value
    };
    setLocalTestimonials(updatedTestimonials);
  };

  const confirmDelete = (index: number) => {
    setTestimonialToDelete(index);
    setIsDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (testimonialToDelete === -1) return;
    
    const updatedTestimonials = localTestimonials.filter((_, index) => index !== testimonialToDelete);
    setLocalTestimonials(updatedTestimonials);
    setIsDeleteDialogOpen(false);
    setTestimonialToDelete(-1);
  };

  const saveChanges = async () => {
    try {
      await updateContent(sectionName, pathName, localTestimonials);
      await refreshData();
      toast.success("Testimonials updated successfully");
    } catch (error) {
      console.error("Failed to save testimonials:", error);
      toast.error("Failed to save testimonials");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Testimonials</h3>
        <div className="flex gap-2">
          <Button onClick={addNewTestimonial} className="flex items-center gap-1">
            <Plus size={16} />
            Add Testimonial
          </Button>
          <Button onClick={saveChanges} variant="default">Save Changes</Button>
        </div>
      </div>

      <div className="grid gap-6">
        {localTestimonials.map((testimonial, index) => (
          <Card key={index} className="relative">
            <Button 
              variant="destructive" 
              size="icon"
              className="absolute top-4 right-4"
              onClick={() => confirmDelete(index)}
            >
              <Trash size={16} />
            </Button>
            <CardHeader>
              <CardTitle>Testimonial {index + 1}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor={`quote-${index}`}>Quote</Label>
                <Textarea 
                  id={`quote-${index}`} 
                  value={testimonial.quote} 
                  onChange={(e) => updateTestimonialField(index, 'quote', e.target.value)}
                  rows={4}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor={`author-${index}`}>Author Name</Label>
                <Input 
                  id={`author-${index}`} 
                  value={testimonial.author} 
                  onChange={(e) => updateTestimonialField(index, 'author', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`position-${index}`}>Position</Label>
                  <Input 
                    id={`position-${index}`} 
                    value={testimonial.position} 
                    onChange={(e) => updateTestimonialField(index, 'position', e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor={`company-${index}`}>Company</Label>
                  <Input 
                    id={`company-${index}`} 
                    value={testimonial.company} 
                    onChange={(e) => updateTestimonialField(index, 'company', e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor={`rating-${index}`}>Rating (1-5)</Label>
                <Select 
                  value={testimonial.rating.toString()}
                  onValueChange={(value) => updateTestimonialField(index, 'rating', parseInt(value))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Star</SelectItem>
                    <SelectItem value="2">2 Stars</SelectItem>
                    <SelectItem value="3">3 Stars</SelectItem>
                    <SelectItem value="4">4 Stars</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {localTestimonials.length === 0 && (
          <div className="text-center p-8 border border-dashed border-gray-300 rounded-lg">
            <p className="text-gray-500">No testimonials yet. Click "Add Testimonial" to create one.</p>
          </div>
        )}
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the testimonial.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TestimonialManager;
