const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.CLAUDE_API_PORT || 3002;

// ミドルウェア
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Claude API設定
const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VERSION = '2023-06-01';

// Claude APIキーの検証
const validateApiKey = (apiKey) => {
  return apiKey && apiKey.startsWith('sk-ant-');
};

// Claude APIを呼び出す
app.post('/api/claude/complete', async (req, res) => {
  try {
    const { apiKey, messages, model = 'claude-3-sonnet-20240229', max_tokens = 4096 } = req.body;

    if (!validateApiKey(apiKey)) {
      return res.status(400).json({ error: 'Invalid API key format' });
    }

    const response = await axios.post(
      ANTHROPIC_API_URL,
      {
        model,
        messages,
        max_tokens
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': ANTHROPIC_VERSION
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Claude API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.error || error.message
    });
  }
});

// コード分析エンドポイント
app.post('/api/claude/analyze-code', async (req, res) => {
  try {
    const { apiKey, code, language, task } = req.body;

    if (!validateApiKey(apiKey)) {
      return res.status(400).json({ error: 'Invalid API key format' });
    }

    const prompt = `あなたはエキスパートプログラマーです。以下のコードを分析してください。

言語: ${language || '自動検出'}
タスク: ${task || 'コードレビューと改善提案'}

コード:
\`\`\`${language || ''}
${code}
\`\`\`

以下の観点で分析してください：
1. コードの品質とベストプラクティス
2. 潜在的なバグやエラー
3. パフォーマンスの改善点
4. 可読性の向上案
5. 必要に応じて改善されたコードを提供`;

    const response = await axios.post(
      ANTHROPIC_API_URL,
      {
        model: 'claude-3-sonnet-20240229',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 4096
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': ANTHROPIC_VERSION
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Claude API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.error || error.message
    });
  }
});

// コード生成エンドポイント
app.post('/api/claude/generate-code', async (req, res) => {
  try {
    const { apiKey, description, language, context } = req.body;

    if (!validateApiKey(apiKey)) {
      return res.status(400).json({ error: 'Invalid API key format' });
    }

    const prompt = `プログラミングタスク：
${description}

要件：
- 言語: ${language || 'お任せ'}
${context ? `- コンテキスト: ${context}` : ''}

以下を提供してください：
1. 完全に動作するコード
2. 必要に応じてコメント
3. 使用方法の簡単な説明`;

    const response = await axios.post(
      ANTHROPIC_API_URL,
      {
        model: 'claude-3-sonnet-20240229',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 4096
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
          'anthropic-version': ANTHROPIC_VERSION
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Claude API error:', error.response?.data || error.message);
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.error || error.message
    });
  }
});

// ヘルスチェック
app.get('/api/claude/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Claude API Integration',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Claude API Server running on port ${PORT}`);
});