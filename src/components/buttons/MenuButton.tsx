import { ChevronDown } from '@/assets/icons/Chevron';
import { Button } from '@/components/buttons/Button';

interface MenuButtonProps {
  title: string;
  onClick?: () => void;
}

export function MenuButton({ title, onClick }: MenuButtonProps) {
  return (
    <Button 
      variant={'link'} 
      color={'black'}
      className={'flex items-center font-semibold px-0'}
      onClick={onClick}>
      {title}
      <ChevronDown className={'size-3.5 ml-1 mt-0.5'} />
    </Button>
  );
}