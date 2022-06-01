import { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { fetchPhotos, selectAllPhotos } from '../components/photosSlice';
import PhotoList from '../components/PhotoList'


const Photos = () => {
    const photos = useSelector(selectAllPhotos);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPhotos());
        // eslint-disable-next-line
    }, []);


    return (
        <SafeAreaView style={{ backgroundColor: 'rgb(128, 128, 128)', flex: 1 }}>
            <PhotoList photos={photos} />
        </SafeAreaView>
    )
}

export default Photos

