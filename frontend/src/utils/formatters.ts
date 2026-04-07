export function formatProbability(value: number) {
  return `${Math.round(value * 100)}%`;
}

export function formatConfidence(value: number) {
  return `${(value * 100).toFixed(0)}% confidence`;
}

export function formatOdds(value: number) {
  return value.toFixed(2);
}

export function formatMatchTime(value: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}
