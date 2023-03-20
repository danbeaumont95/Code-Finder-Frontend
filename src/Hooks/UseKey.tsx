import { useEffect, useRef } from 'react';

function useKey(key: any, cb: any) {
  const callback = useRef(cb);

  useEffect(() => {
    callback.current = cb;
  });

  useEffect(() => {
    function handle(event: any) {
      if (event.code === key) {
        callback.current(event);
      } else if (key === 'ctrls' && event.key === 's' && event.ctrlKey) {
        callback.current(event);
      }
    }

    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [key]);
}

export default useKey;
