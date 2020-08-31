import Rack from './Rack';
import Link from './Link'

export default class Map {

    racks= [];
    links = [];

    constructor(graph) {

        let cells = graph.getCells().slice(1);

        cells.forEach((el)=>{
            if(el instanceof joint.dia.Link){
                let from = graph.getCell(el.get('source').id).attr('./top'),
                    to = graph.getCell(el.get('target').id).attr('./top');
                this.links.push(new Link(from, to));
            }else{
                this.racks.push(new Rack(el));
            }
        });
    }
}