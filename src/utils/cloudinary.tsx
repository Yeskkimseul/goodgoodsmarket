/* 파일을 업로드해서 url을 돌려주는 함수 */
export const uploadToCloudinary = async (file: File): Promise<string> => {
    //업로드할 데이터를 담을 FormData 박스를 만들기 
    const data = new FormData();
    data.append('file', file); //실제 파일을 넣음
    data.append('upload_preset', 'goodgoods_upload');

    const response = await fetch('https://api.cloudinary.com/v1_1/dvgcehc82/image/upload', {
        method: 'POST', //파일을 보내니까 post방식
        body: data, //FormData를 같이 보냄
    })

    //업로드 실패하면 에러를 던짐
    if (!response.ok) {
        throw new Error('업로드 실패');
    }
    //업로드 성공시 결과를 JSON으로 바꿈
    const result = await response.json();

    //그 안에 있는 이미지 주소를 리턴
    return result.secure_url;

}