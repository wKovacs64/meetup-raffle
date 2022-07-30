import * as React from 'react';

const DevToolsContext = React.createContext<DevToolsProviderValue | null>(null);

export function DevToolsProvider({ children }: { children: React.ReactNode }) {
  const [currentSettings, setCurrentSettings] = React.useState<
    DevToolsSettings | undefined
  >({ mock: process.env.NODE_ENV === 'development' });

  const value = React.useMemo<DevToolsProviderValue>(
    () => [currentSettings, setCurrentSettings],
    [currentSettings],
  );

  return (
    <DevToolsContext.Provider value={value}>
      {children}
    </DevToolsContext.Provider>
  );
}

// ⬇ This should work, but Remix won't compile for some reason. 🤔
// type DevToolsProviderValue = ReturnType<typeof React.useState<DevToolsSettings | undefined>>;

type DevToolsProviderValue = [
  DevToolsSettings | undefined,
  React.Dispatch<React.SetStateAction<DevToolsSettings | undefined>>,
];

interface DevToolsSettings {
  mock: boolean;
}

export function useDevTools() {
  const contextValue = React.useContext(DevToolsContext);
  if (!contextValue) {
    throw new Error('useDevTools must be used within a DevToolsProvider');
  }
  return contextValue;
}
