### 01-fundamentos-nodejs-desafio

<p align="center">
  <img src="https://user-images.githubusercontent.com/60658855/230261832-7989df92-e354-49af-8c45-dbaf9ed149d2.jpeg" width="500px"/>
</p>

Neste desafio fui desafiado a criar um servidor Node.js no padrão CRUD para cadastro de tasks com id único, titulo, descrição, data de criação, data de edição e data de conclusão (caso concluida), porém sem usar bibliotecas externas e sim apenas as api's nativas do node. 

Foi uma experiência muito enriquecedora e pude aprender muito como o node trabalha "por baixo dos panos" nas bibliotecas mais usadas no mercado hoje. Isso traz um contexto ótimo para resolução de problemas, encontrar causas de possiveis bugs epara criação de ferramentas no futuro.

### Desafios

- [x] - Criar rotas para os metodos HTTP: GET, POST, PUT, PATCH, DELETE
- [x] - Criar mecanismos para reconhecer Route Params, Query Params nas rotas GET, PUT, PATCH e DELETE. O método foi através de Regex.
- [x] - Ser capaz de capturar e processar os dados de acordo com os Route Params e Query Params, realizando pesquisas na chamada GET por exemplo.
- [x] - Criar um método de leitura através de streams para obter dados do Body da requisição nas rotas e poder salvar esses dados no DB.
- [x] - Criar uma classe de Database com os métodos a serem chamados pelas rotas (Inversão de dependências)
- [x] - Persistir os dados do DB em um arquivo fisico
- [x] - Criar um middleware de conversão de dados em json para requisição e resposta

*Extras*: Foi pedido para realizar a leitura de um arquivo .csv através da biblioteca `csv-parser` e inserir esses dados no DB chamando a rota POST para cada linha lida. Neste desafio extra foi o único momento em que utilizamos uma biblioteca externa no projeto.

### Uso

Para rodar o projeto, tenha o Node.js instalado na sua máquina.

- Clone o repositóro em um lugar de seu desejo.
- Navegue até a pasta onde o projeto foi clonado.
- Abra o terminal na pasta do projeto clonado
- Rode o comando CLI: `npm run dev`

Para testar as rotas do server use um programa como o [Insomnia](https://insomnia.rest/download)

### Rotas

- "/task" / método: GET - Retorna todas as tasks registradas no DB, é possível inserir o query param `?search=[VALOR_A_PESQUISAR]` na url para realizar pesquisas.
- "/task" / método : POST - Deve ser chamado com um Body contendo: title e description. Isso criará a task no DB com essas informações.
- "/task/:taskId" / método : PUT - Deve ser chamado com um Body contendo: title e/ou description. Isso atualizará essas informações na task com o referido id.
- "/task/:taskId" / método : PATCH - Dever ser chamado para alterar o status da task para completa ou incompleta. Essa informação se baseia no campo completed_at, onde caso seja `null` a tarefa está incompleta e caso tenha um timestamp a tarefa está completa.
- "/task/:taskId" / método : DELETE - Deve ser chamado caso uma tarefa tenha de ser deletada do DB.

### Conclusões

Esta tarefa foi um desafio proposto pelo Bootcamp da Rocketseat [Ignite](https://www.rocketseat.com.br/ignite). Aprendi mutios conceitos importantes de Node.js e que com certeza vão me ajudar a ter fundações sólidas para a realização de back-ends e API's em qualquer tecnologia ou linguagem no futuro.
