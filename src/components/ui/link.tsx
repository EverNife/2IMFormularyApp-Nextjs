import NextLink, { LinkProps as NextLinkProps } from "next/link";
import React, {PropsWithChildren} from "react";

const Link: React.FC<NextLinkProps & { className?: string } & PropsWithChildren> = ({
  href,
  children,
  ...props
}) => {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  );
};

export default Link;
