import React from 'react';
import { ConfigProvider } from 'antd';
// import { IntlProvider } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import themes from 'config/theme/theme.config';
import AppLocale from 'config/translation';
import useWindowSize from 'utils/hooks/useWindowSize';
import appActions from 'redux/app/actions';

const { toggleAll } = appActions;
export default function AppProvider({ children }) {
  const dispatch = useDispatch();
  // const { locale } = useSelector(state => state.LanguageSwitcher.language);
  // const { themeName } = useSelector(state => state.ThemeSwitcher.changeThemes);
  // const currentAppLocale = AppLocale[locale];
  const { width, height } = useWindowSize();

  React.useEffect(() => {
    dispatch(toggleAll(width, height));
  }, [dispatch]);
  return (
    <ConfigProvider >
      {/* <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}
      >
      </IntlProvider> */}
        <ThemeProvider theme={themes['defaultTheme']}>{children}</ThemeProvider>
    </ConfigProvider>
  );
}
