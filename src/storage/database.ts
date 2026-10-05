import AsyncStorage from '@react-native-async-storage/async-storage';
import {Database} from '../types';
const KEY='@meu-controle-financeiro/v1';
export const initial: Database={version:1,contas:[{id:'carteira',nome:'Carteira',saldoInicial:0}],categorias:[{id:'salario',nome:'Salário',tipo:'receita'},{id:'outros-r',nome:'Outras receitas',tipo:'receita'},{id:'alimentacao',nome:'Alimentação',tipo:'despesa'},{id:'transporte',nome:'Transporte',tipo:'despesa'},{id:'moradia',nome:'Moradia',tipo:'despesa'}],lancamentos:[]};
export async function load(): Promise<Database> {
 const raw=await AsyncStorage.getItem(KEY); if (!raw) return initial;
 const d=JSON.parse(raw);
 if(d.version!==1||!Array.isArray(d.contas)||!Array.isArray(d.categorias)||!Array.isArray(d.lancamentos)) throw new Error('Formato de dados inválido.');
 const ids=(items: any[])=>items.every(x=>typeof x.id==='string')&&new Set(items.map(x=>x.id)).size===items.length;
 if(!ids(d.contas)||!ids(d.categorias)||!ids(d.lancamentos)||!d.contas.every((a:any)=>typeof a.nome==='string'&&Number.isSafeInteger(a.saldoInicial))||!d.categorias.every((c:any)=>typeof c.nome==='string'&&['receita','despesa'].includes(c.tipo))||!d.lancamentos.every((t:any)=>typeof t.descricao==='string'&&Number.isSafeInteger(t.valor)&&t.valor>0&&typeof t.data==='string'&&['receita','despesa'].includes(t.tipo)&&d.contas.some((a:any)=>a.id===t.contaId)&&d.categorias.some((c:any)=>c.id===t.categoriaId&&c.tipo===t.tipo))) throw new Error('Os dados salvos não puderam ser validados.');
 return d;
}
export const save=(db: Database)=>AsyncStorage.setItem(KEY,JSON.stringify(db));
