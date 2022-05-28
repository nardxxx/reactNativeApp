import { useState } from 'react';
import { View, Text, FlatList, TextInput, Image } from 'react-native'
import { useDispatch } from 'react-redux'

import { photoDisliked, photoLiked } from './photosSlice';


const ListHeader = ({ onSearch }) => (
    <TextInput
        placeholder='Search photos'
        style={{
            flex: 1,
            color: '000',
            padding: '0.5em',
            marginHorizontal: '0.3em',
            border: '1px solid black',
            backgroundColor: 'white'
        }}
        onChangeText={onSearch}
    />
)

const PhotoList = ({ photos }) => {
    const dispatch = useDispatch();

    const [filteredPhotos, setFilteredPhotos] = useState([])

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
                    <View style={{
                        alignItems: 'center',
                        padding: 20,
                        flex: 1
                    }}>
                        <Image
                            source={item.thumbnailUrl}
                            style={{ width: 150, height: 150, marginBottom: '0.5em' }}
                        />
                        <Text style={{ marginBottom: '0.5em' }}>{item.title}</Text>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text
                                style={{
                                    backgroundColor: 'white',
                                    padding: '0.5em',
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    dispatch(photoLiked(item.id));

                                }}
                            >
                                👍
                            </Text>

                            <Text
                                style={{
                                    backgroundColor: 'red',
                                    padding: '0.5em',
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    dispatch(photoDisliked(item.id))
                                }}
                            >
                                👎
                            </Text>
                        </View>
                    </View>
                )}
            />
            : <View style={{ flex: 1, justifyContent: 'center' }}><Text style={{ fontSize: 20, textAlign: 'center' }}>There are no photos</Text></View>
    )
}

export default PhotoList
