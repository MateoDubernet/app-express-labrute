import { ArmeBdd } from '../database/arme-bdd';
export class Arme extends ArmeBdd{
    
    public id: number;
    public nom: string;
    public image: string;
    public puissance: number;
    public esquive: number;
    public robot_id: number;

    public armes: Arme[];

    constructor(){
        super();
        this.getArmes();
    }

    getArmes(){
        this.getAllArmes().then((data: Arme[]) => {
            this.armes = [...data]
        });
    }
}