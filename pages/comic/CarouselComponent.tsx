import * as React from 'react';

import {Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious} from '@/components/ui/comic';

export function CarouselComponent({imagePaths}: { imagePaths: string[] }) {
	return (
		<div className={'flex h-full w-full items-center justify-center pb-20 sm:pb-0'}>
			<Carousel className={'flex w-full max-w-5xl flex-col'}>
				<CarouselContent>
					{imagePaths.sort().map((imagePath, index) => (
						<CarouselItem key={index} className={'flex items-center justify-center'}>
							<div
								className={'relative h-[calc(100vh-14rem)] max-h-[100vh] w-full overflow-hidden sm:max-h-[90vh] lg:max-h-[90vh]'}>
								<img
									src={imagePath}
									alt={`Slide ${index + 1}`}
									className={'absolute inset-0 h-full w-full object-contain'}
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<div className={'relative -bottom-6 opacity-70 sm:hidden'}>
					<CarouselPrevious className={'left-2'}/>
					<CarouselNext className={'right-2'}/>
				</div>
				<div className={'hidden opacity-70 sm:block'}>
					<CarouselPrevious className={'left-2'}/>
					<CarouselNext className={'right-2'}/>
				</div>
			</Carousel>
		</div>
	);
}
