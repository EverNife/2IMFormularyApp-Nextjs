import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import {PropsWithChildren, useRef} from "react";
import {QueryClient, QueryClientProvider, Hydrate, DehydratedState} from "@tanstack/react-query";
import { DefaultSeo } from "@components/common/default-seo";

// Load Open Sans and satisfy typeface font
import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/satisfy";
// base css file
import "@styles/tailwind.css";

function handleExitComplete() {
	if (typeof window !== "undefined") {
		window.scrollTo({ top: 0 });
	}
}

const Noop: React.FC<PropsWithChildren> = ({ children }) => <>{children}</>;

const CustomApp = ({ Component, pageProps }: AppProps<{ dehydratedState: DehydratedState }>) => {
	const queryClientRef = useRef<any>();
	if (!queryClientRef.current) {
		queryClientRef.current = new QueryClient();
	}
	const router = useRouter();
	const Layout = (Component as any).Layout || Noop;

	return (
		<AnimatePresence mode='wait' onExitComplete={handleExitComplete}>
			<QueryClientProvider client={queryClientRef.current}>
				<Hydrate state={pageProps.dehydratedState}>
					<Layout pageProps={pageProps}>
						<DefaultSeo />
						<Component {...pageProps} key={router.route} />
					</Layout>
				</Hydrate>
				{/* <ReactQueryDevtools /> */}
			</QueryClientProvider>
		</AnimatePresence>
	);
};

export default CustomApp;
