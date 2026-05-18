import { Navbar } from '@MusicMe/components/Navbar/Navbar';
import { addSongView } from '@MusicMe/lib/song';
import { getSong } from '@MusicMe/lib/spotify';
import SongLikes from './components/SongLikes';

type Props = {
  params: Promise<{
    songId: string;
  }>;
};

export default async function SongPage({ params }: Props) {
  const { songId } = await params;
  await addSongView(songId);
  
  const songData = await getSong(songId);
  const song = songData.spotifyData

  return (
    <>
      <Navbar />
      <div className="flex items-center flex-col justify-between h-[90vh] w-full p-4 text-center md:p-0">
        <div className="flex gap-5 flex-row items-center w-full justify-evenly md:mt-8 mb-2 md:w-[50%]">
          <img src={song.album.images[0].url} alt="" className="h-37.5 w-37.5" />
          <div className="flex flex-col justify-center text-center gap-2 md:gap-4">
            <h1 className="text text-xl font-semibold md:text-4xl">{song.name}</h1>
            <h2 className="text text-xl opacity-60 md:text-3xl">
              {song.artists.map((artist: any) => artist.name).join(', ')}
            </h2>
            <div className="flex justify-center w-full gap-3">
              <SongLikes initialUserLiked={songData.userHasLiked} initialLikes={songData.likes} songId={song.id} />
              <div className="flex gap-2 items-center ml-6" title="Views today">
                <i className="fa-solid fa-eye" aria-label="Eye icon"></i>
                <p className="text text-xl" aria-label="song views">
                  {songData.views}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
