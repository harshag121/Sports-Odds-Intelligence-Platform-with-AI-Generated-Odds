import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { useAuthStore } from '../store/authStore';

export function useAuth() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const logoutStore = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const login = useMutation({
    mutationFn: authService.login,
    onSuccess: (payload) => {
      setAuth(payload);
      navigate('/');
    },
  });

  const register = useMutation({
    mutationFn: authService.register,
    onSuccess: (payload) => {
      setAuth(payload);
      navigate('/');
    },
  });

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout: () => {
      logoutStore();
      navigate('/login');
    },
  };
}
