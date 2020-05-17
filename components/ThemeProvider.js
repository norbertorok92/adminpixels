import React from 'react';
import { ConfigProvider } from 'antd';
import { IntlProvider } from 'react-intl';
import { useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import themes from 'config/theme/theme.config';
import {useWindowSize} from 'utils/hooks';
import appActions from 'redux/app/actions';

const { toggleAll } = appActions;
export default function AppProvider({ children }) {
  const dispatch = useDispatch();
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [dispatch]);
  return (
    <ConfigProvider >
      {/* <IntlProvider> */}
        <ThemeProvider theme={themes['defaultTheme']}>{children}</ThemeProvider>
      {/* </IntlProvider> */}
    </ConfigProvider>
  );
}
