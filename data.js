
// NMIMS Shirpur Detailed Mock Data
// NMIMS Shirpur Detailed Mock Data
const defaultNotifications = [
    // --- 1st Year Specific (Admission, Orientation, Clubs) ---
    {
        id: 101,
        title: "Admission Documents Pending",
        body: "Urgent: Please submit your original 12th Marksheet and Migration Certificate at the Admin Office.",
        timestamp: "10 mins ago",
        type: "admin",
        urgency: "critical",
        tags: ["year1", "admin", "admission"],
        meta: {
            date: "Submit by: Oct 15, 2026",
            time: "10:00 AM - 4:00 PM",
            location: "Admin Block, Ground Floor",
            regLink: "#",
            posterLink: "#"
        }
    },
    {
        id: 102,
        title: "CodeCell: Freshman Intro Session",
        body: "Want to learn coding? Join CodeCell's introductory workshop for first years.",
        timestamp: "2 hours ago",
        type: "club",
        urgency: "medium",
        tags: ["year1", "clubs", "tech"],
        meta: {
            date: "Oct 12, 2026",
            time: "5:30 PM",
            location: "Main Auditorium",
            regLink: "https://codecell.nmims.edu/register",
            posterLink: "https://codecell.nmims.edu/poster"
        }
    },

    // --- 2nd & 3rd Year Specific (Internships, Clubs, Events) ---
    {
        id: 201,
        title: "Summer Internship Opportunity: Infosys",
        body: "Applications open for 2-month summer internship. CGPA Cutoff: 8.0.",
        timestamp: "1 hour ago",
        type: "career",
        urgency: "high",
        tags: ["year2", "year3", "internship", "career"],
        meta: {
            date: "Apply by: Oct 20, 2026",
            time: "Online",
            location: "Portal Link",
            regLink: "https://infosys.com/careers/internship",
            posterLink: "#"
        }
    },
    {
        id: 202,
        title: "Robotics Club: 'BotWar' Hackathon",
        body: "Build battle bots and compete! Teams of 4 required. 2nd & 3rd year preferred.",
        timestamp: "3 hours ago",
        type: "club",
        urgency: "medium",
        tags: ["year2", "year3", "clubs", "tech", "robotics"],
        meta: {
            date: "Nov 5, 2026",
            time: "9:00 AM onwards",
            location: "Mechanical Workshop Lab",
            regLink: "#",
            posterLink: "#"
        }
    },
    {
        id: 203,
        title: "Industrial Visit: Suzlon Wind Farm",
        body: "One-day visit for Electrical Eng. students. Consent form mandatory.",
        timestamp: "1 day ago",
        type: "academic",
        urgency: "medium",
        tags: ["year2", "year3", "iv", "academic"],
        meta: {
            date: "Oct 25, 2026",
            time: "Departure: 6:00 AM",
            location: "College Gate 1",
            regLink: "#",
            posterLink: "#"
        }
    },

    // --- 4th Year Specific (Placements) ---
    {
        id: 401,
        title: "Google: Campus Placement Drive",
        body: "Pre-placement talk followed by Coding Round 1. Formal attire mandatory.",
        timestamp: "Just now",
        type: "career",
        urgency: "critical",
        tags: ["year4", "placement", "career"],
        meta: {
            date: "Tomorrow, Oct 10",
            time: "9:00 AM Sharp",
            location: "Seminar Hall A",
            regLink: "https://careers.google.com/students",
            posterLink: "#"
        }
    },
    {
        id: 402,
        title: "Capstone Project: Final Synopsis Submission",
        body: "Last date to submit your project synopsis signed by your mentor.",
        timestamp: "4 hours ago",
        type: "academic",
        urgency: "high",
        tags: ["year4", "project", "academic"],
        meta: {
            date: "Oct 18, 2026",
            time: "Before 5:00 PM",
            location: "HOD Office",
            regLink: "#",
            posterLink: "#"
        }
    },

    // --- Clubs & Events (General) ---
    {
        id: 501,
        title: "Aarambh '26: Cultural Fest Auditions",
        body: "Auditions for Dance, Drama, and Music. Show us your talent!",
        timestamp: "30 mins ago",
        type: "social",
        urgency: "medium",
        tags: ["clubs", "all", "social", "dance", "music"],
        meta: {
            date: "Oct 11-13, 2026",
            time: "6:00 PM - 9:00 PM",
            location: "Amphitheatre",
            regLink: "#",
            posterLink: "#"
        }
    },
    {
        id: 502,
        title: "Debate Club: 'AI in Education'",
        body: "Open debate session. topic: 'Will AI replace teachers?'.",
        timestamp: "5 hours ago",
        type: "club",
        urgency: "low",
        tags: ["topical", "clubs", "all"],
        meta: {
            date: "Oct 14, 2026",
            time: "4:00 PM",
            location: "Room 304, Pharmacy Building",
            regLink: "#",
            posterLink: "#"
        }
    },
    {
        id: 503,
        title: "Sports Council: Inter-Year Cricket",
        body: "Register your team for the MPSTME Premier League.",
        timestamp: "1 day ago",
        type: "sport",
        urgency: "medium",
        tags: ["clubs", "all", "sports"],
        meta: {
            date: "Matches start Nov 1",
            time: "Evenings",
            location: "College Ground",
            regLink: "#",
            posterLink: "#"
        }
    }
    ,
    // --- Expired / Missed Deadline Examples ---
    {
        id: 901,
        title: "Guest Lecture: Blockchain Defaults",
        body: "Introduction to Smart Contracts. Attendance Compulsory.",
        timestamp: "5 days ago",
        type: "academic",
        urgency: "low",
        tags: ["all", "tech"],
        meta: {
            date: "Jan 5, 2026", // Missed
            deadline: "2026-01-05", // ISO format for logic
            time: "10:00 AM",
            location: "Seminar Hall",
            regLink: "#",
            posterLink: "#"
        }
    },
    {
        id: 902,
        title: "Flash Mob Registration",
        body: "Last day to sign up for the Flash Mob event.",
        timestamp: "2 days ago",
        type: "club",
        urgency: "medium",
        tags: ["clubs", "dance"],
        meta: {
            date: "Jan 9, 2026", // Missed recently
            deadline: "2026-01-09",
            time: "5:00 PM",
            location: "Atrium",
            regLink: "#",
            posterLink: "#"
        }
    }
];

// Relevance Rules
const groupRules = {
    "all": {
        boostTags: ["all", "general"],
        buryTags: []
    },
    "year1": {
        boostTags: ["year1", "admission", "orientation"],
        relevantTags: ["all", "club", "event"],
        buryTags: ["year2", "year3", "year4", "placement", "internship", "project"]
    },
    "year2": {
        boostTags: ["year2", "internship", "iv"],
        relevantTags: ["all", "year3", "club", "tech"], // Year 2 & 3 often share activities
        buryTags: ["year1", "admission", "year4", "placement"]
    },
    "year3": {
        boostTags: ["year3", "internship", "iv", "tech"],
        relevantTags: ["all", "year2", "club", "career"],
        buryTags: ["year1", "admission", "freshmen"]
    },
    "year4": {
        boostTags: ["year4", "placement", "career", "project"],
        relevantTags: ["all"],
        buryTags: ["year1", "year2", "year3", "internship", "iv", "admission"] // 4th years focused on jobs
    },
    "clubs": {
        boostTags: ["clubs", "social", "music", "dance", "tech", "sports"],
        relevantTags: ["all", "event"],
        buryTags: ["academic", "admission", "project", "exam", "placement"] // Club mode = Fun only
    }
};

/**
 * Filter notifications for the selected group.
 */


// Load Logic: Check LocalStorage -> Default to Mock
function loadNotifications() {
    const saved = localStorage.getItem('nmims_notifications');
    return saved ? JSON.parse(saved) : defaultNotifications;
}

const notifications = loadNotifications();

/**
 * Filter notifications for the selected group AND search query.
 */
function getFilteredNotifications(currentGroup = "all", searchQuery = "") {
    const rules = groupRules[currentGroup] || groupRules["all"];
    const query = searchQuery.toLowerCase();

    return notifications.map(note => {
        let score = 0;

        // Base Urgency Score
        if (note.urgency === "critical") score += 50;
        if (note.urgency === "high") score += 20;
        if (note.urgency === "medium") score += 10;

        // Group Relevance
        const hasBoost = note.tags.some(t => rules.boostTags?.includes(t));
        const hasRelevant = note.tags.some(t => rules.relevantTags?.includes(t));
        const hasBury = note.tags.some(t => rules.buryTags?.includes(t));

        if (hasBoost) score += 40;
        if (hasRelevant) score += 10;
        if (hasBury) score -= 100;

        // Search Filter (Strict)
        if (query) {
            const matchTitle = note.title.toLowerCase().includes(query);
            const matchBody = note.body.toLowerCase().includes(query);
            if (!matchTitle && !matchBody) {
                return null; // Eliminate irrelevant
            }
        }

        // Deadline Clean-up Logic (Remove notices older than 2 days past deadline)
        if (note.meta && note.meta.deadline) {
            const deadlineDate = new Date(note.meta.deadline);
            const today = new Date();
            // Calculate difference in days
            const diffTime = today - deadlineDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // If more than 2 days passed since deadline, hide it
            if (diffDays > 2) {
                return null;
            }
        }

        return { ...note, score };
    })
        .filter(note => note && note.score > -20)
        .sort((a, b) => b.score - a.score);
}

// Load Users from LocalStorage or Default
function loadUsers() {
    const saved = localStorage.getItem('nmims_users');
    return saved ? JSON.parse(saved) : defaultUsers;
}

const defaultUsers = {
    "S001": {
        name: "Rahul Sharma",
        id: "S001",
        rollNo: "R-2023-45",
        degree: "B.Tech Computer Science",
        year: "3rd Year",
        age: 21,
        mentor: "Dr. Anjali Gupta",
        cgpa: "8.9",
        timetable: [
            { time: "09:00 AM", subject: "Artificial Intelligence", room: "LH-302" },
            { time: "11:00 AM", subject: "Compiler Design", room: "LH-305" },
            { time: "02:00 PM", subject: "Robotics Lab", room: "Lab-2" }
        ],
        attendance: {
            overall: 82, // Calculated dynamically ideally, but hardcoded for mock
            subjects: [
                { name: "Artificial Intelligence", attended: 22, total: 25 }, // 88%
                { name: "Compiler Design", attended: 18, total: 24 }, // 75%
                { name: "Robotics Lab", attended: 8, total: 10 }, // 80%
                { name: "Project", attended: 28, total: 30 } // 93%
            ]
        }
    },
    "S002": {
        name: "Priya Patel",
        id: "S002",
        rollNo: "R-2025-12",
        degree: "MBA Tech",
        year: "1st Year",
        age: 18,
        mentor: "Prof. Vikram Singh",
        cgpa: "N/A",
        timetable: [
            { time: "10:00 AM", subject: "Mathematics I", room: "LH-101" },
            { time: "12:00 PM", subject: "Physics", room: "LH-102" },
            { time: "04:00 PM", subject: "Workshop", room: "WS-A" }
        ],
        attendance: {
            overall: 72,
            subjects: [
                { name: "Mathematics I", attended: 15, total: 25 }, // 60% (Low)
                { name: "Physics", attended: 20, total: 22 }, // 90%
                { name: "Workshop", attended: 9, total: 10 } // 90%
            ]
        }
    }
};

const users = loadUsers();


// Mock Faculty Database
const faculty = {
    "F10001": {
        name: "Dr. Anjali Gupta",
        id: "F10001",
        dept: "Computer Science",
        designation: "Associate Professor",
        email: "anjali.g@nmims.edu",
        timetable: [
            { time: "09:00 AM", subject: "Artificial Intelligence", room: "LH-302", classId: "CS-A" },
            { time: "11:00 AM", subject: "AI Lab", room: "Lab-2", classId: "CS-A-Lab" },
            { time: "02:00 PM", subject: "Project Review", room: "Staff Room", classId: "Proj-Gr" }
        ]
    }
};

// Mock Class Lists for Attendance
const classLists = {
    "CS-A": [
        { name: "Rahul Sharma", roll: "R-045", id: "S001" },
        { name: "Priya Patel", roll: "R-012", id: "S002" },
        { name: "Amit Kumar", roll: "R-005", id: "S003" },
        { name: "Sneha Reddy", roll: "R-022", id: "S004" }
    ],
    "CS-A-Lab": [
        { name: "Rahul Sharma", roll: "R-045", id: "S001" },
        { name: "Amit Kumar", roll: "R-005", id: "S003" }
    ]
};

window.appData = {
    getFilteredNotifications,
    users,
    faculty,
    classLists
};
