import { useMemo } from "react";
import SelectFilter from "./SelectFilter";

function ReleaseYearFilter({ value, onChange, disabled }) {
  const options = useMemo(() => {
    const currentYear = new Date().getFullYear();

    return [
      {
        value: "",
        label: "All Years",
      },
      ...Array.from({ length: 30 }, (_, index) => ({
        value: currentYear - index,
        label: currentYear - index,
      })),
    ];
  }, []);

  return (
    <SelectFilter
      value={value}
      onChange={onChange}
      disabled={disabled}
      options={options}
    />
  );
}

export default ReleaseYearFilter;
