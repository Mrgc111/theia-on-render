# 最もシンプルなTheia構成
FROM node:18

WORKDIR /app

# Theiaを直接グローバルインストール
RUN npm install -g @theia/cli@1.44.0

# ワークスペース作成
RUN mkdir -p /workspace

# ポート公開
EXPOSE 3000

# シンプルに直接起動
CMD ["theia", "start", "/workspace", "--hostname=0.0.0.0", "--port=3000"]