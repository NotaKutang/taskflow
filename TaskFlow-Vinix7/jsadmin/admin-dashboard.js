// Render Dashboard Admin
function renderAdminDashboard(container) {
    // Hitung statistik
    const totalUsers = adminData.participants.length;
    const totalLogbooks = adminData.tasks.logbooks.length;
    const totalWeeklyTasks = adminData.tasks.weeklyTasks.length;
    
    const pendingLogbooks = adminData.tasks.logbooks.filter(logbook => 
        (logbook.status === 'open' || logbook.status === 'overdue') && !logbook.submittedDate
    ).length;
    
    const pendingWeeklyTasks = adminData.tasks.weeklyTasks.filter(task => 
        (task.status === 'open' || task.status === 'overdue') && !task.submittedDate
    ).length;
    
    const submittedWeeklyTasks = adminData.tasks.weeklyTasks.filter(task => 
        task.submittedDate && !task.grade
    ).length;
    
    const gradedWeeklyTasks = adminData.tasks.weeklyTasks.filter(task => 
        task.grade !== null
    ).length;
    
    container.innerHTML = `
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-title">Total Users</div>
                    <div class="stat-icon users">
                        <i class="ri-user-line"></i>
                    </div>
                </div>
                <div class="stat-value">${totalUsers}</div>
                <div class="stat-change positive">
                    <i class="ri-arrow-up-line"></i>
                    <span>+${totalUsers} registered</span>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-title">Logbook Tasks</div>
                    <div class="stat-icon tasks">
                        <i class="ri-book-line"></i>
                    </div>
                </div>
                <div class="stat-value">${totalLogbooks}</div>
                <div class="stat-change ${pendingLogbooks > 0 ? 'negative' : 'positive'}">
                    <i class="ri-${pendingLogbooks > 0 ? 'arrow-down' : 'arrow-up'}-line"></i>
                    <span>${pendingLogbooks} pending</span>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-title">Weekly Tasks</div>
                    <div class="stat-icon pending">
                        <i class="ri-task-line"></i>
                    </div>
                </div>
                <div class="stat-value">${totalWeeklyTasks}</div>
                <div class="stat-change ${pendingWeeklyTasks > 0 ? 'negative' : 'positive'}">
                    <i class="ri-${pendingWeeklyTasks > 0 ? 'arrow-down' : 'arrow-up'}-line"></i>
                    <span>${pendingWeeklyTasks} pending</span>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-header">
                    <div class="stat-title">To Be Graded</div>
                    <div class="stat-icon graded">
                        <i class="ri-graduation-cap-line"></i>
                    </div>
                </div>
                <div class="stat-value">${submittedWeeklyTasks}</div>
                <div class="stat-change ${submittedWeeklyTasks > 0 ? 'negative' : 'positive'}">
                    <i class="ri-${submittedWeeklyTasks > 0 ? 'arrow-down' : 'arrow-up'}-line"></i>
                    <span>${gradedWeeklyTasks} graded</span>
                </div>
            </div>
        </div>
        
        <div class="content-card">
            <div class="card-header">
                <h3 class="card-title">Recent Submissions</h3>
                <div class="card-actions">
                    <button class="btn btn-outline" onclick="viewAllSubmissions()">View All</button>
                </div>
            </div>
            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Task</th>
                            <th>Type</th>
                            <th>Submitted</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${getRecentSubmissions().map(submission => `
                            <tr>
                                <td>${submission.userName}</td>
                                <td>${submission.taskTitle}</td>
                                <td>${submission.type}</td>
                                <td>${formatDate(submission.submittedDate)}</td>
                                <td>
                                    <span class="status-badge ${submission.statusClass}">
                                        ${submission.statusText}
                                    </span>
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="btn btn-outline btn-sm" onclick="viewSubmission('${submission.taskType}', ${submission.taskId})">
                                            <i class="ri-eye-line"></i> View
                                        </button>
                                        ${submission.needsGrading ? `
                                            <button class="btn btn-primary btn-sm" onclick="gradeTask('${submission.taskType}', ${submission.taskId})">
                                                <i class="ri-pencil-line"></i> Grade
                                            </button>
                                        ` : ''}
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        
        <div class="content-card">
            <div class="card-header">
                <h3 class="card-title">Quick Actions</h3>
            </div>
            <div style="padding: 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <button class="btn btn-primary" onclick="loadAdminPage('users')">
                    <i class="ri-user-add-line"></i> Add New User
                </button>
                <button class="btn btn-success" onclick="loadAdminPage('logbooks')">
                    <i class="ri-book-line"></i> Create Logbook Task
                </button>
                <button class="btn btn-success" onclick="loadAdminPage('weekly-tasks')">
                    <i class="ri-task-line"></i> Create Weekly Task
                </button>
                <button class="btn btn-outline" onclick="loadAdminPage('grading')">
                    <i class="ri-graduation-cap-line"></i> Grade Submissions
                </button>
            </div>
        </div>
    `;
}

// Helper function untuk mendapatkan submission terbaru
function getRecentSubmissions() {
    const submissions = [];
    
    // Weekly tasks yang sudah disubmit
    adminData.tasks.weeklyTasks.forEach(task => {
        if (task.submittedDate) {
            submissions.push({
                userName: adminData.participants[0].name,
                taskTitle: task.title,
                type: 'Weekly Task',
                submittedDate: task.submittedDate,
                statusClass: task.grade ? 'status-graded' : 'status-pending',
                statusText: task.grade ? 'Graded' : 'Pending',
                needsGrading: !task.grade,
                taskType: 'weekly',
                taskId: task.id
            });
        }
    });
    
    // Logbooks yang sudah disubmit
    adminData.tasks.logbooks.forEach(logbook => {
        if (logbook.submittedDate) {
            submissions.push({
                userName: adminData.participants[0].name,
                taskTitle: logbook.title,
                type: 'Logbook',
                submittedDate: logbook.submittedDate,
                statusClass: logbook.score ? 'status-completed' : 'status-pending',
                statusText: logbook.score ? 'Completed' : 'Pending',
                needsGrading: false,
                taskType: 'logbook',
                taskId: logbook.id
            });
        }
    });
    
    // Urutkan berdasarkan tanggal submit (terbaru pertama)
    return submissions.sort((a, b) => new Date(b.submittedDate) - new Date(a.submittedDate)).slice(0, 5);
}

function viewAllSubmissions() {
    loadAdminPage('grading');
}