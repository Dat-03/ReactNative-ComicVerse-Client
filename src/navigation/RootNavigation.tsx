import dynamicLinks from '@react-native-firebase/dynamic-links';
import {NavigationContainer} from '@react-navigation/native';
import {makeStyles, useThemeMode} from '@rneui/themed';
import React, {useCallback, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {useAppSelector} from '../hooks';
import {getAuthEnableSignIn} from '../redux/selectors/auth.selector';
import {getMode} from '../redux/selectors/thems.selector';
import {NavigationService, linking, navigationRef} from './NavigationService';
import AppNavigator from './navigators/AppNavigator';
import AuthNavigator from './navigators/AuthNavigator';

import {routes} from '../constants';
import {ComicService} from '../redux';

import {CustomToastBottom} from '../utils';

const RootNavigation = () => {
  const enableSignIn: boolean = useAppSelector(getAuthEnableSignIn);
  //theme
  const mode = useAppSelector(getMode);
  const {setMode} = useThemeMode();
  const [themeMode, setThemeMode] = useState<'dark-content' | 'light-content'>(
    () => {
      return mode === 'dark' ? 'dark-content' : 'light-content';
    },
  );

  useEffect(() => {
    setMode(mode);
    if (mode === 'dark') {
      setThemeMode('light-content');
    } else {
      setThemeMode('dark-content');
    }
  }, [mode]);

  // const handleDynamicLink = async (link: any) => {
  //   if (link) {
  //     if (link.url.includes('comicverse2.page.link/V9Hh/comicdetail')) {
  //       if (enableSignIn) {
  //         const uuid = link.url.split('comic_uuid=')[1];
  //         const {data} = await ComicService.getComicById(uuid);

  //         if (data.code === 200) {
  //           NavigationService.navigate(routes.COMICDETAIL, {
  //             data: data.data[0],
  //           });
  //         } else {
  //           CustomToastBottom('Comic not found');
  //         }
  //       }
  //     }
  //   }
  // };

  const handleDynamicLink = useCallback(
    async (link: any) => {
      if (link) {
        if (link.url.includes('comicverse2.page.link/V9Hh/comicdetail')) {
          if (enableSignIn) {
            const uuid = link.url.split('comic_uuid=')[1];
            const {data} = await ComicService.getComicById(uuid);

            if (data.code === 200) {
              NavigationService.navigate(routes.COMICDETAIL, {
                data: data.data[0],
              });
            } else {
              CustomToastBottom('Comic not found');
            }
          }
        }
      }
    },
    [enableSignIn],
  );

  useEffect(() => {
    dynamicLinks().getInitialLink().then(handleDynamicLink);
    return () => {};
  }, [handleDynamicLink]);

  useEffect(() => {
    console.log('hi');
    const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
    // When the component is unmounted, remove the listener
    return () => unsubscribe();
  }, [handleDynamicLink]);

  return (
    <NavigationContainer linking={linking} ref={navigationRef}>
      <StatusBar
        animated={true}
        showHideTransition={'slide'}
        backgroundColor={usestyles().Mode.backgroundColor}
        barStyle={themeMode}
      />

      {enableSignIn ? <AppNavigator /> : <AuthNavigator />}
      {/* <AppNavigator /> */}
    </NavigationContainer>
  );
};

export default RootNavigation;

const usestyles = makeStyles(({colors}) => ({
  Mode: {
    backgroundColor: colors.background,
  },
}));
