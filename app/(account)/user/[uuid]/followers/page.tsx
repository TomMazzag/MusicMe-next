import Connection from '@MusicMe/components/Connection/Connection';
import { Navbar } from '@MusicMe/components/Navbar/Navbar';

type Props = {
  params: Promise<{
    uuid: string;
  }>;
};

export default async function Followers({ params }: Props) {
  const { uuid } = await params;

  return (
    <>
      <Navbar />
      <Connection connectionType="followers" userId={uuid} />
    </>
  );
}
