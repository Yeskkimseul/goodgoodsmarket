import React, { createContext, useContext, useEffect, useState } from "react";
import type { Review } from "../types/reivew";

interface ReviewContextType {
    reviews: Review[];
    setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

export const ReviewProvider = ({ children }: { children: React.ReactNode }) => {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        fetch("/data/reivew.json")
            .then(res => res.json())
            .then(data => setReviews(data));
    }, []);

    return (
        <ReviewContext.Provider value={{ reviews, setReviews }}>
            {children}
        </ReviewContext.Provider>
    );
};

export const useReview = () => {
    const context = useContext(ReviewContext);
    if (!context) throw new Error("useReview must be used within a ReviewProvider");
    return context;
};