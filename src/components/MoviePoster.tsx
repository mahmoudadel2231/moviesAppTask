import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {
  heightPercentageToDP as HP,
  widthPercentageToDP as WP,
} from 'react-native-responsive-screen';

import { Double } from 'react-native/Libraries/Types/CodegenTypes';

const MoviePoster = ({
  title,
  genere,
  posterUrl,
  width = WP(30),
  geners,
}: {
  title: string;
  genere: number[];
  posterUrl: string;
  width?: Double;
  geners?: any;
}) => {
  return (
    <View style={[styles.movieContainer, { width }]}>
      <FastImage
        style={[styles.imageStyle, { width }]}
        source={{
          uri: `https://image.tmdb.org/t/p/w370_and_h556_bestv2${posterUrl}`,
          headers: { Authorization: 'someAuthToken' },
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.5 }}
        colors={['transparent', '#101720']}
        style={[styles.gradientBackground, { width }]}
      >
        <Text numberOfLines={2} style={styles.movieTitle}>
          {title}
        </Text>
        <Text style={styles.movieGenre}>
          {genere?.map(item => {
            return `${geners[item]}  `;
          })}
        </Text>
      </LinearGradient>
    </View>
  );
};

export default MoviePoster;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101720',
  },
  movieContainer: {
    alignItems: 'center',
  },

  movieTitle: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    paddingHorizontal: WP(1),
  },
  movieGenre: {
    fontSize: 8,
    textAlign: 'center',
    color: 'gold',
  },
  gradientBackground: {
    height: HP(12),
    position: 'absolute',
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: HP(3),
  },
  imageStyle: {
    width: WP(35),
    height: HP(35),
  },
});
