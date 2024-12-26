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
      className={'w-fit flex items-center font-semibold'}
      onClick={onClick}>
      {title}
      <ChevronDown className={'!size-4 ml-1.5'} />
    </Button>
  );
}