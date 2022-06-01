import { useState } from 'react';
import { View, Text, FlatList, TextInput, Image, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { photoDisliked, photoLiked, selectAllFavoritePhotosById } from './photosSlice';

const styles = StyleSheet.create({
    input: {
        flex: 1,
        color: '#000',
        padding: 14,
        paddingTop: 14 + StatusBar.currentHeight,
        marginHorizontal: 0.3,
        backgroundColor: 'rgb(255, 255, 255)'
    }
})



const ListHeader = ({ onSearch }) => (
    <TextInput
        placeholder='Search NFTs'
        style={styles.input}
        onChangeText={onSearch}
    />
)

const PhotoList = ({ photos }) => {
    const dispatch = useDispatch();

    const favorites = useSelector(selectAllFavoritePhotosById);

    const [filteredPhotos, setFilteredPhotos] = useState([])

    const ifExists = photo => {
        if (favorites.filter(item => item === photo.id).length > 0) {
            return true;
        }

        return false;
    };

    const handleSearch = (value) => {
        if (!value.length) setFilteredPhotos(photos);

        const filteredData = photos.filter((item) =>
            item.title.toLowerCase().includes(value.toLowerCase())
        );

        if (filteredData.length) {
            setFilteredPhotos(filteredData);
        } else {
            setFilteredPhotos(photos);
        }
    }

    return (
        photos.length > 0 ?
            <FlatList
                data={filteredPhotos.length > 0 ? filteredPhotos : photos}
                keyExtractor={item => item.id}
                ListHeaderComponent={<ListHeader onSearch={handleSearch} />}
                renderItem={({ item }) => (
                    <View style={{ marginVertical: 12, paddingHorizontal: 10 }}>
                        <View style={{
                            flexDirection: 'row',
                            flex: 1
                        }}>
                            <Image
                                source={{ uri: item.thumbnailUrl }}
                                resizeMode='cover'
                                style={{ width: 150, height: 150, marginBottom: 0.5 }}
                            />

                            <View style={{ flex: 1, marginLeft: 10 }}>
                                <View>
                                    <Text style={{ marginBottom: 0.5, paddingRight: 10 }}>{item.title}</Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 10,
                                    alignItems: 'center'
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            ifExists(item) ? dispatch(photoDisliked(item.id)) : dispatch(photoLiked(item.id));
                                        }}
                                        activeOpacity={0.7}
                                        style={{
                                            flexDirection: 'row',
                                            backgroundColor: '#fff',
                                            borderRadius: 100,
                                            padding: 10,
                                            height: 37,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Text style={{
                                            marginTop: ifExists(item) ? 0 : -2
                                        }}>
                                            {ifExists(item) ? '👎' : '👍'}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View >

                )}
            />
            : <View style={{ flex: 1, justifyContent: 'center' }}><Text style={{ fontSize: 20, textAlign: 'center' }}>There are no photos</Text></View>
    )
}

export default PhotoList
