'use client';

import { useState } from 'react';

interface UpvoteButtonProps {
    storeId: string;
    initialVoteCount?: number;
    onVote?: (newCount: number) => void;
}

const UpvoteButton = ({initialVoteCount = 0, onVote }: UpvoteButtonProps) => {
    const [voteCount, setVoteCount] = useState(initialVoteCount);
    const [isVoting, setIsVoting] = useState(false);

    const handleUpvote = async () => {
        try {
            setIsVoting(true);
            const newCount = voteCount + 1;
            setVoteCount(newCount);
            onVote?.(newCount);
            
        } catch (error) {
            console.error('Error upvoting:', error);
        } finally {
            setIsVoting(false);
        }
    };

    return (
        <button 
            className="flex items-center gap-2 mt-4 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleUpvote}
            disabled={isVoting}
        >
            <span className="text-xl">⭐</span>
            <span className="font-bold">{voteCount}</span>
        </button>
    );
};

export default UpvoteButton;