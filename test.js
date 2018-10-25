let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let w = 350;
let h = 200;

canvas.width = w;
canvas.height = h;

// 存储图片像素点的二维数组
let coordinates = [];
for (let i = 0; i < h; i++) {
    coordinates[i] = [];
}

let img = new Image;
img.src = '';
//图片路径
img.onload = function () {
    ctx.drawImage(img, 0, 0, w, h);
    let computeBtn =  document.querySelector('#computeBtn');
    computeBtn.onclick=compute;
}

function compute() {
    let data = ctx.getImageData(0, 0, w, h).data;//读取整张图片的像素。
    let x = 0, y = 0;
    for (let i = 0, len = data.length; i < len; i += 4) {
        let red = data[i],//红色色深
            green = data[i + 1],//绿色色深
            blue = data[i + 2],//蓝色色深
            alpha = data[i + 3];//透明度
        //把每个像素点，以二位数组的形式展开
        if (`${red} ${green} ${blue}` === '211 228 200') {
            coordinates[y][x] = 0;
        } else {
            coordinates[y][x] = 1;
        }
        x++;
        if (x >= w) {
            x = 0;
            y++;
        }
    }
    let rst = getCountAndArea();
    let content = document.querySelector('.content');
    
    console.log(`<div>个数：${rst.count}<div>`);
    for (let i = 0; i < rst.sum.length; i++) {
      console.log( `<div>第${i + 1}个面积为：${rst.sum[i].area} px<div>`);
    }
    content.innerHTML += html;
}

const getCountAndArea = () => {
    let sum = [];
    let count = 0;
            //连续1的个数
    if (coordinates[i][j] == 1) {
        let buf = 0;
        buf = linkSum(i, j, buf);
        count++;
        sum.push({
            index: count,
            area: buf
        });
    }
    return {
        count,
        sum
    };
}

//计算连续的面积和个数
const linkSum = (i, j, num) => {
   //走过的路就置0
   coordinates[i][j] = 0;

   num++;
   //向上
   if ((i + 1 < h) && coordinates[i + 1][j] == 1) {
      num = linkSum(i + 1, j, num);
   }
   //向下
   if ((j + 1 < w) && coordinates[i][j + 1] == 1) {
      num = linkSum(i, j + 1, num);
   }
   //向左
   if ((i - 1 >= 0) && coordinates[i - 1][j] == 1) {
      num = linkSum(i - 1, j, num);
   }
   //向右
   if ((j - 1 >= 0) && coordinates[i][j - 1] == 1) {
      num = linkSum(i, j - 1, num);
   }

   return num;
}