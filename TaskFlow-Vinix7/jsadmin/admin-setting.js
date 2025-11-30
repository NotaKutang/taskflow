// Render Settings Page
function renderAdminSettings(container) {
    container.innerHTML = `
        <div class="content-card">
            <div class="card-header">
                <h3 class="card-title">Admin Settings</h3>
            </div>
            <div style="padding: 20px;">
                <div class="form-group">
                    <label class="form-label" for="admin-name-input">Admin Name</label>
                    <input type="text" id="admin-name-input" class="form-input" value="${adminData.adminUser.name}">
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="admin-email-input">Admin Email</label>
                    <input type="email" id="admin-email-input" class="form-input" value="${adminData.adminUser.email}">
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="admin-password-input">Change Password</label>
                    <input type="password" id="admin-password-input" class="form-input" placeholder="Enter new password">
                </div>
                
                <div class="form-group">
                    <label class="form-label" for="admin-confirm-password">Confirm Password</label>
                    <input type="password" id="admin-confirm-password" class="form-input" placeholder="Confirm new password">
                </div>
                
                <button class="btn btn-primary" onclick="saveAdminSettings()">Save Changes</button>
            </div>
        </div>
        
        <div class="content-card">
            <div class="card-header">
                <h3 class="card-title">System Information</h3>
            </div>
            <div style="padding: 20px;">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">System Version</label>
                        <input type="text" class="form-input" value="VINIX7 v1.0.0" readonly>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">Last Backup</label>
                        <input type="text" class="form-input" value="${new Date().toLocaleDateString()}" readonly>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">Database Status</label>
                    <input type="text" class="form-input" value="Connected" readonly style="color: var(--success);">
                </div>
                
                <button class="btn btn-outline" style="margin-right: 10px;" onclick="backupData()">Backup Data</button>
                <button class="btn btn-outline" onclick="viewSystemLogs()">System Logs</button>
            </div>
        </div>
    `;
}

function saveAdminSettings() {
    const name = document.getElementById('admin-name-input').value;
    const email = document.getElementById('admin-email-input').value;
    const password = document.getElementById('admin-password-input').value;
    const confirmPassword = document.getElementById('admin-confirm-password').value;
    
    if (!name || !email) {
        alert('Please fill in name and email');
        return;
    }
    
    if (password && password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }
    
    // Update admin data
    adminData.adminUser.name = name;
    adminData.adminUser.email = email;
    adminData.adminUser.avatar = name.split(' ').map(n => n[0]).join('').toUpperCase();
    
    if (password) {
        // Dalam implementasi nyata, ini akan mengenkripsi password
        console.log('Password updated');
    }
    
    localStorage.setItem('admin_user', JSON.stringify(adminData.adminUser));
    
    // Update UI
    document.getElementById('admin-name').textContent = name;
    document.getElementById('admin-email').textContent = email;
    document.getElementById('admin-avatar').textContent = adminData.adminUser.avatar;
    
    alert('Settings saved successfully!');
}

function backupData() {
    alert('Data backup functionality would be implemented here');
}

function viewSystemLogs() {
    alert('System logs functionality would be implemented here');
}