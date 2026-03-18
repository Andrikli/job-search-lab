import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VacanciesPage from './components/VacanciesPage';
import ProfilePage from './components/ProfilePage';
import './App.css';

function App() {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <Router>
            <header>
                <div className="logo"><strong>JobSeeker</strong></div>
                <nav>
                    <ul>
                        {/* Пошук роботи перекидає на головну і скролить на самий верх (до фільтрів) */}
                        <li>
                            <Link to="/" onClick={() => {
                                setTimeout(() => {
                                    const searchBlock = document.getElementById('search');
                                    if (searchBlock) searchBlock.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}>
                                Пошук роботи
                            </Link>
                        </li>

                        {/* Вакансії перекидають на головну і скролять до сітки вакансій */}
                        <li>
                            <Link to="/" onClick={() => {
                                setTimeout(() => {
                                    const vacanciesBlock = document.getElementById('vacancies');
                                    if (vacanciesBlock) vacanciesBlock.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}>
                                Вакансії
                            </Link>
                        </li>

                        {/* Профіль просто відкриває сторінку профілю */}
                        <li>
                            <Link to="/profile" onClick={() => window.scrollTo(0, 0)}>
                                Мій профіль
                            </Link>
                        </li>
                    </ul>
                </nav>
                <button className="login-btn">Увійти</button>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<VacanciesPage appliedJobs={appliedJobs} setAppliedJobs={setAppliedJobs} />} />
                    <Route path="/profile" element={<ProfilePage appliedJobs={appliedJobs} setAppliedJobs={setAppliedJobs} />} />
                </Routes>
            </main>

            {/* Твій старий чат, переписаний на React */}
            {!isChatOpen && (
                <button id="openChatBtn" className="open-chat-btn" style={{display: 'block'}} onClick={() => setIsChatOpen(true)}>
                    💬 Чат підтримки
                </button>
            )}

            {isChatOpen && (
                <div className="side-chat" style={{display: 'flex'}}>
                    <div className="chat-header">
                        <span>Чат з підтримкою</span>
                        <button className="close-chat" style={{background: 'none', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer'}} onClick={() => setIsChatOpen(false)}>&times;</button>
                    </div>
                    <div className="chat-messages">
                        <div className="msg bot">Привіт! Чим можу допомогти?</div>
                        <div className="msg user">Шукаю вакансії без досвіду роботи</div>
                        <div className="msg bot">Ось найкращі варіанти для вас...</div>
                        <div className="msg bot">Напишіть який варіант найкраще вам підходить</div>
                    </div>
                    <div className="chat-input">
                        <input type="text" placeholder="Напишіть повідомлення......" />
                        <button id="sendMsgBtn">➤</button>
                    </div>
                </div>
            )}

            <footer>
                <div className="footer-content">
                    <div className="footer-about">
                        <h3>JobSeeker</h3>
                        <p>Ваш надійний партнер у пошуку роботи.</p>
                    </div>
                    <div className="footer-contact">
                        <h3>Контакти</h3>
                        <p>вул Лукаша, 5, Львів</p>
                        <p>+380 (32) 123-45-67</p>
                        <p>support@jobseeker.com</p>
                    </div>
                </div>
                <p className="copy">&copy; 2026 JobSeeker. Всі права захищено.</p>
            </footer>
        </Router>
    );
}

export default App;