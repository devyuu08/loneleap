import { getAuth } from "firebase-admin/auth";

export async function verifyAdminToken(req, res) {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    console.log("[auth] 토큰 없음");
    throw new Error("토큰이 없습니다.");
  }

  try {
    const decoded = await getAuth().verifyIdToken(token);

    // 관리자 이메일 리스트 체크
    const adminEmails = ["admin@gmail.com"];
    if (!adminEmails.includes(decoded.email)) {
      console.log("[auth] 관리자 아님:", decoded.email);
      throw new Error("관리자 권한이 없습니다.");
    }

    return decoded;
  } catch (error) {
    console.error("[auth] verifyIdToken 실패:", error.code, error.message);
    throw new Error("토큰 검증 실패");
  }
}
