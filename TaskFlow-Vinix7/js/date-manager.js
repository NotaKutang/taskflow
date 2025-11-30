class DateManager {
    constructor() {
        this.currentDate = new Date('2025-11-20');
        this.isInitialized = false;
        this.init();
    }

    init() {
        const savedDate = localStorage.getItem('demoCurrentDate');
        if (savedDate) {
            this.currentDate = new Date(savedDate);
        }
        
        this.updateDisplay();
        this.calculateTaskStatuses();
        
        this.isInitialized = true;
        console.log('📅 Date Manager initialized:', this.formatDateForDisplay(this.currentDate));
    }

    setDate(dateString) {
        const newDate = new Date(dateString);
        if (isNaN(newDate.getTime())) {
            console.error('❌ Invalid date format. Use YYYY-MM-DD');
            return false;
        }

        this.currentDate = newDate;
        this.saveDate();
        this.updateDisplay();
        this.calculateTaskStatuses();
        
        console.log('✅ Date changed to:', this.formatDateForDisplay(this.currentDate));
        return true;
    }

    navigateDays(days) {
        this.currentDate.setDate(this.currentDate.getDate() + days);
        return this.setDate(this.currentDate.toISOString().split('T')[0]);
    }

    resetToToday() {
        return this.setDate(new Date().toISOString().split('T')[0]);
    }

    updateDisplay() {
        const display = document.getElementById('current-date-display');
        if (display) {
            display.textContent = this.formatDateForDisplay(this.currentDate);
        }
    }

    saveDate() {
        localStorage.setItem('demoCurrentDate', this.currentDate.toISOString());
    }

    formatDateForDisplay(date) {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        };
        return date.toLocaleDateString('id-ID', options);
    }

    getCurrentDate() {
        return new Date(this.currentDate);
    }

    calculateTaskStatuses() {
    if (!appData || !appData.tasks) return;

    const tasks = appData.tasks;
    const today = this.getCurrentDate();
    
    console.log("🔄 Calculating task statuses for:", this.formatDateForDisplay(today));
    
    // ✅ DEFINE TANGGAL MULAI FIX UNTUK SETIAP WEEK
    const weekStartDates = {
        1: '2025-11-02', // Week 1 mulai 2 Nov
        2: '2025-11-09', // Week 2 mulai 9 Nov  
        3: '2025-11-16', // Week 3 mulai 16 Nov
        4: '2025-11-23', // Week 4 mulai 23 Nov
        5: '2025-11-30', // Week 5 mulai 30 Nov
        6: '2025-12-07', // Week 6 mulai 7 Des
        7: '2025-12-14', // Week 7 mulai 14 Des
        8: '2025-12-21', // Week 8 mulai 21 Des
        9: '2025-12-28', // Week 9 mulai 28 Des
        10: '2026-01-04' // Week 10 mulai 4 Jan
    };

    // Update status logbook berdasarkan tanggal
    tasks.logbooks.forEach(logbook => {
        const deadline = new Date(logbook.deadline);
        
        if (logbook.status !== 'completed') {
            if (today > deadline && !logbook.submittedDate) {
                logbook.status = 'overdue';
            } else if (!logbook.submittedDate) {
                logbook.status = 'open';
            }
        }
        
        // ✅ SISTEM BARU: UNLOCK BERDASARKAN TANGGAL MULAI FIX
        const weekStart = new Date(weekStartDates[logbook.week]);
        logbook.locked = today < weekStart;
        
        console.log(`Logbook Week ${logbook.week}: start=${weekStart.toDateString()}, locked=${logbook.locked}`);
    });
    
    // Update status weekly tasks berdasarkan tanggal
    tasks.weeklyTasks.forEach(task => {
        const deadline = new Date(task.deadline);
        
        if (task.status !== 'completed' && task.status !== 'graded') {
            if (today > deadline && !task.submittedDate) {
                task.status = 'overdue';
            } else if (!task.submittedDate) {
                task.status = 'open';
            }
        }
        
        // ✅ SISTEM BARU: UNLOCK BERDASARKAN TANGGAL MULAI FIX
        const weekStart = new Date(weekStartDates[task.week]);
        task.locked = today < weekStart;
        
        console.log(`Weekly Week ${task.week}: start=${weekStart.toDateString()}, locked=${task.locked}`);
    });

    if (typeof calculateTaskStats === 'function') {
        calculateTaskStats();
    }
    
    if (appData && appData.isLoggedIn && typeof loadPageFromHash === 'function') {
        loadPageFromHash();
    }
    
    console.log("✅ Task status calculation completed");
}

    debug() {
        console.log('=== DATE MANAGER DEBUG ===');
        console.log('Current Date:', this.formatDateForDisplay(this.currentDate));
        console.log('ISO String:', this.currentDate.toISOString());
        console.log('Local Storage:', localStorage.getItem('demoCurrentDate'));
        console.log('Available Methods:');
        console.log('  - dateManager.setDate("YYYY-MM-DD")');
        console.log('  - dateManager.navigateDays(number)');
        console.log('  - dateManager.resetToToday()');
        console.log('  - dateManager.debug()');
        console.log('==========================');
    }
}

// Initialize Date Manager
(function() {
    'use strict';
    window.dateManager = new DateManager();
    if (typeof dateManager === 'undefined') {
        window.dateManager = window.dateManager;
    }
})();