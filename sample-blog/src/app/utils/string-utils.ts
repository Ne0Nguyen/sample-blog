export function capitalizeFirstWord(text: string | undefined): string {
  if (!text) return ''; // Handle empty string case

  return text.charAt(0).toUpperCase() + text.slice(1);
}
