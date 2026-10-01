export default function QuantityControl({
  value,
  onChange,
  compact = false,
  min = 1,
}) {
  const change = (next) => onChange(Math.max(min, next));

  return (
    <div
      className={`flex items-center justify-center border border-elevated bg-[#171717] ${compact ? 'gap-3 rounded-full px-1 py-1' : 'h-[54px] w-[118px] gap-2 rounded-full'}`}
    >
      <button
        type="button"
        onClick={() => change(value - 1)}
        aria-label="Decrease quantity"
        className={`${compact ? 'size-6 bg-white text-page' : 'size-8 text-white'} grid place-items-center rounded-full text-xl`}
      >
        −
      </button>
      <span
        className={`${compact ? 'min-w-4 text-sm' : 'w-6 text-2xl'} text-center text-white`}
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => change(value + 1)}
        aria-label="Increase quantity"
        className={`${compact ? 'size-6 bg-white text-page' : 'size-8 text-white'} grid place-items-center rounded-full text-xl`}
      >
        +
      </button>
    </div>
  );
}
