// Handle login
function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Validasi sederhana
    if (email === 'user' && password === '123') {
        appData.isLoggedIn = true;
        appData.rememberMe = remember;
        
        // Simpan ke localStorage jika remember me dicentang
        if (remember) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('rememberMe', 'true');
            localStorage.setItem('savedEmail', email);
            localStorage.setItem('savedPassword', password);
        }
        
        // Simpan data user
        localStorage.setItem('app_user', JSON.stringify(appData.user));
        
        showApp();
        window.location.hash = 'home';
    } else {
        alert('Invalid credentials. Use username: user, password: 123');
    }
}

// Setup event listener untuk login
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('login-btn').addEventListener('click', handleLogin);
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
});