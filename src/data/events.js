export const academicCalendar = {
  year: "2024/2025",
  terms: [
    {
      name: "First Term",
      start: "September 9, 2024",
      end: "December 13, 2024",
      color: "blue",
      events: [
        { date: "Sep 9", label: "School Reopens" },
        { date: "Oct 14", label: "Mid-Term Break" },
        { date: "Nov 25", label: "End of Term Exams Begin" },
        { date: "Dec 13", label: "School Closes" },
      ],
    },
    {
      name: "Second Term",
      start: "January 13, 2025",
      end: "April 11, 2025",
      color: "gold",
      events: [
        { date: "Jan 13", label: "School Reopens" },
        { date: "Feb 17", label: "Mid-Term Break" },
        { date: "Mar 28", label: "End of Term Exams Begin" },
        { date: "Apr 11", label: "School Closes" },
      ],
    },
    {
      name: "Third Term",
      start: "April 28, 2025",
      end: "July 25, 2025",
      color: "green",
      events: [
        { date: "Apr 28", label: "School Reopens" },
        { date: "Jun 2", label: "Mid-Term Break" },
        { date: "Jul 7", label: "End of Term Exams Begin" },
        { date: "Jul 18", label: "Speech & Prize Giving Day" },
        { date: "Jul 25", label: "School Closes" },
      ],
    },
  ],
}

// The term currently in progress (used for the "Current Term" badge).
export const currentTermName = "Third Term"

// Upcoming events for the home page timeline preview.
export const upcomingEvents = [
  {
    date: "Jun 2",
    name: "Mid-Term Break",
    description: "A short break for pupils to rest and review before the final stretch of the term.",
    location: "Schoolwide",
  },
  {
    date: "Jul 7",
    name: "End of Term Examinations",
    description: "Third term examinations begin for all classes from KG to JHS.",
    location: "All Classrooms",
  },
  {
    date: "Jul 18",
    name: "Speech & Prize Giving Day",
    description: "Celebrating academic excellence, talent, and good conduct across the school.",
    location: "School Assembly Grounds",
  },
  {
    date: "Jul 22",
    name: "JHS 3 Graduation Ceremony",
    description: "A proud send-off for our graduating Junior High School pupils.",
    location: "Main Hall",
  },
  {
    date: "Jul 25",
    name: "End of Academic Year",
    description: "School closes for the long vacation. Have a restful and safe break!",
    location: "Schoolwide",
  },
]

// Pinned notices for the news page notice board.
export const announcements = [
  {
    title: "Third Term Fees Due",
    body: "Kindly settle all outstanding third term fees before the start of end-of-term examinations.",
    urgent: true,
  },
  {
    title: "PTA General Meeting",
    body: "The next PTA meeting holds on Saturday, June 14, 2025 at 9:00am in the main hall. All parents are encouraged to attend.",
    urgent: false,
  },
  {
    title: "Admissions Open for 2025/2026",
    body: "Applications for the next academic year are now open. Limited spaces available per class — apply early.",
    urgent: true,
  },
  {
    title: "Uniform Reminder",
    body: "Pupils are reminded to wear the complete and correct school uniform daily. PE kit on Wednesdays only.",
    urgent: false,
  },
]
