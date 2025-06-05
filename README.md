# Theia on Render

Eclipse Theia IDEをRenderでホスティングするプロジェクト

## 🎯 目的

- ブラウザベースのIDE環境構築
- クラウド開発環境の提供
- チーム開発の効率化

## 🚀 アクセス

**デプロイ後のURL**: `https://theia-on-render.onrender.com`

## 🛠️ 技術スタック

- **IDE**: Eclipse Theia IDE with Zowe Explorer
- **コンテナ**: Docker (`quay.io/zowe-explorer/theia:latest`)
- **ホスティング**: Render
- **対応言語**: JavaScript, Python, HTML/CSS, その他

## 📋 基本的な使い方

### 🎯 アクセス手順
1. **URLにアクセス** → IDE起動（初回は1-2分）
2. **workspace確認** → 左側のファイルエクスプローラー
3. **ターミナル起動** → `Ctrl + Shift + ` `
4. **プロジェクト開始** → 右クリックでファイル作成

### ⌨️ 主要ショートカット
- **ターミナル**: `Ctrl + Shift + ` `
- **ファイル検索**: `Ctrl + P`
- **コマンドパレット**: `Ctrl + Shift + P`
- **保存**: `Ctrl + S`

## 🔧 ローカル開発・テスト

```bash
# プロジェクトをクローン
git clone https://github.com/your-username/theia-on-render.git
cd theia-on-render

# Dockerでローカル実行
docker build -t theia-on-render .
docker run -it --rm \
  -p 3000:3000 \
  -v "$(pwd)/workspace:/home/project/workspace" \
  theia-on-render

# ブラウザでアクセス
open http://localhost:3000
