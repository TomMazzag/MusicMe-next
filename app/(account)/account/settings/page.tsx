import { Navbar } from '@MusicMe/components/Navbar/Navbar';
import { Metadata } from 'next';
import { ClientSideContainer } from './components/ClientSideContainer';

export const metadata: Metadata = {
  title: 'Settings',
  description: 'Settings for your account',
};

export default function Settings() {
  return (
    <>
      <Navbar />
      <div className="drawer md:drawer-open overflow-hidden">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <ClientSideContainer />
        
      </div>
    </>
  );
}
