import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-lg border border-white/10 bg-zinc-900/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-white/40 focus:bg-zinc-900 focus:ring-4 focus:ring-white/5';

const actionButtonClassName = 'w-full !rounded-lg py-3 text-[11px] tracking-[0.2em]';
const primaryButtonClassName =
  `${actionButtonClassName} !border-white !bg-white !text-zinc-950 hover:!bg-zinc-200`;
const secondaryButtonClassName =
  `${actionButtonClassName} !border-zinc-700 !bg-transparent !text-zinc-200 hover:!border-zinc-500 hover:!bg-zinc-900`;

const SignInPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.26em] text-zinc-500">
        Welcome Back
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Log In</h1>
      <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-300">
        Access your account and continue exploring the universe from where you left off.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="signin-email" className="text-sm font-medium text-zinc-200">
            Email Address
          </label>
          <input
            id="signin-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signin-password" className="text-sm font-medium text-zinc-200">
            Password
          </label>
          <input
            id="signin-password"
            type="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            minLength={8}
            required
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Use the password connected to your Universe Portal account.
          </p>
        </div>

        <div className="flex items-center justify-between gap-4 text-sm">
          <label className="flex items-center gap-2 text-zinc-400">
            <input type="checkbox" className="h-4 w-4 rounded border-zinc-700 accent-white" />
            <span>Remember me</span>
          </label>
          <button
            type="button"
            className="font-medium text-zinc-300 transition hover:text-white"
          >
            Forgot Password?
          </button>
        </div>

        <Button type="submit" variant="primary" className={primaryButtonClassName}>
          Continue
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={secondaryButtonClassName}>
            Log In with Google
          </Button>
          <Button type="button" variant="secondary" className={secondaryButtonClassName}>
            Log In with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-white/10 pt-6 text-sm text-zinc-400">
        No account yet?{' '}
        <Link
          to="/auth/signup"
          className="font-semibold text-white transition hover:text-zinc-300"
        >
          Sign Up
        </Link>
      </div>
    </>
  );
};

export default SignInPage;
