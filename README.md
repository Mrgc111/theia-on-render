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
  -p 3001:3001 \
  -v "$(pwd)/workspace:/home/project/workspace" \
  -e CLAUDE_API_KEY=your-api-key \
  theia-on-render

# ブラウザでアクセス
open http://localhost:3000
```

## 🤖 Claude API統合機能

### 🎉 Claude APIサブスクリプションの活用

あなたのClaude APIサブスクリプションをTheia IDE内で直接使用できます！

### 主な機能

1. **Claude Assistant** (`workspace/claude-assistant.html`)
   - 🤖 AIアシスタントとのチャット
   - 🔍 コード分析・レビュー
   - ✨ コード生成
   - 🔧 リファクタリング提案
   - 📝 ドキュメント生成

2. **使い方**
   - Theia IDEで`workspace/claude-assistant.html`を開く
   - Anthropic APIキー（`sk-ant-api03-...`）を入力
   - 「接続テスト」で動作確認
   - コードについて質問したり、生成依頼が可能

### 機能詳細

#### 💬 チャットモード
- Claudeと対話形式でコーディング支援
- コードの説明、デバッグ、最適化提案

#### 🔍 コード分析
- 既存コードの品質分析
- バグの検出と修正提案
- パフォーマンス改善点の指摘

#### ✨ コード生成
- 自然言語での要件からコード生成
- 複数言語対応（JS, Python, Java等）
- ベストプラクティスに従ったコード

#### 🔧 便利機能
- コードのワンクリックコピー
- 言語自動検出
- チャット履歴の保存

### APIキーの取得方法
1. [Anthropic Console](https://console.anthropic.com/)にアクセス
2. API Keysセクションで新規キー作成
3. `sk-ant-api03-`で始まるキーをコピー
4. Claude Assistantに貼り付け

## 🛠️ ファイル編集機能

### Claude Code Integration（ファイル管理）

### 概要
Theia IDEにClaude Codeと連携してファイルを編集・追加する機能を統合しました。

### 機能
- **ファイル操作**: 読み取り、書き込み、削除
- **ディレクトリブラウザ**: ファイル一覧表示
- **コードエディタ**: ブラウザ上でのファイル編集
- **コマンド実行**: 制限付きコマンド実行
- **APIキー認証**: セキュアなアクセス制御

### アクセス方法
1. Theia IDEを起動
2. `workspace/claude-code-integration.html`をブラウザで開く
3. 「接続テスト」ボタンをクリックして開始

### APIエンドポイント
- `GET /api/files/*` - ファイル読み取り
- `PUT /api/files/*` - ファイル書き込み
- `DELETE /api/files/*` - ファイル削除
- `GET /api/directory/*` - ディレクトリ一覧
- `POST /api/execute` - コマンド実行
- `GET /api/health` - ヘルスチェック

### セキュリティ
- APIキーによる認証（オプション）
- ファイルアクセスは`workspace`ディレクトリに制限
- 実行可能コマンドの制限

### 環境変数
- `ENABLE_AUTH`: 認証を有効化する場合は`true`（デフォルト: 無効）
- `CLAUDE_API_KEY`: 認証有効時のAPIキー
- `API_PORT`: APIサーバーポート（デフォルト: 3001）