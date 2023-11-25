export default function formatDateTime(date: Date | string): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  };

  return new Intl.DateTimeFormat('en-US', options).format(
    typeof date === 'string' ? new Date(date) : date
  );
}
