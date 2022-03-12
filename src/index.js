const express = require('express');
const { v4: uuidV4 } = require("uuid");
const app = express();

app.use(express.json());

const customers = [];

//middleware
function VerificaContaExistenteCpf(request, response, next) {
   const { cpf } = request.headers;
    //valida se o cliente existe e rotorna todas as informações deste cliente
   const customer = customers.find(customer => customer.cpf === cpf);
     //valida se existe conta
   if (!customer) {
    return response.status(400).json({error: "Esta Conta não Existe!"}) 
 };

 //cria uma prop dentro do request com valor de uma prop do middleware
 //todas rotas que usar este middleware conseguiram acessar esta prop 
 //atraves do [request.nomeprop];
 request.customer = customer;
   return next();
}

function getBalance(statement) {
  const balance = statement.reduce((acc,operacao) => {
        //se for credito adiciona senao diminue
        if(operacao.type === 'credito') {
            return acc + operacao.amount;
        }else{
            return acc - operacao.amount;
        }
    },0);
    return balance;
}
app.post("/account", (request,response) => {
    const {cpf,name} = request.body;
    //validação cpf
    const customerAlreadyExists = customers.some((customer) => customer.cpf === cpf);
     
    if (customerAlreadyExists) {
    return response.status(400).json({error: "Cpf Já Existente!"}); 
    }
    customers.push({
        cpf,
        name,
        id : uuidV4(),
        statement: []
    });
    
    return response.status(201).send();
});

app.put("/account", VerificaContaExistenteCpf, (request, response) => {
    const { name } = request.body;
    const { customer } = request;
    customer.name = name;
    return response.status(201).send();
})

app.get("/account",VerificaContaExistenteCpf, (request, response) => {
   const { customer } = request;
   return response.json(customer);

});

app.delete("/account", VerificaContaExistenteCpf , (request,response) => {
    const { customer  } = request;
    customers.splice(customer, 1);
    return response.status(200).json(customers);
})
//pode ser chamado dentro da rota e pelo app.use(VerificaContaExistenteCpf)
app.get("/statement", VerificaContaExistenteCpf, (request,response) => {
   const { customer} = request;

   return response.json(customer.statement);
});

app.post("/deposit", VerificaContaExistenteCpf, (request,response) => {
    const { customer} = request;
    const { description,amount } = request.body;

    const dadosOperacao = {
        description,
        amount,
        created_at: new Date(),
        type:"credito"
    }
    customer.statement.push(dadosOperacao);
    return response.status(201).send();
});

app.post("/withdraw", VerificaContaExistenteCpf, (request,response) => {
   const { customer} = request;  //busca conta
   const { amount } = request.body; //busca valor do saque
   const balance = getBalance(customer.statement); //verifica se credito e debito e adiciona

   //se saque for maior que saldo
   if(balance < amount) {
       return response.status(400).json({error: "saldo insuficinte"})
   }
   //senão adiciono valor de saque
   const dadosOperacao = {
     amount,
     created_at: new Date(),
     type: "debito",
 };
 //coloco minha operação dentro da conta
 customer.statement.push(dadosOperacao);

    return response.status(201).send();
 });

app.get("/statement/date", VerificaContaExistenteCpf, (request,response) => {
    const { customer } = request;
    const { date } = request.query;
    
    const dateFormat = new Date(date + " 00:00");

    const statement = customer.statement.filter(
        (statement) => 
        statement.created_at.toDateString() === 
        new Date(dateFormat).toDateString()
    );

    return response.json(statement);
 });

app.get("/balance", VerificaContaExistenteCpf, (request,response) => {
    const { customer } = request;
    const balance = getBalance(customer.statement);

    return response.json(balance);
}) 

app.listen(3333);