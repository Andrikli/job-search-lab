import React from 'react';

// Компонент отримує дані через props (Завдання 2 методички)
function VacancyCard({ job, isApplied, onApply }) {
    return (
        <article className="job-card">
            <img src="/working-time.png" alt="Logo" className="comp-logo" />
            <h3>{job.title}</h3>
            <p className="company">{job.company}</p>
            <p className="location">📍 {job.location}</p>

            <div className="requirements">
                <h4>Вимоги:</h4>
                <ul>
                    {job.req.map((r, i) => <li key={i}>{r}</li>)}
                </ul>
            </div>

            <div className="card-footer" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <span className="salary">{job.salary}</span>
                    <button
                        className="apply-btn"
                        onClick={() => onApply(job)}
                        style={isApplied ? { background: '#10b981' } : {}}
                        disabled={isApplied}
                    >
                        {isApplied ? 'Подано' : 'Відгукнутися'}
                    </button>
                </div>
                <div style={{ textAlign: 'right', width: '100%' }}>
                    <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                        📅 Опубліковано: {job.date}
                    </span>
                </div>
            </div>
        </article>
    );
}

export default VacancyCard;