import React, { useState, useEffect } from 'react';
import VacancyCard from './VacancyCard';
import { db } from '../firebase'; // твоє підключення до Firebase
import { collection, getDocs } from 'firebase/firestore'; // методи для роботи з БД

function VacanciesPage({ appliedJobs, setAppliedJobs }) {
    // Стан для вакансій, завантажених з хмари (замість статичного масиву)
    const [vacancies, setVacancies] = useState([]);
    const [category, setCategory] = useState("Всі категорії");
    const [location, setLocation] = useState("Всі локації");
    const [salary, setSalary] = useState("Будь-яка");
    const [isSortedAsc, setIsSortedAsc] = useState(false);
    const [limit, setLimit] = useState(3);

    // 1. Читання даних з Firestore (Завдання 2 та 3 за методичкою)
    useEffect(() => {
        const fetchVacancies = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "vacancies"));
                const jobsList = querySnapshot.docs.map(doc => ({
                    id: doc.id, // використовуємо ID документа з Firebase
                    ...doc.data()
                }));
                setVacancies(jobsList);
            } catch (error) {
                console.error("Помилка завантаження з бази даних:", error);
            }
        };
        fetchVacancies();
    }, []);

    // 2. Фільтрація даних, отриманих з хмарної бази
    let displayedJobs = vacancies.filter(job => {
        const matchCat = (category === "Всі категорії" || job.category === category);
        const matchLoc = (location === "Всі локації" || job.location === location);
        const matchSal = (salary === "Будь-яка" || job.salaryLevel === salary);
        return matchCat && matchLoc && matchSal;
    });

    // 3. Сортування за датою публікації (Вимога Варіанта 11)
    if (isSortedAsc) {
        displayedJobs.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    const handleApply = (job) => {
        if (!appliedJobs.find(j => j.id === job.id)) {
            const currentDate = new Date().toLocaleString('uk-UA', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            const jobWithDate = { ...job, appliedDate: currentDate };
            setAppliedJobs([...appliedJobs, jobWithDate]);
            alert(`Успішно! Ваш відгук на позицію "${job.title}" надіслано.`);
        }
    };

    return (
        <>
            <section id="search" className="hero">
                <h1>Знайдіть роботу своєї мрії сьогодні</h1>
                <p>Дані завантажуються в реальному часі з Firebase Firestore</p>
                <form className="search-form" id="filterForm" onSubmit={(e) => e.preventDefault()}>
                    <div className="search-filters">
                        <label>Категорія</label>
                        <select value={category} onChange={(e) => setCategory(e.target.value)}>
                            <option>Всі категорії</option>
                            <option>Розробка</option>
                            <option>Дизайн</option>
                            <option>Менеджмент</option>
                            <option>Аналітика</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Локація</label>
                        <select value={location} onChange={(e) => setLocation(e.target.value)}>
                            <option>Всі локації</option>
                            <option>Львів</option>
                            <option>Київ</option>
                            <option>Віддалено</option>
                        </select>
                    </div>
                    <div className="filter-group">
                        <label>Зарплата</label>
                        <select value={salary} onChange={(e) => setSalary(e.target.value)}>
                            <option>Будь-яка</option>
                            <option>$0 - $50k</option>
                            <option>$50k - $100k</option>
                            <option>$100k+</option>
                        </select>
                    </div>
                </form>
            </section>

            <section id="vacancies" className="vacancies">
                <h2>Останні вакансії (Cloud Firestore)</h2>
                <button className="more-btn" onClick={() => setIsSortedAsc(!isSortedAsc)} style={{marginBottom: '20px'}}>
                    {isSortedAsc ? "Скинути сортування" : "Сортувати за датою (новинки)"}
                </button>

                <div className="job-grid">
                    {displayedJobs.length > 0 ? (
                        displayedJobs.slice(0, limit).map(job => (
                            <VacancyCard
                                key={job.id}
                                job={job}
                                isApplied={appliedJobs.some(j => j.id === job.id)}
                                onApply={handleApply}
                            />
                        ))
                    ) : (
                        <p>Завантаження вакансій з бази даних...</p>
                    )}
                </div>

                {limit < displayedJobs.length && (
                    <button className="more-btn" onClick={() => setLimit(vacancies.length)}>
                        Показати більше вакансій
                    </button>
                )}
            </section>
        </>
    );
}

export default VacanciesPage;