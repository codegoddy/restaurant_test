import type { Table } from '../types';

interface TableCardProps {
  table: Table;
  onClick: (table: Table) => void;
  isSelected: boolean;
}

export function TableCard({ table, onClick, isSelected }: TableCardProps) {
  const getStatusColor = () => {
    switch (table.status) {
      case 'available':
        return 'status-available';
      case 'occupied':
        return 'status-occupied';
      case 'reserved':
        return 'status-reserved';
      case 'cleaning':
        return 'status-cleaning';
      default:
        return '';
    }
  };

  return (
    <div
      className={`table-card ${getStatusColor()} ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(table)}
    >
      <div className="table-number">Table {table.number}</div>
      <div className="table-capacity">{table.capacity} seats</div>
      <div className={`table-status ${getStatusColor()}`}>
        {table.status}
      </div>
    </div>
  );
}
