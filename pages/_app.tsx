import React, { Fragment } from 'react';
import Router from 'next/router';
import {wrapper} from '../store';
// types
import type { AppProps } from 'next/app';

// global styles
import 'swiper/swiper.scss';
import 'rc-slider/assets/index.css';
import 'react-rater/lib/react-rater.css';
import '../assets/css/styles.scss';

import * as gtag from './../utils/gtag';
import { MantineProvider } from '@mantine/core';

const isProduction = process.env.NODE_ENV === 'production';

// only events on production
if(isProduction) {

  // Notice how we track pageview when route is changed
  Router.events.on('routeChangeComplete', (url: string) => gtag.pageview(url));
}

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Fragment>
    <MantineProvider theme={{
      fontFamily: 'Poppins',
      colors: {themed: ["#ffffff", "#fff7eb", "#feefd8", "#fee7c4", "#fddfb1", "#fdd89d", "#fdd089", "#fcc876", "#fcc062", "#fbb84f", "#fbb03b",	"#e29e35",	"#c98d2f",	"#b07b29",	"#976a23",	"#7e581e",	"#644618",	"#4b3512",	"#32230c",	"#191206",	"#000000"]}, primaryColor: 'themed', primaryShade: 10}}><Component {...pageProps} /></MantineProvider>

  </Fragment>
);

export default wrapper.withRedux(MyApp);
