import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function useQuery() {
  const location = useLocation();
  const [params, setParams] = useState(new URLSearchParams(location.search));
  useEffect(() => {
    setParams(new URLSearchParams(location.search));
  }, [location]);
  return params;
}
