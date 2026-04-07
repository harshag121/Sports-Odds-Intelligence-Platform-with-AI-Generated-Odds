import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';

export function LoginPage() {
  const { login } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-lg rounded-[34px] p-8">
        <div className="mb-8 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">Secure predictive gateway</p>
          <h1 className="mt-3 font-[Space_Grotesk] text-4xl font-bold">Initialize your terminal session</h1>
          <p className="mt-3 text-on-background/55">
            Use the demo auth flow now and swap in JWT-backed auth when the API is running.
          </p>
        </div>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            login.mutate({
              email: String(form.get('email') ?? ''),
              password: String(form.get('password') ?? ''),
            });
          }}
        >
          <Input name="email" placeholder="USER@ODDSAI.TECH" type="email" />
          <Input name="password" placeholder="Password" type="password" />
          <Button className="w-full" disabled={login.isPending} type="submit">
            Establish connection
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-on-background/55">
          New node?{' '}
          <Link className="text-primary" to="/register">
            Register here
          </Link>
        </p>
      </Card>
    </div>
  );
}
