/**
 * Mock data for development when the API is unreachable.
 */

export const MOCK_DEPARTMENTS = [
  { id: 1, name: "Faculty of Information Technology", slug: "faculty-of-information-technology" },
  { id: 4, name: "Faculty of Commerce and Management", slug: "faculty-of-commerce-and-management" },
  { id: 5, name: "Faculty of Science", slug: "faculty-of-science" },
  { id: 6, name: "Faculty of Pharmacy", slug: "faculty-of-pharmacy" },
  { id: 7, name: "Faculty of Law", slug: "faculty-of-law" },
  { id: 8, name: "Faculty of Technology", slug: "faculty-of-technology" },
  { id: 9, name: "Faculty of Education", slug: "faculty-of-education" },
  { id: 11, name: "Faculty of Arts & Humanities", slug: "faculty-of-arts-humanities" }
];

export const MOCK_NEWS_EVENTS = {
  results: [
    {
      id: 1,
      heading: "Admission Open 2026",
      slug: "admission-open-2026",
      date: "2026-05-01",
      category_name: "Admissions",
      category: 1,
      is_featured: true,
      images: [{ image: "https://cdn.kalingauniversity.ac.in/common/student.jpg" }]
    },
    {
      id: 2,
      heading: "Annual Convocation 2026",
      slug: "annual-convocation-2026",
      date: "2026-06-15",
      category_name: "Events",
      category: 2,
      images: [{ image: "https://cdn.kalingauniversity.ac.in/common/student.jpg" }]
    },
    {
      id: 3,
      heading: "Research Symposium on AI",
      slug: "research-symposium-ai",
      date: "2026-07-10",
      category_name: "Academic",
      category: 3,
      images: [{ image: "https://cdn.kalingauniversity.ac.in/common/student.jpg" }]
    }
  ]
};

export const MOCK_COURSE_ABOUT = [
  {
    id: 1,
    title: "Bachelor of Technology",
    description: "Our B.Tech program offers a comprehensive curriculum designed to prepare students for the evolving tech landscape.",
    slug: "btech"
  },
  {
    id: 2,
    title: "Master of Business Administration",
    description: "The MBA program focuses on developing leadership and management skills for global business opportunities.",
    slug: "mba"
  }
];

export const MOCK_DEPARTMENTS_COURSES = {
  departments: MOCK_DEPARTMENTS,
  courses: [
    { id: 1, name: "B.Tech CSE", department_name: "Faculty of Information Technology", program_type: "ug" },
    { id: 2, name: "MBA", department_name: "Faculty of Commerce and Management", program_type: "pg" }
  ]
};

export const getMockData = (endpoint) => {
  if (endpoint.includes('/departments/all-departments-courses')) return MOCK_DEPARTMENTS_COURSES;
  if (endpoint.includes('/departments/')) return { results: MOCK_DEPARTMENTS };
  if (endpoint.includes('/news-events/')) return MOCK_NEWS_EVENTS;
  if (endpoint.includes('/course-about/')) return { results: MOCK_COURSE_ABOUT };
  if (endpoint.includes('/courses/')) return { results: [] };
  if (endpoint.includes('/tables/')) return { results: [] };
  if (endpoint.includes('/clubs/')) return { results: [] };
  if (endpoint.includes('/designations/')) return { results: [] };
  
  return { results: [] };
};
