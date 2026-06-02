import { Promoter } from '@MusicMe/types/Promoter';
import GenrePageSection from './GenrePageSection';

interface PromoterProps {
  promoters: Promoter[];
}

export default function Promoters({ promoters }: PromoterProps) {
  return (
    <GenrePageSection id="promoters" sectionTitle="Genre Promoters / Brands">
      <div className="flex gap-6 lg:gap-10 overflow-x-scroll w-full">
        {promoters.map((promoter) => (
          <a
            key={promoter.id}
            className="flex flex-col items-center gap-2 hover:underline shrink-0"
            href={promoter.websiteUrl ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={promoter.imageUrl} alt={promoter.name} className="w-20 h-20 lg:w-30 lg:h-30 rounded-sm" />
            <h2 className="text-sm opacity-75 max-w-25 text-center">{promoter.name}</h2>
          </a>
        ))}
      </div>
    </GenrePageSection>
  );
}
