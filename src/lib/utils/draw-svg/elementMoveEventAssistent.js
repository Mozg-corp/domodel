
function proceedNewElementMovement(paper, newElement, dragStartCorrection, positionCorrection) {
    $("#svg-container")
        .mousemove((e)=>{
            let dragStartPosition = { x: e.clientX, y: e.clientY};
            let position = calculatePosition(e.clientX+positionCorrection.x, e.clientY+positionCorrection.y);
            newElement.position(position.x, position.y);
            // newElement.position(e.clientX+positionCorrection.x, e.clientY+positionCorrection.y);
            let dragStart = calculatePosition(e.offsetX- dragStartPosition.x+dragStartCorrection.x, e.offsetY- dragStartPosition.y+dragStartCorrection.y);
            newElement.translate(
                // e.offsetX- dragStartPosition.x+dragStartCorrection.x,
                // e.offsetY- dragStartPosition.y+dragStartCorrection.y
                dragStart.x,
                dragStart.y
            );
            newElement.attr('./display', 'block');
            paper.on('cell:pointerclick', (e)=>{
                $("#svg-container").off('mousemove');
                paper.off('cell:pointerclick');
            });
            dragStartPosition = { x: e.clientX, y: e.clientY};
        });
}
function calculatePosition(x,y) {

    return {
        x: Math.round(x/6)*6,
        y: Math.round(y/6)*6
    }
}
function moveRect(rectTemplate, attrs, degree, graph, paper, dragStartPosition, dragStartCorrection, positionCorrection) {

    let newVRect = rectTemplate.clone();
    newVRect.attr({
        body:{
            fill: attrs.body.fill,
            'strokeWidth': 0.5,
        },
        label:{
            text: attrs.label.text,
            fill: attrs.label.fill
        }
    });
    newVRect.attr('./top', Math.floor(Math.random() * 10000));
    newVRect.rotate(degree);
    // Add remove button to the link.
    let tools = new joint.dia.ToolsView({
        tools: [new joint.linkTools.Remove()]
    });
    newVRect.addTo(graph);
    newVRect.findView(paper).addTools(tools);
    proceedNewElementMovement(paper, newVRect, dragStartPosition, dragStartCorrection, positionCorrection);
}

export {moveRect};