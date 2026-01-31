import React from 'react';

export const Link = ({ children, to, className, ...props }: any) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

export const BrowserRouter = ({ children }: any) => <>{children}</>;
export const MemoryRouter = ({ children }: any) => <>{children}</>;
export const Routes = ({ children }: any) => <>{children}</>;
export const Route = ({ element }: any) => element;
export const useNavigate = () => jest.fn();
export const useLocation = () => ({ pathname: '/', search: '', hash: '', state: null });
export const useParams = () => ({});
export const useSearchParams = () => [new URLSearchParams(), jest.fn()];
