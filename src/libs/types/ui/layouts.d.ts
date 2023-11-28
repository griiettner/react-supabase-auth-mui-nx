export type LayoutAuthFetchApi = 'login' | 'register' | 'session' | 'logout';

export interface LayoutAuthProps {
  children: React.ReactNode;
  title?: string;
  buttonText?: string;
  fetchApi?: LayoutAuthFetchApi;
  linkLeftLabel?: string;
  linkLeftPath?: string;
  linkRightLabel?: string;
  linkRightPath?: string;
}
