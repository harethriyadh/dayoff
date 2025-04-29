import React, { useState, useEffect } from 'react';
import '../styles/css/tabler.min.css';
import '../styles/css/tabler-flags.min.css';
import '../styles/css/tabler-socials.min.css';
import '../styles/css/tabler-payments.min.css';
import '../styles/css/tabler-vendors.min.css';
import '../styles/css/tabler-marketing.min.css';
import '../styles/css/demo.min.css';
import '../styles/rtl.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    // Check if rememberMe is stored in localStorage
    const storedRememberMe = localStorage.getItem('rememberMe') === 'true';
    const storedUsername = localStorage.getItem('username') || '';
    const storedPassword = localStorage.getItem('password') || '';

    setRememberMe(storedRememberMe);
    setUsername(storedUsername);
    setPassword(storedPassword);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
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
        throw new Error(errorData.message || 'فشل تسجيل الدخول بسبب خطأ في الخادم.');
      }

      const data = await response.json();

      if (data.token) {
        // Store token
        localStorage.setItem('authToken', data.token);

        // Handle "Remember Me"
        if (rememberMe) {
          localStorage.setItem('rememberMe', 'true');
          localStorage.setItem('username', username);
          localStorage.setItem('password', password);
        } else {
          localStorage.removeItem('rememberMe');
          localStorage.removeItem('username');
          localStorage.removeItem('password');
        }

        window.location.href = "/index";
      } else {
        alert(data.message || 'فشل تسجيل الدخول. تحقق من بيانات الاعتماد الخاصة بك.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('حدث خطأ أثناء تسجيل الدخول: ' + error.message);
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
                  />
                </div>
                <div class="inputfield"className="mb-2">
                  <label className="form-label">
                    كلمة المرور
                    <span className="form-label-description">
                      <a href="./forgot-password.html">نسيت كلمة المرور</a>
                    </span>
                  </label>
                  <div  className="input-group input-group-flat">
                    <input
                      type={passwordVisible ? 'text' : 'password'}
                      id="password"
                      className="form-control password-input" // Added password-input class
                      placeholder="كلمة المرور الخاصة بك"
                      autoComplete="off"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <span className="input-group-text">
                      <a
                        href="#"
                        className="link-secondary password-toggle" // Added password-toggle class
                        title="إظهار كلمة المرور"
                        data-bs-toggle="tooltip"
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
                          <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                          <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
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
                <div className="form-footer">
                  <button type="submit" className="btn btn-primary w-100">
                    تسجيل الدخول
                  </button>
                </div>
                <div className="text-center text-muted mt-3">
                  ليس لديك حساب ؟ <a href="./register">تسجيل الدخول</a>
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

