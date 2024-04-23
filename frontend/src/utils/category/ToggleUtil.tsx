import { useState } from 'react';

const useToggle = (
  initialValue: boolean
): [boolean, () => void, () => void] => {
  const [isOpen, seIsOpen] = useState<boolean>(initialValue);

  const toggleOn = () => seIsOpen(true);
  const toggleOff = () => seIsOpen(false);

  return [isOpen, toggleOn, toggleOff];
};

export default useToggle;
