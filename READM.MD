## FinAPI - Financeira
### Requisitos

-[x] Deve ser possível criar uma conta  <br/> 
-[x] Deve ser possível buscar o extrato bancário do cliente  <br/> 
-[x] Deve ser possível realizar um depósito  <br/> 
-[x] Deve ser possível realizar um saque  <br/> 
-[x] Deve ser possível buscar o extrato bancário do cliente por data  <br/> 
-[x] Deve ser possível atualizar dados da conta do cliente  <br/> 
-[x] Deve ser possível obter dados da conta do cliente   <br/> 
-[x] Deve ser possível deletar uma conta  <br/> 

### Regras de Negócio

-[x] Não Deve ser possível cadastrar uma conta com CPF já existente  <br/> 
-[x] Não Deve ser possível fazer depósito em uma conta não existente  <br/> 
-[x] Não Deve ser possível buscar extrato em uma conta não existente  <br/> 
-[x] Não Deve ser possível fazer saque em uma conta não existente  <br/> 
-[x] Não Deve ser possível exclir uma conta não existente  <br/> 
-[x] Não Deve ser possível fazer saque quando o saldo for insuficiente  <br/> 
-[x] Não Deve ser possível retornar o balanço da conta  <br/> 

### Dados da conta
> cpf : string  <br/> 
> name : string  <br/> 
> id - uuid  <br/> 
> statement []   <br/> 

### Teste com Insomnia
> Para testar a Api, basta clicar no botão abaixo e será direcionado para um ambiente de teste do Insomnia.

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Fin-Api&uri=https%3A%2F%2Fraw.githubusercontent.com%2FLeandro-Faustino%2FFin-API%2Fmaster%2FInsomnia.json)
