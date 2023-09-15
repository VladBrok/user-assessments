export function downloadCsv<T extends Record<string, any>>(
  headers: { fieldName: keyof T; displayName: string }[],
  rows: T[],
  fileName: string
) {
  const csvArray = rows.map((row) =>
    headers.map((header) => JSON.stringify(row[header.fieldName])).join(',')
  );
  const header = headers.map((x) => x.displayName).join(',');
  csvArray.unshift(header);
  const csv = csvArray.join('\r\n');

  const a = document.createElement('a');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}
