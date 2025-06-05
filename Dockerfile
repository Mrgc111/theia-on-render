# 確実に動作するTheia (Quay.io公開版)
FROM quay.io/zowe-explorer/theia:latest

# 作業ディレクトリ設定
WORKDIR /home/project

# ワークスペース作成
RUN mkdir -p workspace

# プロジェクトファイルをコピー
COPY workspace/ ./workspace/

# ポート公開
EXPOSE 3000

# Theia を起動（既存の設定を利用）
CMD ["yarn", "theia", "start", "/home/project/workspace", "--hostname=0.0.0.0", "--port=3000"]