import { sortByYearFilter, yearFilter } from '@/utils/sortTracks';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { data } from '@/data';

describe('sortTracks', () => {
  const tracks: TrackType[] = [data[0], data[1], data[3]];

  it(`Корректная сортировка по: ${yearFilter[1]}`, () => {
    expect(sortByYearFilter(yearFilter[1], tracks)).toStrictEqual([
      data[1],
      data[0],
      data[3],
    ]);
  });

  it(`Корректная сортировка по: ${yearFilter[2]}`, () => {
    expect(sortByYearFilter(yearFilter[2], tracks)).toStrictEqual([
      data[3],
      data[0],
      data[1],
    ]);
  });

  it(`Корректная сортировка по: ${yearFilter[0]}`, () => {
    expect(sortByYearFilter(yearFilter[0], tracks)).toStrictEqual(tracks);
  });
});
