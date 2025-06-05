FROM theiaide/theia:latest

WORKDIR /home/project

# ワークスペースディレクトリ作成
RUN mkdir -p workspace

# ファイルをコピー
COPY workspace/ ./workspace/

# ポート公開
EXPOSE 3000

# Theiaを起動（既にビルド済み）
CMD ["yarn", "theia", "start", "/home/project/workspace", "--hostname=0.0.0.0", "--port=3000"]