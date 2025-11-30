// Mobile Sidebar Functionality
class MobileSidebar {
    constructor() {
        this.sidebar = document.getElementById('sidebar');
        this.hamburgerBtn = document.getElementById('hamburger-btn');
        this.closeSidebar = document.getElementById('close-sidebar');
        this.mobileOverlay = document.getElementById('mobile-overlay');
        this.isOpen = false;
        
        this.init();
    }
    
    init() {
        // Event Listeners
        this.hamburgerBtn.addEventListener('click', () => this.openSidebar());
        this.closeSidebar.addEventListener('click', () => this.closeSidebarHandler());
        this.mobileOverlay.addEventListener('click', () => this.closeSidebarHandler());
        
        // Close sidebar when clicking on menu items (mobile)
        document.querySelectorAll('.menu-item, .dropdown-item').forEach(item => {
            if (item.id !== 'tasks-menu' && item.id !== 'logout-btn') {
                item.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        this.closeSidebarHandler();
                    }
                });
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
        
        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.closeSidebarHandler();
            }
        });
    }
    
    openSidebar() {
        this.sidebar.classList.add('mobile-open');
        this.mobileOverlay.classList.add('active');
        this.mobileOverlay.style.display = 'block';
        this.isOpen = true;
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }
    
    closeSidebarHandler() {
        this.sidebar.classList.remove('mobile-open');
        this.mobileOverlay.classList.remove('active');
        this.isOpen = false;
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Hide overlay after transition
        setTimeout(() => {
            this.mobileOverlay.style.display = 'none';
        }, 300);
    }
    
    handleResize() {
        if (window.innerWidth > 768 && this.isOpen) {
            this.closeSidebarHandler();
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('sidebar')) {
        new MobileSidebar();
    }
});

// Update mobile avatar when user data changes
function updateMobileUserAvatar() {
    const mobileAvatar = document.getElementById('sidebar-avatar-mobile');
    const sidebarAvatar = document.getElementById('sidebar-avatar');
    
    if (mobileAvatar && sidebarAvatar) {
        mobileAvatar.textContent = sidebarAvatar.textContent;
    }
}

// Make function available globally
window.updateMobileUserAvatar = updateMobileUserAvatar;