import { BouclierBdd } from '../database/bouclier-bdd';
export class Bouclier extends BouclierBdd{
    
    public id: number;
    public nom: string;
    public image: string;
    public defense: number;
    public esquive: number;
    public robot_id: number;
    
    public boucliers: Bouclier[];

    constructor(){
        super();
        this.getBoucliers();
    }

    getBoucliers(){
        this.getAllBoucliers().then((data: Bouclier[]) => {
            this.boucliers = [...data]
        });
    }

    updateBouclierById(bouclier: Bouclier){
        this.updateBouclier(bouclier)
    }
}