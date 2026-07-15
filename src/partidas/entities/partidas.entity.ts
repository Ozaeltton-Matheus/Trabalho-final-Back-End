// modelo de dados para a entidade partidas 

export class Partidas{
    id : number;

    dataHora : Date;

    local : string;

    placarDuplaA : number;

    placarDuplaB : number;

    torneioId : number;

    duplaAId : number;

    duplaBId : number;
}