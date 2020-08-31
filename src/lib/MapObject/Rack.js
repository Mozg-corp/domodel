export default class Rack {

    constructor(rack) {
            this.position = rack.position();
            this.width = (rack.size()).width;
            this.height = (rack.size()).height;
            this.label = rack.attr('label/text');
            this.fill = rack.attr('body/fill');
            this.angle = rack.angle();
            this.top = rack.attr('./top');
    }
}