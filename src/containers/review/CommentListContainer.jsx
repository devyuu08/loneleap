import { useCallback, useState } from "react";
import { useUser } from "@/hooks/auth/useUser";
import { useComments } from "@/hooks/review/useComments";
import { useAddComment } from "@/hooks/review/useAddComment";
import CommentList from "@/components/review/CommentList";

/**
 * CommentListContainer
 * - 리뷰에 작성된 댓글 목록을 조회하고, 신규 댓글을 작성하는 컨테이너 컴포넌트
 * - useComments 훅으로 댓글 목록 조회, useAddComment로 댓글 추가 처리
 * - 현재 사용자 정보와 입력 상태를 관리하여 CommentList 컴포넌트에 전달
 */

export default function CommentListContainer({ reviewId }) {
  const { user, isLoading: isUserLoading } = useUser();
  const [content, setContent] = useState("");
  const { data: comments, isLoading } = useComments(reviewId, {
    enabled: !!reviewId,
  });
  const { mutate, isPending } = useAddComment(reviewId);

  const handleSubmit = useCallback(
    (e) => {
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
    },
    [user, content, isUserLoading, mutate]
  );
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
