import { ChevronDown } from '@/assets/icons/Chevron';
import { Button } from '@/components/buttons/Button';

interface MenuButtonProps {
  title: string;
}

export function MenuButton({ title }: MenuButtonProps) {
  return (
    <Button 
      variant={'link'} 
      color={'black'}
      className={'flex items-center font-semibold px-0'}>
      {title}
      <ChevronDown className={'size-3.5 ml-1 mt-0.5'} />
    </Button>
  );
}