interface ChartTitleProp {
  data: {
    imageUrl: string;
    value1: string;
    value2?: string;
    trackId: string;
  };
}

export const SongSearchTile = ({ data }: ChartTitleProp) => {
  return (
    <a href={`/song/${data.trackId}`} className="flex items-center gap-4 cursor-pointer flex-1">
      <img src={data.imageUrl} alt="" className="h-14 rounded" />
      <div className="text-start">
        <p>{data.value1}</p>
        <p className="opacity-60">{data.value2 || ''}</p>
      </div>
    </a>
  );
};
