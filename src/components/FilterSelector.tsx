import { useMemo, type ChangeEvent, type RefObject } from "react";

type Props = {
  id: string;
  label: string;
  value: string;
  options: { id: number; value: string; text: string }[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  ref?: RefObject<HTMLSelectElement | null>;
};

const FilterSelector = ({ id, label, value, options, onChange, ref }: Props) => {
  const renderedOptions = useMemo(
    () =>
      options.map(({ value, text }, index) => {
        return (
          <option key={index} value={value}>
            {text}
          </option>
        );
      }),
    [options]
  );

  return (
    <div className="filter-criteria">
      <label htmlFor={id} className={`filter-label ${value ? "up" : null}`}>
        {label}
      </label>
      <select ref={ref} id={id} name={id} value={value} onChange={onChange} tabIndex={0}>
        <option value=""></option>
        {renderedOptions}
      </select>
    </div>
  );
};

export default FilterSelector;
