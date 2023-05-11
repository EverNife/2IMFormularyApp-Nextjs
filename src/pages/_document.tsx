import Document, {
	Html,
	Head,
	Main,
	NextScript,
	DocumentContext,
} from "next/document";

export default class CustomDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		return await Document.getInitialProps(ctx);
	}
	render() {
		return (
			<Html>
				<Head>
					<link rel="icon" href="https://67dc2d.p3cdn1.secureserver.net/wp-content/uploads/2022/07/favicon-150x150.png" sizes="32x32"/>
					<link rel="icon" href="https://67dc2d.p3cdn1.secureserver.net/wp-content/uploads/2022/07/favicon-300x300.png" sizes="192x192"/>
					<link rel="apple-touch-icon" href="https://67dc2d.p3cdn1.secureserver.net/wp-content/uploads/2022/07/favicon-300x300.png"/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
