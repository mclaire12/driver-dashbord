// Sample data for demonstration
const recentActivities = [
    {
        type: 'movement',
        description: 'Completed trip from New York to Boston',
        time: '2 hours ago'
    },
    {
        type: 'fuel',
        description: 'Added 50L of fuel at Shell Station',
        time: '4 hours ago'
    },
    {
        type: 'issue',
        description: 'Reported engine check light',
        time: '1 day ago'
    }
];

// Function to populate recent activities
function populateActivities() {
    const activityList = document.querySelector('.activity-list');
    activityList.innerHTML = '';

    recentActivities.forEach(activity => {
        const activityElement = document.createElement('div');
        activityElement.className = 'activity-item';
        activityElement.innerHTML = `
            <div class="activity-icon">${getActivityIcon(activity.type)}</div>
            <div class="activity-details">
                <p class="activity-description">${activity.description}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        `;
        activityList.appendChild(activityElement);
    });
}

// Helper function to get activity icons
function getActivityIcon(type) {
    const icons = {
        movement: '🚚',
        fuel: '⛽',
        issue: '⚠️'
    };
    return icons[type] || '📝';
}

// Function to update stats
function updateStats() {
    // In a real application, this would fetch data from an API
    const stats = {
        trips: 24,
        fuel: '156L',
        issues: 2,
        status: 'Active'
    };

    document.querySelectorAll('.stat-value').forEach((element, index) => {
        const values = Object.values(stats);
        element.textContent = values[index];
    });
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Navigation handling
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.dashboard-section');
    let currentSection = 'dashboard';

    // Function to handle navigation
    function handleNavigation(targetId) {
        // Remove active class from all links and sections
        navLinks.forEach(l => l.classList.remove('active'));
        sections.forEach(s => {
            s.classList.remove('active-section');
            s.style.opacity = '0';
            s.style.transform = 'translateY(20px)';
        });
        
        // Add active class to clicked link
        document.querySelector(`a[href="#${targetId}"]`).classList.add('active');
        
        // Show corresponding section with animation
        const targetSection = document.getElementById(targetId);
        targetSection.classList.add('active-section');
        setTimeout(() => {
            targetSection.style.opacity = '1';
            targetSection.style.transform = 'translateY(0)';
        }, 50);

        // Update current section
        currentSection = targetId;
    }

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            handleNavigation(targetId);
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', function(e) {
        const targetId = window.location.hash.substring(1) || 'dashboard';
        handleNavigation(targetId);
    });

    // Initialize with dashboard section
    handleNavigation(currentSection);

    // Sample activity data
    const activities = [
        {
            type: 'trip',
            title: 'Completed Trip #1234',
            time: '2 hours ago',
            details: 'From New York to Boston',
            status: 'completed'
        },
        {
            type: 'fuel',
            title: 'Fuel Refill',
            time: '4 hours ago',
            details: 'Added 50L at Shell Station',
            status: 'completed'
        },
        {
            type: 'issue',
            title: 'New Issue Reported',
            time: '6 hours ago',
            details: 'Check Engine Light On',
            status: 'pending'
        }
    ];

    // Populate activities with enhanced styling
    const activityList = document.querySelector('.activity-list');
    activities.forEach(activity => {
        const activityItem = document.createElement('div');
        activityItem.className = `activity-item ${activity.status}`;
        activityItem.innerHTML = `
            <div class="activity-icon">
                <i class="fas fa-${getActivityIcon(activity.type)}"></i>
            </div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p class="activity-details">${activity.details}</p>
                <div class="activity-footer">
                    <span class="activity-time">${activity.time}</span>
                    <span class="activity-status">${activity.status}</span>
                </div>
            </div>
        `;
        activityList.appendChild(activityItem);
    });

    // Get appropriate icon for activity type
    function getActivityIcon(type) {
        const icons = {
            trip: 'route',
            fuel: 'gas-pump',
            issue: 'exclamation-triangle'
        };
        return icons[type] || 'circle';
    }

    // Handle notifications with dropdown
    const notificationBell = document.querySelector('.notifications');
    const notificationBadge = document.querySelector('.notification-badge');
    
    notificationBell.addEventListener('click', function() {
        // Toggle notification dropdown
        const dropdown = document.querySelector('.notification-dropdown');
        if (dropdown) {
            dropdown.remove();
        } else {
            const dropdown = document.createElement('div');
            dropdown.className = 'notification-dropdown';
            dropdown.innerHTML = `
                <div class="notification-header">
                    <h3>Notifications</h3>
                    <button class="clear-all">Clear All</button>
                </div>
                <div class="notification-list">
                    <div class="notification-item">
                        <i class="fas fa-bell"></i>
                        <div class="notification-content">
                            <p>New trip assigned</p>
                            <span>2 minutes ago</span>
                        </div>
                    </div>
                    <div class="notification-item">
                        <i class="fas fa-exclamation-circle"></i>
                        <div class="notification-content">
                            <p>Vehicle maintenance due</p>
                            <span>1 hour ago</span>
                        </div>
                    </div>
                    <div class="notification-item">
                        <i class="fas fa-check-circle"></i>
                        <div class="notification-content">
                            <p>Fuel report submitted</p>
                            <span>3 hours ago</span>
                        </div>
                    </div>
                </div>
            `;
            this.appendChild(dropdown);

            // Handle clear all button
            const clearAllBtn = dropdown.querySelector('.clear-all');
            clearAllBtn.addEventListener('click', function() {
                notificationBadge.textContent = '0';
                dropdown.remove();
            });
        }
    });

    // Handle search functionality with debounce
    const searchInput = document.querySelector('.search-bar input');
    let searchTimeout;

    searchInput.addEventListener('input', function(e) {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const searchTerm = e.target.value.toLowerCase();
            // In a real application, this would filter content based on search
            console.log('Searching for:', searchTerm);
        }, 300);
    });

    // Add hover effects to cards with smooth transitions
    const cards = document.querySelectorAll('.stats-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'var(--box-shadow)';
        });
    });

    // Handle responsive sidebar with smooth transitions
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    function handleResponsive() {
        if (window.innerWidth <= 768) {
            sidebar.style.width = '100%';
            sidebar.style.height = 'auto';
            sidebar.style.position = 'relative';
            mainContent.style.marginLeft = '0';
        } else {
            sidebar.style.width = 'var(--sidebar-width)';
            sidebar.style.height = '100vh';
            sidebar.style.position = 'fixed';
            mainContent.style.marginLeft = 'var(--sidebar-width)';
        }
    }

    // Initial check and add event listener
    handleResponsive();
    window.addEventListener('resize', handleResponsive);
}); 