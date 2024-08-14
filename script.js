document.addEventListener('DOMContentLoaded', () => {
    const displayMessage = (message, isError = false) => {
        const responseElement = document.getElementById('response-message');
        responseElement.textContent = message;
        responseElement.style.color = isError ? 'red' : 'green';
    };

    // Register form handler
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(registerForm);
            const data = {
                username: formData.get('username'),
                email: formData.get('email'),
                password: formData.get('password')
            };

            try {
                const response = await fetch('https://user-management-api-394t.onrender.com/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                const result = await response.json();
                if (response.ok) {
                    displayMessage('Registration successful!');
                    setTimeout(() => window.location.href = 'login.html', 2000);
                } else {
                    displayMessage(result.message || 'Registration failed', true);
                }
            } catch (error) {
                displayMessage('Registration failed: ' + error.message, true);
            }
        });
    }

    // Login form handler
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const data = {
                email: formData.get('email'),
                password: formData.get('password')
            };

            try {
                const response = await fetch('https://user-management-api-394t.onrender.com/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                    credentials: 'include'
                });
                const result = await response.json();
                if (response.ok) {
                    displayMessage('Login successful!');
                    setTimeout(() => window.location.href = 'index.html', 2000);
                } else {
                    displayMessage(result.message || 'Login failed', true);
                }
            } catch (error) {
                displayMessage('Login failed: ' + error.message, true);
            }
        });
    }

    // Forgot passcode form handler
    const forgotPasscodeForm = document.getElementById('forgot-passcode-form');
    if (forgotPasscodeForm) {
        forgotPasscodeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(forgotPasscodeForm);
            const data = {
                email: formData.get('email')
            };

            try {
                const response = await fetch('https://user-management-api-394t.onrender.com/api/forgot-passcode', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                    credentials: 'include'
                });
                const result = await response.json();
                if (response.ok) {
                    displayMessage('Password reset instructions sent!');
                    setTimeout(() => window.location.href = 'login.html', 2000);
                } else {
                    displayMessage(result.message || 'Failed to send reset instructions', true);
                }
            } catch (error) {
                displayMessage('Error: ' + error.message, true);
            }
        });
    }

    // Reset passcode form handler
    const resetPasscodeForm = document.getElementById('reset-passcode-form');
    if (resetPasscodeForm) {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');

        resetPasscodeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(resetPasscodeForm);
            const data = {
                newPassword: formData.get('newPassword')
            };

            try {
                const response = await fetch(`https://user-management-api-394t.onrender.com/api/reset-passcode/${token}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data),
                    credentials: 'include'
                });
                const result = await response.json();
                if (response.ok) {
                    displayMessage('Password reset successful!');
                    setTimeout(() => window.location.href = 'login.html', 2000);
                } else {
                    displayMessage(result.message || 'Password reset failed', true);
                }
            } catch (error) {
                displayMessage('Password reset failed: ' + error.message, true);
            }
        });
    }
});
