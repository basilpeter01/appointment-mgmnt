import { SLOT_TIMES, UNAVAILABLE_SLOTS } from "../data/appointments";

export function SlotPicker({
  selected, onSelect,
}: {
  selected: string | null;
  onSelect: (slot: string) => void;
}) {
  return (
    <div className="slot-grid">
      {SLOT_TIMES.map((slot) => {
        const taken = UNAVAILABLE_SLOTS.has(slot);
        return (
          <button
            key={slot}
            disabled={taken}
            onClick={() => onSelect(slot)}
            className={`slot-btn ${selected === slot ? "is-active" : ""}`}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}