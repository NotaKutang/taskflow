// Render Logbook Tasks
function renderAdminLogbooks(container) {
    container.innerHTML = `
        <div class="content-card">
            <div class="card-header">
                <h3 class="card-title">Logbook Tasks (${adminData.tasks.logbooks.length})</h3>
                <div class="card-actions">
                    <button class="btn btn-primary" onclick="showAddLogbookModal()">
                        <i class="ri-add-line"></i> Add Task
                    </button>
                </div>
            </div>
            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Week</th>
                            <th>Title</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Submissions</th>
                            <th>Locked</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${adminData.tasks.logbooks.map(logbook => `
                            <tr>
                                <td>${logbook.week}</td>
                                <td>${logbook.title}</td>
                                <td>${formatDate(logbook.deadline)}</td>
                                <td>
                                    <span class="status-badge ${
                                        logbook.status === 'completed' ? 'status-completed' : 
                                        logbook.status === 'overdue' ? 'status-overdue' : 'status-pending'
                                    }">
                                        ${logbook.status === 'completed' ? 'Completed' : 
                                          logbook.status === 'overdue' ? 'Overdue' : 'Open'}
                                    </span>
                                </td>
                                <td>${logbook.submittedDate ? '1' : '0'}</td>
                                <td>${logbook.locked ? 'Yes' : 'No'}</td>
                                <td>
                                    <div class="action-buttons">
                                        ${logbook.locked ? `
                                            <button class="btn btn-outline btn-sm" onclick="editLogbook(${logbook.id})">
                                                <i class="ri-edit-line"></i> Edit
                                            </button>
                                            <button class="btn btn-outline btn-sm" onclick="deleteLogbook(${logbook.id})">
                                                <i class="ri-delete-bin-line"></i> Delete
                                            </button>
                                        ` : ''}
                                        <button class="btn btn-outline btn-sm" onclick="viewLogbookSubmissions(${logbook.id})" ${logbook.submittedDate ? '' : 'disabled'}>
                                            <i class="ri-eye-line"></i> View
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

// Render Weekly Tasks
function renderAdminWeeklyTasks(container) {
    container.innerHTML = `
        <div class="content-card">
            <div class="card-header">
                <h3 class="card-title">Weekly Tasks (${adminData.tasks.weeklyTasks.length})</h3>
                <div class="card-actions">
                    <button class="btn btn-primary" onclick="showAddWeeklyTaskModal()">
                        <i class="ri-add-line"></i> Add Task
                    </button>
                </div>
            </div>
            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Week</th>
                            <th>Title</th>
                            <th>Deadline</th>
                            <th>Status</th>
                            <th>Submissions</th>
                            <th>Graded</th>
                            <th>Locked</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${adminData.tasks.weeklyTasks.map(task => `
                            <tr>
                                <td>${task.week}</td>
                                <td>${task.title}</td>
                                <td>${formatDate(task.deadline)}</td>
                                <td>
                                    <span class="status-badge ${
                                        task.status === 'completed' ? 'status-completed' : 
                                        task.status === 'overdue' ? 'status-overdue' : 'status-pending'
                                    }">
                                        ${task.status === 'completed' ? 'Completed' : 
                                          task.status === 'overdue' ? 'Overdue' : 'Open'}
                                    </span>
                                </td>
                                <td>${task.submittedDate ? '1' : '0'}</td>
                                <td>${task.grade ? task.grade : '-'}</td>
                                <td>${task.locked ? 'Yes' : 'No'}</td>
                                <td>
                                    <div class="action-buttons">
                                        ${task.locked ? `
                                            <button class="btn btn-outline btn-sm" onclick="editWeeklyTask(${task.id})">
                                                <i class="ri-edit-line"></i> Edit
                                            </button>
                                            <button class="btn btn-outline btn-sm" onclick="deleteWeeklyTask(${task.id})">
                                                <i class="ri-delete-bin-line"></i> Delete
                                            </button>
                                        ` : ''}
                                        <button class="btn btn-outline btn-sm" onclick="viewWeeklyTaskSubmissions(${task.id})" ${task.submittedDate ? '' : 'disabled'}>
                                            <i class="ri-eye-line"></i> View
                                        </button>
                                        ${task.submittedDate && !task.grade ? `
                                            <button class="btn btn-primary btn-sm" onclick="gradeTask('weekly', ${task.id})">
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
    `;
}

// Modal untuk tambah logbook task
function showAddLogbookModal() {
    const nextWeek = Math.max(...adminData.tasks.logbooks.map(l => l.week)) + 1;
    const nextDeadline = new Date();
    nextDeadline.setDate(nextDeadline.getDate() + 7);
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'add-logbook-modal';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">Add Logbook Task</h3>
                <button class="close-modal" onclick="closeModal('add-logbook-modal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">Week Number</label>
                    <input type="number" id="logbook-week" class="form-input" value="${nextWeek}" min="1" max="20">
                </div>
                <div class="form-group">
                    <label class="form-label">Title</label>
                    <input type="text" id="logbook-title" class="form-input" placeholder="Enter task title">
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea id="logbook-description" class="form-textarea" placeholder="Enter task description"></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Deadline</label>
                    <input type="date" id="logbook-deadline" class="form-input" value="${nextDeadline.toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <input type="checkbox" id="logbook-locked" checked> Locked (unlocks 7 days before deadline)
                    </label>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeModal('add-logbook-modal')">Cancel</button>
                <button class="btn btn-primary" onclick="addNewLogbook()">Add Task</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function addNewLogbook() {
    const week = parseInt(document.getElementById('logbook-week').value);
    const title = document.getElementById('logbook-title').value;
    const description = document.getElementById('logbook-description').value;
    const deadline = document.getElementById('logbook-deadline').value;
    const locked = document.getElementById('logbook-locked').checked;
    
    if (!week || !title || !description || !deadline) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Check if week already exists
    if (adminData.tasks.logbooks.find(logbook => logbook.week === week)) {
        alert('Logbook task for this week already exists');
        return;
    }
    
    const newLogbook = {
        id: Math.max(...adminData.tasks.logbooks.map(l => l.id)) + 1,
        type: "Logbook",
        week: week,
        title: title,
        deadline: deadline,
        status: "open",
        description: description,
        score: null,
        comments: null,
        submittedFiles: [],
        submittedDate: null,
        locked: locked
    };
    
    adminData.tasks.logbooks.push(newLogbook);
    saveTasks();
    
    closeModal('add-logbook-modal');
    renderAdminLogbooks(document.getElementById('admin-content'));
    alert('Logbook task added successfully!');
}

// Modal untuk tambah weekly task
function showAddWeeklyTaskModal() {
    const nextWeek = Math.max(...adminData.tasks.weeklyTasks.map(t => t.week)) + 1;
    const nextDeadline = new Date();
    nextDeadline.setDate(nextDeadline.getDate() + 7);
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'add-weekly-modal';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">Add Weekly Task</h3>
                <button class="close-modal" onclick="closeModal('add-weekly-modal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">Week Number</label>
                    <input type="number" id="weekly-week" class="form-input" value="${nextWeek}" min="1" max="20">
                </div>
                <div class="form-group">
                    <label class="form-label">Title</label>
                    <input type="text" id="weekly-title" class="form-input" placeholder="Enter task title">
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea id="weekly-description" class="form-textarea" placeholder="Enter task description"></textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Deadline</label>
                    <input type="date" id="weekly-deadline" class="form-input" value="${nextDeadline.toISOString().split('T')[0]}">
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <input type="checkbox" id="weekly-locked" checked> Locked (unlocks 7 days before deadline)
                    </label>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeModal('add-weekly-modal')">Cancel</button>
                <button class="btn btn-primary" onclick="addNewWeeklyTask()">Add Task</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function addNewWeeklyTask() {
    const week = parseInt(document.getElementById('weekly-week').value);
    const title = document.getElementById('weekly-title').value;
    const description = document.getElementById('weekly-description').value;
    const deadline = document.getElementById('weekly-deadline').value;
    const locked = document.getElementById('weekly-locked').checked;
    
    if (!week || !title || !description || !deadline) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Check if week already exists
    if (adminData.tasks.weeklyTasks.find(task => task.week === week)) {
        alert('Weekly task for this week already exists');
        return;
    }
    
    const newWeeklyTask = {
        id: Math.max(...adminData.tasks.weeklyTasks.map(t => t.id)) + 1,
        type: "Weekly Task",
        week: week,
        title: title,
        deadline: deadline,
        status: "open",
        description: description,
        score: null,
        grade: null,
        comments: null,
        commentThread: [],
        submittedFiles: [],
        submittedDate: null,
        locked: locked,
        notes: null
    };
    
    adminData.tasks.weeklyTasks.push(newWeeklyTask);
    saveTasks();
    
    closeModal('add-weekly-modal');
    renderAdminWeeklyTasks(document.getElementById('admin-content'));
    alert('Weekly task added successfully!');
}

// Edit logbook task (hanya untuk task yang masih locked)
function editLogbook(logbookId) {
    const logbook = adminData.tasks.logbooks.find(l => l.id === logbookId);
    if (!logbook || !logbook.locked) {
        alert('Cannot edit unlocked logbook tasks');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'edit-logbook-modal';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">Edit Logbook Task</h3>
                <button class="close-modal" onclick="closeModal('edit-logbook-modal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">Week Number</label>
                    <input type="number" id="edit-logbook-week" class="form-input" value="${logbook.week}" min="1" max="20">
                </div>
                <div class="form-group">
                    <label class="form-label">Title</label>
                    <input type="text" id="edit-logbook-title" class="form-input" value="${logbook.title}">
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea id="edit-logbook-description" class="form-textarea">${logbook.description}</textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Deadline</label>
                    <input type="date" id="edit-logbook-deadline" class="form-input" value="${logbook.deadline}">
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <input type="checkbox" id="edit-logbook-locked" ${logbook.locked ? 'checked' : ''}> Locked
                    </label>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeModal('edit-logbook-modal')">Cancel</button>
                <button class="btn btn-primary" onclick="saveLogbookChanges(${logbookId})">Save Changes</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function saveLogbookChanges(logbookId) {
    const logbook = adminData.tasks.logbooks.find(l => l.id === logbookId);
    if (!logbook) return;
    
    const week = parseInt(document.getElementById('edit-logbook-week').value);
    const title = document.getElementById('edit-logbook-title').value;
    const description = document.getElementById('edit-logbook-description').value;
    const deadline = document.getElementById('edit-logbook-deadline').value;
    const locked = document.getElementById('edit-logbook-locked').checked;
    
    if (!week || !title || !description || !deadline) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Check if week already exists (excluding current task)
    const existingLogbook = adminData.tasks.logbooks.find(l => l.week === week && l.id !== logbookId);
    if (existingLogbook) {
        alert('Logbook task for this week already exists');
        return;
    }
    
    // Update logbook data
    logbook.week = week;
    logbook.title = title;
    logbook.description = description;
    logbook.deadline = deadline;
    logbook.locked = locked;
    
    saveTasks();
    
    closeModal('edit-logbook-modal');
    renderAdminLogbooks(document.getElementById('admin-content'));
    alert('Logbook task updated successfully!');
}

// Edit weekly task (hanya untuk task yang masih locked)
function editWeeklyTask(taskId) {
    const task = adminData.tasks.weeklyTasks.find(t => t.id === taskId);
    if (!task || !task.locked) {
        alert('Cannot edit unlocked weekly tasks');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'edit-weekly-modal';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">Edit Weekly Task</h3>
                <button class="close-modal" onclick="closeModal('edit-weekly-modal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">Week Number</label>
                    <input type="number" id="edit-weekly-week" class="form-input" value="${task.week}" min="1" max="20">
                </div>
                <div class="form-group">
                    <label class="form-label">Title</label>
                    <input type="text" id="edit-weekly-title" class="form-input" value="${task.title}">
                </div>
                <div class="form-group">
                    <label class="form-label">Description</label>
                    <textarea id="edit-weekly-description" class="form-textarea">${task.description}</textarea>
                </div>
                <div class="form-group">
                    <label class="form-label">Deadline</label>
                    <input type="date" id="edit-weekly-deadline" class="form-input" value="${task.deadline}">
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <input type="checkbox" id="edit-weekly-locked" ${task.locked ? 'checked' : ''}> Locked
                    </label>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeModal('edit-weekly-modal')">Cancel</button>
                <button class="btn btn-primary" onclick="saveWeeklyTaskChanges(${taskId})">Save Changes</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function saveWeeklyTaskChanges(taskId) {
    const task = adminData.tasks.weeklyTasks.find(t => t.id === taskId);
    if (!task) return;
    
    const week = parseInt(document.getElementById('edit-weekly-week').value);
    const title = document.getElementById('edit-weekly-title').value;
    const description = document.getElementById('edit-weekly-description').value;
    const deadline = document.getElementById('edit-weekly-deadline').value;
    const locked = document.getElementById('edit-weekly-locked').checked;
    
    if (!week || !title || !description || !deadline) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Check if week already exists (excluding current task)
    const existingTask = adminData.tasks.weeklyTasks.find(t => t.week === week && t.id !== taskId);
    if (existingTask) {
        alert('Weekly task for this week already exists');
        return;
    }
    
    // Update task data
    task.week = week;
    task.title = title;
    task.description = description;
    task.deadline = deadline;
    task.locked = locked;
    
    saveTasks();
    
    closeModal('edit-weekly-modal');
    renderAdminWeeklyTasks(document.getElementById('admin-content'));
    alert('Weekly task updated successfully!');
}

// View submissions
function viewLogbookSubmissions(logbookId) {
    const logbook = adminData.tasks.logbooks.find(l => l.id === logbookId);
    if (!logbook || !logbook.submittedDate) {
        alert('No submissions found for this logbook task');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'view-logbook-modal';
    modal.innerHTML = `
        <div class="modal" style="max-width: 800px;">
            <div class="modal-header">
                <h3 class="modal-title">Logbook Submission - ${logbook.title}</h3>
                <button class="close-modal" onclick="closeModal('view-logbook-modal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">Submitted By</label>
                    <p>${adminData.participants[0].name}</p>
                </div>
                <div class="form-group">
                    <label class="form-label">Submitted Date</label>
                    <p>${formatDateTime(logbook.submittedDate)}</p>
                </div>
                <div class="form-group">
                    <label class="form-label">Files</label>
                    <div>
                        ${logbook.submittedFiles.map(file => `
                            <div style="padding: 10px; border: 1px solid var(--gray-light); border-radius: var(--border-radius); margin-bottom: 10px;">
                                <i class="ri-file-text-line"></i> ${file}
                            </div>
                        `).join('')}
                    </div>
                </div>
                ${logbook.score ? `
                    <div class="form-group">
                        <label class="form-label">Score</label>
                        <p><strong>${logbook.score}</strong></p>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Comments</label>
                        <p>${logbook.comments}</p>
                    </div>
                ` : ''}
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeModal('view-logbook-modal')">Close</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function viewWeeklyTaskSubmissions(taskId) {
    const task = adminData.tasks.weeklyTasks.find(t => t.id === taskId);
    if (!task || !task.submittedDate) {
        alert('No submissions found for this weekly task');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'view-weekly-modal';
    modal.innerHTML = `
        <div class="modal" style="max-width: 800px;">
            <div class="modal-header">
                <h3 class="modal-title">Weekly Task Submission - ${task.title}</h3>
                <button class="close-modal" onclick="closeModal('view-weekly-modal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">Submitted By</label>
                    <p>${adminData.participants[0].name}</p>
                </div>
                <div class="form-group">
                    <label class="form-label">Submitted Date</label>
                    <p>${formatDateTime(task.submittedDate)}</p>
                </div>
                <div class="form-group">
                    <label class="form-label">Files</label>
                    <div>
                        ${task.submittedFiles.map(file => `
                            <div style="padding: 10px; border: 1px solid var(--gray-light); border-radius: var(--border-radius); margin-bottom: 10px;">
                                <i class="ri-file-text-line"></i> ${file}
                            </div>
                        `).join('')}
                    </div>
                </div>
                ${task.notes ? `
                    <div class="form-group">
                        <label class="form-label">Student Notes</label>
                        <p>${task.notes}</p>
                    </div>
                ` : ''}
                ${task.grade ? `
                    <div class="form-group">
                        <label class="form-label">Grade</label>
                        <p><strong>${task.grade}</strong></p>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Mentor Comments</label>
                        <p>${task.comments}</p>
                    </div>
                ` : ''}
                ${task.commentThread && task.commentThread.length > 0 ? `
                    <div class="form-group">
                        <label class="form-label">Discussion Thread</label>
                        <div class="comment-thread">
                            ${task.commentThread.map(comment => `
                                <div class="comment-item ${comment.sender === 'mentor' ? 'comment-mentor' : 'comment-user'}">
                                    <div class="comment-header">
                                        <span class="comment-sender">${comment.senderName}</span>
                                        <span class="comment-time">${formatDateTime(comment.timestamp)}</span>
                                    </div>
                                    <div class="comment-message">${comment.message}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeModal('view-weekly-modal')">Close</button>
                ${!task.grade ? `
                    <button class="btn btn-primary" onclick="closeModal('view-weekly-modal'); gradeTask('weekly', ${taskId})">Grade This Task</button>
                ` : ''}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Delete tasks
function deleteLogbook(logbookId) {
    if (confirm('Are you sure you want to delete this logbook task? This action cannot be undone.')) {
        adminData.tasks.logbooks = adminData.tasks.logbooks.filter(l => l.id !== logbookId);
        saveTasks();
        renderAdminLogbooks(document.getElementById('admin-content'));
        alert('Logbook task deleted successfully!');
    }
}

function deleteWeeklyTask(taskId) {
    if (confirm('Are you sure you want to delete this weekly task? This action cannot be undone.')) {
        adminData.tasks.weeklyTasks = adminData.tasks.weeklyTasks.filter(t => t.id !== taskId);
        saveTasks();
        renderAdminWeeklyTasks(document.getElementById('admin-content'));
        alert('Weekly task deleted successfully!');
    }
}