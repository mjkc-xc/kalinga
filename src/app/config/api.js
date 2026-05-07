// Global API Configuration
export const API_CONFIG = {
  baseURL: 'https://kalinga.dupebox.com/api',
  USE_MOCK_DATA: true, // Forced true because backend is unreachable

  // Course endpoints
  courses: {
    list: () => `/courses/`,
    completeDetail: (courseId) => `/courses/${courseId}/complete-detail/`,
    about: () => `/course-about/`,
  },

  // Department endpoints
  departments: {
    list: () => `/departments/`,
    completeDetail: (departmentId) => `/departments/${departmentId}/complete-detail/`,
    courses: (slugOrId) => `/departments/${slugOrId}/courses/`,
    urlInfo: (slugOrId) => `/departments/${slugOrId}/url-info/`,
    allDepartmentsCourses: (programType = null, department = null) => {
      const base = `/departments/all-departments-courses/`;
      const params = [];
      if (programType) params.push(`program_type=${programType}`);
      if (department) params.push(`department=${department}`);
      return params.length > 0 ? `${base}?${params.join('&')}` : base;
    },
    courseCounts: () => `/departments/course-counts/`,
    updateCourseCount: () => `/departments/course-counts/update/`,
  },

  // Optimized endpoints
  departmentCourses: {
    list: () => `/department-courses/`,
    departmentsCourses: () => `/departments-courses/`,
  },

  // News & Events endpoints
  newsEvents: {
    list: (params = '') => `/news-events/${params}`,
    detail: (slug) => `/news-events/${slug}/`,
    seo: (slug) => `/news-events/${slug}/seo/`,
  },

  // Tables endpoints
  tables: {
    list: (params = '') => `/tables/${params}`,
    detail: (idOrSlug) => `/tables/${idOrSlug}/`,
    byCategory: (categoryIdOrSlug) => `/tables/by-category/${categoryIdOrSlug}/`,
    byDepartment: (departmentIdOrSlug) => `/tables/by-department/${departmentIdOrSlug}/`,
  },

  // Table Categories endpoints
  tableCategories: {
    list: () => `/table-categories/`,
  },

  // Clubs endpoints
  clubs: {
    list: () => `/clubs/`,
    detail: (id) => `/clubs/${id}/`,
  },

  // College Pictures endpoints
  collegePictures: {
    list: () => `/college-pictures/`,
  },

  // Designations endpoints
  designations: {
    list: () => `/designations/`,
  },

  // Add other API endpoints here as needed
};

// Helper function to build full API URL
export const getApiUrl = (endpoint) => {
  return `${API_CONFIG.baseURL}${endpoint}`;
};

/**
 * Generic form submission helper
 * @param {string} endpoint - API endpoint path
 * @param {Object|FormData} data - Form data
 * @param {boolean} isMultipart - Whether the request is multipart/form-data
 * @returns {Promise<Object>} API response
 */
export const submitForm = async (endpoint, data, isMultipart = false) => {
  const baseUrl = API_CONFIG.baseURL;
  const url = `${baseUrl}${endpoint}`;

  const options = {
    method: 'POST',
    body: isMultipart ? data : JSON.stringify(data),
  };

  if (!isMultipart) {
    options.headers = {
      'Content-Type': 'application/json',
    };
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // Try to extract a meaningful error message
      let errorMsg = errorData.message || errorData.detail;

      if (!errorMsg && typeof errorData === 'object') {
        // If it's a field-specific error (like from Django REST Framework), 
        // get the first error message found in the object
        const firstKey = Object.keys(errorData)[0];
        if (firstKey) {
          const val = errorData[firstKey];
          errorMsg = Array.isArray(val) ? `${firstKey}: ${val[0]}` : `${firstKey}: ${val}`;
        }
      }

      throw new Error(errorMsg || 'Something went wrong');
    }
    return await response.json();
  } catch (error) {
    console.error(`Error submitting form to ${endpoint}:`, error);
    throw error;
  }
};
