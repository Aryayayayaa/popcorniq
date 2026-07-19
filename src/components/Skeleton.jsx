function Skeleton({ className = "" }) {
  return (
    <div
      className={`
        animate-pulse
        rounded-md
        bg-slate-300
        ${className}
      `}
    />
  );
}

export default Skeleton;
