import React, {useEffect, useMemo, useState} from 'react';
import {toast} from 'react-hot-toast';
import Link from 'next/link';
import {useRouter} from 'next/router';
import Footer from 'components/Footer';
import {useMint} from 'contexts/useMint';
import axios from 'axios';
import {motion} from 'framer-motion';
import {useWeb3} from '@yearn-finance/web-lib/contexts/useWeb3';

import type {ReactElement} from 'react';

const variants = {
	initial: {y: 0, opacity: 1},
	enter: {y: 0, opacity: 1, transition: {duration: 0.2, ease: 'easeIn'}},
	exit: {y: 20, opacity: 0, transition: {duration: 0.2, ease: 'easeIn'}}
};

type TFormField = {
	label: string,
	name: string,
	notice?: string | ReactElement,
	formType?: string,
	required?: boolean
}
function FormField({label = '', name = '', notice = '', required = true, style, ...props}: TFormField & React.HTMLProps<HTMLInputElement>): ReactElement {
	return (
		<div className={'grid grid-cols-12 items-center gap-x-0 gap-y-2 md:gap-x-6 md:gap-y-0'} style={style}>
			<label className={'text-grey-2 col-span-12 flex flex-col font-bold'}>
				{label}
				<p className={'text-grey-2 text-xs'}>{notice}</p>
				<input
					required={required}
					autoComplete={'off'}
					className={'input mt-2 h-10 bg-white/10 p-2'}
					name={name}
					{...props} />
			</label>
		</div>
	);
}

function	normalizeString(str: string): string {
	str = str.replace(/[^\w\s]/gi, '');
	return str;
}

function	Apply(): ReactElement {
	const	{provider, isActive, address, openLoginModal, onDesactivate} = useWeb3();
	const	{ownedByUser, shippingDone, set_shippingDone} = useMint();
	const	router = useRouter();
	const	[isSubmitLocked, set_isSubmitLocked] = useState(false);
	const	[shippingForTokenID, set_shippingForTokenID] = useState(-1);

	const	possibleShipping = useMemo((): number[] => {
		return (ownedByUser || []).filter((item): boolean => !(shippingDone || []).includes(item));
	}, [shippingDone, ownedByUser]);

	useEffect((): void => {
		set_shippingForTokenID((possibleShipping || [])?.[possibleShipping?.length - 1] || -1);
	}, [possibleShipping]);

	async function signMessage(tokenID: number): Promise<string> {
		const	signer = provider.getSigner();
		const	signature = await signer.signMessage('I own edition #' + tokenID);
		return signature;
	}

	const	handleSubmit = (): ReactElement => {
		if (!isSubmitLocked) {
			return (<>{'Submit'}</>);
		}
		return (
			<svg
				className={'h-5 w-5 animate-spin text-center text-black'}
				xmlns={'http://www.w3.org/2000/svg'}
				fill={'none'}
				viewBox={'0 0 24 24'}>
				<circle
					className={'opacity-25'}
					cx={'12'}
					cy={'12'}
					r={'10'}
					stroke={'currentColor'}
					strokeWidth={'4'}>
				</circle>
				<path
					className={'opacity-75'}
					fill={'currentColor'}
					d={'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'}>
				</path>
			</svg>
		);
	};

	return (
		<div className={'relative mb-10 flex flex-col border-2 border-white text-white'}>
			<div className={'border-b-2 border-white bg-black p-8'}>
				<h1 className={'whitespace-pre-wrap text-4xl font-bold text-white'}>
					{'Shipping Information'}
				</h1>
				<p className={'text-grey-2 my-2 text-base'}>
					{'This information will only be used for shipping and removed once comics are delivered.  Please note, you will need to enter shipping separately for each NFT you purchase. Shipping is free!'}
				</p>
				<p className={'text-grey-2 my-2 text-base'}>
					{'See our FAQ for more details on shipping process and policy.'}
				</p>
			</div>

			<div className={'relative grid w-full grid-cols-12 p-8'}>
				<form
					name={'apply-form'}
					className={'col-span-12 w-full space-y-8'}
					onSubmit={async (e): Promise<void> => {
						set_isSubmitLocked(true);
						e.preventDefault();
						try {
							const	signature = await signMessage(shippingForTokenID);
							const	data = {
								//Default fields
								RECID: 'CRDSRV',
								CLIENT_ID: 601,
								PRTNUM: 'yFU_001',
								//Empty fields,
								COMPANY: '',
								ADRLN2: '',
								ADRLN3: '',
								MKTCOD: '',
								SDDFLG: '',
								CSMThirdPartyCode: '',
								ExternalSystem: '',
								ORDQTY: '',
								Comments: '',
								UNTPRC: '',
								SHIPHAND: '',
								TAX: '',
								//Custom fields
								ADRNAM: normalizeString((e.target as any).fullName.value),
								ADRLN1: normalizeString((e.target as any).streetaddress.value),
								ADRCTY: normalizeString((e.target as any).city.value),
								ADRSTC: normalizeString((e.target as any).state.value),
								ADRPSZ: normalizeString((e.target as any).zip.value),
								CTRY_NAME: normalizeString((e.target as any).country.value),
								PHNNUM: normalizeString(((e.target as any).phone.value).replace('+', '00')),
								EMAIL: (e.target as any).contact.value,
								HOST_ORDNUM: shippingForTokenID,
								tokenID: shippingForTokenID,
								walletAddress: normalizeString((e.target as any).owner.value),
								signature: signature
							};

							// const scriptURL = process.env.FORM_APPLY as string;
							const scriptURL = '/api/minters';
							axios.post(scriptURL, {
								method: 'POST',
								body: JSON.stringify(data),
								headers: {'Content-Type': 'application/json'}
							}).then((result): void => {
								//decode result
								const	resultMessage = result.data;
								if (resultMessage === 'success') {
									toast.success('Thank you for your application!');
									set_shippingDone((s: number[]): number[] => [...s, shippingForTokenID]);
									router.push('/');
									// form.reset();
								} else {
									toast.error(resultMessage);
								}
								set_isSubmitLocked(false);
							}).catch((error): void => {
								console.error(error);
								toast.error('Something went wrong. Please try again.');
								set_isSubmitLocked(false);
							});
						} catch (error) {
							console.error(error);
							toast.error('Something went wrong. Please try again.');
							set_isSubmitLocked(false);
						}
					}}>

					<FormField
						required
						label={'Full name'}
						name={'fullName'}
						autoFocus />
					<FormField
						required
						label={'Street Address'}
						name={'streetaddress'} />
					<FormField
						required
						label={'City'}
						name={'city'} />
					<FormField
						required
						label={'State'}
						name={'state'} />
					<FormField
						required
						label={'Zip'}
						name={'zip'} />
					<FormField
						required
						label={'Full Country Name (no abbreviations)'}
						name={'country'} />
					<FormField
						required
						label={'Phone'}
						name={'phone'}
						type={'tel'} />
					<FormField
						label={'Email'}
						name={'contact'}
						type={'email'} />
					<div className={'flex w-full flex-col space-x-0 space-y-4 md:flex-row md:space-y-0 md:space-x-4'}>
						<FormField
							style={{width: '100%'}}
							required
							label={'NFT owner Address'}
							name={'owner'}
							readOnly
							value={isActive ? address as string : ''}
							notice={
								<button
									type={'button'}
									className={'text-sm italic text-white underline opacity-40'}
									onClick={(): void => {
										if (isActive) {
											onDesactivate();
										} else {
											openLoginModal();
										}
									}}>
									<p>{isActive ? 'Disconnect' : 'Connect Wallet'}</p>
								</button>
							} />

						<div className={'grid grid-cols-12 items-center gap-x-0 gap-y-2 md:gap-x-6 md:gap-y-0'} style={{width: '100%'}}>
							<label className={'text-grey-2 col-span-12 flex flex-col font-bold'}>
								{'Token ID'}
								<p className={'text-grey-2 text-xs'}>{'The token ID of the NFT you are filling out shipping for.'}</p>
								<select
									className={'input mt-2 h-10 border-none bg-white/10 p-2'}
									value={shippingForTokenID}
									onChange={(e): void => set_shippingForTokenID(Number(e.target.value))}>
									{possibleShipping.map((tokenID: number): JSX.Element => {
										return (
											<option key={tokenID} value={tokenID}>
												{tokenID}
											</option>
										);
									})}
								</select>
							</label>
						</div>
					</div>
					<button
						disabled={isSubmitLocked}
						className={'button-glowing my-4 flex h-12 w-full items-center justify-center bg-white text-center text-lg text-black'}
						type={'submit'}>
						{handleSubmit()}
					</button>
				</form>
				{shippingForTokenID === -1 ? (
					<div className={'absolute inset-0 bg-black/40 backdrop-blur-sm'}>
						<div className={'mx-auto mt-10 flex w-1/2 flex-col border-2 border-white bg-black/60 pt-10 pb-4 text-center text-lg'}>
							{'You need to own the NFT to apply for a shipping slot.'}
							<div className={'px-10'}>
								<Link href={'/'}>
									<div
										className={'button-glowing my-4 flex h-12 w-full items-center justify-center bg-white text-center text-black'}>
										{'Mint NFT'}
									</div>
								</Link>
							</div>
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}


function Wrapper(): ReactElement {
	return (
		<motion.div
			key={'shipping'}
			initial={'initial'}
			animate={'enter'}
			exit={'exit'}
			className={'relative -mt-1 flex w-screen flex-col overflow-hidden p-0 md:p-6'}
			variants={variants}>
			<div className={'relative mx-auto w-full max-w-screen-xl'} style={{minHeight: '100vh'}}>
				<div>
					<Link href={'/'}>
						<p className={'cursor-pointer text-sm opacity-60 transition-opacity hover:opacity-100'}>
							{'Back to home'}
						</p>
					</Link>
					<section className={'mt-2 w-full px-4 md:px-0'}>
						<Apply />
					</section>
				</div>
			</div>
			<Footer />
		</motion.div>
	);
}

export default Wrapper;
