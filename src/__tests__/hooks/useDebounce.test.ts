import { describe, it, expect, vi, beforeEach } from 'vitest';

import { renderHook, act } from '@testing-library/react';

import useDebounce from '../../hooks/useDebounce';

vi.useFakeTimers();

describe('useDebounce', () => {
  beforeEach(() => {
    vi.clearAllTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('hello', 500));

    expect(result.current).toBe('hello');
  });

  it('should not update debounced value before delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'first' },
    });

    expect(result.current).toBe('first');

    rerender({ value: 'second' });

    expect(result.current).toBe('first');

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('first'); 
  });

  it('should update debounced value after delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'initial' },
    });

    rerender({ value: 'updated' });

    act(() => {
      vi.advanceTimersByTime(500); 
    });

    expect(result.current).toBe('updated');
  });

  it('should cancel previous timeout on rapid changes', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'one' },
    });

    rerender({ value: 'two' });
    rerender({ value: 'three' });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Yalnız son dəyər qalmalıdır
    expect(result.current).toBe('three');
  });

  it('should cleanup timeout on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(window, 'clearTimeout');

    const { unmount } = renderHook(() => useDebounce('test', 500));

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
    clearTimeoutSpy.mockRestore();
  });

  it('should work with different types (number, object, boolean)', () => {
    const { result: numResult } = renderHook(() => useDebounce(42, 100));
    expect(numResult.current).toBe(42);

    const { result: objResult } = renderHook(() => useDebounce({ count: 5 }, 100));
    expect(objResult.current).toEqual({ count: 5 });

    const { result: boolResult } = renderHook(() => useDebounce(true, 100));
    expect(boolResult.current).toBe(true);
  });

  it('should use custom delay when provided', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'fast', delay: 100 },
    });

    rerender({ value: 'faster', delay: 100 });

    act(() => {
      vi.advanceTimersByTime(99);
    });
    expect(result.current).toBe('fast');

    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe('faster');
  });
});
