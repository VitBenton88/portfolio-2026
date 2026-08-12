// jsdom doesn't implement IntersectionObserver. Any code (present or future)
// that constructs one needs at least a no-op stub to avoid a ReferenceError
// during tests.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}

// @ts-expect-error - partial stub, sufficient for tests that don't rely on
// real intersection behavior.
globalThis.IntersectionObserver = IntersectionObserverStub;
