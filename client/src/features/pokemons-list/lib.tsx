interface Column {
  id: 'name';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export const columns: Column[] = [{ id: 'name', label: 'Name' }];
