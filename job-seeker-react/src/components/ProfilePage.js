import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

function ProfilePage({ appliedJobs, setAppliedJobs, user }) {
    // 1. Повертаємо твої реальні дані як початковий стан
    const [experienceText, setExperienceText] = useState('Senior Software Engineer\nTechCorp Inc. • 2020 - Тепер\nSoftware Engineer\nStartupXYZ • 2017 - 2020');
    const [skillsText, setSkillsText] = useState('React & TypeScript, Node.js & Express, Cloud Infrastructure (AWS)');
    const [education, setEducation] = useState('Computer Science\nНаціональний університет «Львівська політехніка» • 2024 - 2028');

    const [isEditing, setIsEditing] = useState(false);

    // Завантаження даних з Firebase (якщо вони там вже є)
    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    if (data.experience) setExperienceText(data.experience);
                    if (data.skills) setSkillsText(data.skills);
                    if (data.education) setEducation(data.education);
                }
            }
        };
        fetchProfile();
    }, [user]);

    // Збереження оновлених даних
    const handleSave = async () => {
        if (user) {
            try {
                await setDoc(doc(db, 'users', user.uid), {
                    experience: experienceText,
                    skills: skillsText,
                    education: education,
                    email: user.email
                }, { merge: true });
                alert('Профіль синхронізовано з Firebase!');
                setIsEditing(false);
            } catch (error) {
                alert('Помилка: ' + error.message);
            }
        }
    };

    const cancelApplication = (index, jobTitle) => {
        const newJobs = [...appliedJobs];
        newJobs.splice(index, 1);
        setAppliedJobs(newJobs);
        alert(`Заявку на вакансію "${jobTitle}" скасовано.`);
    };

    return (
        <section id="profile" className="profile-section">
            <h2>Ваш профіль </h2>
            <div className="profile-content">
                <div className="profile-left">
                    <div className="personal-info">
                        <img src={process.env.PUBLIC_URL + '/user.png'} alt="User" className="user-photo" />
                        <h3>Ільків Андрій</h3>
                        <p className="user-title">Senior Software Engineer</p>
                        <div className="user-contacts">
                            <p>📩 {user?.email}</p>
                            <p>📞 +380 50 647 75 27</p>
                            <p>📍 Львів, Україна</p>
                        </div>
                    </div>

                    <div className="experience-edu">
                        <div className="exp-item">
                            <h4>💼 Досвід роботи</h4>
                            {isEditing ? (
                                <textarea value={experienceText} onChange={(e) => setExperienceText(e.target.value)} style={{ width: '100%', minHeight: '100px' }} />
                            ) : (
                                <p style={{ whiteSpace: 'pre-line' }}>{experienceText}</p>
                            )}
                        </div>
                        <div className="edu-item">
                            <h4>🎓 Освіта</h4>
                            {isEditing ? (
                                <textarea value={education} onChange={(e) => setEducation(e.target.value)} style={{ width: '100%', minHeight: '60px' }} />
                            ) : (
                                <p style={{ whiteSpace: 'pre-line' }}>{education}</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="profile-right">
                    <div className="skills-card">
                        <h3>🛠 Технічні навички</h3>
                        {isEditing ? (
                            <input type="text" value={skillsText} onChange={(e) => setSkillsText(e.target.value)} style={{ width: '100%', padding: '10px' }} />
                        ) : (
                            skillsText.split(',').map((skill, idx) => (
                                <div key={idx} className="skill">
                                    <div className="skill-info"><span>{skill.trim()}</span></div>
                                    <div className="bar"><div className="fill" style={{ width: '90%' }}></div></div>
                                </div>
                            ))
                        )}
                    </div>

                    <div style={{ marginTop: '15px' }}>
                        {isEditing ? (
                            <button onClick={handleSave} className="login-btn" style={{background: '#28a745'}}>Зберегти в Firebase</button>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="login-btn">Редагувати дані</button>
                        )}
                    </div>

                    {/* Повертаємо завантаження резюме */}
                    <div className="resume-download-card" style={{ marginTop: '20px' }}>
                        <p>Завантажте повне резюме з детальним описом проектів.</p>
                        <a href={process.env.PUBLIC_URL + "/resume.pdf"} className="download-link" download>Download Resume (PDF)</a>
                    </div>

                    {/* Твоя історія відгуків */}
                    <div className="applied-history-card">
                        <h3>📋 Мої подачі ({appliedJobs.length})</h3>
                        <div id="appliedList">
                            {appliedJobs.length === 0 ? (
                                <p className="empty-msg">Ви ще не подали жодної заявки.</p>
                            ) : (
                                [...appliedJobs].reverse().map((job, index) => (
                                    <div key={job.id} className="applied-item">
                                        <div>
                                            <strong>{job.title}</strong> — {job.company}
                                            <span style={{display: 'block', fontSize: '11px'}}>🕒 {job.appliedDate}</span>
                                        </div>
                                        <button className="cancel-btn" onClick={() => cancelApplication(appliedJobs.findIndex(j => j.id === job.id), job.title)}>Скасувати</button>
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