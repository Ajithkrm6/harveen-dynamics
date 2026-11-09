const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api"

async function apiRequest(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  const url = `${API_BASE}${endpoint}`
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include",
  })

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`)
  }

  return response
}

export async function apiGet<T = any>(endpoint: string): Promise<T> {
  return apiRequest(endpoint, { method: "GET" }).then((r) => r.json())
}

export async function apiPost<T = any>(endpoint: string, data?: any): Promise<T> {
  return apiRequest(endpoint, {
    method: "POST",
    body: data ? JSON.stringify(data) : undefined,
  }).then((r) => r.json())
}

export async function apiPatch<T = any>(endpoint: string, data?: any): Promise<T> {
  return apiRequest(endpoint, {
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
  }).then((r) => r.json())
}

export async function apiDelete<T = any>(endpoint: string): Promise<T> {
  return apiRequest(endpoint, { method: "DELETE" }).then((r) => r.json())
}

export async function apiPut<T = any>(endpoint: string, data?: any): Promise<T> {
  return apiRequest(endpoint, {
    method: "PUT",
    body: data ? JSON.stringify(data) : undefined,
  }).then((r) => r.json())
} 