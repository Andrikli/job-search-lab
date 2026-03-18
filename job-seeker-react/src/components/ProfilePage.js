import React from 'react';

function ProfilePage({ appliedJobs, setAppliedJobs }) {
    const cancelApplication = (index, jobTitle) => {
        const newJobs = [...appliedJobs];
        newJobs.splice(index, 1);
        setAppliedJobs(newJobs);
        alert(`Заявку на вакансію "${jobTitle}" скасовано.`);
    };

    return (
        <section id="profile" className="profile-section">
            <h2>Ваш професійний профіль</h2>
            <div className="profile-content">
                <div className="profile-left">
                    <div className="personal-info">
                        <img src="/user.png" alt="User" className="user-photo" />
                        <h3>Ільків Андрій</h3>
                        <p className="user-title">Senior Software Engineer</p>
                        <div className="user-contacts">
                            <p>📩 andopkeefmf@gmail.com</p>
                            <p>📞 +380 50 647 75 27</p>
                            <p>📍 Львів, Україна</p>
                        </div>
                    </div>

                    <div className="experience-edu">
                        <div className="exp-item">
                            <h4>💼 Досвід роботи</h4>
                            <p><strong>Lead Developer</strong><br/>TechCorp Inc. • 2020 - Тепер</p>
                            <p><strong>Software Engineer</strong><br/>StartupXYZ • 2017 - 2020</p>
                        </div>
                        <div className="edu-item">
                            <h4>🎓 Освіта</h4>
                            <p><strong>Computer Science</strong><br/>Національний університет «Львівська політехніка» • 2024 - 2028</p>
                        </div>
                    </div>
                </div>

                <div className="profile-right">
                    <div className="skills-card">
                        <h3>🛠 Технічні навички</h3>
                        <div className="skill">
                            <div className="skill-info"><span>React & TypeScript</span><span>95%</span></div>
                            <div className="bar"><div className="fill" style={{ width: '95%' }}></div></div>
                        </div>
                        <div className="skill">
                            <div className="skill-info"><span>Node.js & Express</span><span>90%</span></div>
                            <div className="bar"><div className="fill" style={{ width: '90%' }}></div></div>
                        </div>
                        <div className="skill">
                            <div className="skill-info"><span>Cloud Infrastructure (AWS)</span><span>60%</span></div>
                            <div className="bar"><div className="fill" style={{ width: '60%' }}></div></div>
                        </div>
                    </div>

                    <div className="resume-download-card">
                        <p>Завантажте повне резюме з детальним описом проектів.</p>
                        <a href="/files/resume.pdf" className="download-link" download>Download Resume (PDF)</a>
                    </div>

                    <div className="applied-history-card">
                        <h3>📋 Мої подачі ({appliedJobs.length})</h3>
                        <div id="appliedList">
                            {appliedJobs.length === 0 ? (
                                <p className="empty-msg">Ви ще не подали жодної заявки.</p>
                            ) : (
                                // Створюємо копію масиву і перевертаємо його, щоб нові відгуки були зверху
                                [...appliedJobs].reverse().map((job, index) => (
                                    <div key={job.id} className="applied-item" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', padding: '12px', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0'}}>
                                        <div>
                                            <span style={{display: 'block', fontSize: '15px'}}><strong>{job.title}</strong> — {job.company}</span>
                                            {/* Виводимо збережену дату подання */}
                                            <span style={{fontSize: '12px', color: '#64748b'}}>🕒 Подано: {job.appliedDate}</span>
                                        </div>

                                        {/* Кнопка скасування (шукаємо оригінальний індекс у неперевернутому масиві) */}
                                        <button
                                            className="cancel-btn"
                                            onClick={() => {
                                                const originalIndex = appliedJobs.findIndex(j => j.id === job.id);
                                                cancelApplication(originalIndex, job.title);
                                            }}
                                            style={{background: '#ef4444', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer'}}
                                        >
                                            Скасувати
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProfilePage;