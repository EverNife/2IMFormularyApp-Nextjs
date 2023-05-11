import { NextSeo } from "next-seo";
import {PropsWithChildren} from "react";
import {siteSettings} from "@settings/site-settings";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
	return (
		<div className="flex flex-col min-h-screen">
			<NextSeo
				additionalMetaTags={[
					{
						name: "viewport",
						content: "width=device-width, initial-scale=1.0",
					},
				]}
				title={siteSettings.name}
				description={siteSettings.description}
				canonical={siteSettings.canonical}
			/>
			<main
				className="relative flex-grow"
				style={{
					minHeight: "-webkit-fill-available",
					WebkitOverflowScrolling: "touch",
				}}
			>
				{children}
			</main>
		</div>
	);
};

export default Layout;
