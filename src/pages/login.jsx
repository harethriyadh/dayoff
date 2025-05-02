import { Link } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react'; // Added useRef

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const messageRef = useRef(null); // Added useRef

    useEffect(() => {
        const checkSession = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem('authToken');
                if (token) {
                    const response = await fetch('https://subend.onrender.com/api/login', {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                        },
                    });

                    if (response.ok) {
                        const data = await response.json();
                        if (data.user) {
                            window.location.href = "/index";
                            return;
                        }
                    }
                    else if (response.status === 401) {
                        // setMessage('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مجدداً.'); // Alternative 1
                        displayMessage('انتهت صلاحية الجلسة، يرجى تسجيل الدخول مجدداً.'); // using displayMessage
                        localStorage.removeItem('authToken');
                    }
                    else {
                         setMessage('لقد انتهت الجلسة, يرجى إعادة تسجيل الدخول.'); // consistent message
                        localStorage.removeItem('authToken');
                    }
                }
            } catch (error) {
                console.error('Error checking session:', error);
                 setMessage('لقد انتهت الجلسة, يرجى إعادة تسجيل الدخول.'); // consistent message
            } finally {
                setLoading(false);
            }
        };

        const checkRememberedCredentials = () => {
            const remembered = localStorage.getItem('rememberMe') === 'true';
            if (remembered) {
                setUsername(localStorage.getItem('username') || '');
                setPassword(localStorage.getItem('password') || '');
                setRememberMe(true);
            }
        };

        checkSession();
        checkRememberedCredentials();
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true);
        setUsernameError('');
        setPasswordError('');


        let hasErrors = false;
        if (!username) {
            setUsernameError('اسم المستخدم مطلوب');
            hasErrors = true;
        }
        if (!password) {
            setPasswordError('كلمة المرور مطلوبة');
            hasErrors = true;
        }

        if (hasErrors) {
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
                let errorMessage = 'فشل تسجيل الدخول.';
                 if (response.status === 400)
                 {
                    setMessage("البيانات التي ادخلتها غير صحيحة")
                 }
                else if (errorData && errorData.message) {
                    errorMessage = errorData.message;
                }
                setMessage(errorMessage);
                throw new Error(errorMessage);
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
                }
                window.location.href = "./index";

            } else {
                setMessage(data.message || 'فشل تسجيل الدخول.');
            }
        } catch (error) {
            console.error('Login error:', error);
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

    // New function to display messages
    const displayMessage = (text) => {
        setMessage(text);
        if (messageRef.current) {
            // You can add animation here, e.g., using classList
            messageRef.current.classList.add('show'); // Example: show class
            setTimeout(() => {
                messageRef.current.classList.remove('show'); // Example: hide class
                setMessage(''); // Clear message after timeout
            }, 5000); // 5 seconds
        }
    };

    return (
        <div className="d-flex flex-column">
            <div className="page">
                <div className="container container-tight py-4">
                    <div className="text-center mb-4">
                        <Link to="/" className="navbar-brand navbar-brand-autodark">
                            {/* Add your logo here if needed */}
                        </Link>
                    </div>
                    <div className="card card-md thecard">
                        <div className="card-body">
                            <h2 className="h2 text-center mb-4">تسجيل الدخول إلى حسابك</h2>
                            <form id="loginForm" onSubmit={handleLogin} autoComplete="off" noValidate>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        id="username"
                                        className={`form-control ${usernameError ? 'is-invalid' : ''}`}
                                        placeholder="اسم المستخدم"
                                        autoComplete="off"
                                        value={username}
                                        onChange={(e) => {setUsername(e.target.value); setUsernameError('')}}
                                        required
                                    />
                                      {usernameError && <div className="invalid-feedback">{usernameError}</div>}
                                </div>
                                <div className="mb-2 inputfield">
                                    <label className="form-label">
                                    </label>
                                    <div className="input-group input-group-flat">
                                        <input
                                            type={passwordVisible ? 'text' : 'password'}
                                            id="password"
                                            className={`form-control password-input ${passwordError ? 'is-invalid' : ''}`}
                                            placeholder="كلمة المرور الخاصة بك"
                                            autoComplete="off"
                                            value={password}
                                            onChange={(e) => {setPassword(e.target.value); setPasswordError('')}}
                                            required
                                        />
                                        <span className="input-group-text">
                                            <button
                                                type="button"
                                                className="link-secondary password-toggle"
                                                title={passwordVisible ? "إخفاء كلمة المرور" : "إظهار كلمة المرور"}
                                                onClick={togglePasswordVisibility}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="icon icon-1"
                                                    width="24"
                                                    height="24"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth="2"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    {passwordVisible ? (
                                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.56" />
                                                    ) : (
                                                        <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
                                                    )}
                                                    {!passwordVisible && <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />}
                                                </svg>
                                            </button>
                                        </span>
                                    </div>
                                    {passwordError && <div className="invalid-feedback">{passwordError}</div>}
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
                                    <div className="alert alert-danger" role="alert" ref={messageRef}> {/* Added ref */}
                                        <div className="d-flex">
                                            <div>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="icon alert-icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0-18 0"></path>
                                                    <path d="M12 8v8"></path>
                                                    <path d="M12 16h.01"></path>
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="alert-text">
                                                    {message}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="form-footer">
                                    <button type="submit" className="btn btn-primary w-100 thebutton" disabled={loading}>
                                        {loading ? 'جاري التسجيل...' : 'تسجيل الدخول'}
                                    </button>
                                </div>
                                <div className="text-center text-muted mt-3">
                                    ليس لديك حساب؟ <Link to="/register">تسجيل الدخول</Link>
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
