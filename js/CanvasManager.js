export default class CanvasManager {
    constructor(canvas, logicalWidth, logicalHeight) {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = logicalWidth * dpr * 4;
        canvas.height = logicalHeight * dpr * 4;

        this.ctx = canvas.getContext('2d');
        // scale your drawing operations back to 1:1 logical pixels
        this.ctx.scale(dpr * 4, dpr * 4);

        // turn off smoothing as above
        this.ctx.imageSmoothingEnabled = false;

        return this.ctx;
    }
}