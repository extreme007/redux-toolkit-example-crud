import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TutorialDataService from "../services/tutorial.service";

const initialState = {
    listTutorials: [],
    currentTutorial: {},
};

export const createTutorial = createAsyncThunk(
    "tutorials/create",
    async ({ title, description }) => {
        const res = await TutorialDataService.create({ title, description });
        return res.data;
    }
);

export const retrieveTutorials = createAsyncThunk(
    "tutorials/retrieve",
    async () => {
        const res = await TutorialDataService.getAll();
        return res.data;
    }
);

export const updateTutorial = createAsyncThunk(
    "tutorials/update",
    async ({ id, data }) => {
        const res = await TutorialDataService.update(id, data);
        return res.data;
    }
);

export const deleteTutorial = createAsyncThunk(
    "tutorials/delete",
    async ({ id }) => {
        await TutorialDataService.delete(id);
        return { id };
    }
);

export const deleteAllTutorials = createAsyncThunk(
    "tutorials/deleteAll",
    async () => {
        const res = await TutorialDataService.deleteAll();
        return res.data;
    }
);

export const findTutorialsByTitle = createAsyncThunk(
    "tutorials/findByTitle",
    async ({ title }) => {
        const res = await TutorialDataService.findByTitle(title);
        return res.data;
    }
);

const tutorialSlice = createSlice({
    name: "tutorial",
    initialState,
    reducers: {
        setCurrentTutorial: (state, action) => {
            state.currentTutorial = action.payload;
        },
    },
    extraReducers: {
        [createTutorial.fulfilled]: (state, action) => {
            state.listTutorials.push(action.payload);
        },
        [retrieveTutorials.fulfilled]: (state, action) => {
            return { ...state, listTutorials: action.payload };
        },
        [updateTutorial.fulfilled]: (state, action) => {
            const index = state.listTutorials.findIndex(
                (tutorial) => tutorial.id === action.payload.id
            );
            state.listTutorials[index] = {
                ...state.listTutorials[index],
                ...action.payload,
            };
        },
        [deleteTutorial.fulfilled]: (state, action) => {
            let index = state.listTutorials.findIndex(
                ({ id }) => id === action.payload.id
            );
            state.listTutorials.splice(index, 1);
            state.currentTutorial = state.listTutorials[index];
        },
        [deleteAllTutorials.fulfilled]: (state, action) => {
            return [];
        },
        [findTutorialsByTitle.fulfilled]: (state, action) => {
            return { ...state, listTutorials: action.payload };
        },
    },
});

export const { actions, reducer } = tutorialSlice;
export const { setCurrentTutorial } = actions;
export default reducer;
