# API 接口文档

## 基础信息
- 基础路径: `/api/v1`
- 响应格式: JSON
- 认证方式: Bearer Token

## API 端点

### 1. Playbook 管理

#### 1.1 创建 Playbook
- 方法: POST
- 路径: `/playbooks`
- 请求体:
```json
{
  "name": "string",
  "description": "string",
  "tasks": [
    {
      "name": "string",
      "module": "string",
      "parameters": {}
    }
  ],
  "variables": {}
}
```
- 响应:
```json
{
  "id": "string",
  "name": "string",
  "yaml": "string",
  "created_at": "string"
}
```

#### 1.2 获取 Playbook 列表
- 方法: GET
- 路径: `/playbooks`
- 查询参数:
  - page: number
  - limit: number
- 响应:
```json
{
  "total": "number",
  "items": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "created_at": "string"
    }
  ]
}
```

#### 1.3 获取单个 Playbook
- 方法: GET
- 路径: `/playbooks/{id}`
- 响应:
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "yaml": "string",
  "variables": {},
  "created_at": "string"
}
```

### 2. Playbook 验证

#### 2.1 语法验证
- 方法: POST
- 路径: `/playbooks/validate`
- 请求体:
```json
{
  "yaml": "string"
}
```
- 响应:
```json
{
  "valid": "boolean",
  "errors": [
    {
      "line": "number",
      "message": "string"
    }
  ]
}
```

### 3. Playbook 测试

#### 3.1 执行测试
- 方法: POST
- 路径: `/playbooks/{id}/test`
- 请求体:
```json
{
  "environment": "string",
  "variables": {}
}
```
- 响应:
```json
{
  "test_id": "string",
  "status": "string"
}
```

#### 3.2 获取测试结果
- 方法: GET
- 路径: `/playbooks/tests/{test_id}`
- 响应:
```json
{
  "test_id": "string",
  "status": "string",
  "results": [
    {
      "task": "string",
      "status": "string",
      "output": "string"
    }
  ]
}
```

### 4. 模板管理

#### 4.1 获取可用模板
- 方法: GET
- 路径: `/templates`
- 响应:
```json
{
  "templates": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "category": "string"
    }
  ]
}
```

## 错误处理

所有API错误响应格式如下：
```json
{
  "error": {
    "code": "string",
    "message": "string",
    "details": {}
  }
}
```

常见错误代码：
- 400: 请求参数错误
- 401: 未授权
- 403: 禁止访问
- 404: 资源不存在
- 500: 服务器内部错误
