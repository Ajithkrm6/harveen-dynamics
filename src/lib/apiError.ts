export interface ApiError extends Error {
  status?: number
  data?: any
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof Error && "status" in error
}

export function apiErrorMessage(error: unknown, fallback = "An error occurred"): string {
  if (error instanceof Error) {
    return error.message
  }
  return fallback
}

