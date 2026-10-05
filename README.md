# Meu Controle Financeiro

Projeto final de Desenvolvimento de Sistemas para Dispositivos Móveis.
Integrantes: Rafael Henrique Gonçalves e Jhonatan Matheus Silva Fernandes.

Aplicativo React Native, Expo SDK 57 e TypeScript adaptado do template obrigatório https://github.com/isaalexandre10/projetoFinal (branch master). O template original permanece no histórico Git. A navegação utiliza React Navigation Native Stack.

## Executar
Instale Node.js 22.13 ou superior e, nesta pasta, execute:
```sh
npm install
npx expo start --tunnel
```
Use um Expo Go compatível com SDK 54. Para navegador: `npm run web`.
Validação estática: `npm run typecheck`.

## Funcionalidades
- Sete telas: visão geral, histórico, formulário, detalhes, contas e categorias.
- Cadastro, edição e exclusão confirmada de receitas e despesas.
- Busca e filtro de lançamentos, resumo do mês e saldo por conta.
- Cadastro de contas e categorias. Categorias vinculadas ao tipo do lançamento.
- Validação de descrição, valor positivo, data real e relacionamentos.
- Persistência local com AsyncStorage; dados recuperados ao reabrir.
- Valores armazenados em centavos inteiros; digite `25,90` ou `1.250,00`.

## Estrutura
`src/components`: Button, Field, Page, Choice e TransactionRow.
`src/screens`: sete telas; `src/navigation`: rotas.
`src/services`: cálculos e validações; `src/storage`: persistência e contexto.
`src/styles`: StyleSheet compartilhado; `src/types.ts`: entidades.
As telas de exemplo em `src/screen` pertencem ao template e não são utilizadas pelo app final.

## Modelo e dados
Conta 1:N Lançamento e Categoria 1:N Lançamento. PKs são identificadores string e FKs são contaId/categoriaId. O JSON versionado reúne as três coleções na chave `@meu-controle-financeiro/v1`.
O primeiro acesso cria Carteira e categorias padrão, sem lançamentos fictícios. Dados permanecem no dispositivo; desinstalar ou limpar dados pode apagá-los. Não há login, sincronização bancária ou serviço externo. AsyncStorage não fornece criptografia.

## Roteiro de teste no aparelho
1. Abra e navegue nas sete telas; confirme estados vazios.
2. Tente salvar sem descrição, com valor 0, negativo e texto; tente 2026-02-30. Deve bloquear.
3. Cadastre conta Banco com saldo inicial 100,00 e categoria Lazer/despesa.
4. Cadastre receita de 200,00 e despesa de 50,00 na conta Banco. Saldo esperado: R$ 250,00.
5. Busque a descrição e aplique filtros de receita/despesa.
6. Edite despesa para 70,00. Saldo esperado: R$ 230,00.
7. Cancele exclusão; depois confirme exclusão da despesa. Saldo esperado: R$ 300,00.
8. Feche e reabra. Conta, categoria e receita devem permanecer.
9. Confira teclado, rolagem e legibilidade em uma tela pequena.
Esse roteiro é de verificação manual; testes no aparelho devem ser feitos antes da apresentação.

## Módulo DRE
Filtro por mês AAAA-MM. Receitas brutas - deduções = receita líquida; menos custos = resultado bruto; menos despesas operacionais = resultado operacional; menos outras despesas = resultado do período. Margem = resultado / receita líquida, quando positiva. Saldo inicial fica fora da DRE. Classifique categorias de despesa na tela Categorias; a classificação recalcula inclusive períodos anteriores. Trata-se de DRE gerencial simplificada, pelo mês da data do lançamento, sem escrituração contábil ou regime de competência separado.
Teste: no mesmo mês, registre receita 1.000,00; dedução 100,00; custo 200,00; despesa operacional 150,00; outras 50,00. Esperado: líquida 900,00; bruto 700,00; operacional 550,00; resultado 500,00; margem 55,6%. Em outro mês, esses valores não devem aparecer.


