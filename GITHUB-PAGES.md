# 发布到 GitHub Pages

建议使用 GitHub Desktop；本项目的原 PDF 超过 GitHub 浏览器上传限制，但小于普通 Git 单文件上限。不要把整个 ZIP 当成网站入口上传。

## 1. 准备仓库

1. 登录 GitHub，新建名为 `你的用户名.github.io` 的 Public 仓库（用户名使用小写）。也可以使用如 `portfolio` 的普通项目仓库。
2. 在 GitHub Desktop 中登录同一账户，选择 **File → Clone repository**，把该仓库克隆到电脑。
3. 解压交付 ZIP，把其中的 `index.html`、`assets`、`.nojekyll` 和说明文件放到克隆的仓库根目录。不要额外套一层 `Zian-Xu-Portfolio` 文件夹。

## 2. 上传完整网站

1. 在 GitHub Desktop 中检查更改列表。
2. 填写提交说明，例如 `Add complete architecture portfolio`，点击 **Commit to main**。
3. 点击 **Push origin**。请等待所有图像和原 PDF 上传完成。

若已有同名网站，先保留旧网站备份，再决定是否替换。此项目无需 npm、终端命令、框架或构建服务。

## 3. 启用 Pages

1. 在 GitHub 打开该仓库，进入 **Settings → Pages**。
2. 在 **Build and deployment** 中选择 **Deploy from a branch**。
3. Branch 选择 `main`，文件夹选择 `/(root)`，保存。
4. 等待发布完成，使用 Pages 页面提供的 **Visit site** 链接查看结果。

用户仓库通常为 `https://你的用户名.github.io/`；普通项目仓库通常为 `https://你的用户名.github.io/portfolio/`。本网站使用相对路径，两种形式均兼容。

## 4. 发布后检查

- 首页图像和导航正常显示。
- Directory 中能进入所有 9 个章节，手机也能打开 Index。
- 论文完整显示，图片可放大。
- 原 PDF 下载成功。
- 从子章节 URL 刷新后仍能进入对应内容。

修改后再次 Commit 和 Push 即可更新。无需重新生成网站。

## 文件大小与官方说明

原 PDF 约 73.7 MB（70.3 MiB）；GitHub 网页上传单文件上限为 25 MiB，普通 Git 阻止超过 100 MiB 的文件，因此推荐 GitHub Desktop。来源：[GitHub 文件大小限制](https://docs.github.com/en/repositories/working-with-files/managing-large-files/about-large-files-on-github)。

入口文件应位于所选发布文件夹顶层；`.nojekyll` 用于直接发布静态文件。来源：[创建 GitHub Pages 网站](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)。

说明核对日期：2026-11-25。本次交付未代为发布，也未生成公开网站地址。
