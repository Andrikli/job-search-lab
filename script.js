
const allVacancies = [
    { title: "Senior Frontend Developer", company: "TechCorp Inc.", location: "Львів", salary: "$120k - $160k", salaryLevel: "$100k+", category: "Розробка", req: ["5+ років досвіду з React", "TypeScript proficiency"] },
    { title: "UX/UI Designer", company: "Creative Studios", location: "Віддалено", salary: "$90k - $120k", salaryLevel: "$50k - $100k", category: "Дизайн", req: ["Figma mastery", "3+ роки досвіду"] },
    { title: "Product Manager", company: "Innovation Labs", location: "Віддалено", salary: "$110k - $145k", salaryLevel: "$100k+", category: "Менеджмент", req: ["Agile methodology", "4+ роки досвіду"] },
    { title: "Junior Data Analyst", company: "SmartData", location: "Львів", salary: "$40k - $50k", salaryLevel: "$0 - $50k", category: "Аналітика", req: ["Базовий SQL", "Excel"] },
    { title: "Backend Engineer (Go)", company: "Cloud Systems", location: "Київ", salary: "$130k - $170k", salaryLevel: "$100k+", category: "Розробка", req: ["3+ роки з Go", "Docker & Kubernetes"] },
    { title: "Marketing Specialist", company: "AdAgency", location: "Київ", salary: "$45k - $60k", salaryLevel: "$50k - $100k", category: "Менеджмент", req: ["Google Ads", "Facebook Pixel"] },
    { title: "QA Automation", company: "TestHouse", location: "Львів", salary: "$85k - $110k", salaryLevel: "$50k - $100k", category: "Розробка", req: ["Selenium", "Java/Python"] },
    { title: "Business Analyst", company: "FinTech", location: "Київ", salary: "$95k - $130k", salaryLevel: "$50k - $100k", category: "Аналітика", req: ["BPMN", "UML", "Data modeling"] },
    { title: "Lead Web Designer", company: "WebFlow", location: "Віддалено", salary: "$115k", salaryLevel: "$100k+", category: "Дизайн", req: ["Webflow mastery", "Typography"] },
    { title: "Trainee Python Dev", company: "StartUp", location: "Львів", salary: "$30k", salaryLevel: "$0 - $50k", category: "Розробка", req: ["Python Basics", "FastAPI"] }
];

let appliedVacancies = [];
let currentDisplayLimit = 3;
let currentFilteredData = [...allVacancies];

const jobGrid = document.getElementById('jobGrid');
const showMoreBtn = document.getElementById('showMoreBtn');

function renderVacancies(data, limit) {
    jobGrid.innerHTML = ''; // Очищення перед рендером [cite: 177]

    for (let i = 0; i < data.length && i < limit; i++) {
        const job = data[i];
        const card = document.createElement('article'); // [cite: 107]
        card.className = 'job-card';

        // Перевірка статусу подачі [cite: 224]
        const isApplied = appliedVacancies.some(v => v.title === job.title);

        card.innerHTML = `
            <img src="working-time.png" alt="Logo" class="comp-logo">
            <h3>${job.title}</h3>
            <p class="company">${job.company}</p>
            <p class="location">📍 ${job.location}</p>
            <div class="requirements">
                <h4>Вимоги:</h4>
                <ul>
                    ${job.req ? job.req.map(r => `<li>${r}</li>`).join('') : ''}
                </ul>
            </div>
            <div class="card-footer">
                <span class="salary">${job.salary}</span>
                <button class="apply-btn" ${isApplied ? 'disabled style="background: #10b981"' : ''}>
                    ${isApplied ? 'Подано' : 'Відгукнутися'}
                </button>
            </div>
        `;

        const applyBtn = card.querySelector('.apply-btn');
        applyBtn.addEventListener('click', function() {
            if (!isApplied) {
                applyToJob(job);
            }
        });

        jobGrid.appendChild(card); // [cite: 108]
    }

    // Керування кнопкою "Більше" [cite: 270]
    if (limit >= data.length) {
        showMoreBtn.style.display = 'none';
    } else {
        showMoreBtn.style.display = 'block';
    }
}

function applyToJob(job) {
    appliedVacancies.push(job);
    alert(`Успішно! Ваш відгук на позицію "${job.title}" надіслано.`); //
    renderVacancies(currentFilteredData, currentDisplayLimit);
    renderAppliedHistory();
}

function renderAppliedHistory() {
    const container = document.getElementById('appliedList');
    if (!container) return;

    if (appliedVacancies.length === 0) {
        container.innerHTML = '<p class="empty-msg">Ви ще не подали жодної заявки.</p>';
        return;
    }

    let html = "";
    let i = 0;
    while (i < appliedVacancies.length) { // Використання циклу while [cite: 210]
        const job = appliedVacancies[i];
        html += `
            <div class="applied-item">
                <span><strong>${job.title}</strong> — ${job.company}</span>
                <button class="cancel-btn" onclick="cancelApplication(${i})">Скасувати</button>
            </div>
        `;
        i++;
    }
    container.innerHTML = html;
}

window.cancelApplication = function(index) {
    const jobTitle = appliedVacancies[index].title;
    appliedVacancies.splice(index, 1);
    alert(`Заявку на вакансію "${jobTitle}" скасовано.`);
    renderVacancies(currentFilteredData, currentDisplayLimit);
    renderAppliedHistory();
};


const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', function(event) {
    event.preventDefault(); // [cite: 198]

    const selectedCat = document.getElementById('categorySelect').value;
    const selectedLoc = document.getElementById('locationSelect').value;
    const selectedSal = document.getElementById('salarySelect').value;

    currentFilteredData = allVacancies.filter(job => {
        const matchCat = (selectedCat === "Всі категорії" || job.category === selectedCat);
        const matchLoc = (selectedLoc === "Всі локації" || job.location === selectedLoc);
        const matchSal = (selectedSal === "Будь-яка" || job.salaryLevel === selectedSal);
        return matchCat && matchLoc && matchSal;
    });

    currentDisplayLimit = 3;
    renderVacancies(currentFilteredData, currentDisplayLimit);
});

showMoreBtn.addEventListener('click', () => {
    currentDisplayLimit = currentFilteredData.length;
    renderVacancies(currentFilteredData, currentDisplayLimit);
});

const sideChat = document.querySelector('.side-chat');
const closeChatBtn = document.querySelector('.close-chat');
const openChatBtn = document.getElementById('openChatBtn');

function toggleChat() {
    if (sideChat.style.display === 'none' || sideChat.style.display === '') {
        sideChat.style.display = 'flex';
        openChatBtn.style.display = 'none';
    } else {
        sideChat.style.display = 'none';
        openChatBtn.style.display = 'block';
    }
}

closeChatBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleChat();
});

openChatBtn.addEventListener('click', toggleChat);

renderVacancies(currentFilteredData, currentDisplayLimit);
renderAppliedHistory();