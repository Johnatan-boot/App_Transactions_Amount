const transactionsUl = document.querySelector('#transactions') /*listar transações*/ 
const incomeDisplay = document.querySelector('#money-plus') /*valor total da receita*/ 
const expenseDisplay = document.querySelector('#money-minus') /*valor total das Despezas*/ 
const balanceDisplay = document.querySelector('#balance') /*balanceDisplay= exibição de equilibrio*/ 
const form = document.querySelector('#form') /*Adiciona e Deleta transações do formulario*/ 
const inputTransactionName = document.querySelector('#text')/*Referência dos campos input Nome da transação*/
const inputTransactionAmount = document.querySelector('#amount')/*Referência dos campos input valor da transação*/ /* amount= quantidade*/
const localStorageTransactions = JSON.parse( /* Adcionar transações, e deletar transações vazias */
  /*Armazenar transações no LocalStorage*/
  localStorage.getItem('transactions'))
let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : []
  
  /* Remover  transações */
const removeTransaction = (ID) => {  /*Remove Transações*/
  transactions = transactions.filter((transaction) => transaction.id !== ID)
  updateLocalStorage()
  init()
}

  /* Adcionar   transações na DOOM */
const addTransactionIntoDom = ({ amount, name, id }) => {  /* Func. Add lista de transaç. a doom */
const operator = amount < 0 ? '-' : '+'
const CSSClass = amount < 0 ? 'minus' : 'plus'  /*minus= trnsações - plus=receitas +*/
const amountWithoutoperator = Math.abs(amount) /*Math.abs = remove operador da transação*/
const li = document.createElement('li') /* createElement = metodo para criar elemento html*/

  li.classList.add(CSSClass)
  li.innerHTML = `
${name} 
<span>${operator} R$ ${amountWithoutoperator}</span>
<button class="delete-btn" onclick="removeTransaction(${id})">x</button>
`
transactionsUl.append(li) /*append = metodo que adciona transações como a ultima ou a mais recente transação*/
}   /*revisado*/

const getExpenses = transactionsAmounts => Math.abs(transactionsAmounts   /*Função que resulta em todo encadeamento que  está resultando*/
      .filter(value => value < 0)
      .reduce((accumulator, value) => accumulator + value, 0))
  .toFixed(2)     /*revisado*/

  const getIncome = transactionsAmounts => transactionsAmounts
  .filter(value => value > 0) /* .filter = high order Funtion  recebe função por argumento e executa a função para cada item do array ser ultilizado quando em um array voce precisar obter uma novo array trazido alguns itens  do array original*/
  .reduce((accumulator, value) => accumulator + value, 0)
  .toFixed(2)      /*revisado*/

const getTotal = transactionsAmounts => transactionsAmounts
.reduce((accumulator, transaction) => accumulator + transaction, 0)  /*reduce = recebe função por argumento e executa a função para cada item do array somente ultilizar quando quiser reduzir algum dado */
.toFixed(2)      /*revisado*/

 /* Atualiza valores e saldo das transações na tela*/
const updateBalanceValues = () => { /*função que executa o refletimento dos valores na tela */
const transactionsAmounts = transactions.map(({amount}) => amount)  /*map = gera msm valores quantidades de itens com cada item transformado, para gerar uma array de números*/
const total = getTotal(transactionsAmounts)
const income = getIncome(transactionsAmounts)
const expense = getExpenses(transactionsAmounts)

balanceDisplay.textContent = `R$ ${total}` /*Exibir Saldo Total na tela*/ 
incomeDisplay.textContent  = `R$ ${income}`
expenseDisplay.textContent = `R$ ${expense}` /*valor total das Despezas*/ 
}                /*revisado*/

const init = () => {
  transactionsUl.innerHTML = ''
  transactions.forEach(addTransactionIntoDom)
  updateBalanceValues()
}
init() /*função que executa o preenchimento das informações do estado da app, quando pagina é carregada, adciona transações a Doom*/

/*Função que Adciona transação ao LocalStorage*/
const updateLocalStorage = () =>  /*Função que Adciona transação ao LocalStorage*/
  localStorage.setItem('transactions', JSON.stringify(transactions))


const addToTransactionsArray = (transactionName, transactionAmount) => { /* função que Criando e adcionando transação nos arrays*/
  transactions.push({
    id: generateID(),
    name: transactionName,
    amount: Number(transactionAmount) /*objeto que insere a transação*/
  })
}

const cleanInputs = () => {
  inputTransactionName.value = ''  /*Limpa os campos*/
  inputTransactionName.value = ''/*Limpa os campos*/
}
/*Função que lida com envio do  Formulário das transções*/
const handleFormSubmit = event => {  /*Função que lida com envio do  Formulário das transções*/
  event.preventDefault() /*impedimento que o form seja enviado e a pagina seja recarregada*/

const transactionName = inputTransactionName.value.trim() /*contante que insere os nomes nos inputs*/
const transactionAmount = inputTransactionAmount.value.trim()/*contante que insere os valores nos inputs*/
const isSomeInputEmpty = transactionName === '' || transactionAmount === ''

  if (isSomeInputEmpty) {/*verificação e alerta do não preenchimento dos campos nome e quantidade de trnsações isSomeInputEmpty= entrada vazia  */
    alert('Por favor, preencha tanto o nome quanto o valor da transação')
    return

}
  addToTransactionsArray(transactionName, transactionAmount)
  init() /*Atualização na tela*/
  updateLocalStorage()
  cleanInputs()
 
}
const generateID = () => Math.round(Math.random() * 1000) /*Função que gera numero aleatório*/
form.addEventListener('submit', handleFormSubmit)





  









 
  


 


