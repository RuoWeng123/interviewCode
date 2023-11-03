// promise 实现图片的异步加载
let imageAsync = (url) =>{
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.src = url;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(new Error('load image failed'));
    };
  });
}