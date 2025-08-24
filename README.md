# Ansible Playbook Generator Platform

## 项目简介

本项目旨在为用户提供一个基于 JavaScript 技术栈的 Web 平台，自动化生成、格式化、验证和测试 Ansible Playbook。平台支持可视化配置、实时预览、语法检查和一键测试，提升运维自动化效率。

## 主要功能
- 可视化编辑和生成 Ansible Playbook
- Playbook 格式化与语法验证
- Playbook 测试与结果展示
- Playbook 模板管理与复用
- 支持多环境测试
- API 支持，便于集成

## 技术栈
- 前端：React.js
- 后端：Node.js + Express.js
- 数据库：MongoDB
- Playbook 处理：node-ansible, yaml, joi
- 测试：Jest
- 文档：Swagger/OpenAPI

## 目录结构
```
ansible_js/
├── docs/                  # 设计与接口文档
│   ├── system-design.md   # 系统设计文档
│   ├── api-spec.md        # API接口文档
│   └── interaction-design.md # 交互设计文档
├── src/                   # 源码目录
├── package.json           # 项目配置
├── README.md              # 项目说明
```

## 快速开始
1. 安装依赖：
   ```bash
   npm install
   ```
2. 启动开发环境：
   ```bash
   npm run dev
   ```
3. 访问前端界面（待开发）

## 设计文档
- [系统设计文档](docs/system-design.md)
- [API接口文档](docs/api-spec.md)
- [交互设计文档](docs/interaction-design.md)

## 贡献指南
欢迎提交 Issue 和 PR，建议先阅读设计文档。

## License
MIT
