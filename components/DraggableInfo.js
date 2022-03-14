import	React			from	'react';
import	Draggable		from	'react-draggable';

function	DraggableInfo({hasInfo, set_hasInfo}) {
	return (
		<div className={`fixed z-50 ${hasInfo ? '' : 'hidden'}`} style={{zIndex: 10000}}>
			<Draggable
				handle={'.cursor-grab'}
				defaultPosition={{x: 200, y: 200}}>
				<div className={'flex relative z-50 flex-col pb-2 w-96 bg-black border-2 border-white'}>
					<div className={'flex flex-row justify-between px-2 w-full h-7 font-scope text-lg text-left text-white border-b-2 border-white cursor-grab'}>
						<div className={'w-full'}>{'INFO'}</div>
						<div
							className={'p-1 -m-1 cursor-pointer select-none'}
							onClick={() => set_hasInfo(false)}>
							{'X'}
						</div>
					</div>
					<div className={'flex overflow-scroll p-2 w-full h-96 font-scope text-lg text-left text-white border-white'}>
						{'Modi facilis aliquam quis id beatae quo voluptas. Exercitationem deserunt exercitationem et quasi iure. Eos aliquam laborum occaecati et odio. Voluptates sit nemo qui natus.'}
						{'Et vero quia fuga est. Quis dolores pariatur voluptatem in modi aliquam praesentium perspiciatis. Aut reiciendis doloribus quia dolor qui. Quo cum vitae sunt iusto vero. Enim vel voluptatem tempora consequatur nemo qui possimus sit.'}
						{'Fuga nobis dolorem nesciunt autem. Quod quisquam ipsa ex corporis vitae. Placeat voluptas sed officia odit enim.'}
						{'Libero dolorem eos excepturi labore itaque libero. Culpa sit dolor beatae. Dolor similique qui aut dolorem ipsum quos. Aut non aut ea ut quaerat. Nobis atque repellat amet sed repellat. Neque reiciendis iure magni ipsum.'}
						{'Fugiat esse cum aut nisi distinctio. Voluptatibus recusandae quos est. Et delectus ipsum ut. Dignissimos id a provident et sint velit suscipit. Nobis voluptatem inventore velit. Reiciendis dolorem atque consequatur velit.'}
					</div>
				</div>
			</Draggable>
		</div>
	);
}

export default DraggableInfo;
