import React from 'react';
import { Link } from "react-router-dom";

const categories = [
    { "id": "1", "name": "포토카드" },
    { "id": "2", "name": "인형" },
    { "id": "3", "name": "아크릴 굿즈" },
    { "id": "4", "name": "문구류" },
    { "id": "5", "name": "패션" },
    { "id": "6", "name": "음반" },
    { "id": "7", "name": "팬 라이트" },
    { "id": "8", "name": "잡지" },
    { "id": "9", "name": "티켓" },
    { "id": "10", "name": "팬 메이드" },
    { "id": "11", "name": "기타" }
]

const GoodsCategoryItem = () => {
    return (
        <ul>
            {categories.map((category) => (
                <li key={category.id}>
                    <Link to={`/goodscategory/${category.id}`}>
                        {category.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default GoodsCategoryItem;