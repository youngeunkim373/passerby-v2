import { useForm } from 'react-hook-form';

import { BoardFilterDTO } from '@/app/board/board.interface';
import { SearchButton } from '@/components/buttons/SearchButton';
import { Form } from '@/components/form/Form';
import { FormItemProps } from '@/components/form/FormItem';
import { Input } from '@/components/form/Input';
import { PaginationSet } from '@/hooks/usePagination';

interface Props {
  onPagination: PaginationSet<BoardFilterDTO>['onPagination'];
}

export function LatestBoardSearch({ onPagination }: Props) {
  const { register, getValues } = useForm<BoardFilterDTO>();

  const handleSearch = () => {
    const titleOrContent = getValues('titleOrContent');
    onPagination({ filter: { titleOrContent } });
  };

  const formItems: FormItemProps[] = [
    {
      name: 'titleOrContent',
      children: (
        <Input
          placeholder={'제목/내용 검색'} 
          suffix={<SearchButton onClick={handleSearch} />}
          allowClear={false}
          {...register('titleOrContent')} />
      ),
    },
  ];
  
  return (
    <Form items={formItems} className={style.form} />
  );
}

const style = {
  form: 'max-w-[288px] ml-auto mb-2'
};