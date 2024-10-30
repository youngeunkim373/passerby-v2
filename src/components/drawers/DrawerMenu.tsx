'use client';
import { Drawer } from '@/components/layout/Drawer';

import { MenuButton } from '@/components/buttons/MenuButton';
import { items } from '@/constants/menu';
import { DrawerIds, useDrawerContext } from '@/contexts/DrawerContext';

interface Props {
  id: DrawerIds;
}

export function DrawerMenu({ id }: Props) {
  const { drawerOpenStatus } = useDrawerContext();

  return (
    <Drawer 
      id={id} 
      isVisible={drawerOpenStatus.menu} 
      direction={'top'} 
      className={'h-300px bg-main'}>
      <div className={'flex flex-col gap-8 absolute top-[72px]'}>
        {/* TODO 메뉴 정하고 디자인 다시 하기 */}
        {items.map((item) => (
          <MenuButton key={item.title} title={item.title} />
        ))}
      </div>
    </Drawer>
  );
}