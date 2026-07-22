const LANGUAGE_OPTIONS = [
  { code: "", label: "All Languages" },
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "fr", label: "French" },
  { code: "es", label: "Spanish" },
  { code: "de", label: "German" },
  { code: "it", label: "Italian" },
  { code: "zh", label: "Chinese" },
  { code: "ta", label: "Tamil" },
  { code: "te", label: "Telugu" },
  { code: "ml", label: "Malayalam" },
  { code: "kn", label: "Kannada" },
];

function LanguageFilter({ value, onChange, disabled = false }) {
  return (
    <div className="w-full">
      <select
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="
          w-full
          rounded-lg
          border
          border-slate-300
          bg-white
          px-4
          py-3
          focus:border-blue-500
          focus:outline-none
          dark:border-slate-700
          dark:bg-slate-800
          dark:text-white
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {LANGUAGE_OPTIONS.map((language) => (
          <option key={language.code} value={language.code}>
            {language.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default LanguageFilter;
