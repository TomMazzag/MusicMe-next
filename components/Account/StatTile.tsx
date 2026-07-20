interface StatsTileProps {
  heading: string;
  statValue: string;
}
export const StatsTile = ({ heading, statValue }: StatsTileProps) => {
  return (
    <div className="flex items-center flex-col bg-base-300 rounded-2xl md:rounded-md p-4 px-2 gap-2">
      <h1 className="text-xl">{heading}</h1>
      <p className="flex-1 text-4xl font-semibold text-accent">{statValue}</p>
    </div>
  );
};
