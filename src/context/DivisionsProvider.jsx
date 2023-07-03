import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const DivisionsContext = React.createContext();
export const useDivisionsContext = () => React.useContext(DivisionsContext);

//* Custom hook
const useFetchDivisionData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = import.meta.env.VITE_API ?? 'http://127.0.0.1:8000/api';

  useEffect(() => {
    axios
      .get(`${API}/division`)
      .then((response) => {
        setData(response.data.result);
        setLoading(false);
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  //* Memoizing data to avoid unnecessary re-computing in every render
  //* It only changes when data or loading state changes
  const memoizedData = useMemo(() => ({ data, loading }), [data, loading]);
  return memoizedData;
};

export function DataProvider({ children }) {
  const memoizedData = useFetchDivisionData();
  return (
    <DivisionsContext.Provider value={memoizedData}>
      {children}
    </DivisionsContext.Provider>
  );
}

DataProvider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
};
