// =============================================
// FUNGSI POPUP CUSTOM
// =============================================

// Fungsi untuk menampilkan dialog konfirmasi kustom
function showConfirmationDialog(title, message, onConfirm, onCancel, type = 'warning') {
    // Hapus dialog sebelumnya jika ada
    const existingDialog = document.getElementById('custom-confirmation-dialog');
    if (existingDialog) {
        existingDialog.remove();
    }
    
    // Buat dialog
    const dialog = document.createElement('div');
    dialog.id = 'custom-confirmation-dialog';
    dialog.className = 'confirmation-dialog-overlay';
    dialog.innerHTML = `
        <div class="confirmation-dialog ${type}">
            <div class="confirmation-header">
                <h3>${title}</h3>
            </div>
            <div class="confirmation-body">
                <p>${message}</p>
            </div>
            <div class="confirmation-actions">
                <button class="btn btn-outline" id="confirm-cancel">Cancel</button>
                <button class="btn btn-primary" id="confirm-ok">Yes, Continue</button>
            </div>
        </div>
    `;
    
    // Tambahkan ke body
    document.body.appendChild(dialog);
    
    // Event listener untuk tombol OK
    document.getElementById('confirm-ok').addEventListener('click', function() {
        closeDialog(dialog);
        if (onConfirm) onConfirm();
    });
    
    // Event listener untuk tombol Cancel
    document.getElementById('confirm-cancel').addEventListener('click', function() {
        closeDialog(dialog);
        if (onCancel) onCancel();
    });
    
    // Event listener untuk klik di luar dialog
    dialog.addEventListener('click', function(e) {
        if (e.target === dialog) {
            closeDialog(dialog);
            if (onCancel) onCancel();
        }
    });
    
    // Event listener untuk Escape key
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            closeDialog(dialog);
            if (onCancel) onCancel();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Fungsi untuk menampilkan alert kustom
function showAlertDialog(title, message, onOk, type = 'info') {
    // Hapus dialog sebelumnya jika ada
    const existingDialog = document.getElementById('custom-alert-dialog');
    if (existingDialog) {
        existingDialog.remove();
    }
    
    // Buat dialog
    const dialog = document.createElement('div');
    dialog.id = 'custom-alert-dialog';
    dialog.className = 'alert-dialog-overlay';
    dialog.innerHTML = `
        <div class="alert-dialog">
            <div class="alert-header">
                <div class="alert-icon ${type}">
                    ${type === 'success' ? '✓' : type === 'error' ? '✕' : type === 'warning' ? '⚠' : 'ℹ'}
                </div>
                <h3>${title}</h3>
            </div>
            <div class="alert-body">
                <p>${message}</p>
            </div>
            <div class="alert-actions">
                <button class="btn btn-primary" id="alert-ok">OK</button>
            </div>
        </div>
    `;
    
    // Tambahkan ke body
    document.body.appendChild(dialog);
    
    // Event listener untuk tombol OK
    document.getElementById('alert-ok').addEventListener('click', function() {
        closeDialog(dialog);
        if (onOk) onOk();
    });
    
    // Event listener untuk klik di luar dialog
    dialog.addEventListener('click', function(e) {
        if (e.target === dialog) {
            closeDialog(dialog);
            if (onOk) onOk();
        }
    });
    
    // Event listener untuk Escape key
    const escapeHandler = function(e) {
        if (e.key === 'Escape') {
            closeDialog(dialog);
            if (onOk) onOk();
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Fungsi untuk menutup dialog dengan animasi
function closeDialog(dialog) {
    const dialogContent = dialog.querySelector('.confirmation-dialog, .alert-dialog');
    dialogContent.classList.add('closing');
    
    setTimeout(() => {
        dialog.remove();
    }, 200);
}

// =============================================
// RENDER HALAMAN PROFILE DENGAN POPUP CUSTOM
// =============================================

// Render halaman Profile
function renderProfilePage(container) {
    const user = appData.user;
    const transactions = appData.transactions;
    
    container.innerHTML = `
        <div class="profile-container">
            <div class="profile-main-card">
                <div class="profile-header">
                    <div class="profile-avatar">
                        ${user.avatar}
                        <div class="profile-avatar-edit">
                            <i class="ri-pencil-line"></i>
                        </div>
                    </div>
                    <div class="profile-info">
                        <h3>${user.name} ${user.isVIP ? '<span class="vip-badge">PRO</span>' : ''}</h3>
                        <p>${user.email}</p>
                    </div>
                </div>
                
                <div class="profile-details">
                    <div class="detail-item">
                        <label>Email</label>
                        <p>${user.email}</p>
                    </div>
                    <div class="detail-item">
                        <label>Phone Number</label>
                        <p>${user.phone}</p>
                    </div>
                    <div class="detail-item">
                        <label>CV Link</label>
                        <p><a href="${user.cvLink}" target="_blank">View CV</a></p>
                    </div>
                    <div class="detail-item">
                        <label>Membership</label>
                        <p>${user.isVIP ? 'PRO' : 'Free'}</p>
                    </div>
                </div>
                
                <div class="profile-actions">
                    <button class="btn btn-primary" id="edit-profile-btn">Edit Profile</button>
                    <button class="btn btn-outline" id="change-password-btn">Change Password</button>
                </div>
            </div>
            
            ${transactions.length > 0 ? `
                <div class="profile-card transaction-history">
                    <h3>Transaction History</h3>
                    <table class="transaction-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${transactions.map(transaction => `
                                <tr>
                                    <td>${transaction.date}</td>
                                    <td>${transaction.description}</td>
                                    <td>${transaction.amount}</td>
                                    <td>${transaction.status}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            ` : ''}
            
            <div class="action-cards">
                <div class="action-card">
                    <i class="ri-refresh-line" style="font-size: 40px; color: var(--danger);"></i>
                    <h3>Reset Demo</h3>
                    <p>Clear all data and reset the application</p>
                    <button class="btn btn-danger" id="reset-demo">Reset</button>
                </div>
            </div>
        </div>
    `;
    
    // Event listener untuk edit profile
    document.getElementById('edit-profile-btn').addEventListener('click', function() {
        window.location.hash = 'edit-profile';
    });
    
    // Event listener untuk change password
    document.getElementById('change-password-btn').addEventListener('click', function() {
        window.location.hash = 'change-password';
    });
    
    // Event listener untuk reset demo dengan popup custom
    document.getElementById('reset-demo').addEventListener('click', function() {
        showConfirmationDialog(
            'Reset Demo Data',
            'Are you sure you want to reset all data? This action cannot be undone.',
            function() {
                localStorage.clear();
                location.reload();
            },
            function() {
                console.log('Reset demo cancelled');
            },
            'warning'
        );
    });
    
}

// =============================================
// RENDER HALAMAN EDIT PROFILE DENGAN POPUP CUSTOM
// =============================================

// Render halaman Edit Profile
function renderEditProfilePage(container) {
    const user = appData.user;
    
    container.innerHTML = `
        <div class="edit-profile-form">
            <div class="form-section">
                <h3 class="form-section-title">Profile Information</h3>
                <div class="form-group">
                    <label class="form-label" for="edit-name">Full Name</label>
                    <input type="text" id="edit-name" class="form-input form-input-disabled" value="${user.name}" readonly>
                    <small class="form-help">Name cannot be changed</small>
                </div>
                <div class="form-group">
                    <label class="form-label" for="edit-email">Email</label>
                    <input type="email" id="edit-email" class="form-input" value="${user.email}">
                </div>
                <div class="form-group">
                    <label class="form-label" for="edit-phone">Phone Number</label>
                    <input type="tel" id="edit-phone" class="form-input" value="${user.phone}">
                </div>
                <div class="form-group">
                    <label class="form-label" for="edit-cv">CV Link</label>
                    <input type="url" id="edit-cv" class="form-input" value="${user.cvLink}">
                </div>
            </div>
            
            <div class="form-actions">
                <button class="btn btn-outline" id="cancel-edit-btn">Cancel</button>
                <button class="btn btn-primary" id="save-profile">Save Changes</button>
            </div>
        </div>
    `;
    
    // Event listener untuk cancel
    document.getElementById('cancel-edit-btn').addEventListener('click', function() {
        window.history.back();
    });
    
    // Event listener untuk save profile dengan popup custom
    document.getElementById('save-profile').addEventListener('click', function() {
        // Validasi form
        const email = document.getElementById('edit-email').value;
        const phone = document.getElementById('edit-phone').value;
        const cvLink = document.getElementById('edit-cv').value;
        
        if (!email || !phone || !cvLink) {
            showAlertDialog(
                'Incomplete Form',
                'Please fill in all fields before saving.',
                null,
                'warning'
            );
            return;
        }
        
        // Tampilkan konfirmasi custom sebelum menyimpan
        showConfirmationDialog(
            'Save Changes',
            'Are you sure you want to save these changes to your profile?',
            function() {
                // User confirmed - proceed with save
                const name = document.getElementById('edit-name').value;
                const email = document.getElementById('edit-email').value;
                const phone = document.getElementById('edit-phone').value;
                const cvLink = document.getElementById('edit-cv').value;
                
                // Update user data
                appData.user.name = name;
                appData.user.email = email;
                appData.user.phone = phone;
                appData.user.cvLink = cvLink;
                appData.user.avatar = name.split(' ').map(n => n[0]).join('');
                
                // Simpan ke localStorage
                localStorage.setItem('app_user', JSON.stringify(appData.user));
                
                // Update sidebar
                const sidebarUserName = document.getElementById('sidebar-user-name');
                const sidebarAvatar = document.getElementById('sidebar-avatar');
                if (sidebarUserName) sidebarUserName.textContent = name;
                if (sidebarAvatar) sidebarAvatar.textContent = appData.user.avatar;
                
                // Tampilkan success alert
                showAlertDialog(
                    'Success!',
                    'Your profile has been updated successfully.',
                    function() {
                        window.history.back();
                    },
                    'success'
                );
            },
            function() {
                // User cancelled - do nothing
                console.log('Save cancelled by user');
            },
            'warning'
        );
    });
}

// =============================================
// RENDER HALAMAN CHANGE PASSWORD DENGAN POPUP CUSTOM
// =============================================

// Render halaman Change Password
function renderChangePasswordPage(container) {
    container.innerHTML = `
        <div class="change-password-form">
            <div class="form-section">
                <h3 class="form-section-title">Change Password</h3>
                <div class="form-group">
                    <label class="form-label" for="current-password">Current Password</label>
                    <input type="password" id="current-password" class="form-input" placeholder="Enter current password">
                </div>
                <div class="form-group">
                    <label class="form-label" for="new-password">New Password</label>
                    <input type="password" id="new-password" class="form-input" placeholder="Enter new password">
                </div>
                <div class="form-group">
                    <label class="form-label" for="confirm-password">Confirm New Password</label>
                    <input type="password" id="confirm-password" class="form-input" placeholder="Confirm new password">
                </div>
            </div>
            
            <div class="form-actions">
                <button class="btn btn-outline" id="cancel-password-btn">Cancel</button>
                <button class="btn btn-primary" id="save-password">Change Password</button>
            </div>
        </div>
    `;
    
    // Event listener untuk cancel
    document.getElementById('cancel-password-btn').addEventListener('click', function() {
        window.history.back();
    });
    
    // Event listener untuk save password dengan popup custom
    document.getElementById('save-password').addEventListener('click', function() {
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        // Validasi
        if (!currentPassword || !newPassword || !confirmPassword) {
            showAlertDialog(
                'Incomplete Form',
                'Please fill in all password fields.',
                null,
                'warning'
            );
            return;
        }
        
        if (newPassword.length < 6) {
            showAlertDialog(
                'Weak Password',
                'New password should be at least 6 characters long.',
                null,
                'warning'
            );
            return;
        }
        
        if (newPassword !== confirmPassword) {
            showAlertDialog(
                'Password Mismatch',
                'New password and confirm password do not match.',
                null,
                'error'
            );
            return;
        }
        
        // Tampilkan konfirmasi custom
        showConfirmationDialog(
            'Change Password',
            'Are you sure you want to change your password?',
            function() {
                // User confirmed - proceed with password change
                // Simulasi perubahan password
                // Dalam aplikasi nyata, ini akan mengirim request ke server
                
                // Tampilkan success alert
                showAlertDialog(
                    'Success!',
                    'Your password has been changed successfully.',
                    function() {
                        window.history.back();
                    },
                    'success'
                );
            },
            function() {
                // User cancelled - do nothing
                console.log('Password change cancelled by user');
            },
            'warning'
        );
    });
}