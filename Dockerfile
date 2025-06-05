# Eclipse Theia IDE (公式実験版)
FROM eclipse/theia-ide:latest

# 作業ディレクトリ設定
WORKDIR /home/theia

# ワークスペース作成
RUN mkdir -p workspace

# プロジェクトファイルをコピー
COPY workspace/ ./workspace/

# ポート公開
EXPOSE 3000

# Theia IDE を起動
CMD ["node", "/home/theia/src-gen/backend/main.js", "/home/theia/workspace", "--hostname=0.0.0.0", "--port=3000"]