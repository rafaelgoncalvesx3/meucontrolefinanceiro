export type Kind = 'receita' | 'despesa';
export type Account = {id: string; nome: string; saldoInicial: number};
export type DreGroup = 'receita' | 'deducao' | 'custo' | 'operacional' | 'outras';
export type Category = {id: string; nome: string; tipo: Kind; grupoDre?: DreGroup};
export type Transaction = {id: string; descricao: string; valor: number; data: string; tipo: Kind; contaId: string; categoriaId: string};
export type Database = {version: 1; contas: Account[]; categorias: Category[]; lancamentos: Transaction[]};
