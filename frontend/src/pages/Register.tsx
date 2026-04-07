import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { useAuth } from '../hooks/useAuth';

export function RegisterPage() {
  const { register } = useAuth();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="w-full max-w-lg rounded-[34px] p-8">
        <div className="mb-8 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-secondary">Create analyst identity</p>
          <h1 className="mt-3 font-[Space_Grotesk] text-4xl font-bold">Register a new terminal node</h1>
        </div>
        <form
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault();
            const form = new FormData(event.currentTarget);
            register.mutate({
              username: String(form.get('username') ?? ''),
              email: String(form.get('email') ?? ''),
              password: String(form.get('password') ?? ''),
            });
          }}
        >
          <Input name="username" placeholder="Trader alias" />
          <Input name="email" placeholder="Email address" type="email" />
          <Input name="password" placeholder="Password" type="password" />
          <Button className="w-full" disabled={register.isPending} type="submit">
            Create account
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-on-background/55">
          Already connected?{' '}
          <Link className="text-primary" to="/login">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}
