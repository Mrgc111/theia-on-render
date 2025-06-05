# 完全にクリーンなTheia環境
FROM node:18

# 作業ディレクトリ
WORKDIR /home/theia

# Theiaをグローバルインストール
RUN npm install -g @theia/cli@1.44.0

# ワークスペース作成
RUN mkdir -p workspace

# ポート公開
EXPOSE 3000

# デバッグ情報表示
RUN echo "Theia installation check:" && \
    which theia && \
    theia --version || echo "Theia version check failed"

# Theiaを起動（フルパス指定）
CMD ["/usr/local/bin/theia", "start", "workspace", "--hostname=0.0.0.0", "--port=3000"]