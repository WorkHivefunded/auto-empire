import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Lock, Mail, User } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export function LoginPage() {
  const { loginAdmin } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(email, password)) {
      navigate('/admin');
    } else {
      setError('Invalid credentials. Try admin@autoempire.com / Admin@123');
    }
  };

  return (
    <div className="container-px py-16">
      <div className="mx-auto max-w-md">
        <div className="mb-8 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow">
            <Car size={24} strokeWidth={2.5} />
          </span>
          <h1 className="mt-4 font-display text-2xl font-extrabold text-white">Auto Empire Admin</h1>
          <p className="mt-1 text-sm text-ink-400">Sign in to manage your marketplace.</p>
        </div>

        <div className="card-surface p-6">
          {showForgot ? (
            <div className="text-center">
              <h2 className="font-display text-lg font-bold text-white">Forgot Password</h2>
              <p className="mt-2 text-sm text-ink-400">For this demo, use the credentials below to sign in.</p>
              <div className="mt-4 rounded-xl border border-ink-700 bg-ink-900 p-4 text-left text-sm">
                <p className="text-ink-400">Email: <span className="font-mono font-semibold text-white">admin@autoempire.com</span></p>
                <p className="mt-1 text-ink-400">Password: <span className="font-mono font-semibold text-white">Admin@123</span></p>
              </div>
              <Button className="mt-5" fullWidth onClick={() => setShowForgot(false)}>Back to Login</Button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@autoempire.com"
                icon={<Mail size={16} />}
              />
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                icon={<Lock size={16} />}
              />
              {error && <p className="text-sm text-brand-400">{error}</p>}
              <Button type="submit" fullWidth leftIcon={<User size={16} />}>Login</Button>
              <button type="button" onClick={() => setShowForgot(true)} className="w-full text-center text-sm text-ink-400 transition hover:text-brand-400">
                Forgot password?
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
