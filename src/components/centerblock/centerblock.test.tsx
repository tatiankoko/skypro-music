import { render, screen } from '@testing-library/react';
import { data } from '@/data';
import { setPagePlaylist } from '@/store/features/trackSlice';
import { TrackType } from '@/sharedTypes/sharedTypes';
import CenterBlock from './Centerblock';

const mockDispatch = jest.fn();

jest.mock('@/store/store', () => ({
  useAppDispatch: () => mockDispatch,
}));

jest.mock('@/components/filter/Filter', () => {
  return function MockFilter({ tracks }: { tracks: TrackType[] }) {
    return (
      <div data-testid="filter">
        {tracks.map((track) => track.name).join(', ')}
      </div>
    );
  };
});

jest.mock('@/components/track/Track', () => {
  return function MockTrack({ track }: { track: TrackType }) {
    return <div data-testid="track">{track.name}</div>;
  };
});

type CenterBlockProps = Parameters<typeof CenterBlock>[0];

const renderCenterBlock = (props: Partial<CenterBlockProps> = {}) =>
  render(
    <CenterBlock
      title="Favorite tracks"
      loading={false}
      playlist={[data[0]]}
      pagePlaylist={[data[1]]}
      errorMessage={null}
      {...props}
    />,
  );

describe('CenterBlock component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Отрисовка названия, фильтров и списка треков', () => {
    renderCenterBlock();

    expect(screen.getAllByText('Favorite tracks').length).toBeGreaterThan(0);
    expect(screen.getByTestId('filter')).toHaveTextContent(data[1].name);
    expect(screen.getByTestId('track')).toHaveTextContent(data[0].name);
  });

  test('Корректная отрисовка skeleton во время загрузки без обновления списка треков', () => {
    const { container } = renderCenterBlock({ loading: true });

    expect(container.querySelector('.skeleton')).toBeInTheDocument();
    expect(screen.queryByTestId('track')).not.toBeInTheDocument();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  test('Корректное обновление списка треков после окончания загрузки', () => {
    renderCenterBlock({ loading: false });

    expect(mockDispatch).toHaveBeenCalledWith(setPagePlaylist([data[1]]));
  });
});
