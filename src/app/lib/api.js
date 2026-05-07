// API utility functions
import { getApiUrl, API_CONFIG } from '../config/api';
import { getMockData } from './mock-data';

/**
 * Fetches complete course details from the API
 * @param {number|string} courseId - The course ID or slug
 * @returns {Promise<Object>} Course data
 */
export async function fetchCourseCompleteDetail(courseIdOrSlug) {
  try {
    // Try with ID/slug first
    let url = getApiUrl(API_CONFIG.courses.completeDetail(courseIdOrSlug));
    let response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    // If 500 error, the endpoint might not exist or course ID is invalid
    if (!response.ok) {
      if (response.status === 500) {
        console.warn(`Course endpoint returned 500 for ${courseIdOrSlug}. This might be a backend issue or the course might not exist.`);
        // Try to get more details from the error response
        try {
          const errorData = await response.text();
          console.error('API Error Response:', errorData);
        } catch (e) {
          // Ignore parsing errors
        }
      }
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching course details for ${courseIdOrSlug}:`, error);
    throw error;
  }
}

/**
 * Fetches complete department details from the API
 * @param {number} departmentId - The department ID
 * @returns {Promise<Object>} Department data
 */
export async function fetchDepartmentCompleteDetail(departmentId) {
  try {
    const url = getApiUrl(API_CONFIG.departments.completeDetail(departmentId));
    const response = await fetch(url, {
      method: 'GET',
      // Cache control for client-side fetching
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching department details:', error);
    throw error;
  }
}

/**
 * Helper function to extract results from API response (handles paginated and direct array responses)
 * @param {Object|Array} data - API response data
 * @returns {Array} Array of items
 */
function extractResults(data) {
  if (Array.isArray(data)) {
    return data;
  }
  if (data && Array.isArray(data.results)) {
    return data.results;
  }
  if (data && data.data && Array.isArray(data.data)) {
    return data.data;
  }
  return [];
}

/**
 * Fetches all departments from the API
 * @returns {Promise<Array>} Array of department objects
 */
export async function fetchAllDepartments() {
  try {
    if (API_CONFIG.USE_MOCK_DATA) {
      console.warn('Forcing mock data for all departments');
      return extractResults(getMockData(API_CONFIG.departments.list()));
    }
    const url = getApiUrl(API_CONFIG.departments.list());
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return extractResults(data);
  } catch (error) {
    console.error('Error fetching all departments:', error);
    // Fallback to mock data on network error
    if (error.message.includes('fetch') || error.name === 'TypeError') {
      console.warn('Using mock data for all departments');
      return extractResults(getMockData(API_CONFIG.departments.list()));
    }
    throw error;
  }
}

/**
 * Fetches all department courses (optimized endpoint)
 * @returns {Promise<Array>} Array of course objects with department info
 */
export async function fetchAllDepartmentCourses() {
  try {
    if (API_CONFIG.USE_MOCK_DATA) {
      return extractResults(getMockData(API_CONFIG.departmentCourses.list()));
    }
    const url = getApiUrl(API_CONFIG.departmentCourses.list());
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return extractResults(data);
  } catch (error) {
    console.error('Error fetching all department courses:', error);
    if (error.message.includes('fetch') || error.name === 'TypeError') {
      return extractResults(getMockData(API_CONFIG.departmentCourses.list()));
    }
    throw error;
  }
}

/**
 * Fetches all courses from the API
 * @returns {Promise<Array>} Array of course objects
 */
export async function fetchAllCourses() {
  try {
    if (API_CONFIG.USE_MOCK_DATA) {
      return extractResults(getMockData(API_CONFIG.courses.list()));
    }
    const url = getApiUrl(API_CONFIG.courses.list());
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return extractResults(data);
  } catch (error) {
    console.error('Error fetching all courses:', error);
    if (error.message.includes('fetch') || error.name === 'TypeError') {
      return extractResults(getMockData(API_CONFIG.courses.list()));
    }
    throw error;
  }
}

/**
 * Fetches college pictures from the API
 * @returns {Promise<Array>} Array of college picture objects
 */
export async function fetchCollegePictures() {
  try {
    if (API_CONFIG.USE_MOCK_DATA) {
      return extractResults(getMockData(API_CONFIG.collegePictures.list()));
    }
    const url = getApiUrl(API_CONFIG.collegePictures.list());
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return extractResults(data);
  } catch (error) {
    console.error('Error fetching college pictures:', error);
    throw error;
  }
}

/**
 * Fetches courses for a department from the API
 * @param {string|number} slugOrId - The department slug or ID
 * @returns {Promise<Array>} Array of course objects
 */
export async function fetchDepartmentCourses(slugOrId) {
  try {
    if (API_CONFIG.USE_MOCK_DATA) {
      return extractResults(getMockData(API_CONFIG.departments.courses(slugOrId)));
    }
    const url = getApiUrl(API_CONFIG.departments.courses(slugOrId));
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return extractResults(data);
  } catch (error) {
    console.error('Error fetching department courses:', error);
    throw error;
  }
}

/**
 * Helper function to decode HTML entities (works in both server and client contexts)
 * @param {string} text - Text with HTML entities
 * @returns {string} Decoded text
 */
function decodeHtmlEntities(text) {
  if (!text) return '';

  // Comprehensive entity map for common HTML entities
  const entityMap = {
    // Named entities
    '&ldquo;': '"',   // Left double quotation mark
    '&rdquo;': '"',   // Right double quotation mark
    '&lsquo;': "'",   // Left single quotation mark
    '&rsquo;': "'",   // Right single quotation mark
    '&mdash;': '—',   // Em dash
    '&ndash;': '–',   // En dash
    '&hellip;': '…',  // Horizontal ellipsis
    '&nbsp;': ' ',
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&apos;': "'",
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
    '&euro;': '€',
    '&pound;': '£',
    '&yen;': '¥',
    '&cent;': '¢',
    // Numeric entities (common ones)
    '&#39;': "'",
    '&#8217;': "'",   // Right single quotation mark
    '&#8216;': "'",   // Left single quotation mark
    '&#8220;': '"',   // Left double quotation mark
    '&#8221;': '"',   // Right double quotation mark
    '&#8211;': '–',   // En dash
    '&#8212;': '—',   // Em dash
    '&#8230;': '…',   // Horizontal ellipsis
    '&#160;': ' ',    // Non-breaking space
    '&#32;': ' ',     // Space
  };

  let decoded = text;

  // Replace entities (order matters - &amp; should be first to decode encoded entities)
  const sortedEntities = Object.keys(entityMap).sort((a, b) => {
    // Process &amp; first, then longer entities
    if (a === '&amp;') return -1;
    if (b === '&amp;') return 1;
    return b.length - a.length;
  });

  sortedEntities.forEach(entity => {
    decoded = decoded.replace(new RegExp(entity.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi'), entityMap[entity]);
  });

  // Also handle numeric entities in format &#123; or &#x1F;
  decoded = decoded.replace(/&#(\d+);/g, (match, dec) => {
    try {
      return String.fromCharCode(parseInt(dec, 10));
    } catch (e) {
      return match;
    }
  });

  decoded = decoded.replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => {
    try {
      return String.fromCharCode(parseInt(hex, 16));
    } catch (e) {
      return match;
    }
  });

  return decoded;
}

/**
 * Helper function to parse HTML content to plain text paragraphs
 * @param {string} htmlContent - HTML string from API
 * @returns {string[]} Array of paragraph strings
 */
export function parseHtmlToParagraphs(htmlContent) {
  if (!htmlContent) return [];

  // First decode HTML entities
  let text = decodeHtmlEntities(htmlContent);

  // Remove HTML tags and split by paragraph breaks
  text = text
    .replace(/<p[^>]*>/gi, '')
    .replace(/<\/p>/gi, '\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '') // Remove any remaining HTML tags
    .trim();

  // Split by newlines and filter out empty strings
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0);
}

/**
 * Helper function to convert HTML content to plain text (single string)
 * @param {string} htmlContent - HTML string from API
 * @returns {string} Plain text string
 */
export function parseHtmlToText(htmlContent) {
  if (!htmlContent) return '';

  // First decode HTML entities
  let text = decodeHtmlEntities(htmlContent);

  // Remove HTML tags and clean up whitespace
  text = text
    .replace(/<[^>]*>/g, '') // Remove all HTML tags
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .trim();

  return text;
}

/**
 * Helper function to parse HTML list items into an array of HTML strings
 * Extracts content from <li> tags, preserving HTML inside
 * @param {string} htmlContent - HTML string containing <ul> or <ol> with <li> items
 * @returns {string[]} Array of HTML strings (one per list item)
 */
export function parseHtmlListItems(htmlContent) {
  if (!htmlContent) return [];

  // Match all <li>...</li> tags and extract their inner content
  const liMatches = htmlContent.match(/<li[^>]*>([\s\S]*?)<\/li>/gi);

  if (!liMatches) return [];

  return liMatches.map(li => {
    // Extract the inner content of the <li> tag
    const innerMatch = li.match(/<li[^>]*>([\s\S]*?)<\/li>/i);
    if (innerMatch && innerMatch[1]) {
      // Clean up whitespace but preserve HTML structure
      return innerMatch[1].trim();
    }
    return '';
  }).filter(item => item.length > 0);
}

/**
 * Fetches course counts for all departments
 * @returns {Promise<Array>} Array of department objects with course_count
 */
export async function fetchDepartmentCourseCounts() {
  try {
    const url = getApiUrl(API_CONFIG.departments.courseCounts());
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return extractResults(data);
  } catch (error) {
    console.error('Error fetching department course counts:', error);
    throw error;
  }
}

/**
 * Fetches all departments and courses filtered by program type and/or department
 * @param {string|null} programType - Program type filter (ug, pg, phd, diploma) or null for all
 * @param {string|null} department - Department slug or ID filter or null for all
 * @returns {Promise<Object>} Object with departments and courses arrays
 */
export async function fetchAllDepartmentsCourses(programType = null, department = null) {
  try {
    if (API_CONFIG.USE_MOCK_DATA) {
      console.warn('Forcing mock data for all departments courses');
      return getMockData(API_CONFIG.departments.allDepartmentsCourses(programType, department));
    }
    const url = getApiUrl(API_CONFIG.departments.allDepartmentsCourses(programType, department));
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching all departments courses${programType ? ` for ${programType}` : ''}${department ? ` in ${department}` : ''}:`, error);
    // Fallback to mock data on network error
    if (error.message.includes('fetch') || error.name === 'TypeError') {
      console.warn('Using mock data for all departments courses');
      return getMockData(API_CONFIG.departments.allDepartmentsCourses(programType, department));
    }
    throw error;
  }
}

/**
 * Fetches departments and courses from the combined endpoint
 * @returns {Promise<Object>} Object with departments, courses, and metadata
 */
export async function fetchDepartmentsCourses() {
  try {
    if (API_CONFIG.USE_MOCK_DATA) {
      return getMockData(API_CONFIG.departmentCourses.departmentsCourses());
    }
    const url = getApiUrl(API_CONFIG.departmentCourses.departmentsCourses());
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching departments and courses:', error);
    throw error;
  }
}

/**
 * Updates the course count for a department
 * @param {number} departmentId - The department ID
 * @param {number} courseCount - The course count to update
 * @returns {Promise<Object>} API response
 */
export async function updateDepartmentCourseCount(departmentId, courseCount) {
  try {
    const url = getApiUrl(API_CONFIG.departments.updateCourseCount());
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        department_id: departmentId,
        course_count: courseCount,
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating course count for department ${departmentId}:`, error);
    throw error;
  }
}

/**
 * Fetches all course-about data (handles pagination)
 * @returns {Promise<Array>} Array of course-about objects
 */
export async function fetchAllCourseAbout() {
  try {
    if (API_CONFIG.USE_MOCK_DATA) {
      console.warn('Forcing mock data for course-about');
      return getMockData(API_CONFIG.courses.about()).results || [];
    }
    let allResults = [];
    let nextUrl = getApiUrl(API_CONFIG.courses.about());
    let pageCount = 0;
    const maxPages = 100; // Safety limit to prevent infinite loops

    while (nextUrl && pageCount < maxPages) {
      try {
        // Handle both absolute and relative URLs
        const fetchUrl = nextUrl.startsWith('http') ? nextUrl : getApiUrl(nextUrl);

        const response = await fetch(fetchUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        });

        if (!response.ok) {
          // If it's a 404 or 500 on subsequent pages, return what we have
          if (pageCount > 0 && (response.status === 404 || response.status === 500)) {
            console.warn(`Stopped pagination at page ${pageCount + 1} due to ${response.status}`);
            break;
          }
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        // Extract results from paginated response
        if (data.results && Array.isArray(data.results)) {
          allResults = allResults.concat(data.results);
        }

        // Check if there's a next page
        nextUrl = data.next ? data.next : null;
        pageCount++;
      } catch (fetchError) {
        // If it's the first page, throw the error
        if (pageCount === 0) {
          // Provide more helpful error message
          if (fetchError.message === 'Failed to fetch' || fetchError.name === 'TypeError') {
            throw new Error(`Network error: Unable to fetch course-about data. This might be due to CORS issues or network connectivity. Original error: ${fetchError.message}`);
          }
          throw fetchError;
        }
        // If it's a subsequent page, log warning and return what we have
        console.warn(`Error fetching page ${pageCount + 1} of course-about data:`, fetchError);
        break;
      }
    }

    return allResults;
  } catch (error) {
    console.error('Error fetching course-about data:', error);
    // Fallback to mock data on network error
    if (error.message.includes('fetch') || error.name === 'TypeError' || error.message.includes('Network error')) {
      console.warn('Using mock data for course-about');
      return getMockData(API_CONFIG.courses.about()).results || [];
    }
    throw error;
  }
}

/**
 * Fetches news and events from the API
 * @param {Object} params - Query parameters (slug, department, category, is_published, etc.)
 * @returns {Promise<Object>} News and events data
 */
export async function fetchNewsEvents(params = {}) {
  try {
    if (API_CONFIG.USE_MOCK_DATA) {
      console.warn('Forcing mock data for news and events');
      return getMockData(API_CONFIG.newsEvents.list());
    }
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.append(key, value);
      }
    });

    const queryString = searchParams.toString() ? `?${searchParams.toString()}` : '';
    const url = getApiUrl(API_CONFIG.newsEvents.list(queryString));

    // Using no-store to ensure fresh data for news
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching news and events:', error);
    // Fallback to mock data on network error
    if (error.message.includes('fetch') || error.name === 'TypeError') {
      console.warn('Using mock data for news and events');
      return getMockData(API_CONFIG.newsEvents.list());
    }
    throw error;
  }
}

/**
 * Fetches single news/event details by slug
 * @param {string} slug - The slug of the news/event
 * @returns {Promise<Object>} News/event details
 */
export async function fetchNewsEventDetails(slug) {
  try {
    const url = getApiUrl(API_CONFIG.newsEvents.detail(slug));
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching news event details for ${slug}:`, error);
    throw error;
  }
}

/**
 * Fetches SEO data for a specific news/event
 * @param {string} slug - The slug of the news/event
 * @returns {Promise<Object>} SEO data
 */
export async function fetchNewsEventSEO(slug) {
  try {
    const url = getApiUrl(API_CONFIG.newsEvents.seo(slug));
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    // If 404, it might mean no specific SEO data is configured, which is fine
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching SEO for ${slug}:`, error);
    return null; // Return null on error to allow fallback to default SEO
  }
}

/**
 * Fetches tables from the API with optional filtering
 * @param {Object} params - Query parameters (search, category, department, slug)
 * @returns {Promise<Object>} Tables data with pagination
 */
export async function fetchTables(params = {}) {
  try {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        searchParams.append(key, value);
      }
    });

    const queryString = searchParams.toString() ? `?${searchParams.toString()}` : '';
    const url = getApiUrl(API_CONFIG.tables.list(queryString));

    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching tables:', error);
    throw error;
  }
}

/**
 * Fetches full table data including headers, rows, and column widths
 * @param {string|number} idOrSlug - The table ID or slug
 * @returns {Promise<Object>} Table data with headers, rows, and column_widths
 */
export async function fetchTableData(idOrSlug) {
  try {
    const url = getApiUrl(API_CONFIG.tables.detail(idOrSlug));
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching table data for ${idOrSlug}:`, error);
    throw error;
  }
}

/**
 * Fetches all table categories
 * @returns {Promise<Array>} Array of table category objects
 */
export async function fetchTableCategories() {
  try {
    const url = getApiUrl(API_CONFIG.tableCategories.list());
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return extractResults(data);
  } catch (error) {
    console.error('Error fetching table categories:', error);
    throw error;
  }
}

/**
 * Fetches all clubs from the API
 * @returns {Promise<Array>} Array of club objects
 */
export async function fetchClubs() {
  try {
    const url = getApiUrl(API_CONFIG.clubs.list());
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return extractResults(data);
  } catch (error) {
    console.error('Error fetching clubs:', error);
    throw error;
  }
}

/**
 * Fetches single club details by ID
 * @param {number|string} id - The club ID
 * @returns {Promise<string>} Club description text (usually returns text directly from the endpoint as per user request)
 */
export async function fetchClubDetail(id) {
  try {
    const url = getApiUrl(API_CONFIG.clubs.detail(id));
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      if (response.status === 404) return null;
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    // Parse as JSON as it contains description and link fields
    const data = await response.json();
    return data;
  } catch (error) {

    console.error(`Error fetching club details for ${id}:`, error);
    throw error;
  }
}

/**
 * Fetches all designations from the API
 * @returns {Promise<Array>} Array of designation objects
 */
export async function fetchDesignations() {
  try {
    const url = getApiUrl(API_CONFIG.designations.list());
    const response = await fetch(url, {
      method: 'GET',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return extractResults(data);
  } catch (error) {
    console.error('Error fetching designations:', error);
    throw error;
  }
}
