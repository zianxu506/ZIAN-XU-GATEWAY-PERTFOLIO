# Gateway pertfolio — Zian Xu

当前版本：UI 与排版优化版。首页采用新的封面式排版；平面图、分析图与材料实验按原 PDF 位置重新配对图文；照片画廊取消统一错位偏移；课程信息采用独立标签栏。完整内容、原图档案及 Directory / Explore 逻辑保留。新版样式位于 `assets/css/refinement.css`，请与原样式表一起保留。

完整静态网站，纯 HTML / CSS / JavaScript，无后端、无安装、无构建步骤，无外部字体或脚本依赖。

## 打开网站

先解压 ZIP，再双击根目录 `index.html`。请保留 `assets` 文件夹与 `index.html` 的相对位置。不要直接在 ZIP 内预览 HTML。Chrome、Edge、Firefox、Safari 等现代浏览器均支持所使用的标准功能。

## 浏览方式

- **Directory**：9 个课程章节，显示编号、学期和分类；每项可展开细分内容。桌面鼠标移入时显示作品预览。
- **Explore**：全部课程按原 PDF 顺序连续纵向浏览。图片采用独立画廊排版，支持点击放大与 + / − 缩放。
- **Index**：随时打开章节和子内容索引，关闭后回到原位置。
- **Writing & Research**：可选择、搜索的论文正文，配图、原有引用与参考文献；有文章内容导航。
- **About**：完整保留 PDF 的个人 Statement、邮箱与电话。
- **Source notes & original assets**：每个内容段可查看对应 PDF 页、原始图像文件和逐字文本记录。

键盘：`1`–`9` 跳到章节；`I` 打开 Index；`D` 或 `0` 返回目录；`E` 继续巡游；目录中 `↑` / `↓` 选择项目、`Enter` 进入；`Esc` 关闭弹窗；图片弹窗中 `+` / `−` 缩放。支持系统“减少动态效果”偏好。

## 内容与保真方式

来源为 `SP26_B_作品集.pdf`，58 个 PDF 页面（包含双页跨页）。网站包含：

- 9 个课程章节与全部 58 页的逐页内容入口。
- 155 个图像出现位置，153 个去重的原图文件，保留提取后的原始字节与原分辨率。
- 127 个网页作品展示区域。相互叠加的图片、遮罩、图纸与矢量标注按原位置合成，独立文字移至 HTML 正文；没有 AI 重绘。
- 40,425 个字符的 PDF 可提取文字；完整逐字记录见 `assets/documents/full-transcription.txt`。图像中本来就存在的文字随图保留，不冒充可编辑文字。
- 原 PDF 原样复制至 `assets/documents/portfolio.pdf`；可随时核对正式排版。
- `content-manifest.json` 逐页列出文字、图像尺寸、位置、原图哈希、矢量路径数量和网页素材。

正文仅处理排版换行及软连字符，不纠正原文语法、拼写、重复句或占位文字。原文标题和图内标注均保留；为网页导航额外添加的短标签用于区分画廊与阅读段落。封面、Statement、原目录等位于 About 后的展开档案中。装饰性页眉与页码保留在逐字记录和原 PDF 中。

## 已知源文件问题

1. Visual Studies II：原目录为 Fall 2025，章节介绍页为 Fall 2026。网站同时标注两个年份，未代为更正。
2. 原 PDF 第 33 页有 `Lorem Ipsum Fusce in magna et sem consequat.`，第 36 页有异常页码 `771`，Villa Savoye 论文中有重复句与跨栏断词；均保留。
3. 作品图、封面渲染等部分内嵌图像分辨率有限。网页展示图是源 PDF 的高质量 WebP 衍生文件，不代表增加了真实细节；点击原图或原 PDF 可核对。没有替换、补画或生成新作品。
4. PDF 包含视频 QR 图案，但没有可提取的超链接或独立视频文件。本次保留全部 QR 图案与说明，不虚构视频地址。可放大后用手机扫码。
5. 两个指定参考网站本次通过网页读取工具无法访问。实现依据已确认的设计规范与原对话中的参考分析，没有复制其代码或素材。

## 文件结构

```text
index.html
.nojekyll
README.md
GITHUB-PAGES.md
QA-REPORT.md
assets/
  css/style.css
  js/main.js
  images/                 原始提取图像与网页展示图
  documents/
    portfolio.pdf
    full-transcription.txt
    content-manifest.json
    validation.json
```

## 发布

详见 `GITHUB-PAGES.md`。本次交付本地网站与 ZIP，没有创建 GitHub 仓库或代替用户发布。源 PDF 约 73.7 MB，超过 GitHub 网页上传的 25 MiB 限制，使用 GitHub Desktop 上传整套文件。

## 修改

所有展示内容已直接写在 `index.html`，不需要运行提取程序或读取 JSON 才能显示。样式在 `assets/css/style.css`，交互在 `assets/js/main.js`。素材使用相对路径，支持 GitHub 用户站点和项目子路径。若替换图片，请同步更新 HTML 的宽高和内容清单。要保留完整原图档案，请勿删除未直接用于画廊的 `original-*` 文件。
