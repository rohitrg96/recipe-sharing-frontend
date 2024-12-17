import InputField from '../components/InputField/AuthInputField';
import AuthButton from '../components/AuthButton';
import useSignUp from '../hooks/useSignUp';

const SignUp: React.FC = () => {
  const {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    email,
    setEmail,
    password,
    setPassword,
    error,
    success,
    handleSignUp,
    handleLoginRedirect,
  } = useSignUp();

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left Section: Image */}
      <div
        style={{
          flex: 1,
          backgroundImage: 'url(images/auth.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      ></div>

      {/* Right Section: Content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
        }}
      >
        <form onSubmit={handleSignUp} style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          {/* Title */}
          <h4 className="fw-bold" style={{ marginBottom: '2rem' }}>
            Welcome to the Recipe World! 🍳
          </h4>

          {/* Error/Success Messages */}
          {error && <p style={{ color: 'red', marginBottom: '1rem' }}>{error}</p>}
          {success && <p style={{ color: 'green', marginBottom: '1rem' }}>{success}</p>}

          {/* Firstname and Lastname */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <InputField
              type="text"
              placeholder="First Name"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
              name="firstname"
              style={{ flex: 1 }}
            />
            <InputField
              type="text"
              placeholder="Last Name"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
              name="lastname"
              style={{ flex: 1 }}
            />
          </div>

          {/* Email Input */}
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            name="email"
            style={{ marginBottom: '1rem', width: '100%' }}
          />

          {/* Password Input */}
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            name="password"
            style={{ marginBottom: '1.5rem', width: '100%' }}
          />

          {/* Sign Up Button */}
          <AuthButton text="Sign Up" onClick={handleSignUp} />

          {/* Sign In Link */}
          <p>
            Already have an account?
            <button
              onClick={handleLoginRedirect}
              style={{ color: 'black', background: 'transparent', border: 'none', cursor: 'pointer' }}
            >
              Click here to login In!.
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
