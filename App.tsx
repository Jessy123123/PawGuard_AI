import React from 'react';
import { Providers } from './app/providers';
import { AppNavigation } from './app/navigation';

export default function App() {
  return (
    <Providers>
      <AppNavigation />
    </Providers>
  );
}
