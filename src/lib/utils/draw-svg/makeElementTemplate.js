
function makeRectTemplate() {

    let rect = new joint.shapes.standard.Rectangle();
    rect.resize(198,18);
    rect.attr('./display', 'none');

    return rect;
}

export {makeRectTemplate};