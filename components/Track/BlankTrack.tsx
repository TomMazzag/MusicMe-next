import clsx from "clsx";

export default function BlankTrack({ className }: { className?: string }) {
  return (
    <div className={clsx('rounded-md bg-base-200 flex items-center justify-center shrink-0', className)}>
      <i className="fa-solid fa-music opacity-40" />
    </div>
  );
}
