import React, { useEffect } from "react";
import { NativeRouter, Route } from "react-router-native";
import Stack from 'react-router-native-stack';
import { useDispatch } from 'react-redux';

import CustomStatusBar from './CustomStatusBar';
import Home from './screens/Home';
import AddCrypto from './screens/AddCrypto';
import { getCryptos, getUpdatedCryptos } from './store/actions/crypto';

export default function Navigator(props) {
  const dispatch = useDispatch();

  useEffect(() => {
      getCryptosList();
  }, []);

  const getCryptosList = async () => {
      await dispatch(getCryptos(true));
      await dispatch(getUpdatedCryptos());
  }

  return (
      <NativeRouter>
          <CustomStatusBar backgroundColor="rgba(56, 87, 117, 1)" barStyle={"light-content"} />
          <Stack>
            <Route exact path="/add" component={AddCrypto} />
            <Route exact path="/" component={Home} />
          </Stack>
      </NativeRouter>
  );
}
