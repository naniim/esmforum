const bd = require('../bd/bd_utils.js');
const modelo = require('../modelo.js');

beforeEach(() => {
  bd.reconfig('./bd/esmforum-teste.db');
  // limpa dados de todas as tabelas
  bd.exec('delete from perguntas', []);
  bd.exec('delete from respostas', []);
});

test('Testando banco de dados vazio', () => {
  expect(modelo.listar_perguntas().length).toBe(0);
});

test('Testando cadastro de três perguntas', () => {
  modelo.cadastrar_pergunta('1 + 1 = ?');
  modelo.cadastrar_pergunta('2 + 2 = ?');
  modelo.cadastrar_pergunta('3 + 3 = ?');
  modelo.cadastrar_resposta(0,'2');
  modelo.cadastrar_resposta(1,'4');
  modelo.cadastrar_resposta(2,'6');
  const perguntas = modelo.listar_perguntas(); 
  expect(perguntas.length).toBe(3);
  expect(perguntas[0].texto).toBe('1 + 1 = ?');
  expect(perguntas[1].texto).toBe('2 + 2 = ?');
  expect(perguntas[2].num_respostas).toBe(0);
  expect(perguntas[1].id_pergunta).toBe(perguntas[2].id_pergunta-1);
  const respostas = modelo.get_respostas();
  expect(respostas.length).toBe(0);
  const primeira_pergunta = modelo.get_pergunta(0);
  expect(primeira_pergunta.id_pergunta).toBe(0);
  expect(primeira_pergunta.texto).toBe('1 + 1 = ?');
  const primeira_resposta = modelo.get_respostas[0];
  expect(primeira_resposta.id_pergunta).toBe(0);
  expect(primeira_resposta.texto).toBe('2');
});
