// src/components/MemeViewer.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Dimensions, Image, SafeAreaView, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';
import { styles } from './styles';
import { Meme } from './types';

export const width = Dimensions.get('window').width;

const MemeViewer: React.FC = () => {
  const [memes, setMemes] = useState<Meme[]>([]);

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    try {
      const cachedMemes = await AsyncStorage.getItem('memes');
      if (cachedMemes) {
        setMemes(JSON.parse(cachedMemes));
      } else {
        const response = await axios.get<{data: {memes: Meme[]}}>(
          'https://api.imgflip.com/get_rmemes',
        );
        const fetchedMemes = response.data.data.memes;
        setMemes(fetchedMemes);
        await AsyncStorage.setItem('memes', JSON.stringify(fetchedMemes));
      }
    } catch (error) {
      console.error('Error fetching memes:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <Carousel
          width={width}
          data={memes}
          renderItem={({item, index}) => (
            <View key={index} style={styles.container}>
              <Image source={{uri: item.url}} style={styles.image} />
            </View>
          )}
        />
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

export default MemeViewer;
