import { SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';

import PhotoList from '../components/PhotoList';
import { favoritePhotosSelector } from '../components/photosSlice'

const Favorites = () => {
    const favoritePhotos = useSelector(favoritePhotosSelector);

    return (
        <SafeAreaView style={{ backgroundColor: 'rgb(128, 128, 128)', flex: 1 }}>
            {
                favoritePhotos.length < 0 ?
                    'Like a photo to see something here'
                    : <PhotoList photos={favoritePhotos} />
            }
        </SafeAreaView>
    )
}

export default Favorites