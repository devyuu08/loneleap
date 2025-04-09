// src/services/queries/useAddReview.js
import { useMutation } from "@tanstack/react-query";
import { db, storage } from "../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function useAddReview() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);

  return useMutation({
    mutationFn: async ({ title, destination, content, rating, image }) => {
      let imageUrl = "";

      if (image) {
        const imageRef = ref(storage, `reviews/${Date.now()}_${image.name}`);
        const snapshot = await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      await addDoc(collection(db, "reviews"), {
        title,
        destination,
        content,
        rating,
        imageUrl,
        authorId: user?.uid || "",
        authorName: user?.displayName || "익명",
        createdAt: serverTimestamp(),
      });
    },
    onSuccess: () => {
      alert("리뷰가 성공적으로 등록되었습니다!");
      navigate("/reviews");
    },
    onError: (error) => {
      console.error(error);
      alert("리뷰 등록 중 오류가 발생했습니다.");
    },
  });
}
