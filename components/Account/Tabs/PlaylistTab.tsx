import { shortenString } from '@MusicMe/lib/util';

export const PlaylistsTab = ({ playlists, hidden }: { playlists: SpotifyApi.PlaylistObjectFull[] | undefined; hidden: boolean }) => {
  return playlists && playlists.length > 0 ? (
    <div className={`grid mb-20 grid-cols-1 md:grid-cols-3 gap-y-5 gap-x-12.5 text-center ${hidden ? 'hidden' : ''}`}>
      {playlists.map((playlist, index: number) => (
        <div key={index} className="playlist-tile text-center">
          <a href={playlist.external_urls.spotify} target="_blank">
            <img
              src={playlist.images?.[0].url || undefined}
              alt="Playlist artwork"
              className="border-none rounded-xl hover:scale-105 transition-transform w-68.75"
            />
          </a>
          <h4 className="mt-5">{shortenString(playlist.name, 35)}</h4>
        </div>
      ))}
    </div>
  ) : (
    <div className={`${hidden ? 'hidden' : ''}`}>No playlist for this user</div>
  );
};
