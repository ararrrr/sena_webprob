import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';

const inputClasses =
  'mt-2 w-full rounded-lg border border-white/10 bg-zinc-900/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-white/40 focus:bg-zinc-900 focus:ring-4 focus:ring-white/5';

const actionButtonClassName = 'w-full !rounded-lg py-3 text-[11px] tracking-[0.2em]';
const primaryButtonClassName =
  `${actionButtonClassName} !border-white !bg-white !text-zinc-950 hover:!bg-zinc-200`;
const secondaryButtonClassName =
  `${actionButtonClassName} !border-zinc-700 !bg-transparent !text-zinc-200 hover:!border-zinc-500 hover:!bg-zinc-900`;

const SignUpPage = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <>
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.26em] text-zinc-500">
        Start Exploring
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Sign Up</h1>
      <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-300">
        Create your account to collect articles, follow discoveries, and keep your place in the
        journal.
      </p>

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="text-sm font-medium text-zinc-200">
              First Name
            </label>
            <input
              id="first-name"
              type="text"
              placeholder="First name"
              autoComplete="given-name"
              required
              className={inputClasses}
            />
          </div>

          <div>
            <label htmlFor="last-name" className="text-sm font-medium text-zinc-200">
              Last Name
            </label>
            <input
              id="last-name"
              type="text"
              placeholder="Last name"
              autoComplete="family-name"
              required
              className={inputClasses}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="text-sm font-medium text-zinc-200">
            Email
          </label>
          <input
            id="signup-email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="text-sm font-medium text-zinc-200">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            minLength={8}
            required
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Use a secure password with letters, numbers, and symbols.
          </p>
        </div>

        <Button type="submit" variant="primary" className={primaryButtonClassName}>
          Create Account
        </Button>

        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          <Button type="button" variant="secondary" className={secondaryButtonClassName}>
            Sign Up with Google
          </Button>
          <Button type="button" variant="secondary" className={secondaryButtonClassName}>
            Sign Up with Apple
          </Button>
        </div>
      </form>

      <div className="mt-8 border-t border-white/10 pt-6 text-sm text-zinc-400">
        Already have an account?{' '}
        <Link
          to="/auth/signin"
          className="font-semibold text-white transition hover:text-zinc-300"
        >
          Log In
        </Link>
      </div>
    </>
  );
};

export default SignUpPage;
