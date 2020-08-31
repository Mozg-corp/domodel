function 
buildMap(racks, drawer) {
    racks.forEach((r) => {
        if (r.label === 'Старт'){
            let group = drawer.group();
            // let circle = drawer.rect(r.width/*+60*/,r.width)
            let circle = drawer.circle(r.width/*+30*/)
                .move(r.x, r.y)
                .fill(r.fill);
            // let label = drawer.text("Вы"/*+' #'+r.top*/).move(r.x, r.y).fill('white');
            group.add(circle);
            // group.add(label);
        }else{
            let group = drawer.group();
            // let rect = '';
            // let label = '';
            // console.log("hjhjhjh"+r.label);
            if(r.label !== ''){
                let rect = drawer.rect(r.width/*+30*/, r.height)
                    .move(r.x, r.y)
                    .fill(r.fill);
                let label = drawer.text(r.label/*+' #'+r.top*/).move(r.x, r.y).fill('white');
                group.add(rect);
                group.add(label);
            }else{
                if (r.fill === 'green'){
                    let rect = drawer.circle(r.width-r.width*0.8)
                        .move(r.x, r.y)
                        .fill(r.fill);
                    group.add(rect);
                }else{
                    let rect = drawer.circle(r.width-r.width*0.8)
                        .move(r.x, r.y)
                        .fill(r.fill);
                    group.add(rect);
                }
            }
            // group.add(rect);
            // group.add(label);
        }
    });
}

export {buildMap};