function buildTails(map) {
    let occupied = findOccupied(map);
    // console.log(occupied);
    let tails = [];
    for(let i=0;i<600;i+=6){
        for (let j=0;j<400;j+=6){
            if(!isOccupied([i,j], occupied)){
                tails.push([i,j]);
            }
        }
    }
    return tails;
}
function findOccupied(map) {
    let occupied = [];
    map.racks.forEach((r)=>{
        if(r.label !== 'Старт'){
            let x = r.position.x,
                y = r.position.y,
                d = r.angle;
            occupied.push([x,y,d]);
        }
    });
    return occupied;
}
function isOccupied(position, occupied) {
    for (let i=0;i<occupied.length;++i){
        let x = occupied[i][0]+90,
            y = occupied[i][1]-90,
            d = occupied[i][2];
        switch (d) {
            case 0: {
                if((position[0]>=x&&position[0]<x+198)&&(position[1]>=y&&position[1]<y+18)){
                    return true;
                }
                break;
            }
            case 90: {
                if((position[0]>=x&&position[0]<x+18)&&(position[1]>=y&&position[1]<y+198)){
                    return true;
                }
                break;
            }
            case 270: {
                if((position[0]>=x&&position[0]<x+18)&&(position[1]>=y&&position[1]<y+198)){
                    return true;
                }
                break;
            }
        }
    }
    return false;
}

export {buildTails};