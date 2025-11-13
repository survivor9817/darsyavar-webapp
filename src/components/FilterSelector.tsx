import { useMemo } from "react";

const FilterSelector = ({ id, label, value, options, onChange }) => {
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
      <select id={id} name={id} value={value} onChange={onChange}>
        <option value=""></option>
        {renderedOptions}
      </select>
    </div>
  );
};

export default FilterSelector;
