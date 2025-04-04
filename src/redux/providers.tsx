'use client';

import { Provider } from 'react-redux';
import { store } from '../store/index'; // Use the correct store from src/store/index.ts

export function Providers({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
}
