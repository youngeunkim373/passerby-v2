export function Footer () {

  return (
    <footer className={style.footer}>
      <div className={style.wrapper}>
        <span className={style.text}>
          ℗ Zeroequaltwo All Rights Reserved.
        </span>

        <ul className={style.links}>
          <li>
            <a 
              href={'https://www.notion.so/1f4b04b369ef4856a46c2c05d3f879bd'} 
              target={'_blank'}
              className={style.item}>
              About me
            </a>
          </li>
          <li>
            <a 
              href={'https://github.com/youngeunkim373/passerby-v2'} 
              target={'_blank'}
              className={style.item}>
              Github
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

const style = {
  footer: 'w-full bg-white border-t border-gray-200 z-10',
  wrapper: 'w-max py-4 md:py-6 flex-col md:flex-row md:flex md:items-center md:justify-between',
  item: 'hover:text-main-light',
  text: 'text-sm text-gray-500 sm:text-center dark:text-gray-400',
  links: 'flex flex-wrap items-center gap-4 mt-3 md:mt-0 text-sm font-medium text-gray-500 dark:text-gray-400',
};