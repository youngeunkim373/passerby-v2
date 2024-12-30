'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Search } from '@/assets/icons/Search';
import { Button } from '@/components/buttons/Button';
import { Form } from '@/components/form/Form';
import { Input } from '@/components/form/input/Input';

export function SearchSection() {
  const router = useRouter();
  const { getValues, register } = useForm();

  const handleSearch = () => {
    const titleOrContent = getValues('titleOrContent');
    router.push(`/board/latest?titleOrContent="${titleOrContent}"`);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.textArea.wrapper}>
        <p className={'text-main'}>
          나와 같은 고민을 하는<br className={'block xs:hidden'} />
          사람이 있을까?
        </p>
        <p>키워드로 검색해보세요!</p>
        <div className={'w-full max-w-[640px] mx-auto mt-8'}>
          <Form
            items={[ {
              name: 'titleOrContent',
              children: (
                <Input 
                  allowClear={false}
                  placeholder={'ex. 직장 내 인간관계'}
                  size={'extraLarge'}
                  suffix={(
                    <Button 
                      type={'button'}
                      className={'!px-4 !pointer-events-auto'} 
                      variant={'solid'}
                      onClick={handleSearch}>
                      <span className={'hidden md:block'}>검색하기</span>
                      <span className={'block md:hidden'}><Search strokeWidth={2} /></span>
                    </Button>
                  )}
                  {...register('titleOrContent')} />
              ),
            } ]} />
        </div>
      </div>

      <Image 
        alt={'people-shareing-concerns'}
        src={'/images/share-people.svg'}
        className={style.image}
        width={400}
        height={400} />
    </div>
  );
}

const style = {
  wrapper: `
    w-full 
    flex flex-col-reverse lg:flex-row justify-between items-center gap-12
    font-semibold text-2xl sm:text-3xl
    py-20
  `,
  textArea: {
    wrapper: 'flex flex-col gap-2 md:gap-4 whitespace-nowrap',
  },
  image: 'w-full max-w-[300px] md:max-w-[360px] lg:max-w-[400px] rounded-full',
};