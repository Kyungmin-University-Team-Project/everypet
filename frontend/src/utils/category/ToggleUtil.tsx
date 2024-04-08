// ToggleUtil.tsx
import { useState } from 'react';

const useToggle = (initialValue: boolean): [boolean, () => void] => {
  const [value, setValue] = useState<boolean>(initialValue);
  const toggle = () => setValue((prevValue) => !prevValue);
  return [value, toggle];
};

export default useToggle;
