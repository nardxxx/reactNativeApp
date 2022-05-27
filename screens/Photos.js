import { SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux'

import { selectAllPhotos } from '../components/photosSlice';
import PhotoList from '../components/PhotoList'


const Photos = () => {
    const photos = useSelector(selectAllPhotos);

    return (
        <SafeAreaView style={{ backgroundColor: 'gray', flex: 1 }}>
            <PhotoList photos={photos} />
        </SafeAreaView>
    )
}

export default Photos


