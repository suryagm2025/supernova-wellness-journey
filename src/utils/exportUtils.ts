
/**
 * Converts an array of objects to a CSV string
 * @param data Array of objects to convert
 * @param columns Optional column configuration with headers and formatters
 * @returns CSV string
 */
export function objectsToCSV<T extends Record<string, any>>(
  data: T[],
  columns?: {
    key: keyof T;
    header: string;
    formatter?: (value: any) => string;
  }[]
): string {
  if (!data.length) return '';
  
  // If no columns specified, use all object keys
  const keys = columns ? columns.map(col => col.key) : Object.keys(data[0]);
  const headers = columns ? columns.map(col => col.header) : keys;
  
  // Create CSV header row
  let csv = headers.join(',') + '\n';
  
  // Add data rows
  data.forEach(item => {
    const row = keys.map(key => {
      const value = item[key as string];
      
      // Apply formatter if provided
      if (columns) {
        const column = columns.find(col => col.key === key);
        if (column?.formatter) {
          return formatCSVValue(column.formatter(value));
        }
      }
      
      return formatCSVValue(value);
    });
    
    csv += row.join(',') + '\n';
  });
  
  return csv;
}

/**
 * Format a value for CSV inclusion (handles quotes, commas, etc.)
 */
function formatCSVValue(value: any): string {
  if (value === null || value === undefined) return '';
  
  const stringValue = String(value);
  
  // Escape quotes and wrap in quotes if contains commas, quotes or newlines
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return '"' + stringValue.replace(/"/g, '""') + '"';
  }
  
  return stringValue;
}

/**
 * Triggers a download of a CSV file in the browser
 */
export function downloadCSV(csvContent: string, filename: string): void {
  // Create a blob with the CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  
  // Create a download link and trigger download
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  
  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
