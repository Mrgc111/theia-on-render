# 確実に動作するTheia (Quay.io公開版)
FROM quay.io/zowe-explorer/theia:latest

# 必要なパッケージをインストール
USER root
RUN apt-get update && apt-get install -y \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Node.jsが含まれているか確認、なければインストール
RUN which node || (curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && apt-get install -y nodejs)

# 作業ディレクトリ設定
WORKDIR /home/project

# package.jsonとAPIサーバーをコピー
COPY package.json api-server.js claude-api-server.js start.sh ./

# 実行権限を付与
RUN chmod +x start.sh

# npm依存関係をインストール
RUN npm install

# ワークスペース作成
RUN mkdir -p workspace

# プロジェクトファイルをコピー
COPY workspace/ ./workspace/

# ポート公開（Theia: 3000, API: 3001, Claude API: 3002）
EXPOSE 3000 3001 3002

# 権限を調整
RUN chown -R 1000:1000 /home/project

# ユーザーを切り替え
USER 1000

# 起動スクリプトを実行
CMD ["./start.sh"]