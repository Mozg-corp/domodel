import {makeRectTemplate} from './makeElementTemplate';

export default function (graph, paper, rectTemplate) {
    graph = new joint.dia.Graph;
    paper = new joint.dia.Paper({
        el: document.getElementById('svg-container'),
        model: graph,
        width: 600,
        height: 400,
        gridSize: 2,
        drawGrid: {
            name: 'doubleMesh',
            args: [
                {color: 'green', thickness: 0.5}, // settings for the primary mesh
                {color: 'blue', scaleFactor: 3, thickness: 1} //settings for the secondary mesh
            ]
        }
    });
    paper.on({
        'cell:pointerdblclick': (e, je, x, y) => {
            if (!$('#category').length) {
                let label = e.model,
                    old_label_text = label.attr('label/text');
                e.model.attr('label/text', '');
                //$('body').append('<div></div>').css('width=198px').css('height= 18px');
                $('#svg-controls').before('<div id="category"><input type="text" name="category" placeholder="Введите название категории" \></div>');
                $('#category').css({
                    'width': 'auto',
                    'height': 'auto',
                    'background-color': 'lightblue',
                    'margin': '10px auto'
                });
                $('#category input').focus().css({
                    'width': 300,
                    'height': 'auto',
                    'margin-left': '50%',
                    'transform': 'translateX(-50%)',
                    'padding-left': 37
                }).on('input', (e) => {
                    label.attr('label/text', e.target.value);
                }).on("keyup", (e) => {
                    let keycode = e.keyCode || e.which;
                    if (keycode == '27') {
                        e.target.value = '';
                        $('#category input').off('input').off('keypress');
                        $('#category').remove();
                        label.attr('label/text', old_label_text);
                    } else if (keycode == '13') {
                        e.target.value = '';
                        $('#category input').off('input').off('keypress');
                        $('#category').remove();
                    }
                });
            }
        }
    });
    rectTemplate = makeRectTemplate();
    rectTemplate.addTo(graph);

    return {graph, paper, rectTemplate}
}