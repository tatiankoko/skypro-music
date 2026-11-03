import styles from './filterItem.module.css';
import { getUniqueValuesByKey } from '@/utils/helper';
import { TrackType } from '@/sharedTypes/sharedTypes';
import classNames from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { yearFilter } from '@/utils/sortTracks';

type filterItemProp = {
  title: string;
  name: keyof TrackType | 'year';
  expanded: boolean;
  onClick: (name: string) => void;
  tracks: TrackType[];
  onSelect: (value: string) => void;
};

export default function FilterItem({
  title,
  name,
  expanded,
  onClick,
  tracks,
  onSelect,
}: filterItemProp) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const isSortFilter = name === 'year';

  const uniqueValuesByKey = useMemo(
    () => (isSortFilter ? yearFilter : getUniqueValuesByKey(tracks, name)),
    [name, tracks],
  );

  const handleFilterItemClick = useCallback(
    (item: string) => {
      onSelect(item);

      setSelectedItems((prev) => {
        if (prev.includes(item)) {
          return isSortFilter ? [item] : prev.filter((i) => i !== item);
        }
        return isSortFilter ? [item] : [...prev, item];
      });
    },
    [onSelect, isSortFilter],
  );

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
      {selectedItems.length > 0 && !selectedItems.includes(yearFilter[0]) ? (
        <div className={styles.filter__button_count}>
          {selectedItems.length}
        </div>
      ) : null}
      {expanded && uniqueValuesByKey.length > 0 ? (
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
