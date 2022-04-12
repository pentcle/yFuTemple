import	React			from	'react';
import	Draggable		from	'react-draggable';
import	{parseMarkdown}	from	'utils/parseMarkdown';

function	DraggableInfo({hasInfo, set_hasInfo}) {
	return (
		<div className={`fixed inset-0 justify-center items-center z-50 ${hasInfo ? 'flex' : 'hidden'}`} style={{zIndex: 10000}}>
			<Draggable handle={'.cursor-grab'}>
				<div className={'flex relative z-50 flex-col pb-2 w-80 bg-black border-2 border-white md:w-96'}>
					<div className={'flex flex-row justify-between w-full h-7 font-scope text-lg text-left text-white border-b-2 border-white'}>
						<div className={'pl-2 mr-2 w-full cursor-grab'}>{'INFO'}</div>
						<div
							className={'z-50 p-1 pr-3 -m-1 cursor-pointer'}
							onClick={(e) => {
								console.log('hello');
								e.stopPropagation();
								set_hasInfo(false);
							}}>
							{'X'}
						</div>
					</div>
					<div className={'flex overflow-scroll p-2 w-full h-96 font-scope text-lg text-left text-white border-white'}>
						<p dangerouslySetInnerHTML={{__html: parseMarkdown(hasInfo?.description || '')}} />
					</div>
				</div>
			</Draggable>
		</div>
	);
}

export default DraggableInfo;
