import { TenueBdd } from "../database/tenue-bdd";
export class Tenue extends TenueBdd{
    
    public id: number;
    public nom: string;
    public image: string;
    public pv: number;
    public puissance: number;
    public defense: number;
    public robot_id: number;
    
    public tenues: Tenue[];

    constructor(){
        super();
        this.getTenues();
    }

    getTenues(){
        this.getAllTenues().then((data: Tenue[]) => {
            this.tenues = [...data]
        });
    }

    updateTenueById(tenue: Tenue){
        this.updateTenue(tenue)
    }
}