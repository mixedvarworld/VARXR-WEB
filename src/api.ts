import type { Inquiry, Project, Property, Room, XRModel } from "./types";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://varxr-api.onrender.com/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `API ${response.status}: ${body || response.statusText}`
    );
  }

  return response.json() as Promise<T>;
}

export const api = {
  getProjects: () => request<Project[]>("/projects"),
  getProject: (projectId: number) => request<Project>(`/projects/${projectId}`),
  getProjectProperties: (projectId: number) =>
    request<Property[]>(`/projects/${projectId}/properties`),
  getRooms: (propertyId: number) =>
    request<Room[]>(`/rooms/property/${propertyId}`),
  getXRModels: (propertyId: number) =>
    request<XRModel[]>(`/xrmodels/property/${propertyId}`),
  createInquiry: (inquiry: Inquiry) =>
    request<unknown>("/inquiries", {
      method: "POST",
      body: JSON.stringify(inquiry),
    }),
};

export { API_BASE_URL };