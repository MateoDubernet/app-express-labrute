// import { ArmeBdd } from '../database/arme-bdd';

export class Arme{
    
    public id: number;
    public nom: string;
    public image: string;
    public puissance: number;
    public esquive: number;
    public robot_id: number;

    // public armes: Arme[];
    // private armeBdd = new ArmeBdd();

    constructor(){}

    // getArmes(){
    //     this.armeBdd.getAllArmes().then((data: Arme[]) => {
    //         this.armes = [...data]
    //     });
    // }
}