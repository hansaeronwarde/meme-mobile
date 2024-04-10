import { StyleSheet } from 'react-native';
import { width } from './MemeViewer';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    image: {
        width: width,
        height: '50%',
    },
});
