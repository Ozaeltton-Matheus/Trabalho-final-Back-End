export class Torneio {
  id!: string;
  nome!: string;
  dataInicio!: string;
  dataFim!: string;
  status!: 'INSCRICOES_ABERTAS' | 'EM_ANDAMENTO' | 'FINALIZADO';
}
