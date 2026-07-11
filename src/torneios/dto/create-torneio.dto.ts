export class CreateTorneioDto {
  nome!: string;
  dataInicio!: string;
  dataFim!: string;
  status!: 'INSCRICOES_ABERTAS' | 'EM_ANDAMENTO' | 'FINALIZADO';
}
