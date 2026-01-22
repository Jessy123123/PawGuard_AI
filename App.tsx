import React from 'react';
import { ErrorBoundary } from './components';
import { Providers } from './app/providers';
import { AppNavigation } from './app/navigation';

export default function App() {
  return (
    <ErrorBoundary>
      <Providers>
        <AppNavigation />
      </Providers>
    </ErrorBoundary>
  );
}
