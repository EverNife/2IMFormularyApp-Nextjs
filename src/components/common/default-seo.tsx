import { DefaultSeo as NextDefaultSeo } from "next-seo";
import {siteSettings} from "@settings/site-settings";

export const DefaultSeo = () => {
  return (
    <NextDefaultSeo
      title={siteSettings.name}
      description={siteSettings.description}
      additionalMetaTags={[
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1 maximum-scale=1",
        },
        {
          name: "theme-color",
          content: "#ffffff",
        }
      ]}
    />
  );
};
