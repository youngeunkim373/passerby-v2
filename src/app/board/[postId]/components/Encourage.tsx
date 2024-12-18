import { EncouragementStatus } from '@/app/_data/encouragement_history.interface';
import { Heart } from '@/assets/icons/Heart';
import { Button } from '@/components/buttons/Button';

interface Props {
  encouragement: EncouragementStatus;
  encourage: () => Promise<void>;
}

export function Encourage({ encouragement, encourage }: Props) {
  return (
    <div className={style.wrapper}>
      <Button 
        color={'red'}
        size={'small'}
        onClick={encourage}>
        응원 
        <Heart 
          className={'text-red-light pl-1'} 
          fill={encouragement === EncouragementStatus.AGREE ? '#f43f5e' : 'none'} />
      </Button>
    </div>
  );
}

const style = {
  wrapper: 'w-full flex justify-end pt-12',
};