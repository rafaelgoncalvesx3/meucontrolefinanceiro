import React from 'react';
import {StatusBar} from 'expo-status-bar';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {FinanceProvider} from './src/storage/FinanceContext';
import FinanceRoutes from './src/navigation/FinanceRoutes';
export default function App(){return <SafeAreaProvider><FinanceProvider><StatusBar style="dark"/><FinanceRoutes/></FinanceProvider></SafeAreaProvider>;}
