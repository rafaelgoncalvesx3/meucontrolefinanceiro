import React,{createContext,useContext,useEffect,useRef,useState} from 'react';
import {ActivityIndicator,Text,View} from 'react-native';
import {Database} from '../types';
import {initial,load,save} from './database';
import {Button} from '../components/UI';
const Context=createContext<{db:Database;busy:boolean;commit:(change:(d:Database)=>Database)=>Promise<void>}>({db:initial,busy:false,commit:async()=>{}});
export const useFinance=()=>useContext(Context);
export function FinanceProvider({children}:{children:React.ReactNode}) {
 const [db,setDb]=useState(initial),[ready,setReady]=useState(false),[error,setError]=useState(''),[busy,setBusy]=useState(false); const current=useRef(initial),lock=useRef(false);
 async function boot(){setError('');try{const d=await load();current.current=d;setDb(d);setReady(true);}catch{setError('Não foi possível recuperar os dados. Tente novamente. Os dados existentes foram preservados.');}}
 useEffect(()=>{void boot();},[]);
 async function commit(change:(d:Database)=>Database){if(lock.current)throw new Error('Aguarde a operação anterior.');lock.current=true;setBusy(true);try{const next=change(current.current);await save(next);current.current=next;setDb(next);}finally{lock.current=false;setBusy(false);}}
 if(!ready)return <View style={{flex:1,justifyContent:'center',padding:24,gap:16}}>{error?<><Text>{error}</Text><Button title="Tentar novamente" onPress={()=>void boot()}/></>:<ActivityIndicator size="large"/>}</View>;
 return <Context.Provider value={{db,busy,commit}}>{children}</Context.Provider>;
}
