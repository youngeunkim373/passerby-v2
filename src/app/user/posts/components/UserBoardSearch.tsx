import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { Category, Post } from '@/app/_data/posts.interface';
import { BoardFilterDTO } from '@/app/board/board.interface';
import { SearchButton } from '@/components/buttons/SearchButton';
import { Form } from '@/components/form/Form';
import { FormItemProps } from '@/components/form/FormItem';
import { Input } from '@/components/form/input/Input';
import { FormSelect } from '@/components/form/select/FormSelect';
import { CategoryLabelRecord } from '@/constants/label';
import { PaginationSet } from '@/hooks/usePagination';

interface Props {
  userEmail: Post['userEmail'] | null; 
  defaultFilter?: BoardFilterDTO;
  onPagination: PaginationSet<BoardFilterDTO>['onPagination'];
}

export function UserBoardSearch({ userEmail, defaultFilter, onPagination }: Props) {
  const searchParams = useSearchParams();
  const { control, getValues, register, reset } = useForm<BoardFilterDTO>();

  const handleSearch = () => {
    const filter = getValues();
    onPagination({ filter, page: 1 });
  };

  // pathname이 같은데 query params가 없을 때 새로운 검색조건으로 data fetch
  useEffect(() => {
    if(!userEmail) return;

    const resetFields = async () => {
      const filter = { 
        titleOrContent: '',
        category: null,
        userEmail,
      };

      await onPagination({ filter });
      reset(filter);
    };

    if(searchParams?.size === 0) resetFields();
  }, [ searchParams ]);

  const formItems: FormItemProps[] = [
    {
      name: 'titleOrContent',
      children: (
        <Input
          defaultValue={defaultFilter?.titleOrContent ?? ''}
          placeholder={'제목/내용 검색'} 
          suffix={<SearchButton onClick={handleSearch} />}
          allowClear={false}
          {...register('titleOrContent')} />
      ),
    },
    {
      name: 'category',
      children: (
        <FormSelect
          control={control}
          defaultValue={defaultFilter?.category ?? undefined}
          width={'120px'}
          placeholder={'분류 선택'}
          allowClear={true}
          options={
            Object
              .entries(Category)
              .map(([ key, value ]) => ({ id: key, title: CategoryLabelRecord[value] }))
          }
          {...register('category', { onChange: handleSearch })} />
      ),
    },
  ];
  
  return (
    <Form items={formItems} className={style.form} />
  );
}

const style = {
  form: 'w-auto flex gap-2 ml-auto mb-2',
};