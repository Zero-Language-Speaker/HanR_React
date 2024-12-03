import axios from 'axios';

export const fastapiAxios = axios.create({
    baseURL: "http://localhost:8000", // 기본 서버 주소 입력
    // baseURL: "https://aefa-61-98-48-27.ngrok-free.app"
    // headers: {
        
    // },
});

// 테스트용
export const expressAxios = axios.create({
    baseURL: "http://localhost:3001"
});