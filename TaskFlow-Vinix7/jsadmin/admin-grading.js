// Render Grading Page
function renderAdminGrading(container) {
    const pendingTasks = adminData.tasks.weeklyTasks.filter(task => 
        task.submittedDate && !task.grade
    );
    
    const gradedTasks = adminData.tasks.weeklyTasks.filter(task => 
        task.grade
    );
    
    container.innerHTML = `
        <div class="content-card">
            <div class="card-header">
                <h3 class="card-title">Pending Grading (${pendingTasks.length})</h3>
            </div>
            <div class="table-responsive">
                ${pendingTasks.length > 0 ? `
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Task</th>
                                <th>Week</th>
                                <th>Submitted</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${pendingTasks.map(task => `
                                <tr>
                                    <td>
                                        <div style="display: flex; align-items: center; gap: 10px;">
                                            <div class="admin-avatar" style="width: 32px; height: 32px; font-size: 12px;">
                                                ${adminData.participants[0].avatar}
                                            </div>
                                            ${adminData.participants[0].name}
                                        </div>
                                    </td>
                                    <td>${task.title}</td>
                                    <td>Week ${task.week}</td>
                                    <td>${formatDate(task.submittedDate)}</td>
                                    <td>
                                        <div class="action-buttons">
                                            <button class="btn btn-outline btn-sm" onclick="viewSubmission('weekly', ${task.id})">
                                                <i class="ri-eye-line"></i> View
                                            </button>
                                            <button class="btn btn-primary btn-sm" onclick="gradeTask('weekly', ${task.id})">
                                                <i class="ri-pencil-line"></i> Grade
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                ` : '<div style="padding: 20px; text-align: center; color: var(--gray);">No pending tasks to grade</div>'}
            </div>
        </div>
        
        <div class="content-card">
            <div class="card-header">
                <h3 class="card-title">Recently Graded (${gradedTasks.length})</h3>
            </div>
            <div class="table-responsive">
                ${gradedTasks.length > 0 ? `
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Task</th>
                                <th>Week</th>
                                <th>Grade</th>
                                <th>Graded Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${gradedTasks.map(task => `
                                <tr>
                                    <td>
                                        <div style="display: flex; align-items: center; gap: 10px;">
                                            <div class="admin-avatar" style="width: 32px; height: 32px; font-size: 12px;">
                                                ${adminData.participants[0].avatar}
                                            </div>
                                            ${adminData.participants[0].name}
                                        </div>
                                    </td>
                                    <td>${task.title}</td>
                                    <td>Week ${task.week}</td>
                                    <td>
                                        <span class="status-badge status-graded">${task.grade}</span>
                                    </td>
                                    <td>${formatDate(task.submittedDate)}</td>
                                    <td>
                                        <div class="action-buttons">
                                            <button class="btn btn-outline btn-sm" onclick="viewSubmission('weekly', ${task.id})">
                                                <i class="ri-eye-line"></i> View
                                            </button>
                                            <button class="btn btn-outline btn-sm" onclick="regradeTask('weekly', ${task.id})">
                                                <i class="ri-edit-line"></i> Regrade
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                ` : '<div style="padding: 20px; text-align: center; color: var(--gray);">No graded tasks yet</div>'}
            </div>
        </div>
    `;
}

// View submission details
function viewSubmission(taskType, taskId) {
    if (taskType === 'weekly') {
        viewWeeklyTaskSubmissions(taskId);
    } else {
        viewLogbookSubmissions(taskId);
    }
}

// Grade task modal
function gradeTask(taskType, taskId) {
    const task = adminData.tasks.weeklyTasks.find(t => t.id === taskId);
    if (!task || !task.submittedDate) {
        alert('No submission found for this task');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'grade-task-modal';
    modal.innerHTML = `
        <div class="modal" style="max-width: 700px;">
            <div class="modal-header">
                <h3 class="modal-title">Grade Task - ${task.title}</h3>
                <button class="close-modal" onclick="closeModal('grade-task-modal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="grade-form">
                    <div class="form-group">
                        <label class="form-label">Student</label>
                        <p><strong>${adminData.participants[0].name}</strong></p>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Select Grade</label>
                        <div class="grade-options" id="grade-options">
                            <div class="grade-option" data-grade="A" onclick="selectGrade('A')">A</div>
                            <div class="grade-option" data-grade="B" onclick="selectGrade('B')">B</div>
                            <div class="grade-option" data-grade="C" onclick="selectGrade('C')">C</div>
                            <div class="grade-option" data-grade="D" onclick="selectGrade('D')">D</div>
                        </div>
                        <input type="hidden" id="selected-grade" value="">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Mentor Comments</label>
                        <textarea id="mentor-comments" class="form-textarea" placeholder="Provide feedback and comments for the student..."></textarea>
                    </div>
                    
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
                    
                    <div class="form-group">
                        <label class="form-label">Add Comment</label>
                        <textarea id="new-comment" class="form-textarea" placeholder="Add a comment to the discussion thread..."></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeModal('grade-task-modal')">Cancel</button>
                <button class="btn btn-primary" onclick="submitGrade(${taskId})" id="submit-grade-btn" disabled>Submit Grade</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function selectGrade(grade) {
    // Remove selected class from all options
    document.querySelectorAll('.grade-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    const selectedOption = document.querySelector(`.grade-option[data-grade="${grade}"]`);
    selectedOption.classList.add('selected');
    
    // Set hidden input value
    document.getElementById('selected-grade').value = grade;
    
    // Enable submit button
    document.getElementById('submit-grade-btn').disabled = false;
}

function submitGrade(taskId) {
    const task = adminData.tasks.weeklyTasks.find(t => t.id === taskId);
    if (!task) return;
    
    const grade = document.getElementById('selected-grade').value;
    const comments = document.getElementById('mentor-comments').value;
    const newComment = document.getElementById('new-comment').value;
    
    if (!grade) {
        alert('Please select a grade');
        return;
    }
    
    // Update task with grade and comments
    task.grade = grade;
    task.comments = comments;
    task.status = 'completed';
    task.score = grade; // Untuk konsistensi dengan logbook
    
    // Add new comment to thread if provided
    if (newComment.trim()) {
        if (!task.commentThread) {
            task.commentThread = [];
        }
        
        task.commentThread.push({
            id: task.commentThread.length + 1,
            sender: "mentor",
            senderName: "Mentor",
            message: newComment,
            timestamp: new Date().toISOString()
        });
    }
    
    saveTasks();
    
    closeModal('grade-task-modal');
    
    // Refresh current page
    if (document.getElementById('admin-page-title').textContent === 'Grading') {
        renderAdminGrading(document.getElementById('admin-content'));
    } else {
        renderAdminWeeklyTasks(document.getElementById('admin-content'));
    }
    
    alert('Task graded successfully!');
}

// Regrade task (edit existing grade)
function regradeTask(taskType, taskId) {
    const task = adminData.tasks.weeklyTasks.find(t => t.id === taskId);
    if (!task || !task.grade) {
        alert('This task has not been graded yet');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'regrade-task-modal';
    modal.innerHTML = `
        <div class="modal" style="max-width: 700px;">
            <div class="modal-header">
                <h3 class="modal-title">Regrade Task - ${task.title}</h3>
                <button class="close-modal" onclick="closeModal('regrade-task-modal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="grade-form">
                    <div class="form-group">
                        <label class="form-label">Current Grade: <strong>${task.grade}</strong></label>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Select New Grade</label>
                        <div class="grade-options" id="regrade-options">
                            <div class="grade-option ${task.grade === 'A' ? 'selected' : ''}" data-grade="A" onclick="selectRegrade('A')">A</div>
                            <div class="grade-option ${task.grade === 'B' ? 'selected' : ''}" data-grade="B" onclick="selectRegrade('B')">B</div>
                            <div class="grade-option ${task.grade === 'C' ? 'selected' : ''}" data-grade="C" onclick="selectRegrade('C')">C</div>
                            <div class="grade-option ${task.grade === 'D' ? 'selected' : ''}" data-grade="D" onclick="selectRegrade('D')">D</div>
                        </div>
                        <input type="hidden" id="selected-regrade" value="${task.grade}">
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Update Mentor Comments</label>
                        <textarea id="update-mentor-comments" class="form-textarea">${task.comments || ''}</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Add Additional Comment (Optional)</label>
                        <textarea id="additional-comment" class="form-textarea" placeholder="Explain why you're changing the grade..."></textarea>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeModal('regrade-task-modal')">Cancel</button>
                <button class="btn btn-primary" onclick="submitRegrade(${taskId})">Update Grade</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function selectRegrade(grade) {
    // Remove selected class from all options
    document.querySelectorAll('.grade-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Add selected class to clicked option
    const selectedOption = document.querySelector(`.grade-option[data-grade="${grade}"]`);
    selectedOption.classList.add('selected');
    
    // Set hidden input value
    document.getElementById('selected-regrade').value = grade;
}

function submitRegrade(taskId) {
    const task = adminData.tasks.weeklyTasks.find(t => t.id === taskId);
    if (!task) return;
    
    const newGrade = document.getElementById('selected-regrade').value;
    const updatedComments = document.getElementById('update-mentor-comments').value;
    const additionalComment = document.getElementById('additional-comment').value;
    
    if (!newGrade) {
        alert('Please select a grade');
        return;
    }
    
    // Update task with new grade and comments
    const oldGrade = task.grade;
    task.grade = newGrade;
    task.comments = updatedComments;
    task.score = newGrade;
    
    // Add comment about regrade if provided
    if (additionalComment.trim()) {
        if (!task.commentThread) {
            task.commentThread = [];
        }
        
        task.commentThread.push({
            id: task.commentThread.length + 1,
            sender: "mentor",
            senderName: "Mentor",
            message: `Grade updated from ${oldGrade} to ${newGrade}. ${additionalComment}`,
            timestamp: new Date().toISOString()
        });
    }
    
    saveTasks();
    
    closeModal('regrade-task-modal');
    
    // Refresh current page
    if (document.getElementById('admin-page-title').textContent === 'Grading') {
        renderAdminGrading(document.getElementById('admin-content'));
    } else {
        renderAdminWeeklyTasks(document.getElementById('admin-content'));
    }
    
    alert('Grade updated successfully!');
}