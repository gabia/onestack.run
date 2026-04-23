import "@/styles/globals.css";

import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";
import type { ReactElement, ReactNode } from "react";
import { SearchCommand } from "@/components/dashboard/search-command";
import { WhitelabelingProvider } from "@/components/proprietary/whitelabeling/whitelabeling-provider";
import { Toaster } from "@/components/ui/sonner";
import { api } from "@/utils/api";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
	theme?: string;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

const MyApp = ({
	Component,
	pageProps: { ...pageProps },
}: AppPropsWithLayout) => {
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<>
			<Head>
				<link rel="stylesheet" href="https://static.hiworks.com/asp/common/font/pretendard/variable/typography.css" />
				<link rel="icon" href="/favicon.png" type="image/png" />
				<title>Dokploy</title>
			</Head>
			<ThemeProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
				forcedTheme={Component.theme}
			>
				<NextTopLoader color="hsl(var(--sidebar-ring))" />
				<WhitelabelingProvider />
				<Toaster richColors />
				<SearchCommand />
				{getLayout(<Component {...pageProps} />)}
			</ThemeProvider>
		</>
	);
};

export default api.withTRPC(MyApp);
