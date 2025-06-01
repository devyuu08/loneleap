const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
const fetch = require("node-fetch");
const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });

exports.naverCustomToken = onRequest((req, res) => {
  cors(req, res, async () => {
    const { code, state } = req.query;

    const clientId =
      process.env.NAVER_CLIENT_ID || functions.config().naver.client_id;

    const clientSecret =
      process.env.NAVER_CLIENT_SECRET || functions.config().naver.client_secret;

    if (!code || !state) {
      return res.status(400).json({ error: "Missing code or state" });
    }

    try {
      const tokenRes = await fetch("https://nid.naver.com/oauth2.0/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: clientId,
          client_secret: clientSecret,
          code,
          state,
        }),
      });

      if (!tokenRes.ok) {
        const errorText = await tokenRes.text();
        logger.error("네이버 access_token 발급 실패", errorText);
        return res
          .status(400)
          .json({ error: "네이버 access_token 발급 실패", detail: errorText });
      }

      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access_token;

      const profileRes = await fetch("https://openapi.naver.com/v1/nid/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const profile = await profileRes.json();

      if (process.env.NODE_ENV !== "production") {
        logger.info("네이버 프로필 전체 응답", profile);
      }

      // 결과코드 실패 시 즉시 종료
      if (profile.resultcode !== "00") {
        logger.error("resultcode 실패", profile);
        return res
          .status(400)
          .json({ error: "resultcode 실패", detail: profile });
      }

      // response 없으면 종료
      if (!profile.response) {
        logger.error("response 없음", profile);
        return res
          .status(400)
          .json({ error: "response 없음", detail: profile });
      }

      // id가 없거나 잘못된 타입이면 종료
      const { id, email, name, profile_image: photoURL } = profile.response;

      if (!id || typeof id !== "string") {
        logger.error("id 누락 또는 잘못된 타입", profile.response);
        return res.status(400).json({ error: "id 오류", detail: profile });
      }

      const firebaseUid = `naver_${id}`;

      try {
        await admin.auth().getUser(firebaseUid);
      } catch (error) {
        if (error.code === "auth/user-not-found") {
          await admin.auth().createUser({
            uid: firebaseUid,
            email: email || "unknown@naver.com",
            displayName: name || "네이버 사용자",
            photoURL:
              typeof photoURL === "string" && photoURL.startsWith("http")
                ? photoURL
                : "https://loneleap-client.web.app/images/default-profile.png",
          });
        } else {
          throw error;
        }
      }

      const customToken = await admin.auth().createCustomToken(firebaseUid, {
        provider: "naver",
      });

      res.status(200).json({ firebaseToken: customToken });
    } catch (error) {
      logger.error("네이버 로그인 실패", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
});
