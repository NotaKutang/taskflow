// Data structure untuk aplikasi
const appData = {
    // Status login
    isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
    rememberMe: localStorage.getItem('rememberMe') === 'true',
    
    // Data user
    user: JSON.parse(localStorage.getItem('app_user')) || {
        username: "user",
        name: "Jessie Anggasta",
        email: "jessie@example.com",
        phone: "+62 812-3456-7890",
        cvLink: "https://example.com/cv/jessie",
        isVIP: localStorage.getItem('isVIP') === 'true',
        avatar: "AT"
    },
    
    // Data tugas - DIPERBAIKI sesuai permintaan
    tasks: JSON.parse(localStorage.getItem('app_tasks')) || {
        // Statistik
        completed: 2,
        logbookCompleted: 1,
        pending: 2,
        overdue: 1,
        
        // Tugas mendatang
        upcoming: [
            {
                id: 2,
                type: "Logbook",
                title: "Week 2 - Team Formation and Roles",
                deadline: "2025-11-16",
                status: "overdue"
            },
            {
                id: 2,
                type: "Weekly Task",
                title: "Week 2 - Team Formation and Roles",
                deadline: "2025-11-16",
                status: "overdue"
            }
        ],
        
        // Logbook - DIPERBAIKI sesuai permintaan
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
            },
            {
                id: 3,
                type: "Logbook",
                week: 3,
                title: "Week 3 - Requirements Analysis", 
                deadline: "2025-11-23",
                status: "open",
                description: "Analyze and document project requirements",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: false
            },
            {
                id: 4,
                type: "Logbook",
                week: 4,
                title: "Week 4 - Design Phase",
                deadline: "2025-11-30", 
                status: "open",
                description: "Create design documentation and mockups",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            },
            {
                id: 5,
                type: "Logbook",
                week: 5,
                title: "Week 5 - Implementation",
                deadline: "2025-12-07",
                status: "open",
                description: "Start implementation phase",
                score: null, 
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            },
            {
                id: 6,
                type: "Logbook",
                week: 6,
                title: "Week 6 - Testing",
                deadline: "2025-12-14",
                status: "open",
                description: "Testing phase documentation",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            },
            {
                id: 7,
                type: "Logbook",
                week: 7,
                title: "Week 7 - Deployment",
                deadline: "2025-12-21",
                status: "open",
                description: "Deployment phase documentation",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            },
            {
                id: 8,
                type: "Logbook",
                week: 8,
                title: "Week 8 - Documentation",
                deadline: "2025-12-28",
                status: "open",
                description: "Final documentation",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            },
            {
                id: 9,
                type: "Logbook",
                week: 9,
                title: "Week 9 - Final Review",
                deadline: "2026-01-04",
                status: "open",
                description: "Final project review",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            },
            {
                id: 10,
                type: "Logbook",
                week: 10,
                title: "Week 10 - Presentation",
                deadline: "2026-01-11",
                status: "open",
                description: "Project presentation",
                score: null,
                comments: null,
                submittedFiles: [],
                submittedDate: null,
                locked: true
            }
        ],
            
        // Weekly tasks - DIPERBAIKI sesuai permintaan  
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
            },
            {
                id: 3,
                type: "Weekly Task",
                week: 3,
                title: "Week 3 - Requirements Analysis",
                deadline: "2025-11-23",
                status: "open",
                description: "Analyze project requirements",
                score: null,
                grade: null, 
                comments: null,
                commentThread: [],
                submittedFiles: [],
                submittedDate: null,
                locked: false,
                notes: null
            },
            {
                id: 4,
                type: "Weekly Task",
                week: 4,
                title: "Week 4 - Design Specification", 
                deadline: "2025-11-30",
                status: "open",
                description: "Create design specifications",
                score: null,
                grade: null,
                comments: null,
                commentThread: [],
                submittedFiles: [],
                submittedDate: null,
                locked: true,
                notes: null
            },
            {
                id: 5,
                type: "Weekly Task",
                week: 5,
                title: "Week 5 - Development",
                deadline: "2025-12-07",
                status: "open",
                description: "Start development work",
                score: null,
                grade: null,
                comments: null,
                commentThread: [],
                submittedFiles: [],
                submittedDate: null, 
                locked: true,
                notes: null
            },
            {
                id: 6,
                type: "Weekly Task",
                week: 6,
                title: "Week 6 - Testing Phase",
                deadline: "2025-12-14",
                status: "open",
                description: "Testing phase implementation",
                score: null,
                grade: null,
                comments: null,
                commentThread: [],
                submittedFiles: [],
                submittedDate: null,
                locked: true,
                notes: null
            },
            {
                id: 7,
                type: "Weekly Task",
                week: 7,
                title: "Week 7 - Deployment",
                deadline: "2025-12-21",
                status: "open",
                description: "Deployment preparation",
                score: null,
                grade: null,
                comments: null,
                commentThread: [],
                submittedFiles: [],
                submittedDate: null,
                locked: true,
                notes: null
            },
            {
                id: 8,
                type: "Weekly Task",
                week: 8,
                title: "Week 8 - Final Documentation",
                deadline: "2025-12-28",
                status: "open",
                description: "Complete final documentation",
                score: null,
                grade: null,
                comments: null,
                commentThread: [],
                submittedFiles: [],
                submittedDate: null,
                locked: true,
                notes: null
            },
            {
                id: 9,
                type: "Weekly Task",
                week: 9,
                title: "Week 9 - Project Review",
                deadline: "2026-01-04",
                status: "open",
                description: "Final project review",
                score: null,
                grade: null,
                comments: null,
                commentThread: [],
                submittedFiles: [],
                submittedDate: null,
                locked: true,
                notes: null
            },
            {
                id: 10,
                type: "Weekly Task",
                week: 10,
                title: "Week 10 - Final Presentation",
                deadline: "2026-01-11",
                status: "open",
                description: "Prepare final presentation",
                score: null,
                grade: null,
                comments: null,
                commentThread: [],
                submittedFiles: [],
                submittedDate: null,
                locked: true,
                notes: null
            }
        ]
    },

    
    // Data transaksi
    transactions: JSON.parse(localStorage.getItem('app_transactions')) || []
};

// Fungsi untuk menghitung statistik tugas - DIPERBAIKI
function calculateTaskStats() {
    const tasks = appData.tasks;
    
    // Hitung logbook completed - TETAP SAMA
    tasks.logbookCompleted = tasks.logbooks.filter(logbook => 
        logbook.status === "completed" && !logbook.locked
    ).length;
    
    // ========== PERBAIKAN 1: Weekly Tasks Completed ==========
    // Hitung weekly tasks completed - DIPERBAIKI: semua yang sudah disubmit (completed atau submitted)
    const weeklyCompleted = tasks.weeklyTasks.filter(task => 
        (task.status === "completed" || task.status === "submitted") && !task.locked
    ).length;
    
    // Total tasks completed - DIPERBAIKI: weekly task completed
    tasks.completed = weeklyCompleted;
    
    // ========== PERBAIKAN 2: Pending Tasks ==========
    // Hitung pending tasks (open/overdue dan belum terkunci dan belum disubmit)
    const pendingLogbooks = tasks.logbooks.filter(logbook => 
        (logbook.status === "open" || logbook.status === "overdue") && 
        !logbook.locked && 
        !logbook.submittedDate
    ).length;
    
    const pendingWeeklyTasks = tasks.weeklyTasks.filter(task => 
        (task.status === "open" || task.status === "overdue") && 
        !task.locked && 
        !task.submittedDate
    ).length;
    
    tasks.pending = pendingLogbooks + pendingWeeklyTasks;
    
    // Hitung overdue tasks - TETAP SAMA
    tasks.overdue = tasks.logbooks.filter(logbook => 
        logbook.status === "overdue" && !logbook.locked
    ).length + tasks.weeklyTasks.filter(task => 
        task.status === "overdue" && !task.locked
    ).length;
    
    // Update upcoming tasks - hanya task yang belum disubmit - DIPERBAIKI
    tasks.upcoming = [
        ...tasks.logbooks.filter(logbook => 
            (logbook.status === "open" || logbook.status === "overdue") && 
            !logbook.locked &&
            !logbook.submittedDate
        ),
        ...tasks.weeklyTasks.filter(task => 
            (task.status === "open" || task.status === "overdue") && 
            !task.locked &&
            !task.submittedDate
        )
    ]
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 5); // Batasi hingga 5 item terdekat
    
    // Simpan ke localStorage
    localStorage.setItem('app_tasks', JSON.stringify(tasks));
    
    console.log("📊 Stats Updated:", {
        weeklyCompleted: tasks.completed,
        logbookCompleted: tasks.logbookCompleted,
        pending: tasks.pending,
        overdue: tasks.overdue
    });
}


// Inisialisasi aplikasi
document.addEventListener('DOMContentLoaded', function() {
    console.log('App initializing...');
    
    // Hitung statistik awal
    calculateTaskStats();
    
    // Cek status login
    if (appData.isLoggedIn) {
        showApp();
    } else {
        showLogin();
    }
    
    // Setup event listeners
    setupEventListeners();
    
    // Setup hash routing
    setupHashRouting();
});

// Setup hash routing
function setupHashRouting() {
    console.log('Setting up hash routing...');
    window.addEventListener('hashchange', loadPageFromHash);
    // Load halaman saat pertama kali
    loadPageFromHash();
}

// Load halaman berdasarkan hash
function loadPageFromHash() {
    if (!appData.isLoggedIn) return;
    
    const hash = window.location.hash.substring(1) || 'home';
    const parts = hash.split('/');
    const mainPage = parts[0];
    const subPage = parts.slice(1).join('/'); // Fix: tangani multiple parameters
    
    // Update menu aktif
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const activeMenuItem = document.querySelector(`.menu-item[data-page="${mainPage}"]`);
    if (activeMenuItem) {
        activeMenuItem.classList.add('active');
    }
    
    // Load halaman
    loadPage(mainPage, subPage);
}

// Tampilkan halaman login
function showLogin() {
    console.log('Showing login page');
    document.getElementById('login-page').style.display = 'flex';
    document.getElementById('app').style.display = 'none';
    
    // Isi data login jika remember me aktif
    if (appData.rememberMe) {
        document.getElementById('email').value = localStorage.getItem('savedEmail') || '';
        document.getElementById('password').value = localStorage.getItem('savedPassword') || '';
        document.getElementById('remember').checked = true;
    }
}

// Tampilkan aplikasi utama
function showApp() {
    console.log('Showing main app');
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('app').style.display = 'flex';
    
    // Update informasi user di sidebar
    const sidebarUserName = document.getElementById('sidebar-user-name');
    const sidebarUserEmail = document.getElementById('sidebar-user-email');
    const sidebarAvatar = document.getElementById('sidebar-avatar');
    
    if (sidebarUserName) {
        sidebarUserName.textContent = appData.user.name;
    }
    if (sidebarUserEmail) {
        sidebarUserEmail.textContent = appData.user.email;
    }
    if (sidebarAvatar) {
        sidebarAvatar.textContent = appData.user.avatar;
    }

    // ✅ TAMBAHKAN INI: Update mobile avatar juga saat pertama kali login
    if (typeof updateMobileUserAvatar === 'function') {
        updateMobileUserAvatar();
    }
}

// Setup semua event listeners
function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Tasks menu dropdown
    const tasksMenu = document.getElementById('tasks-menu');
    if (tasksMenu) {
        tasksMenu.addEventListener('click', function() {
            const dropdown = document.getElementById('tasks-dropdown');
            if (dropdown) {
                dropdown.classList.toggle('active');
                
                const arrow = this.querySelector('.dropdown-arrow');
                if (arrow) {
                    arrow.classList.toggle('ri-arrow-down-s-line');
                    arrow.classList.toggle('ri-arrow-up-s-line');
                }
            }
        });
    }
    
    // Navigasi menu
    document.querySelectorAll('.menu-item').forEach(item => {
        if (item.id !== 'logout-btn' && item.id !== 'tasks-menu') {
            item.addEventListener('click', function() {
                const page = this.getAttribute('data-page');
                if (page) {
                    console.log('Navigating to:', page);
                    window.location.hash = page;
                }
            });
        }
    });
    
    // Navigasi dropdown
    document.querySelectorAll('.dropdown-item').forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page) {
                console.log('Navigating to:', page);
                window.location.hash = page;
            }
        });
    });
    
    
    // Tombol logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Date Picker functionality
    setupDatePicker();
}
// Fungsi untuk setup date picker
function setupDatePicker() {
    const dateIndicator = document.getElementById('date-indicator');
    const datePickerModal = document.getElementById('date-picker-modal');
    const dateInput = document.getElementById('date-input');
    const closeBtn = document.getElementById('close-date-picker');
    const cancelBtn = document.getElementById('cancel-date');
    const applyBtn = document.getElementById('apply-date');
    const prevDayBtn = document.getElementById('prev-day');
    const nextDayBtn = document.getElementById('next-day');
    const resetDateBtn = document.getElementById('reset-date');

    if (!dateIndicator || !datePickerModal) return;

    // Buka modal date picker
    dateIndicator.addEventListener('click', function() {
        if (window.dateManager) {
            const currentDate = window.dateManager.getCurrentDate();
            dateInput.value = currentDate.toISOString().split('T')[0];
            datePickerModal.style.display = 'flex';
        }
    });

    // Tutup modal
    function closeModal() {
        datePickerModal.style.display = 'none';
    }

    closeBtn?.addEventListener('click', closeModal);
    cancelBtn?.addEventListener('click', closeModal);

    // Apply date
    applyBtn?.addEventListener('click', function() {
        if (window.dateManager && dateInput.value) {
            const success = window.dateManager.setDate(dateInput.value);
            if (success) {
                closeModal();
            }
        }
    });

    // Navigasi hari
    prevDayBtn?.addEventListener('click', function() {
        if (window.dateManager) {
            window.dateManager.navigateDays(-1);
            const currentDate = window.dateManager.getCurrentDate();
            dateInput.value = currentDate.toISOString().split('T')[0];
        }
    });

    nextDayBtn?.addEventListener('click', function() {
        if (window.dateManager) {
            window.dateManager.navigateDays(1);
            const currentDate = window.dateManager.getCurrentDate();
            dateInput.value = currentDate.toISOString().split('T')[0];
        }
    });

    // Reset ke hari ini
    resetDateBtn?.addEventListener('click', function() {
        if (window.dateManager) {
            window.dateManager.resetToToday();
            const currentDate = window.dateManager.getCurrentDate();
            dateInput.value = currentDate.toISOString().split('T')[0];
        }
    });

    // Tutup modal saat klik di luar
    datePickerModal.addEventListener('click', function(e) {
        if (e.target === datePickerModal) {
            closeModal();
        }
    });
}

// Handle logout
function handleLogout() {
    console.log('Logging out...');
    appData.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    showLogin();
    
    // Reset form login
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
}

// Load halaman berdasarkan nama
function loadPage(pageName, subPage = null) {
    console.log('Loading page:', pageName, 'subPage:', subPage);
    
    const pageTitle = document.getElementById('page-title');
    const pageContent = document.getElementById('page-content');
    
    if (!pageTitle || !pageContent) {
        console.error('Page title or content element not found');
        return;
    }
    
    // Reset konten
    pageContent.innerHTML = '';
    
    // Render konten berdasarkan halaman
    switch(pageName) {
        case 'home':
            pageTitle.textContent = 'Dashboard';
            if (typeof renderHomePage === 'function') {
                renderHomePage(pageContent);
            }
            break;
        case 'tasks':
            pageTitle.textContent = 'Tasks';
            if (typeof renderTasksPage === 'function') {
                renderTasksPage(pageContent);
            }
            break;
        case 'logbook':
            pageTitle.textContent = 'Tasks - Logbook';
            if (typeof renderLogbookPage === 'function') {
                renderLogbookPage(pageContent);
            }
            break;
        case 'weekly-tasks':
            pageTitle.textContent = 'Tasks - Weekly Tasks';
            if (typeof renderWeeklyTasksPage === 'function') {
                renderWeeklyTasksPage(pageContent);
            }
            break;
        case 'task-detail':
            pageTitle.textContent = 'Task Details';
            if (typeof renderTaskDetailPage === 'function') {
                renderTaskDetailPage(pageContent, subPage);
            }
            break;
        case 'task-view':
            pageTitle.textContent = 'View Task';
            if (typeof renderTaskViewPage === 'function') {
                renderTaskViewPage(pageContent, subPage);
            }
            break;

        case 'profile':
            pageTitle.textContent = 'Profile';
            renderProfilePage(pageContent);
            break;
        case 'edit-profile':
            pageTitle.textContent = 'Edit Profile';
            renderEditProfilePage(pageContent);
            break;
        case 'change-password':
            pageTitle.textContent = 'Change Password';
            renderChangePasswordPage(pageContent);
            break;
        default:
            pageTitle.textContent = 'Dashboard';
            if (typeof renderHomePage === 'function') {
                renderHomePage(pageContent);
            }
    }
}

// =============================================
// FUNGSI RENDER HALAMAN PROFILE
// =============================================

// Render halaman Profile
function renderProfilePage(container) {
    console.log('Rendering profile page');
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
    const editProfileBtn = document.getElementById('edit-profile-btn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            console.log('Navigating to edit profile');
            window.location.hash = 'edit-profile';
        });
    }
    
    // Event listener untuk change password
    const changePasswordBtn = document.getElementById('change-password-btn');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function() {
            console.log('Navigating to change password');
            window.location.hash = 'change-password';
        });
    }
    
    // Event listener untuk reset demo
    const resetDemoBtn = document.getElementById('reset-demo');
    if (resetDemoBtn) {
        resetDemoBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
                localStorage.clear();
                location.reload();
            }
        });
    }
    

    // ✅ TAMBAHKAN INI: Update mobile avatar juga saat membuka profile page
    if (typeof updateMobileUserAvatar === 'function') {
        updateMobileUserAvatar();
    }
}

// Render halaman Edit Profile
function renderEditProfilePage(container) {
    console.log('Rendering edit profile page');
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
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', function() {
            console.log('Canceling edit, going back');
            window.history.back();
        });
    }
    
    // Event listener untuk save profile
    const saveProfileBtn = document.getElementById('save-profile');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', function() {
            console.log('Save profile clicked');
            // Tampilkan konfirmasi sebelum menyimpan
            if (confirm('Are you sure you want to save these changes?')) {
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
                const sidebarUserEmail = document.getElementById('sidebar-user-email');
                const sidebarAvatar = document.getElementById('sidebar-avatar');
                
                if (sidebarUserName) sidebarUserName.textContent = name;
                if (sidebarUserEmail) sidebarUserEmail.textContent = appData.user.email;
                if (sidebarAvatar) sidebarAvatar.textContent = appData.user.avatar;
                
                // ✅ TAMBAHKAN INI: Update mobile avatar juga
                if (typeof updateMobileUserAvatar === 'function') {
                    updateMobileUserAvatar();
                }
                
                alert('Profile updated successfully!');
                window.history.back();
            }
        });
    }
}

// Render halaman Change Password
function renderChangePasswordPage(container) {
    console.log('Rendering change password page');
    
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
    const cancelPasswordBtn = document.getElementById('cancel-password-btn');
    if (cancelPasswordBtn) {
        cancelPasswordBtn.addEventListener('click', function() {
            console.log('Canceling password change, going back');
            window.history.back();
        });
    }
    
    // Event listener untuk save password
    const savePasswordBtn = document.getElementById('save-password');
    if (savePasswordBtn) {
        savePasswordBtn.addEventListener('click', function() {
            console.log('Save password clicked');
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            
            // Validasi
            if (!currentPassword || !newPassword || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            
            if (newPassword !== confirmPassword) {
                alert('New password and confirm password do not match');
                return;
            }
            
            // Tampilkan konfirmasi
            if (confirm('Are you sure you want to change your password?')) {
                // Simulasi perubahan password
                alert('Password changed successfully!');
                window.history.back();
            }
        });
    }
}


// =============================================
// INISIALISASI TAMBAHAN UNTUK DEBUGGING
// =============================================

// Tambahkan debugging info
console.log('App data initialized:', appData);
console.log('Current hash:', window.location.hash);

// Pastikan fungsi tersedia secara global untuk event handler
window.handleLogout = handleLogout;
window.calculateTaskStats = calculateTaskStats;