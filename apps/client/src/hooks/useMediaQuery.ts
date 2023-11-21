const { useLayoutEffect, useState } = require('react');

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useLayoutEffect(() => {
    const matchQueryList = window.matchMedia(query);
    setMatches(matchQueryList.matches);
  }, []);

  useLayoutEffect(() => {
    const matchQueryList = window.matchMedia(query);
    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }
    matchQueryList.addEventListener('change', handleChange);
    return () => {
      matchQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);
  return matches;
}

export default useMediaQuery;
