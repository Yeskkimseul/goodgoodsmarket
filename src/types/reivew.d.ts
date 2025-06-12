export interface Review {
    id: string;
    sellerName: string; // 리뷰 대상 판매자
    reviewer: {
        name: string;
        img: string;
    };
    date: string;
    reviewimg?: string[];
    content?: string; // (선택) 상세 리뷰 내용
    keywords: string[]; // 리뷰 키워드
    goods: {
        id: string;      // goods.json의 id
        title: string;
        imageUrl: string;
    };
    recommend: number;   // 추천수

}