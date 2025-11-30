// Render Manage Users
function renderAdminUsers(container) {
    container.innerHTML = `
        <div class="content-card">
            <div class="card-header">
                <h3 class="card-title">Participants (${adminData.participants.length})</h3>
                <div class="card-actions">
                    <button class="btn btn-primary" onclick="showAddUserModal()">
                        <i class="ri-user-add-line"></i> Add User
                    </button>
                </div>
            </div>
            <div class="table-responsive">
                <table class="data-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                            <th>Tasks Completed</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${adminData.participants.map(user => `
                            <tr>
                                <td>
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <div class="admin-avatar" style="width: 32px; height: 32px; font-size: 12px;">${user.avatar}</div>
                                        ${user.name}
                                    </div>
                                </td>
                                <td>${user.email}</td>
                                <td>${user.phone}</td>
                                <td>
                                    <span class="status-badge ${user.isVIP ? 'status-graded' : 'status-pending'}">
                                        ${user.isVIP ? 'VIP' : 'Standard'}
                                    </span>
                                </td>
                                <td>
                                    ${getUserCompletedTasks(user.id)} / ${getUserTotalTasks()}
                                </td>
                                <td>
                                    <div class="action-buttons">
                                        <button class="btn btn-outline btn-sm" onclick="editUser(${user.id})">
                                            <i class="ri-edit-line"></i> Edit
                                        </button>
                                        <button class="btn btn-outline btn-sm" onclick="viewUserProgress(${user.id})">
                                            <i class="ri-line-chart-line"></i> Progress
                                        </button>
                                        ${user.id !== 1 ? `
                                            <button class="btn btn-outline btn-sm" onclick="deleteUser(${user.id})">
                                                <i class="ri-delete-bin-line"></i> Delete
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

// Helper functions untuk user management
function getUserCompletedTasks(userId) {
    // Untuk demo, kita asumsikan semua user melihat task yang sama
    const completedWeekly = adminData.tasks.weeklyTasks.filter(task => 
        task.status === 'completed' || task.grade
    ).length;
    
    const completedLogbook = adminData.tasks.logbooks.filter(logbook => 
        logbook.status === 'completed'
    ).length;
    
    return completedWeekly + completedLogbook;
}

function getUserTotalTasks() {
    return adminData.tasks.weeklyTasks.length + adminData.tasks.logbooks.length;
}

// Modal untuk tambah user
function showAddUserModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'add-user-modal';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">Add New User</h3>
                <button class="close-modal" onclick="closeModal('add-user-modal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">Full Name</label>
                    <input type="text" id="new-user-name" class="form-input" placeholder="Enter full name">
                </div>
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" id="new-user-email" class="form-input" placeholder="Enter email">
                </div>
                <div class="form-group">
                    <label class="form-label">Phone Number</label>
                    <input type="tel" id="new-user-phone" class="form-input" placeholder="Enter phone number">
                </div>
                <div class="form-group">
                    <label class="form-label">CV Link</label>
                    <input type="url" id="new-user-cv" class="form-input" placeholder="Enter CV link">
                </div>
                <div class="form-group">
                    <label class="form-label">Password</label>
                    <input type="password" id="new-user-password" class="form-input" placeholder="Enter password">
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <input type="checkbox" id="new-user-vip"> VIP Member
                    </label>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeModal('add-user-modal')">Cancel</button>
                <button class="btn btn-primary" onclick="addNewUser()">Add User</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function addNewUser() {
    const name = document.getElementById('new-user-name').value;
    const email = document.getElementById('new-user-email').value;
    const phone = document.getElementById('new-user-phone').value;
    const cvLink = document.getElementById('new-user-cv').value;
    const password = document.getElementById('new-user-password').value;
    const isVIP = document.getElementById('new-user-vip').checked;
    
    if (!name || !email || !password) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Check if email already exists
    if (adminData.participants.find(user => user.email === email)) {
        alert('User with this email already exists');
        return;
    }
    
    const newUser = {
        id: Math.max(...adminData.participants.map(u => u.id)) + 1,
        username: email.split('@')[0],
        name: name,
        email: email,
        phone: phone,
        cvLink: cvLink,
        isVIP: isVIP,
        avatar: name.split(' ').map(n => n[0]).join('').toUpperCase(),
        password: password
    };
    
    adminData.participants.push(newUser);
    saveParticipants();
    
    // Update user data di sistem peserta jika email sama dengan user yang login
    const currentUser = JSON.parse(localStorage.getItem('app_user'));
    if (currentUser && currentUser.email === email) {
        localStorage.setItem('app_user', JSON.stringify(newUser));
    }
    
    closeModal('add-user-modal');
    renderAdminUsers(document.getElementById('admin-content'));
    alert('User added successfully!');
}

function editUser(userId) {
    const user = adminData.participants.find(u => u.id === userId);
    if (!user) return;
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'edit-user-modal';
    modal.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h3 class="modal-title">Edit User</h3>
                <button class="close-modal" onclick="closeModal('edit-user-modal')">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">Full Name</label>
                    <input type="text" id="edit-user-name" class="form-input" value="${user.name}">
                </div>
                <div class="form-group">
                    <label class="form-label">Email</label>
                    <input type="email" id="edit-user-email" class="form-input" value="${user.email}">
                </div>
                <div class="form-group">
                    <label class="form-label">Phone Number</label>
                    <input type="tel" id="edit-user-phone" class="form-input" value="${user.phone}">
                </div>
                <div class="form-group">
                    <label class="form-label">CV Link</label>
                    <input type="url" id="edit-user-cv" class="form-input" value="${user.cvLink}">
                </div>
                <div class="form-group">
                    <label class="form-label">New Password (leave empty to keep current)</label>
                    <input type="password" id="edit-user-password" class="form-input" placeholder="Enter new password">
                </div>
                <div class="form-group">
                    <label class="form-label">
                        <input type="checkbox" id="edit-user-vip" ${user.isVIP ? 'checked' : ''}> VIP Member
                    </label>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-outline" onclick="closeModal('edit-user-modal')">Cancel</button>
                <button class="btn btn-primary" onclick="saveUserChanges(${userId})">Save Changes</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

function saveUserChanges(userId) {
    const user = adminData.participants.find(u => u.id === userId);
    if (!user) return;
    
    const name = document.getElementById('edit-user-name').value;
    const email = document.getElementById('edit-user-email').value;
    const phone = document.getElementById('edit-user-phone').value;
    const cvLink = document.getElementById('edit-user-cv').value;
    const password = document.getElementById('edit-user-password').value;
    const isVIP = document.getElementById('edit-user-vip').checked;
    
    if (!name || !email) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Update user data
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.cvLink = cvLink;
    user.isVIP = isVIP;
    user.avatar = name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    if (password) {
        user.password = password;
    }
    
    saveParticipants();
    
    // Update user data di sistem peserta jika email sama dengan user yang login
    const currentUser = JSON.parse(localStorage.getItem('app_user'));
    if (currentUser && currentUser.email === user.email) {
        localStorage.setItem('app_user', JSON.stringify(user));
    }
    
    closeModal('edit-user-modal');
    renderAdminUsers(document.getElementById('admin-content'));
    alert('User updated successfully!');
}

function viewUserProgress(userId) {
    const user = adminData.participants.find(u => u.id === userId);
    if (!user) return;
    
    alert(`View progress for ${user.name}\n\nThis would show detailed progress statistics in a real implementation.`);
}

function deleteUser(userId) {
    if (userId === 1) {
        alert('Cannot delete the default user');
        return;
    }
    
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        adminData.participants = adminData.participants.filter(u => u.id !== userId);
        saveParticipants();
        renderAdminUsers(document.getElementById('admin-content'));
        alert('User deleted successfully!');
    }
}