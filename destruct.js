//jeito novo de pegar variáveis de um objeto ou de passar em uma function

const pessoa = {
    name: "Ricardo",
    age: 25,
    city: "Belo Horizonte"
}

// Se não encontrar o valor, como por exemplo a cidade, irá pegar por default o valor de Betim
const {name, age, cidade = "Betim"} = pessoa

console.log(name)
console.log(age)
console.log(cidade)

// Dentro da function
const salvarPessoa = ({name, age}) => {
    console.log(name)
    console.log(age)
}

salvarPessoa(pessoa)