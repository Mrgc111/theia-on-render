const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const { exec } = require('child_process');
const util = require('util');
const execPromise = util.promisify(exec);

const app = express();
const PORT = process.env.API_PORT || 3001;

// ミドルウェア
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// 認証を無効化（ローカル環境用）
const ENABLE_AUTH = process.env.ENABLE_AUTH === 'true';
const API_KEY = process.env.CLAUDE_API_KEY || 'default-api-key';

const authenticateApiKey = (req, res, next) => {
  if (!ENABLE_AUTH) {
    return next();
  }
  
  const apiKey = req.headers['x-api-key'];
  if (apiKey !== API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};

// ベースディレクトリ（セキュリティのため制限）
const BASE_DIR = path.resolve('/home/project/workspace');

// パスの検証
const validatePath = (filePath) => {
  const resolved = path.resolve(BASE_DIR, filePath);
  return resolved.startsWith(BASE_DIR);
};

// ファイル読み取り
app.get('/api/files/*', authenticateApiKey, async (req, res) => {
  try {
    const filePath = req.params[0];
    if (!validatePath(filePath)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const fullPath = path.join(BASE_DIR, filePath);
    const content = await fs.readFile(fullPath, 'utf8');
    const stats = await fs.stat(fullPath);
    
    res.json({
      path: filePath,
      content: content,
      size: stats.size,
      modified: stats.mtime
    });
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.status(404).json({ error: 'File not found' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// ファイル書き込み
app.put('/api/files/*', authenticateApiKey, async (req, res) => {
  try {
    const filePath = req.params[0];
    if (!validatePath(filePath)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { content } = req.body;
    if (typeof content !== 'string') {
      return res.status(400).json({ error: 'Content must be a string' });
    }

    const fullPath = path.join(BASE_DIR, filePath);
    
    // ディレクトリが存在しない場合は作成
    const dir = path.dirname(fullPath);
    await fs.mkdir(dir, { recursive: true });
    
    await fs.writeFile(fullPath, content, 'utf8');
    
    res.json({
      path: filePath,
      message: 'File saved successfully'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ファイル削除
app.delete('/api/files/*', authenticateApiKey, async (req, res) => {
  try {
    const filePath = req.params[0];
    if (!validatePath(filePath)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const fullPath = path.join(BASE_DIR, filePath);
    await fs.unlink(fullPath);
    
    res.json({
      path: filePath,
      message: 'File deleted successfully'
    });
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.status(404).json({ error: 'File not found' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// ディレクトリ一覧
app.get('/api/directory/*', authenticateApiKey, async (req, res) => {
  try {
    const dirPath = req.params[0] || '';
    if (!validatePath(dirPath)) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const fullPath = path.join(BASE_DIR, dirPath);
    const entries = await fs.readdir(fullPath, { withFileTypes: true });
    
    const files = await Promise.all(entries.map(async (entry) => {
      const entryPath = path.join(fullPath, entry.name);
      const stats = await fs.stat(entryPath);
      return {
        name: entry.name,
        path: path.join(dirPath, entry.name),
        type: entry.isDirectory() ? 'directory' : 'file',
        size: stats.size,
        modified: stats.mtime
      };
    }));
    
    res.json({
      path: dirPath,
      files: files
    });
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.status(404).json({ error: 'Directory not found' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// コマンド実行（制限付き）
app.post('/api/execute', authenticateApiKey, async (req, res) => {
  try {
    const { command } = req.body;
    const allowedCommands = ['ls', 'pwd', 'echo', 'node', 'npm', 'git status'];
    
    // コマンドの検証
    const isAllowed = allowedCommands.some(cmd => command.startsWith(cmd));
    if (!isAllowed) {
      return res.status(403).json({ error: 'Command not allowed' });
    }

    const { stdout, stderr } = await execPromise(command, {
      cwd: BASE_DIR,
      timeout: 30000 // 30秒のタイムアウト
    });
    
    res.json({
      stdout: stdout,
      stderr: stderr
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ヘルスチェック
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`Claude Code API Server running on port ${PORT}`);
});