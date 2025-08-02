// Performance monitoring utilities
const measures = new Map();

export function startMeasure(name) {
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(`${name}-start`);
  }
  measures.set(name, Date.now());
}

export function endMeasure(name) {
  if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark(`${name}-end`);
    performance.measure(name, `${name}-start`, `${name}-end`);
  }
  
  const startTime = measures.get(name);
  if (startTime) {
    const duration = Date.now() - startTime;
    console.log(`⏱️ ${name}: ${duration}ms`);
    measures.delete(name);
  }
}

export function logMeasure(name, value) {
  console.log(`📊 ${name}: ${value}`);
}