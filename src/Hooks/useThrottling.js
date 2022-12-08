import { useCallback, useRef } from 'react';

export const useThrottle = (callback, delay) => {
	const isThrottled = useRef(false);
	const throttledCallback = useCallback(
		(...arg) => {
			if (isThrottled.current) return;
			callback(arg);
			isThrottled.current = true;
			setTimeout(() => (isThrottled.current = false), delay);
		},
		[callback, delay]
	);
	return throttledCallback;
};
