'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { ClerkAppearanceTheme } from '@clerk/nextjs/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const clerkAppearance: ClerkAppearanceTheme = {
  variables: {
    colorPrimary: '#00cdb7',
    colorBackground: '#121212',
    borderRadius: '8px',
    colorForeground: 'white',
    colorNeutral: 'white',
  },
  elements: {
    formButtonPrimary: 'bg-green-600 hover:bg-green-700 text-white',
    card: 'shadow-xl',
    headerTitle: 'text-2xl font-bold',
  },
  theme: 'clerk',
};

export const Providers = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ClerkProvider appearance={clerkAppearance}>{children}</ClerkProvider>
    </QueryClientProvider>
  );
};
