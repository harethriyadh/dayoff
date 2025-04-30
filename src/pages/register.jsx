import React, { useState } from 'react';
import { Link } from 'gatsby'; // Import the Link component from Gatsby
import '../styles/css/tabler.min.css';
import '../styles/css/tabler-flags.min.css';
import '../styles/css/tabler-socials.min.css';
import '../styles/css/tabler-payments.min.css';
import '../styles/css/tabler-vendors.min.css';
import '../styles/css/tabler-marketing.min.css';
import '../styles/css/demo.min.css';
import '../styles/rtl.css';

function RegisterPage() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [role, setRole] = useState('employee'); // Default role
    const [availableDaysOff, setAvailableDaysOff] = useState(0); // Initial days off

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://subend.onrender.com/api/registr', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, username, password, role, availableDaysOff }), // Sending as a number now
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed.');
            }

            const data = await response.json();
            alert(data.message || 'Registration successful! Please log in.');
            window.location.href = "/login"; // Redirect on success
        } catch (error) {
            console.error('Registration error:', error);
            alert('An error occurred during registration: ' + error.message);
        }
    };

    const togglePasswordVisibility = (e) => {
        e.preventDefault();
        setPasswordVisible(!passwordVisible);
    };

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleDaysOffChange = (e) => {
        setAvailableDaysOff(parseInt(e.target.value, 10) || 0);
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
                    <div className="card card-md">
                        <div className="card-body">
                            <h2 className="h2 text-center mb-4">انشاء حساب جديد</h2>
                            <form id="registerForm" onSubmit={handleRegister} autoComplete="off" noValidate>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control"
                                        placeholder="اسمك الثنائي"
                                        autoComplete="off"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
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
                                <div className="mb-3">
                                    <div className="input-group input-group-flat">
                                        <input
                                            type={passwordVisible ? 'text' : 'password'}
                                            id="password"
                                            className="form-control password-input"
                                            placeholder="كلمة المرور"
                                            autoComplete="off"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <span className="input-group-text">
                                            <a
                                                href="javascript:void(0)"
                                                className="link-secondary password-toggle"
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

                                <div className="mb-3">
                                    <label className="form-label">الدور</label>
                                    <select
                                        className="form-select"
                                        value={role}
                                        onChange={handleRoleChange}
                                    >
                                        <option value="employee">موظف</option>
                                        <option value="manager">مدير</option>
                                        <option value="leader">قائد</option>
                                        <option value="admin">مسؤول</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">أيام الإجازة المتاحة</label>
                                    <input
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        value={availableDaysOff}
                                        onChange={handleDaysOffChange}
                                    />
                                </div>

                                <div className="form-footer">
                                    <button type="submit" className="btn btn-primary w-100">
                                        انشاء حساب
                                    </button>
                                </div>
                                <div className="text-center text-muted mt-3">
                                    لديك حساب بالفعل؟ <Link to="/login">تسجيل الدخول</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;