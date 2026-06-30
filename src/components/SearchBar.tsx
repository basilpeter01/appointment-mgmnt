import { FiSearch } from "react-icons/fi";

export function SearchBar({
  value, onChange, placeholder = "Search...",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div className="med-input-wrap search-bar">
      <FiSearch />
      <input className="med-input" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}