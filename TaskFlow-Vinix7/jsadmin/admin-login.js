// Handle admin login
document.addEventListener('DOMContentLoaded', function() {
    // Login admin
    document.getElementById('admin-login-btn').addEventListener('click', function() {
        const email = document.getElementById('admin-email').value;
        const password = document.getElementById('admin-password').value;
        
        // Validasi sederhana
        if (email === 'admin@vinix7.com' && password === 'admin123') {
            adminData.isLoggedIn = true;
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('admin_user', JSON.stringify(adminData.adminUser));
            showAdminPanel();
        } else {
            alert('Invalid admin credentials. Use: admin@vinix7.com / admin123');
        }
    });
    
    // Logout admin
    document.getElementById('admin-logout-btn').addEventListener('click', function() {
        adminData.isLoggedIn = false;
        localStorage.setItem('adminLoggedIn', 'false');
        showAdminLogin();
    });
    
    // Enter key untuk login
    document.getElementById('admin-password').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('admin-login-btn').click();
        }
    });
});