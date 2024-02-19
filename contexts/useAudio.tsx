import React, {createContext, useContext, useState} from 'react';

import type {ReactElement} from 'react';

const AUDIO_LIST: [string, string, string][] = [
	['YEARNING TREE', '/audio/yearning_tree.opus', '/audio-marks/yfiTree.png'],
	['TECHNE', '/audio/techne.opus', '/audio-marks/techne.png'],
	['DOMINION', '/audio/dominion.opus', '/audio-marks/dominion.png'],
	['COMMUNITY', '/audio/community.opus', '/audio-marks/community.png'],
	['TRANSMISSION', '/audio/transmission.opus', '/audio-marks/transmission.png']
];

type TAudioContext = {
	audio: any,
	set_audio: React.Dispatch<React.SetStateAction<any>>,
	isPlaying: boolean,
	set_isPlaying: React.Dispatch<React.SetStateAction<boolean>>,
	AUDIO_LIST: [string, string, string][];
}
const Audio = createContext<TAudioContext>({
	audio: AUDIO_LIST[0],
	set_audio: (): void => undefined,
	isPlaying: false,
	set_isPlaying: (): void => undefined,
	AUDIO_LIST
});

export const AudioContextApp = ({children=<div />}): ReactElement => {
	const [audio, set_audio] = useState<any>(AUDIO_LIST[0]);
	const [isPlaying, set_isPlaying] = useState<boolean>(false);

	return (
		<Audio.Provider
			value={{
				audio,
				set_audio,
				isPlaying,
				set_isPlaying,
				AUDIO_LIST
			}}>
			{children}

		</Audio.Provider>
	);
};

export const useAudio = (): TAudioContext => useContext(Audio);
export default useAudio;
