import { Search } from '@/assets/icons/Search';
import { Button, Props as ButtonProps } from '@/components/buttons/Button';

type Props = Pick<ButtonProps, 'onClick' | 'className'>;

export function SearchButton (props: Props) {
  return (
    <Button 
      type={'button'}
      variant={'link'}
      className={'!pointer-events-auto'}
      {...props}>
      <Search />
    </Button>
  );
}