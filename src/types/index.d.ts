export interface Goods {
    /* 데이터 타입지정 */
    id: string,
    title: string,
    description: string,
    category: string,
    price: number,
    imageUrl:string,
    likes: number
    /* 굿즈라는 타입이 형식을 지켜줌 */
}