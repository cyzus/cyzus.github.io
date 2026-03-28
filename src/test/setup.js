import '@testing-library/jest-dom/vitest';

class MockIntersectionObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
}

if (!globalThis.IntersectionObserver) {
	globalThis.IntersectionObserver = MockIntersectionObserver;
}
