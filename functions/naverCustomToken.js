const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

exports.naverCustomToken = onRequest(async (req, res) => {
  const { code, state } = req.query;

  try {
    const tokenRes = await fetch("https://nid.naver.com/oauth2.0/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.NAVER_CLIENT_ID,
        client_secret: process.env.NAVER_CLIENT_SECRET,
        code,
        state,
      }),
    });

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    const profileRes = await fetch("https://openapi.naver.com/v1/nid/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const profile = await profileRes.json();
    const { id, email, name } = profile.response;

    const firebaseUid = `naver_${id}`;
    const firebaseToken = await admin.auth().createCustomToken(firebaseUid, {
      provider: "naver",
      email: email || "unknown@naver.com",
      name: name || "네이버 사용자",
    });

    res.json({ firebaseToken });
  } catch (error) {
    logger.error("네이버 로그인 실패", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
