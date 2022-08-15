export interface LoginResults {
  id: number;
  avatar_url: string;
  login: string;
  type: string;
}

export interface FetchResponse {
  items: LoginResults[];
}
