import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    audioEnabled: false,
    effectsEnabled: true,
    audioVolume: 0,
    effectsVolume: 0.5

}
const settingsSlices = createSlice({
    name: 'settings',
    initialState: initialState,
    reducers: {
        setAudio: (state, action) => {
            const {audioEnabled} = action.payload
            state.audioEnabled = audioEnabled
        },
        setEffects: (state, action) => {
            const {effectsEnabled} = action.payload
            state.effectsEnabled = effectsEnabled
        },
        setAudioVolume: (state, action) => {
            const {audioVolume} = action.payload
            state.audioVolume = audioVolume
        },
        setEffectsVolume: (state, action) => {
            const {effectsVolume} = action.payload
            state.effectsVolume = effectsVolume
        }
    }
})


export default settingsSlices
