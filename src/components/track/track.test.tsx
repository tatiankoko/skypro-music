import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { data } from '@/data';
import ReduxProvider from '@/store/ReduxProvider';
import Track from '@/components/track/Track';
import { formatTime } from '@/utils/helper';

const mockTracks: TrackType[] = data;
const mockTrack: TrackType = data[0];

describe('Track component', () => {
  test('Отрисовка данных трека', () => {
    render(
      <ReduxProvider>
        <Track track={mockTrack} playlist={mockTracks} />
      </ReduxProvider>,
    );

    expect(screen.getAllByText(mockTrack.name).length).toBeGreaterThan(0);
    expect(screen.getAllByText(mockTrack.author).length).toBeGreaterThan(0);
    expect(screen.getAllByText(mockTrack.album).length).toBeGreaterThan(0);
    expect(
      screen.getAllByText(formatTime(mockTrack.duration_in_seconds)).length,
    ).toBeGreaterThan(0);
  });
});
