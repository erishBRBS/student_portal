// Records management functionality
let studentsData = [];
let teachersData = [];
let trashData = [];
let currentStudentPage = 1;
let currentTeacherPage = 1;
let rowsPerPage = 5;
let filteredStudents = [];
let filteredTeachers = [];
let activeTab = 'students';

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeData();
    setupEventListeners();
    renderStudentTable();
    renderTeacherTable();
    renderTrashTable();
    updatePagination();
    updateStats();
});

// Initialize sample data
function initializeData() {
    // Sample student data
    studentsData = [
        {
            id: 'STI-2024-0001',
            firstName: 'Juan',
            lastName: 'Cruz',
            middleName: 'Santos',
            email: 'juan.cruz@sti.edu',
            phone: '+63 912 345 6789',
            educationLevel: 'College',
            course: 'Computer Science',
            yearLevel: '3rd Year',
            status: 'Active',
            balance: 15000,
            enrollmentDate: '2022-08-15',
            avatar: 'https://ui-avatars.com/api/?name=Juan+Cruz&background=1a4b8c&color=fff'
        },
        {
            id: 'STI-2024-0002',
            firstName: 'Maria',
            lastName: 'Gonzales',
            middleName: 'Reyes',
            email: 'maria.gonzales@sti.edu',
            phone: '+63 915 678 9012',
            educationLevel: 'Senior High',
            course: 'Information Technology',
            yearLevel: '2nd Year',
            status: 'Active',
            balance: 0,
            enrollmentDate: '2023-08-20',
            avatar: 'https://ui-avatars.com/api/?name=Maria+Gonzales&background=2d68b8&color=fff'
        },
        {
            id: 'STI-2024-0003',
            firstName: 'Carlos',
            lastName: 'Rivera',
            middleName: 'Martinez',
            email: 'carlos.rivera@sti.edu',
            phone: '+63 918 901 2345',
            educationLevel: 'College',
            course: 'Business Administration',
            yearLevel: '4th Year',
            status: 'Active',
            balance: 8500,
            enrollmentDate: '2021-08-10',
            avatar: 'https://ui-avatars.com/api/?name=Carlos+Rivera&background=43a047&color=fff'
        },
        {
            id: 'STI-2024-0004',
            firstName: 'Ana',
            lastName: 'Torres',
            middleName: 'Lopez',
            email: 'ana.torres@sti.edu',
            phone: '+63 913 456 7890',
            educationLevel: 'College',
            course: 'Engineering',
            yearLevel: '1st Year',
            status: 'Active',
            balance: 25000,
            enrollmentDate: '2024-08-05',
            avatar: 'https://ui-avatars.com/api/?name=Ana+Torres&background=e6b400&color=fff'
        },
        {
            id: 'STI-2024-0005',
            firstName: 'Miguel',
            lastName: 'Santos',
            middleName: 'Cruz',
            email: 'miguel.santos@sti.edu',
            phone: '+63 916 567 8901',
            educationLevel: 'Senior High',
            course: 'Computer Science',
            yearLevel: '2nd Year',
            status: 'Inactive',
            balance: 45000,
            enrollmentDate: '2023-08-18',
            avatar: 'https://ui-avatars.com/api/?name=Miguel+Santos&background=e53935&color=fff'
        }
    ];
    
    // Sample teacher data
    teachersData = [
        {
            id: 'TCH-2024-0001',
            firstName: 'Dr. Roberto',
            lastName: 'Garcia',
            middleName: 'Santos',
            email: 'roberto.garcia@sti.edu',
            phone: '+63 917 123 4567',
            employmentType: 'Full-time',
            specialization: 'Computer Science',
            designation: 'Professor',
            status: 'Active',
            hireDate: '2018-06-15',
            avatar: 'https://ui-avatars.com/api/?name=Roberto+Garcia&background=1a4b8c&color=fff'
        },
        {
            id: 'TCH-2024-0002',
            firstName: 'Prof. Elena',
            lastName: 'Reyes',
            middleName: 'Cruz',
            email: 'elena.reyes@sti.edu',
            phone: '+63 918 234 5678',
            employmentType: 'Full-time',
            specialization: 'Information Technology',
            designation: 'Associate Professor',
            status: 'Active',
            hireDate: '2020-03-10',
            avatar: 'https://ui-avatars.com/api/?name=Elena+Reyes&background=2d68b8&color=fff'
        },
        {
            id: 'TCH-2024-0003',
            firstName: 'Dr. Antonio',
            lastName: 'Lopez',
            middleName: 'Martinez',
            email: 'antonio.lopez@sti.edu',
            phone: '+63 919 345 6789',
            employmentType: 'Part-time',
            specialization: 'Business Administration',
            designation: 'Assistant Professor',
            status: 'Active',
            hireDate: '2021-08-22',
            avatar: 'https://ui-avatars.com/api/?name=Antonio+Lopez&background=43a047&color=fff'
        },
        {
            id: 'TCH-2024-0004',
            firstName: 'Prof. Sofia',
            lastName: 'Tan',
            middleName: 'Lim',
            email: 'sofia.tan@sti.edu',
            phone: '+63 920 456 7890',
            employmentType: 'Contractual',
            specialization: 'Engineering',
            designation: 'Instructor',
            status: 'Inactive',
            hireDate: '2023-01-15',
            avatar: 'https://ui-avatars.com/api/?name=Sofia+Tan&background=e6b400&color=fff'
        }
    ];
    
    // Sample trash data
    trashData = [
        {
            id: 'STI-2023-0123',
            name: 'Luis Mendoza',
            type: 'Student',
            deletedDate: '2024-10-15',
            data: {}
        },
        {
            id: 'TCH-2023-0045',
            name: 'Prof. Ricardo Santos',
            type: 'Teacher',
            deletedDate: '2024-10-10',
            data: {}
        }
    ];
    
    filteredStudents = [...studentsData];
    filteredTeachers = [...teachersData];
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
    }
    
    // Dark mode toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    if (themeToggle && themeIcon) {
        // Check for saved theme preference or respect OS preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set initial theme
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
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

    // Tab navigation
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            activeTab = this.dataset.tab;
            document.getElementById(`${activeTab}Tab`).classList.add('active');
            
            // Update pagination and table based on active tab
            if (activeTab === 'students') {
                updateStudentPagination();
            } else if (activeTab === 'teachers') {
                updateTeacherPagination();
            }
        });
    });

    // Student search functionality
    const studentSearch = document.getElementById('studentSearch');
    if (studentSearch) {
        studentSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filteredStudents = studentsData.filter(student => 
                student.firstName.toLowerCase().includes(searchTerm) ||
                student.lastName.toLowerCase().includes(searchTerm) ||
                student.id.toLowerCase().includes(searchTerm) ||
                student.email.toLowerCase().includes(searchTerm) ||
                student.course.toLowerCase().includes(searchTerm)
            );
            currentStudentPage = 1;
            renderStudentTable();
            updateStudentPagination();
        });
    }

    // Teacher search functionality
    const teacherSearch = document.getElementById('teacherSearch');
    if (teacherSearch) {
        teacherSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            filteredTeachers = teachersData.filter(teacher => 
                teacher.firstName.toLowerCase().includes(searchTerm) ||
                teacher.lastName.toLowerCase().includes(searchTerm) ||
                teacher.id.toLowerCase().includes(searchTerm) ||
                teacher.email.toLowerCase().includes(searchTerm) ||
                teacher.specialization.toLowerCase().includes(searchTerm)
            );
            currentTeacherPage = 1;
            renderTeacherTable();
            updateTeacherPagination();
        });
    }

    // Quick search functionality
    const quickSearch = document.getElementById('quickSearch');
    if (quickSearch) {
        quickSearch.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            
            if (activeTab === 'students') {
                filteredStudents = studentsData.filter(student => 
                    student.firstName.toLowerCase().includes(searchTerm) ||
                    student.lastName.toLowerCase().includes(searchTerm) ||
                    student.id.toLowerCase().includes(searchTerm) ||
                    student.email.toLowerCase().includes(searchTerm)
                );
                currentStudentPage = 1;
                renderStudentTable();
                updateStudentPagination();
            } else if (activeTab === 'teachers') {
                filteredTeachers = teachersData.filter(teacher => 
                    teacher.firstName.toLowerCase().includes(searchTerm) ||
                    teacher.lastName.toLowerCase().includes(searchTerm) ||
                    teacher.id.toLowerCase().includes(searchTerm) ||
                    teacher.email.toLowerCase().includes(searchTerm)
                );
                currentTeacherPage = 1;
                renderTeacherTable();
                updateTeacherPagination();
            }
        });
    }

    // Select all checkboxes
    const selectAllStudents = document.getElementById('selectAllStudents');
    const selectAllStudentsHeader = document.getElementById('selectAllStudentsHeader');
    
    if (selectAllStudents) {
        selectAllStudents.addEventListener('change', function(e) {
            const checkboxes = document.querySelectorAll('#studentTableBody input[type="checkbox"]');
            checkboxes.forEach(checkbox => checkbox.checked = e.target.checked);
            if (selectAllStudentsHeader) selectAllStudentsHeader.checked = e.target.checked;
        });
    }

    if (selectAllStudentsHeader) {
        selectAllStudentsHeader.addEventListener('change', function(e) {
            const checkboxes = document.querySelectorAll('#studentTableBody input[type="checkbox"]');
            checkboxes.forEach(checkbox => checkbox.checked = e.target.checked);
            if (selectAllStudents) selectAllStudents.checked = e.target.checked;
        });
    }

    const selectAllTeachers = document.getElementById('selectAllTeachers');
    const selectAllTeachersHeader = document.getElementById('selectAllTeachersHeader');
    
    if (selectAllTeachers) {
        selectAllTeachers.addEventListener('change', function(e) {
            const checkboxes = document.querySelectorAll('#teacherTableBody input[type="checkbox"]');
            checkboxes.forEach(checkbox => checkbox.checked = e.target.checked);
            if (selectAllTeachersHeader) selectAllTeachersHeader.checked = e.target.checked;
        });
    }

    if (selectAllTeachersHeader) {
        selectAllTeachersHeader.addEventListener('change', function(e) {
            const checkboxes = document.querySelectorAll('#teacherTableBody input[type="checkbox"]');
            checkboxes.forEach(checkbox => checkbox.checked = e.target.checked);
            if (selectAllTeachers) selectAllTeachers.checked = e.target.checked;
        });
    }

    // Add student form submission
    const addStudentForm = document.getElementById('addStudentForm');
    if (addStudentForm) {
        addStudentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processAddStudent();
        });
    }

    // Add teacher form submission
    const addTeacherForm = document.getElementById('addTeacherForm');
    if (addTeacherForm) {
        addTeacherForm.addEventListener('submit', function(e) {
            e.preventDefault();
            processAddTeacher();
        });
    }

    // Edit student form submission
    const editStudentForm = document.getElementById('editStudentForm');
    if (editStudentForm) {
        editStudentForm.addEventListener('submit', processEditStudent);
    }

    // Edit teacher form submission
    const editTeacherForm = document.getElementById('editTeacherForm');
    if (editTeacherForm) {
        editTeacherForm.addEventListener('submit', processEditTeacher);
    }

    // Bulk action type change
    const bulkActionType = document.getElementById('bulkActionType');
    if (bulkActionType) {
        bulkActionType.addEventListener('change', function(e) {
            showBulkActionDetails(e.target.value);
        });
    }

    // Modal buttons
    document.getElementById('addStudentBtn')?.addEventListener('click', showAddStudentModal);
    document.getElementById('addTeacherBtn')?.addEventListener('click', showAddTeacherModal);
    document.getElementById('bulkActionsBtn')?.addEventListener('click', showBulkActionsModal);
    document.getElementById('bulkTeachersActionsBtn')?.addEventListener('click', showBulkActionsModal);
    document.getElementById('toggleFiltersBtn')?.addEventListener('click', toggleFiltersPanel);
    document.getElementById('toggleTeachersFiltersBtn')?.addEventListener('click', toggleTeachersFiltersPanel);
    document.getElementById('closeAddStudentModal')?.addEventListener('click', closeAddStudentModal);
    document.getElementById('cancelAddStudent')?.addEventListener('click', closeAddStudentModal);
    document.getElementById('closeAddTeacherModal')?.addEventListener('click', closeAddTeacherModal);
    document.getElementById('cancelAddTeacher')?.addEventListener('click', closeAddTeacherModal);
    document.getElementById('closeBulkActionsModal')?.addEventListener('click', closeBulkActionsModal);
    document.getElementById('cancelBulkAction')?.addEventListener('click', closeBulkActionsModal);
    document.getElementById('applyFiltersBtn')?.addEventListener('click', applyStudentFilters);
    document.getElementById('clearFiltersBtn')?.addEventListener('click', clearStudentFilters);
    document.getElementById('applyTeachersFiltersBtn')?.addEventListener('click', applyTeacherFilters);
    document.getElementById('clearTeachersFiltersBtn')?.addEventListener('click', clearTeacherFilters);
    document.getElementById('processBulkAction')?.addEventListener('click', processBulkAction);
    document.getElementById('prevStudentsBtn')?.addEventListener('click', previousStudentPage);
    document.getElementById('nextStudentsBtn')?.addEventListener('click', nextStudentPage);
    document.getElementById('prevTeachersBtn')?.addEventListener('click', previousTeacherPage);
    document.getElementById('nextTeachersBtn')?.addEventListener('click', nextTeacherPage);
    document.getElementById('emptyTrashBtn')?.addEventListener('click', emptyTrash);

    // Edit modal buttons
    document.getElementById('closeEditStudentModal')?.addEventListener('click', closeEditStudentModal);
    document.getElementById('cancelEditStudent')?.addEventListener('click', closeEditStudentModal);
    document.getElementById('closeEditTeacherModal')?.addEventListener('click', closeEditTeacherModal);
    document.getElementById('cancelEditTeacher')?.addEventListener('click', closeEditTeacherModal);

    // Close modals when clicking outside
    document.addEventListener('click', function(event) {
        const modals = ['addStudentModal', 'addTeacherModal', 'bulkActionsModal', 'editStudentModal', 'editTeacherModal'];
        
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (event.target === modal) {
                if (modalId === 'addStudentModal') closeAddStudentModal();
                if (modalId === 'addTeacherModal') closeAddTeacherModal();
                if (modalId === 'bulkActionsModal') closeBulkActionsModal();
                if (modalId === 'editStudentModal') closeEditStudentModal();
                if (modalId === 'editTeacherModal') closeEditTeacherModal();
            }
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(event) {
        // Escape to close modals
        if (event.key === 'Escape') {
            closeAddStudentModal();
            closeAddTeacherModal();
            closeBulkActionsModal();
            closeEditStudentModal();
            closeEditTeacherModal();
        }
        
        // Ctrl/Cmd + N for new record
        if ((event.ctrlKey || event.metaKey) && event.key === 'n') {
            event.preventDefault();
            if (activeTab === 'students') {
                showAddStudentModal();
            } else if (activeTab === 'teachers') {
                showAddTeacherModal();
            }
        }
        
        // Ctrl/Cmd + F for search
        if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
            event.preventDefault();
            if (activeTab === 'students') {
                document.getElementById('studentSearch')?.focus();
            } else if (activeTab === 'teachers') {
                document.getElementById('teacherSearch')?.focus();
            }
        }
    });
}

// Render student table
function renderStudentTable() {
    const tbody = document.getElementById('studentTableBody');
    if (!tbody) return;
    
    const start = (currentStudentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const studentsToShow = filteredStudents.slice(start, end);

    tbody.innerHTML = studentsToShow.map(student => `
        <tr>
            <td>
                <input type="checkbox" class="student-checkbox" data-student-id="${student.id}">
            </td>
            <td>
                <div class="student-info-cell">
                    <div class="student-avatar">
                        <img src="${student.avatar}" alt="${student.firstName}" onerror="this.src='https://ui-avatars.com/api/?name=${student.firstName}+${student.lastName}&background=1a4b8c&color=fff'">
                    </div>
                    <div class="student-details">
                        <div class="student-name">${student.firstName} ${student.lastName}</div>
                        <div class="student-id">${student.id}</div>
                        <div class="student-email">${student.email}</div>
                    </div>
                </div>
            </td>
            <td>
                <div class="course-info">
                    <div class="course-name">${student.educationLevel} - ${student.course}</div>
                    <div class="year-level">${student.yearLevel}</div>
                </div>
            </td>
            <td>
                <span class="status-badge ${getStatusClass(student.status)}">${student.status}</span>
            </td>
            <td>
                <div class="balance-amount ${student.balance > 0 ? 'has-balance' : 'paid'}">
                    ${student.balance > 0 ? `₱${student.balance.toLocaleString()}` : 'Paid'}
                </div>
            </td>
            <td>
                <div class="enrollment-date">
                    ${new Date(student.enrollmentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view-btn" onclick="viewStudent('${student.id}')" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" onclick="editStudent('${student.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="softDeleteStudent('${student.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    // Update counts
    const showingCount = document.getElementById('showingStudentsCount');
    const totalCount = document.getElementById('totalStudentsCount');
    if (showingCount) showingCount.textContent = `${start + 1}-${Math.min(end, filteredStudents.length)}`;
    if (totalCount) totalCount.textContent = filteredStudents.length;
}

// Render teacher table
function renderTeacherTable() {
    const tbody = document.getElementById('teacherTableBody');
    if (!tbody) return;
    
    const start = (currentTeacherPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const teachersToShow = filteredTeachers.slice(start, end);

    tbody.innerHTML = teachersToShow.map(teacher => `
        <tr>
            <td>
                <input type="checkbox" class="teacher-checkbox" data-teacher-id="${teacher.id}">
            </td>
            <td>
                <div class="teacher-info-cell">
                    <div class="teacher-avatar">
                        <img src="${teacher.avatar}" alt="${teacher.firstName}" onerror="this.src='https://ui-avatars.com/api/?name=${teacher.firstName}+${teacher.lastName}&background=1a4b8c&color=fff'">
                    </div>
                    <div class="teacher-details">
                        <div class="teacher-name">${teacher.firstName} ${teacher.lastName}</div>
                        <div class="teacher-id">${teacher.id}</div>
                        <div class="teacher-email">${teacher.email}</div>
                    </div>
                </div>
            </td>
            <td>
                <div class="course-info">
                    <div class="course-name">${teacher.employmentType} - ${teacher.designation}</div>
                    <div class="year-level">${teacher.specialization}</div>
                </div>
            </td>
            <td>
                <span class="status-badge ${getStatusClass(teacher.status)}">${teacher.status}</span>
            </td>
            <td>
                <div class="balance-amount">
                    ${teacher.specialization}
                </div>
            </td>
            <td>
                <div class="enrollment-date">
                    ${new Date(teacher.hireDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view-btn" onclick="viewTeacher('${teacher.id}')" title="View Details">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" onclick="editTeacher('${teacher.id}')" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="softDeleteTeacher('${teacher.id}')" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

    // Update counts
    const showingCount = document.getElementById('showingTeachersCount');
    const totalCount = document.getElementById('totalTeachersCount');
    if (showingCount) showingCount.textContent = `${start + 1}-${Math.min(end, filteredTeachers.length)}`;
    if (totalCount) totalCount.textContent = filteredTeachers.length;
}

// Render trash table
function renderTrashTable() {
    const tbody = document.getElementById('trashTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = trashData.map(item => `
        <tr>
            <td>${item.type}</td>
            <td>${item.name}</td>
            <td>${item.id}</td>
            <td>${new Date(item.deletedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn restore-btn" onclick="restoreRecord('${item.id}', '${item.type}')" title="Restore">
                        <i class="fas fa-undo"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="permanentlyDeleteRecord('${item.id}', '${item.type}')" title="Permanently Delete">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// Get status class
function getStatusClass(status) {
    const classes = {
        'Active': 'status-active',
        'Inactive': 'status-inactive',
        'Graduated': 'status-graduated',
        'Dropped': 'status-inactive',
        'On Leave': 'status-inactive'
    };
    return classes[status] || 'status-inactive';
}

// Pagination functions
function updatePagination() {
    updateStudentPagination();
    updateTeacherPagination();
}

function updateStudentPagination() {
    const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
    const paginationContainer = document.getElementById('paginationStudentsNumbers');
    
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = '';
    
    // Previous button state
    const prevBtn = document.getElementById('prevStudentsBtn');
    const nextBtn = document.getElementById('nextStudentsBtn');
    if (prevBtn) prevBtn.disabled = currentStudentPage === 1;
    if (nextBtn) nextBtn.disabled = currentStudentPage === totalPages;
    
    // Page numbers
    for (let i = Math.max(1, currentStudentPage - 2); i <= Math.min(totalPages, currentStudentPage + 2); i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.className = `pagination-btn ${i === currentStudentPage ? 'active' : ''}`;
        pageBtn.onclick = () => goToStudentPage(i);
        paginationContainer.appendChild(pageBtn);
    }
}

function updateTeacherPagination() {
    const totalPages = Math.ceil(filteredTeachers.length / rowsPerPage);
    const paginationContainer = document.getElementById('paginationTeachersNumbers');
    
    if (!paginationContainer) return;
    
    paginationContainer.innerHTML = '';
    
    // Previous button state
    const prevBtn = document.getElementById('prevTeachersBtn');
    const nextBtn = document.getElementById('nextTeachersBtn');
    if (prevBtn) prevBtn.disabled = currentTeacherPage === 1;
    if (nextBtn) nextBtn.disabled = currentTeacherPage === totalPages;
    
    // Page numbers
    for (let i = Math.max(1, currentTeacherPage - 2); i <= Math.min(totalPages, currentTeacherPage + 2); i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.className = `pagination-btn ${i === currentTeacherPage ? 'active' : ''}`;
        pageBtn.onclick = () => goToTeacherPage(i);
        paginationContainer.appendChild(pageBtn);
    }
}

function previousStudentPage() {
    if (currentStudentPage > 1) {
        currentStudentPage--;
        renderStudentTable();
        updateStudentPagination();
    }
}

function nextStudentPage() {
    const totalPages = Math.ceil(filteredStudents.length / rowsPerPage);
    if (currentStudentPage < totalPages) {
        currentStudentPage++;
        renderStudentTable();
        updateStudentPagination();
    }
}

function goToStudentPage(page) {
    currentStudentPage = page;
    renderStudentTable();
    updateStudentPagination();
}

function previousTeacherPage() {
    if (currentTeacherPage > 1) {
        currentTeacherPage--;
        renderTeacherTable();
        updateTeacherPagination();
    }
}

function nextTeacherPage() {
    const totalPages = Math.ceil(filteredTeachers.length / rowsPerPage);
    if (currentTeacherPage < totalPages) {
        currentTeacherPage++;
        renderTeacherTable();
        updateTeacherPagination();
    }
}

function goToTeacherPage(page) {
    currentTeacherPage = page;
    renderTeacherTable();
    updateTeacherPagination();
}

// Filter functions
function toggleFiltersPanel() {
    const panel = document.getElementById('filtersPanel');
    if (panel) panel.classList.toggle('active');
}

function toggleTeachersFiltersPanel() {
    const panel = document.getElementById('teachersFiltersPanel');
    if (panel) panel.classList.toggle('active');
}

function applyStudentFilters() {
    const educationLevelFilter = document.getElementById('filterEducationLevel').value;
    const courseFilter = document.getElementById('filterCourse').value;
    const yearFilter = document.getElementById('filterYear').value;
    const statusFilter = document.getElementById('filterStatus').value;
    
    filteredStudents = studentsData.filter(student => {
        const educationLevelMatch = educationLevelFilter === 'All Levels' || student.educationLevel === educationLevelFilter;
        const courseMatch = courseFilter === 'All Courses' || student.course === courseFilter;
        const yearMatch = yearFilter === 'All Years' || student.yearLevel === yearFilter;
        const statusMatch = statusFilter === 'All Status' || student.status === statusFilter;
        
        return educationLevelMatch && courseMatch && yearMatch && statusMatch;
    });
    
    currentStudentPage = 1;
    renderStudentTable();
    updateStudentPagination();
    
    showAlert('Filters applied successfully', 'success');
    const panel = document.getElementById('filtersPanel');
    if (panel) panel.classList.remove('active');
}

function clearStudentFilters() {
    // Reset all filter dropdowns to default
    const filterSelects = document.querySelectorAll('#filtersPanel select');
    filterSelects.forEach(select => select.selectedIndex = 0);
    
    // Reset filtered data
    filteredStudents = [...studentsData];
    currentStudentPage = 1;
    renderStudentTable();
    updateStudentPagination();
    
    showAlert('Filters cleared', 'info');
    const panel = document.getElementById('filtersPanel');
    if (panel) panel.classList.remove('active');
}

function applyTeacherFilters() {
    const employmentTypeFilter = document.getElementById('filterEmploymentType').value;
    const specializationFilter = document.getElementById('filterSpecialization').value;
    const designationFilter = document.getElementById('filterDesignation').value;
    const statusFilter = document.getElementById('filterTeacherStatus').value;
    
    filteredTeachers = teachersData.filter(teacher => {
        const employmentTypeMatch = employmentTypeFilter === 'All Types' || teacher.employmentType === employmentTypeFilter;
        const specializationMatch = specializationFilter === 'All Specializations' || teacher.specialization === specializationFilter;
        const designationMatch = designationFilter === 'All Designations' || teacher.designation === designationFilter;
        const statusMatch = statusFilter === 'All Status' || teacher.status === statusFilter;
        
        return employmentTypeMatch && specializationMatch && designationMatch && statusMatch;
    });
    
    currentTeacherPage = 1;
    renderTeacherTable();
    updateTeacherPagination();
    
    showAlert('Filters applied successfully', 'success');
    const panel = document.getElementById('teachersFiltersPanel');
    if (panel) panel.classList.remove('active');
}

function clearTeacherFilters() {
    // Reset all filter dropdowns to default
    const filterSelects = document.querySelectorAll('#teachersFiltersPanel select');
    filterSelects.forEach(select => select.selectedIndex = 0);
    
    // Reset filtered data
    filteredTeachers = [...teachersData];
    currentTeacherPage = 1;
    renderTeacherTable();
    updateTeacherPagination();
    
    showAlert('Filters cleared', 'info');
    const panel = document.getElementById('teachersFiltersPanel');
    if (panel) panel.classList.remove('active');
}

// Student actions
function viewStudent(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (student) {
        showAlert(`Viewing details for: ${student.firstName} ${student.lastName} (${student.id})`, 'info');
        
        // Create and show a view modal with student details
        showStudentDetailsModal(student);
    }
}

function editStudent(studentId) {
    showEditStudentModal(studentId);
}

function softDeleteStudent(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (student) {
        if (confirm(`Are you sure you want to delete ${student.firstName} ${student.lastName}? This can be undone from the trash bin.`)) {
            // Move student to trash
            trashData.push({
                id: student.id,
                name: `${student.firstName} ${student.lastName}`,
                type: 'Student',
                deletedDate: new Date().toISOString().split('T')[0],
                data: student
            });
            
            // Remove from active data
            studentsData = studentsData.filter(s => s.id !== studentId);
            filteredStudents = filteredStudents.filter(s => s.id !== studentId);
            
            renderStudentTable();
            renderTrashTable();
            updateStudentPagination();
            updateStats();
            showAlert(`Student ${student.firstName} ${student.lastName} moved to trash`, 'success');
        }
    }
}

// Teacher actions
function viewTeacher(teacherId) {
    const teacher = teachersData.find(t => t.id === teacherId);
    if (teacher) {
        showAlert(`Viewing details for: ${teacher.firstName} ${teacher.lastName} (${teacher.id})`, 'info');
        
        // Create and show a view modal with teacher details
        showTeacherDetailsModal(teacher);
    }
}

function editTeacher(teacherId) {
    showEditTeacherModal(teacherId);
}

function softDeleteTeacher(teacherId) {
    const teacher = teachersData.find(t => t.id === teacherId);
    if (teacher) {
        if (confirm(`Are you sure you want to delete ${teacher.firstName} ${teacher.lastName}? This can be undone from the trash bin.`)) {
            // Move teacher to trash
            trashData.push({
                id: teacher.id,
                name: `${teacher.firstName} ${teacher.lastName}`,
                type: 'Teacher',
                deletedDate: new Date().toISOString().split('T')[0],
                data: teacher
            });
            
            // Remove from active data
            teachersData = teachersData.filter(t => t.id !== teacherId);
            filteredTeachers = filteredTeachers.filter(t => t.id !== teacherId);
            
            renderTeacherTable();
            renderTrashTable();
            updateTeacherPagination();
            updateStats();
            showAlert(`Teacher ${teacher.firstName} ${teacher.lastName} moved to trash`, 'success');
        }
    }
}

// Trash actions
function restoreRecord(recordId, recordType) {
    const recordIndex = trashData.findIndex(item => item.id === recordId && item.type === recordType);
    if (recordIndex !== -1) {
        const record = trashData[recordIndex];
        
        if (recordType === 'Student') {
            studentsData.push(record.data);
            filteredStudents = [...studentsData];
            renderStudentTable();
            updateStudentPagination();
        } else if (recordType === 'Teacher') {
            teachersData.push(record.data);
            filteredTeachers = [...teachersData];
            renderTeacherTable();
            updateTeacherPagination();
        }
        
        // Remove from trash
        trashData.splice(recordIndex, 1);
        renderTrashTable();
        updateStats();
        
        showAlert(`${recordType} ${record.name} restored successfully`, 'success');
    }
}

function permanentlyDeleteRecord(recordId, recordType) {
    if (confirm(`Are you sure you want to permanently delete this ${recordType.toLowerCase()}? This action cannot be undone.`)) {
        const recordIndex = trashData.findIndex(item => item.id === recordId && item.type === recordType);
        if (recordIndex !== -1) {
            const record = trashData[recordIndex];
            trashData.splice(recordIndex, 1);
            renderTrashTable();
            updateStats();
            showAlert(`${recordType} ${record.name} permanently deleted`, 'success');
        }
    }
}

function emptyTrash() {
    if (trashData.length === 0) {
        showAlert('Trash is already empty', 'info');
        return;
    }
    
    if (confirm(`Are you sure you want to permanently delete all ${trashData.length} items in the trash? This action cannot be undone.`)) {
        trashData = [];
        renderTrashTable();
        updateStats();
        showAlert('Trash emptied successfully', 'success');
    }
}

// Show student details in a modal
function showStudentDetailsModal(student) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal active" id="studentDetailsModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Student Details</h3>
                    <button class="modal-close" onclick="closeStudentDetailsModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="student-detail-header">
                        <div class="detail-avatar">
                            <img src="${student.avatar}" alt="${student.firstName}" onerror="this.src='https://ui-avatars.com/api/?name=${student.firstName}+${student.lastName}&background=1a4b8c&color=fff'">
                        </div>
                        <div class="detail-name">
                            <h2>${student.firstName} ${student.lastName}</h2>
                            <p>${student.id} • ${student.educationLevel} • ${student.course} • ${student.yearLevel}</p>
                            <span class="status-badge ${getStatusClass(student.status)}">${student.status}</span>
                        </div>
                    </div>
                    
                    <div class="detail-sections">
                        <div class="detail-section">
                            <h4>Personal Information</h4>
                            <div class="detail-grid">
                                <div class="detail-item">
                                    <label>Full Name</label>
                                    <span>${student.firstName} ${student.middleName} ${student.lastName}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Email</label>
                                    <span>${student.email}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Phone</label>
                                    <span>${student.phone}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Academic Information</h4>
                            <div class="detail-grid">
                                <div class="detail-item">
                                    <label>Education Level</label>
                                    <span>${student.educationLevel}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Course</label>
                                    <span>${student.course}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Year Level</label>
                                    <span>${student.yearLevel}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Enrollment Date</label>
                                    <span>${new Date(student.enrollmentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Balance</label>
                                    <span class="${student.balance > 0 ? 'has-balance' : 'paid'}">
                                        ${student.balance > 0 ? `₱${student.balance.toLocaleString()}` : 'Paid in Full'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeStudentDetailsModal()">Close</button>
                    <button class="btn btn-primary" onclick="editStudent('${student.id}'); closeStudentDetailsModal();">Edit Student</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeStudentDetailsModal() {
    const modal = document.getElementById('studentDetailsModal');
    if (modal) {
        modal.remove();
    }
}

// Show teacher details in a modal
function showTeacherDetailsModal(teacher) {
    // Create modal HTML
    const modalHTML = `
        <div class="modal active" id="teacherDetailsModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Teacher Details</h3>
                    <button class="modal-close" onclick="closeTeacherDetailsModal()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="teacher-detail-header">
                        <div class="detail-avatar">
                            <img src="${teacher.avatar}" alt="${teacher.firstName}" onerror="this.src='https://ui-avatars.com/api/?name=${teacher.firstName}+${teacher.lastName}&background=1a4b8c&color=fff'">
                        </div>
                        <div class="detail-name">
                            <h2>${teacher.firstName} ${teacher.lastName}</h2>
                            <p>${teacher.id} • ${teacher.designation}</p>
                            <span class="status-badge ${getStatusClass(teacher.status)}">${teacher.status}</span>
                        </div>
                    </div>
                    
                    <div class="detail-sections">
                        <div class="detail-section">
                            <h4>Personal Information</h4>
                            <div class="detail-grid">
                                <div class="detail-item">
                                    <label>Full Name</label>
                                    <span>${teacher.firstName} ${teacher.middleName} ${teacher.lastName}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Email</label>
                                    <span>${teacher.email}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Phone</label>
                                    <span>${teacher.phone}</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Employment Information</h4>
                            <div class="detail-grid">
                                <div class="detail-item">
                                    <label>Employment Type</label>
                                    <span>${teacher.employmentType}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Designation</label>
                                    <span>${teacher.designation}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Specialization</label>
                                    <span>${teacher.specialization}</span>
                                </div>
                                <div class="detail-item">
                                    <label>Hire Date</label>
                                    <span>${new Date(teacher.hireDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary" onclick="closeTeacherDetailsModal()">Close</button>
                    <button class="btn btn-primary" onclick="editTeacher('${teacher.id}'); closeTeacherDetailsModal();">Edit Teacher</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeTeacherDetailsModal() {
    const modal = document.getElementById('teacherDetailsModal');
    if (modal) {
        modal.remove();
    }
}

// Edit Student Modal Functions
function showEditStudentModal(studentId) {
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;

    // Populate form with student data
    document.getElementById('editStudentId').value = student.id;
    document.getElementById('editFirstName').value = student.firstName;
    document.getElementById('editLastName').value = student.lastName;
    document.getElementById('editMiddleName').value = student.middleName || '';
    document.getElementById('editEmail').value = student.email;
    document.getElementById('editPhone').value = student.phone;
    document.getElementById('editAddress').value = student.address || '';
    
    // Set academic information
    const educationLevelMap = {
        'Senior High': 'senior-high',
        'College': 'college'
    };
    
    const courseMap = {
        'Computer Science': 'cs',
        'Information Technology': 'it',
        'Business Administration': 'ba',
        'Engineering': 'eng'
    };
    
    const yearMap = {
        '1st Year': '1',
        '2nd Year': '2',
        '3rd Year': '3',
        '4th Year': '4'
    };

    document.getElementById('editEducationLevel').value = educationLevelMap[student.educationLevel] || '';
    document.getElementById('editCourse').value = courseMap[student.course] || '';
    document.getElementById('editYearLevel').value = yearMap[student.yearLevel] || '';
    document.getElementById('editStatus').value = student.status.toLowerCase();
    document.getElementById('editBalance').value = student.balance || 0;

    // Store the current student ID for the form submission
    document.getElementById('editStudentForm').dataset.studentId = studentId;

    // Set up soft delete button
    document.getElementById('softDeleteStudentBtn').onclick = () => {
        if (confirm(`Are you sure you want to move ${student.firstName} ${student.lastName} to trash?`)) {
            softDeleteStudent(studentId);
            closeEditStudentModal();
        }
    };

    document.getElementById('editStudentModal').classList.add('active');
}

function closeEditStudentModal() {
    document.getElementById('editStudentModal').classList.remove('active');
    document.getElementById('editStudentForm').reset();
    delete document.getElementById('editStudentForm').dataset.studentId;
}

function processEditStudent(e) {
    e.preventDefault();
    
    const studentId = document.getElementById('editStudentForm').dataset.studentId;
    const student = studentsData.find(s => s.id === studentId);
    if (!student) return;

    // Update student data
    student.firstName = document.getElementById('editFirstName').value;
    student.lastName = document.getElementById('editLastName').value;
    student.middleName = document.getElementById('editMiddleName').value;
    student.email = document.getElementById('editEmail').value;
    student.phone = document.getElementById('editPhone').value;
    student.address = document.getElementById('editAddress').value;
    
    // Update academic information
    const educationLevelMap = {
        'senior-high': 'Senior High',
        'college': 'College'
    };
    
    const courseMap = {
        'cs': 'Computer Science',
        'it': 'Information Technology',
        'ba': 'Business Administration',
        'eng': 'Engineering'
    };
    
    const yearMap = {
        '1': '1st Year',
        '2': '2nd Year',
        '3': '3rd Year',
        '4': '4th Year'
    };

    student.educationLevel = educationLevelMap[document.getElementById('editEducationLevel').value];
    student.course = courseMap[document.getElementById('editCourse').value];
    student.yearLevel = yearMap[document.getElementById('editYearLevel').value];
    student.status = document.getElementById('editStatus').value.charAt(0).toUpperCase() + document.getElementById('editStatus').value.slice(1);
    student.balance = parseFloat(document.getElementById('editBalance').value) || 0;

    // Update avatar with new name
    student.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        student.firstName + '+' + student.lastName
    )}&background=1a4b8c&color=fff`;

    // Refresh tables
    renderStudentTable();
    updateStudentPagination();
    
    closeEditStudentModal();
    showAlert(`Student ${student.firstName} ${student.lastName} updated successfully!`, 'success');
}

// Edit Teacher Modal Functions
function showEditTeacherModal(teacherId) {
    const teacher = teachersData.find(t => t.id === teacherId);
    if (!teacher) return;

    // Populate form with teacher data
    document.getElementById('editTeacherId').value = teacher.id;
    document.getElementById('editTeacherFirstName').value = teacher.firstName;
    document.getElementById('editTeacherLastName').value = teacher.lastName;
    document.getElementById('editTeacherMiddleName').value = teacher.middleName || '';
    document.getElementById('editTeacherEmail').value = teacher.email;
    document.getElementById('editTeacherPhone').value = teacher.phone;
    document.getElementById('editTeacherAddress').value = teacher.address || '';
    
    // Set employment information
    const employmentTypeMap = {
        'Full-time': 'full-time',
        'Part-time': 'part-time',
        'Contractual': 'contractual'
    };
    
    const specializationMap = {
        'Computer Science': 'cs',
        'Information Technology': 'it',
        'Business Administration': 'ba',
        'Engineering': 'eng',
        'Mathematics': 'math',
        'English': 'english'
    };
    
    const designationMap = {
        'Professor': 'professor',
        'Associate Professor': 'associate-professor',
        'Assistant Professor': 'assistant-professor',
        'Instructor': 'instructor'
    };
    
    const statusMap = {
        'Active': 'active',
        'Inactive': 'inactive',
        'On Leave': 'on-leave'
    };

    document.getElementById('editEmploymentType').value = employmentTypeMap[teacher.employmentType] || '';
    document.getElementById('editSpecialization').value = specializationMap[teacher.specialization] || '';
    document.getElementById('editDesignation').value = designationMap[teacher.designation] || '';
    document.getElementById('editTeacherStatus').value = statusMap[teacher.status] || 'active';

    // Store the current teacher ID for the form submission
    document.getElementById('editTeacherForm').dataset.teacherId = teacherId;

    // Set up soft delete button
    document.getElementById('softDeleteTeacherBtn').onclick = () => {
        if (confirm(`Are you sure you want to move ${teacher.firstName} ${teacher.lastName} to trash?`)) {
            softDeleteTeacher(teacherId);
            closeEditTeacherModal();
        }
    };

    document.getElementById('editTeacherModal').classList.add('active');
}

function closeEditTeacherModal() {
    document.getElementById('editTeacherModal').classList.remove('active');
    document.getElementById('editTeacherForm').reset();
    delete document.getElementById('editTeacherForm').dataset.teacherId;
}

function processEditTeacher(e) {
    e.preventDefault();
    
    const teacherId = document.getElementById('editTeacherForm').dataset.teacherId;
    const teacher = teachersData.find(t => t.id === teacherId);
    if (!teacher) return;

    // Update teacher data
    teacher.firstName = document.getElementById('editTeacherFirstName').value;
    teacher.lastName = document.getElementById('editTeacherLastName').value;
    teacher.middleName = document.getElementById('editTeacherMiddleName').value;
    teacher.email = document.getElementById('editTeacherEmail').value;
    teacher.phone = document.getElementById('editTeacherPhone').value;
    teacher.address = document.getElementById('editTeacherAddress').value;
    
    // Update employment information
    const employmentTypeMap = {
        'full-time': 'Full-time',
        'part-time': 'Part-time',
        'contractual': 'Contractual'
    };
    
    const specializationMap = {
        'cs': 'Computer Science',
        'it': 'Information Technology',
        'ba': 'Business Administration',
        'eng': 'Engineering',
        'math': 'Mathematics',
        'english': 'English'
    };
    
    const designationMap = {
        'professor': 'Professor',
        'associate-professor': 'Associate Professor',
        'assistant-professor': 'Assistant Professor',
        'instructor': 'Instructor'
    };
    
    const statusMap = {
        'active': 'Active',
        'inactive': 'Inactive',
        'on-leave': 'On Leave'
    };

    teacher.employmentType = employmentTypeMap[document.getElementById('editEmploymentType').value];
    teacher.specialization = specializationMap[document.getElementById('editSpecialization').value];
    teacher.designation = designationMap[document.getElementById('editDesignation').value];
    teacher.status = statusMap[document.getElementById('editTeacherStatus').value];

    // Update avatar with new name
    teacher.avatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        teacher.firstName + '+' + teacher.lastName
    )}&background=1a4b8c&color=fff`;

    // Refresh tables
    renderTeacherTable();
    updateTeacherPagination();
    
    closeEditTeacherModal();
    showAlert(`Teacher ${teacher.firstName} ${teacher.lastName} updated successfully!`, 'success');
}

// Modal functions
function showAddStudentModal() {
    document.getElementById('addStudentModal').classList.add('active');
}

function closeAddStudentModal() {
    document.getElementById('addStudentModal').classList.remove('active');
    document.getElementById('addStudentForm').reset();
}

function showAddTeacherModal() {
    document.getElementById('addTeacherModal').classList.add('active');
}

function closeAddTeacherModal() {
    document.getElementById('addTeacherModal').classList.remove('active');
    document.getElementById('addTeacherForm').reset();
}

function showBulkActionsModal() {
    let selectedRecords = [];
    
    if (activeTab === 'students') {
        selectedRecords = getSelectedStudents();
        if (selectedRecords.length === 0) {
            showAlert('Please select at least one student', 'warning');
            return;
        }
    } else if (activeTab === 'teachers') {
        selectedRecords = getSelectedTeachers();
        if (selectedRecords.length === 0) {
            showAlert('Please select at least one teacher', 'warning');
            return;
        }
    }
    
    document.getElementById('bulkActionsModal').classList.add('active');
}

function closeBulkActionsModal() {
    document.getElementById('bulkActionsModal').classList.remove('active');
    document.getElementById('bulkActionType').selectedIndex = 0;
    document.getElementById('bulkActionDetails').classList.add('hidden');
}

// Bulk actions
function getSelectedStudents() {
    const checkboxes = document.querySelectorAll('#studentTableBody input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.dataset.studentId);
}

function getSelectedTeachers() {
    const checkboxes = document.querySelectorAll('#teacherTableBody input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(cb => cb.dataset.teacherId);
}

function showBulkActionDetails(actionType) {
    const detailsDiv = document.getElementById('bulkActionDetails');
    if (!detailsDiv) return;
    
    if (!actionType) {
        detailsDiv.classList.add('hidden');
        return;
    }

    let content = '';
    
    switch(actionType) {
        case 'status':
            if (activeTab === 'students') {
                content = `
                    <div class="form-group">
                        <label class="form-label">New Status</label>
                        <select id="newStatus" class="form-control">
                            <option>Active</option>
                            <option>Inactive</option>
                            <option>Graduated</option>
                            <option>Dropped</option>
                        </select>
                    </div>
                `;
            } else {
                content = `
                    <div class="form-group">
                        <label class="form-label">New Status</label>
                        <select id="newStatus" class="form-control">
                            <option>Active</option>
                            <option>Inactive</option>
                            <option>On Leave</option>
                        </select>
                    </div>
                `;
            }
            break;
        case 'course':
            if (activeTab === 'students') {
                content = `
                    <div class="form-group">
                        <label class="form-label">Transfer to Course</label>
                        <select id="newCourse" class="form-control">
                            <option>Computer Science</option>
                            <option>Information Technology</option>
                            <option>Business Administration</option>
                            <option>Engineering</option>
                        </select>
                    </div>
                `;
            } else {
                content = `
                    <div class="form-group">
                        <label class="form-label">Update Specialization</label>
                        <select id="newSpecialization" class="form-control">
                            <option>Computer Science</option>
                            <option>Information Technology</option>
                            <option>Business Administration</option>
                            <option>Engineering</option>
                            <option>Mathematics</option>
                            <option>English</option>
                        </select>
                    </div>
                `;
            }
            break;
        case 'year':
            content = `
                <div class="form-group">
                    <label class="form-label">Update Year Level</label>
                    <select id="newYear" class="form-control">
                        <option>1st Year</option>
                        <option>2nd Year</option>
                        <option>3rd Year</option>
                        <option>4th Year</option>
                    </select>
                </div>
            `;
            break;
        case 'export':
            content = `
                <div class="form-group">
                    <label class="form-label">Export Format</label>
                    <select id="exportFormat" class="form-control">
                        <option value="csv">CSV</option>
                        <option value="excel">Excel</option>
                        <option value="pdf">PDF</option>
                    </select>
                </div>
            `;
            break;
        case 'delete':
            content = `
                <div class="alert alert-error">
                    <i class="fas fa-exclamation-circle"></i>
                    <div>
                        <h4>Warning</h4>
                        <p>This action will move the selected records to trash and can be undone.</p>
                    </div>
                </div>
            `;
            break;
    }

    detailsDiv.innerHTML = content;
    detailsDiv.classList.remove('hidden');
}

function processBulkAction() {
    const actionType = document.getElementById('bulkActionType').value;
    let selectedRecords = [];
    
    if (activeTab === 'students') {
        selectedRecords = getSelectedStudents();
    } else if (activeTab === 'teachers') {
        selectedRecords = getSelectedTeachers();
    }
    
    if (!actionType || selectedRecords.length === 0) {
        showAlert('Please select an action and records', 'warning');
        return;
    }

    // Process the bulk action
    switch(actionType) {
        case 'status':
            const newStatus = document.getElementById('newStatus').value;
            if (activeTab === 'students') {
                selectedRecords.forEach(studentId => {
                    const student = studentsData.find(s => s.id === studentId);
                    if (student) student.status = newStatus;
                });
                renderStudentTable();
                showAlert(`Status updated to "${newStatus}" for ${selectedRecords.length} students`, 'success');
            } else {
                selectedRecords.forEach(teacherId => {
                    const teacher = teachersData.find(t => t.id === teacherId);
                    if (teacher) teacher.status = newStatus;
                });
                renderTeacherTable();
                showAlert(`Status updated to "${newStatus}" for ${selectedRecords.length} teachers`, 'success');
            }
            break;
        case 'course':
            if (activeTab === 'students') {
                const newCourse = document.getElementById('newCourse').value;
                selectedRecords.forEach(studentId => {
                    const student = studentsData.find(s => s.id === studentId);
                    if (student) student.course = newCourse;
                });
                renderStudentTable();
                showAlert(`${selectedRecords.length} students transferred to ${newCourse}`, 'success');
            } else {
                const newSpecialization = document.getElementById('newSpecialization').value;
                selectedRecords.forEach(teacherId => {
                    const teacher = teachersData.find(t => t.id === teacherId);
                    if (teacher) teacher.specialization = newSpecialization;
                });
                renderTeacherTable();
                showAlert(`Specialization updated to ${newSpecialization} for ${selectedRecords.length} teachers`, 'success');
            }
            break;
        case 'year':
            const newYear = document.getElementById('newYear').value;
            selectedRecords.forEach(studentId => {
                const student = studentsData.find(s => s.id === studentId);
                if (student) student.yearLevel = newYear;
            });
            renderStudentTable();
            showAlert(`Year level updated to ${newYear} for ${selectedRecords.length} students`, 'success');
            break;
        case 'export':
            const format = document.getElementById('exportFormat').value;
            showAlert(`Exporting ${selectedRecords.length} records as ${format.toUpperCase()}...`, 'info');
            setTimeout(() => {
                showAlert('Export completed! Download will start automatically.', 'success');
            }, 2000);
            break;
        case 'delete':
            if (confirm(`Are you sure you want to move ${selectedRecords.length} records to trash? This can be undone.`)) {
                if (activeTab === 'students') {
                    selectedRecords.forEach(studentId => {
                        const student = studentsData.find(s => s.id === studentId);
                        if (student) {
                            // Move to trash
                            trashData.push({
                                id: student.id,
                                name: `${student.firstName} ${student.lastName}`,
                                type: 'Student',
                                deletedDate: new Date().toISOString().split('T')[0],
                                data: student
                            });
                            
                            // Remove from active data
                            studentsData = studentsData.filter(s => s.id !== studentId);
                            filteredStudents = filteredStudents.filter(s => s.id !== studentId);
                        }
                    });
                    renderStudentTable();
                    updateStudentPagination();
                } else {
                    selectedRecords.forEach(teacherId => {
                        const teacher = teachersData.find(t => t.id === teacherId);
                        if (teacher) {
                            // Move to trash
                            trashData.push({
                                id: teacher.id,
                                name: `${teacher.firstName} ${teacher.lastName}`,
                                type: 'Teacher',
                                deletedDate: new Date().toISOString().split('T')[0],
                                data: teacher
                            });
                            
                            // Remove from active data
                            teachersData = teachersData.filter(t => t.id !== teacherId);
                            filteredTeachers = filteredTeachers.filter(t => t.id !== teacherId);
                        }
                    });
                    renderTeacherTable();
                    updateTeacherPagination();
                }
                
                renderTrashTable();
                updateStats();
                showAlert(`${selectedRecords.length} records moved to trash`, 'success');
            }
            break;
    }

    closeBulkActionsModal();
    // Clear all selections
    if (activeTab === 'students') {
        const selectAll = document.getElementById('selectAllStudents');
        if (selectAll) selectAll.checked = false;
        const selectAllHeader = document.getElementById('selectAllStudentsHeader');
        if (selectAllHeader) selectAllHeader.checked = false;
        const checkboxes = document.querySelectorAll('#studentTableBody input[type="checkbox"]');
        checkboxes.forEach(checkbox => checkbox.checked = false);
    } else {
        const selectAll = document.getElementById('selectAllTeachers');
        if (selectAll) selectAll.checked = false;
        const selectAllHeader = document.getElementById('selectAllTeachersHeader');
        if (selectAllHeader) selectAllHeader.checked = false;
        const checkboxes = document.querySelectorAll('#teacherTableBody input[type="checkbox"]');
        checkboxes.forEach(checkbox => checkbox.checked = false);
    }
}

// Add new student
function processAddStudent() {
    const form = document.getElementById('addStudentForm');
    if (!form) return;
    
    // Generate student ID if not provided
    let studentId = document.getElementById('studentId').value;
    if (!studentId.trim()) {
        studentId = 'STI-2024-' + String(studentsData.length + 1).padStart(4, '0');
    }

    // Create new student object
    const newStudent = {
        id: studentId,
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        middleName: document.getElementById('middleName').value || '',
        dateOfBirth: document.getElementById('dob').value,
        gender: document.getElementById('gender').value,
        civilStatus: document.getElementById('civilStatus').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        educationLevel: document.getElementById('educationLevel').value,
        course: document.getElementById('course').value,
        yearLevel: document.getElementById('yearLevel').value,
        enrollmentDate: document.getElementById('enrollmentDate').value,
        status: 'Active',
        balance: 0,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            document.getElementById('firstName').value + '+' + document.getElementById('lastName').value
        )}&background=1a4b8c&color=fff`
    };

    // Map course and year level values
    const courseMap = {
        'cs': 'Computer Science',
        'it': 'Information Technology',
        'ba': 'Business Administration',
        'eng': 'Engineering'
    };
    
    const yearMap = {
        '1': '1st Year',
        '2': '2nd Year',
        '3': '3rd Year',
        '4': '4th Year'
    };

    const educationLevelMap = {
        'senior-high': 'Senior High',
        'college': 'College'
    };

    newStudent.course = courseMap[newStudent.course] || newStudent.course;
    newStudent.yearLevel = yearMap[newStudent.yearLevel] || newStudent.yearLevel;
    newStudent.educationLevel = educationLevelMap[newStudent.educationLevel] || newStudent.educationLevel;

    // Add to data arrays
    studentsData.unshift(newStudent);
    filteredStudents = [...studentsData];
    
    // Refresh table
    currentStudentPage = 1;
    renderStudentTable();
    updateStudentPagination();
    updateStats();
    
    // Close modal and show success message
    closeAddStudentModal();
    showAlert(`Student ${newStudent.firstName} ${newStudent.lastName} added successfully!`, 'success');
}

// Add new teacher
function processAddTeacher() {
    const form = document.getElementById('addTeacherForm');
    if (!form) return;
    
    // Generate teacher ID if not provided
    let teacherId = document.getElementById('teacherId').value;
    if (!teacherId.trim()) {
        teacherId = 'TCH-2024-' + String(teachersData.length + 1).padStart(4, '0');
    }

    // Create new teacher object
    const newTeacher = {
        id: teacherId,
        firstName: document.getElementById('teacherFirstName').value,
        lastName: document.getElementById('teacherLastName').value,
        middleName: document.getElementById('teacherMiddleName').value || '',
        dateOfBirth: document.getElementById('teacherDob').value,
        gender: document.getElementById('teacherGender').value,
        email: document.getElementById('teacherEmail').value,
        phone: document.getElementById('teacherPhone').value,
        address: document.getElementById('teacherAddress').value,
        employmentType: document.getElementById('employmentType').value,
        specialization: document.getElementById('specialization').value,
        designation: document.getElementById('designation').value,
        status: document.getElementById('teacherStatus').value,
        hireDate: document.getElementById('hireDate').value,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
            document.getElementById('teacherFirstName').value + '+' + document.getElementById('teacherLastName').value
        )}&background=1a4b8c&color=fff`
    };

    // Map values
    const employmentTypeMap = {
        'full-time': 'Full-time',
        'part-time': 'Part-time',
        'contractual': 'Contractual'
    };
    
    const specializationMap = {
        'cs': 'Computer Science',
        'it': 'Information Technology',
        'ba': 'Business Administration',
        'eng': 'Engineering',
        'math': 'Mathematics',
        'english': 'English'
    };
    
    const designationMap = {
        'professor': 'Professor',
        'associate-professor': 'Associate Professor',
        'assistant-professor': 'Assistant Professor',
        'instructor': 'Instructor'
    };
    
    const statusMap = {
        'active': 'Active',
        'inactive': 'Inactive',
        'on-leave': 'On Leave'
    };

    newTeacher.employmentType = employmentTypeMap[newTeacher.employmentType] || newTeacher.employmentType;
    newTeacher.specialization = specializationMap[newTeacher.specialization] || newTeacher.specialization;
    newTeacher.designation = designationMap[newTeacher.designation] || newTeacher.designation;
    newTeacher.status = statusMap[newTeacher.status] || newTeacher.status;

    // Add to data arrays
    teachersData.unshift(newTeacher);
    filteredTeachers = [...teachersData];
    
    // Refresh table
    currentTeacherPage = 1;
    renderTeacherTable();
    updateTeacherPagination();
    updateStats();
    
    // Close modal and show success message
    closeAddTeacherModal();
    showAlert(`Teacher ${newTeacher.firstName} ${newTeacher.lastName} added successfully!`, 'success');
}

// Update stats
function updateStats() {
    document.getElementById('totalStudents').textContent = studentsData.length;
    document.getElementById('totalTeachers').textContent = teachersData.length;
    document.getElementById('activeStudents').textContent = studentsData.filter(s => s.status === 'Active').length;
    document.getElementById('deletedRecords').textContent = trashData.length;
}

// Alert system
function showAlert(message, type = 'info') {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;
    
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
            <div class="alert-content">
                <span>${message}</span>
                <button onclick="document.getElementById('${alertId}').remove()" class="alert-close">✕</button>
            </div>
        </div>
    `;
    
    alertContainer.insertAdjacentHTML('beforeend', alertHtml);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        const alert = document.getElementById(alertId);
        if (alert) alert.remove();
    }, 5000);
}