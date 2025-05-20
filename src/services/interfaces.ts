export interface HttpResponse<T> {
  data: T | null;
  error: string | null;
  status: number | null;
}