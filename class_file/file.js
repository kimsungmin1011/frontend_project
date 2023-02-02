const SERVER_URL = 'http://127.0.0.1:8000'

async function postImage(formData) {
    let response = await fetch (`${SERVER_URL}/blog/image`, {
        method : 'POST',
        body : formData
    })
    let data = await response.json();
    return data;
}
async function submitImage() {
    let form = document.getElementById('form')
    let imageFormData = new FormData(form) // {image: 파일}
    let result = postImage(imageFormData);
    console.log(result)
}











// const SERVER_URL = 'http://127.0.0.1:8000'

// async function postImage(image) {
//   let response = await fetch(`${SERVER_URL}/blog/image`,{
//     method: 'POST',
//     body: image // formData 그대로 명시
//   });
//   let data = await response.json(); // 응답을 json 객체에서 자바스크립트 객체화
//   return data
// }