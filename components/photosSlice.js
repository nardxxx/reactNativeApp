import { createSelector, createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
    photos: [],
    favoritePhotosById: []
}

export const fetchPhotos = createAsyncThunk(
    'photos/fetchPhotos',
    async () => {
        return await fetch("https://jsonplaceholder.typicode.com/photos?albumId=1")
            .then(data => data.json())
    }
)

const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        photoLiked(state, action) {
            if (!state.favoritePhotosById.includes(action.payload)) state.favoritePhotosById.push(action.payload);
        },
        photoDisliked(state, action) {
            if (state.favoritePhotosById.includes(action.payload)) {
                state.favoritePhotosById = state.favoritePhotosById.filter(item => +item != +action.payload)
            };
        },
        photosFetched(state, action) {
            state.photos = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPhotos.fulfilled, (state, action) => {
                state.photos = action.payload;
            })
            .addCase(fetchPhotos.rejected, (state, action) => {
                console.log('fetching error');
            })
            .addDefaultCase(() => { })
    }
})

export const {
    photoLiked,
    photosFetched,
    photoDisliked,
} = photosSlice.actions;

export const selectAllPhotos = state => state.photos.photos;
export const selectAllFavoritePhotosById = state => state.photos.favoritePhotosById;

export const favoritePhotosSelector = createSelector(
    selectAllPhotos,
    selectAllFavoritePhotosById,

    (photos, favoritePhotos) => {
        if (photos.length > 0 && favoritePhotos.length > 0) {
            return photos.filter(photo => {
                return favoritePhotos.includes(photo.id)
            })
        }
        else return []
    }
);

export default photosSlice.reducer
