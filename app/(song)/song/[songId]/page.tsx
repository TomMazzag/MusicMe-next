import { Navbar } from '@MusicMe/components/Navbar/Navbar';
import { addSongView } from '@MusicMe/lib/song';
import { getSong } from '@MusicMe/lib/spotify';
import SongLikes from './components/SongLikes';
import { getSongMB, MUSIC_BRAINZ_SOURCE } from '@MusicMe/lib/musicBrainz';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SongReviews from './components/Review/SongReviews';
import ReviewInput from './components/Review/ReviewInput';
import Image from 'next/image';

type Props = {
  params: Promise<{
    songId: string;
  }>;
  searchParams?: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export default async function SongPage({ params, searchParams }: Props) {
  const { songId } = await params;
  const source = (await searchParams)?.source;
  await addSongView(songId);
  let songResponse;

  if (source && source === MUSIC_BRAINZ_SOURCE) {
    songResponse = await getSongMB(songId);
  } else {
    songResponse = await getSong(songId);
  }

  const song = songResponse.songData;

  const isSpotifyImage = song.imageUrl?.includes('i.scdn.co');

  return (
    <>
      <Navbar />
      <div className="flex items-center flex-col justify-between h-[90vh] w-full p-4 text-center md:p-0">
        <div className="flex gap-5 flex-row items-center w-full justify-evenly md:mt-8 mb-2 md:w-[50%]">
          <div>
            <img src={song.imageUrl} alt="" className="h-37.5 w-37.5" />
            {isSpotifyImage && (
              <div className="flex flex-col items-center gap-1 mt-2">
                <p className="text-sm opacity-60">Image provided by</p>
                <Image src="/SpotifyLogo.svg" alt="Spotify Logo" width={32} height={32} className="w-20 max-h-5" />
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center text-center gap-4 md:gap-4">
            <div>
              <h1 className="text lg:text-xl font-semibold md:text-4xl">{song.name}</h1>
              <h2 className="text lg:text-xl opacity-60 md:text-3xl">
                {song.artists.map((artist) => artist.name).join(', ')}
              </h2>
            </div>
            <div className="flex justify-center w-full gap-3">
              <SongLikes
                initialUserLiked={songResponse.userHasLiked}
                initialLikes={songResponse.likes}
                songId={song.id}
              />
              <div className="flex gap-2 items-center" title="Views today">
                <div className="min-w-4">
                  <FontAwesomeIcon icon={faEye} size="sm" />
                </div>
                <p className="lg:text-xl" aria-label="song views">
                  {songResponse.views}
                </p>
              </div>
            </div>
          </div>
        </div>
        <SongReviews songId={song.id} />
        <ReviewInput songId={song.id} />
      </div>
    </>
  );
}
