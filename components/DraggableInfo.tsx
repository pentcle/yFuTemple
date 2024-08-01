import	React			from	'react';
import	Draggable		from	'react-draggable';

import	{parseMarkdown}	from	'../utils/parseMarkdown';

type TDraggableInfo = {
	hasInfo: boolean,
	set_hasInfo: React.Dispatch<React.SetStateAction<boolean>>,
}
function	DraggableInfo({hasInfo, set_hasInfo}: TDraggableInfo): React.ReactElement {
	return (
		<div className={`pointer-events-none fixed inset-0 z-50 items-center justify-center ${hasInfo ? 'flex' : 'hidden'}`} style={{zIndex: 10000}}>
			<Draggable handle={'.cursor-grab'}>
				<div className={'pointer-events-auto relative z-50 flex w-80 flex-col border-2 border-white bg-black pb-2 md:w-96'}>
					<div className={'flex h-7 w-full flex-row justify-between border-b-2 border-white text-left font-scope text-lg text-white'}>
						<div className={'mr-2 w-full cursor-grab pl-2'}>{'INFO'}</div>
						<div
							className={'z-50 -m-1 cursor-pointer p-1 pr-3'}
							onClick={(e): void => {
								e.stopPropagation();
								set_hasInfo(false);
							}}>
							{'X'}
						</div>
					</div>
					<div className={'flex h-96 w-full overflow-scroll border-white p-2 text-left font-scope text-lg text-white'}>
						<p
							dangerouslySetInnerHTML={{__html: parseMarkdown((hasInfo as any)?.description || '')}} />
					</div>
				</div>
			</Draggable>
		</div>
	);
}

export default DraggableInfo;
