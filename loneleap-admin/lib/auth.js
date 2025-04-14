// loneleap-admin/lib/auth.js

import { getAuth } from "firebase-admin/auth";

export async function verifyAdminToken(req, res) {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) {
    throw new Error("토큰이 없습니다.");
  }

  const decoded = await getAuth().verifyIdToken(token);

  // 관리자 이메일 리스트 체크
  const adminEmails = ["admin@gmail.com"];
  if (!adminEmails.includes(decoded.email)) {
    throw new Error("관리자 권한이 없습니다.");
  }

  return decoded;
}
