import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { BoardFilterDTO } from '@/app/board/board.interface';
import { SearchButton } from '@/components/buttons/SearchButton';
import { Form } from '@/components/form/Form';
import { FormItemProps } from '@/components/form/FormItem';
import { FormSelect } from '@/components/form/FormSelect';
import { Input } from '@/components/form/Input';
import { Category, CategoryLabelRecord } from '@/constants/post';
import { PaginationSet } from '@/hooks/usePagination';

interface Props {
  defaultFilter?: BoardFilterDTO;
  onPagination: PaginationSet<BoardFilterDTO>['onPagination'];
}

export function BoardSearch({ defaultFilter, onPagination }: Props) {
  const searchParams = useSearchParams();
  const { control, getValues, register, reset } = useForm<BoardFilterDTO>();

  const handleSearch = () => {
    const filter = getValues();
    onPagination({ filter, page: 1 });
  };

  // pathname이 같은데 query params가 없을 때
  // 새로운 검색조건으로 data fetch
  useEffect(() => {
    const resetFields = async () => {
      const filter = { titleOrContent: '', category: null };
      await onPagination({ filter });
      reset(filter);
    };

    if(searchParams.size === 0) resetFields();
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
          defaultValue={defaultFilter?.category}
          width={120}
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