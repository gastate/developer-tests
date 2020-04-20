var carousel = document.getElementById('carousel');
var boxes = ['One', 'Two', 'Three', 'Four', 'Five'];
var current = 2;
for (let i = 0; i < boxes.length; i++) {
    var div = document.createElement('div');
    div.classList.add('box');
    div.innerHTML = boxes[i];
    div.id = `box${i + 1}`;
    carousel.appendChild(div);
}
update()

function previous() {
    current--;
    update();
}
function next() {
    current++;
    update();
}
function update() {
    var boxes = document.getElementsByClassName('box');
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].classList.remove('previous', 'next', 'current');

    }
    boxes[current - 1].classList.add('previous');
    boxes[current].classList.add('current');
    boxes[current + 1].classList.add('next');
}