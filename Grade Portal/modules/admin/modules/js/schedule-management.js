let currentWeekOffset = 0;
let scheduleData = [];
let courseData = [];
let currentScheduleId = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeCourseData();
    initializeData();
    setupEventListeners();
    updateWeekDisplay();
    loadCalendar();
    loadScheduleList();
});

// Initialize course data from provided Excel files
function initializeCourseData() {
    // College courses from Class_List_by_Section-49.xlsx
    const collegeCourses = [
        { code: 'STIC1002', description: 'Euthenics 1' },
        { code: 'GEDC1005', description: 'Math in the Modern World' },
        { code: 'NSTP1008', description: 'NSTP 1' },
        { code: 'GEDC1008', description: 'Understanding the Self' },
        { code: 'STIC1003', description: 'Computer Productivity Tools' },
        { code: 'PSYC1043', description: 'Introduction to Psychology' },
        { code: 'PHED1005', description: 'PE./PATH/FIT 1: (MCT)' },
        { code: 'GEDC1002', description: 'The Contemporary World' },
        { code: 'GEDC1006', description: 'Readings in Philippine History' },
        { code: 'PSYC1045', description: 'Developmental Psychology' },
        { code: 'GEDC1003', description: 'The Entrepreneurial Mind' },
        { code: 'PHED1007', description: 'PE./PATH/FIT 3: (I & DS)' },
        { code: 'PSYC1046', description: 'Physiological/Biological Psych' },
        { code: 'BUSS1001', description: 'Basic Microeconomics' },
        { code: 'GEDC1016', description: 'Purposive Communication' },
        { code: 'BUSS1005', description: 'Costing and Pricing' },
        { code: 'BUSS1007', description: 'Facilities Management' },
        { code: 'GEDC1014', description: 'Rizal\'s Life and Works' },
        { code: 'GEDC1041', description: 'Philippine Popular Culture' },
        { code: 'BUSS1017', description: 'International Business & Trade' },
        { code: 'CBMC1001', description: 'Operations Management (TOM)' },
        { code: 'GEDC1045', description: 'Great Books' },
        { code: 'BUSS1016', description: 'Good Governance & Social Resp' },
        { code: 'BUSS1019', description: 'Managerial Accounting' },
        { code: 'BUSS1015', description: 'Business Research' },
        { code: 'BUSS1027', description: 'Special Topics in Oper Mgt' },
        { code: 'BUSS1026', description: 'Marketing Management' },
        { code: 'BUSS1025', description: 'Entrepreneurial Management' },
        { code: 'STIC1007', description: 'Euthenics 2' },
        { code: 'BUSS1020', description: 'Financial Management' },
        { code: 'BUSS1024', description: 'Feasibility Study' },
        { code: 'CITE1004', description: 'Introduction to Computing' },
        { code: 'CITE1003', description: 'Computer Programming 1' },
        { code: 'PHED1001', description: 'Physical Education 1 (PF & C)' },
        { code: 'CITE1010', description: 'Computer Programming 3' },
        { code: 'COSC1006', description: 'Discrete Structures 2' },
        { code: 'COSC1001', description: 'Principles of Communication' },
        { code: 'COSC1003', description: 'Data Structures and Algorithms' },
        { code: 'COSC1021', description: 'Software Engineering 1' },
        { code: 'COSC1030', description: 'Intermediate Web Programming' },
        { code: 'COSC1028', description: 'Artificial Intelligence' },
        { code: 'COSC1014', description: 'Theory of Comput w/ Automata' },
        { code: 'COSC1048', description: 'Methods of Research' },
        { code: 'INTE1007', description: 'Quantitative Methods (DA)' },
        { code: 'INSY1010', description: 'Info Assurance & Sec (CF)' },
        { code: 'CITE1008', description: 'App Dev & Emerging Tech' },
        { code: 'INTE1005', description: 'Network Technology 1' },
        { code: 'INSY1005', description: 'Info Assurance & Sec (DP)' },
        { code: 'INSY1003', description: 'Prof Issues in Info Sys & Tech' },
        { code: 'BUSS1013', description: 'Technopreneurship' },
        { code: 'INSY1027', description: 'Software Quality Assurance' },
        { code: 'COSC1050', description: 'CS Thesis 2' },
        { code: 'COSC1008', description: 'Platform Technology (OS)' },
        { code: 'GEDC1010', description: 'Art Appreciation' },
        { code: 'GEDC1013', description: 'Science, Technology, & Society' },
        { code: 'CITE1006', description: 'Computer Programming 2' },
        { code: 'NSTP1010', description: 'NSTP 2' },
        { code: 'COSC1002', description: 'Discrete Structures 1 (DM)' },
        { code: 'GEDC1009', description: 'Ethics' },
        { code: 'PHED1006', description: 'P.E./PATHFIT 2: (EFA)' },
        { code: 'INTE1006', description: 'Systems Admin & Maintenance' },
        { code: 'COSC1007', description: 'Human-Computer Interaction' },
        { code: 'INTE1044', description: 'Object-Oriented Programming' },
        { code: 'INTE1021', description: 'Systems Integration & Arch' },
        { code: 'CITE1011', description: 'Information Management' },
        { code: 'INTE1020', description: 'Quantitative Methods' },
        { code: 'INTE1010', description: 'Integrative Programming' },
        { code: 'PHED1008', description: 'P.E./PATHFIT 4: (TS)' },
        { code: 'INSY1011', description: 'Advanced Database Systems' },
        { code: 'INTE1025', description: 'Data & Digital Comm (Data Com)' },
        { code: 'INTE1024', description: 'Event-Driven Programming' },
        { code: 'INTE1056', description: 'Advance Sys Integration & Arch' },
        { code: 'INTE1086', description: 'Enterprise Architecture' },
        { code: 'INTE1050', description: 'Game Development' },
        { code: 'INTE1039', description: 'IT Capstone Project 2' },
        { code: 'INTE1041', description: 'Computer Graphics Programming' },
        { code: 'INTE1013', description: 'IT Service Management' },
        { code: 'INTE1030', description: 'Network Technology 2' },
        { code: 'CTHC1003', description: 'Macro Pispctv of Tourism & Hosp' },
        { code: 'CTHC1004', description: 'Risk Mgt as Applied to SSS' },
        { code: 'CTHC1008', description: 'Quality Serv Mgt Tour & Hosp' },
        { code: 'TOUR1007', description: 'Accommodation Operations & Mgt' },
        { code: 'TOUR1008', description: 'Tour and Travel Management' },
        { code: 'TOUR1009', description: 'Sustainable Tourism' },
        { code: 'CTHC1010', description: 'Foreign Language 1' },
        { code: 'CTHC1013', description: 'Profe Dev & Applied Ethics' },
        { code: 'CTHC1014', description: 'Tourism & Hospitality Mrkq' },
        { code: 'TOUR1016', description: 'Applied Busi Tools & Tech Tour' },
        { code: 'CTHC1015', description: 'Multicultural Diversity in WTP' },
        { code: 'TOUR1020', description: 'Airline/ Flight Operations Mgt' },
        { code: 'TOUR1021', description: 'Research in Tourism' }
    ];

    // SHS courses from Class_List_by_Section-50.xlsx
    const shsCourses = [
        { code: 'CORE1001', description: '21st Century Literature' },
        { code: 'CORE1006', description: 'General Mathematics' },
        { code: 'CORE1013', description: 'Physical Education & Health 1' },
        { code: 'CORE1007', description: 'Intro to the Philo of Human' },
        { code: 'CORE1010', description: 'Oral Communication' },
        { code: 'CORE1009', description: 'Media and Information Literacy' },
        { code: 'SPECIAL101', description: 'Business Mathematics' },
        { code: 'SPECIAL106', description: 'Organization & Management' },
        { code: 'CORE1021', description: 'Homeroom G11-1st Term' },
        { code: 'CORE1017', description: 'Physical Science' },
        { code: 'CORE1012', description: 'Personal Development' },
        { code: 'APPLIED100', description: 'English for Academic & Prof' },
        { code: 'CORE1011', description: 'Pagbasa at Pagsusuri' },
        { code: 'APPLIED101', description: 'Practical Research 2' },
        { code: 'SPECIAL104', description: 'Funda of Accountancy, BM 2' },
        { code: 'CORE1015', description: 'Physical Education & Health 3' },
        { code: 'CORE1023', description: 'Homeroom G12-1st Term' },
        { code: 'CORE1025', description: 'Student Org & Clubs - G11-1st' },
        { code: 'CORE1027', description: 'Student Org & Clubs - G12-1st' },
        { code: 'SPECIAL105', description: 'Intro to World Rel & BS' },
        { code: 'SPECIAL1034', description: 'Disciplines & Ideas in the SS' },
        { code: 'SPECIAL1067', description: 'Philippine Politics & Gov' },
        { code: 'SPECIAL1026', description: 'Creative Nonfiction' },
        { code: 'SPECIAL1094', description: 'Computer/Web Programming 2' },
        { code: 'SPECIAL1093', description: 'Computer/Web Programming 1' },
        { code: 'SPECIAL109', description: 'Computer/Web Programming 4' },
        { code: 'SPECIAL1095', description: 'Computer/Web Programming 5' },
        { code: 'SPECIAL104', description: 'General Biology 1' },
        { code: 'SPECIAL106', description: 'Pre-Calculus' },
        { code: 'SPECIAL104', description: 'General Chemistry 1' },
        { code: 'SPECIAL104', description: 'General Physics 1' },
        { code: 'CORE1003', description: 'Disaster Readiness & Risk Redu' },
        { code: 'SPECIAL1059', description: 'Intro to Travel & Tour Ind' },
        { code: 'SPECIAL1037', description: 'Front Office Services 1' },
        { code: 'SPECIAL1073', description: 'Tourism Sales & Market Princ' },
        { code: 'SPECIAL1060', description: 'Introduction to Travel Service' }
    ];

    // Combine college and SHS courses
    courseData = [...collegeCourses, ...shsCourses];
    
    // Populate the course dropdown
    populateCourseDropdown();
}

// Populate course dropdown with all courses
function populateCourseDropdown() {
    const dropdown = document.getElementById('courseDropdown');
    dropdown.innerHTML = '';
    
    courseData.forEach(course => {
        const item = document.createElement('div');
        item.className = 'dropdown-item';
        item.innerHTML = `
            <span class="dropdown-code">${course.code}</span>
            <span class="dropdown-description">${course.description}</span>
        `;
        item.addEventListener('click', function() {
            document.getElementById('courseCode').value = course.code;
            dropdown.classList.remove('active');
        });
        dropdown.appendChild(item);
    });
}

// Filter courses based on search input
function filterCourses(searchTerm) {
    const dropdown = document.getElementById('courseDropdown');
    const items = dropdown.getElementsByClassName('dropdown-item');
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const text = item.textContent.toLowerCase();
        if (text.includes(searchTerm.toLowerCase())) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    }
}

// Initialize sample data
function initializeData() {
    scheduleData = [
        {
            id: 'cs101-a',
            course: 'CS101 - Programming',
            teacher: 'Prof. Rodriguez',
            schedule: 'Mon/Wed 8:00-10:00 AM',
            room: 'Room 301',
            status: 'Active',
            day: 'Monday',
            startTime: '8:00 AM',
            endTime: '10:00 AM',
            duration: 2,
            color: 'schedule-cs'
        },
        {
            id: 'it101-b',
            course: 'IT101 - Systems',
            teacher: 'Prof. Santos',
            schedule: 'Wed/Fri 9:00-11:00 AM',
            room: 'Room 205',
            status: 'Active',
            day: 'Wednesday',
            startTime: '9:00 AM',
            endTime: '11:00 AM',
            duration: 2,
            color: 'schedule-it'
        },
        {
            id: 'cs201-a',
            course: 'CS201 - Data Structures',
            teacher: 'Prof. Garcia',
            schedule: 'Tue/Thu 10:00-12:00 PM',
            room: 'Room 302',
            status: 'Conflict',
            day: 'Tuesday',
            startTime: '10:00 AM',
            endTime: '12:00 PM',
            duration: 2,
            color: 'schedule-orange'
        },
        {
            id: 'ba101-c',
            course: 'BA101 - Business Ethics',
            teacher: 'Prof. Johnson',
            schedule: 'Mon/Fri 1:00-3:00 PM',
            room: 'Room 401',
            status: 'Active',
            day: 'Monday',
            startTime: '1:00 PM',
            endTime: '3:00 PM',
            duration: 2,
            color: 'schedule-ba'
        },
        {
            id: 'ma101-d',
            course: 'MA101 - Calculus',
            teacher: 'Prof. Lee',
            schedule: 'Tue/Thu 3:00-5:00 PM',
            room: 'Room 402',
            status: 'Active',
            day: 'Tuesday',
            startTime: '3:00 PM',
            endTime: '5:00 PM',
            duration: 2,
            color: 'schedule-purple'
        },
        {
            id: 'en101-e',
            course: 'EN101 - English',
            teacher: 'Prof. Martinez',
            schedule: 'Wed/Sat 4:00-6:00 PM',
            room: 'Room 501',
            status: 'Active',
            day: 'Saturday',
            startTime: '4:00 PM',
            endTime: '6:00 PM',
            duration: 2,
            color: 'schedule-brown'
        },
        {
            id: 'phy101-f',
            course: 'PHY101 - Physics',
            teacher: 'Prof. Wilson',
            schedule: 'Mon/Wed 7:00-9:00 AM',
            room: 'Room 301',
            status: 'Active',
            day: 'Monday',
            startTime: '7:00 AM',
            endTime: '9:00 AM',
            duration: 2,
            color: 'schedule-cs'
        },
        {
            id: 'chem101-g',
            course: 'CHEM101 - Chemistry',
            teacher: 'Prof. Brown',
            schedule: 'Thu/Sat 6:00-8:00 PM',
            room: 'Room 205',
            status: 'Active',
            day: 'Thursday',
            startTime: '6:00 PM',
            endTime: '8:00 PM',
            duration: 2,
            color: 'schedule-it'
        }
    ];
}

// Setup event listeners
function setupEventListeners() {
    // Mobile menu functionality
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.querySelector(".sidebar");
    
    if (menuToggle && sidebar) {
        menuToggle.addEventListener("click", () => {
            sidebar.classList.toggle("open");
        });
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (event) => {
            if (window.innerWidth < 992 && sidebar.classList.contains('open')) {
                if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
                    sidebar.classList.remove('open');
                }
            }
        });
    }
    
    // Dark mode toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    if (themeToggle && themeIcon) {
        // Check for saved theme preference or respect OS preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Set initial theme
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        }
        
        // Toggle theme
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            
            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            }
        });
    }
    
    // Tab functionality
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Week navigation
    document.getElementById('prevWeekBtn').addEventListener('click', () => changeWeek(-1));
    document.getElementById('nextWeekBtn').addEventListener('click', () => changeWeek(1));

    // Modal buttons
    document.getElementById('addScheduleBtn').addEventListener('click', showAddModal);
    document.getElementById('closeAddModal').addEventListener('click', closeAddModal);
    document.getElementById('cancelAddBtn').addEventListener('click', closeAddModal);
    document.getElementById('saveScheduleBtn').addEventListener('click', saveSchedule);

    // Time calculation for modal
    document.getElementById('startTime').addEventListener('change', updateEndTime);
    document.getElementById('durationSelect').addEventListener('change', updateEndTime);

    // Export button
    document.getElementById('exportSchedulesBtn').addEventListener('click', exportSchedules);
    
    // Search functionality
    document.getElementById('scheduleSearch').addEventListener('input', function() {
        filterSchedules(this.value);
    });

    // Close modal when clicking outside
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('addModal');
        if (modal && event.target === modal) {
            closeAddModal();
        }
        
        const detailsModal = document.getElementById('scheduleDetailsModal');
        if (detailsModal && event.target === detailsModal) {
            closeDetailsModal();
        }
        
        const bulkModal = document.getElementById('bulkUploadModal');
        if (bulkModal && event.target === bulkModal) {
            closeBulkUploadModal();
        }
        
        // Close course dropdown when clicking outside
        const courseInput = document.getElementById('courseCode');
        const dropdown = document.getElementById('courseDropdown');
        if (courseInput && dropdown && !courseInput.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.remove('active');
        }
    });

    // Course code dropdown functionality
    const courseInput = document.getElementById('courseCode');
    const dropdown = document.getElementById('courseDropdown');
    
    if (courseInput && dropdown) {
        courseInput.addEventListener('input', function() {
            filterCourses(this.value);
            dropdown.classList.add('active');
        });
        
        courseInput.addEventListener('focus', function() {
            dropdown.classList.add('active');
        });
    }

    // Schedule Details Modal functionality
    document.getElementById('closeDetailsModal').addEventListener('click', closeDetailsModal);
    document.getElementById('closeDetailsBtn').addEventListener('click', closeDetailsModal);
    document.getElementById('editDetailsBtn').addEventListener('click', editScheduleFromDetails);

    // Bulk Upload functionality
    document.getElementById('bulkUploadBtn').addEventListener('click', showBulkUploadModal);
    document.getElementById('closeBulkUploadModal').addEventListener('click', closeBulkUploadModal);
    document.getElementById('cancelBulkUploadBtn').addEventListener('click', closeBulkUploadModal);
    document.getElementById('downloadTemplateBtn').addEventListener('click', downloadTemplate);
    document.getElementById('browseFileBtn').addEventListener('click', triggerFileInput);
    document.getElementById('excelFileInput').addEventListener('change', handleFileSelect);
    document.getElementById('processUploadBtn').addEventListener('click', processBulkUpload);

    // Import button
    document.getElementById('importSchedulesBtn').addEventListener('click', importSchedules);

    // Add drag and drop functionality
    const uploadArea = document.getElementById('uploadArea');
    if (uploadArea) {
        uploadArea.addEventListener('dragover', handleDragOver);
        uploadArea.addEventListener('dragleave', handleDragLeave);
        uploadArea.addEventListener('drop', handleFileDrop);
        uploadArea.addEventListener('click', triggerFileInput);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // Escape to close modals
        if (event.key === 'Escape') {
            closeAddModal();
            closeDetailsModal();
            closeBulkUploadModal();
            dropdown.classList.remove('active');
        }
        
        // Ctrl/Cmd + N for new schedule
        if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
            event.preventDefault();
            showAddModal();
        }
    });
}

// Update end time based on start time and duration
function updateEndTime() {
    const startTime = document.getElementById('startTime').value;
    const duration = parseFloat(document.getElementById('durationSelect').value);
    
    if (!startTime) return;
    
    // Calculate end time
    const [hours, minutes] = startTime.split(':').map(Number);
    let endHours = hours + Math.floor(duration);
    let endMinutes = minutes + ((duration % 1) * 60);
    
    // Handle minute overflow
    if (endMinutes >= 60) {
        endHours += 1;
        endMinutes -= 60;
    }
    
    // Format end time
    const formattedEndTime = `${endHours.toString().padStart(2, '0')}:${endMinutes.toString().padStart(2, '0')}`;
    document.getElementById('endTime').value = formattedEndTime;
}

// Tab switching
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const activeTabBtn = document.querySelector(`[data-tab="${tabName}"]`);
    if (activeTabBtn) {
        activeTabBtn.classList.add('active');
    }

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    const activeTabContent = document.getElementById(tabName);
    if (activeTabContent) {
        activeTabContent.classList.add('active');
    }
}

// Week navigation
function changeWeek(offset) {
    currentWeekOffset += offset;
    updateWeekDisplay();
    loadCalendar();
}

function updateWeekDisplay() {
    const today = new Date();
    const weekStart = new Date(today.setDate(today.getDate() + (currentWeekOffset * 7)));
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    const options = { month: 'short', day: 'numeric' };
    const startStr = weekStart.toLocaleDateString('en-US', options);
    const endStr = weekEnd.toLocaleDateString('en-US', options);
    
    document.getElementById('weekDisplay').textContent = `Week of ${startStr} - ${endStr}, ${weekEnd.getFullYear()}`;
}

// Load calendar data
function loadCalendar() {
    const calendarBody = document.getElementById('calendarBody');
    
    // Create time slots from 7AM to 7PM
    const timeSlots = [];
    for (let hour = 7; hour <= 19; hour++) {
        const timeString = `${hour % 12 === 0 ? 12 : hour % 12}:00 ${hour < 12 ? 'AM' : 'PM'}`;
        timeSlots.push({
            time: `${hour}:00`,
            display: timeString
        });
    }

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    calendarBody.innerHTML = timeSlots.map(timeSlot => `
        <tr>
            <td style="color: var(--medium-gray); font-size: 12px;">${timeSlot.display}</td>
            ${days.map(day => {
                const scheduleItem = getScheduleForDayAndTime(day, timeSlot.time);
                return scheduleItem ? `
                    <td>
                        <div class="schedule-item ${scheduleItem.color}" onclick="viewDetails('${scheduleItem.id}')">
                            <div class="time-range">${scheduleItem.startTime} - ${scheduleItem.endTime}</div>
                            <div class="course-info">${scheduleItem.course.split(' - ')[0]}</div>
                            <div class="room-info">${scheduleItem.room}</div>
                        </div>
                    </td>
                ` : '<td></td>';
            }).join('')}
        </tr>
    `).join('');
}

function getScheduleForDayAndTime(day, time) {
    // Find schedule items that match the day and start time
    return scheduleData.find(schedule => 
        schedule.day === day && schedule.startTime === formatTimeForCalendar(time)
    );
}

function formatTimeForCalendar(timeString) {
    // Convert 24h time to 12h format for comparison
    const [hours] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:00 ${ampm}`;
}

// Load schedule list
function loadScheduleList() {
    const scheduleListBody = document.getElementById('scheduleListBody');
    
    scheduleListBody.innerHTML = scheduleData.map(schedule => `
        <tr ${schedule.status === 'Conflict' ? 'style="background-color: #ffebee;"' : ''}>
            <td style="color: var(--dark-gray);">${schedule.course}</td>
            <td style="color: var(--dark-gray);">${schedule.teacher}</td>
            <td style="color: var(--dark-gray);">${schedule.schedule}</td>
            <td style="color: var(--dark-gray);">${schedule.room}</td>
            <td>
                <span class="status-badge ${schedule.status === 'Active' ? 'status-active' : 'status-conflict'}">
                    ${schedule.status}
                </span>
            </td>
            <td>
                <button class="action-btn" onclick="editSchedule('${schedule.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                ${schedule.status === 'Conflict' ? `
                    <button class="action-btn" onclick="resolveConflict('${schedule.id}')">
                        <i class="fas fa-exclamation-triangle"></i>
                    </button>
                ` : ''}
            </td>
        </tr>
    `).join('');
}

// Filter schedules
function filterSchedules(query) {
    const filteredSchedules = scheduleData.filter(schedule => 
        schedule.course.toLowerCase().includes(query.toLowerCase()) ||
        schedule.teacher.toLowerCase().includes(query.toLowerCase()) ||
        schedule.room.toLowerCase().includes(query.toLowerCase())
    );
    
    const scheduleListBody = document.getElementById('scheduleListBody');
    
    scheduleListBody.innerHTML = filteredSchedules.map(schedule => `
        <tr ${schedule.status === 'Conflict' ? 'style="background-color: #ffebee;"' : ''}>
            <td style="color: var(--dark-gray);">${schedule.course}</td>
            <td style="color: var(--dark-gray);">${schedule.teacher}</td>
            <td style="color: var(--dark-gray);">${schedule.schedule}</td>
            <td style="color: var(--dark-gray);">${schedule.room}</td>
            <td>
                <span class="status-badge ${schedule.status === 'Active' ? 'status-active' : 'status-conflict'}">
                    ${schedule.status}
                </span>
            </td>
            <td>
                <button class="action-btn" onclick="editSchedule('${schedule.id}')">
                    <i class="fas fa-edit"></i>
                </button>
                ${schedule.status === 'Conflict' ? `
                    <button class="action-btn" onclick="resolveConflict('${schedule.id}')">
                        <i class="fas fa-exclamation-triangle"></i>
                    </button>
                ` : ''}
            </td>
        </tr>
    `).join('');
}

// Modal functions
function showAddModal() {
    document.getElementById('addModal').classList.add('active');
    updateEndTime(); // Initialize end time
}

function closeAddModal() {
    document.getElementById('addModal').classList.remove('active');
    document.getElementById('addScheduleForm').reset();
    document.getElementById('courseDropdown').classList.remove('active');
}

function saveSchedule() {
    const courseCode = document.getElementById('courseCode').value;
    const teacher = document.getElementById('teacherSelect').value;
    const day = document.getElementById('daySelect').value;
    const startTime = document.getElementById('startTime').value;
    const endTime = document.getElementById('endTime').value;
    const duration = parseFloat(document.getElementById('durationSelect').value);
    const room = document.getElementById('roomSelect').value;

    if (!courseCode || !teacher || !day || !startTime || !room) {
        showAlert('Please fill in all fields', 'warning');
        return;
    }

    // Get course description
    const course = courseData.find(c => c.code === courseCode);
    const courseDescription = course ? course.description : 'Course';

    // Create new schedule object
    const newSchedule = {
        id: `${courseCode.toLowerCase()}-${Date.now()}`,
        course: `${courseCode} - ${courseDescription}`,
        teacher: teacher,
        schedule: `${day} ${formatTime(startTime)}-${formatTime(endTime)}`,
        room: room,
        status: 'Active',
        day: day,
        startTime: formatTime(startTime),
        endTime: formatTime(endTime),
        duration: duration,
        color: getCourseColor(courseCode)
    };

    // Add to schedule data
    scheduleData.push(newSchedule);

    // Refresh displays
    loadCalendar();
    loadScheduleList();

    showAlert('Schedule added successfully!', 'success');
    closeAddModal();
}

function getCourseColor(code) {
    const colors = {
        'CS101': 'schedule-cs',
        'IT101': 'schedule-it',
        'BA101': 'schedule-ba',
        'CS201': 'schedule-orange',
        'MA101': 'schedule-purple',
        'EN101': 'schedule-brown',
        'PHY101': 'schedule-cs',
        'CHEM101': 'schedule-it'
    };
    
    // Default color based on course prefix
    if (code.startsWith('CS') || code.startsWith('COSC') || code.startsWith('CITE') || code.startsWith('INTE') || code.startsWith('INSY')) {
        return 'schedule-cs';
    } else if (code.startsWith('IT')) {
        return 'schedule-it';
    } else if (code.startsWith('BA') || code.startsWith('BUSS') || code.startsWith('CBMC')) {
        return 'schedule-ba';
    } else if (code.startsWith('MA')) {
        return 'schedule-purple';
    } else if (code.startsWith('EN')) {
        return 'schedule-brown';
    } else if (code.startsWith('PHY') || code.startsWith('CHEM')) {
        return 'schedule-orange';
    } else if (code.startsWith('GEDC') || code.startsWith('CORE') || code.startsWith('APPLIED') || code.startsWith('SPECIAL')) {
        return 'schedule-purple';
    } else if (code.startsWith('STIC')) {
        return 'schedule-brown';
    } else if (code.startsWith('NSTP') || code.startsWith('PHED')) {
        return 'schedule-orange';
    } else if (code.startsWith('PSYC')) {
        return 'schedule-cs';
    } else if (code.startsWith('CTHC') || code.startsWith('TOUR')) {
        return 'schedule-ba';
    }
    
    return 'schedule-cs';
}

function formatTime(timeString) {
    // Convert 24h time to 12h format
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
}

// Schedule Details Modal Functions
function viewDetails(id) {
    const schedule = scheduleData.find(s => s.id === id);
    if (schedule) {
        showScheduleDetails(schedule);
    }
}

function showScheduleDetails(schedule) {
    // Populate modal with schedule details
    document.getElementById('detailCourse').textContent = schedule.course;
    document.getElementById('detailTeacher').textContent = schedule.teacher;
    document.getElementById('detailSchedule').textContent = schedule.schedule;
    document.getElementById('detailDay').textContent = schedule.day;
    document.getElementById('detailTime').textContent = `${schedule.startTime} - ${schedule.endTime}`;
    document.getElementById('detailRoom').textContent = schedule.room;
    document.getElementById('detailDuration').textContent = `${schedule.duration} hour${schedule.duration !== 1 ? 's' : ''}`;
    
    // Set status badge
    const statusBadge = document.getElementById('detailStatus');
    statusBadge.textContent = schedule.status;
    statusBadge.className = `status-badge ${schedule.status === 'Active' ? 'status-active' : 'status-conflict'}`;
    
    // Store the schedule ID for editing
    currentScheduleId = schedule.id;
    
    // Show the modal
    document.getElementById('scheduleDetailsModal').classList.add('active');
}

function closeDetailsModal() {
    document.getElementById('scheduleDetailsModal').classList.remove('active');
    currentScheduleId = null;
}

function editScheduleFromDetails() {
    if (currentScheduleId) {
        closeDetailsModal();
        editSchedule(currentScheduleId);
    }
}

// Export functionality
function exportSchedules() {
    showAlert('Exporting schedule data...', 'info');
    setTimeout(() => {
        showAlert('Schedule data exported successfully!', 'success');
    }, 2000);
}

// Import functionality
function importSchedules() {
    showAlert('Import functionality opened. Please use Bulk Upload for Excel files.', 'info');
    // You can implement JSON/CSV import here if needed
}

// Bulk Upload Functions
function showBulkUploadModal() {
    document.getElementById('bulkUploadModal').classList.add('active');
    resetUploadState();
}

function closeBulkUploadModal() {
    document.getElementById('bulkUploadModal').classList.remove('active');
    resetUploadState();
}

function resetUploadState() {
    document.getElementById('excelFileInput').value = '';
    document.getElementById('processUploadBtn').disabled = true;
    document.getElementById('uploadProgress').classList.add('hidden');
    document.getElementById('uploadArea').classList.remove('upload-success', 'upload-error', 'drag-over');
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('progressText').textContent = '0%';
}

function downloadTemplate() {
    showAlert('Downloading Excel template...', 'info');
    
    // Simulate template download
    setTimeout(() => {
        showAlert('Template downloaded successfully!', 'success');
        
        // In a real application, you would generate and download an actual Excel file
        // For demo purposes, we'll just show a success message
        const downloadLink = document.createElement('a');
        downloadLink.href = '#'; // Replace with actual template URL
        downloadLink.download = 'schedule_template.xlsx';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }, 1000);
}

function triggerFileInput() {
    document.getElementById('excelFileInput').click();
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) {
        validateAndSetFile(file);
    }
}

function handleDragOver(event) {
    event.preventDefault();
    document.getElementById('uploadArea').classList.add('drag-over');
}

function handleDragLeave(event) {
    event.preventDefault();
    document.getElementById('uploadArea').classList.remove('drag-over');
}

function handleFileDrop(event) {
    event.preventDefault();
    document.getElementById('uploadArea').classList.remove('drag-over');
    
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const file = files[0];
        validateAndSetFile(file);
    }
}

function validateAndSetFile(file) {
    // Validate file type
    const validTypes = ['.xlsx', '.xls'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!validTypes.includes(fileExtension)) {
        showAlert('Please select a valid Excel file (.xlsx or .xls)', 'error');
        document.getElementById('uploadArea').classList.add('upload-error');
        return;
    }
    
    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
        showAlert('File size must be less than 10MB', 'error');
        document.getElementById('uploadArea').classList.add('upload-error');
        return;
    }
    
    // File is valid
    document.getElementById('uploadArea').classList.add('upload-success');
    document.getElementById('processUploadBtn').disabled = false;
    
    showAlert(`File "${file.name}" selected successfully!`, 'success');
}

function processBulkUpload() {
    const fileInput = document.getElementById('excelFileInput');
    if (!fileInput.files.length) {
        showAlert('Please select a file first', 'warning');
        return;
    }
    
    const uploadProgress = document.getElementById('uploadProgress');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    uploadProgress.classList.remove('hidden');
    
    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            completeBulkUpload();
        }
        
        progressFill.style.width = progress + '%';
        progressText.textContent = Math.round(progress) + '%';
    }, 200);
}

function completeBulkUpload() {
    showAlert('Bulk upload completed successfully! Processing schedules...', 'success');
    
    // Simulate processing time
    setTimeout(() => {
        // Add sample data from bulk upload
        const newSchedules = [
            {
                id: 'math201-' + Date.now(),
                course: 'MATH201 - Advanced Calculus',
                teacher: 'Prof. Davis',
                schedule: 'Mon/Wed 11:00 AM-1:00 PM',
                room: 'Room 303',
                status: 'Active',
                day: 'Monday',
                startTime: '11:00 AM',
                endTime: '1:00 PM',
                duration: 2,
                color: 'schedule-purple'
            },
            {
                id: 'phy102-' + Date.now(),
                course: 'PHY102 - Advanced Physics',
                teacher: 'Prof. Wilson',
                schedule: 'Tue/Thu 2:00 PM-4:00 PM',
                room: 'Room 304',
                status: 'Active',
                day: 'Tuesday',
                startTime: '2:00 PM',
                endTime: '4:00 PM',
                duration: 2,
                color: 'schedule-cs'
            }
        ];
        
        // Add new schedules to existing data
        scheduleData = [...scheduleData, ...newSchedules];
        
        // Refresh displays
        loadCalendar();
        loadScheduleList();
        
        showAlert(`${newSchedules.length} new schedules added from bulk upload!`, 'success');
        closeBulkUploadModal();
    }, 1500);
}

// Action functions
function editSchedule(id) {
    const schedule = scheduleData.find(s => s.id === id);
    if (schedule) {
        showAlert(`Editing schedule for ${schedule.course}`, 'info');
        // In a real app, you would populate the modal with existing data
        showAddModal();
    }
}

function resolveConflict(id) {
    showAlert(`Resolving conflict ${id}`, 'info');
    // In a real app, you would implement conflict resolution logic
}

// Alert system
function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alertContainer');
    const alertClass = {
        success: 'alert-success',
        error: 'alert-error',
        warning: 'alert-warning',
        info: 'alert-info'
    }[type];
    
    const alertId = `alert-${Date.now()}`;
    const alertHtml = `
        <div class="alert ${alertClass}" id="${alertId}">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
            <button onclick="document.getElementById('${alertId}').remove()" style="margin-left: auto; background: none; border: none; cursor: pointer; color: inherit;">✕</button>
        </div>
    `;
    
    alertContainer.insertAdjacentHTML('beforeend', alertHtml);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        const alert = document.getElementById(alertId);
        if (alert) alert.remove();
    }, 5000);
}