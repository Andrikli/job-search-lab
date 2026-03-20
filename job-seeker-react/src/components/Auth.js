import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);

    const handleAuth = async (e) => {
        e.preventDefault();
        try {
            if (isRegister) {
                await createUserWithEmailAndPassword(auth, email, password);
                alert("Реєстрація успішна!");
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            alert("Помилка: " + error.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{isRegister ? "Створити акаунт" : "Вхід у систему"}</h2>
                <form className="auth-form" onSubmit={handleAuth}>
                    <input
                        type="email"
                        className="auth-input"
                        placeholder="Електронна пошта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="auth-input"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="auth-submit-btn">
                        {isRegister ? "Зареєструватися" : "Увійти"}
                    </button>
                </form>
                <button
                    className="auth-switch-btn"
                    onClick={() => setIsRegister(!isRegister)}
                >
                    {isRegister ? "Вже є акаунт? Увійти" : "Немає акаунту? Реєстрація"}
                </button>
            </div>
        </div>
    );
}

export default Auth;