import React from 'react';
import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext): Promise<any> {
		const initialProps = await Document.getInitialProps(ctx);
		return {...initialProps};
	}

	render(): React.ReactElement {
		return (
			<Html lang={'en'}>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;