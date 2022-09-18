// import { BouclierBdd } from '../database/bouclier-bdd';

export class Bouclier{
    
    public id: number;
    public nom: string;
    public image: string;
    public defense: number;
    public esquive: number;
    public robot_id: number;
    
    // public boucliers: Bouclier[];
    // private bouclierBdd = new BouclierBdd();

    constructor(){}

    // getBoucliers(){
    //     this.bouclierBdd.getAllBoucliers().then((data: Bouclier[]) => {
    //         this.boucliers = [...data]
    //     });
    // }
}