import SelectFilter from "./SelectFilter";

const LANGUAGE_OPTIONS = [
  { value: "", label: "All Languages" },
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "ja", label: "Japanese" },
  { value: "ko", label: "Korean" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
  { value: "de", label: "German" },
  { value: "it", label: "Italian" },
  { value: "zh", label: "Chinese" },
  { value: "ta", label: "Tamil" },
  { value: "te", label: "Telugu" },
  { value: "ml", label: "Malayalam" },
  { value: "kn", label: "Kannada" },
];

function LanguageFilter({ value, onChange, disabled }) {
  return (
    <SelectFilter
      value={value}
      onChange={onChange}
      disabled={disabled}
      options={LANGUAGE_OPTIONS}
    />
  );
}

export default LanguageFilter;
