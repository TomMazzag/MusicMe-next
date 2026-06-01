import { Promoter } from '@MusicMe/types/Promoter';
import GenrePageSection from './GenrePageSection';

interface PromoterProps {
  promoters: Promoter[];
}

export default function Promoters({ promoters }: PromoterProps) {
  return (
    <GenrePageSection id="promoters" sectionTitle="Genre Promoters / Brands">
      <div className="flex gap-10">
        {promoters.map((promoter) => (
          <a
            key={promoter.id}
            className="flex flex-col items-center gap-2 hover:underline"
            href={promoter.websiteUrl ?? '#'}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={promoter.imageUrl} alt={promoter.name} className="w-30 h-30 rounded-sm" />
            <h2 className="text-sm opacity-75">{promoter.name}</h2>
          </a>
        ))}
      </div>
    </GenrePageSection>
  );
}
