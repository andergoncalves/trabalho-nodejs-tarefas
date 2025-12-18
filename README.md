# trabalho-nodejs-tarefas

Dentro do diretorio img tem a imagem do fluxo de login e das tarefas assim como a estatistica. 
E também uma imagem das rotas testadas no Postman.

Rotas:

Usuário:
-- login do usuario --
http://localhost:3000/auth/login

-- registo do usuario --
http://localhost:3000/auth/register

-- solicitar informações do usuario --
http://localhost:3000/auth/me

-- Todas as tarefas tem que ter o bearer do usuário qualquer manutenção realizada pertence ao usuário logado --

Tarefas:
-- Lista tarefas cadastradas (GET)--
http://localhost:3000/tasks/

-- Criar Tarefa (POST)--
http://localhost:3000/tasks/

{
  "titulo": "Comprar Peru",
  "descricao": "Comprar Peru para o Natal"
}

-- Pesquisa por id da tarefa (GET)--
http://localhost:3000/tasks/6943e83a51fbce64c82ad853


-- Atualizar informações da tarefa (PUT)--
http://localhost:3000/tasks/6943e83a51fbce64c82ad853

{
  "titulo": "Comprar Peru pode ser Chester",
  "descricao": "Comprar Peru para o Natal"
}

-- Concluir a Tarefa mudando o status para CONCLUIDA (PATCH)--
http://localhost:3000/tasks/6943e83a51fbce64c82ad853/complete

-- Deletar tarefa (DELETE) --
http://localhost:3000/tasks/6943e9c251fbce64c82ad859

-- Estatisticas das Tarefas (GET)--
http://localhost:3000/tasks/stats

-- Filtar as tarefas que contenham a palavra chave do usuario logado --
http://localhost:3000/tasks/search?q=maça

-- Filtar todas as tarefas do usuario logado --
http://localhost:3000/tasks/search