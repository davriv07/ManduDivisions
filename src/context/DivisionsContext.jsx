import { createContext, useContext } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const DivisionsContext = createContext();
export const useDivisionsContext = () => useContext(DivisionsContext);
