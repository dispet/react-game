import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux'

import {createUseStyles} from 'react-jss'
import {IconButton} from '@material-ui/core'
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import Slider from '@material-ui/core/Slider';
import Paper from '@material-ui/core/Paper';

import settingsSlices from './SettingsSlices'
// @ts-ignore
import backgroundMusic from '../music/background.mp3';
// @ts-ignore
import clickMusic from "../music/click.mp3";

const useStyles = createUseStyles({
    controlPanel: {
        display: 'flex',
        justifyContent: 'space-between',
        justifyItems: 'center',

    },
    audioControlContainer: {
        position: "absolute",
        height: "70px",
        padding: '10px 0px',
        top: "45px",
        display: ({showAudioControl}: any) => showAudioControl ? 'block' : "none"
    },
    effectsControlContainer: {
        position: "absolute",
        height: "70px",
        padding: '10px 0px',
        top: "45px",
        display: ({showEffectsControl}: any) => showEffectsControl ? 'block' : "none"
    }
})

const backgroundAudio = new Audio(backgroundMusic);
const clickAudio = new Audio(clickMusic);

let curPlay = '';

const ControlPanel = (props: any) => {
    const dispatch = useDispatch();
    const [showAudioControl, setShowAudioControl] = useState(false)
    const [showEffectsControl, setShowEffectsControl] = useState(false)

    // @ts-ignore
    const settings = useSelector(state => state.settings)
//audio
    const playClickAudio = () => {
        if (settings.effectsEnabled) {
            clickAudio.play();
        }
    };

    if (props.play !== curPlay) {
        playClickAudio();
        curPlay = props.play;
    }
    useEffect(() => {
        clickAudio.volume = settings.effectsVolume;
        if (settings.audioVolume > 0 && settings.audioEnabled) {
            backgroundAudio.volume = settings.audioVolume;
            backgroundAudio.play();
        } else {
            backgroundAudio.pause();
        }
    }, [settings]);

    const classes = useStyles({showAudioControl, showEffectsControl})

    return (
        <div className={classes.controlPanel}>
            <button onClick={() => {
                window.localStorage.setItem('game', '')
                window.location.reload();
            }}>New game
            </button>

            <button onClick={props.autoPlay}>Autoplay</button>
            <div>
                <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onMouseEnter={() => setShowAudioControl(true)}
                    onMouseLeave={() => setShowAudioControl(false)}
                    disableRipple
                >
                    {!!settings.audioVolume && <MusicNoteIcon/>}
                    {!settings.audioVolume && <MusicOffIcon/>}
                    <Paper className={classes.audioControlContainer}>
                        <Slider
                            orientation="vertical"
                            getAriaValueText={() => 'musicVolume'}
                            defaultValue={30}
                            aria-labelledby="vertical-slider"
                            value={settings.audioVolume * 333}
                            onChange={(e, value) => {
                                dispatch(settingsSlices.actions.setAudio({audioEnabled: true}))
                                // @ts-ignore
                                dispatch(settingsSlices.actions.setAudioVolume({audioVolume: value / 333}))
                            }}
                        />
                    </Paper>
                </IconButton>
            </div>

            <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
                onMouseEnter={() => setShowEffectsControl(true)}
                onMouseLeave={() => setShowEffectsControl(false)}
                disableRipple
            >
                {settings.effectsEnabled && <VolumeUpIcon/>}
                {!settings.effectsEnabled && <VolumeOffIcon/>}
                <Paper className={classes.effectsControlContainer}>
                    <Slider
                        orientation="vertical"
                        getAriaValueText={() => 'musicVolume'}
                        defaultValue={30}
                        aria-labelledby="vertical-slider"
                        value={settings.effectsVolume * 100}
                        onChange={(e, value) => {
                            if (value == 0) {
                                dispatch(settingsSlices.actions.setEffects({effectsEnabled: false}))
                            } else {
                                // @ts-ignore
                                dispatch(settingsSlices.actions.setEffectsVolume({effectsVolume: value / 100}))
                                dispatch(settingsSlices.actions.setEffects({effectsEnabled: true}))
                            }
                        }}
                    />
                </Paper>
            </IconButton>
        </div>
    )
}

export default ControlPanel
