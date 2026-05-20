export const TrackResult = ({ result }: { result: SpotifyApi.TrackObjectFull[] }) => {
  console.log(result)
  return (
    <>
      {result.map((result, index: number) => (
        <div className="flex items-center justify-center w-[90%] pr-1 md:pr-0" key={index}>
          <a href={`/song/${result.id}`} className="flex gap-5 items-center grow">
            <img
            className="h-30"
              src={
                result.album && result.album.images && result.album.images.length > 0 ? result.album.images[0].url : ''
              }
              alt=""
            />
            <div className="grow">
              <h3>{result.name}</h3>
              <p className="opacity-55">{result.artists[0].name}</p>
            </div>
            <div className="px-5 text-center hidden md:block">
              <i className="fa-solid fa-share"></i>
              <p>Repost</p>
            </div>
          </a>
          <a href={result.external_urls.spotify} target="_blank">
            <i className="fa-brands fa-spotify fa-2xl px-2"></i>
          </a>
        </div>
      ))}
    </>
  );
};
