import	React, {useContext, createContext}	from	'react';

const	AUDIO_LIST = [
	['YEARNING TREE', '/audio/yearning_tree.wav', '/audio-marks/yfiTree.png'],
	['TECHNE', '/audio/techne.wav', '/audio-marks/techne.png'],
	['DOMINION', '/audio/dominion.wav', '/audio-marks/dominion.png'],
	['COMMUNITY', '/audio/community.wav', '/audio-marks/community.png'],
	['TRANSMISSION', '/audio/transmission.wav', '/audio-marks/transmission.png'],
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
			<audio controls preload={'auto'} style={{visibility: 'hidden', height: 0, width: 0}}>
				{AUDIO_LIST.map((track) => (
					<source key={`audio-preload-track-${track[0]}`} src={track[1]} type={'audio/wav'} />	
				))}
			</audio>
		</Audio.Provider>
	);
};

export const useAudio = () => useContext(Audio);
export default useAudio;
