import type { Table } from '../types';
import { TableCard } from './TableCard';

interface TableGridProps {
  tables: Table[];
  selectedTable: Table | null;
  onSelectTable: (table: Table) => void;
}

export function TableGrid({ tables, selectedTable, onSelectTable }: TableGridProps) {
  return (
    <>
      <div className="table-grid">
        {tables.map((table) => (
          <TableCard
            key={table.id}
            table={table}
            onClick={onSelectTable}
            isSelected={selectedTable?.id === table.id}
          />
        ))}
      </div>
      <div className="table-legend">
        <div className="legend-item">
          <span className="legend-dot status-available"></span>
          Available
        </div>
        <div className="legend-item">
          <span className="legend-dot status-occupied"></span>
          Occupied
        </div>
        <div className="legend-item">
          <span className="legend-dot status-reserved"></span>
          Reserved
        </div>
        <div className="legend-item">
          <span className="legend-dot status-cleaning"></span>
          Cleaning
        </div>
      </div>
    </>
  );
}
