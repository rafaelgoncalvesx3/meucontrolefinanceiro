import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';import History from '../screens/History';import Form from '../screens/Form';import Details from '../screens/Details';import Accounts from '../screens/Accounts';import Categories from '../screens/Categories';
import DRE from '../screens/DRE';
const Stack=createNativeStackNavigator();
export default function FinanceRoutes(){return <NavigationContainer><Stack.Navigator screenOptions={{headerTintColor:'#087F68',headerTitleStyle:{fontWeight:'700'},contentStyle:{backgroundColor:'#F3F6F5'}}}><Stack.Screen name="Home" component={Home} options={{title:'Visão geral'}}/><Stack.Screen name="History" component={History} options={{title:'Histórico'}}/><Stack.Screen name="Form" component={Form} options={{title:'Lançamento'}}/><Stack.Screen name="Details" component={Details} options={{title:'Detalhes'}}/><Stack.Screen name="Accounts" component={Accounts} options={{title:'Contas'}}/><Stack.Screen name="Categories" component={Categories} options={{title:'Categorias'}}/><Stack.Screen name="DRE" component={DRE} options={{title:'DRE gerencial'}}/></Stack.Navigator></NavigationContainer>;}
