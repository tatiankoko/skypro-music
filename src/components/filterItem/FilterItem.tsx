import styles from './filterItem.module.css';
import { getUniqueValuesByKey } from '@/utils/helper';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { data } from '@/data';
import classNames from 'classnames';
import { useCallback, useState } from 'react';

type filterItemProp = {
  title: string;
  name: keyof TrackType | 'year';
  expanded: boolean;
  onClick: (name: string) => void;
};

export default function FilterItem({
  title,
  name,
  expanded,
  onClick,
}: filterItemProp) {
  const yearFilter: string[] = [
    'По умолчанию',
    'Сначала новые',
    'Сначала старые',
  ];

  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const uniqueValuesByKey =
    name === 'year' ? yearFilter : getUniqueValuesByKey(data, name);

  const handleFilterItemClick = useCallback((item: string) => {
    setSelectedItems((prev) => {
      if (prev.includes(item)) {
        return prev.filter((i) => i !== item);
      }
      return [...prev, item];
    });
  }, []);

  return (
    <div className={styles.filter__button__wrapper}>
      <button
        className={
          expanded
            ? classNames(styles.filter__button, styles.filter__button_active)
            : styles.filter__button
        }
        onClick={() => onClick(title)}
      >
        {title}
      </button>
      {expanded ? (
        <div className={styles.filter__wrapper}>
          <ul className={styles.filter__list}>
            {uniqueValuesByKey.map((item) => {
              const isSelected = selectedItems.includes(item);

              return (
                <li
                  className={classNames(styles.filter__item, {
                    [styles.filter__item_selected]: isSelected,
                  })}
                  key={item}
                  onClick={() => handleFilterItemClick(item)}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
