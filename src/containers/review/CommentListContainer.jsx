import { useState } from "react";
import { useUser } from "@/hooks/auth/useUser";
import { useComments } from "@/hooks/review/useComments";
import { useAddComment } from "@/hooks/review/useAddComment";
import CommentList from "@/components/review/CommentList";

export default function CommentListContainer({ reviewId }) {
  const { user, isLoading: isUserLoading } = useUser();
  const [content, setContent] = useState("");
  const { data: comments, isLoading } = useComments(reviewId);
  const { mutate, isPending } = useAddComment(reviewId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUserLoading || !user || !content.trim()) return;

    mutate(
      {
        content,
        author: {
          uid: user.uid,
          displayName: user.displayName || "익명",
          photoURL: user.photoURL || "",
        },
      },
      {
        onSuccess: () => setContent(""),
      }
    );
  };
  return (
    <CommentList
      currentUserId={user?.uid}
      reviewId={reviewId}
      user={user}
      content={content}
      setContent={setContent}
      comments={comments}
      isLoading={isLoading}
      isPending={isPending}
      handleSubmit={handleSubmit}
    />
  );
}
