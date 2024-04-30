import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import {
  heightPercentageToDP as HP,
  widthPercentageToDP as WP,
} from 'react-native-responsive-screen';

import MoviePoster from '../../../components/MoviePoster';
import { Tmovie } from '../../../utils/constants';

const MoviesHorizontalList = ({
  movies,
  geners,
}: {
  movies: Tmovie[];
  geners: any;
}) => {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.listContainer}>
      <View
        style={{
          flexDirection: 'row',
          width: WP(100),
          paddingHorizontal: WP(3),
          alignItems: 'center',
          justifyContent: 'space-between',
          alignSelf: 'center',
          paddingBottom: HP(2),
        }}
      >
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22 }}>
          Movies
        </Text>
        <Text
          onPress={() => {
            navigation.navigate('SeeAll');
          }}
          style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}
        >
          See All
        </Text>
      </View>
      <FlatList
        data={movies}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <MoviePoster
            title={item.original_title}
            genere={item.genre_ids}
            posterUrl={item.backdrop_path}
            geners={geners}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
        style={{ marginLeft: WP(3) }}
      />
    </View>
  );
};

export default MoviesHorizontalList;

const styles = StyleSheet.create({
  listContainer: {
    flex: 0.4,
    paddingBottom: HP(4),
  },
  flatListContent: {
    alignSelf: 'flex-end',
    columnGap: WP(10),
  },
});
