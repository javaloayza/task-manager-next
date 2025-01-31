import { renderHook, act } from '@testing-library/react';
import { useAuthStore } from './auth.store';

describe('AuthStore', () => {
  beforeEach(() => {
    useAuthStore.setState({ user: null, token: null });
  });

  /* This test case is testing the functionality of setting authentication data in the `useAuthStore`
 hook. */
  it('should set auth data', () => {
    const { result } = renderHook(() => useAuthStore());
    const mockUser = { id: '1', name: 'Test User', email: 'testuser@example.com' };
    const mockToken = 'test-token';

    act(() => {
      result.current.setAuth(mockUser, mockToken);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.token).toBe(mockToken);
  });

  /* The test case `it('should clear auth data', () => { ... }` is testing the functionality of clearing
 authentication data in the `useAuthStore` hook. */
  it('should clear auth data', () => {
    const { result } = renderHook(() => useAuthStore());
    
    act(() => {
      result.current.setAuth({ id: '1', name: 'Test User', email: 'testuser@example.com' }, 'test-token');
      result.current.clearAuth();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.token).toBeNull();
  });
});