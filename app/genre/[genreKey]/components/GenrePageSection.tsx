interface PromoterProps {
  id: string;
  sectionTitle: string;
  children?: React.ReactNode;
}

export default function GenrePageSection({ id, sectionTitle, children }: PromoterProps) {
  return (
    <section id={id}>
      <h1 className="text-2xl pb-4">{sectionTitle}</h1>
      {children}
    </section>
  );
}
