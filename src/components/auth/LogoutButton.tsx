
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const LogoutButton: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Button 
      variant="outline" 
      onClick={signOut} 
      className="flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
};

export default LogoutButton;
