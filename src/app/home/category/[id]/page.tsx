'use client';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { getTracks, getTracksById } from '@/services/tracks/tracksApi';
import { AxiosError } from 'axios';
import CenterBlock from '@/components/centerblock/Centerblock';

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const [tracks, setTracks] = useState<TrackType[]>([]);
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState<string>();

  console.log(Number(params.id) + 1);

  useEffect(() => {
    getTracksById(Number(params.id) + 1)
      .then((result) => {
        console.log('TRACKS BY ID ');
        console.log(result.items);

        getTracks()
          .then((allTracks) => {
            setTitle(result.name);

            const categoryTracks: TrackType[] = allTracks.filter((track) =>
              result.items.includes(track._id),
            );

            console.log('categoryTracks ');
            console.log(categoryTracks);

            setTracks(categoryTracks);
            setLoading(false);
          })
          .catch((error) => {
            if (error instanceof AxiosError) {
              if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(error.response.data);
                /*console.log(error.response.data);
                  console.log(error.response.status);
                  console.log(error.response.headers);*/
              } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log(error.request);
                setError(error.request); // что-то с интернетом
              } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', error.message);
                setError(error.message); // Неизвестная ошибка
              }
              console.log(error.config);
            }
          });
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            setError(error.response.data);
            /*console.log(error.response.data);
              console.log(error.response.status);
              console.log(error.response.headers);*/
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
            setError(error.request); // что-то с интернетом
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
            setError(error.message); // Неизвестная ошибка
          }
          console.log(error.config);
        }
      });
  }, []);

  return (
    <CenterBlock
      title={`${title} ${params.id}`}
      loading={loading}
      playlist={tracks}
    />
  );

  /*return <h1 style={{ color: 'black' }}>Category {params.id}</h1>;*/
}
