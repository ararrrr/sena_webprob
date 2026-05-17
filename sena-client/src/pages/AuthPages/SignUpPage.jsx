import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { createUser } from '../../services/UserService';

const inputClasses =
  'mt-2 w-full rounded-lg border border-white/10 bg-zinc-900/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-white/40 focus:bg-zinc-900 focus:ring-4 focus:ring-white/5';

const actionButtonClassName = 'w-full !rounded-lg py-3 text-[11px] tracking-[0.2em]';
const primaryButtonClassName =
  `${actionButtonClassName} !border-white !bg-white !text-zinc-950 hover:!bg-zinc-200`;

const blankForm = {
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  contactNumber: '',
  email: '',
  username: '',
  password: '',
  address: '',
};

const SignUpPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(blankForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError('');
      await createUser({
        ...form,
        type: 'editor',
        isActive: true,
      });
      navigate('/auth/signin');
    } catch (err) {
      console.error('Signup failed:', err.response?.data?.message || err.message);
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
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
      {error && (
        <p className="mt-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
          {error}
        </p>
      )}

      <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="text-sm font-medium text-zinc-200">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="text-sm font-medium text-zinc-200">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="age" className="text-sm font-medium text-zinc-200">
              Age
            </label>
            <input
              id="age"
              name="age"
              type="text"
              value={form.age}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="gender" className="text-sm font-medium text-zinc-200">
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              required
              className={inputClasses}
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="contactNumber" className="text-sm font-medium text-zinc-200">
              Contact Number
            </label>
            <input
              id="contactNumber"
              name="contactNumber"
              type="text"
              value={form.contactNumber}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
          <div>
            <label htmlFor="username" className="text-sm font-medium text-zinc-200">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={form.username}
              onChange={handleChange}
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
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            required
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="address" className="text-sm font-medium text-zinc-200">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            value={form.address}
            onChange={handleChange}
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
            name="password"
            type="password"
            placeholder="Create a password"
            autoComplete="new-password"
            minLength={8}
            value={form.password}
            onChange={handleChange}
            required
            className={inputClasses}
          />
          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Use a secure password with at least 8 characters.
          </p>
        </div>

        <Button type="submit" variant="primary" className={primaryButtonClassName}>
          {loading ? 'Creating...' : 'Create Account'}
        </Button>
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
