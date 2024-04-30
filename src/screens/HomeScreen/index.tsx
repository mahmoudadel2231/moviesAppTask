import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { handleError, http } from '../../utils/axios';
import MoviesHorizontalList from './components/moviesHorizontalList';
import MainPoster from './components/MainPoster';

import { Tmovie } from '../../utils/constants';

const HomeScreen = () => {
  const [movies, setMovies] = useState<Tmovie[] | any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [geners, setGeners] = useState<{ id: number; name: string }>();
  useEffect(() => {
    setLoading(true);
    http
      .get('discover/movie', {
        params: {
          sort_by: 'popularity.desc',
          page: 1,
        },
      })
      .then(data => {
        const genersObject: any = {};
        for (let i = 0; i < data.data.results.length; i++) {
          genersObject[i] = data.data.results[i];
        }
        setGeners(genersObject);
      })
      .catch(handleError)
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    http
      .get('genre/movie/list?api_key=6b4357c41d9c606e4d7ebe2f4a8850ea', {})
      .then(data => {
        setGeners(data.data.genres);
      })
      .catch(handleError)
      .finally(() => {
        // setLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      ) : (
        <>
          <MainPoster movie={movies?.[0]} geners={geners} />
          <MoviesHorizontalList movies={movies?.slice(1)} geners={geners} />
        </>
      )}
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101720',
  },
  loadingContainer: { flex: 1, justifyContent: 'center' },
});
