import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as HP,
  widthPercentageToDP as WP,
} from 'react-native-responsive-screen';
import moment from 'moment';

import { Tmovie } from '../../../utils/constants';

const MainPoster = ({ movie, geners }: { movie: Tmovie; geners: any }) => {
  return (
    <View style={styles.posterContainer}>
      <FastImage
        style={{
          flex: 1,
        }}
        source={{
          uri: `https://image.tmdb.org/t/p/w370_and_h556_bestv2${movie?.backdrop_path}`,
          headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.5 }}
        colors={['transparent', '#101720']}
        style={styles.gradientBackground}
      >
        <Text style={styles.titleStyle}>{movie?.original_title}</Text>
        <Text style={styles.genereStyle}>
          {movie?.genre_ids?.map((item: any) => {
            return `${geners[item]}  `;
          })}
        </Text>
        <Text style={styles.releseStyle}>
          {moment(movie?.release_date).format('YYYY')}
        </Text>
      </LinearGradient>
    </View>
  );
};

export default MainPoster;

const styles = StyleSheet.create({
  posterContainer: {
    flex: 0.6,
  },
  gradientBackground: {
    height: HP(20),
    position: 'absolute',
    bottom: 0,
    width: WP(100),
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: HP(3),
  },
  titleStyle: { color: 'white', fontSize: 35, marginBottom: HP(5) },
  genereStyle: { color: 'gold', marginBottom: HP(2), fontSize: 19 },
  releseStyle: { color: 'white', fontSize: 19 },
});
