import type { HttpResponse } from '@/services/interfaces';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const BASE_URL = '/api';

const getAuthToken = (): string | null => {
  return localStorage.getItem('authToken');
};

async function handleResponse<T>(
  response: Response,
): Promise<HttpResponse<T>> {
  try {
    const contentType = response.headers.get('content-type');
    let errorData: any = null;

    if (!response.ok) {
      if (contentType && contentType.includes('application/json')) {
        errorData = await response.json();
      }
      return {
        data: null,
        error: errorData?.message || `HTTP error! status: ${response.status}`,
        status: response.status,
      };
    }

    if (response.status === 204) {
      return {
        data: null,
        error: null,
        status: response.status,
      };
    }

    if (contentType && contentType.includes('application/json')) {
      const data = await response.json() as T;
      return {
        data,
        error: null,
        status: response.status,
      };
    } else {
      const text = await response.text();
      return {
        data: text as T,
        error: null,
        status: response.status,
      };
    }
  } catch (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any
  ) {
    return {
      data: null,
      error: error.message || 'Error processing response',
      status: null,
    };
  }
}

async function refreshToken(): Promise<
  HttpResponse<{
    accessToken: string;
    refreshToken?: string;
  }>
> {
  const authStore = useAuthStore();
  const { refreshToken: refreshTokenValue } = storeToRefs(authStore);

  if (!refreshTokenValue.value) {
    console.error('No refresh token available');
    return {
      data: null,
      error: 'No refresh token available',
      status: 400,
    };
  }

  try {
    const response = await fetch(
      `${BASE_URL}/auth/refresh`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: refreshTokenValue.value }),
      },
    );
    const refreshResponse = await handleResponse<{
      accessToken: string;
      refreshToken?: string;
    }>(response);

    if (refreshResponse.data?.accessToken) {
      authStore.setAccessToken(refreshResponse.data.accessToken);
      if (refreshResponse.data.refreshToken) {
        authStore.setRefreshToken(refreshResponse.data.refreshToken);
      }
    } else {
      console.error('Error refreshing token:', refreshResponse.error);
      authStore.logout();
      window.location.href = '/login';
    }
    return refreshResponse;
  } catch (error: any) {
    console.error('Error refreshing token:', error);
    authStore.logout();
    window.location.href = '/login';
    return {
      data: null,
      error: error.message || 'Error refreshing token',
      status: null,
    };
  }
}

async function makeRequest<T>(
  url: string,
  method: string,
  body?: any,
  isRetry = false,
): Promise<HttpResponse<T>> {
  const token = getAuthToken();
  const headers: HeadersInit = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  if (body && (method === 'POST' || method === 'PUT')) {
    headers['Content-Type'] = 'application/json';
  }

  try {
    const response = await fetch(
      `${BASE_URL}${url}`,
      {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      },
    );
    const httpResponse = await handleResponse<T>(response);

    if (httpResponse.status === 401 && !isRetry) {
      const refreshResult = await refreshToken();
      if (refreshResult.data?.accessToken) {
        return makeRequest<T>(
          url,
          method,
          body,
          true,
        );
      }
    }
    return httpResponse;
  } catch (error: any) {
    return {
      data: null,
      error: error.message || 'Request failed',
      status: null,
    };
  }
}

async function get<T>(
  url: string,
): Promise<HttpResponse<T>> {
  return makeRequest<T>(
    url,
    'GET',
  );
}

async function post<T>(
  url: string,
  body: any,
): Promise<HttpResponse<T>> {
  return makeRequest<T>(
    url,
    'POST',
    body,
  );
}

async function put<T>(
  url: string,
  body: any,
): Promise<HttpResponse<T>> {
  return makeRequest<T>(
    url,
    'PUT',
    body,
  );
}

async function del<T>(
  url: string,
): Promise<HttpResponse<T>> {
  return makeRequest<T>(
    url,
    'DELETE',
  );
}

async function postWithFile<T>(
  url: string,
  formData: FormData,
): Promise<HttpResponse<T>> {
  const token = getAuthToken();
  const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};
  try {
    const response = await fetch(
      `${BASE_URL}${url}`,
      {
        method: 'POST',
        headers,
        body: formData,
      },
    );
    return handleResponse<T>(response);
  } catch (error: any) {
    return {
      data: null,
      error: error.message || 'Error uploading file',
      status: null,
    };
  }
}

export const apiService = {
  get,
  post,
  put,
  del,
  postWithFile,
  refreshToken,
};