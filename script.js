const canvas = new fabric.Canvas('canvas', {
    width: 900,
    height: 450,
    selection: false
});


const reader = new FileReader();
const inputFile = document.getElementById('files');
const clearBtn = document.getElementById('clear');
const downloadBtn = document.getElementById('download');
let image;


const imgAdded = (e) => {
    const inputElement = document.getElementById('files');
    const file = inputElement.files[0];

    reader.readAsDataURL(file);
}



inputFile.addEventListener('change', imgAdded);

reader.addEventListener('load', () => {
    fabric.Image.fromURL(reader.result, img => {
        canvas.add(img);
        canvas.centerObject(img);
        image = img;
        canvas.requestRenderAll();
    });
});




clearBtn.addEventListener('click', () => {
    canvas.getObjects().forEach((obj) => {
        canvas.remove(obj);
    });
})




downloadBtn.addEventListener('click', () => {

    const a = document.createElement('a');
    a.href = document.getElementById('canvas').toDataURL("image/png");
    a.download = "image.png";
    a.click();

});



canvas.on('mouse:wheel', function (opt) {
    let delta = opt.e.deltaY;
    let zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;

    if (zoom > 20) {
        zoom = 20;
        this.lastPosX = opt.e.clientX;
        this.lastPosY = opt.e.clientY;
    }

    if (zoom < 0.5 && (this.lastPosX !== opt.e.clientX && this.lastPosY !== opt.e.clientY)) {
        zoom = 1;
        this.clear();
        this.add(image);
        this.centerObject(image);
        this.requestRenderAll();
    }

    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();

});