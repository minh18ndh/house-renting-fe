import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Input from '../components/Input';
import Button from '../components/Button';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const success = await login(email, password);
    setLoading(false);
    if (success) {
      navigate(from, { replace: true });
    } else {
      setError('Failed to login. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center bg-background py-8 px-4 md:py-12 md:px-10 lg:px-20">
      <div className="w-full bg-white space-y-6 p-6 rounded-lg shadow-lg md:max-w-xl md:p-10 md:rounded-xl lg:max-w-2xl lg:p-12">

        <div>
          <div className="flex justify-center mb-6">
            <img src="/logo.svg" alt="Logo" className="w-10 h-10 rounded-lg" />
          </div>
          <h2 className="text-center text-3xl font-extrabold text-text-main">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-text-muted">
            Demo credentials: minh@gmail.com / string123
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && <p className="text-center text-sm text-red-600 bg-red-100 p-3 rounded-md">{error}</p>}

          <Input
            label="Email address"
            type="email"
            name="email"
            placeholder="minh@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="string123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div>
            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </div>
        </form>

        <p className="mt-4 text-center text-sm text-text-muted">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-primary hover:text-opacity-80">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;