// import { TenueBdd } from "../database/tenue-bdd";

export class Tenue{
    
    public id: number;
    public nom: string;
    public image: string;
    public pv: number;
    public puissance: number;
    public defense: number;
    public robot_id: number;
    
    // public tenues: Tenue[];
    // private tenueBdd = new TenueBdd();

    constructor(){}

    // getTenues(){
    //     this.tenueBdd.getAllTenues().then((data: Tenue[]) => {
    //         this.tenues = [...data]
    //     });
    // }
}