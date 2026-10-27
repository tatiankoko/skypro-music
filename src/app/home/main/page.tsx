'use client';

import styles from './page.module.css';
import Bar from '@/components/bar/Bar';
import Nav from '@/components/nav/Nav';
import CenterBlock from '@/components/centerblock/Centerblock';
import Sidebar from '@/components/sidebar/Sidebar';
import { useEffect, useState } from 'react';
import { getTracks } from '@/services/tracks/tracksApi';
import { TrackType } from '@/sharedTypes/sharedTypes';
import { AxiosError } from 'axios';

export default function Home() {
  const [tracks, setTracks] = useState<TrackType[]>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    getTracks()
      .then((result) => {
        setTracks(result);
        /*result[0]._id;*/
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
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <CenterBlock />
          <Sidebar />
        </main>
        <Bar />
        <footer className="footer"></footer>
      </div>
    </div>
  );
}
