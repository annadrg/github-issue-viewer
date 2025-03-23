type Props = {
  name: string;
  color: string;
};

export function IssueLabel({ name, color }: Props) {
  return (
    <span
      title={name}
      className="inline-block max-w-[150px] overflow-hidden rounded-full px-2 py-0.5 text-xs font-medium text-ellipsis whitespace-nowrap sm:max-w-full"
      style={{
        backgroundColor: `#${color}`,
        color: getContrastColor(color),
      }}
    >
      {name}
    </span>
  );
}

// Calculate contrasting text color (black or white) based on background color
export function getContrastColor(hexColor: string): string {
  // Convert hex to RGB
  const r = Number.parseInt(hexColor.slice(0, 2), 16);
  const g = Number.parseInt(hexColor.slice(2, 4), 16);
  const b = Number.parseInt(hexColor.slice(4, 6), 16);

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // Return black for bright colors, white for dark colors
  return luminance > 0.5 ? "#000000" : "#ffffff";
}
