// Image should come back to original position when zoomed in at one point and zoomed out at some other point


const canvas = new fabric.Canvas('canvas', {
    width: 900,
    height: 450,
    selection: false
});


const img = document.getElementById('img');
const reader = new FileReader();
const inputFile = document.getElementById('files');
const clearBtn = document.getElementById('clear');
const downloadBtn = document.getElementById('download');
let imgF = null;




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
        canvas.requestRenderAll();


        imgMove(canvas, img);
    })  
})




clearBtn.addEventListener('click', () => {
    canvas.getObjects().forEach((obj) => {
        canvas.remove(obj);
    })
})



const imgMove = (canvas, img) => {
    canvas.on('mouse:wheel', (opt) => {
        let delta = opt.e.deltaY;
        let zoom = canvas.getZoom();
        zoom *= 0.999 ** delta;
    
        if(zoom > 20){
            zoom = 20;
        }
    
        if(zoom < 0.5) {
            
            canvas.centerObject(img);
            canvas.requestRenderAll();
            zoom = 1;
            
        }
    
        
    
        canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
    
    })
}


downloadBtn.addEventListener('click', () => {
    
    
    const a = document.createElement('a');
    a.href = document.getElementById('canvas').toDataURL("image/png");
    a.download = "image.png";
    a.click();


})