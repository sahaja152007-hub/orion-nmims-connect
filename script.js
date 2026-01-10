// References to DOM elements
const notificationList = document.getElementById('notification-list');
const activeContextLabel = document.getElementById('active-context-label');
const notifCountLabel = document.getElementById('notification-count');
const contextButtons = document.querySelectorAll('.ctx-btn');

/**
 * Render the feed based on the given group/context.
 */
function renderFeed(context) {
    // 1. Get filtered data from data.js
    const searchQuery = document.getElementById('search-input')?.value || "";
    const filteredData = window.appData.getFilteredNotifications(context, searchQuery);

    // 2. Update stats
    notifCountLabel.textContent = filteredData.length;

    // Format label nicely (e.g. "year1" -> "Year 1")
    let displayLabel = context.replace(/([a-zA-Z]+)(\d+)/, "$1 $2"); // Splits "year1" to "year 1"
    displayLabel = displayLabel.charAt(0).toUpperCase() + displayLabel.slice(1);

    if (context === "all") displayLabel = "All Campus";

    activeContextLabel.textContent = displayLabel;

    // 3. Clear current list
    notificationList.innerHTML = '';

    // 4. Populate list
    filteredData.forEach((note, index) => {
        const card = document.createElement('div');
        card.className = 'notif-card';
        // Stagger animation
        card.style.animationDelay = `${index * 50}ms`;

        // Determine border color based on score/urgency
        let accentColor = '#64748b'; // default
        let titleColor = 'inherit';

        if (note.score > 20) accentColor = '#6366f1'; // High relevance (Indigo)
        if (note.urgency === 'high') {
            accentColor = '#f97316'; // Orange for high
        }
        if (note.urgency === 'critical') {
            accentColor = '#ef4444'; // Red for critical
            titleColor = '#ef4444';
        }

        card.innerHTML = `
            <div class="score-indicator" style="background-color: ${accentColor}"></div>
            <div class="notif-content">
                <div class="notif-header">
                    <h4 class="notif-title" style="color: ${titleColor}">${note.title}</h4>
                    <span class="notif-time">${note.timestamp}</span>
                </div>
                <p class="notif-body">${note.body}</p>
                
                ${note.meta ? `
                <div class="notif-meta">
                    <div class="meta-item"><i class="fa-regular fa-calendar" title="Date"></i> ${note.meta.date}</div>
                    <div class="meta-item"><i class="fa-regular fa-clock" title="Time"></i> ${note.meta.time}</div>
                    <div class="meta-item"><i class="fa-solid fa-location-dot" title="Location"></i> ${note.meta.location}</div>
                </div>
                ` : ''}

                <div class="notif-actions" style="margin-top: 1rem; display: flex; gap: 1rem;">
                    ${note.meta && note.meta.regLink ? `<a href="${note.meta.regLink}" target="_blank" class="action-link reg-link"><i class="fa-solid fa-link"></i> Register Here</a>` : ''}
                    ${note.meta && note.meta.posterLink ? `<a href="${note.meta.posterLink}" target="_blank" class="action-link poster-link"><i class="fa-solid fa-image"></i> View Poster</a>` : ''}
                </div>

                <div class="tags">
                     <!-- Hashtags removed as per requirements -->
                </div>
            </div>
        `;

        notificationList.appendChild(card);
    });
}

/**
 * Handle Context Switch
 */
function setContext(context) {
    // Update UI buttons
    contextButtons.forEach(btn => {
        if (btn.dataset.context === context) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Re-render feed
    // Re-render feed
    renderFeed(context);
}

function filterFeed() {
    const activeBtn = document.querySelector('.ctx-btn.active');
    const currentContext = activeBtn ? activeBtn.dataset.context : 'all';
    renderFeed(currentContext);
}

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    // Check if there's a stored preference or default to 'all'
    renderFeed('all');
});

/**
 * Login Logic
 */
function loginUser() {
    const input = document.getElementById('school-id-input');
    const appContainer = document.querySelector('.app-container');
    const profileView = document.getElementById('profile-view');

    const userId = input.value.trim().toUpperCase();

    // Check if Faculty (starts with F)
    if (userId.startsWith('F')) {
        const faculty = window.appData.faculty[userId];
        if (faculty) {
            setupFacultyView(faculty);
        } else {
            alert("Faculty ID not found!");
        }
        return;
    }

    const user = window.appData.users[userId]; // Get user from data.js

    if (user) {
        setupStudentView(user);
    } else {
        alert("User ID not found! Try S001 or F10001");
    }
}

function setupStudentView(user) {
    const input = document.getElementById('school-id-input');
    const appContainer = document.querySelector('.app-container');
    const profileView = document.getElementById('profile-view');

    // Populate Profile
    document.getElementById('p-name').textContent = user.name;
    document.getElementById('p-degree').textContent = user.degree;
    document.getElementById('p-id').textContent = user.id;
    document.getElementById('p-roll').textContent = user.rollNo;
    document.getElementById('p-year').textContent = user.year;
    document.getElementById('p-mentor').textContent = user.mentor;
    document.getElementById('p-age').textContent = user.age;
    document.getElementById('p-cgpa').textContent = user.cgpa;

    // Populate Timetable
    const timetableContainer = document.getElementById('p-timetable');
    timetableContainer.innerHTML = '';
    user.timetable.forEach(slot => {
        const div = document.createElement('div');
        div.className = 'time-row';
        div.innerHTML = `
            <div class="time-slot">${slot.time}</div>
            <div class="subject-info">
                <span class="subject-name">${slot.subject}</span>
                <span class="room-no"><i class="fa-solid fa-location-dot"></i> ${slot.room}</span>
            </div>
        `;
        timetableContainer.appendChild(div);
    });

    // Populate Attendance
    renderStudentAttendance(user);

    // Switch View
    appContainer.style.display = 'none';
    profileView.style.display = 'block';
    input.value = '';
}

function setupFacultyView(faculty) {
    const input = document.getElementById('school-id-input');
    const appContainer = document.querySelector('.app-container');
    const facultyView = document.getElementById('faculty-view');

    document.getElementById('f-name').textContent = faculty.name;
    document.getElementById('f-id').textContent = faculty.id;
    document.getElementById('f-dept').textContent = faculty.dept;
    document.getElementById('f-designation').textContent = faculty.designation;
    document.getElementById('f-email').textContent = faculty.email;

    // Timetable & Class Dropdown
    const timetableContainer = document.getElementById('f-timetable');
    const classSelector = document.getElementById('class-selector');

    timetableContainer.innerHTML = '';
    classSelector.innerHTML = '<option value="">Select Class...</option>';

    faculty.timetable.forEach(slot => {
        // Timetable Row
        const div = document.createElement('div');
        div.className = 'time-row';
        div.innerHTML = `
            <div class="time-slot">${slot.time}</div>
            <div class="subject-info">
                <span class="subject-name">${slot.subject} (${slot.classId})</span>
                <span class="room-no"><i class="fa-solid fa-location-dot"></i> ${slot.room}</span>
            </div>
        `;
        timetableContainer.appendChild(div);

        // Dropdown Option
        const opt = document.createElement('option');
        opt.value = slot.classId;
        opt.textContent = `${slot.time} - ${slot.subject} (${slot.classId})`;
        classSelector.appendChild(opt);
    });

    appContainer.style.display = 'none';
    facultyView.style.display = 'block';
    input.value = '';
}

// Attendance Portal Logic
function loadClassList() {
    const classId = document.getElementById('class-selector').value;
    const sheet = document.getElementById('attendance-sheet');
    const list = document.getElementById('student-list');

    if (!classId) {
        sheet.style.display = 'none';
        return;
    }

    const students = window.appData.classLists[classId] || [];
    list.innerHTML = '';

    students.forEach(student => {
        const row = document.createElement('div');
        row.className = 'sheet-row';
        row.innerHTML = `
            <div>
                <div style="font-weight: 500; color: white;">${student.name}</div>
                <div style="font-size: 0.8rem; color: var(--text-muted);">${student.id}</div>
            </div>
            <div style="color: white;">${student.roll}</div>
            <div class="status-toggle">
                <button class="att-btn present-btn active" onclick="toggleStatus(this, 'P')">P</button>
                <button class="att-btn absent-btn" onclick="toggleStatus(this, 'A')">A</button>
            </div>
        `;
        list.appendChild(row);
    });

    sheet.style.display = 'block';
}

function toggleStatus(btn, status) {
    const parent = btn.parentElement;
    const btns = parent.querySelectorAll('.att-btn');
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

function submitAttendance() {
    alert("Attendance Saved Successfully! ✅");
    document.getElementById('class-selector').value = "";
    document.getElementById('attendance-sheet').style.display = "none";
}

function logoutUser() {
    document.querySelector('.app-container').style.display = 'flex';
    document.getElementById('profile-view').style.display = 'none';
    document.getElementById('faculty-view').style.display = 'none';
}

function renderStudentAttendance(user) {
    // Populate Attendance
    const attList = document.getElementById('p-attendance-list');
    const overallCircle = document.getElementById('p-overall-circle');
    let totalAttended = 0;
    let totalClasses = 0;

    attList.innerHTML = '';

    user.attendance.subjects.forEach(sub => {
        totalAttended += sub.attended;
        totalClasses += sub.total;

        const pct = Math.round((sub.attended / sub.total) * 100);

        // Calculate Logic: 80% Threshold
        let message = "";
        let colorClass = "att-safe";
        let barColor = "#22c55e"; // Green default

        if (pct >= 80) {
            const margin = Math.floor((sub.attended - (0.8 * sub.total)) / 0.8);
            message = `Margin to 80%: ${margin} classes`;
        } else {
            const needed = Math.ceil(((0.8 * sub.total) - sub.attended) / 0.2);
            message = `Attend next ${needed} classes for 80%`;
            colorClass = "att-danger";
            barColor = "#ef4444";
        }
        const div = document.createElement('div');
        div.className = 'att-row';
        div.innerHTML = `
                <div class="att-header">
                    <span>${sub.name}</span>
                    <span class="${colorClass}">${pct}%</span>
                </div>
                <div class="att-bar-bg">
                    <div class="att-bar-fill" style="width: ${pct}%; background: ${barColor}"></div>
                </div>
                <div class="att-info ${colorClass}">${message}</div>
            `;
        attList.appendChild(div);
    });

    const overallPct = Math.round((totalAttended / totalClasses) * 100);
    document.getElementById('p-overall-text').textContent = `${overallPct}%`;
    overallCircle.style.background = `conic-gradient(${overallPct >= 75 ? '#22c55e' : '#ef4444'} ${overallPct * 3.6}deg, rgba(255,255,255,0.1) 0deg)`;
}

function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('show-sidebar');
}

/**
 * Add Notice Modal Logic
 */
function openAddNoticeModal() {
    document.getElementById('add-notice-modal').style.display = 'flex';
}

function closeAddNoticeModal() {
    document.getElementById('add-notice-modal').style.display = 'none';
}

function submitNotice() {
    const title = document.getElementById('notice-title').value;
    const body = document.getElementById('notice-body').value;
    const date = document.getElementById('notice-date').value;
    const time = document.getElementById('notice-time').value;
    const target = document.getElementById('notice-target').value;
    const regLink = document.getElementById('notice-reg-link').value;
    const posterLink = document.getElementById('notice-poster-link').value;

    if (!title || !body) {
        alert("Please fill in Title and Description");
        return;
    }

    // Create new notice object based on our data model
    const newNotice = {
        id: Date.now(), // unique ID
        title: title,
        body: body,
        timestamp: "Just now",
        type: "event",
        urgency: "medium", // default for user posts
        tags: [target, "user-generated"], // basic tagging
        meta: {
            date: date || "TBD",
            time: time || "TBD",
            location: "See Details",
            regLink: regLink || "#",
            posterLink: posterLink || "#"
        },
        score: 100 // Give it a high score so it shows up at the top immediately!
    };

    // Add to global data (in memory)
    // Note: In window.appData.getFilteredNotifications, we read from 'notifications' array.
    // We need to push to that array. Since 'notifications' is const in data.js, 
    // we should have exposed a method or made it let. 
    // HACK: For this specific vanilla setup, we assume we can create a text-based match or 
    // we need to access the array. Since data.js runs in global scope, 'notifications' IS global.

    if (typeof notifications !== 'undefined') {
        notifications.unshift(newNotice); // Add to top
        localStorage.setItem('nmims_notifications', JSON.stringify(notifications)); // Save Persistence
    } else {
        console.error("Notifications array not found");
    }

    // Refresh Feed
    const activeBtn = document.querySelector('.ctx-btn.active');
    const currentContext = activeBtn ? activeBtn.dataset.context : 'all';
    renderFeed(currentContext); // This will read the updated memory array
    closeAddNoticeModal();

    // Clear form
    document.getElementById('notice-title').value = '';
    document.getElementById('notice-body').value = '';
}

// Persist Attendance on Submit
function submitAttendance() {
    const sheet = document.getElementById('attendance-sheet');
    const rows = sheet.querySelectorAll('.sheet-row');
    const classId = document.getElementById('class-selector').value;

    let changesCount = 0;

    // We need to look up the subject name for this ClassID to update local student data
    // For this Mock, we'll try to match the subject "Artificial Intelligence" from "CS-A"
    // In a real app, IDs would be better.
    // 
    // Optimization: We will just update the mock counters locally for the demo effect on users[id]

    rows.forEach(row => {
        const studentId = row.querySelector('.att-btn').onclick.toString().match(/toggleStatus\(this, '([PA])'\)/);
        // extracting logic is hard from inline onclick strings in DOM.
        // Better: look at the active button

        const isPresent = row.querySelector('.present-btn').classList.contains('active');
        const rollDiv = row.children[1].textContent;
        // Find student ID based on Roll (simple lookup)
        const student = Object.values(window.appData.classLists[classId]).find(s => s.roll === rollDiv);

        if (student) {
            const userObj = window.appData.users[student.id];
            if (userObj) {
                // Hack: Finding the right subject to update in their profile
                const targetSubject = userObj.attendance.subjects.find(s =>
                    // Mapping ClassId to Subject Name roughly
                    (classId === 'CS-A' && s.name === 'Artificial Intelligence') ||
                    (classId === 'CS-A-Lab' && s.name === 'Robotics Lab')
                );

                if (targetSubject) {
                    targetSubject.total++;
                    if (isPresent) targetSubject.attended++;
                    changesCount++;
                }
            }
        }
    });

    // Save to LocalStorage
    localStorage.setItem('nmims_users', JSON.stringify(window.appData.users));

    alert(`Attendance Saved! Updated ${changesCount} records.`);
    document.getElementById('class-selector').value = "";
    document.getElementById('attendance-sheet').style.display = "none";
}
