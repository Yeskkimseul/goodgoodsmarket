export interface Reply { //대댓글
    id: string;
    userimgUrl: string;
    userName: string;
    content: string;
    createdAt: string;
}

export interface Comment { //댓글
    id: string;
    userimgUrl: string;
    userName: string;
    content: string;
    commentlikes: number;
    createdAt: string;
    replies?: Reply[];
}

export interface Commu {
    /* 데이터 타입지정 */
    id: string,
    title: string,
    description: string,
    category: string,
    imageUrl?: string,
    likes: number,
    createdAt: string,
    views: number,
    tags: string[],
    userimgUrl: string,
    userName: string,
    commentsNum: number,
    comments: Comment[];
}