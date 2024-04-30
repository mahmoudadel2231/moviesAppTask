import React, { useEffect, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import {
  heightPercentageToDP as HP,
  widthPercentageToDP as WP,
} from 'react-native-responsive-screen';

import { handleError, http } from '../../utils/axios';
import { Tmovie } from '../../utils/constants';
import MoviePoster from '../../components/MoviePoster';

const SeeAllScreen = () => {
  const [movies, setMovies] = useState<Tmovie[] | any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pagesNumber, setPagesNumber] = useState<number>(0);

  const fetchData = async () => {
    setIsLoading(true);
    await http
      .get('discover/movie', {
        params: {
          sort_by: 'popularity.desc',
          page,
        },
      })
      .then(data => {
        let moviesList = data.data.results;
        setPagesNumber(data.data.total_pages);
        if (page > 1) {
          setMovies([...movies, ...moviesList]);
        } else {
          setMovies(moviesList);
        }
      })
      .catch(handleError)
      .finally(() => {
        setIsLoading(false);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const getPages = () => {
    if (!isLoading && page < pagesNumber) {
      setPage(page + 1);
    }
  };

  const onRefresh = () => {
    if (!isLoading) {
      setMovies([]);
      setPage(1);
      setRefreshing(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movies}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item }) => (
          <MoviePoster
            title={item.original_title}
            genere={item.genre_ids}
            posterUrl={item.backdrop_path}
            width={WP(42)}
          />
        )}
        keyExtractor={item => item.id.toString()}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ rowGap: HP(2) }}
        style={{ width: WP(90), alignSelf: 'center' }}
        onEndReached={getPages}
        onEndReachedThreshold={0.7}
      />
    </SafeAreaView>
  );
};

export default SeeAllScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101720',
  },
});
