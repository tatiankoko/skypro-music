import {
  formatTime,
  getTimePanel,
  getUniqueValuesByKey,
  isFiltersApplied,
} from '@/utils/helper';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { data } from '@/data';
import { yearFilter } from '@/utils/sortTracks';

describe('formatTime', () => {
  it('Добавление нуля если секунд < 10', () => {
    expect(formatTime(61)).toBe('1:01');
  });

  it('Форматирует время < 1 минуты', () => {
    expect(formatTime(35)).toBe('0:35');
  });

  it('Обработка 0 секунд', () => {
    expect(formatTime(0)).toBe('0:00');
  });
});

describe('getTimePanel', () => {
  it('Корректное отображение currentTime / totalTime', () => {
    expect(getTimePanel(55, 160)).toBe('0:55 / 2:40');
  });
  it('Корректное отображение currentTime / undefined', () => {
    expect(getTimePanel(0, undefined)).toBeUndefined();
  });
});

describe('getUniqueValuesByKey', () => {
  const mockTracks: TrackType[] = data;

  it('Корректный список уникальных авторов', () => {
    expect(getUniqueValuesByKey(mockTracks, 'author').length).toBe(7);
  });
  it('Корректный список уникальных жанров', () => {
    expect(getUniqueValuesByKey(mockTracks, 'genre').length).toBe(1);
  });
});

describe('isFiltersApplied', () => {
  it('Корректная проверка применения фильтров', () => {
    expect(
      isFiltersApplied({
        authors: ['one', 'two', 'three'],
        genres: [],
        years: yearFilter[0],
        search: '',
      }),
    ).toBe(true);
  });
  it('Корректная проверка отсутствия применения фильтров', () => {
    expect(
      isFiltersApplied({
        authors: [],
        genres: [],
        years: yearFilter[0],
        search: '',
      }),
    ).toBe(false);
  });
});
