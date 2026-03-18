import React, { useState } from 'react';
import VacancyCard from './VacancyCard';
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

function VacanciesPage({ appliedJobs, setAppliedJobs }) {
    const [category, setCategory] = useState("Всі категорії");
    const [location, setLocation] = useState("Всі локації");
    const [salary, setSalary] = useState("Будь-яка");
    const [isSortedAsc, setIsSortedAsc] = useState(false); // Для Варіанта 11
    const [limit, setLimit] = useState(3);

    let displayedJobs = allVacancies.filter(job => {
        const matchCat = (category === "Всі категорії" || job.category === category);
        const matchLoc = (location === "Всі локації" || job.location === location);
        const matchSal = (salary === "Будь-яка" || job.salaryLevel === salary);
        return matchCat && matchLoc && matchSal;
    });

    if (isSortedAsc) {
        displayedJobs.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    const handleApply = (job) => {
        // Перевіряємо, чи ще не подавалися на цю вакансію
        if (!appliedJobs.find(j => j.id === job.id)) {

            // Генеруємо поточну дату та час у зручному форматі
            const currentDate = new Date().toLocaleString('uk-UA', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            // Створюємо копію вакансії і додаємо туди нове поле appliedDate
            const jobWithDate = { ...job, appliedDate: currentDate };

            // Зберігаємо в стан
            setAppliedJobs([...appliedJobs, jobWithDate]);
            alert(`Успішно! Ваш відгук на позицію "${job.title}" надіслано.`);
        }
    };

    return (
        <>
            <section id="search" className="hero">
                <h1>Знайдіть роботу своєї мрії сьогодні</h1>
                <p>Шукайте тисячі можливостей від провідних компаній світу</p>
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
                <h2>Останні вакансії</h2>
                <button className="more-btn" onClick={() => setIsSortedAsc(!isSortedAsc)} style={{marginBottom: '20px'}}>
                    {isSortedAsc ? "Скинути сортування" : "Сортувати за датою (новинки)"}
                </button>
                <div className="job-grid">
                    {displayedJobs.slice(0, limit).map(job => (
                        <VacancyCard
                            key={job.id}
                            job={job}
                            isApplied={appliedJobs.some(j => j.id === job.id)}
                            onApply={handleApply}
                        />
                    ))}
                </div>
                {limit < displayedJobs.length && (
                    <button className="more-btn" onClick={() => setLimit(allVacancies.length)}>Показати більше вакансій</button>
                )}
            </section>
        </>
    );
}

export default VacanciesPage;