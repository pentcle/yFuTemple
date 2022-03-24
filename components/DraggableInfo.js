import	React			from	'react';
import	Draggable		from	'react-draggable';

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
