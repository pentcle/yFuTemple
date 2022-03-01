import	React, {useContext, createContext}	from	'react';

const	AUDIO_LIST = [
	['YEARNING TREE', '/audio/yearning_tree.wav', '/marks/yfiTree.png'],
	['TECHNE', '/audio/techne.wav', '/marks/techne.png'],
	['DOMINION', '/audio/dominion.wav', '/marks/dominion.png'],
	['COMMUNITY', '/audio/community.wav', '/marks/community.png'],
	['TRANSMISSION', '/audio/transmission.wav', '/marks/transmission.png'],
];


const	Audio = createContext();
export const AudioContextApp = ({children}) => {
	const	[audio, set_audio] = React.useState(AUDIO_LIST[0]);
	const	[isPlaying, set_isPlaying] = React.useState(false);

	return (
		<Audio.Provider value={{
			audio, set_audio,
			isPlaying, set_isPlaying,
			AUDIO_LIST
		}}>
			{children}
		</Audio.Provider>
	);
};

export const useAudio = () => useContext(Audio);
export default useAudio;
