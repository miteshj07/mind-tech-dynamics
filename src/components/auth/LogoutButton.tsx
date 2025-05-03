
import React from 'react';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const LogoutButton: React.FC = () => {
  const { signOut, user } = useAuth();

  const handleLogout = () => {
    console.log('Logout clicked for user:', user?.email);
    signOut();
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleLogout} 
      className="flex items-center gap-2"
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
};

export default LogoutButton;
