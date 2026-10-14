import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const csrfClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL?.replace('/api/v1', '') || 'http://localhost:8000',
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const fetchTalents = async () => {
  const response = await apiClient.get('/talents');
  return response.data.data;
};

export const fetchTalentBySlug = async (slug: string) => {
  const response = await apiClient.get(`/talents/${slug}`);
  return response.data.data;
};

export const fetchServices = async () => {
  const response = await apiClient.get('/services');
  return response.data.data;
};

export const fetchServiceBySlug = async (slug: string) => {
  const response = await apiClient.get(`/services/${slug}`);
  return response.data.data;
};

export const fetchProjects = async () => {
  const response = await apiClient.get('/projects');
  return response.data.data;
};

export const fetchBlogPosts = async (params = {}) => {
  const response = await apiClient.get('/blog/posts', { params });
  return response.data; // returns paginated response { data, meta, links }
};

export const fetchBlogPostBySlug = async (slug: string) => {
  const response = await apiClient.get(`/blog/posts/${slug}`);
  return response.data.data;
};

export const fetchCaseStudies = async () => {
  const response = await apiClient.get('/case-studies');
  return response.data.data;
};

export const fetchFaqs = async () => {
  const response = await apiClient.get('/faqs');
  return response.data.data;
};

export const submitLead = async (data: any) => {
  const response = await apiClient.post('/leads', data);
  return response.data;
};
