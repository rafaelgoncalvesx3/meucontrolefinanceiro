import {Database, Transaction} from '../types';
export const money = (cents: number) => (cents/100).toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
export function parseMoney(value: string): number | null {
 const s=value.trim(); if (!/^-?(?:\d+|\d{1,3}(?:\.\d{3})+)(?:,\d{1,2})?$/.test(s)) return null;
 const n=Number(s.replace(/\./g,'').replace(',','.')); const c=Math.round(n*100);
 return Number.isSafeInteger(c) && Math.abs(c)<=99999999999 ? c : null;
}
export function validDate(s: string) {
 if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
 const d=new Date(s+'T12:00:00Z'); return !isNaN(d.getTime()) && d.toISOString().slice(0,10)===s;
}
export const today=()=>{const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;};
export function validate(t: Omit<Transaction,'id'>, db: Database) {
 if (!t.descricao.trim()) return 'A descrição é obrigatória.';
 if (!Number.isSafeInteger(t.valor)||t.valor<=0) return 'Informe um valor positivo, como 25,90.';
 if (!validDate(t.data)) return 'Informe uma data válida no formato AAAA-MM-DD.';
 if (!db.contas.some(a=>a.id===t.contaId)) return 'Selecione uma conta.';
 if (!db.categorias.some(c=>c.id===t.categoriaId&&c.tipo===t.tipo)) return 'Selecione uma categoria do tipo escolhido.';
 return '';
}
export const balance=(db: Database,id?: string)=> db.contas.filter(a=>!id||a.id===id).reduce((s,a)=>s+a.saldoInicial,0)+db.lancamentos.filter(t=>!id||t.contaId===id).reduce((s,t)=>s+(t.tipo==='receita'?t.valor:-t.valor),0);
export const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,10);

export const dreGroups=[{id:'receita',nome:'Receitas brutas'},{id:'deducao',nome:'Deduções da receita'},{id:'custo',nome:'Custos'},{id:'operacional',nome:'Despesas operacionais'},{id:'outras',nome:'Outras despesas'}];
export function dre(db: Database, month: string) {
 const totals={receita:0,deducao:0,custo:0,operacional:0,outras:0};
 for(const t of db.lancamentos.filter(t=>t.data.startsWith(month+'-'))){const c=db.categorias.find(c=>c.id===t.categoriaId);const group=t.tipo==='receita'?'receita':(c?.grupoDre&&c.grupoDre!=='receita'?c.grupoDre:'operacional');totals[group]+=t.valor;}
 const liquida=totals.receita-totals.deducao,bruto=liquida-totals.custo,operacional=bruto-totals.operacional,resultado=operacional-totals.outras;
 return {...totals,liquida,bruto,resultadoOperacional:operacional,resultado,margem:liquida>0?resultado/liquida*100:null};
}
