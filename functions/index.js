// 1. .env 불러오기 (항상 제일 위에 위치)
require("dotenv").config();

// 2. Firebase Functions v2 API import
const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// 3. Firebase Admin 초기화 (한 번만)
const admin = require("firebase-admin");
admin.initializeApp();

// 4. 커스텀 함수 등록 (예: naverCustomToken 등)
const { naverCustomToken } = require("./naverCustomToken");
exports.naverCustomToken = naverCustomToken;
