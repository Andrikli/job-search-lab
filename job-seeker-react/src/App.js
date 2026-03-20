import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import VacanciesPage from './components/VacanciesPage';
import ProfilePage from './components/ProfilePage';
import './App.css';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Auth from './components/Auth';

import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

function App() {
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [user, setUser] = useState(null);

    // Слідкуємо за зміною статусу авторизації
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Функція виходу
    const handleLogout = async () => {
        await signOut(auth);
        alert("Ви вийшли з системи");
    };

    const uploadAllVacancies = async () => {
        const allVacancies = [
            { id: 1, title: "Senior Frontend Developer", company: "TechCorp Inc.", location: "Львів", salary: "$120k", date: "2026-03-10", category: "Розробка", salaryLevel: "$100k+", req: ["React", "TypeScript"] },
            { id: 2, title: "UX/UI Designer", company: "Creative Studios", location: "Віддалено", salary: "$90k", date: "2026-03-05", category: "Дизайн", salaryLevel: "$50k - $100k", req: ["Figma", "UI Kits"] },
            { id: 3, title: "Product Manager", company: "Innovation Labs", location: "Віддалено", salary: "$110k", date: "2026-03-11", category: "Менеджмент", salaryLevel: "$100k+", req: ["Agile", "Roadmaps"] },
            { id: 4, title: "Junior Data Analyst", company: "SmartData", location: "Львів", salary: "$45k", date: "2026-03-01", category: "Аналітика", salaryLevel: "$0 - $50k", req: ["SQL", "Excel"] },
            { id: 5, title: "Backend Engineer (Go)", company: "Cloud Systems", location: "Київ", salary: "$135k", date: "2026-03-09", category: "Розробка", salaryLevel: "$100k+", req: ["Go", "Docker"] },
            { id: 6, title: "Marketing Specialist", company: "AdAgency", location: "Київ", salary: "$55k", date: "2026-03-08", category: "Менеджмент", salaryLevel: "$50k - $100k", req: ["SEO", "Ads"] },
            { id: 7, title: "QA Automation", company: "TestHouse", location: "Львів", salary: "$85k", date: "2026-03-07", category: "Розробка", salaryLevel: "$50k - $100k", req: ["Selenium", "Java"] },
            { id: 8, title: "Business Analyst", company: "FinTech", location: "Київ", salary: "$95k", date: "2026-03-06", category: "Аналітика", salaryLevel: "$50k - $100k", req: ["UML", "BPMN"] },
            { id: 9, title: "Lead Web Designer", company: "WebFlow", location: "Віддалено", salary: "$115k", date: "2026-03-04", category: "Дизайн", salaryLevel: "$100k+", req: ["Webflow", "CSS"] },
            { id: 10, title: "Trainee Python Dev", company: "StartUp", location: "Львів", salary: "$30k", date: "2026-03-02", category: "Розробка", salaryLevel: "$0 - $50k", req: ["Python", "FastAPI"] },
            { id: 11, title: "DevOps Engineer", company: "OpsTeam", location: "Київ", salary: "$140k", date: "2026-03-12", category: "Розробка", salaryLevel: "$100k+", req: ["K8s", "CI/CD"] },
            { id: 12, title: "System Administrator", company: "IT-Support", location: "Львів", salary: "$60k", date: "2026-02-28", category: "Розробка", salaryLevel: "$50k - $100k", req: ["Linux", "Networks"] },
            { id: 13, title: "Java Developer", company: "Enterprise IT", location: "Київ", salary: "$125k", date: "2026-03-03", category: "Розробка", salaryLevel: "$100k+", req: ["Spring", "Hibernate"] },
            { id: 14, title: "SEO Expert", company: "SearchRank", location: "Віддалено", salary: "$70k", date: "2026-03-01", category: "Менеджмент", salaryLevel: "$50k - $100k", req: ["Analytics", "Linkbuilding"] },
            { id: 15, title: "Data Scientist", company: "AI Labs", location: "Київ", salary: "$150k", date: "2026-03-13", category: "Аналітика", salaryLevel: "$100k+", req: ["ML", "Pandas"] },
            { id: 16, title: "Project Manager", company: "BuildIt", location: "Львів", salary: "$105k", date: "2026-03-09", category: "Менеджмент", salaryLevel: "$100k+", req: ["Jira", "Scrum"] },
            { id: 17, title: "Cybersecurity Analyst", company: "SecureNet", location: "Віддалено", salary: "$130k", date: "2026-03-10", category: "Розробка", salaryLevel: "$100k+", req: ["PenTest", "SOC"] },
            { id: 18, title: "Mobile Dev (Swift)", company: "AppPro", location: "Київ", salary: "$110k", date: "2026-03-05", category: "Розробка", salaryLevel: "$100k+", req: ["iOS", "SwiftUI"] },
            { id: 19, title: "HR Manager", company: "PeopleFirst", location: "Львів", salary: "$50k", date: "2026-03-02", category: "Менеджмент", salaryLevel: "$0 - $50k", req: ["Sourcing", "Hiring"] },
            { id: 20, title: "Fullstack JS Dev", company: "NodeExperts", location: "Київ", salary: "$145k", date: "2026-03-14", category: "Розробка", salaryLevel: "$100k+", req: ["Node.js", "React"] }
        ];

        try {
            for (const job of allVacancies) {
                await addDoc(collection(db, "vacancies"), job);
            }
            alert("Всі 19 вакансій додано в Firebase!");
        } catch (e) {
            alert("Помилка: " + e.message);
        }
    };

    return (
        <Router basename="/job-search-lab">
            <header>
                <div className="logo"><strong>JobSeeker</strong></div>
                <nav>
                    <ul>
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
                        <li>
                            <Link to="/profile" onClick={() => window.scrollTo(0, 0)}>
                                Мій профіль
                            </Link>
                        </li>
                    </ul>
                </nav>

                {/* Блок авторизації в хедері */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {user ? (
                        <>
                            <span style={{ color: 'white' }}>{user.email}</span>
                            <button className="login-btn" onClick={handleLogout}>Вийти</button>
                        </>
                    ) : (
                        <span style={{ color: 'white' }}>Не авторизовано</span>
                    )}
                </div>
            </header>

            <main>
                {/* Якщо користувач НЕ авторизований — показуємо форму Auth, інакше — контент сайту */}
                {!user ? (
                    <Auth />
                ) : (
                    <Routes>
                        <Route path="/" element={<VacanciesPage appliedJobs={appliedJobs} setAppliedJobs={setAppliedJobs} />} />
                        <Route path="/profile" element={<ProfilePage appliedJobs={appliedJobs} setAppliedJobs={setAppliedJobs} user={user} />} />
                    </Routes>
                )}
            </main>

            {/* Чат підтримки */}
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