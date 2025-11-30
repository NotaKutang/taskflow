// Data structure untuk admin
const adminData = {
    isLoggedIn: localStorage.getItem('adminLoggedIn') === 'true',
    adminUser: JSON.parse(localStorage.getItem('admin_user')) || {
        name: "Admin User",
        email: "admin@vinix7.com",
        avatar: "A"
    },
    
    // Data peserta dari sistem peserta
    participants: JSON.parse(localStorage.getItem('participants')) || [
        {
            id: 1,
            username: "user",
            name: "Jessie Anggasta",
            email: "jessie@example.com",
            phone: "+62 812-3456-7890",
            cvLink: "https://example.com/cv/jessie",
            isVIP: false,
            avatar: "JA",
            password: "123"
        }
    ],
    
    // Data tugas dari sistem peserta
    tasks: JSON.parse(localStorage.getItem('app_tasks')) || {
        logbooks: [
            {
                id: 1,
                type: "Logbook",
                week: 1,
                title: "Week 1 - Project Planning and Timeline",
                deadline: "2025-11-09",
                status: "completed",
                description: "Complete your project planning and timeline documentation",
                score: "A",
                comments: "Excellent planning! Well documented timeline.",
                submittedFiles: ["logbook_week_1.pdf"],
                submittedDate: new Date('2025-11-08').toISOString(),
                locked: false
            },
            {
                id: 2,
                type: "Logbook", 
                week: 2,
                title: "Week 2 - Team Formation and Roles",
                deadline: "2025-11-16",
                status: "overdue",
                description: "Document your team formation and role assignments",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: false
            }
        ],
        
        weeklyTasks: [
            {
                id: 1,
                type: "Weekly Task",
                week: 1,
                title: "Week 1 - Project Planning",
                deadline: "2025-11-09",
                status: "completed",
                description: "Complete project planning task",
                score: "A",
                grade: "A",
                comments: "Great work on project planning!",
                commentThread: [
                    {
                        id: 1,
                        sender: "mentor",
                        senderName: "Mentor John",
                        message: "Excellent planning work! Very thorough analysis.",
                        timestamp: new Date('2025-11-08T10:30:00').toISOString()
                    },
                    {
                        id: 2,
                        sender: "user",
                        senderName: "You",
                        message: "Thank you! I'll work on the improvements you suggested.",
                        timestamp: new Date('2025-11-08T14:20:00').toISOString()
                    }
                ],
                submittedFiles: ["task_week_1.pdf"],
                submittedDate: new Date('2025-11-08').toISOString(),
                locked: false,
                notes: "Completed all planning requirements"
            },
            {
                id: 2,
                type: "Weekly Task",
                week: 2, 
                title: "Week 2 - Team Formation",
                deadline: "2025-11-16",
                status: "overdue",
                description: "Form team and assign roles",
                score: null,
                grade: null,
                comments: null,
                commentThread: [],
                submittedFiles: [],
                submittedDate: null,
                locked: false,
                notes: null
            }
        ]
    }
};

// Inisialisasi aplikasi admin
document.addEventListener('DOMContentLoaded', function() {
    console.log('Admin app initializing...');
    
    // Load data dari sistem peserta
    loadParticipantData();
    
    // Cek status login
    if (adminData.isLoggedIn) {
        showAdminPanel();
    } else {
        showAdminLogin();
    }
    
    // Setup event listeners
    setupAdminEventListeners();
});

// Load data peserta dari sistem peserta
function loadParticipantData() {
    // Coba load data dari localStorage sistem peserta
    const participantData = localStorage.getItem('app_user');
    if (participantData) {
        const user = JSON.parse(participantData);
        // Cek apakah user sudah ada di data admin
        const existingUser = adminData.participants.find(p => p.email === user.email);
        if (!existingUser) {
            adminData.participants.push({
                id: adminData.participants.length + 1,
                username: user.username || "user",
                name: user.name,
                email: user.email,
                phone: user.phone,
                cvLink: user.cvLink,
                isVIP: user.isVIP || false,
                avatar: user.avatar,
                password: "123" // default password
            });
            saveParticipants();
        }
    }
}

// Tampilkan halaman login admin
function showAdminLogin() {
    document.getElementById('login-page').style.display = 'flex';
    document.getElementById('admin-panel').style.display = 'none';
}

// Tampilkan panel admin
function showAdminPanel() {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('admin-panel').style.display = 'flex';
    
    // Update info admin
    document.getElementById('admin-name').textContent = adminData.adminUser.name;
    document.getElementById('admin-email').textContent = adminData.adminUser.email;
    document.getElementById('admin-avatar').textContent = adminData.adminUser.avatar;
    
    // Load halaman dashboard
    loadAdminPage('dashboard');
}

// Setup event listeners untuk admin
function setupAdminEventListeners() {
    // Navigasi menu
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page) {
                // Update menu aktif
                document.querySelectorAll('.menu-item').forEach(i => i.classList.remove('active'));
                this.classList.add('active');
                
                // Load halaman
                loadAdminPage(page);
            }
        });
    });
}

// Load halaman admin berdasarkan nama
function loadAdminPage(pageName) {
    console.log('Loading admin page:', pageName);
    
    const pageTitle = document.getElementById('admin-page-title');
    const pageContent = document.getElementById('admin-content');
    
    if (!pageTitle || !pageContent) return;
    
    // Reset konten
    pageContent.innerHTML = '';
    
    // Render konten berdasarkan halaman
    switch(pageName) {
        case 'dashboard':
            pageTitle.textContent = 'Dashboard';
            if (typeof renderAdminDashboard === 'function') {
                renderAdminDashboard(pageContent);
            }
            break;
        case 'users':
            pageTitle.textContent = 'Manage Users';
            if (typeof renderAdminUsers === 'function') {
                renderAdminUsers(pageContent);
            }
            break;
        case 'logbooks':
            pageTitle.textContent = 'Logbook Tasks';
            if (typeof renderAdminLogbooks === 'function') {
                renderAdminLogbooks(pageContent);
            }
            break;
        case 'weekly-tasks':
            pageTitle.textContent = 'Weekly Tasks';
            if (typeof renderAdminWeeklyTasks === 'function') {
                renderAdminWeeklyTasks(pageContent);
            }
            break;
        case 'grading':
            pageTitle.textContent = 'Grading';
            if (typeof renderAdminGrading === 'function') {
                renderAdminGrading(pageContent);
            }
            break;
        case 'settings':
            pageTitle.textContent = 'Settings';
            if (typeof renderAdminSettings === 'function') {
                renderAdminSettings(pageContent);
            }
            break;
        default:
            pageTitle.textContent = 'Dashboard';
            if (typeof renderAdminDashboard === 'function') {
                renderAdminDashboard(pageContent);
            }
    }
}

// Helper Functions
function formatDate(dateString) {
    if (!dateString) return 'Not submitted';
    
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function formatDateTime(dateString) {
    if (!dateString) return 'Not submitted';
    
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit' 
    };
    return date.toLocaleDateString('en-US', options);
}

// Save data functions
function saveParticipants() {
    localStorage.setItem('participants', JSON.stringify(adminData.participants));
}

function saveTasks() {
    localStorage.setItem('app_tasks', JSON.stringify(adminData.tasks));
    // Juga update di localStorage sistem peserta
    localStorage.setItem('app_tasks', JSON.stringify(adminData.tasks));
}

// Modal functions
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'flex';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

// Setup modal event listeners
function setupModalListeners() {
    // Close modal when clicking outside
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
            }
        });
    });
    
    // Close modal with escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal-overlay').forEach(modal => {
                modal.style.display = 'none';
            });
        }
    });
}

// Initialize modal listeners
document.addEventListener('DOMContentLoaded', setupModalListeners);