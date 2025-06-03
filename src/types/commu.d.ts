export interface Commu {
    /* 데이터 타입지정 */
    id: string,
    title: string,
    description: string,
    category: string,
    imageUrl:string,
    likes: number,
    createdAt: string,
    views: number,
    tags: string[],
    userimgUrl: string,
    userName: string,
    commentsNum: number,
    comments: {
        id: string, 
        userimgUrl: string,
        userName: string,
        content: string,
        createdAt: string,
    }
}