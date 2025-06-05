# Theia on Render

Eclipse Theia IDEをRenderでホスティングするプロジェクト

## 🎯 目的

- ブラウザベースのIDE環境構築
- Claude Code統合によるファイル横断分析
- 効率的なアプリケーション開発・設計

## 🚀 アクセス方法

Renderデプロイ後、提供されるURLでTheia IDEにアクセス

## 📁 プロジェクト構造

```
theia-on-render/
├── Dockerfile           # Docker設定
├── render.yaml          # Render設定
├── workspace/           # 実際の開発場所
│   └── README.md       # ワークスペース説明
├── .gitignore          # Git除外設定
└── README.md           # このファイル
```

## 🛠️ 技術スタック

- **IDE**: Eclipse Theia IDE
- **コンテナ**: Docker
- **ホスティング**: Render
- **ベースイメージ**: eclipse/theia-ide:latest

## 📋 使い方

1. **IDE起動**: RenderのURLにアクセス
2. **プロジェクト作成**: workspace内で開発
3. **ファイル編集**: Theia IDEで編集
4. **ターミナル**: `Ctrl+Shift+``で開く
5. **Git操作**: IDE内またはターミナルで実行

## 🎪 開発ワークフロー

1. **コード編集**: Theia IDE
2. **実行・テスト**: 統合ターミナル
3. **Git管理**: バージョン管理
4. **デプロイ**: 別サービスで本番環境

## 🔮 将来の拡張

- Claude Code拡張機能統合
- VS Code拡張機能サポート
- チーム開発機能
- カスタムテーマ・設定

## 🛠️ トラブルシューティング

### よくある問題

1. **起動しない**: Renderのログを確認
2. **ポートエラー**: render.yamlの設定確認
3. **ファイルが見えない**: workspace/の配置確認

### デバッグ方法

1. Renderダッシュボード → Logs
2. エラーメッセージの確認
3. 設定ファイルの見直し

## 📞 サポート

問題が発生した場合：
1. Renderのログを確認
2. GitHub Issuesで報告
3. 設定ファイルの見直し