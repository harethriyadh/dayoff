import React, { useState, useEffect } from 'react';
// import '../styles/css/tabler.min.css'; // Removed - causing errors
// import '../styles/css/tabler-flags.min.css'; // Removed - causing errors
// import '../styles/css/tabler-socials.min.css'; // Removed - causing errors
// import '../styles/css/tabler-payments.min.css'; // Removed - causing errors
// import '../styles/css/tabler-vendors.min.css'; // Removed - causing errors
// import '../styles/css/tabler-marketing.min.css'; // Removed - causing errors
// import '../styles/css/demo.min.css'; // Removed - causing errors
// import '../styles/rtl.css'; // Removed - causing errors

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('https://subend.onrender.com/api/login');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (response.ok && data.user) {
          window.location.href = "/index";
        } else {
          setMessage('Please log in.');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setMessage('Failed to check session. Server error: ' + error.message); // Include the error message
        setLoading(false); // Make sure to set loading to false on error
      }
    };
    checkSession();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    if (!username || !password) {
      setMessage('Please enter both username and password.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://subend.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed.  Server error.');
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('authToken', data.token);
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('username');
          localStorage.removeItem('password');
        }
        window.location.href = "./index";
      } else {
        setMessage(data.message || 'Login failed. Invalid credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Error during login: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className="d-flex flex-column">
      <div className="page">
        <div className="container container-tight py-4">
          <div className="text-center mb-4">
            <a href="." className="navbar-brand navbar-brand-autodark">
              {/* Add your logo here if needed */}
            </a>
          </div>
          <div className="card card-md">
            <div className="card-body">
              <h2 className="h2 text-center mb-4">تسجيل الدخول إلى حسابك</h2>
              <form id="loginForm" onSubmit={handleLogin} autoComplete="off" noValidate>
                <div className="mb-3">
                  <label className="form-label">اسم المستخدم</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder="اسم المستخدم"
                    autoComplete="off"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-2 inputfield">
                  <label className="form-label">
                    كلمة المرور
                    <span className="form-label-description">
                      <a href="./forgot-password.html">نسيت كلمة المرور</a>
                    </span>
                  </label>
                  <div className="input-group input-group-flat">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      id="password"
                      className="form-control password-input"
                      placeholder="كلمة المرور الخاصة بك"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <span className="input-group-text">
                      <a
                        href="#"
                        className="link-secondary password-toggle"
                        title={passwordVisible ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                        onClick={togglePasswordVisibility}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="icon icon-1"
                        >
                          {passwordVisible ? (
                            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.56" />
                          ) : (
                            <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                          )}
                          {!passwordVisible && <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />}
                        </svg>
                      </a>
                    </span>
                  </div>
                </div>
                <div className="mb-2">
                  <label className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={handleRememberMeChange}
                    />
                    <span className="form-check-label">تذكرني على هذا الجهاز</span>
                  </label>
                </div>
                {message && (
                  <div className="alert alert-danger" role="alert">
                    <div className="d-flex">
                      <div>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon alert-icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0"></path><path d="M12 8v8"></path><path d="M12 16h.01"></path></svg>
                      </div>
                      <div>
                        <h4 className="alert-title">Error</h4>
                        <div className="alert-text">
                          {message}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div className="form-footer">
                  <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                    {loading ? 'جاري التحميل...' : 'تسجيل الدخول'}
                  </button>
                </div>
                <div className="text-center text-muted mt-3">
                  ليس لديك حساب؟ <a href="./register">تسجيل الدخول</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
