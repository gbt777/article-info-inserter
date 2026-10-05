const { Plugin, Notice, PluginSettingTab, Setting, ToggleComponent, Modal, normalizePath, getLanguage } = require("obsidian");

// ═══════════════════════════════════════════════════════════════
// 多语言文案
// ═══════════════════════════════════════════════════════════════
const I18N = {
    zh: {
        ribbonTitle: "更新文章信息",
        commandName: "更新文章信息",
        noticeNoFile: "没有打开的文件",
        noticeOnlyMd: "只支持 Markdown 文件",
        noticeUpdated: "更新完成",
        noticeNoChange: "统计结果未变化",
        noticeTocNoHeadings: "正文未检测到标题，未生成结构图",
        noticeRestored: "已恢复默认设置",
        noticeLinkImageOnly: "链接与图片所在行只能单独显示图片或链接，请将该行其他标签移除",
        noticeRunError: "执行失败",

        langOptZh: "中文",
        langOptEn: "English",

        previewTitle: "效果预览",
        previewYamlLabel: "属性区（Frontmatter）：",
        previewStartLabel: "正文开头标记（无则显示“无”）：",
        previewEndLabel: "正文末尾标记（无则显示“无”）：",
        noneText: "无",
        tocNoHeadingsHint: "当前笔记正文没有标题，结构图不会生成（预览与执行都会跳过）。",
        previewFoldYaml: "属性区",
        previewFoldStart: "首行区",
        previewFoldEnd: "尾行区",
        previewHideLabel: "隐藏预览：",
        alignName: "对齐",
        alignJustify: "两端",
        alignLeft: "左",
        alignCenter: "中",
        alignRight: "右",

        tabAppend: "追加内容设置",
        tabRules: "统计规则",
        tabDisplay: "显示自定义",

        appendRowCount: "在前边插入 {x} 行，尾部插入 {y} 行",
        appendHintBody: "黄色下拉框 = 正文是否显示",
        appendHintProp: "蓝色下拉框 = 属性区策略",
        rowLabelStart: "首行",
        rowLabelEnd: "尾行",
        rowIndent: "缩进",
        rowIndentUnit: "字符",
        bodyShow: "显示",
        bodyHide: "不显示",
        propNone: "不操作",
        propWrite: "写入",
        propDelete: "删除",
        propClear: "清空",

        rulesWordTitle: "字数统计规则",
        rulesCountPunctuation: "计入标点",
        rulesReadingTitle: "阅读用时与页数",
        rulesReadingSpeed: "阅读速度（字/分钟）",
        rulesPageSize: "每页字数",
        rulesDecimal: "显示 1 位小数",
        rulesDecimalReadingTime: "阅读用时",
        rulesDecimalPageCount: "页数",
        rulesFilterTitle: "包含/排除规则",
        rulesExcludeComments: "排除注释",
        rulesExcludeCommentsDesc: "排除 %%Obsidian%% 与 <!--HTML--> 注释",
        rulesExcludeCode: "排除代码块",
        rulesExcludeCodeDesc: "排除 ``` 代码块",
        rulesExcludeLinkInvisible: "排除链接不可见部分",
        rulesExcludeLinkInvisibleDesc: "外部链接排除 URL，内部链接只保留别名",
        rulesExcludeFootnotes: "排除脚注",
        rulesExcludeFootnotesDesc: "排除 [^1] 脚注",
        rulesCharMethod: "字符数统计口径",
        rulesCharMethodDesc: "仅控制「字符数」是否计入空格与换行；「字数」按词统计，不计入空格与换行（亦不受此开关影响）。「字符数」同时受上方“计入标点”开关影响。",
        rulesCountPunctuationDesc: "同时作用于「字数」与「字符数」：关闭后两者均剔除标点。",
        charMethodExcludeWs: "不计空格与换行",
        charMethodIncludeWs: "包含空格与换行",
        timeShowClock: "显示具体时间",
        timeCreated: "创建时间",
        timeModified: "编辑时间",

        rulesLinkExcludeImages: "链接数不计入图片链接",
        rulesLinkExcludeImagesDesc: "开启后链接数完全不计任何图片；关闭时，若已开启“本插件追加的图片不计数”，则仅本插件追加的图片不计入链接数",
        rulesExcludeAppendedImages: "本插件追加的图片不计数",
        rulesExcludeAppendedImagesDesc: "图片计数时排除“链接与图片”设置中勾选“图片”的行；与“链接数不计入图片链接”联动决定追加图片是否计入链接数",
        rulesCodeCountTitle: "代码统计口径",
        codeCountBlock: "按代码块数",
        codeCountLine: "按代码行数",
        codeBlockSuffix: " 块",
        codeLineSuffix: " 行",
        rulesExcludeInlineCode: "排除行内代码",
        rulesExcludeInlineCodeDesc: "排除 `code` 行内代码",
        rulesExcludeEmbeds: "排除嵌入笔记",
        rulesExcludeEmbedsDesc: "排除 ![[嵌入]] 非图片内容；图片嵌入已计入图片数",
        rulesExcludeHashtags: "排除标签",
        rulesExcludeHashtagsDesc: "排除 #标签",
        rulesExcludeLatex: "排除 LaTeX 公式",
        rulesExcludeLatexDesc: "排除 $...$ 与 $$...$$ 公式",
        rulesCountEmoji: "Emoji 计入字数",
        rulesCountEmojiDesc: "将 Emoji 作为字数统计",
        linkImageSingleWarning: "图片单行显示警告",
        linkImageSingleWarningDesc: "当一行中图片/链接标签与其他标签混用时弹出提示。建议图片单独一行，以避免显示异常或格式错乱。",

        separatorName: "正文标签分隔符",
        separatorDesc: "同一行内多个标签之间的分隔符，留空则使用全角竖线 ｜",

        noticeDuplicateTag: "字段重复添加：{0}",
        noticePropConflict: "属性字段命名冲突：{0}",

        displayTitle: "标签显示自定义",
        displayDesc: "选择标签后自动激活对应行；可编辑每行的显示内容、文字颜色，点击“重置”恢复默认。",
        displayPrefix: "前",
        displaySuffix: "后",
        colorClear: "清除颜色",
        displayUrl: "链接（必填）",
        displayLinkName: "链接名称（可空）",
        displayForceImage: "图片",
        customRowWhole: "请输入",
        btnReset: "重置",
        btnRun: "执行更新",
        btnRestore: "全部重置",
        presetTitle: "预设设置",
        btnResetPreset: "重置",
        noticePresetLoaded: "已切换到预设 {0}",
        noticePresetReset: "已重置当前预设",
        confirmResetPreset: "是否重置当前预设？",
        confirmTitle: "确认",
        confirmText: "确定",
        cancelText: "取消",
        sortMode: "排序模式",
        sortModeHint: "开启后可拖动把手调整行顺序与列顺序；排序模式下内容无法编辑",

        warnTitle: "⚠️ 使用警示",
        warnText: "本插件在正文中插入一行 HTML 块（<div data-aii=\"marker\">…</div>）来实现对齐、缩进与定位，导出 HTML/Word 时不会额外打印隐藏内容。使用本插件时，请勿自行设置该格式；调整对齐、缩进或文字颜色后，再次执行会正常替换已插入的标记。\n注意：某些主题会将加粗+斜体的连续三个星号（***…***）渲染为多彩字，关闭该主题的对应效果即可正常显示。",
        tabToc: "文章结构图",
    },
    en: {
        ribbonTitle: "Update article info",
        commandName: "Update article info",
        noticeNoFile: "No file is open",
        noticeOnlyMd: "Only Markdown files are supported",
        noticeUpdated: "Updated",
        noticeNoChange: "Stats unchanged",
        noticeTocNoHeadings: "No headings found in this note — diagram not generated",
        noticeRestored: "Settings restored to defaults",
        noticeLinkImageOnly: "A row containing a link/image tag can only display that image or link. Please remove other tags from this row.",
        noticeRunError: "Execution failed",

        langOptZh: "中文",
        langOptEn: "English",

        previewTitle: "Live preview",
        previewYamlLabel: "Frontmatter:",
        previewStartLabel: 'Body start marker (shows "None" if empty):',
        previewEndLabel: 'Body end marker (shows "None" if empty):',
        previewHideLabel: "Hide preview:",
        previewFoldYaml: "Frontmatter",
        previewFoldStart: "Start rows",
        previewFoldEnd: "End rows",
        noneText: "None",
        tocNoHeadingsHint: "This note has no headings, so the diagram is not generated (preview and insert are skipped).",

        tabAppend: "Append content",
        tabRules: "Counting rules",
        tabDisplay: "Display custom",

        appendRowCount: "Insert {x} row(s) at start, {y} row(s) at end",
        appendHintBody: "Yellow dropdown = show in body",
        appendHintProp: "Blue dropdown = Frontmatter policy",
        rowLabelStart: "Start row",
        rowLabelEnd: "End row",
        rowIndent: "Indent",
        rowIndentUnit: "chars",
        alignName: "Alignment",
        alignJustify: "Justify",
        alignLeft: "Left",
        alignCenter: "Center",
        alignRight: "Right",
        bodyShow: "Show",
        bodyHide: "Hide",
        propNone: "None",
        propWrite: "Write",
        propDelete: "Delete",
        propClear: "Clear",

        rulesWordTitle: "Word count rules",
        rulesCountPunctuation: "Count punctuation",
        rulesReadingTitle: "Reading time & pages",
        rulesReadingSpeed: "Reading speed (words/min)",
        rulesPageSize: "Words per page",
        rulesDecimal: "Show 1 decimal",
        rulesDecimalReadingTime: "Reading time",
        rulesDecimalPageCount: "Pages",
        rulesFilterTitle: "Include / exclude rules",
        rulesExcludeComments: "Exclude comments",
        rulesExcludeCommentsDesc: "Exclude %%Obsidian%% and <!--HTML--> comments",
        rulesExcludeCode: "Exclude code blocks",
        rulesExcludeCodeDesc: "Exclude ``` code blocks",
        rulesExcludeLinkInvisible: "Exclude non-visible link parts",
        rulesExcludeLinkInvisibleDesc: "Exclude URI for external links; keep only alias for internal links",
        rulesExcludeFootnotes: "Exclude footnotes",
        rulesExcludeFootnotesDesc: "Exclude [^1] footnotes",
        rulesCharMethod: "Character count method",
        rulesCharMethodDesc: "Controls whether \"Character count\" includes spaces & line breaks; \"Word count\" counts words and never includes spaces/line breaks. \"Character count\" is also affected by the \"Count punctuation\" toggle above.",
        rulesCountPunctuationDesc: "Affects both \"Word count\" and \"Character count\": when off, punctuation is excluded from both.",
        charMethodExcludeWs: "Exclude spaces & line breaks",
        charMethodIncludeWs: "Include spaces & line breaks",
        timeShowClock: "Show specific time",
        timeCreated: "Created",
        timeModified: "Modified",

        rulesLinkExcludeImages: "Exclude image links from link count",
        rulesLinkExcludeImagesDesc: "When on, no image links count. When off, appended images are still excluded if 'Exclude appended images from count' is on.",
        rulesExcludeAppendedImages: "Exclude appended images from count",
        rulesExcludeAppendedImagesDesc: "Exclude rows marked as 'Image' in Link/Image settings; works with 'Exclude image links from link count' to decide whether appended images count in links",
        rulesCodeCountTitle: "Code count method",
        codeCountBlock: "By block",
        codeCountLine: "By line",
        codeBlockSuffix: "",
        codeLineSuffix: "",
        rulesExcludeInlineCode: "Exclude inline code",
        rulesExcludeInlineCodeDesc: "Exclude `code` inline code",
        rulesExcludeEmbeds: "Exclude embeds",
        rulesExcludeEmbedsDesc: "Exclude non-image ![[embed]] content; image embeds are counted under Images",
        rulesExcludeHashtags: "Exclude hashtags",
        rulesExcludeHashtagsDesc: "Exclude #hashtag tags",
        rulesExcludeLatex: "Exclude LaTeX formulas",
        rulesExcludeLatexDesc: "Exclude $...$ and $$...$$ formulas",
        rulesCountEmoji: "Count emoji as words",
        rulesCountEmojiDesc: "Include emoji in word count",
        linkImageSingleWarning: "Warn on mixed link/image rows",
        linkImageSingleWarningDesc: "Show a warning when a link/image tag is mixed with other tags in one row. Images are recommended to be on their own line to avoid display or formatting issues.",

        separatorName: "Body tag separator",
        separatorDesc: "Separator between tags in the same row. Empty defaults to full-width ｜.",

        noticeDuplicateTag: "Duplicate tags: {0}",
        noticePropConflict: "Property conflict: {0}",

        displayTitle: "Tag display customization",
        displayDesc: "Rows activate automatically after a tag is selected. Edit the display text, text color, and click Reset to restore defaults.",
        displayPrefix: "Prefix",
        displaySuffix: "Suffix",
        colorClear: "Clear color",
        displayUrl: "Link URL (required)",
        displayLinkName: "Link name (optional)",
        displayForceImage: "Image",
        customRowWhole: "Enter text",
        btnReset: "Reset",
        btnRun: "Run update",
        btnRestore: "Restore all",
        presetTitle: "Presets",
        btnResetPreset: "Reset",
        noticePresetLoaded: "Switched to preset {0}",
        noticePresetReset: "Current preset reset",
        confirmResetPreset: "Reset current preset?",
        confirmTitle: "Confirm",
        confirmText: "OK",
        cancelText: "Cancel",
        sortMode: "Sort mode",
        sortModeHint: "When enabled, drag handles let you reorder rows and slots. Editing is disabled in sort mode.",

        warnTitle: "⚠️ Warning",
        warnText: "This plugin inserts a single-line HTML block (`<div data-aii=\"marker\">…</div>`) into the note body for alignment, indentation and locating markers. It will not print extra hidden content when exporting to HTML/Word. Do not manually use this format. Changing alignment, indentation or text color will still replace the inserted markers correctly on re-run.\nNote: some themes render bold+italic (***...***) as multicolored text; disabling that theme's effect restores normal display.",
        tabToc: "Article structure diagram",
        // 结构图「表头名称」的默认值（随界面语言变化；这是**内容默认值**，不是 UI 标签）
        "文章结构": "Article structure",
        "文章结构图设置": "Article structure diagram settings",
        "重置本页设置": "Reset this page",
        "总体设置": "General",
        "排列方向": "Layout",
        "横向排布": "Horizontal",
        "纵向排布": "Vertical",
        "放射状": "Radial",
        "起始角度": "Start angle",
        "仅对第一个一级标题生效；0 = 正上方，顺时针递增（仅放射状）": "Applies to the first level-1 heading only; 0 = top, clockwise (radial only)",
        "偏移角": "Offset angle",
        "相邻同级标题之间的角度间隔；0 = 按标题数量自动均分 360°（仅放射状）": "Angular gap between adjacent same-level headings; 0 = auto-divide 360° by count (radial only)",
        "（仅放射状）": "(radial only)",
        "表头名称": "Header name",
        "文档结构": "Document structure",
        "渲染范围": "Render range",
        "全部标题": "All headings",
        "范围": "Range",
        "到": "to",
        "章": "ch.",
        "画布尺寸": "Canvas size",
        "宽度": "Width",
        "高度": "Height",
        "边距": "Margin",
        "布局间距": "Layout spacing",
        "层级": "Level gap",
        "行距": "Row gap",
        "行高": "Line height",
        "不变色": "No color shift",
        "深浅渐变": "Shade gradient",
        "邻近色环": "Analogous",
        "互补对照": "Complementary",
        "三角色环": "Triadic",
        "彩虹色轮": "Rainbow wheel",
        "按层级": "By level",
        "按章节": "By chapter",
        "微软雅黑": "Microsoft YaHei",
        "等线": "DengXian",
        "思源黑体": "Source Han Sans",
        "思源宋体": "Source Han Serif",
        "苹方": "PingFang",
        "黑体": "SimHei",
        "宋体": "SimSun",
        "华文黑体": "STHeiti",
        "华文宋体": "STSong",
        "无衬线": "Sans-serif",
        "衬线": "Serif",
        "自定义...": "Custom...",
        "全局样式": "Global style",
        "框底色": "Box fill",
        "描边色": "Stroke color",
        "连线色": "Line color",
        "变色": "Color shift",
        "反差色": "High contrast",
        "恢复默认": "Reset",
        "字号": "Font size",
        "行数控制": "Wrap control",
        "按字数": "By chars",
        "按行数": "By lines",
        "按字数=每行最多 N 字自动换行（0=不限）；按行数=标题拆成 N 行显示（1=不拆）": "By chars: wrap at N chars per line (0 = unlimited); By lines: split title into N rows (1 = no wrap)",
        "含义跟随全局「行数控制」模式：按字数=每行最多 N 字；按行数=拆成 N 行。0/留空=跟随全局。": "Follows the global wrap mode: by chars = at most N chars per line; by lines = split into N rows. 0/empty = follow global.",
        "字号/字or行数": "Size / chars-or-lines",
        "字体": "Font",
        "全局": "Global",
        "表头": "Header",
        "加粗": "Bold",
        "斜体": "Italic",
        "方案": "Scheme",
        "维度": "Dimension",
        "按层级=同级颜色不变、不同级变色；按章节=同层级内各章节也依次变色": "By level: same level keeps base color, each level shifts; By chapter: chapters also shift in sequence",
        "强度": "Strength",
        "0~10：0=与基准色相同，10=剧烈变化": "0~10: 0 = same as base color, 10 = drastic change",
        "框线方案": "Box/line scheme",
        "节点框形状": "Node box shape",
        "下划线": "Underline",
        "矩形": "Rectangle",
        "圆角矩形": "Rounded rect",
        "胶囊": "Capsule",
        "无底纹": "None",
        "框线粗细": "Box stroke width",
        "连线线型": "Connector type",
        "曲线": "Curve",
        "直线": "Straight",
        "粗细": "Width",
        "弧度": "Curve",
        "曲线转角锐利度 0~10：0=直线，7.5=转角锐利，10=最锐；选「直线」时不生效": "Curve sharpness 0~10: 0 = straight, 7.5 = sharp corner, 10 = sharpest; ignored when \"Straight\" is selected",
        "底纹方案": "Background scheme",
        "背景": "Background",
        "暖橙渐变": "Warm orange gradient",
        "紫蓝渐变": "Purple-blue gradient",
        "蓝灰渐变": "Blue-grey gradient",
        "浅灰渐变": "Light grey gradient",
        "自定义-渐变": "Custom - gradient",
        "颜色": "Color",
        "渐变": "Gradient",
        "浅色(提亮)": "Light (brighter)",
        "深色(压暗)": "Dark (darker)",
        "线性": "Linear",
        "径向": "Radial",
        "强": "Strong",
        "中": "Medium",
        "弱": "Weak",
        "角度": "Angle",
        "方向": "Direction",
        "正": "Forward",
        "反": "Reverse",
        "渐变方向：正=按当前角度/深浅，反=首尾色对调；「单色」无法变色": "Gradient direction: forward = current angle/tone; reverse = swap the two ends. No effect for a solid fill.",
        "该变色方案的反向变化：彩虹→反向色轮、深浅→由浅到深；「不变色」时无效": "Reverse direction of the selected shift scheme (rainbow → reverse wheel, shades → light-to-dark). No effect when set to \"No color shift\".",
        "自定义样式": "Custom style",
        "文章标题": "Article title",
        "一级标题": "Level 1",
        "二级标题": "Level 2",
        "三级标题": "Level 3",
        "四级标题": "Level 4",
        "设置项": "Setting",
        "自定义颜色（点 × 恢复当前样式初始色）": "Custom color (click × to restore the scheme's initial color)",
        "底色（点 × 恢复当前样式初始色）": "Fill (click × to restore the scheme's initial color)",
        "描边色（点 × 恢复当前样式初始色）": "Stroke (click × to restore the scheme's initial color)",
        "字体名": "Font name",
        "默认/全局": "Default/global",
        "文字": "Text",
        "文字样式": "Text style",
        "节点框": "Node box",
        "对齐/位置": "Align/pos",
        "左对齐": "Left",
        "居中对齐": "Center",
        "右对齐": "Right",
        "连线以上": "Above line",
        "连线上": "On line",
        "连线以下": "Below line",
        "形状": "Shape",
        "等宽": "Uniform width",
        "按字数": "By chars",
        "避让次级": "Avoid child level",
        "避让次级：勾选=本级标题的位置受下一级占用空间影响；不勾=本级按自身间距分布，只由引线表示父子关系": "Avoid sub-levels: checked = this level's position is affected by the space used by the next level; unchecked = this level is laid out by its own spacing, parent/child shown only by connectors",
        "显示序号": "Show numbering",
        "显示": "Show",
        "隐藏": "Hide",
        "底色/描边": "Fill/stroke",
        "连接点": "Connector dot",
        "不显示": "None",
        "空心": "Hollow",
        "实心": "Solid",
        "下级连线（本级连向下级的线）": "Child connectors (lines from this level to the next)",
        "单色": "Single",
        "粗细/弧度": "Width/curve",
        "弧度（0~10）：0=直线，7.5=转角锐利，10=最锐。留空跟随全局。": "Curve (0~10): 0 = straight, 7.5 = sharp corner, 10 = sharpest. Empty follows global.",
        "连线形状": "Connector shape",
        "弧形": "Arc",
        "直角": "Right angle",
        "（仅横向）": "(horizontal only)",
    }
};

function tr(lang, key) {
    const dict = I18N[lang] || I18N.zh;
    return dict[key] != null ? dict[key] : key;
}

// tr + {0}{1} 参数格式化（设置页各面板共用，避免重复定义 L 助手）
function fmtTr(lang, key, ...args) {
    let text = tr(lang, key);
    for (let i = 0; i < args.length; i++) text = text.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
    return text;
}

// 标点在字符数统计中的剔除集合（中英文标点）。
// 用于"计入标点"(countPunctuation) 关闭时，使该开关对「字符数」同样生效（与「字数」一致）。
const PUNCT_RE = /[\u3000-\u303F\uFF01-\uFF60\u2014\u2026\x21-\x2F\x3A-\x40\x5B-\x60\x7B-\x7E]/g;

class ConfirmModal extends Modal {
    constructor(app, title, message, confirmText, cancelText, onConfirm) {
        super(app);
        this.title = title;
        this.message = message;
        this.confirmText = confirmText;
        this.cancelText = cancelText;
        this.onConfirm = onConfirm;
    }

    onOpen() {
        const { contentEl } = this;
        contentEl.empty();
        contentEl.createEl("h3", { text: this.title });
        contentEl.createEl("p", { text: this.message });
        const btnRow = contentEl.createDiv({ cls: "aii-modal-buttons" });
        const confirmBtn = btnRow.createEl("button", { text: this.confirmText, cls: "mod-cta" });
        confirmBtn.addEventListener("click", () => {
            this.onConfirm();
            this.close();
        });
        const cancelBtn = btnRow.createEl("button", { text: this.cancelText });
        cancelBtn.addEventListener("click", () => this.close());
    }

    onClose() {
        this.contentEl.empty();
    }
}

// ═══════════════════════════════════════════════════════════════
// 标签定义
// ═══════════════════════════════════════════════════════════════
const TAGS = [
    { id: "none",           prop: null,            hasCustom: false },
    { id: "word_count",     prop: "word_count",    hasCustom: true },
    { id: "character_count",prop: "character_count",hasCustom: true },
    { id: "reading_time",   prop: "reading_time",  hasCustom: true },
    { id: "page_count",     prop: "page_count",    hasCustom: true },
    { id: "image_count",       prop: "image_count",       hasCustom: true },
    { id: "local_image_count", prop: "local_image_count", hasCustom: true },
    { id: "network_image_count", prop: "network_image_count", hasCustom: true },
    { id: "toc_diagram",    prop: null,            hasCustom: true, isLinkImage: true },
    { id: "embed_count",    prop: "embed_count",   hasCustom: true },
    { id: "comment_count",  prop: "comment_count", hasCustom: true },
    { id: "footnote_count", prop: "footnote_count",hasCustom: true },
    { id: "code_count",     prop: "code_count",    hasCustom: true },
    { id: "link_count",     prop: "link_count",    hasCustom: true },
    { id: "created_time",   prop: "created_time",  hasCustom: true },
    { id: "modified_time",  prop: "modified_time", hasCustom: true },
    { id: "link_image_1",   prop: null,            hasCustom: true, isLinkImage: true },
    { id: "link_image_2",   prop: null,            hasCustom: true, isLinkImage: true },
    { id: "link_image_3",   prop: null,            hasCustom: true, isLinkImage: true },
    { id: "link_image_4",   prop: null,            hasCustom: true, isLinkImage: true },
    { id: "author",         prop: "author",        hasCustom: true },
    { id: "custom_1",       prop: "custom_1",      hasCustom: true, isCustom: true },
    { id: "custom_2",       prop: "custom_2",      hasCustom: true, isCustom: true },
    { id: "custom_3",       prop: "custom_3",      hasCustom: true, isCustom: true }
];

const TAG_OPTIONS = TAGS.map(t => t.id);

// 标签 id（蛇形） → 统计结果 stats 中的字段名（驼峰）
const TAG_STATS_KEY = {
    word_count: "wordCount",
    character_count: "characterCount",
    reading_time: "readingTime",
    page_count: "pageCount",
    image_count: "imageCount",
    local_image_count: "localImageCount",
    network_image_count: "networkImageCount",
    embed_count: "embedCount",
    comment_count: "commentCount",
    footnote_count: "footnoteCount",
    code_count: "codeCount",
    link_count: "linkCount",
    created_time: "createdDate",
    modified_time: "modifiedDate"
};

function tagMeta(id) { return TAGS.find(t => t.id === id) || TAGS[0]; }

function getTagLabel(settings, tagId) {
    const L = (key) => tr(settings.language, key);
    const labels = {
        none: L("propNone"),
        word_count: "字数",
        character_count: "字符数",
        reading_time: "阅读用时",
        page_count: "页数",
        image_count: "图片数",
        local_image_count: "本地图片",
        network_image_count: "网络图片",
        embed_count: "嵌入数",
        comment_count: "注释",
        footnote_count: "脚注",
        code_count: "代码",
        link_count: "链接数",
        created_time: "创建时间",
        modified_time: "编辑时间",
        link_image_1: "链接与图片1",
        link_image_2: "链接与图片2",
        link_image_3: "链接与图片3",
        link_image_4: "链接与图片4",
        toc_diagram: "文章结构图",
        author: "作者",
        custom_1: "自定义1",
        custom_2: "自定义2",
        custom_3: "自定义3"
    };
    if (settings.language === "en") {
        const enLabels = {
            none: "None",
            word_count: "Words",
            character_count: "Chars",
            reading_time: "Reading",
            page_count: "Pages",
            image_count: "Images",
            local_image_count: "Local images",
            network_image_count: "Web images",
            embed_count: "Embeds",
            comment_count: "Comments",
            footnote_count: "Footnotes",
            code_count: "Code",
            link_count: "Links",
            created_time: "Created",
            modified_time: "Modified",
            link_image_1: "Link/Image 1",
            link_image_2: "Link/Image 2",
            link_image_3: "Link/Image 3",
            link_image_4: "Link/Image 4",
            toc_diagram: "Article structure",
            author: "Author",
            custom_1: "Custom 1",
            custom_2: "Custom 2",
            custom_3: "Custom 3"
        };
        return enLabels[tagId] || tagId;
    }
    return labels[tagId] || tagId;
}

function getCodeCountSuffix(method, lang) {
    const key = method === "block" ? "codeBlockSuffix" : "codeLineSuffix";
    return tr(lang, key);
}

function makeDisplayDefaults(lang, codeCountMethod) {
    const codeSuffix = getCodeCountSuffix(codeCountMethod || "line", lang);
    if (lang === "en") {
        return {
        word_count:       { prefix: "Words: ",        suffix: "", color: "", bold: false, italic: false },
        character_count:  { prefix: "Chars: ",        suffix: "", color: "", bold: false, italic: false },
        reading_time:     { prefix: "Reading time: ", suffix: " min", color: "", bold: false, italic: false },
        page_count:       { prefix: "Pages: ",         suffix: "", color: "", bold: false, italic: false },
        image_count:      { prefix: "Images: ",        suffix: "", color: "", bold: false, italic: false },
        local_image_count:{ prefix: "Local images: ",  suffix: "", color: "", bold: false, italic: false },
        network_image_count:{ prefix: "Web images: ",  suffix: "", color: "", bold: false, italic: false },
        embed_count:      { prefix: "Embeds: ",        suffix: "", color: "", bold: false, italic: false },
        comment_count:    { prefix: "Comments: ",      suffix: "", color: "", bold: false, italic: false },
        footnote_count:   { prefix: "Footnotes: ",     suffix: "", color: "", bold: false, italic: false },
        code_count:       { prefix: "Code: ",          suffix: "", color: "", bold: false, italic: false },
        link_count:       { prefix: "Links: ",         suffix: "", color: "", bold: false, italic: false },
        created_time:     { prefix: "Created: ",       suffix: "", color: "", bold: false, italic: false },
        modified_time:    { prefix: "Modified: ",      suffix: "", color: "", bold: false, italic: false },
        link_image_1:     { linkName: "", url: "", forceImage: false, bold: false, italic: false },
        link_image_2:     { linkName: "", url: "", forceImage: false, bold: false, italic: false },
        link_image_3:     { linkName: "", url: "", forceImage: false, bold: false, italic: false },
        link_image_4:     { linkName: "", url: "", forceImage: false, bold: false, italic: false },
        toc_diagram:      { linkName: "", url: "", forceImage: false, bold: false, italic: false },
        author:           { prefix: "Author: ",        suffix: "XXX", color: "", bold: false, italic: false },
        custom_1:         { text: "", color: "", bold: false, italic: false },
        custom_2:         { text: "", color: "", bold: false, italic: false },
        custom_3:         { text: "", color: "", bold: false, italic: false }
        };
    }
    return {
        word_count:          { prefix: "全文共 ",    suffix: " 字", color: "", bold: false, italic: false },
        character_count:     { prefix: "字符共 ",    suffix: " 个", color: "", bold: false, italic: false },
        reading_time:        { prefix: "阅读用时约 ", suffix: " 分钟", color: "", bold: false, italic: false },
        page_count:          { prefix: "约 ",        suffix: " 页", color: "", bold: false, italic: false },
        image_count:         { prefix: "图片共 ",     suffix: " 张", color: "", bold: false, italic: false },
        local_image_count:   { prefix: "本地图片 ",   suffix: " 张", color: "", bold: false, italic: false },
        network_image_count: { prefix: "网络图片 ",   suffix: " 张", color: "", bold: false, italic: false },
        embed_count:         { prefix: "嵌入共 ",     suffix: " 个", color: "", bold: false, italic: false },
        comment_count:       { prefix: "注释共 ",    suffix: " 条", color: "", bold: false, italic: false },
        footnote_count:      { prefix: "脚注共 ",    suffix: " 条", color: "", bold: false, italic: false },
        code_count:          { prefix: "代码共 ",    suffix: codeSuffix, color: "", bold: false, italic: false },
        link_count:          { prefix: "链接共 ",    suffix: " 条", color: "", bold: false, italic: false },
        created_time:        { prefix: "创建于 ",     suffix: "", color: "", bold: false, italic: false },
        modified_time:       { prefix: "本文完成于 ",  suffix: "", color: "", bold: false, italic: false },
        link_image_1:        { linkName: "", url: "", forceImage: false, bold: false, italic: false },
        link_image_2:        { linkName: "", url: "", forceImage: false, bold: false, italic: false },
        link_image_3:        { linkName: "", url: "", forceImage: false, bold: false, italic: false },
        link_image_4:        { linkName: "", url: "", forceImage: false, bold: false, italic: false },
        toc_diagram:         { linkName: "", url: "", forceImage: false, bold: false, italic: false },
        author:              { prefix: "作者：",     suffix: "XXX", color: "", bold: false, italic: false },
        custom_1:            { text: "", color: "", bold: false, italic: false },
        custom_2:            { text: "", color: "", bold: false, italic: false },
        custom_3:            { text: "", color: "", bold: false, italic: false }
    };
}

function getDefaultLangConfig(lang, codeCountMethod) {
    return {
        rowConfigs: [
            makeRow([makeSlot("word_count", "show", "none"), makeSlot("reading_time", "show", "none"), makeSlot("image_count", "show", "none"), makeSlot(), makeSlot()]),
            makeRow(),
            makeRow(),
            makeRow(),
            makeRow(),
            makeRow([makeSlot("modified_time", "show", "none"), makeSlot("author", "show", "none"), makeSlot(), makeSlot(), makeSlot()])
        ],
        display: makeDisplayDefaults(lang, codeCountMethod)
    };
}

function translateDisplayDefaults(display, oldLang, newLang, codeCountMethod) {
    const oldDefaults = makeDisplayDefaults(oldLang, codeCountMethod);
    const newDefaults = makeDisplayDefaults(newLang, codeCountMethod);
    for (const tag of Object.keys(display)) {
        const d = display[tag];
        const od = oldDefaults[tag];
        const nd = newDefaults[tag];
        if (!d || !od || !nd) continue;
        for (const field of ["prefix", "suffix", "linkName", "text"]) {
            if (d[field] !== undefined && d[field] === od[field]) {
                d[field] = nd[field];
            }
        }
    }
    return display;
}

function makeSlot(tag = "none", bodyShow = "hide", propPolicy = "none") {
    return { tag, bodyShow, propPolicy };
}

function makeRow(slots, alignment = "justify", indent = 0) {
    return { slots: slots || [makeSlot(), makeSlot(), makeSlot(), makeSlot(), makeSlot()], alignment, indent };
}

// ═══════════════════════════════════════════════════════════════
// 默认设置
// ═══════════════════════════════════════════════════════════════

// 首次打开（全新安装）时的默认界面语言探测：中文 → 中文，其余（含探测失败）→ 英文。
// 仅由 makeDefaultSettings() 调用；已存在的用户配置不做任何自动改写。
// ⛔ 不要改用浏览器端的 Web Storage（会话级/本地级持久化）——Obsidian 审核会给出
//    "Local Storage" 提示（应将数据持久化到插件自身的 data 接口）。
//    界面语言按可靠性排序取候选：
//      ① 官方 getLanguage()（老版本无此导出 → 安全跳过）
//      ② window.moment.locale()（Obsidian 自身内部插件也是用这个取界面语言的）
//      ③ navigator.language（系统语言兜底）
//    语义与旧版一致：任一候选以 zh 开头即判为中文，否则英文。
function detectDefaultLanguage() {
    const cands = [];
    try {
        if (typeof getLanguage === "function") {
            const v = getLanguage();
            if (v) cands.push(v);
        }
    } catch (e) { /* 老版本无此 API：忽略 */ }
    try {
        if (typeof window !== "undefined" && window.moment && typeof window.moment.locale === "function") {
            const v = window.moment.locale();     // 形如 "zh-cn" / "en"
            if (v) cands.push(v);
        }
    } catch (e) { /* 忽略 */ }
    try {
        if (typeof navigator !== "undefined" && navigator.language) cands.push(navigator.language);
    } catch (e) { /* 忽略 */ }
    for (const c of cands) {
        if (/^zh/i.test(String(c == null ? "" : c).trim())) return "zh";
    }
    return "en";
}

function makeDefaultSettings() {
    const lang = detectDefaultLanguage();
    const codeCountMethod = "line";
    const defaultConfig = getDefaultLangConfig(lang, codeCountMethod);
    return {
        version: "3.0.0",
        language: lang,

        prependRows: 1,
        appendRows: 1,
        rowConfigs: deepClone(defaultConfig.rowConfigs),

        countPunctuation: true,
        readingSpeed: 300,
        pageSize: 600,
        readingTimeDecimal: false,
        pageCountDecimal: false,
        excludeComments: true,
        excludeCodeBlocks: true,
        excludeLinkInvisible: true,
        excludeFootnotes: true,
        charCountMethod: "exclude_whitespace",
        timeWithClockCreated: true,
        timeWithClockModified: true,

        // 新增统计规则开关
        linkCountExcludeImages: true,
        excludeAppendedImages: true,
        codeCountMethod: "line",
        excludeInlineCode: true,
        excludeEmbeds: true,
        excludeHashtags: true,
        excludeLatex: true,
        countEmoji: false,
        linkImageSingleWarning: true,

        separator: "｜",
        previewFoldYaml: false,
        previewFoldStart: false,
        previewFoldEnd: false,

        display: deepClone(defaultConfig.display),

        // 文章结构图（目录脑图）配置
        toc: aiiMakeDefaultTocSettings(lang),
        tocMap: {},

        presets: [
            { name: "预设1", settings: null },
            { name: "预设2", settings: null },
            { name: "预设3", settings: null },
            { name: "预设4", settings: null }
        ],
        selectedPreset: 0
    };
}

// 作为版本号基准与引用底本（实际克隆请用 makeDefaultSettings()）
const DEFAULT_SETTINGS = deepClone(makeDefaultSettings());

// ═══════════════════════════════════════════════════════════════
// 辅助函数
// ═══════════════════════════════════════════════════════════════
function deepClone(obj) {
    if (obj == null || typeof obj !== "object") return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (Array.isArray(obj)) return obj.map(deepClone);
    const clone = {};
    for (const key of Object.keys(obj)) {
        clone[key] = deepClone(obj[key]);
    }
    return clone;
}

function exportSettingsForPreset(s) {
    const exported = deepClone(s);
    delete exported.presets;
    delete exported.selectedPreset;
    delete exported.version;
    return exported;
}

// 图片扩展名正则模块级缓存（isImageUrl 在统计/去重热路径上，避免每链接重复编译）
const AII_IMG_EXT_RE = /\.(png|jpg|jpeg|gif|bmp|svg|webp|heic|jxl|avif)([?#]|$)/i;

function isImageUrl(url) {
    if (!url) return false;
    const u = String(url);
    // 常见图片扩展名
    if (AII_IMG_EXT_RE.test(u)) return true;
    // 微信公众号/腾讯系图片参数
    if (/wx_fmt=/i.test(u)) return true;
    if (/[?&]tp=(webp|jpg|jpeg|png|gif|bmp|svg)/i.test(u)) return true;
    // 微信图片 CDN 域名特征
    if (/mmbiz\.(qpic|weixin)\.cn\//i.test(u)) return true;
    return false;
}

// 基础模式（原生 Markdown）下对 URL 做最小化整理：
// - 网络或已带协议的路径保持原样
// - Windows 绝对路径反斜杠转正斜杠
// - 无协议的纯域名（如 www.baidu.com）自动补 https://，确保导出 PDF/Word 时外链正常
function normalizeBasicUrl(url) {
    if (!url) return url;
    const trimmed = url.trim();
    if (/^(https?:\/\/|file:\/\/\/|data:)/i.test(trimmed)) return trimmed;
    if (/^[A-Za-z]:[\\\/]/.test(trimmed)) {
        return trimmed.replace(/\\/g, "/");
    }
    if (/^\//.test(trimmed)) return trimmed;
    // 形如 www.baidu.com、img.example.com/pic.png 等纯域名/路径补 https://
    if (!trimmed.includes("/") && trimmed.includes(".")) {
        return "https://" + trimmed;
    }
    return trimmed.replace(/\\/g, "/");
}

// ═══════════════════════════════════════════════════════════════
// 本地图片导入：复制外部图片到 Obsidian 附件目录并按 MD5 重命名
// ═══════════════════════════════════════════════════════════════
function toSystemPath(p) {
    if (!p) return p;
    if (/^[A-Za-z]:\//.test(p)) return p.replace(/\//g, "\\");
    return p;
}

function decodeFileUrl(url) {
    if (!/^file:\/\/\//i.test(url)) return null;
    let p = decodeURIComponent(url.slice(8));
    return toSystemPath(p);
}

function resolveImageUrlInfo(rawUrl, file, app) {
    const url = String(rawUrl || "").trim();
    if (!url) return null;
    // 网络图片：无需导入
    if (/^https?:\/\//i.test(url)) return { type: "network", url };
    // file:/// 协议
    if (/^file:\/\/\//i.test(url)) {
        return { type: "external", url, absolutePath: decodeFileUrl(url) };
    }
    // Windows 绝对路径
    if (/^[A-Za-z]:[\\\/]/.test(url)) {
        return { type: "external", url, absolutePath: url.replace(/\//g, "\\") };
    }
    // Unix 绝对路径
    if (/^\//.test(url)) {
        return { type: "external", url, absolutePath: url };
    }
    // vault 内相对路径：先按 vault root 解析，再按笔记所在文件夹解析
    const normalized = normalizePath(url);
    let tfile = app.vault.getAbstractFileByPath(normalized);
    if (!tfile && file.parent) {
        const rel = normalizePath(file.parent.path + "/" + url);
        tfile = app.vault.getAbstractFileByPath(rel);
    }
    if (tfile) {
        const adapter = app.vault.adapter;
        const abs = adapter && adapter.getFullPath ? adapter.getFullPath(tfile.path) : null;
        return { type: "vault", url, relativePath: tfile.path, absolutePath: abs };
    }
    return { type: "unknown", url };
}

async function computeMd5(data) {
    try {
        const crypto = require("crypto");
        const hash = crypto.createHash("md5");
        if (Buffer.isBuffer(data)) hash.update(data);
        else if (data instanceof ArrayBuffer) hash.update(Buffer.from(data));
        else if (data instanceof Uint8Array) hash.update(Buffer.from(data.buffer, data.byteOffset, data.byteLength));
        else hash.update(String(data));
        return hash.digest("hex");
    } catch (e) {
        return null;
    }
}

// ── Node fs 的唯一使用点（vault 之外的文件）─────────────────────────────────
// 用途：读取「不在 vault 内」的图片（Windows 绝对路径 / Unix 绝对路径 / file:/// 链接），
//       以便按内容 MD5 命名并复制进附件目录。
// 为什么不能换成 Obsidian API：Vault API 与 Adapter API 都只作用于 vault 内路径，
//       Web API 也不允许读取任意本地文件 —— 该能力在桌面版只能由 Node 提供。
// 合规性：manifest.json 已声明 "isDesktopOnly": true（Obsidian 官方提交要求：
//       使用 fs/crypto/os 等 Node API 必须设 isDesktopOnly，否则移动端会加载失败）。
// 因此 Obsidian 审核的 "Direct Filesystem Access" 提示属**预期内**，不是缺陷。
async function readExternalFileBytes(absolutePath) {
    const fs = require("fs");
    return await fs.promises.readFile(absolutePath);
}

async function computeFileMd5(absolutePath) {
    try {
        const buf = await readExternalFileBytes(absolutePath);
        return await computeMd5(buf);
    } catch (e) {
        return null;
    }
}

function extractMd5FromFilename(url) {
    if (!url) return null;
    const clean = String(url).replace(/[<>]/g, "").split(/[?#]/)[0];
    const name = clean.split(/[\\/]/).pop();
    if (!name) return null;
    // 本地图片一定有扩展名；只从形如 "<32位md5>.<ext>" 的文件名中提取 md5
    const ext = "png|jpg|jpeg|gif|bmp|svg|webp|heic|jxl|avif";
    const m = name.match(new RegExp("^([a-f0-9]{32})\\.(" + ext + ")$", "i"));
    return m ? m[1].toLowerCase() : null;
}

// 安全读取附件文件夹配置：getConfig 在部分环境（移动端/测试 mock/老版本）不可用，
// 不可用时回退 null（等同"未配置附件文件夹"→ 放根目录），避免整条插入流程抛错。
function aiiSafeAttachmentPath(vault) {
    try {
        return (vault && typeof vault.getConfig === "function") ? vault.getConfig("attachmentFolderPath") : null;
    } catch (e) { return null; }
}

function resolveAttachmentFolder(configPath, file) {
    if (!configPath) return file.parent ? file.parent.path : "";
    let path = String(configPath);
    const title = file.basename || "";
    const fileName = file.name || "";
    const folderName = file.parent ? file.parent.name : "";
    const folderPath = file.parent ? file.parent.path : "";
    path = path.replace(/\{\{title\}\}/g, title);
    path = path.replace(/\{\{fileName\}\}/g, fileName);
    path = path.replace(/\{\{folderName\}\}/g, folderName);
    path = path.replace(/\{\{folderPath\}\}/g, folderPath);
    if (typeof window !== "undefined" && window.moment) {
        path = path.replace(/\{\{date\}\}/g, window.moment().format("YYYY-MM-DD"));
        path = path.replace(/\{\{time\}\}/g, window.moment().format("HH-mm-ss"));
    }
    // ./ 开头表示相对于当前笔记所在文件夹
    if (path.startsWith("./")) {
        const base = file.parent ? file.parent.path : "";
        return normalizePath((base ? base + "/" : "") + path.slice(2));
    }
    return normalizePath(path);
}

// 将 vault 根相对路径转换为「当前笔记所在文件夹」的相对路径，用于 Markdown 链接。
// 例如 note 在 Clippings/Note.md，图片在 Clippings/assets/Clippings/md5.png，
// 则返回 ./assets/Clippings/md5.png，与 Better Markdown Links 的链接风格一致。
function vaultPathToNoteRelative(vaultPath, noteDir) {
    if (!vaultPath) return vaultPath;
    const vp = String(vaultPath).split("/").filter(p => p !== "");
    const nd = noteDir ? String(noteDir).split("/").filter(p => p !== "") : [];
    let common = 0;
    while (common < nd.length && common < vp.length && nd[common] === vp[common]) common++;
    const upCount = nd.length - common;
    const rest = vp.slice(common);
    const parts = Array(upCount).fill("..").concat(rest);
    if (parts.length === 0) return "./";
    if (parts[0] !== "..") return "./" + parts.join("/");
    return parts.join("/");
}

function parseLinkImageLine(line) {
    if (!line) return null;
    // 尖括号包裹的 URL（如 [t](<path with space>)）需剥掉外层 <>，否则会与不带尖括号的
    // insertedMap.url 比对不一致，导致 removeOldMarker 删不掉旧标记而重复插入。
    const stripAngle = (u) => { const m = u.match(/^<(.+)>$/); return m ? m[1] : u; };
    // Markdown 图片
    const mdImg = line.match(/!\[([^\]]*)\]\(([^)]+)\)/);
    if (mdImg) return { type: "markdown", label: mdImg[1], url: stripAngle(mdImg[2]), isImage: true };
    // Markdown 链接
    const mdLink = line.match(/\[([^\]]*)\]\(([^)]+)\)/);
    if (mdLink) return { type: "markdown", label: mdLink[1], url: stripAngle(mdLink[2]), isImage: false };
    // Wiki 图片（含扩展名或纯 md5 短链）
    const wiki = line.match(/!\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/);
    if (wiki && (isImageUrl(wiki[1]) || extractMd5FromFilename(wiki[1]))) return { type: "wiki", label: "", url: wiki[1], isImage: true };
    // Wiki 链接（非图片）
    const wikiLink = line.match(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/);
    if (wikiLink) return { type: "wiki", label: wikiLink[2] || wikiLink[1], url: wikiLink[1], isImage: false };
    return null;
}

// 从一行中提取所有图片 URL（Markdown 图片 / Wiki 图片 / HTML <img>），兼容尖括号与无扩展名短链。
function extractImageUrls(line) {
    if (!line) return [];
    const urls = [];
    const stripAngle = (u) => { const m = u.match(/^<(.+)>$/); return m ? m[1] : u; };
    // Markdown 图片 ![alt](url) —— 兼容带/不带尖括号、空 alt
    const mdImgRe = /!\[[^\]]*\]\(([^)]+)\)/g;
    let m;
    while ((m = mdImgRe.exec(line))) {
        const u = stripAngle(m[1].trim());
        if (u) urls.push(u);
    }
    // Wiki 图片 ![[target]] 或 ![[target|width]]（含扩展名或纯 md5）
    const wikiRe = /!\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g;
    while ((m = wikiRe.exec(line))) {
        const t = m[1].trim();
        if (t && (isImageUrl(t) || extractMd5FromFilename(t))) urls.push(t);
    }
    // HTML <img src="...">
    const imgRe = /<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi;
    while ((m = imgRe.exec(line))) {
        const u = stripAngle(m[1].trim());
        if (u) urls.push(u);
    }
    return urls;
}

// 在一段连续行范围内找出所有尖括号 Markdown 图片（![...](<...>)），支持 URL 跨行。
// 返回 [{ start, end, url }]，其中 start/end 为相对于 lines 的索引（含）。
function findAngleImageRanges(lines, startIdx, endIdx) {
    const result = [];
    if (startIdx > endIdx) return result;
    const region = lines.slice(startIdx, endIdx + 1).join("\n");
    // 匹配尖括号包裹的 Markdown 图片 ![alt](<url>)，支持 URL 被格式化插件折行成多行的情况；
    // 惰性匹配 *? 在遇到嵌套尖括号等异常结构时会取最短闭合，足以覆盖"长 URL 折行"这一真实场景。
    const re = /!\[[^\]]*\]\(\s*<([\s\S]*?)>\s*\)/g;
    let m;
    while ((m = re.exec(region))) {
        const matchStart = m.index;
        const matchEnd = m.index + m[0].length;
        const relStart = (region.slice(0, matchStart).match(/\n/g) || []).length;
        const relEnd = (region.slice(0, matchEnd).match(/\n/g) || []).length;
        const url = m[1].replace(/\s+/g, ""); // 去掉跨行带来的换行/空白
        result.push({ start: startIdx + relStart, end: startIdx + relEnd, url });
    }
    return result;
}

// 计算一个本地图片链接的 md5：优先「按真实文件内容」计算（用户明确要求"计算找到的
// 本地图片的 MD5"，这样无论外部格式化插件如何改写链接路径/格式，只要指向同一文件就能
// 命中）；解析不到文件时回退到文件名 md5；网络图片不参与本地图片去重，返回 null。
async function resolveLocalImageMd5(rawUrl, file, app) {
    if (/^https?:\/\//i.test(String(rawUrl || "").trim())) return null;
    const info = resolveImageUrlInfo(rawUrl, file, app);
    if (!info || info.type === "network") return extractMd5FromFilename(rawUrl);
    if (info.type === "vault" && info.relativePath) {
        // vault 内图片：走 Vault API 读字节。审核指南明确「优先 Vault API 而非 Adapter/fs」，
        // 且能避开 file:// 百分号编码、盘符大小写等平台差异。
        const tfile = app.vault.getAbstractFileByPath(normalizePath(info.relativePath));
        if (tfile) {
            try {
                const md5 = await computeMd5(await app.vault.readBinary(tfile));
                if (md5) return md5.toLowerCase();
            } catch (e) { /* 读失败 → 回退文件名 md5 */ }
        }
    } else if (info.type === "external" && info.absolutePath) {
        // vault 外文件：Obsidian / Web API 都没有读取 vault 之外任意路径的能力，
        // 只能经 Node fs（manifest 已设 isDesktopOnly: true）。详见 readExternalFileBytes。
        const md5 = await computeFileMd5(info.absolutePath);
        if (md5) return md5.toLowerCase();
    }
    return extractMd5FromFilename(rawUrl);
}

async function copyImageToVault(sourceInfo, file, app) {
    // 将本地图片（vault 内或 vault 外）统一复制到 Obsidian 附件目录，并按 MD5 命名
    if (!sourceInfo || sourceInfo.type === "network" || sourceInfo.type === "unknown") return null;

    let sourceBuffer = null;
    let ext = "png";

    if (sourceInfo.type === "external" && sourceInfo.absolutePath) {
        try {
            sourceBuffer = await readExternalFileBytes(sourceInfo.absolutePath);
        } catch (e) { return null; }
        const extMatch = sourceInfo.absolutePath.match(/\.([a-zA-Z0-9]+)$/);
        ext = (extMatch ? extMatch[1] : "png").toLowerCase();
    } else if (sourceInfo.type === "vault") {
        const tfile = app.vault.getAbstractFileByPath(normalizePath(sourceInfo.relativePath));
        if (!tfile) return null;
        try {
            sourceBuffer = await app.vault.readBinary(tfile);
        } catch (e) { return null; }
        const extMatch = sourceInfo.relativePath.match(/\.([a-zA-Z0-9]+)$/);
        ext = (extMatch ? extMatch[1] : "png").toLowerCase();
    }

    if (!sourceBuffer) return null;
    const md5 = await computeMd5(sourceBuffer);
    if (!md5) return null;

    const targetName = `${md5}.${ext}`;
    const folder = resolveAttachmentFolder(aiiSafeAttachmentPath(app.vault), file);
    const targetRelativePath = folder ? normalizePath(folder + "/" + targetName) : targetName;
    const existing = app.vault.getAbstractFileByPath(targetRelativePath);
    if (!existing) {
        const parent = targetRelativePath.split("/").slice(0, -1).join("/");
        if (parent) {
            const parentFolder = app.vault.getAbstractFileByPath(parent);
            if (!parentFolder) await app.vault.createFolder(parent);
        }
        await app.vault.createBinary(targetRelativePath, sourceBuffer);
    }
    return { md5, relativePath: targetRelativePath };
}

function escapeHtml(text) {
    return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// === TOC-GEN-START ===
// 文章结构图（目录脑图）SVG 生成器：纯函数，不依赖 Obsidian API，便于单测。
// ── 表头（表头名称）样式：独立于「全局」文字设置（2026-10-05）──
// 支持「行数控制」拆多行：值为 0 时不拆（=旧行为，单行）。
function aiiHeaderLines(o) {
    const text = String((o && o.title) || "");
    if (!text) return [];
    const n = Number(o.headerMaxChars) || 0;
    if (n < 1) return [text];
    const out = [];
    if ((o.headerWrapMode || "chars") === "lines") {
        // 按行数：整题均分为 n 行（1 = 不拆）
        const rows = Math.max(1, Math.min(12, Math.round(n)));
        if (rows <= 1 || text.length <= rows) return [text];
        const per = Math.ceil(text.length / rows);
        for (let i = 0; i < text.length; i += per) out.push(text.slice(i, i + per));
        return out.length ? out : [text];
    }
    // 按字数：每行最多 n 字
    const per = Math.max(1, Math.round(n));
    for (let i = 0; i < text.length; i += per) out.push(text.slice(i, i + per));
    return out.length ? out : [text];
}
// 表头占高：1 行时 = 字号 + 14（与旧版 `o.fontSize + 14` 完全一致，默认观感零变化）
function aiiHeaderHeight(o) {
    if (!o || !o.title) return 0;
    const fs = Number(o.headerFontSize) || Number(o.fontSize) || 14;
    const lh = Math.max(1, Number(o.lineHeight) || 1.35);
    const rows = aiiHeaderLines(o).length || 1;
    return (rows - 1) * fs * lh + fs + 14;
}
// 表头实际生效样式（缺省回退全局文字设置）
function aiiHeaderStyle(o) {
    return {
        fs: Number(o.headerFontSize) || Number(o.fontSize) || 14,
        color: o.headerTextColor || o.textColor,
        ff: o.headerFontFamily || o.fontFamily,
        weight: (o.headerBold !== false) ? ' font-weight="700"' : "",
        italic: o.headerItalic ? ' font-style="italic"' : ""
    };
}

// 文字色的「显示基准」：5 级完全一致（=实际生效色）时以它为准显示，
// 避免历史遗留的 toc.textColor 与每级不一致时，全局色点显示成错色（用户 2026-10-04 报）。
function aiiUnifiedTextColor(toc) {
    if (!toc || !toc.levels) return "";
    const vals = ["title", "1", "2", "3", "4"].map((k) => (toc.levels[k] ? toc.levels[k].textColor : "")).filter(Boolean);
    if (vals.length && vals.every((v) => v === vals[0])) return vals[0];
    return "";
}

// lang：仅用于决定「表头名称」这一**内容默认值**（中文 → 文章结构 / 英文 → Article structure）。
// 其余字段与语言无关。不传时按中文处理（历史行为）。
function aiiMakeDefaultTocSettings(lang) {
    return {
        layout: "horizontal",     // horizontal=横向 | vertical=纵向 | radial=放射状
        title: tr(lang === "en" ? "en" : "zh", "文章结构"),   // 表头名称；留空则不显示表头
        showArticleName: true,    // 是否把笔记标题作为根节点（思维导图风格默认开）
        nodeDots: true,           // 连接点圆点（分支空心/叶子实心）
        dotSize: 2,             // 圆点半径
        gapX: 32,                 // 层级间距（横向=列距，纵向=层距；放射状=一级引线净空）
        gapY: 18,                 // 行间距（同级节点行距）
        lineHeight: 1.35,         // 文字行高（倍数）
        width: 0,                 // 0 = 自动
        height: 0,                // 0 = 自动
        margin: 18,
        maxLevel: 4,              // [已废弃] 层级显示完全由每级「显示」勾选控制；此字段不再参与渲染，仅保留以兼容旧 data.json
        showSequence: false,      // 是否显示序号 1 / 1.1 / 1.2
        avoidSecondary: true,     // 避让次级：本级标题间距是否受下一级排布影响（全局；每级可覆盖）
        rangeMode: "all",         // all | range
        rangeStart: 1,            // 从第几个标题开始（1-based）
        rangeEnd: 0,              // 0 = 到末尾
        levelAlignment: "left",   // 同级标题堆砌对齐：left | center | right
        fontFamily: "Microsoft YaHei",
        fontSize: 14,
        textColor: "#ffffff",     // 深色胶囊框内用白字
        textBold: false,
        textItalic: false,
        // 表头（表头名称）独立样式：默认深色，保证在浅色底纹上可见
        headerFontFamily: "Microsoft YaHei",
        headerFontSize: 14,
        headerTextColor: "#201F1E",
        headerBold: true,
        headerItalic: false,
        headerWrapMode: "lines",
        headerMaxChars: 0,        // 0 = 不拆分（表头默认单行）
        boxShape: "capsule",      // underline=下划线 | rect | rounded | capsule | none
        boxMaxChars: 0,           // 节点框长度：0=不限制；wrapMode=chars 时 N=每行 N 字，lines 时 N=拆 N 行
        wrapMode: "lines",        // "chars"=按字数（每行最多 N 字） | "lines"=按行数（拆成 N 行）
        boxWidthMode: "auto",     // auto=按字数（框随文字） | uniform=等宽（同级统一为最宽框）
        boxColor: "#148190",
        boxStrokeColor: "#c4c4c4",
        boxStrokeWidth: 1,
        textOnLine: "center",     // above=连线以上 | center=连线上（默认，含文字安全区） | below=连线以下
        bgMode: "preset",         // preset | custom
        bgPreset: "warm",
        bgCustomColor: "#FFFFFF",
        bgCustomType: "solid",
        bgCustomGradient: "light",
        bgGradientType: "linear",
        bgGradientAngle: 180,
        bgGradientStrength: "mid",
        bgGradientReverse: true,   // 渐变方向：false=正向 | true=反向（首尾色对调）；仅渐变生效
        lineWidth: 1,
        lineShape: "arc",         // arc=弧形(初始) | rightangle=直角；旧值 auto 按弧形处理
        arcAngle: 7.5,            // 弧形曲率（**0~10**，内部 k = 值/10）；7.5 = 转角锐利
        radialStartAngle: 0,      // 放射状专用：第一个一级标题所在角度（度）；0 = 正上方，顺时针递增
        radialOffsetAngle: 0,     // 放射状专用：相邻同级标题的角度间隔（度）；0 = 自动（按数量均分 360°）
        lineColor: "#277c91",     // 全局基准色 = 一级引出线的颜色（下面各级由「连线变色」规则算出）
        // 变色效果：按「基准色 + 方案 + 维度 + 强度」派生各级颜色。默认开启彩虹色轮（按层级），
        // 这样"全局色 → 一级引出线，规则 → 下面几级"是一条闭环，而不是默认不变色后各说各话。
        boxColorVari: "shades",   // off | shades(深浅渐变) | analogous(邻近色) | complement(互补色) | contrast(反差色) | triad(三角色) | rainbow(彩虹色轮) | rainbowrev(反向色轮)
        boxColorVariDim: "level", // level=按层级变色（同级同色） | chapter=按章节变色（同级也变色）
        boxColorVariStrength: 3,  // 变色强度 0~10：0=相同，10=剧烈
        boxColorVariDir: "rev",   // 方向：fwd=正向（默认） | rev=反向（2026-10-02）
        lineColorVari: "analogous",
        lineColorVariDim: "level",
        lineColorVariStrength: 5,
        lineColorVariDir: "rev",  // 方向：fwd=正向（默认） | rev=反向
        levels: null,             // 每级独立设置（title/1/2/3/4）；null = 用思维导图默认配色，由 aiiTocEnsureLevels 补全
        appliedScheme: "mindmap", // 当前套用的「样式」方案；重置=回到该方案初始设置
        genId: ""                 // 本次生成的稳定 id（用于去重扫描）
    };
}

// 思维导图默认配色（对齐 Mindmap NextGen：depth1 #cb4b16 / depth2 #6c71c4 / depth3 #859900 / 更深 #b58900）
// 每级：下划线色=本层级色；连线色=下级的层级色（markmap 惯例：线随子级着色）
// 思维导图方案的层级：只定义「显隐 + 形态」，颜色与线宽一律由**全局基准**派生。
// （2026-09-30 用户定稿：全局设置是唯一基准——全局连线色即一级引出线的颜色，
//   「连线变色」规则据此算出下面各级颜色。方案再硬编码每级颜色/线宽会造成
//   「全局粗细 1 / 自定义 1.5」「全局灰 / 自定义彩色」的冲突，故一律不再写死。）
function aiiMakeMindmapLevels() {
    const mk = (visible, extra) => Object.assign(aiiMakeDefaultTocLevelSettings(), {
        visible: visible !== false,
        boxShape: "capsule"
    }, extra || {});
    // 文章标题级：拆 2 行 + 圆角矩形（其余级仍为胶囊；用户 2026-10-05 定稿）
    return { title: mk(true, { boxMaxChars: "2", boxShape: "rounded" }), "1": mk(true), "2": mk(true), "3": mk(false), "4": mk(false) };
}

// 每级独立设置（空串=跟随全局默认）
function aiiMakeDefaultTocLevelSettings() {
    return {
        visible: true,
        fontSize: "",
        fontFamily: "",
        fontDeform: "",       // "" | bold | italic | bolditalic | normal
        textColor: "",
        boxPosition: "",      // "" | above | center | below
        boxShape: "",         // "" | rect | rounded | capsule | none
        boxColor: "",
        boxStrokeColor: "",
        boxStrokeWidth: "",
        lineColor: "",
        lineWidth: "",
        lineShape: "",        // "" | arc | rightangle
        lineArc: "",
        boxMaxChars: "",      // "" | N（本级节点文字换行字数）
        boxWidthMode: "",     // "" | auto 按字数 | uniform 等宽
        fontFamilyCustom: "", // 字体选「自定义」时的字体名
        align: "",            // "" | left | center | right
        sequence: "",         // "" | on | off
        dotStyle: "solid",    // none=不显示 | hollow=空心 | solid=实心
        dotSize: 2,         // 圆点半径
        avoidSecondary: true  // 避让次级：本级标题间距是否受下一级标题排布影响（ON=子级感知、OFF=本级均匀间距）
    };
}

// 入参净化（第十轮审查加固，2026-09-20）：
// 把**非法或越界**的设置值收敛到安全范围，杜绝 NaN / 负尺寸 / 未知枚举值导致的
// 画布爆炸、SVG 属性损坏或抛错。原则是**只处理非法值**——合法的用户自定义值一律不动，
// 因此不会对既有配置产生任何可见改变（已用逐字节回归验证）。
// 底纹归一化：三个旧纯色预设（白底/米色底/黑底）统一收敛为「单色」
// （bgMode=custom + bgCustomType=solid + bgCustomColor）。「恢复默认 / 切换方案」也会写入
// preset+white，故必须在这里统一处理，否则设置页会判定"非自定义"而禁用颜色选择器
// （用户实测："重置后单色无法选颜色，要先切走再切回来"）。
function aiiNormalizeBg(toc) {
    if (!toc || toc.bgMode !== "preset") return toc;
    const SOLIDS = { white: "#ffffff", beige: "#F5F0E6", dark: "#1a1a1a" };
    if (SOLIDS[toc.bgPreset]) {
        toc.bgMode = "custom";
        toc.bgCustomType = "solid";
        toc.bgCustomColor = SOLIDS[toc.bgPreset];
    }
    return toc;
}

function aiiTocSanitizeToc(o) {
    if (!o || typeof o !== "object") return o;
    const def = aiiMakeDefaultTocSettings();
    const num = (v, fb, lo, hi) => {
        let n = Number(v);
        if (v === "" || v == null || !isFinite(n)) n = fb;
        if (n < lo) n = lo;
        if (n > hi) n = hi;
        return n;
    };
    const oneOf = (v, list, fb) => (list.indexOf(v) >= 0 ? v : fb);
    const str = (v, fb) => (typeof v === "string" && v ? v : fb);
    const wrap360 = (a) => (((a % 360) + 360) % 360);

    // 枚举类：未知值一律回落默认（避免渲染分支走到未定义行为）
    o.layout = oneOf(o.layout, ["horizontal", "vertical", "radial"], def.layout);
    o.boxShape = oneOf(o.boxShape, ["underline", "rect", "rounded", "capsule", "none"], def.boxShape);
    o.lineShape = oneOf(o.lineShape, ["arc", "rightangle", "straight", "auto"], def.lineShape);
    o.bgMode = oneOf(o.bgMode, ["preset", "custom"], def.bgMode);
    o.bgPreset = oneOf(o.bgPreset, ["white", "beige", "dark", "warm", "cool", "bluegray", "light"], def.bgPreset);
    o.bgCustomType = oneOf(o.bgCustomType, ["solid", "gradient"], def.bgCustomType);
    o.bgCustomGradient = oneOf(o.bgCustomGradient, ["light", "dark"], def.bgCustomGradient);
    o.bgGradientType = oneOf(o.bgGradientType, ["linear", "radial"], def.bgGradientType);
    o.bgGradientStrength = oneOf(o.bgGradientStrength, ["strong", "mid", "weak"], def.bgGradientStrength);
    o.boxWidthMode = oneOf(o.boxWidthMode, ["auto", "uniform"], def.boxWidthMode);
    o.textOnLine = oneOf(o.textOnLine, ["above", "center", "below"], def.textOnLine);
    o.levelAlignment = oneOf(o.levelAlignment, ["left", "center", "right"], def.levelAlignment);
    o.avoidSecondary = o.avoidSecondary !== false;   // 布尔：只有显式 false 才关
    o.rangeMode = oneOf(o.rangeMode, ["all", "range"], def.rangeMode);
    // 表头（表头名称）独立样式：字体/字号/颜色/粗斜/换行
    o.headerFontFamily = str(o.headerFontFamily, def.headerFontFamily);
    o.headerFontSize = num(o.headerFontSize, def.headerFontSize, 8, 72);
    o.headerTextColor = str(o.headerTextColor, def.headerTextColor);
    o.headerBold = o.headerBold !== false;           // 布尔：默认加粗（沿用旧版表头 font-weight=700）
    o.headerItalic = !!o.headerItalic;
    o.headerWrapMode = oneOf(o.headerWrapMode, ["chars", "lines"], def.headerWrapMode);
    o.headerMaxChars = num(o.headerMaxChars, 0, 0, 200);
    o.boxColorVari = oneOf(o.boxColorVari, ["off", "shades", "analogous", "complement", "contrast", "triad", "rainbow", "rainbowrev"], def.boxColorVari);
    o.lineColorVari = oneOf(o.lineColorVari, ["off", "shades", "analogous", "complement", "contrast", "triad", "rainbow", "rainbowrev"], def.lineColorVari);
    o.boxColorVariDim = oneOf(o.boxColorVariDim, ["level", "chapter"], def.boxColorVariDim);
    o.lineColorVariDim = oneOf(o.lineColorVariDim, ["level", "chapter"], def.lineColorVariDim);
    o.boxColorVariDir = oneOf(o.boxColorVariDir, ["fwd", "rev"], "fwd");
    o.lineColorVariDir = oneOf(o.lineColorVariDir, ["fwd", "rev"], "fwd");
    o.bgGradientReverse = o.bgGradientReverse === true;

    // 数值类：非有限数回落默认，再夹到合理区间
    o.fontSize = num(o.fontSize, def.fontSize, 8, 72);
    o.gapX = num(o.gapX, def.gapX, 10, 400);
    o.gapY = num(o.gapY, def.gapY, 4, 400);
    o.lineHeight = num(o.lineHeight, def.lineHeight, 1, 4);
    o.width = num(o.width, 0, 0, 20000);          // 0 = 自动
    o.height = num(o.height, 0, 0, 20000);
    o.margin = num(o.margin, def.margin, 0, 400);
    o.boxStrokeWidth = num(o.boxStrokeWidth, def.boxStrokeWidth, 0, 20);
    o.lineWidth = num(o.lineWidth, def.lineWidth, 0.1, 20);
    o.arcAngle = num(o.arcAngle, def.arcAngle, 0, 10);   // ⚠️ 上限是 10（不是 1）
    o.boxMaxChars = num(o.boxMaxChars, 0, 0, 200);
    o.wrapMode = (o.wrapMode === "lines" ? "lines" : "chars");
    o.dotSize = num(o.dotSize, def.dotSize, 0, 20);
    o.radialStartAngle = wrap360(num(o.radialStartAngle, 0, -1e6, 1e6));
    o.radialOffsetAngle = wrap360(num(o.radialOffsetAngle, 0, -1e6, 1e6));
    o.rangeStart = num(o.rangeStart, 1, 1, 100000);
    o.rangeEnd = num(o.rangeEnd, 0, 0, 100000);
    o.boxColorVariStrength = num(o.boxColorVariStrength, 5, 0, 10);
    o.lineColorVariStrength = num(o.lineColorVariStrength, 5, 0, 10);

    // 颜色/文字：只补"空或非字符串"，不校验格式（避免误伤 CSS 颜色名等合法写法）
    o.textColor = str(o.textColor, def.textColor);
    o.boxColor = str(o.boxColor, def.boxColor);
    o.boxStrokeColor = str(o.boxStrokeColor, def.boxStrokeColor);
    o.lineColor = str(o.lineColor, def.lineColor);
    o.bgCustomColor = str(o.bgCustomColor, def.bgCustomColor);
    o.title = typeof o.title === "string" ? o.title : String(o.title == null ? "" : o.title);

    // levels 结构异常（如被写成数组）→ 交给 ensureLevels 重建
    if (o.levels && Array.isArray(o.levels)) o.levels = null;
    return o;
}

// 补全 levels（旧数据/预设兼容）；null/缺失 = 采用当前方案的默认配色
function aiiTocEnsureLevels(toc) {
    const keys = ["title", "1", "2", "3", "4"];
    if (!toc.levels || typeof toc.levels !== "object") toc.levels = aiiMakeLevelsForScheme(toc.appliedScheme);
    const def = aiiMakeDefaultTocLevelSettings();
    for (const k of keys) {
        if (!toc.levels[k] || typeof toc.levels[k] !== "object") toc.levels[k] = Object.assign({}, def);
        else for (const f of Object.keys(def)) if (toc.levels[k][f] === undefined) toc.levels[k][f] = def[f];
    }
    // levels 存在但全为空壳（旧版 data.json 迁移产生的 {} 或全空对象）时，
    // 说明从未注入过任何层级值：此时必须按当前方案补一套默认层级，
    // 否则「切换预设 → 结构图黑白」——因为空壳让所有级别回落到无彩色的全局默认。
    if (aiiTocLevelsAllBlank(toc.levels)) {
        const base = aiiMakeLevelsForScheme(toc.appliedScheme);
        for (const k of keys) {
            const cur = toc.levels[k];
            const b = base[k] || {};
            for (const f of Object.keys(b)) {
                if (cur[f] === "" || cur[f] == null) cur[f] = b[f];
            }
        }
    }
    return toc;
}

// 判断 levels 是否所有级别的关键样式字段都为空（未注入过任何方案值）
function aiiTocLevelsAllBlank(levels) {
    if (!levels || typeof levels !== "object") return true;
    const probe = ["boxShape", "boxStrokeColor", "lineColor"];
    for (const k of ["title", "1", "2", "3", "4"]) {
        const l = levels[k];
        if (!l) continue;
        for (const f of probe) if (l[f]) return false;
    }
    return true;
}

// 按方案 key 取默认层级：mindmap 用彩色思维导图配色，其余用带框方案层级
function aiiMakeLevelsForScheme(schemeKey) {
    return (schemeKey && schemeKey !== "mindmap") ? aiiMakeSchemeLevels() : aiiMakeMindmapLevels();
}

// 将每级空值一次性具体化为当前实际生效值（无"默认/全局"概念，样式切换后全量注入）
function aiiTocMaterializeLevels(toc) {
    const deform = toc.textBold && toc.textItalic ? "bolditalic" : (toc.textBold ? "bold" : (toc.textItalic ? "italic" : "normal"));
    const fill = {
        fontSize: toc.fontSize, fontFamily: toc.fontFamily, fontDeform: deform,
        textColor: toc.textColor, boxPosition: toc.textOnLine, boxShape: toc.boxShape,
        boxMaxChars: Number(toc.boxMaxChars) || 0, boxColor: toc.boxColor, boxStrokeColor: toc.boxStrokeColor,
        boxWidthMode: (toc.boxWidthMode === "uniform" ? "uniform" : "auto"),
        boxStrokeWidth: toc.boxStrokeWidth, lineColor: toc.lineColor,
        lineWidth: toc.lineWidth, lineShape: (toc.lineShape === "auto" ? "arc" : (toc.lineShape || "arc")), lineArc: toc.arcAngle,
        align: toc.levelAlignment, sequence: toc.showSequence ? "on" : "off",
        dotStyle: (toc.nodeDots === false ? "none" : "solid"), dotSize: (toc.dotSize != null ? toc.dotSize : 2)
    };
    for (const k of ["title", "1", "2", "3", "4"]) {
        const l = toc.levels && toc.levels[k];
        if (!l) continue;
        for (const f of Object.keys(fill)) if (l[f] === "" || l[f] == null) l[f] = fill[f];
    }
    return toc;
}

// ── 「样式」方案：切换时一次性具体化注入；重置 = 回到当前方案初始设置 ──
const AII_TOC_SCHEMES = {
    // 全局基准色即"一级引出线 / 一级框描边"的颜色；配「彩虹色轮·按层级」规则派生下面各级。
    mindmap:  { bgMode: "preset", bgPreset: "warm", bgGradientReverse: true, textColor: "#ffffff",
                lineColor: "#277c91", boxColor: "#148190", boxStrokeColor: "#c4c4c4", boxShape: "capsule",
                wrapMode: "lines",
                lineColorVari: "analogous", lineColorVariDim: "level", lineColorVariStrength: 5, lineColorVariDir: "rev",
                boxColorVari: "shades", boxColorVariDim: "level", boxColorVariStrength: 3, boxColorVariDir: "rev" },
    // 带框圆角矩形方案：位置=连线上、对齐=居中、宽度=等宽（第一个思维导图方案保持 按字数+左对齐+连线以上）
    white:    { bgMode: "preset", bgPreset: "white", textColor: "#201F1E", lineColor: "#605E5C", boxColor: "#FFFFFF", boxStrokeColor: "#E1DFDD", boxShape: "rounded", textOnLine: "center", levelAlignment: "center", boxWidthMode: "uniform" },
    beige:    { bgMode: "preset", bgPreset: "beige", textColor: "#3F3F3F", headerTextColor: "#3F3F3F", lineColor: "#605E5C", boxColor: "#FDFBF6", boxStrokeColor: "#D8CFC0", boxShape: "rounded", textOnLine: "center", levelAlignment: "center", boxWidthMode: "uniform" },
    dark:     { bgMode: "preset", bgPreset: "dark", textColor: "#FFFFFF", headerTextColor: "#FFFFFF", lineColor: "#F3F2F1", boxColor: "#3B3B3B", boxStrokeColor: "#605E5C", boxShape: "rounded", textOnLine: "center", levelAlignment: "center", boxWidthMode: "uniform" },
    warm:     { bgMode: "preset", bgPreset: "warm", textColor: "#201F1E", lineColor: "#605E5C", boxColor: "#FFFFFF", boxStrokeColor: "#E1DFDD", boxShape: "rounded", textOnLine: "center", levelAlignment: "center", boxWidthMode: "uniform" },
    cool:     { bgMode: "preset", bgPreset: "cool", textColor: "#201F1E", lineColor: "#4C6A92", boxColor: "#FFFFFF", boxStrokeColor: "#E1DFDD", boxShape: "rounded", textOnLine: "center", levelAlignment: "center", boxWidthMode: "uniform" },
    bluegray: { bgMode: "preset", bgPreset: "bluegray", textColor: "#201F1E", lineColor: "#605E5C", boxColor: "#FFFFFF", boxStrokeColor: "#E1DFDD", boxShape: "rounded", textOnLine: "center", levelAlignment: "center", boxWidthMode: "uniform" },
    light:    { bgMode: "preset", bgPreset: "light", textColor: "#201F1E", lineColor: "#605E5C", boxColor: "#FFFFFF", boxStrokeColor: "#E1DFDD", boxShape: "rounded", textOnLine: "center", levelAlignment: "center", boxWidthMode: "uniform" }
};
// 带框方案的层级初值：标题+一级+二级显示，三/四级隐藏
function aiiMakeSchemeLevels() {
    const def = aiiMakeDefaultTocLevelSettings();
    const out = {};
    for (const k of ["title", "1", "2", "3", "4"]) {
        out[k] = Object.assign({}, def, { visible: (k === "title" || k === "1" || k === "2") });
    }
    return out;
}
function aiiApplyTocScheme(tocObj, key) {
    const schemeKey = AII_TOC_SCHEMES[key] ? key : "mindmap";
    // 结构性字段不属于「样式」：切换方案时保留用户当前值，不联动重置
    // （2026-09-20 用户反馈：切样式会把排列方向重置回横向分布）
    const STRUCT_KEYS = ["layout", "title", "radialStartAngle", "radialOffsetAngle", "rangeMode", "rangeStart", "rangeEnd"];
    const saved = {};
    for (const k of STRUCT_KEYS) if (tocObj[k] !== undefined) saved[k] = tocObj[k];
    const base = aiiMakeDefaultTocSettings();
    // 「变色规则」只由方案显式声明：单色系方案（white/beige/dark/渐变系）一律回到「不变色」，
    // 避免继承默认方案的彩虹规则而把原本同色的线染成彩色（2026-09-30）。
    base.lineColorVari = "off";
    base.boxColorVari = "off";
    Object.assign(base, AII_TOC_SCHEMES[schemeKey]);
    base.appliedScheme = schemeKey;
    base.levels = aiiMakeLevelsForScheme(schemeKey);
    aiiTocEnsureLevels(base);
    aiiTocMaterializeLevels(base);
    Object.assign(tocObj, base);
    Object.assign(tocObj, saved);
    // 方案默认色快照：矩阵里颜色行的「×」= 恢复当前已选取样式的每级配色（而非全局色）。
    // 无快照（旧 data.json）时矩阵回退为恢复全局色（旧行为）。
    const snap = {};
    for (const k of ["title", "1", "2", "3", "4"]) {
        const l = tocObj.levels && tocObj.levels[k];
        if (l) snap[k] = { textColor: l.textColor, boxColor: l.boxColor, boxStrokeColor: l.boxStrokeColor, lineColor: l.lineColor, fontDeform: l.fontDeform };
    }
    tocObj.schemeSnap = snap;
    // 应用方案后立刻按「全局基准 + 变色规则」派生每级颜色，保证全局与自定义上下一致
    aiiDeriveLevelColors(tocObj);
    return tocObj;
}


function aiiParseHeadings(text) {
    const lines = String(text || "").split(/\r?\n/);
    const headings = [];
    let inFence = false, fenceTok = "", inMath = false;
    for (const line of lines) {
        const fence = line.match(/^\s*(```|~~~)/);
        if (fence) {
            if (!inFence) { inFence = true; fenceTok = fence[1]; }
            else if (fence[1] === fenceTok) { inFence = false; fenceTok = ""; }
            continue;
        }
        if (/^\s*\$\$/.test(line)) { inMath = !inMath; continue; }
        if (inFence || inMath) continue;
        const m = line.match(/^(#{1,6})\s+(.*?)\s*#*\s*$/);
        if (m) {
            let t = m[2].replace(/!?\[\[([^\]]+)\]\]/g, "$1").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").trim();
            headings.push({ level: m[1].length, text: t, index: headings.length });
        }
    }
    return headings;
}

// ── Markdown 代码围栏（``` / ~~~）感知的按行处理 ──────────────────────────
// 动机（2026-10-05 用户实测误删）：插件用自己的私有标记 data-aii="marker" 识别「上一次
// 插入的内容」，但原先的纯文本正则不认代码围栏 —— 教程/代码块里引用的示例会被当成
// 插件产出而删掉；更糟的是「有开无闭」的半个标签会因 [\s\S]*? 跨行吞掉无关正文。
// 这里统一约定「围栏内的行永不参与匹配」，与 aiiParseHeadings 的 inFence 判定同源。
//
// 行处理约定：lineFn(line) → undefined 保留原样 / "" 整行删除 / 字符串 替换该行。
// ⛔ 用 split("\n")/join("\n")（而非 /\r?\n/），保证 CRLF 文档逐字节不变。
function aiiFenceMask(lines) {
    const mask = new Array(lines.length);
    let inFence = false, tok = "";
    for (let i = 0; i < lines.length; i++) {
        const m = lines[i].match(/^[ \t]*(```|~~~)/);
        if (m) {
            if (!inFence) { inFence = true; tok = m[1]; }
            else if (m[1] === tok) { inFence = false; tok = ""; }
            mask[i] = true;          // 围栏行自身也不处理
            continue;
        }
        mask[i] = inFence;
    }
    return mask;
}

function aiiProcessOutsideFences(text, lineFn) {
    const lines = String(text == null ? "" : text).split("\n");
    const mask = aiiFenceMask(lines);
    const out = [];
    for (let i = 0; i < lines.length; i++) {
        if (mask[i]) { out.push(lines[i]); continue; }
        const r = lineFn(lines[i]);
        if (r === undefined || r === null) out.push(lines[i]);
        else if (r !== "") out.push(r);      // "" → 整行删除
    }
    return out.join("\n");
}

// 插件写入的标记：**单行完整** <div … data-aii="marker">…</div>
// ⛔ 勿放宽为跨行匹配（勿把 .*? 换成 [\s\S]*?）：否则「有开无闭」的半个标签会一路
//    吃到下方任意一个 </div>，连带删掉中间的用户正文。
const AII_MARKER_LINE_RE = /^[ \t]*<div\b[^>]*\bdata-aii=["']marker["'][^>]*>.*?<\/div>[ \t]*\r?$/;

function aiiStripMarkerLines(text) {
    return aiiProcessOutsideFences(text, (line) => (AII_MARKER_LINE_RE.test(line) ? "" : undefined));
}

// 兼容早期残留的 HTML 注释标记 <!-- aii-marker-start --> … <!-- aii-marker-end -->
// 仅当「起、止」两端都在围栏外、且中间不跨越围栏行时才整段删除。
function aiiStripLegacyCommentMarkers(text) {
    const lines = String(text == null ? "" : text).split("\n");
    const mask = aiiFenceMask(lines);
    const START = /^[ \t]*<!--\s*aii-marker-start\s*-->[ \t]*\r?$/;
    const END = /^[ \t]*<!--\s*aii-marker-end\s*-->[ \t]*\r?$/;
    const del = new Set();
    for (let i = 0; i < lines.length; i++) {
        if (mask[i] || !START.test(lines[i])) continue;
        let j = i + 1, closed = false;
        for (; j < lines.length; j++) {
            if (mask[j]) break;               // 中途撞上围栏 → 放弃（视为用户内容）
            if (END.test(lines[j])) { closed = true; break; }
        }
        if (!closed) continue;
        for (let k = i; k <= j; k++) del.add(k);
        i = j;
    }
    if (!del.size) return text;
    return lines.filter((_, i) => !del.has(i)).join("\n");
}

function aiiHexToRgb(hex) {
    let h = String(hex || "").replace("#", "").trim();
    if (h.length === 3) h = h.split("").map(c => c + c).join("");
    const n = parseInt(h, 16);
    if (isNaN(n)) return [0, 0, 0];
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function aiiRgbToHex(r, g, b) {
    const c = (v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0");
    return "#" + c(r) + c(g) + c(b);
}
function aiiAdjustLightness(hex, amt) {
    let [r, g, b] = aiiHexToRgb(hex);
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let l = (max + min) / 2 / 255;
    const d = (max - min) / 255;
    let h = 0, s = 0;
    if (d !== 0) {
        s = l > 0.5 ? d / (2 - max / 255 - min / 255) : d / (max / 255 + min / 255);
        const rr = r / 255, gg = g / 255, bb = b / 255;
        const mx = Math.max(rr, gg, bb), mn = Math.min(rr, gg, bb);
        const dd = mx - mn;
        if (mx === rr) h = ((gg - bb) / dd) % 6;
        else if (mx === gg) h = (bb - rr) / dd + 2;
        else h = (rr - gg) / dd + 4;
        h *= 60; if (h < 0) h += 360;
    }
    l = Math.max(0, Math.min(1, l + amt));
    const c2 = (1 - Math.abs(2 * l - 1)) * s;
    const x = c2 * (1 - Math.abs((h / 60) % 2 - 1));
    let r1 = 0, g1 = 0, b1 = 0;
    if (s === 0) r1 = g1 = b1 = 0;
    else if (h < 60) [r1, g1, b1] = [c2, x, 0];
    else if (h < 120) [r1, g1, b1] = [x, c2, 0];
    else if (h < 180) [r1, g1, b1] = [0, c2, x];
    else if (h < 240) [r1, g1, b1] = [0, x, c2];
    else if (h < 300) [r1, g1, b1] = [x, 0, c2];
    else [r1, g1, b1] = [c2, 0, x];
    const m = l - c2 / 2;
    return aiiRgbToHex((r1 + m) * 255, (g1 + m) * 255, (b1 + m) * 255);
}

function aiiHexToHsl(hex) {
    let [r, g, b] = aiiHexToRgb(hex).map(v => v / 255);
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        else if (max === g) h = ((b - r) / d + 2) / 6;
        else h = ((r - g) / d + 4) / 6;
    }
    return [h * 360, s, l];
}

function aiiHslToHex(h, s, l) {
    h = (((h % 360) + 360) % 360) / 360;
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    const f = (t) => {
        t = (t % 1 + 1) % 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 0.5) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };
    return aiiRgbToHex(f(h + 1 / 3) * 255, f(h) * 255, f(h - 1 / 3) * 255);
}

function aiiMeasure(text, fontSize) {
    let w = 0;
    for (const ch of String(text)) {
        const code = ch.codePointAt(0);
        if (code > 0x2e80) w += fontSize * 1.0;
        else if (/[iljftI.,:;'|!]/.test(ch)) w += fontSize * 0.3;
        else if (/\s/.test(ch)) w += fontSize * 0.45;
        else w += fontSize * 0.58;
    }
    return w;
}

// 将字体名规范为合法的 SVG/CSS font-family 取值：多词字体名（如 "Microsoft YaHei"、
// 用户自定义字体名）必须加引号。属性外层已是双引号，这里用单引号包裹，并去掉名字里
// 可能混入的单引号（真实字体名不含单引号），避免破坏属性。
function aiiQuoteFont(ff) {
    return "'" + String(ff || "").replace(/'/g, "") + "'";
}

// 根据基础色与变体生成渐变起止色
function aiiGradientStops(baseColor, variant, strength) {
    const base = String(baseColor || "#f7f7f7");
    const unit = variant === "dark" ? -0.22 : 0.22;
    // 强度：弱=明度差收敛，强=明度差放大，中=默认
    const f = strength === "strong" ? 1.7 : (strength === "weak" ? 0.45 : 1);
    return [base, aiiAdjustLightness(base, unit * f)];
}

// 角度（CSS linear-gradient 语义）转 SVG linearGradient 坐标百分比
function aiiLinearGradientCoords(angle) {
    const a = ((Number(angle) || 0) * Math.PI) / 180;
    return {
        x1: (50 - 50 * Math.sin(a)).toFixed(1) + "%",
        y1: (50 + 50 * Math.cos(a)).toFixed(1) + "%",
        x2: (50 + 50 * Math.sin(a)).toFixed(1) + "%",
        y2: (50 - 50 * Math.cos(a)).toFixed(1) + "%"
    };
}

// ── 变色效果引擎（第九轮）：基准色 + 方案 + 强度(0~10) + 步长 → 变化后的颜色 ──
// 专业配色方案命名（色相环语义）：
//   shades     深浅渐变 —— 同一色相只动明度，奇偶交替防止单调撞白/撞黑（用户说的"邻近色=深浅变化"）
//   analogous  邻近色环 —— 色相沿色轮小步旋转（每步≤24°），和谐过渡
//   complement 互补对照 —— 奇级/偶级在色轮直径两端跳变（+180°），并按阶数拉开明度（每级不同）
//   contrast   反差色   —— 明暗强反差（奇级压暗/偶级提亮、阶数越大越极端）+ 轻微色相偏移，
//                          反差强烈但不跳色相（2026-09-30 用户要求新增）
//   triad      三角色环 —— 每 3 步走完 120°×3 三角，循环稳定
//   rainbow    彩虹色轮 —— 色相按步长整圈轮换（36°/步×强度）
//   rainbowrev 兼容别名 —— 等价于 rainbow + dir=rev（下拉项已于 2026-10-03 删除，仅留旧配置兜底）
// 强度 f = strength/5 ∈ [0,2]：0 = 全部回到基准色，10 = 变化幅度×2
// 方向 dir：fwd（正向，默认）| rev（反向）—— 同一方案的反向变化（彩虹→反向色轮、深浅→由浅到深…）
function aiiVariColor(baseHex, mode, strength, step, dir) {
    const st = Math.max(0, Math.min(10, Number(strength) || 0));
    step = Math.max(0, Math.floor(Number(step) || 0));
    if (!mode || mode === "off" || st <= 0 || step <= 0) return baseHex;
    const sg = dir === "rev" ? -1 : 1;   // 方向符号：只作用于该方案的推进方向
    const f = st / 5;
    let [h, s, l] = aiiHexToHsl(baseHex);
    const wrap = (x) => ((x % 360) + 360) % 360;
    const clamp01 = (x) => Math.max(0.06, Math.min(0.97, x));
    switch (mode) {
        case "shades": {
            // 深浅渐变：同一色相沿明度**单调**递变（正向=逐级变浅，反向=逐级变深）。
            // ⛔ 旧版 `dir = step % 2 ? 1 : -1` 奇偶交替 → 视觉上"深浅随机"（用户 2026-10-02 反馈）。
            // 步长按"到该方向端点的余量 / 4.2"自适应收缩 —— 否则暗色基准往深走会撞底，
            // 末两级同色（又变成"看不出渐变"）。
            const head = sg > 0 ? (0.97 - l) : (l - 0.06);
            const dlt = Math.min(0.115 * Math.min(f, 1.3), Math.max(0, head) / 4.2);
            l = clamp01(l + sg * step * dlt);
            break;
        }
        case "analogous": {
            h = wrap(h + sg * step * 12 * f);
            s = Math.max(s, 0.25);
            l = Math.max(0.18, Math.min(0.86, l));  // 纯白/纯黑基准旋转色相不可见，拉回可见明度
            break;
        }
        case "complement": {
            // 互补对照：奇级取补色、偶级回基准色相，再按「阶数」拉开明度 ——
            // 旧版只在明度上 ±0.05，导致「一三级同色、二四级补色」看起来只有两级；
            // 现按阶数递进（k=1,1,2,2…），每级都不同，同时保住 180° 补色的本质。
            const odd = step % 2 === 1;
            const k = Math.ceil(step / 2);
            h = wrap(h + (odd ? 180 : 0));
            s = Math.max(s, 0.25);
            l = clamp01(l + sg * (odd ? 1 : -1) * (0.02 + 0.06 * (k - 1)) * f);
            l = Math.max(0.18, Math.min(0.86, l));
            break;
        }
        case "contrast": {
            // 反差色：明暗强反差（奇级压暗 / 偶级提亮），幅度随阶数递增 → 每级都不同；
            // 色相只做轻微偏移，避免 180° 补色那种「跳色」的突兀感。
            const up = step % 2 === 0;
            const mag = 0.20 + 0.10 * Math.floor((step - 1) / 2);
            l = clamp01(l + sg * (up ? 1 : -1) * mag * f);
            s = Math.max(0.28, Math.min(1, s * (up ? 0.9 : 1.12)));
            h = wrap(h + (up ? 16 : -16) * f);
            l = Math.max(0.14, Math.min(0.9, l));
            break;
        }
        case "triad": {
            h = wrap(h + sg * (step % 3) * 120);
            const lap = Math.floor(step / 3);
            if (lap > 0) l = clamp01(l + sg * (lap % 2 === 1 ? 1 : -1) * lap * 0.04 * f);
            s = Math.max(s, 0.25);
            l = Math.max(0.18, Math.min(0.86, l));
            break;
        }
        case "rainbow": {
            h = wrap(h + sg * step * 36 * f);
            s = Math.max(s, 0.35);
            l = Math.max(0.18, Math.min(0.86, l));
            break;
        }
        case "rainbowrev": {
            h = wrap(h - sg * step * 36 * f);
            s = Math.max(s, 0.35);
            l = Math.max(0.18, Math.min(0.86, l));
            break;
        }
        default:
            return baseHex;
    }
    return aiiHslToHex(h, Math.max(0, Math.min(1, s)), Math.max(0, Math.min(1, l)));
}

// ── 全局基准 → 每级颜色（2026-09-30 定稿）──
// 模型：全局「连线色」= 一级引出线的颜色（基准色）；全局「连线变色」规则（方案/维度/强度）
// 据此算出下面各级的颜色。结果**写入每级**，因此自定义矩阵的「颜色」格里看到的就是实际生效色。
//   · 维度=按层级：每级颜色由基准色 + 步长（列序号）派生 → 烘焙进 levels，渲染端不再叠加。
//   · 维度=按章节：颜色取决于文章实际章节数，无法预知 → 每级保留基准色，渲染时实时变色。
// 框底色/描边色 + 「底色变色」同理（步长按显示深度：标题层 0 = 基准色不变）。
// 同时刷新方案快照（矩阵「×」= 恢复当前派生色）。
function aiiDeriveLevelColors(toc) {
    if (!toc || !toc.levels) return toc;
    const KEYS = ["title", "1", "2", "3", "4"];
    const lineStep = { title: 0, "1": 1, "2": 2, "3": 3, "4": 4 };   // 该级 → 其下级 的线；标题列=基准色本身
    const boxStep = { title: 0, "1": 1, "2": 2, "3": 3, "4": 4 };     // 该级节点框
    const lineDimLevel = toc.lineColorVariDim !== "chapter";
    const boxDimLevel = toc.boxColorVariDim !== "chapter";
    const base = toc.lineColor;
    toc.schemeSnap = (toc.schemeSnap && typeof toc.schemeSnap === "object") ? toc.schemeSnap : {};
    for (const k of KEYS) {
        const l = toc.levels[k];
        if (!l) continue;
        l.lineColor = lineDimLevel ? aiiVariColor(base, toc.lineColorVari, toc.lineColorVariStrength, lineStep[k], toc.lineColorVariDir) : base;
        // （每级连线的着色完全由上面的「变色」规则决定；旧「预设」功能已于 2026-10-05 删除）
        l.boxColor = boxDimLevel ? aiiVariColor(toc.boxColor, toc.boxColorVari, toc.boxColorVariStrength, boxStep[k], toc.boxColorVariDir) : toc.boxColor;
        l.boxStrokeColor = boxDimLevel ? aiiVariColor(toc.boxStrokeColor, toc.boxColorVari, toc.boxColorVariStrength, boxStep[k], toc.boxColorVariDir) : toc.boxStrokeColor;
        toc.schemeSnap[k] = Object.assign({}, toc.schemeSnap[k], {
            textColor: l.textColor, boxColor: l.boxColor, boxStrokeColor: l.boxStrokeColor, lineColor: l.lineColor
        });
    }
    return toc;
}

function aiiBuildTocTree(allHeadings, opts, noteTitle) {
    // 1) 范围过滤（按标题序号）
    let ranged = allHeadings;
    if (opts.rangeMode === "range") {
        const start = Math.max(1, opts.rangeStart) - 1;
        const end = opts.rangeEnd > 0 ? opts.rangeEnd : allHeadings.length;
        ranged = allHeadings.slice(start, end);
    }
    // 2) 层级过滤：maxLevel 与每级显隐共同生效（隐藏某级=该级及其下级整体收起）
    const levels = opts.levels || {};
    let cutoff = 0;
    for (let lv = 1; lv <= 4; lv++) {
        const l = levels[String(lv)];
        if (l && l.visible === false) break;
        cutoff = lv;
    }
    const cap = cutoff;   // 显示层级完全由每级「显示」勾选控制（勾到几级排到几级）；maxLevel 字段仅保留兼容不再生效
    const filtered = ranged.filter(h => h.level <= cap)
        .map(h => ({ level: h.level, text: h.text }));

    const root = { level: 0, text: noteTitle || "", children: [], depth: 0, hidden: false, isRoot: true, parent: null };
    const stack = [root];
    for (const h of filtered) {
        const node = { level: h.level, text: h.text, children: [], hidden: false, isRoot: false };
        while (stack.length && stack[stack.length - 1].level >= h.level) stack.pop();
        const parent = stack[stack.length - 1] || root;
        node.parent = parent;
        parent.children.push(node);
        stack.push(node);
    }
    const setDepth = (n, d) => { n.depth = d; n.children.forEach(c => setDepth(c, d + 1)); };
    setDepth(root, 0);
    // 3) 标题序号（1 / 1.1 / 1.1.1），是否显示由每级设置决定
    const nums = [];
    const seqAll = (n, d) => {
        if (n.isRoot) { n.seq = ""; n.children.forEach(c => seqAll(c, 1)); return; }
        nums[d] = (nums[d] || 0) + 1;
        for (let k = d + 1; k < 12; k++) nums[k] = 0;
        n.seq = nums.slice(1, d + 1).join(".");
        n.children.forEach(c => seqAll(c, d + 1));
    };
    seqAll(root, 0);
    return root;
}

// 出点锚点：按 outward 主轴取该边中点（永不到框角）。从 generateTocSvg 抽出的纯函数（无闭包依赖）。
function aiiOutAnchorOf(n, ux, uy) {
    if (Math.abs(ux) >= Math.abs(uy)) {
        return { x: ux >= 0 ? Math.floor(n.x + n.w / 2) : Math.ceil(n.x - n.w / 2), y: Math.round(n.y) };
    }
    return { x: Math.round(n.x), y: uy >= 0 ? Math.floor(n.y + n.h / 2) : Math.ceil(n.y - n.h / 2) };
}

// ── 长标题避让（2026-10-04）：居中/右对齐时本列最宽的框会**向左凸出**到引线通道里，兄弟引线的
//    中段会从它字面上穿过（实测 align=center 时「2 → 2.1」压住「2.2 样式自由度…」）。
//    横向布局与放射状「水平推进」分支**共用本函数**，保证实现方式统一。
//    对策：先按原对称 S 采样自检，**只有真穿入兄弟盒**时才把曲线终点收到「本列最左外沿」，
//    再用一小段水平线补到自己的入点（水平段落在自己那一行，行间有间距，不会压字）。
//    boxes: [{ l, r, t, b, edge }] —— l/r/t/b = 字面框（命中判定），edge = 收口用的最左外沿
//    返回 { endX, tailTo }：endX = 曲线实际终点，tailTo = 需水平补到的 x（null = 无需收口）
//    ⚠️ 左对齐时「最左外沿」== 自己的入点 → 曲线一字不变（零回归）。
function aiiTocAvoidLongTitle(x1, y1, x2, y2, kap, boxes) {
    if (!boxes || !boxes.length) return { endX: x2, tailTo: null };
    const hit = (ex) => {
        const c1 = x1 + (ex - x1) * kap, c2 = ex - (ex - x1) * kap;
        // ⚠️ 采样必须够密：长引线（~1000px）× 细框（~31px 高）时，23 点会"跨过"框而漏检
        //    （实测横向 align=center 漏掉 1 处压字）→ 取 64 段。
        for (let i = 1; i < 64; i++) {
            const t = i / 64, u = 1 - t;
            const px = u * u * u * x1 + 3 * u * u * t * c1 + 3 * u * t * t * c2 + t * t * t * ex;
            const py = u * u * u * y1 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y2;
            if (px < x1 + 2) continue;                       // 出点附近（同父共享出点）
            for (const b of boxes) {
                if (px > b.l - 1 && px < b.r + 1 && py > b.t + 1 && py < b.b - 1) return true;
            }
        }
        return false;
    };
    if (!hit(x2)) return { endX: x2, tailTo: null };
    let xCol = Infinity;
    for (const b of boxes) xCol = Math.min(xCol, b.edge);
    if (isFinite(xCol) && xCol > x1 + 6 && xCol < x2 - 1 && !hit(xCol)) return { endX: xCol, tailTo: x2 };
    return { endX: x2, tailTo: null };
}

// ── TOC SVG 输出组装（从 generateTocSvg 抽出）：接收已布局完成的 ctx，产出最终 SVG 字符串 ──
function aiiTocAssemble(ctx) {
    const { o, root, showRoot, totalW, totalH, radialAutoAdjusted, LV, numOf, dispDepth, wrapLabel, fontSizeOf, boxShapeOf, deformOf, textColorOf, fontFamilyOf, alignOf, boxColorOf, boxStrokeColorOf, boxStrokeWidthOf, boxPosOf, lineOptsOf, ARC_K, H_GAP, LINE_H, padX, outAnchorOf, chapIdxMap, lineVariStep, vBusY } = ctx;
    const parts = [];
    parts.push('<svg xmlns="http://www.w3.org/2000/svg" width="' + totalW + '" height="' + totalH + '" viewBox="0 0 ' + totalW + ' ' + totalH + '"'
        + ' data-aii-layout="' + escapeHtml(String(o.layout || "horizontal")) + '"'
        + (radialAutoAdjusted ? ' data-aii-radial-auto-adjusted="1"' : '')
        + ' font-family="' + escapeHtml(aiiQuoteFont(o.fontFamily)) + '">');
    // 背景：先区分"预设/自定义"，再区分"纯色/渐变"
    const gid = "aiiTocBgGrad";
    let bgFill = "";
    let bgDef = "";
    const presetGradients = {
        warm: ["#fff1eb", "#ace0f9"],
        cool: ["#e0c3fc", "#8ec5fc"],
        bluegray: ["#f5f7fa", "#c3cfe2"],
        light: ["#fdfbfb", "#ebedee"]
    };
    const presetSolids = { white: "#ffffff", beige: "#F5F0E6", dark: "#1a1a1a" };
    if (o.bgMode === "custom") {
        if (o.bgCustomType === "gradient") {
            let pair = aiiGradientStops(o.bgCustomColor, o.bgCustomGradient, o.bgGradientStrength);
            if (o.bgGradientReverse) pair = [pair[1], pair[0]];   // 方向=反向：首尾色对调
            if (o.bgGradientType === "radial") {
                bgDef = '<defs><radialGradient id="' + gid + '" cx="50%" cy="50%" r="75%"><stop offset="0%" stop-color="' + pair[0] + '"/><stop offset="100%" stop-color="' + pair[1] + '"/></radialGradient></defs>';
            } else {
                const c = aiiLinearGradientCoords(o.bgGradientAngle);
                bgDef = '<defs><linearGradient id="' + gid + '" x1="' + c.x1 + '" y1="' + c.y1 + '" x2="' + c.x2 + '" y2="' + c.y2 + '"><stop offset="0%" stop-color="' + pair[0] + '"/><stop offset="100%" stop-color="' + pair[1] + '"/></linearGradient></defs>';
            }
            bgFill = "url(#" + gid + ")";
        } else {
            bgFill = escapeHtml(o.bgCustomColor);
        }
    } else {
        const preset = o.bgPreset || "white";
        if (presetGradients[preset]) {
            let pair = presetGradients[preset];
            if (o.bgGradientReverse) pair = [pair[1], pair[0]];
            bgDef = '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="' + pair[0] + '"/><stop offset="100%" stop-color="' + pair[1] + '"/></linearGradient></defs>';
            bgFill = "url(#" + gid + ")";
        } else {
            bgFill = escapeHtml(presetSolids[preset] || "#ffffff");
        }
    }
    if (bgDef) parts.push(bgDef);
    parts.push('<rect x="0" y="0" width="' + totalW + '" height="' + totalH + '" rx="10" fill="' + bgFill + '"/>');
    // 表头（样式独立于全局文字；支持多行）
    const headerLines = aiiHeaderLines(o);
    if (headerLines.length) {
        const hs = aiiHeaderStyle(o);
        const hLH = hs.fs * LINE_H;
        headerLines.forEach((ln, i) => {
            parts.push('<text x="' + o.margin + '" y="' + (hs.fs + 6 + i * hLH).toFixed(1) + '" font-size="' + hs.fs
                + '" font-family="' + escapeHtml(aiiQuoteFont(hs.ff)) + '"' + hs.weight + hs.italic
                + ' fill="' + escapeHtml(hs.color) + '">' + escapeHtml(ln) + '</text>');
        });
    }

    // 多行文字（上下左右居中，颜色/变形按每级设置）
    const textAt = (lines, tx, cy, anchor, fs, color, wAttr, iAttr, ff) => {
        const lineH = fs * LINE_H;
        const startY = cy - (lines.length - 1) * lineH / 2 + fs * 0.35;
        let inner = "";
        lines.forEach((ln, i) => {
            inner += '<tspan x="' + tx + '" y="' + (startY + i * lineH).toFixed(1) + '">' + escapeHtml(ln) + '</tspan>';
        });
        return '<text text-anchor="' + anchor + '" font-size="' + fs + '" font-family="' + escapeHtml(aiiQuoteFont(ff || o.fontFamily)) + '" fill="' + escapeHtml(color) + '"' + wAttr + iAttr + '>' + inner + '</text>';
    };

    // 求节点框边界沿某方向的交点（放射状连线端点）
    const edgeTo = (n, ang) => {
        const dx = Math.cos(ang), dy = Math.sin(ang);
        const tx = Math.abs(dx) < 1e-6 ? 1e9 : (n.w / 2) / Math.abs(dx);
        const ty = Math.abs(dy) < 1e-6 ? 1e9 : (n.h / 2) / Math.abs(dy);
        const t = Math.min(tx, ty);
        return [n.x + dx * t, n.y + dy * t];
    };

    // ── 连线（一律绘制）：端点固定在行线上，节点框位置只挪框不挪线；样式按"线所到达的子节点层级" ──
    const dotPts = [];   // 连接点圆点（入线终点，每节点一个）
    const drawLeader = (parent, child) => {
        const lo = lineOptsOf(parent);
        // 连线颜色 = 该级派生色（全局基准色经「变色」规则烘焙出的每级颜色）。
        // ⛔ 「预设」（单色/同色系/彩虹）已于 2026-10-05 删除：连线着色统一交由「变色」负责。
        let color = lo.color;
        // 「连线变色」：按层级维度已在设置页烘焙进每级颜色（全局基准 → 每级），此处只处理
        // 「按章节」维度——章节颜色取决于文章实际章节数，无法预先烘焙，故渲染时实时计算。
        if (o.lineColorVariDim === "chapter") color = aiiVariColor(color, o.lineColorVari, o.lineColorVariStrength, lineVariStep(child), o.lineColorVariDir);
        let d;
        let ax = child.x - child.w / 2, ay = child.lineY != null ? child.lineY : child.y;
        if (o.layout === "radial") {
            // 放射状连线：端点一律落在框边上，不留悬空线、不斜切框角。
            //  · 一级层（文章标题 → 一级标题）：**固定直线**，不受「曲线/直线」设置影响
            //    （用户要求：即使选曲线，一级与文章标题之间也用直线连接）
            //  · 二级及以下：遵循「曲线/直线」设置；曲线是"先沿推进方向、再沿排开方向"的平滑弧，
            //    与横向/纵向布局的常规分支样式一致。
            if (parent.isRoot && child.linkIn) {
                // 根→一级：出点 = 根框"朝该子级那一侧"的**边中点**（不是射线与框的交点，
                // 否则斜向射线会落在边上偏 20~27px 的位置，看上去没连到框中间）
                const oa = outAnchorOf(parent, child.x - parent.x, child.y - parent.y);
                ax = child.linkIn.x; ay = child.linkIn.y;
                d = "M" + oa.x + " " + oa.y + " L" + ax.toFixed(1) + " " + ay.toFixed(1);
            } else if (parent.linkOut && child.linkIn) {
                // 共用出点：同一父节点的所有子线自同一颗圆点引出
                const x1 = parent.linkOut.x, y1 = parent.linkOut.y;
                ax = child.linkIn.x; ay = child.linkIn.y;
                if (lo.shape === "rightangle") {
                    // 直角折线：先沿推进方向走一半，再沿排开方向平移到子框
                    const mx = (x1 + ax) / 2, my = (y1 + ay) / 2;
                    const uxp = parent.outDir ? parent.outDir.x : 0;
                    const uyp = parent.outDir ? parent.outDir.y : 0;
                    d = Math.abs(uxp) > 0.5
                        ? "M" + x1 + " " + y1 + " H" + mx + " V" + ay + " H" + ax
                        : "M" + x1 + " " + y1 + " V" + my + " H" + ax + " V" + ay;
                } else {
                    // 对称 S 形（2026-09-29 四次定稿，三布局统一）：一半在弦一侧、一半在另一侧，
                    // 两端切线沿推进轴（outDir 主轴）。分支判定沿用主轴比较（与 outAnchorOf 一致，
                    // 修复 ang∈(135°,150°) 等冲突区误分支导致的"贴边爬行凹陷"）。
                    // ⛔ 勿回退"径向/切向分解"——rho<0 控制点反拉上拱回头（实测 3.1/3.2）。
                    const uxp = parent.outDir ? parent.outDir.x : 0;
                    const uyp = parent.outDir ? parent.outDir.y : 0;
                    const kap = ARC_K(lo.arc);
                    const dx = ax - x1, dy = ay - y1;
                    let c1x, c1y, c2x, c2y;
                    let endXv = ax, tailTov = null;   // 收口后的实际终点（默认=原入点）
                    if (Math.abs(uxp) >= Math.abs(uyp)) {
                        // 主轴 X（推进轴水平）：水平出发/水平进入 —— 与「横向排布」**完全同形**，
                        // 故共用同一套收口算法（末段防穿越 + 长标题避让），保证实现方式统一
                        // （用户 2026-10-04：放射状右侧引出的子标题就是横向模式的形态，
                        // 横向已修的压字问题在放射状也必须生效）。
                        c1x = x1 + dx * kap; c1y = y1;
                        c2x = ax - dx * kap; c2y = ay;
                        // ① 末段防穿越（与横向同规则）：末段水平线（y=ay）落在更下方兄弟的曲线
                        //    高度范围内时，c2x 钳到该兄弟曲线中点 (x1+linkIn.x)/2 右侧
                        let clampX = -Infinity;
                        for (const c of parent.children) {
                            if (c === child || !c.linkIn) continue;
                            if (!(y1 < ay && ay < c.linkIn.y)) continue;
                            clampX = Math.max(clampX, (x1 + c.linkIn.x) / 2 + 6);
                        }
                        c2x = Math.max(c2x, clampX);
                        // ② 长标题避让（与横向共用 aiiTocAvoidLongTitle）：本列最宽的框向左凸出时，
                        //    兄弟引线中段会从它字面穿过 → 采样自检后收口 + 水平补线
                        const relR = (c) => { const p = boxPosOf(c); return p === "above" ? { t: -c.h, b: 0 } : (p === "below" ? { t: 0, b: c.h } : { t: -c.h / 2, b: c.h / 2 }); };
                        const sibR = parent.children.filter(c => c !== child && c.linkIn);
                        const avoidBoxesR = sibR.map(s => {
                            const r = relR(s), ly = s.linkIn.y;
                            return { l: s.x - s.w / 2, r: s.x + s.w / 2, t: ly + r.t, b: ly + r.b, edge: s.x - s.w / 2 };
                        });
                        const avR = aiiTocAvoidLongTitle(x1, y1, ax, ay, kap, avoidBoxesR);
                        endXv = avR.endX; tailTov = avR.tailTo;
                        // ⚠️ 收口后 c1x 必须按**收口后的终点**重算（与横向布局一致）：否则 c1 仍按原
                        //    终点拉出，控制点会把曲线重新鼓回宽框里 —— 收了口照样压字（实测 (699,124)）。
                        if (endXv !== ax) {
                            c1x = x1 + (endXv - x1) * kap;
                            c2x = Math.max(endXv - (endXv - x1) * kap, clampX);
                        }
                    } else {
                        // 主轴 Y（推进轴竖直）：竖直出发/竖直进入——同父线族 x(t) 恒有序，天然零交叉
                        c1x = x1; c1y = y1 + dy * kap;
                        c2x = ax; c2y = ay - dy * kap;
                    }
                    d = "M" + x1.toFixed(1) + " " + y1.toFixed(1)
                        + " C" + c1x.toFixed(1) + " " + c1y.toFixed(1)
                        + " " + c2x.toFixed(1) + " " + c2y.toFixed(1)
                        + " " + (endXv === ax ? ax.toFixed(1) : endXv.toFixed(1)) + " " + ay.toFixed(1)
                        + (tailTov == null ? "" : " L" + tailTov.toFixed(1) + " " + ay.toFixed(1));
                }
            } else {
                // 兜底：缺锚点时退回"两端沿连线方向与框求交"的旧几何
                const ang = Math.atan2(child.y - parent.y, child.x - parent.x);
                const [x1, y1] = edgeTo(parent, ang);
                const an = radialAnchor(child, ang + Math.PI);
                ax = an.x; ay = an.y;
                d = "M" + x1.toFixed(1) + " " + y1.toFixed(1) + " L" + ax.toFixed(1) + " " + ay.toFixed(1);
            }
        } else if (o.layout === "vertical") {
            const x1 = parent.x, y1 = parent.y + parent.h / 2;
            const x2 = child.x, y2 = child.y - child.h / 2;
            ax = x2; ay = y2;
            if (lo.shape === "rightangle") {
                // 总线高度按父节点统一（vBusY），不随单个子盒高度浮动，避免错位
                const my = vBusY.get(parent) != null ? vBusY.get(parent) : (y1 + y2) / 2;
                d = "M" + x1 + " " + y1 + " V" + my + " H" + x2 + " V" + y2;
            } else {
                // 对称 S 形（与横向布局同构，x/y 互换）：两端切线竖直，一半在弦左、一半在弦右
                const kap = ARC_K(lo.arc);
                const c1y = y1 + (y2 - y1) * kap, c1x = x1;
                const c2y = y2 - (y2 - y1) * kap, c2x = x2;
                d = "M" + x1 + " " + y1 + " C" + c1x + " " + c1y.toFixed(1)
                    + " " + c2x + " " + c2y.toFixed(1) + " " + x2 + " " + y2;
            }
        } else {
            const x1 = parent.x + parent.w / 2, y1 = parent.lineY;
            // 安全区：入线端按被指向节点的框位置回退
            const x2 = child.x - child.w / 2 - safeInsetOf(child, -1);
            const y2 = child.lineY;
            if (lo.shape === "rightangle") {
                // 所有子节点共用同一根垂直总线，避免肘点错开、长度不一
                const mx = x1 + H_GAP / 2;
                d = "M" + x1 + " " + y1 + " H" + mx + " V" + y2 + " H" + x2;
            } else {
                // 对称 S 形（2026-09-29 四次定稿，回归用户确认的形态——设置页蓝色线即此形）：
                // 曲线一半在连线上方、一半在下方（中点恰在弦上），两端切线沿推进轴（水平），
                // 起始/末段平直指向两级标题。k=ARC_K(弧度)：默认 7.5→k=0.75（长直线+中段急转）。
                const kap = ARC_K(lo.arc);
                let c2x = x2 - (x2 - x1) * kap;
                // 末段防穿越：本线末段水平线（y=y2）若落在更下方兄弟的曲线高度范围内
                // （对称 S 的曲线中点 x=(x1+x2_j)/2 为恒定值），c2x 须钳到该中点右侧，
                // 否则本线末段水平冲刺必穿过下方兄弟的曲线中点（实测 2.4×2.5）。
                let clampX = -Infinity;
                for (const c of parent.children) {
                    if (c === child || c.lineY == null) continue;
                    if (!(y1 < y2 && y2 < c.lineY)) continue;
                    const ex = c.x - c.w / 2 - safeInsetOf(c, -1);
                    clampX = Math.max(clampX, (x1 + ex) / 2 + 6);
                }
                c2x = Math.max(c2x, clampX);
                // ── 长标题避让（2026-10-04，与放射状「水平推进」分支共用 aiiTocAvoidLongTitle，
                //    实现方式统一）：本列最宽的框会在居中/右对齐时向左凸出到引线通道里，
                //    兄弟引线中段从它字面穿过（实测 align=center 时「2 → 2.1」压住「2.2 样式自由度…」）。
                const relOf = (c) => { const p = boxPosOf(c); return p === "above" ? { t: -c.h, b: 0 } : (p === "below" ? { t: 0, b: c.h } : { t: -c.h / 2, b: c.h / 2 }); };
                const sibs = parent.children.filter(c => c !== child && c.lineY != null);
                const avoidBoxes = sibs.map(s => {
                    const r = relOf(s);
                    return { l: s.x - s.w / 2, r: s.x + s.w / 2, t: s.lineY + r.t, b: s.lineY + r.b, edge: s.x - s.w / 2 - safeInsetOf(s, -1) };
                });
                const avRes = aiiTocAvoidLongTitle(x1, y1, x2, y2, kap, avoidBoxes);
                const endX = avRes.endX, tailTo = avRes.tailTo;
                const c1x = x1 + (endX - x1) * kap, c1y = y1;
                const c2y = y2;
                if (endX !== x2) c2x = Math.max(endX - (endX - x1) * kap, clampX);
                d = "M" + x1 + " " + y1 + " C" + c1x.toFixed(1) + " " + c1y
                    + " " + c2x.toFixed(1) + " " + c2y.toFixed(1) + " " + (endX === x2 ? x2 : endX.toFixed(1)) + " " + y2
                    + (tailTo == null ? "" : " L" + tailTo + " " + y2);
            }
            ax = x2; ay = y2;
        }
        parts.push('<path d="' + d + '" fill="none" stroke="' + color + '" stroke-width="' + lo.width + '"/>');
        dotPts.push({ x: ax, y: ay, color, node: child });
    };

    // 文字安全区：框与连线重叠（位置=连线上）时，连线/连接点必须在文字之前停下。
    // 有底框形态靠底色遮挡即可；无底框（underline / none）必须真正留白，否则线压字。
    const SAFE_GAP = 6;   // 线端与文字外沿的最小水平间距
    const hasOpaqueBox = (node) => {
        const sh = boxShapeOf(node);
        return sh !== "underline" && sh !== "none";
    };
    const safeInsetOf = (node, dir) => {
        // dir: -1 = 从左侧进入（线指向节点右行），+1 = 从右侧进入
        const pos = boxPosOf(node);
        if (!hasOpaqueBox(node)) {
            // 无底框：文字实际占位，必须整体退让
            return dir < 0 ? SAFE_GAP : SAFE_GAP;
        }
        // 有底框且位置=连线上：线会穿过框内部，需退到框内文字之外
        return (pos === "center") ? SAFE_GAP / 2 : 0;
    };

    // 放射状线端：按"框位置"取落点，和横向布局同一语义，避免线压字。
    // 框位置=连线上（center，文字与线重叠）→ 入点退到文字外侧；
    // 框位置=上方（above）→ 文字在行线上方，线从左侧/右侧水平进入；
    // 框位置=下方（below）→ 同上，从另一侧进入。
    const radialAnchor = (n, fromAngle) => {
        // fromAngle = 从节点中心指向外部（线所在方向）的角度。
        // 入点 = 从中心沿该方向与"框"求交，天然落在框边上，任何方向都不会错位。
        // 无底框（下划线/none）时文字是裸的，水平方向额外退让 SAFE_GAP 保证线不压字。
        const shape = boxShapeOf(n);
        const opaque = shape !== "underline" && shape !== "none";
        const hw = n.w / 2 + (opaque ? 0 : SAFE_GAP);
        const hh = n.h / 2;
        const dx = Math.cos(fromAngle), dy = Math.sin(fromAngle);
        const tx = Math.abs(dx) < 1e-6 ? 1e9 : hw / Math.abs(dx);
        const ty = Math.abs(dy) < 1e-6 ? 1e9 : hh / Math.abs(dy);
        const t = Math.min(tx, ty);
        return { x: n.x + dx * t, y: n.y + dy * t };
    };

    const renderNode = (n) => {
        if (n.isRoot && !showRoot) { n.children.forEach(renderNode); return; }
        // 隐藏根不作为连线起点（横向/纵向布局下无根时一级节点无入线）
        if (!n.isRoot && n.parent && !(n.parent.isRoot && !showRoot)) drawLeader(n.parent, n);
        const fs = fontSizeOf(n);
        const lines = wrapLabel(n, fs);
        const shape = boxShapeOf(n);
        const defm = deformOf(n);
        const wAttr = defm.w ? ' font-weight="bold"' : '';
        const iAttr = defm.i ? ' font-style="italic"' : '';
        const color = textColorOf(n);
        if (shape === "none") {
            const align = o.layout === "horizontal" ? alignOf(n) : "center";
            const anchor = align === "right" ? "end" : (align === "center" ? "middle" : "start");
            let tx;
            if (align === "right") tx = n.x + n.w / 2;
            else if (align === "center") tx = n.x;
            else tx = n.x - n.w / 2;
            parts.push(textAt(lines, tx, n.cy, anchor, fs, color, wAttr, iAttr, fontFamilyOf(n)));
        } else if (shape === "underline") {
            // 思维导图形态：无底框，文字下方一条彩色下划线（色/粗 = 每级描边设置）
            const align = o.layout === "horizontal" ? alignOf(n) : "center";
            const anchor = align === "right" ? "end" : (align === "center" ? "middle" : "start");
            let tx;
            if (align === "right") tx = n.x + n.w / 2;
            else if (align === "center") tx = n.x;
            else tx = n.x - n.w / 2;
            parts.push(textAt(lines, tx, n.cy, anchor, fs, color, wAttr, iAttr, fontFamilyOf(n)));
            const uW = Math.max(8, n.w - padX);
            const uColor = escapeHtml(boxStrokeColorOf(n));
            const uWd = Math.max(0.5, boxStrokeWidthOf(n));
            const lastBase = n.cy + (lines.length - 1) * fs * LINE_H / 2 + fs * 0.35;
            const uy = lastBase + 3 + uWd / 2;
            parts.push('<rect x="' + (n.x - uW / 2).toFixed(1) + '" y="' + uy.toFixed(1) + '" width="' + uW + '" height="' + uWd + '" rx="' + (uWd / 2).toFixed(1) + '" fill="' + uColor + '" stroke="none"/>');
        } else {
            const rx = shape === "capsule" ? n.h / 2 : (shape === "rounded" ? 8 : 0);
            parts.push('<rect x="' + (n.x - n.w / 2) + '" y="' + (n.y - n.h / 2) + '" width="' + n.w + '" height="' + n.h + '" rx="' + rx + '" ry="' + rx + '" fill="' + escapeHtml(boxColorOf(n)) + '" stroke="' + escapeHtml(boxStrokeColorOf(n)) + '" stroke-width="' + boxStrokeWidthOf(n) + '"/>');
            parts.push(textAt(lines, n.x, n.cy, "middle", fs, color, wAttr, iAttr, fontFamilyOf(n)));
        }
        n.children.forEach(renderNode);
    };
    renderNode(root);

    // 根节点出点圆（思维导图：根也有一颗）
    if (showRoot && o.nodeDots !== false && root.children.length) {
        const lo0 = lineOptsOf(root);
        // 与首条根列出线同色（避免圆点与连线异色）
        const rc = lo0.color;
        if (o.layout === "radial") {
            // 放射状：根在**每个方向**各引一条线 → 每个用到的边中点上各一颗圆点
            // （用户规格：根节点例外，不共用一颗圆点）。按主轴去重：2/3 章同侧时共用一颗。
            const seen = new Set();
            for (const c of root.children) {
                const a = outAnchorOf(root, c.x - root.x, c.y - root.y);
                const key = a.x + "," + a.y;
                if (seen.has(key)) continue;
                seen.add(key);
                dotPts.push({ x: a.x, y: a.y, color: rc, node: root });
            }
        } else if (o.layout === "vertical") {
            dotPts.push({ x: root.x, y: root.y + root.h / 2, color: rc, node: root });
        } else {
            dotPts.push({ x: root.x + root.w / 2, y: root.lineY != null ? root.lineY : root.y, color: rc, node: root });
        }
    }
    // 连接点圆点统一绘制（在文字/连线之上）：样式/大小按每级 dotStyle/dotSize；同色随入线
    if (dotPts.length) {
        const dotBgSolid = presetGradients[o.bgPreset] ? presetGradients[o.bgPreset][0]
            : (o.bgMode === "custom" ? (o.bgCustomColor || "#ffffff") : (presetSolids[o.bgPreset] || "#ffffff"));
        const dotFill = (aiiHexToHsl(dotBgSolid)[2] < 0.5) ? "#1a1a1a" : "#FFFFFF";
        for (const d of dotPts) {
            const lv = LV(d.node) || {};
            const style = lv.dotStyle || "solid";
            if (style === "none") continue;
            const dR = Math.max(0.8, numOf(lv.dotSize, numOf(o.dotSize, 2)));
            const shape = style === "hollow"
                ? '<circle cx="' + d.x.toFixed(1) + '" cy="' + d.y.toFixed(1) + '" r="' + dR + '" fill="' + dotFill + '" stroke="' + d.color + '" stroke-width="' + Math.max(1, dR * 0.55).toFixed(1) + '"/>'
                : '<circle cx="' + d.x.toFixed(1) + '" cy="' + d.y.toFixed(1) + '" r="' + dR + '" fill="' + d.color + '" stroke="none"/>';
            parts.push(shape);
        }
    }

    parts.push('<!-- aii-toc id=' + (o.genId || "x") + ' -->');
    parts.push('</svg>');
    return parts.join("");
}

// ── TOC 布局分支（从 generateTocSvg 抽出，aiiTocLayoutRadial）：在上下文 L 上就地写回节点坐标与画布尺寸 ──
function aiiTocLayoutRadial(L) {
    const { noteTitle, o, root, showRoot, LV, lvAvoid, numOf, fontSizeOf, textColorOf, deformOf, boxShapeOf, boxPosOf, boxColorOf, boxStrokeColorOf, boxStrokeWidthOf, fontFamilyOf, resolveLineShape, ARC_K, lineOptsOf, alignOf, showSeqOf, wrapLabel, boxW, boxH, dispDepth, applyUniformWidths, outAnchorOf, padX, padY, LINE_H, H_GAP, V_GAP, rGapH, rGapV } = L;
    let totalW = L.totalW, totalH = L.totalH, radialAutoAdjusted = L.radialAutoAdjusted;
        // ── 放射状：根居中，一级标题按角度从四面八方向外展开（永远单线派生）；
        //    二级及以下根据自身所处角度决定横向或纵向延伸 ──
        const rNodes = [];
        const collectR = (n) => { if (!(n.isRoot && !showRoot)) rNodes.push(n); n.children.forEach(collectR); };
        collectR(root);
        let maxBoxH = 0;
        const sizeR = (n) => { n.w = boxW(n); n.h = boxH(n); if (!(n.isRoot && !showRoot)) maxBoxH = Math.max(maxBoxH, n.h); n.children.forEach(sizeR); };
        sizeR(root);
        applyUniformWidths(root);   // 等宽：同环统一为该环最宽

        const DEG = Math.PI / 180;
        const headerH0 = aiiHeaderHeight(o);   // 表头占高（画布包围盒用；支持表头多行）

        // ── 固定方向阈值（不是设置项）──
        // 用户规格（章节方向角 a，0°=正上方，顺时针）：
        //   -45°~45°   → 横向分布
        //    45°~135°  → 纵向分布
        //   135°~225°  → 横向分布
        //   225°~-45°  → 纵向分布
        // 等价判定：a 折叠到 [0,180) 得 m，纵向 ⟺ |m-90| ≤ 45。
        // （旧实现写成 m>90 ? 180-m : m 再比 45，把 135°/225° 判成了横向，已修正。）
        const DIR_THR = 45;

        // ── 找出"要从中心四面八方引出"的那一层 ──
        // showRoot 时 root 是笔记标题；若正文里还有一个与笔记标题重名的 `#` 标题，
        // 它只是文章标题的副本（Obsidian 里很常见），应摘掉它、让它的子级直接挂根放射，
        // 否则最内圈会白绕一根中轴引线、真正的正文一级标题被推到外圈。
        if (showRoot) {
            const noteName = String(noteTitle || "").trim();
            const dup = rNodes.find(n => !n.isRoot && n.depth === 1 && n.children.length
                && noteName && n.text.trim() === noteName);
            if (dup) dup.foldedIntoRoot = true;
        }
        // 把被折叠的节点从树上摘掉，其子级原位顶上来（真正上提一级——
        // 只改 parent 指针而不改树的层级，会让上提后的子级仍按原深度参与，出现"里外两层放射"）
        const stripNode = (parent) => {
            const kids = parent.children;
            for (let i = kids.length - 1; i >= 0; i--) {
                const c = kids[i];
                if (c.foldedIntoRoot) {
                    if (c.children.length) kids.splice(i, 1, ...c.children);
                    else kids.splice(i, 1);
                    for (const g of c.children) g.parent = parent;
                }
            }
            for (const c of kids) stripNode(c);
        };
        stripNode(root);
        rNodes.length = 0;
        collectR(root);
        const recDepth = (n, d) => { n.depth = d; n.children.forEach(c => recDepth(c, d + 1)); };
        recDepth(root, 0);
        const lv1 = rNodes.filter(n => !n.isRoot && n.depth === 1);

        // ══════════════════════════════════════════════════════════
        // 1) 一级角度：startDeg 决定第一个一级标题的方向，stepDeg 决定相邻间隔
        // ──────────────────────────────────────────────────────────
        // · 起始角度：只对第一个一级标题生效（0°=正上方）
        // · 偏移角  ：相邻同级标题的角度间隔。0 = 自动（按数量均分 360°）
        //   例：4 个一级 + 偏移角 60 → 0°/60°/120°/180°
        //       4 个一级 + 偏移角 0  → 0°/90°/180°/270°
        //
        // ⚠️ 自适应原则（用户 2026-09-19 第三轮重申）：
        //   「能放下就保持设定的偏移角；放不下就按实际情况自动增大偏移角来排版」。
        //   即：**优先加大角度间隔**（先试 0°，逐步加宽），而不是死守设定角度、
        //   把半径推到很远（那会把整图拉成细长的锯齿形，见图 3 的失败效果）。
        // ══════════════════════════════════════════════════════════
        const n1 = Math.max(1, lv1.length);
        const startDeg = numOf(o.radialStartAngle, 0);
        const offDeg = Math.max(0, numOf(o.radialOffsetAngle, 0));
        // 偏移角上限 = 均分 360° 的间隔。超过它，第 n 个标题就会转过 360° 与第 1 个
        // 撞在同一个方向上（4 个 + 偏移角 180 → 0°/180°/360°/540°，实则只有 2 个方向），
        // 会被误判成"要放大半径才放得下" → 半径雪崩（实测画布 25439×14555）。
        // 用户语义里"偏移角"是"相邻同级标题的间隔"，超出均分间隔本就不成立，故直接夹紧。
        const maxStepDeg = 360 / n1;
        const baseStepDeg = Math.min(maxStepDeg, (offDeg > 0) ? offDeg : maxStepDeg);
        const setAngles = (step) => { for (let i = 0; i < lv1.length; i++) lv1[i].angDeg = startDeg + step * i; };
        setAngles(baseStepDeg);

        // ── 每个一级子树的生长方向 + 分布样式 ──
        const dirOfDeg = (deg) => ({ x: Math.sin(deg * DEG), y: -Math.cos(deg * DEG) });
        const modeOfDeg = (deg) => {
            const m = ((deg % 180) + 180) % 180;
            return Math.abs(m - 90) <= DIR_THR ? "vertical" : "horizontal";
        };

        // ── 子树包围盒 + 连线锚点 ──        // 「横向分布」：子级沿 X 轴依次排开，父子之间沿 outward 方向推进。
        // 「纵向分布」：子级沿 Y 轴依次排开，父子之间沿 outward 方向推进。
        // 两种模式下，每个子级都占用一个"块"：
        //   横向：块宽 = 该子树横向占宽（子级累加），块高 = max(自身高, 子块高之和)
        //   纵向：块高 = 该子树纵向占高（子级累加），块宽 = max(自身宽, 子块宽之和)
        // 父框在块内沿"排开轴"居中、沿"推进轴"贴靠父侧 —— 这样带后代的分支
        // 才能把后代的那一层算进自己的块里，兄弟才不会与后代抢同一行（旧版漏了这点）。
        const subSize = (n, mode) => {
            if (!n.children.length) {
                n.subW = n.w; n.subH = n.h; n.blkW = n.w; n.blkH = n.h;
                n.subOn = mode === "horizontal" ? n.w : n.h;   // 子树沿排开轴的跨度
                n.subAd = mode === "horizontal" ? n.h : n.w;   // 子树沿推进轴的跨度
                return;
            }
            for (const c of n.children) subSize(c, mode);
            const k = n.children.length;
            if (mode === "horizontal") {
                // 排开轴 = X：子级沿 X 铺开；推进轴 = Y
                n.subOn = n.children.reduce((a, c) => a + c.subOn, 0) + (k - 1) * rGapH;
                // 推进轴跨度 = 自身推进轴半宽（**朝外那一侧**，回程侧全是空隙）
                //   + 净空 + 子级整棵子树推进轴跨度。
                // 不能写成 n.h + gap + childAd：那按"自身全高 + 净空"推进，
                // 实际只需"半高 + 净空"，多出的半个自身高就是"引线虚长"的来源
                // （用户第五轮投诉的正是这个），会让每一层都白送 ~16px 空白。
                n.subAd = n.h / 2 + rGapV + Math.max(...n.children.map(c => c.subAd));
                n.subW = Math.max(n.w, n.subOn);
                n.blkW = n.subW;
                n.blkH = n.subAd;
                n.subH = n.subAd;
            } else {
                // 排开轴 = Y：子级沿 Y 铺开；推进轴 = X
                n.subOn = n.children.reduce((a, c) => a + c.subOn, 0) + (k - 1) * rGapV;
                // 同横向：推进轴（X）上只走"半宽 + 净空"，不回程到自己的左边
                n.subAd = n.w / 2 + rGapH + Math.max(...n.children.map(c => c.subAd));
                n.subH = Math.max(n.h, n.subOn);
                n.blkH = n.subH;
                n.blkW = n.subAd;
                n.subW = n.subAd;
            }
        };
        for (const n of lv1) {
            n.radialMode = modeOfDeg(n.angDeg);
            n.outDir = dirOfDeg(n.angDeg);
            subSize(n, n.radialMode);
        }

        // ── 沿"朝外方向"的半径延伸（用于层间推进距离）──
        const halfExt = (n, ux, uy) => Math.abs(ux) * (n.w / 2) + Math.abs(uy) * (n.h / 2);

        // ── 子树定位：单遍「父框为锚点 + 绝对槽位」──
        //  · linkOut : 父侧出点（同一父节点的所有子线**共用一个出点**，位于父框朝外那条边的中点）
        //  · linkIn  : 子侧入点（位于子框朝父那条边的中点）
        // 用户规格：出点/入点必须真正落在框上（不能斜切到框角），且同一父共用一颗圆点。
        //
        // ⚠️ 居中铁律（用户 2026-09-19 第三轮明确）：
        //   上一级标题必须**始终位于其所有子分支的正中**——横向分布时在子分支横向跨度正中；
        //   纵向分布时在上下正中。基准取**子框自身中心**，不含后代向外扩张的部分。
        //
        // 关键：子级位置一律由**父框最终坐标**直接算出（绝对坐标，不写回父框），
        // 父框坐标一旦由上层定下就不再被下层改动 —— 因此无需任何"回头校正"，
        // 从根向外单遍递归即可，父子坐标系天然一致。
        // （旧版先算相对偏移、再回头居中父级 + 反复平移子树，是节点重叠的根因。）
        //   · 推进：父框中心沿 outward 平移 push（层间中心距）
        //   · 排开：以父框中心为原点居中铺槽，子框中心 = 父中心 + slot
        // 槽位以父框中心为基准居中铺开 → 父框天然位于所有子框中心的正中。
        // 节点在排开轴上的占位：不仅是自身尺寸，还要算上它整棵子树向两侧铺开的量。
        // 横向分布的一级节点（如 3.3）自身只有 133 宽，但它的两个子级（3.3.1/3.3.2）
        // 叠起来在纵向占了 96px —— 若只用自身尺寸算层间距，子级会骑到兄弟节点头上。
        //
        // ⚠️ 对齐铁律（用户第四轮）：**同一层内所有节点的推进量必须一致**。
        //   若按各自的子树深度算推进量，第 2 章（子级无后代）推进 180px、
        //   第 3 章（子级带后代）推进 300px → 同侧同方向的兄弟引线长度不齐，
        //   第三级标题也对不上（用户："第二章和第三章引线长度不一样"、
        //   "第三级标题应该是对齐的"）。
        //   解法：层间净空直接取设置里的常量（gapX/gapY），与节点尺寸无关
        //   → 同层各子级天然等距，不需要额外协调。
        // 返回**层间净空**（父框推进轴外沿 → 子级整棵子树推进轴外沿的距离），不再返回中心距。
        // 这样 placeSub 能按"父外沿 + 净空 + 子级各自半宽"逐子级落位，
        // 宽窄不一的孩子（如 3.3.1 宽 230 vs 3.3.2）各自的可见净空才都等于设置值。
        const gapOfRaw = (n, kids, horiz, ux, uy) => {
            void n; void kids; void ux; void uy;
            const layerGap = horiz ? rGapV : rGapH;
            return layerGap;
        };
        // 子级**自身框**沿推进轴的半外延。        // ⚠️ 必须用"自身尺寸"而非"整棵子树跨度"：子树跨度是**双向**的
        //   （3.3 带两个子级 → subAd=96，半外延 48），可推进轴只朝外走单边。
        //   用 48 作半外延会把 3.3.1 推到 3.3 右沿之外 48px，而 3.3 被等宽撑宽后
        //   右沿本就更靠外 → 引线出点越过入点、倒着画（实测 3.3→3.3.1 净推进 -8px）。
        //   改用自身半宽后，落位恒为"父外沿 + 净空 + 自身半宽"，出点必在入点内侧。
        const adExtOf = (c, horiz) => (horiz ? c.h : c.w) / 2;
        // ══════════════════════════════════════════════════════════
        // 单遍放置（第五轮简化）
        //   层间净空现在**直接取自设置**（横向分布=gapY、纵向分布=gapX），
        //   是一个与节点尺寸无关的常量 → 同层各子级的净空天然一致，
        //   不再需要"先测量全层最大推进量、再统一落位"的两段式。
        //   （旧两段式是为了消除"子级带不带后代导致推进量不同"的差异，
        //     而那个差异本身就来自旧 gapOfRaw 的可变推进量——已一并去掉。）
        // ══════════════════════════════════════════════════════════
        const tierPush = {};
        const tierKeyOf = (n, mode) => {
            if (n.parent && n.parent.isRoot) return "L1|" + mode;
            return "N|" + (n.uid != null ? n.uid : String(n.text || "")) + "|" + mode;
        };
        const placeSub = (n, mode, ux, uy) => {
            const kids = n.children;
            if (!kids.length) return;
            n.outDir = { x: ux, y: uy };
            const horiz = (mode === "horizontal");
            // 层间净空：横向分布用 gapY、纵向分布用 gapX（与横向/纵向布局同一套设置）
            const gap = gapOfRaw(n, kids, horiz, ux, uy);
            tierPush[tierKeyOf(n, mode)] = gap;

            // 排开轴：横向分布 → X 轴；纵向分布 → Y 轴（一律取实际坐标轴）
            // 推进轴：与排开轴正交的那条（也是实际坐标轴）
            // ⚠️ 推进轴必须用**轴单位向量**（±1），不能用 outward 的投影分量 outAd。
            //   children 是沿纯 X / 纯 Y 铺开的，父子在推进轴上相距的是"整段轴上距离"，
            //   而 outAd 只是 outward 在该轴上的分量（3 章 = 0.79）。用 0.79 去乘半宽
            //   会把父框外沿量短 21%（351+101=452 被算成 431），子级因此压回父框内部
            //   → 出点越过入点、引线倒着画（3.3→3.3.1 实测 -8px 的根因）。
            const outAd = horiz ? (uy > 0 ? 1 : (uy < 0 ? -1 : 0)) : (ux > 0 ? 1 : (ux < 0 ? -1 : 0));

            // 槽位：以父框中心为原点居中铺开。占位取**整棵子树**沿排开轴的跨度
            // （不能只用自身尺寸：3.3 自身 133 宽，但它的子级加起来铺得更宽，
            //   用自身尺寸算槽就会让 3.3.1 骑到兄弟 3.2 上）。
            const ownOn = (c) => (c.subOn != null ? c.subOn : (horiz ? c.w : c.h));
            const span = kids.reduce((a, c) => a + ownOn(c), 0)
                + (kids.length - 1) * (horiz ? rGapH : rGapV);
            let acc = (horiz ? n.x : n.y) - span / 2;
            // ── 推进轴落位：整层统一到**同一列** ──
            // 统一列 = 父框**朝 outward 那条边的实际坐标** + 净空 + 该层子级最大半外延。
            // parentEdge 直接用 n.x/n.y（父框中心在该轴上的真实坐标）加减父框半宽，
            // 因为 outAd 已是轴单位向量（±1）：一级节点虽然位于圆周上，但它的
            // 子级是沿纯轴铺开的，推进轴上的距离就是 n.x ± n.w/2 这种实打实的量。
            const parentHalf = (horiz ? n.h : n.w) / 2;
            const parentEdge = (horiz ? n.y : n.x) + outAd * parentHalf;
            let layerHalf = 0;
            for (const c of kids) layerHalf = Math.max(layerHalf, adExtOf(c, horiz));
            // 该层统一落位 = 父外沿 + 净空 + 子框半宽。
            // advShare：一级兄弟"共用推进轴"的补偿量（见 layoutRadial 内的 shareAdv）。
            //   非一级层为 0；一级层用它把各自不同的 parentEdge 对齐到组内最外沿。
            const advUniform = parentEdge + (n.advShare || 0) + outAd * (gap + layerHalf);
            for (const c of kids) {
                const own = ownOn(c);
                const slot = acc + own / 2;          // 该子框中心的绝对排开轴坐标
                acc += own + (horiz ? rGapH : rGapV);
                // horiz：排开轴=X，推进轴=Y；否则相反
                c.x = Math.round(horiz ? slot : advUniform);
                c.y = Math.round(horiz ? advUniform : slot);
                c.cy = c.y;
            }
            // 递归：子级一律沿"父框中心 → 自身中心"的真实轴向生长
            for (const c of kids) placeSub(c, mode, horiz ? 0 : outAd, horiz ? outAd : 0);

            // ── 全部落位后记录锚点 ──
            for (const c of kids) {
                if (horiz) {
                    c.linkIn = { x: c.x, y: uy > 0.5 ? Math.ceil(c.y - c.h / 2) : (uy < -0.5 ? Math.floor(c.y + c.h / 2) : Math.round(c.y)) };
                } else {
                    c.linkIn = { x: ux > 0.5 ? Math.ceil(c.x - c.w / 2) : (ux < -0.5 ? Math.floor(c.x + c.w / 2) : Math.round(c.x)), y: c.y };
                }
            }
            // 出点 = 父框朝 outward 那条边的**中点**（用主轴判定，绝不落到框角）
            const oa = outAnchorOf(n, ux, uy);
            n.linkOut = { x: oa.x, y: oa.y };
        };

        // ── 一级环半径 ──
        // 用户第五轮明确：「读取横向、纵向的默认引线长度设置，来规定放射状方案的引线初始长度。
        // 所有方案的引线都太长了」——即放射状的引线长度**不再由环容量撑开**，
        // 而是沿用横向/纵向布局里那条"层级净空"设置，保持三种布局观感一致：
        //   · 横向布局：层与层沿 X 推进，净空 = H_GAP（gapX，默认 46）
        //   · 纵向布局：层与层沿 Y 推进，净空 = V_GAP（gapY，默认 18）
        // 放射状一级层的引线是**径向**的，语义上等价于"横向布局的层间净空"（都是主推进方向），
        // 故引线净空统一取 H_GAP = gapX。
        // ⚠️ 关键：**每个一级节点用自己的半径**（不是统一圆环）。
        //    根框与一级框都是矩形，沿各自引线方向投影的半宽差别很大
        //    （0° 只需 15.5+15.5，60° 要 40.7+52.8）。若强行共圆，取 max 会让
        //    0°/180° 的净空被撑到 90px，而 90° 方向反被压到负值——这正是"引线还是太长"的根因。
        //    按节点各自方向反解半径，则**每根引线的可见净空恒为 LEAD_GAP**。
        const LEAD_GAP = Math.max(10, numOf(o.gapX, 46));   // 一级引线净空（沿用横向布局的层间净空）
        // 矩形框沿某角度方向的半投影（支持半径）= |ux|·半宽 + |uy|·半高
        const halfOnAt = (n, deg) => {
            const ux = Math.sin(deg * DEG), uy = -Math.cos(deg * DEG);
            return Math.abs(ux) * (n.w / 2) + Math.abs(uy) * (n.h / 2);
        };
        // 每个一级节点各自的半径：根半投影 + 引线净空 + 一级框半投影
        // ⚠️ 必须**按当前角度现算**，不能用"角度→半径"的缓存表：
        //    角度自适应阶段 setAngles 会改 angDeg，缓存表的旧 key 失效、新角度取不到值
        //    → 半径回落 0 或 NaN → 画布爆炸（实测偏移角 30 时画布 12795×7260）。
        const radMinOf = (n) => halfOnAt(root, n.angDeg) + LEAD_GAP + halfOnAt(n, n.angDeg);
        // 重叠检测：只比"不同一级子树之间"，同子树内部由 placeSub 的分摊保证
        const flatOf = (n, out) => { out.push(n); n.children.forEach(c => flatOf(c, out)); return out; };
        const subtreeOf = (n) => flatOf(n, []);
        const boxOf = (n) => ({ x1: n.x - n.w / 2, x2: n.x + n.w / 2, y1: n.y - n.h / 2, y2: n.y + n.h / 2 });
        const boxHit2 = (a, b, pad) =>
            a.x1 - pad < b.x2 && b.x1 < a.x2 + pad && a.y1 - pad < b.y2 && b.y1 < a.y2 + pad;
        // 唯一的一级环 + 子树布局（半径迭代与最终渲染共用，保证几何完全一致）
        // rc = **统一"碰撞半径下界"**（不是乘数！）
        // 每个一级节点的半径 = max( 它自己的径向最小需求, rc )。
        // 为什么这样拆（2026-09-20 第六轮，用户"一级标题距离太大"的根因）：
        //   碰撞是**切向**约束 —— 相邻分支的子级沿着圆周方向互相挤，需要的其实是
        //   "整圈够大"（对每个分支大致同一个值）。而"径向最小需求"是**径向**约束 ——
        //   根框半投影 + LEAD_GAP + 一级框半投影，各方向差别很大（0° 只需 15.5+15.5，
        //   90° 要 38+76.5）。
        //   旧式把它俩乘在一起 `R_i = radMin_i × lam`，于是切向需要的放大倍数
        //   （实测 lam≈4.84）**把本来就宽的 90°/270° 分支又乘了一遍**：
        //   1 章半径 146.5×4.84 = 709，可它的碰撞约束只需要 561 —— 白多 148px。
        //   用户看到的"大片空白、缩短很多也放得下"就是这 148px。
        // 改成取 max 后：窄方向仍享受短引线（第五轮的成果保住），
        //   宽方向不再被重复放大。
        const layoutRadial = (rc) => {
            root.x = 0; root.y = 0; root.cy = 0;
            for (const n of lv1) {
                const Rn = Math.max(radMinOf(n), rc);
                n.x = Math.round(Rn * Math.sin(n.angDeg * DEG));
                n.y = Math.round(-Rn * Math.cos(n.angDeg * DEG));
                n.cy = n.y;
                n.radialMode = modeOfDeg(n.angDeg);
                n.outDir = dirOfDeg(n.angDeg);
                subSize(n, n.radialMode);
            }
            // 一级节点的入点：由该节点的**分布样式**决定落在哪条边的中点
            // （用户第四轮明确：横向排布 → 引到上/下边中点；纵向排布 → 引到左/右边中点）
            //   · horizontal：子级沿 X 铺开，父框上下居中且居中于子级 → 引线从父框
            //     朝根那条边（上边或下边）的中点进来
            //   · vertical：子级沿 Y 铺开，父框左右居中于子级 → 引线从父框
            //     朝根那条边（左边或右边）的中点进来
            // 一律用 Math.floor/ceil 向内取整，保证圆点压在框上而非浮空。
            for (const n of lv1) {
                const vMode = (n.radialMode === "vertical");
                if (vMode) {
                    // 纵向：根在左边 → 左边中点；根在右边 → 右边中点
                    const rootLeft = root.x < n.x;
                    n.linkIn = {
                        x: rootLeft ? Math.ceil(n.x - n.w / 2) : Math.floor(n.x + n.w / 2),
                        y: Math.round(n.y),
                    };
                } else {
                    // 横向：根在上方 → 上边中点；根在下方 → 下边中点
                    const rootAbove = root.y < n.y;
                    n.linkIn = {
                        x: Math.round(n.x),
                        y: rootAbove ? Math.ceil(n.y - n.h / 2) : Math.floor(n.y + n.h / 2),
                    };
                }
            }
            // ── 一级层：同分布模式 + 同推进方向 共用一条推进轴（用户第四轮"同级标题要对齐"）──
            // 用户原话：「第二章和第三章…它俩都在 45°~135° 之间，所以是纵向排布下级
            //   标题，这时候它的第三级标题应该是对齐的」。
            // 即：**同一种分布模式、且朝同一方向推进**的一级兄弟，其子级应落在同一条
            //   推进轴上。逐节点半径会让每个一级框落在不同半径处 → 各自的 parentEdge
            //   不同 → 子级列错开（实测 62.5°/125° 时 591 vs 605，差 14px）。
            // ⚠️ 分组键必须带上 outAd 的**符号**：0°（推进 −Y）与 180°（推进 +Y）同属
            //   horizontal，但推进方向相反，混在一组会把基准算反
            //   （实测 ch1→1.1 净空被撑到 215px）。
            // 代价：组内较靠内的节点引线会比 LEAD_GAP 略长，但绝不低于它。
            const shareAdv = {};
            const advInfo = [];
            for (const n of lv1) {
                const horiz = (n.radialMode === "horizontal");
                const ux = Math.sin(n.angDeg * DEG), uy = -Math.cos(n.angDeg * DEG);
                const outAd = horiz ? (uy > 0 ? 1 : (uy < 0 ? -1 : 0)) : (ux > 0 ? 1 : (ux < 0 ? -1 : 0));
                if (!outAd) { advInfo.push(null); continue; }
                const parentEdge = (horiz ? n.y : n.x) + outAd * ((horiz ? n.h : n.w) / 2);
                const key = n.radialMode + "|" + outAd;
                const rec = { n, horiz, outAd, parentEdge, key };
                advInfo.push(rec);
                if (shareAdv[key] == null || (parentEdge - shareAdv[key]) * outAd > 0) shareAdv[key] = parentEdge;
            }
            for (const rec of advInfo) {
                if (!rec) continue;
                // 统一基准与该节点自身外沿的差值（沿 outward 方向，恒 ≥0）
                rec.n.advShare = shareAdv[rec.key] - rec.parentEdge;
            }
            // 一级以下：单遍放置（层间净空取自设置常量，无需预测量）
            for (const n of lv1) placeSub(n, n.radialMode, n.outDir.x, n.outDir.y);
        };
        // 初始半径由"逐节点反解"得到（每根引线净空 = LEAD_GAP），与实测坐标无关 → 无需迭代
        // 重叠判定：pad 取**负值**表示"必须真正重叠 pad 像素以上才算冲突"。
        //   ⚠️ 不能用正值当安全间距：上一版用 pad=+2 要求 2px 净空，于是
        //   0°/60°/120°/180° 这种相邻框**正好角对角相接**（重叠仅 1px）的情形
        //   也会被判为冲突 → 求解器白白把 60° 放宽到 63.75°，违反用户
        //   「能放下则保持这个偏移角」的原则。
        //   取 0（严格）：只要有任何 ≥1px 的可见交叠就继续自适应。
        //   `Math.floor/ceil` 的取整误差最大 1px，故容忍到 -0 仍会在边界处反复；
        //   最终采用 0：宁可多放宽一点角度，也不允许成品图出现压框。
        const OVERLAP_TOL = 0;
        // ── 分支最小净空（用户第五轮：「图1 有点压占」）──
        // 只判"不重叠"是不够的：实测偏移角 60 时 3.3 右沿 467 / 4.2 左沿 468，
        // 相邻分支只剩 1px，视觉上是**贴在一起**的，就是用户说的"压占"。
        // 因此不同一级子树之间必须留出 BRANCH_GAP 的真实空隙；
        // 放不下时求解器会先放宽角度（用户既定原则：先加角度、最后才放半径）。
        //
        // 取值实测（偏移角 60，净空口径 = 包围盒最大轴分离量 max(sepX,sepY)）：
        //   标签组              GAP=4        GAP=8          GAP=12/16
        //   短标签(第一章测试)    62.5°/6px    63.8°/9px      66~67.5°/14~17px
        //   长标签(测试测试测试)  65.0°/6px    66.3°/8px      78.8°/16px ⚠️
        // ⚠️ 关键约束：**放宽后的角度必须仍让 2/3 章落在「纵向」带内**
        //   （ch3 角 = 2·step，纵向要求 |2·step−90| ≤ 45 ⇒ step ≤ 67.5°）。
        //   GAP=12 起，长标签会把 step 顶到 78.8° → ch3 翻成横向 →
        //   第四轮"第 2/3 章下级标题对齐"的要求直接失效。
        //   GAP=8 在两组标签下都稳在 66.3° 以内，模式保持 横竖竖横 ⇒ 取 8。
        const BRANCH_GAP = 8;
        // 收集"跨分支冲突对"，并回传冲突双方所属的一级分支（供逐分支放大半径）
        //
        // ⚡ 性能（2026-09-20 第十轮审查优化）：原实现对**每一对**一级子树做笛卡尔积逐节点比较，
        //   60 章×8 节时单次调用要跑 ~14 万次 boxHit2，而二分求解要调用 20 余次 → 1.7s。
        //   两级剪枝后判定结果**与逐节点全比较完全一致**（剪枝都是保守的）：
        //     ① 节点集合缓存：求解过程中 lv1 及其子树成员不变，subtreeOf 只算一次；
        //     ② 子树包围盒粗判：两子树的整体包围盒（含最大间距要求 padMax）都不相交
        //        → 其中任意两节点必然不重叠，直接跳过逐节点比较；
        //     ③ 细判内联展开：避免每次比较都 new 两个 box 对象。
        const groupsCache = lv1.map(subtreeOf);   // ① 只做一次
        const bboxOfNodes = (nodes) => {
            let x1 = Infinity, x2 = -Infinity, y1 = Infinity, y2 = -Infinity;
            for (const n of nodes) {
                const ax1 = n.x - n.w / 2, ax2 = n.x + n.w / 2, ay1 = n.y - n.h / 2, ay2 = n.y + n.h / 2;
                if (ax1 < x1) x1 = ax1;
                if (ax2 > x2) x2 = ax2;
                if (ay1 < y1) y1 = ay1;
                if (ay2 > y2) y2 = ay2;
            }
            return { x1, x2, y1, y2 };
        };
        const collectConflicts = () => {
            const groups = groupsCache;
            const bboxes = groups.map(bboxOfNodes);
            const pairs = new Set();   // "i|j" 分支下标对
            let hits = 0;
            // 「避让次级」OFF 时，一级子树之间只要求"不硬重叠"，不再强求 BRANCH_GAP 净空
            // （即本级标题按均匀角度排布，下级标题可能贴着相邻上级标题，不再为其避让）。
            const avoid1 = lv1.length ? lvAvoid(lv1[0]) : true;
            const padMax = avoid1 ? BRANCH_GAP : OVERLAP_TOL;   // 粗判用最宽松的间距要求
            for (let i = 0; i < groups.length; i++) {
                const A = bboxes[i], ga = groups[i];
                for (let j = i + 1; j < groups.length; j++) {
                    const B = bboxes[j];
                    // ② 包围盒不相交 → 必然无冲突
                    if (A.x1 - padMax >= B.x2 || B.x1 >= A.x2 + padMax
                        || A.y1 - padMax >= B.y2 || B.y1 >= A.y2 + padMax) continue;
                    // ③ 逐节点细判（内联，无临时对象）
                    const gb = groups[j];
                    for (const a of ga) {
                        const a1x = a.x - a.w / 2, a2x = a.x + a.w / 2;
                        const a1y = a.y - a.h / 2, a2y = a.y + a.h / 2;
                        for (const b of gb) {
                            const b1x = b.x - b.w / 2, b2x = b.x + b.w / 2;
                            const b1y = b.y - b.h / 2, b2y = b.y + b.h / 2;
                            if (a1x - OVERLAP_TOL < b2x && b1x < a2x + OVERLAP_TOL
                                && a1y - OVERLAP_TOL < b2y && b1y < a2y + OVERLAP_TOL) {
                                hits += 4; pairs.add(i + "|" + j);
                            } else if (avoid1
                                && a1x - BRANCH_GAP < b2x && b1x < a2x + BRANCH_GAP
                                && a1y - BRANCH_GAP < b2y && b1y < a2y + BRANCH_GAP) {
                                hits += 1; pairs.add(i + "|" + j);
                            }
                        }
                    }
                }
            }
            return { hits, pairs };
        };
        const countCrossHits = () => collectConflicts().hits;
        // ══════════════════════════════════════════════════════════
        // 2) 收敛求解：优先"加大角度间隔"，实在不行才"放大半径"
        // ──────────────────────────────────────────────────────────
        // 用户原则（2026-09-19 第三轮）：
        //   「设置了偏移角之后，能放下则保持这个偏移角，放不下则按实际情况自动增加偏移角排版」
        // 因此求解顺序是：
        //   ① 用设定的 stepDeg + 初始半径表试 → 通过就停（保持用户设定）
        //   ② 放不下 → 逐步加大 stepDeg（角度间隔），最多加到"均分 360°"为止
        //   ③ 均分仍放不下 → 再逐步放大半径（ringLambda）
        // 旧实现只做 ③，于是任何冲突都把半径推很远，整图被拉成细长锯齿（图 3 的失败效果）。
        // ══════════════════════════════════════════════════════════
        let solvedStep = baseStepDeg, solvedRc = 0, ok = false;
        // ① 原始设定
        {
            setAngles(baseStepDeg);
            layoutRadial(1);
            if (!countCrossHits()) ok = true;
        }
        // ② 逐步加大角度间隔（上限 = 均分 360° 的间隔）
        if (!ok) {
            const autoStep = 360 / n1;
            const maxStep = Math.max(baseStepDeg, autoStep);
            const steps = 24;
            for (let s = 1; s <= steps && !ok; s++) {
                const cand = baseStepDeg + (maxStep - baseStepDeg) * (s / steps);
                setAngles(cand);
                layoutRadial(1);
                if (!countCrossHits()) { solvedStep = cand; solvedRc = 0; ok = true; }
            }
            if (!ok) { solvedStep = maxStep; setAngles(maxStep); }
        }
        // ③ 角度已到上限仍冲突 → 抬高**统一碰撞半径下界 rc**（二分细化）。
        // 血泪史：
        //   旧 `lam *= 1.12` 粗步进过冲严重（净空 50px 而只需 16px）→ 引线 209~394px；
        //   改乘数式二分后净空收到极限，但乘数会把"径向需求本来就大"的分支重复放大
        //   （见 layoutRadial 注释：1 章白多 148px）；
        //   试过"逐分支乘数"—— 6 个分支两两相邻构成连通图，结果全体一起涨，反而更大。
        //   → 现方案：二分"统一下界 rc"，与各分支自身径向需求取 max，各取所长。
        if (!ok) {
            let lo = 0, hi = 0, rc = Math.max(...lv1.map(radMinOf));
            for (let iter = 0; iter < 40; iter++) {
                rc *= 1.15;
                layoutRadial(rc);
                if (!countCrossHits()) { hi = rc; break; }
                lo = rc;
            }
            if (hi > 0) {
                for (let iter = 0; iter < 16; iter++) {
                    const mid = (lo + hi) / 2;
                    layoutRadial(mid);
                    if (countCrossHits()) lo = mid; else hi = mid;
                }
            } else {
                // ⚠️ 兜底（第十轮审查加固）：40 次粗步进仍未找到可行上界（病态输入，如框极大/章节极多）
                //   时 hi 仍为 0，直接用 0 会让所有一级框叠在中心。这里退回到"径向最小需求 + 50%"，
                //   保证成品图仍可读（可能残留重叠，但绝不塌缩成一个点）。正常路径不会走到这里。
                const radMinMax = lv1.length ? Math.max(...lv1.map(radMinOf)) : 0;
                hi = radMinMax > 0 ? radMinMax * 1.5 : 1;
            }
            layoutRadial(hi);
            solvedRc = hi;
        }
        setAngles(solvedStep);
        layoutRadial(solvedRc);
        // 角度/半径被自动调整过时，记录下来供上层提示用户
        radialAutoAdjusted = (solvedStep > baseStepDeg + 0.5) || (solvedRc > Math.max(...lv1.map(radMinOf)) + 0.5);

        // 画布包围盒 + 平移（含根节点，否则画布会过小/位置偏移）
        let minX = 1e9, minY = 1e9, maxX = -1e9, maxY = -1e9;
        const bboxNodes = showRoot ? rNodes.concat([root]) : rNodes;
        for (const n of bboxNodes) {
            minX = Math.min(minX, n.x - n.w / 2); maxX = Math.max(maxX, n.x + n.w / 2);
            minY = Math.min(minY, n.y - n.h / 2); maxY = Math.max(maxY, n.y + n.h / 2);
        }
        const rContentW = Math.round(maxX - minX + 2 * o.margin);
        const rContentH = Math.round(maxY - minY + 2 * o.margin + headerH0);
        totalW = o.width > 0 ? Math.max(o.width, rContentW) : rContentW;
        totalH = o.height > 0 ? Math.max(o.height, rContentH) : rContentH;
        const rPadX = Math.round((totalW - rContentW) / 2);
        const rPadY = Math.round((totalH - rContentH) / 2);
        const offX = Math.round(o.margin - minX) + rPadX;
        const offY = Math.round(o.margin + headerH0 - minY) + rPadY;
        for (const n of rNodes) {
            n.x += offX; n.y += offY; n.cy += offY;
            if (n.linkOut) { n.linkOut.x += offX; n.linkOut.y += offY; }
            if (n.linkIn) { n.linkIn.x += offX; n.linkIn.y += offY; }
        }
        root.x = offX; root.y = offY; root.cy = root.y;
    L.totalW = totalW; L.totalH = totalH; L.radialAutoAdjusted = radialAutoAdjusted;
}

// ── TOC 布局分支（从 generateTocSvg 抽出，aiiTocLayoutVertical）：在上下文 L 上就地写回节点坐标与画布尺寸 ──
function aiiTocLayoutVertical(L) {
    const { noteTitle, o, root, showRoot, LV, lvAvoid, numOf, fontSizeOf, textColorOf, deformOf, boxShapeOf, boxPosOf, boxColorOf, boxStrokeColorOf, boxStrokeWidthOf, fontFamilyOf, resolveLineShape, ARC_K, lineOptsOf, alignOf, showSeqOf, wrapLabel, boxW, boxH, dispDepth, applyUniformWidths, outAnchorOf, padX, padY, LINE_H, H_GAP, V_GAP, rGapH, rGapV } = L;
    let totalW = L.totalW, totalH = L.totalH, radialAutoAdjusted = L.radialAutoAdjusted;
        // ── 纵向：每层级占一层，逐层向下分支；叶子水平展开 ──
        // 避让次级 OFF 判定（按深度取该层首个节点的开关，与横向同口径）：该层的**无子级**标题
        // 不再消耗一个叶子槽位，改由下方 OFF 通道锚定到相邻子树边缘（用户 2026-10-04 语义统一）。
        // ⚠️ 整层都没有子级的行（= 叶子行/最深行）不参与：它本就无「锚点」可依，保持自然槽位排布
        //    （否则会被从左边距重新铺开，把上一层的锚点全拉到画布最左，行序被打乱）。
        const offDepth = new Set();
        {
            const byD = {};
            const walkD = (n) => { if (!(n.isRoot && !showRoot)) { const d = dispDepth(n); (byD[d] ||= []).push(n); } n.children.forEach(walkD); };
            walkD(root);
            for (const d of Object.keys(byD)) {
                const row = byD[d];
                if (row.length && !lvAvoid(row[0]) && row.some(n => n.children.length)) offDepth.add(+d);
            }
        }
        const leaves = [];
        const collectV = (n) => {
            if (n.isRoot && !showRoot) { n.children.forEach(collectV); return; }
            // OFF 层的无子级标题不占叶子槽位（否则会把它自己撑到行末，把画布拉得极宽——用户报的"异常"）
            if (!n.children.length && !offDepth.has(dispDepth(n))) { n.slot = leaves.length; leaves.push(n); }
            else if (!n.children.length) n.slot = null;
            n.children.forEach(collectV);
        };
        collectV(root);
        let maxBoxH = 0, maxDD = 0;
        const sizeV = (n) => {
            if (!(n.isRoot && !showRoot)) { n.w = boxW(n); n.h = boxH(n); maxBoxH = Math.max(maxBoxH, n.h); maxDD = Math.max(maxDD, dispDepth(n)); }
            n.children.forEach(sizeV);
        };
        sizeV(root);
        applyUniformWidths(root);   // 等宽：同层统一为该层最宽
        const headerH0 = aiiHeaderHeight(o);
        const colGap = 18;
        const slotX = [];
        let accX = o.margin;
        for (const lf of leaves) { slotX.push(Math.round(accX + lf.w / 2)); accX += lf.w + colGap; }
        const vContentW = Math.round(accX - colGap + o.margin);
        const vContentH = Math.round(headerH0 + 2 * o.margin + (maxDD + 1) * maxBoxH + maxDD * V_GAP);
        totalW = o.width > 0 ? Math.max(o.width, vContentW) : vContentW;
        totalH = o.height > 0 ? Math.max(o.height, vContentH) : vContentH;
        const placeV = (n) => {
            n.children.forEach(placeV);
            if (n.isRoot && !showRoot) return;
            const dd = dispDepth(n);
            n.y = Math.round(o.margin + headerH0 + maxBoxH / 2 + dd * (maxBoxH + V_GAP));
            n.cy = n.y;
            if (n.slot != null) n.x = slotX[n.slot];
            else if (n.children.length) n.x = Math.round((n.children[0].x + n.children[n.children.length - 1].x) / 2);
            else n.x = o.margin;
        };
        placeV(root);
        // ── 避让次级 OFF（纵向，2026-10-04 与横向「子树为定位依据」语义统一）──
        //  · 有子级的标题：落在**自身子树正中**（引线形状与避让模式一致）；
        //  · 最前的无子级标题：正对「下一个有子级兄弟的首个子级」；最后的一批：末一个正对
        //    「上一个有子级兄弟的末个子级」，其余均分；夹在中间的按两锚点均分；
        //  · 最后施加最小标题间距（盒宽 + 列间距），**整段（含其子树）同步平移**。
        //  ⛔ 旧实现是「每级按该级最大宽度、从左边距起均匀铺开」→ 一级标题被挤在画布最左、
        //     子级铺到数千 px 之外、引线横穿全图（用户 2026-10-04 报「显示异常」，实测 4215×193）。
        let aiiAnyOff = false;
        if (offDepth.size) {
            const shiftSubX = (n, dx) => { n.x += dx; n.children.forEach(c => shiftSubX(c, dx)); };
            const extRelX = (n) => {                       // 子树（含后代盒）相对本节点中心的 X 边界
                let l = -n.w / 2, r = n.w / 2;
                for (const c of n.children) { const e = extRelX(c); l = Math.min(l, (c.x - n.x) + e.l); r = Math.max(r, (c.x - n.x) + e.r); }
                return { l, r };
            };
            const byDepth = {};
            const collectD = (n) => { if (!(n.isRoot && !showRoot)) { const d = dispDepth(n); (byDepth[d] ||= []).push(n); } n.children.forEach(collectD); };
            collectD(root);
            const depths = Object.keys(byDepth).map(Number).sort((a, b) => b - a);   // 自底向上
            for (const d of depths) {
                const row = byDepth[d];
                // ① 有子级者回到「子树正中」（更深层已定位完成；无可动时与 placeV 结果一致）
                for (const n of row) {
                    if (!n.children.length) continue;
                    const k = n.children;
                    n.x = Math.round((k[0].x + k[k.length - 1].x) / 2);
                }
                if (!offDepth.has(d)) continue;
                aiiAnyOff = true;
                const cnt = row.length;
                const has = row.map(c => c.children.length > 0);
                const top = new Array(cnt).fill(0), bot = new Array(cnt).fill(0);
                for (let i = 0; i < cnt; i++) {
                    if (!has[i]) continue;
                    const k = row[i].children;
                    top[i] = k[0].x - row[i].x;
                    bot[i] = k[k.length - 1].x - row[i].x;
                }
                const x = new Array(cnt).fill(null);
                let anyAnchor = false;
                for (let i = 0; i < cnt; i++) if (has[i]) { x[i] = row[i].x; anyAnchor = true; }
                if (!anyAnchor) {
                    // 整层都没有子级：按自身宽度 + 列间距顺序排（与原行为一致）
                    let ax = o.margin;
                    for (let i = 0; i < cnt; i++) { x[i] = Math.round(ax + row[i].w / 2); ax += row[i].w + colGap; }
                } else {
                    // ② 无子级标题：按所在空隙（锚点前 / 锚点间 / 锚点后）定位
                    const segs = [];
                    let s = -1;
                    for (let i = 0; i <= cnt; i++) {
                        const isA = (i < cnt) ? has[i] : true;
                        if (!isA) { if (s < 0) s = i; }
                        else if (s >= 0) { segs.push([s, i - 1]); s = -1; }
                    }
                    for (const [a, b] of segs) {
                        const pa = a - 1, na = b + 1;
                        const hP = pa >= 0 && has[pa], hN = na < cnt && has[na];
                        const k = b - a + 1;
                        let lo, hi, mode;
                        if (hP && hN) { lo = x[pa]; hi = x[na]; mode = "mid"; }
                        else if (hP) { lo = x[pa]; hi = x[pa] + bot[pa]; mode = "tail"; }
                        else if (hN) { lo = x[na] + top[na]; hi = x[na]; mode = "head"; }
                        else { lo = o.margin; hi = o.margin; mode = "mid"; }
                        for (let j = 0; j < k; j++) {
                            const t = (mode === "head") ? (j / k) : (mode === "tail" ? (j + 1) / k : (j + 1) / (k + 1));
                            x[a + j] = Math.round(lo + t * (hi - lo));
                        }
                    }
                }
                // ③ 最小标题间距：不足则推开（整段同步平移；锚点带动其整棵子树）
                for (let i = 1; i < cnt; i++) {
                    const mg = Math.max(row[i - 1].w, row[i].w) + colGap;
                    const need = x[i - 1] + mg - x[i];
                    if (need > 0) for (let j = i; j < cnt; j++) x[j] += need;
                }
                // ④ 应用位移
                for (let i = 0; i < cnt; i++) {
                    const dx = Math.round(x[i]) - row[i].x;
                    if (dx) { if (has[i]) row[i].children.forEach(c => shiftSubX(c, dx)); row[i].x += dx; }
                }
            }
        }
        // OFF 模式可能让某层比叶子更宽 → 用实际节点范围重算画布（ON 路径不受影响）
        if (aiiAnyOff) {
            let exMinX = 1e9, exMaxX = -1e9, exMinY = 1e9, exMaxY = -1e9;
            const collectA = (n) => {
                if (!(n.isRoot && !showRoot)) {
                    exMinX = Math.min(exMinX, n.x - n.w / 2); exMaxX = Math.max(exMaxX, n.x + n.w / 2);
                    exMinY = Math.min(exMinY, n.y - n.h / 2); exMaxY = Math.max(exMaxY, n.y + n.h / 2);
                }
                n.children.forEach(collectA);
            };
            collectA(root);
            const vContentW2 = Math.round(exMaxX - exMinX + 2 * o.margin);
            const vContentH2 = Math.round(exMaxY - exMinY + 2 * o.margin + headerH0);
            totalW = o.width > 0 ? Math.max(o.width, vContentW2) : vContentW2;
            totalH = o.height > 0 ? Math.max(o.height, vContentH2) : vContentH2;
        }
    L.totalW = totalW; L.totalH = totalH; L.radialAutoAdjusted = radialAutoAdjusted;
}

// ── TOC 布局分支（从 generateTocSvg 抽出，aiiTocLayoutHorizontal）：在上下文 L 上就地写回节点坐标与画布尺寸 ──
function aiiTocLayoutHorizontal(L) {
    const { noteTitle, o, root, showRoot, LV, lvAvoid, numOf, fontSizeOf, textColorOf, deformOf, boxShapeOf, boxPosOf, boxColorOf, boxStrokeColorOf, boxStrokeWidthOf, fontFamilyOf, resolveLineShape, ARC_K, lineOptsOf, alignOf, showSeqOf, wrapLabel, boxW, boxH, dispDepth, applyUniformWidths, outAnchorOf, padX, padY, LINE_H, H_GAP, V_GAP, rGapH, rGapV } = L;
    let totalW = L.totalW, totalH = L.totalH, radialAutoAdjusted = L.radialAutoAdjusted;
        // ── 横向：树形横排 ──
        let maxBoxH = 0, maxDD = 0;
        const depthMaxW = {};
        const sizeH = (n) => {
            if (n.isRoot && !showRoot) { n.children.forEach(sizeH); return; }
            const dd = dispDepth(n);
            n.w = boxW(n); n.h = boxH(n);
            maxBoxH = Math.max(maxBoxH, n.h);
            maxDD = Math.max(maxDD, dd);
            depthMaxW[dd] = Math.max(depthMaxW[dd] || 0, n.w);
            n.children.forEach(sizeH);
        };
        sizeH(root);
        // 行距按实际盒高分配：叶块高=自身盒高，父块高=max(自身高, 子块和+间隙)，同级间隙恒为 V_GAP。
        // 修复：某级「每行字数」换行撑大全局 maxBoxH 后，所有行（含单行的下级）被拉成统一大行距，
        // 造成间距不均、下级间距夸张。
        const calcBlockH = (n) => {
            if (n.isRoot && !showRoot) {
                const sum = n.children.reduce((a, c) => a + calcBlockH(c), 0) + Math.max(0, n.children.length - 1) * V_GAP;
                n.blockH = sum;
                return n.blockH;
            }
            if (!n.children.length) { n.blockH = n.h; return n.blockH; }
            const sum = n.children.reduce((a, c) => a + calcBlockH(c), 0) + (n.children.length - 1) * V_GAP;
            n.blockH = Math.max(n.h, sum);
            return n.blockH;
        };
        calcBlockH(root);
        // ── 「避让次级」两种排布模式（用户 2026-10-01 定稿语义）──
        //  ON（勾选，默认）：本级占满「自身整棵子树」的高度 → 一级标题的位置被二级标题占用的
        //     空间界定（父行线 = 首末子行线中点）。这就是"避让"。
        //  OFF（不勾）：本级只按「自身高度 + 半间距」排成骨架，**不再被下一级子树撑开**；只有相邻
        //     兄弟在下一列都挂着子树时，才把后面的下推，推距取**半间距**（用户："排不下的本级
        //     标题按下一标题的一半间距继续排列"）。于是无子级的标题会紧贴、末尾几级明显上移，
        //     下级标题的左边可能对着别的上级标题——父子关系只由引线表达。
        const GAP_OFF = V_GAP / 2;
        // 每级占用高度：ON 含整棵子树；OFF 只算自身盒高
        const effH = (c) => (lvAvoid(c) ? c.blockH : c.h);
        const rowAvail = (kids) => kids.reduce((a, c) => a + effH(c), 0) + Math.max(0, kids.length - 1) * V_GAP;
        const shiftTree = (n, dy) => { n.lineY += dy; n.children.forEach(c => shiftTree(c, dy)); };
        // 单个节点盒相对其行线的垂直占位（盒位置 = 连线上 / 上方 / 下方）
        const boxRel = (node) => {
            const pos = boxPosOf(node);
            if (pos === "above") return { t: -node.h, b: 0 };
            if (pos === "below") return { t: 0, b: node.h };
            return { t: -node.h / 2, b: node.h / 2 };
        };
        // 子树（自身盒 + 全部后代盒）相对「给定行线坐标」的上下边界
        const extOf = (node, ly) => {
            const r = boxRel(node);
            let t = ly + r.t, b = ly + r.b;
            for (const c of node.children) { const e = extOf(c, c.lineY); if (e.t < t) t = e.t; if (e.b > b) b = e.b; }
            return { t, b };
        };
        // OFF 组（不避让）：以「子树」为定位依据，用户 2026-10-01 定稿规则——
        //   · 有子级的标题：落在**自身子树正中**（引线形状与避让模式完全一致）；
        //   · 最前面的无子级标题：正对「下一个有子级兄弟的首个子级」（子树顶端）；
        //   · 最后面的无子级标题群：末一个正对「上一个有子级兄弟的末个子级」（子树底端），
        //     其余在本级标题与子树底端之间均分；
        //   · 夹在两个有子级兄弟之间的无子级标题：在两锚点之间均分；
        //   · 最后统一施加「最小标题间距」约束（本级盒高 + V_GAP）。
        //   ⛔ 勿回退「骨架 + 逐兄弟下推」那版：它让无子级的标题紧贴上一个标题，
        //     与用户要的"对着相邻子级正前方"不符。
        const placeRowOff = (kids, centerY) => {
            const n = kids.length;
            const has = kids.map(c => c.children.length > 0);
            const top = new Array(n).fill(0), bot = new Array(n).fill(0);
            const eT = new Array(n).fill(0), eB = new Array(n).fill(0);   // 真实盒边界（相对该条目行线）
            // ① 有子级的先把子树以 0 为中心排好，记录行线边界 + 真实盒边界
            for (let i = 0; i < n; i++) {
                if (!has[i]) continue;
                placeRowOff(kids[i].children, 0);
                const k = kids[i].children;
                top[i] = k[0].lineY;
                bot[i] = k[k.length - 1].lineY;
                const e = extOf(kids[i], 0);   // 父行线落在子树正中（frame 坐标 0）
                eT[i] = e.t; eB[i] = e.b;
            }
            for (let i = 0; i < n; i++) if (!has[i]) { eT[i] = -kids[i].h / 2; eB[i] = kids[i].h / 2; }
            const y = new Array(n).fill(null);
            let prevBot = null, anyAnchor = false;
            for (let i = 0; i < n; i++) {
                if (!has[i]) continue;
                anyAnchor = true;
                // 相邻「子树」之间按**真实盒边界**至少留 V_GAP —— 旧版只比首末子级 lineY（差 GAP_OFF），
                // 盒子比 lineY 高出半盒 → 2.5 与 3.1 压字 22px（用户 2026-10-02 报）。
                y[i] = (prevBot == null) ? -eT[i] : prevBot + V_GAP - eT[i];
                prevBot = y[i] + eB[i];
            }
            if (!anyAnchor) {
                // 整组都没有子级：按自身高度 + 半间距顺序排
                let acc = null;
                for (let i = 0; i < n; i++) { y[i] = (acc == null) ? 0 : acc + GAP_OFF + kids[i].h / 2; acc = y[i] + kids[i].h / 2; }
            } else {
                // ② 无子级标题：按所在空隙（锚点前 / 锚点间 / 锚点后）定位
                const segs = [];
                let s = -1;
                for (let i = 0; i <= n; i++) {
                    const isA = (i < n) ? (y[i] != null) : true;
                    if (!isA) { if (s < 0) s = i; }
                    else if (s >= 0) { segs.push([s, i - 1]); s = -1; }
                }
                for (const [a, b] of segs) {
                    const pa = a - 1, na = b + 1;
                    const hP = pa >= 0 && y[pa] != null, hN = na < n && y[na] != null;
                    const k = b - a + 1;
                    let lo, hi, mode;
                    if (hP && hN) { lo = y[pa]; hi = y[na]; mode = "mid"; }
                    else if (hP) { lo = y[pa]; hi = y[pa] + bot[pa]; mode = "tail"; }   // 结尾：锚点 → 子树底
                    else if (hN) { lo = y[na] + top[na]; hi = y[na]; mode = "head"; }   // 开头：子树顶 → 锚点
                    else { lo = 0; hi = 0; mode = "mid"; }
                    for (let j = 0; j < k; j++) {
                        const t = (mode === "head") ? (j / k) : (mode === "tail" ? (j + 1) / k : (j + 1) / (k + 1));
                        y[a + j] = lo + t * (hi - lo);
                    }
                }
            }
            // ③ 最小标题间距：不足则推开。⚠️ 必须**整段（含后续锚点）同步下移** ——
            //    锚点（有子级的标题）的 y 在①里已按子树真实边界定好，若只推它自己就会
            //    破坏与后面锚点的相对间距 → 子树互相压字（2026-10-03 用户报 4.x 与 9.x 交错）。
            for (let i = 1; i < n; i++) {
                const mg = Math.max(kids[i - 1].h, kids[i].h) + V_GAP;
                const need = y[i - 1] + mg - y[i];
                if (need > 0) for (let j = i; j < n; j++) y[j] += need;
            }
            // ④ 整体居中 + 把各子树平移到最终位置
            let lo = Infinity, hi = -Infinity;
            for (let i = 0; i < n; i++) {
                lo = Math.min(lo, y[i] + eT[i]); hi = Math.max(hi, y[i] + eB[i]);
            }
            const shift = centerY - (lo + hi) / 2;
            for (let i = 0; i < n; i++) {
                if (has[i]) kids[i].children.forEach(c => shiftTree(c, y[i] + shift));
                kids[i].lineY = Math.round(y[i] + shift);
            }
        };
        // 排一组兄弟（同一父级的子级）：按该组的 avoidSecondary 选择骨架法 / 槽位法
        const layoutRow = (kids, yTop, availH) => {
            if (!kids.length) return;
            if (!lvAvoid(kids[0])) { placeRowOff(kids, yTop + availH / 2); return; }
            let accY = yTop + (availH - rowAvail(kids)) / 2;
            kids.forEach(c => { const h = effH(c); placeNode(c, accY, h); accY += h + V_GAP; });
        };
        const placeNode = (n, yTop, slotH) => {
            if (!lvAvoid(n)) {
                // OFF：本级不再被子树撑开，子级以本级行线为中心展开（子树各自定位）
                n.lineY = Math.round(yTop + n.h / 2);
                if (n.children.length) placeRowOff(n.children, n.lineY);
                return;
            }
            if (!n.children.length) { n.lineY = Math.round(yTop + n.h / 2); return; }
            layoutRow(n.children, yTop, slotH);
            const mid = (n.children[0].lineY + n.children[n.children.length - 1].lineY) / 2;
            const yLo = yTop + n.h / 2, yHi = yTop + slotH - n.h / 2;
            n.lineY = Math.round(Math.min(Math.max(mid, yLo), Math.max(yLo, yHi)));
        };
        const headerH0 = aiiHeaderHeight(o);
        const xStart = {};
        let acc = o.margin;
        for (let d = 0; d <= maxDD; d++) { xStart[d] = acc; acc += (depthMaxW[d] || 0) + H_GAP; }
        // 每级框位置不同时，按最坏情况补偿：任一级为"连线以上/以下"则该侧预留半框高
        const posKeys = ["title", "1", "2", "3", "4"];
        const anyAbove = posKeys.some(k => (o.levels[k].boxPosition || o.textOnLine) === "above");
        const anyBelow = posKeys.some(k => (o.levels[k].boxPosition || o.textOnLine) === "below");
        const offTop = anyAbove ? maxBoxH / 2 : 0;
        const botExtra = anyBelow ? maxBoxH / 2 : 0;
        // 行线 y 分配：从块顶顺序放子块；叶行线=自身盒中心，父行线=首末子行线中点并夹在自身盒范围内。
        const baseY = o.margin + headerH0 + offTop;
        if (showRoot) placeNode(root, baseY, rowAvail(root.children));
        else { layoutRow(root.children, baseY, rowAvail(root.children)); root.lineY = 0; }
        // 画布尺寸在裁剪后统一决定（见下方 crop 段）：此处不再按设定值提前赋值，避免被覆盖
        const placeH = (n) => {
            if (!(n.isRoot && !showRoot)) {
                const dd = dispDepth(n);
                const colW = depthMaxW[dd] || 0;
                // 等宽：本级所有节点框统一为该级最宽框（按字数=框随文字）
                const wm = LV(n).boxWidthMode || o.boxWidthMode || "auto";
                if (wm === "uniform" && colW > 0) n.w = colW;
                const al = alignOf(n);
                // 统一中心语义：n.x = 框中心 x
                if (al === "right") n.x = xStart[dd] + colW - n.w / 2;
                else if (al === "center") n.x = xStart[dd] + colW / 2;
                else n.x = xStart[dd] + n.w / 2;
                // 文字与框永远垂直居中：cy 必须等于框中心 y（框位置随每级设置挪动；行线 y 已由 placeYH 分配）
                const pos = boxPosOf(n);
                n.y = pos === "above" ? n.lineY - Math.round(n.h / 2)
                    : (pos === "below" ? n.lineY + Math.round(n.h / 2) : n.lineY);
                n.cy = n.y;
            } else { n.x = 0; n.y = 0; n.cy = 0; n.lineY = 0; }
            n.children.forEach(placeH);
        };
        placeH(root);
        // 按实际内容裁剪画布：消除按 maxBoxH 预留行高带来的上下/左右多余留白
        let exMinX = 1e9, exMaxX = -1e9, exMinY = 1e9, exMaxY = -1e9;
        const hNodes = [];
        const collectHN = (n) => { if (!(n.isRoot && !showRoot)) hNodes.push(n); n.children.forEach(collectHN); };
        collectHN(root);
        for (const n of hNodes) {
            exMinX = Math.min(exMinX, n.x - n.w / 2); exMaxX = Math.max(exMaxX, n.x + n.w / 2);
            exMinY = Math.min(exMinY, n.y - n.h / 2); exMaxY = Math.max(exMaxY, n.y + n.h / 2);
        }
        const hOffX = Math.round(o.margin - exMinX);
        const hOffY = Math.round(o.margin + headerH0 - exMinY);
        for (const n of hNodes) { n.x += hOffX; n.y += hOffY; n.cy += hOffY; n.lineY += hOffY; }
        // 画布尺寸：用户设定值生效（内容更宽/更高时取内容尺寸，避免截断）
        const hContentW = Math.round(exMaxX - exMinX + 2 * o.margin);
        const hContentH = Math.round(exMaxY - exMinY + 2 * o.margin + headerH0);
        totalW = o.width > 0 ? Math.max(o.width, hContentW) : hContentW;
        totalH = o.height > 0 ? Math.max(o.height, hContentH) : hContentH;
    L.totalW = totalW; L.totalH = totalH; L.radialAutoAdjusted = radialAutoAdjusted;
}

// ── TOC 渲染解析器工厂（从 generateTocSvg 抽出）：集中构建「每级设置解析 + 尺寸/换行 + 锚点」等纯解析函数 ──
function aiiTocMakeHelpers(o, showRoot) {
    // ── 每级独立设置解析（空串/缺省 = 跟随全局）──
    const LV = (node) => o.levels[node.isRoot ? "title" : String(Math.min(node.level, 4))] || {};
    // 避让次级：本级标题间距是否受下一级标题排布影响。缺省/空 = 开启（子级感知，当前默认行为）。
    const lvAvoid = (node) => {
        const k = node.isRoot ? "title" : String(Math.min(node.level || 0, 4));
        const l = o.levels && o.levels[k];
        return l ? (l.avoidSecondary !== false) : true;
    };
    const numOf = (v, fb) => (v !== "" && v != null && !isNaN(Number(v))) ? Number(v) : fb;
    const fontSizeOf = (node) => {
        const l = LV(node);
        if (l.fontSize !== "") return Math.max(8, Number(l.fontSize) || o.fontSize);
        return Math.max(8, o.fontSize);
    };
    const textColorOf = (node) => LV(node).textColor || o.textColor;
    const deformOf = (node) => {
        const d = LV(node).fontDeform;
        if (!d) return { w: o.textBold, i: o.textItalic };
        return { w: d === "bold" || d === "bolditalic", i: d === "italic" || d === "bolditalic" };
    };
    const boxShapeOf = (node) => LV(node).boxShape || o.boxShape;
    const boxPosOf = (node) => LV(node).boxPosition || o.textOnLine;
    const boxStrokeWidthOf = (node) => numOf(LV(node).boxStrokeWidth, o.boxStrokeWidth);
    const fontFamilyOf = (node) => {
        const f = LV(node).fontFamily;
        if (f === "custom") return LV(node).fontFamilyCustom || o.fontFamily;
        return f || o.fontFamily;
    };
    // 连线形状解析：arc=弧形 / rightangle=直角（放射状下=直线）；旧值 auto 一律按弧形处理
    const resolveLineShape = (l) => {
        const s = l.lineShape || o.lineShape || "arc";
        return s === "auto" ? "arc" : s;
    };
    // ══ 曲线控制点拉出比例 k（三种布局共用同一条公式）══
    // 几何含义 = Office 曲线连接符上那个黄色锚点沿参考线滑到的位置：
    //   k = 0    → 控制点贴住两端 → 退化成直线
    //   k = 0.25 → 很柔的 S（拐弯摊在整段上，"太平滑"）
    //   k = 0.75 → **转角锐利**：两段长直线 + 中间一次急转（用户要的效果）
    //   k = 1    → 最锐：中点处切线变竖直，近似"台阶"
    // 用户参数（设置里的「弧度」）取 **0~10**，内部 k = A/10。
    //
    // ⚠️ 参数化范围的血泪史：上一轮我误判"控制点互相越过 = bug"，把 k 上限卡到 0.5，
    //   结果曲线变得**更平**，正好与用户诉求相反。实测（`_ksweep.js` / `_curvecmp.js`）：
    //   k 取到 0.95 时推进轴坐标**仍严格单调**（0 条曲线回头），所谓"越过"只是控制多边形
    //   交叉，恰恰是急转的来源。真正的极限是 k = 1（此时 dx/dt 在中点降为 0，仍不反向）。
    // 弧度 → 控制点拉出比例 k（对称 S 形，2026-09-29 四次定稿回归第六/七轮口径）：
    //   k = 值/10，0 → 直线；7.5（默认）→ 0.75（长直线+中段急转，用户"转角锐利"定稿）；10 → 1.0。
    const ARC_K = (a) => Math.max(0, Math.min(1, numOf(a, 7.5) / 10));
    // 连线样式按「线所出发的父节点」层级取设置（本级 → 下级连线）
    const lineOptsOf = (parent) => {
        const l = LV(parent);
        return {
            color: l.lineColor || o.lineColor,
            width: Math.max(0.3, numOf(l.lineWidth, o.lineWidth)),
            shape: resolveLineShape(l),
            // 弧度值域 0~10（⛔ 不要 clamp 到 [0,1]：那会把 7.5 压成 1 → 曲线几乎变直线）
            arc: Math.max(0, Math.min(10, numOf(l.lineArc, o.arcAngle)))
        };
    };
    const alignOf = (node) => LV(node).align || o.levelAlignment;
    const showSeqOf = (node) => {
        if (node.isRoot) return false;
        const s = LV(node).sequence;
        return s ? s === "on" : !!o.showSequence;
    };

    const padX = 10, padY = 6;
    const LINE_H = Math.max(1.0, numOf(o.lineHeight, 1.35));
    const H_GAP = Math.max(10, numOf(o.gapX, 46)), V_GAP = Math.max(4, numOf(o.gapY, 18));
    // 放射状专用间距：一律用全局"水平间距/垂直间距"设置（极值兜底防呆），
    // 保证用户调间距时放射图同步响应；不再写死常量。
    const rGapH = Math.max(10, numOf(o.gapX, 46));
    const rGapV = Math.max(4, numOf(o.gapY, 18));
    const wrapLabel = (node, fs) => {
        const seq = showSeqOf(node) && node.seq ? node.seq + "  " : "";
        const full = seq + node.text;
        const perLevelChars = LV(node).boxMaxChars;
        const maxChars = numOf(perLevelChars, Number(o.boxMaxChars) || 0);
        if (maxChars < 1) return [full];
        // 按行数模式（wrapMode="lines"）：整题均分为 maxChars 行（1=不拆，0 已在上面拦截）
        if (o.wrapMode === "lines") {
            const text = String(full);
            const nRows = Math.max(1, Math.min(12, Math.round(maxChars)));
            if (nRows <= 1 || text.length <= nRows) return [text];
            const per = Math.ceil(text.length / nRows);
            const rows = [];
            for (let i = 0; i < text.length; i += per) rows.push(text.slice(i, i + per));
            return rows.length ? rows : [text];
        }
        const maxW = maxChars * fs;
        const lines = [];
        let cur = "", curW = 0;
        for (const ch of String(full)) {
            const code = ch.codePointAt(0);
            const w = code > 0x2e80 ? fs : (/\s/.test(ch) ? fs * 0.45 : fs * 0.58);
            if (cur && curW + w > maxW) { lines.push(cur); cur = ch; curW = w; }
            else { cur += ch; curW += w; }
        }
        if (cur) lines.push(cur);
        return lines.length ? lines : [full];
    };
    const boxW = (node) => {
        const fs = fontSizeOf(node);
        let w = 0;
        for (const ln of wrapLabel(node, fs)) w = Math.max(w, aiiMeasure(ln, fs));
        return Math.round(w + padX * 2);
    };
    const boxH = (node) => {
        const fs = fontSizeOf(node);
        const lineCount = wrapLabel(node, fs).length;
        return Math.round(lineCount * fs * LINE_H + padY * 2);
    };
    const dispDepth = (node) => showRoot ? node.depth : node.depth - 1;
    // 等宽：同一深度（横向=同列 / 纵向=同层 / 放射=同环）统一为该深度最宽框；按字数=框随文字。
    // 须在确定位置/槽位之前调用（宽度会影响排布）。横向布局已有等效内联逻辑，此处服务纵向/放射。
    const applyUniformWidths = (rootNode) => {
        const depthMaxW = {};
        const walk = (n) => {
            if (!(n.isRoot && !showRoot)) { const dd = dispDepth(n); depthMaxW[dd] = Math.max(depthMaxW[dd] || 0, n.w); }
            n.children.forEach(walk);
        };
        walk(rootNode);
        const apply = (n) => {
            if (!(n.isRoot && !showRoot)) {
                const dd = dispDepth(n);
                const wm = LV(n).boxWidthMode || o.boxWidthMode || "auto";
                if (wm === "uniform" && depthMaxW[dd] > 0) n.w = depthMaxW[dd];
            }
            n.children.forEach(apply);
        };
        apply(rootNode);
    };


    // ══ 出点：按 outward 的**主轴**取该边中点（永不到框角）══
    // 用户第六轮反馈：「锚点没有正确链接到文本框的中间」。
    // 根因一：旧式按分量阈值选边（`ux > 0.5 ? 右边 : (ux < -0.5 ? 左边 : 中线)`），
    //   sinθ 与 cosθ 同时越过 0.5 时（30°<θ<60° 及其对称位置）**两条边都命中**，
    //   落点跑到**框角**上（实测 2 章出点距右边中点 15px、正落在右上角）。
    // 根因二：根→一级那一层用 `edgeTo()` 求"射线与框的交点"，斜向射线交在边上而非中点
    //   （实测 6 条线里 5 条偏离根框边中点最多 26.9px，只有 1 条正好压住圆点）。
    // → 统一改成：比较 |ux| 与 |uy| 取**主轴**，再取该边的中点。
    //   这样线一定从"盒子正中间那条边"引出，与圆点、与横向/纵向布局的语义完全一致。
    // ⚠️ 必须定义在所有布局分支**之前**（placeSub 在径向求解过程中就要调用它）。
    const outAnchorOf = aiiOutAnchorOf;
    return { LV, lvAvoid, numOf, fontSizeOf, textColorOf, deformOf, boxShapeOf, boxPosOf, boxStrokeWidthOf, fontFamilyOf, resolveLineShape, ARC_K, lineOptsOf, alignOf, showSeqOf, padX, padY, LINE_H, H_GAP, V_GAP, rGapH, rGapV, wrapLabel, boxW, boxH, dispDepth, applyUniformWidths, outAnchorOf };
}

function generateTocSvg(allHeadings, opts, noteTitle) {
    const o = Object.assign(aiiMakeDefaultTocSettings(), opts || {});
    aiiTocSanitizeToc(o);   // 第十轮审查加固：入参净化，杜绝 NaN/负值/越界导致的画布爆炸或抛错
    aiiTocEnsureLevels(o);
    const root = aiiBuildTocTree(allHeadings, o, noteTitle);
    const showRoot = !!o.showArticleName && o.levels.title.visible !== false;

    const H = aiiTocMakeHelpers(o, showRoot);
    const { LV, lvAvoid, numOf, fontSizeOf, textColorOf, deformOf, boxShapeOf, boxPosOf, boxStrokeWidthOf, fontFamilyOf, resolveLineShape, ARC_K, lineOptsOf, alignOf, showSeqOf, padX, padY, LINE_H, H_GAP, V_GAP, rGapH, rGapV, wrapLabel, boxW, boxH, dispDepth, applyUniformWidths, outAnchorOf } = H;
    // 框底色/描边色：每级颜色已由设置页按全局基准 +「底色变色」烘焙（依赖后置的 boxVariStep，
    // 故不随工厂搬移）。仅「按章节」维度保留渲染时实时变色（章节数无法预知）。
    const boxChannel = (base, node) => (o.boxColorVariDim === "chapter")
        ? aiiVariColor(base, o.boxColorVari, o.boxColorVariStrength, boxVariStep(node), o.boxColorVariDir) : base;
    const boxColorOf = (node) => boxChannel(LV(node).boxColor || o.boxColor, node);
    const boxStrokeColorOf = (node) => boxChannel(LV(node).boxStrokeColor || o.boxStrokeColor, node);

    const L = { noteTitle, o, root, showRoot, LV, lvAvoid, numOf, fontSizeOf, textColorOf, deformOf, boxShapeOf, boxPosOf, boxColorOf, boxStrokeColorOf, boxStrokeWidthOf, fontFamilyOf, resolveLineShape, ARC_K, lineOptsOf, alignOf, showSeqOf, wrapLabel, boxW, boxH, dispDepth, applyUniformWidths, outAnchorOf, padX, padY, LINE_H, H_GAP, V_GAP, rGapH, rGapV, totalW: 0, totalH: 0, radialAutoAdjusted: false };
    if (o.layout === "radial") aiiTocLayoutRadial(L);
    else if (o.layout === "vertical") aiiTocLayoutVertical(L);
    else aiiTocLayoutHorizontal(L);
    const totalW = L.totalW, totalH = L.totalH, radialAutoAdjusted = L.radialAutoAdjusted;

    // ── 纵向直角连线：同一父节点的水平总线取统一高度（父底 与 最高子盒顶 的中点），
    //    避免各子盒行数不同（顶部不齐）导致每个孩子的肘线高低错开 ──
    const vBusY = new Map();
    if (o.layout === "vertical") {
        const calcVBus = (n) => {
            if (n.children.length && !(n.isRoot && !showRoot)) {
                const pBottom = n.y + n.h / 2;
                let minTop = 1e9;
                for (const c of n.children) minTop = Math.min(minTop, c.y - c.h / 2);
                vBusY.set(n, (pBottom + minTop) / 2);
            }
            n.children.forEach(calcVBus);
        };
        calcVBus(root);
    }

    // （原「连线颜色 single/mono/rainbow」整套着色方案及其配套 helpers 已于 2026-10-05
    //   随「预设」功能一并删除：连线着色统一由「变色」（基准色 + 方案/维度/强度/方向）负责。）

    // ── 变色效果（第九轮）：章节序号映射（节点/连线 → 其一级祖先在 depth1 中的序号）──
    // 章节序号取 **1 基**（首章=1）：标题层/根保持基准色不变，所有章节都参与变色。
    const chapIdxMap = new Map();
    {
        let ci = 1;
        const prop = (n, idx) => { chapIdxMap.set(n, idx); n.children.forEach(c => prop(c, idx)); };
        (root.children || []).forEach(c => prop(c, ci++));
        chapIdxMap.set(root, 0);
    }
    // 变色步长：按层级 = 显示深度（title 层 0 不变，一级 1、二级 2…）；按章节 = 一级祖先序号（首章 0 不变）
    const boxVariStep = (node) => (o.boxColorVariDim === "chapter" ? (chapIdxMap.get(node) || 0) : dispDepth(node));
    const lineVariStep = (child) => (o.lineColorVariDim === "chapter" ? (chapIdxMap.get(child) || 0) : dispDepth(child));

    return aiiTocAssemble({ o, root, showRoot, totalW, totalH, radialAutoAdjusted, LV, numOf, dispDepth, wrapLabel, fontSizeOf, boxShapeOf, deformOf, textColorOf, fontFamilyOf, alignOf, boxColorOf, boxStrokeColorOf, boxStrokeWidthOf, boxPosOf, lineOptsOf, ARC_K, H_GAP, LINE_H, padX, outAnchorOf, chapIdxMap, lineVariStep, vBusY });
}
// === TOC-GEN-END ===

// ═══════════════════════════════════════════════════════════════
// 插件主类
// ═══════════════════════════════════════════════════════════════
const ArticleInfoInserterPlugin = class extends Plugin {
    async onload() {
        await this.loadSettings();
        this.addSettingTab(new ArticleInfoSettingTab(this.app, this));

        this.addRibbonIcon("file-text", tr(this.settings.language, "ribbonTitle"), async () => {
            await this.runAll();
        });

        this.addCommand({
            id: "update-article-info",
            name: tr(this.settings.language, "commandName"),
            callback: async () => { await this.runAll(); }
        });
    }

    async loadSettings() {
        const loaded = await this.loadData();
        let merged;

        if (!loaded) {
            merged = makeDefaultSettings();
        } else {
            merged = Object.assign(deepClone(DEFAULT_SETTINGS), loaded);
            // 兼容旧版 langConfigs：若顶层没有 display/rowConfigs，从旧结构中迁移
            if (!merged.display && loaded.langConfigs && loaded.langConfigs[merged.language || "zh"]) {
                merged.display = deepClone(loaded.langConfigs[merged.language || "zh"].display);
            }
            if (!merged.rowConfigs && loaded.langConfigs && loaded.langConfigs[merged.language || "zh"]) {
                merged.rowConfigs = deepClone(loaded.langConfigs[merged.language || "zh"].rowConfigs);
            }
        }

        // 「图片单行显示警告」默认值改为「打开」（3.0.0 起）；对旧配置做一次性迁移，
        // 迁移后用户手动关闭不会再被覆盖（靠 linkImageSingleWarningDefaultMigrated 标记）。
        if (merged.linkImageSingleWarningDefaultMigrated !== true) {
            merged.linkImageSingleWarning = true;
            merged.linkImageSingleWarningDefaultMigrated = true;
        }

        // toc 兼容迁移：旧默认连线形状「arc」一次性迁移为「auto」
        // （自动=横向弧形/纵向直角折线/放射状直线；之后用户手动选回弧形不会再被迁移）
        if (merged.toc && merged.toc.lineShape === "arc" && !merged.toc.lineShapeMigrated) {
            merged.toc.lineShape = "auto";
            merged.toc.lineShapeMigrated = true;
        }
        // 「弧度」量纲迁移：旧值域 0~1 → 新值域 0~10（用户要求"别在 0-1 之间、放大十倍输入"）。
        // ⚠️ 映射取 `A = 5 + 5·a`（而不是单纯的 ×10），因为要**保住旧观感**：
        //   旧横向/纵向公式是 `k = 0.5 + 0.5a`，a=0.5 → k=0.75；新公式 `k = A/10`，
        //   令 A = 5+5a 则 a=0 → A=5 → k=0.5、a=0.5 → A=7.5 → k=0.75、a=1 → A=10 → k=1，
        //   与原观感逐点对应。单纯 ×10 会把用户现有的 0.5 变成 k=0.5（偏柔），
        //   而用户本轮要的正是"转角更锐利"。
        if (merged.toc && !merged.toc.arcScale10Migrated) {
            const bump = (num) => (num <= 1) ? Math.round((5 + 5 * num) * 10) / 10 : num;
            const a0 = merged.toc.arcAngle;
            if (typeof a0 === "number") merged.toc.arcAngle = bump(a0);
            const lv = merged.toc.levels;
            if (lv) for (const k of Object.keys(lv)) {
                const cur = lv[k] && lv[k].lineArc;
                if (cur === "" || cur == null) continue;
                const num = Number(cur);
                if (!isNaN(num)) lv[k].lineArc = String(bump(num));
            }
            merged.toc.arcScale10Migrated = true;
        }
        if (merged.toc) {
            // 旧版数据（无 levels 字段）补空级设置＝全部跟随全局，保持用户原有外观；
            // 仅 levels === null（3.0.0 新默认）才填充思维导图配色
            if (loaded && loaded.toc && loaded.toc.levels === undefined) merged.toc.levels = {};
            aiiTocEnsureLevels(merged.toc);
            aiiTocMaterializeLevels(merged.toc);
        }
        // 全新安装 / 首次生成层级：按「全局基准 + 变色规则」派生每级颜色
        // （老用户的既有自定义色不动——由上面的 baseAlignMigrated 一次性迁移负责）
        if (merged.toc && (!loaded || !loaded.toc || loaded.toc.levels == null)) {
            aiiDeriveLevelColors(merged.toc);
        }

        // 层级间距默认值迁移：46 → 32（用户第六轮要求"两级标题之间的距离缩小一点"）。
        // 转角变锐利后曲线占的横向空间更省，列距可以收紧；46 是本插件自带的旧默认值，
        // 故按"旧默认值"识别并一次性迁移（用户自己填过的其它值不动）。
        if (merged.toc && !merged.toc.gapTightenMigrated) {
            if (Number(merged.toc.gapX) === 46) merged.toc.gapX = 32;
            merged.toc.gapTightenMigrated = true;
        }

        // 「全局基准」一次性对齐（2026-09-30 用户定稿）：
        // 历史方案把基准色/线宽写死在每级（思维导图方案硬编码 #cb4b16/#6c71c4… 与 1.5px），
        // 造成「全局粗细 1 / 自定义 1.5」「全局灰 / 自定义彩色」的上下冲突。
        // 现统一为：全局设置 = 唯一基准，全局连线色即一级引出线的颜色，变色规则派生下面各级。
        // 迁移只做一次：把用户现有的"一级引出线色 / 一级框描边色"提为全局基准，线宽与全局对齐。
        if (merged.toc && merged.toc.baseAlignMigrated !== "v7") {
            const L = merged.toc.levels || {};
            if (L.title && L.title.lineColor) merged.toc.lineColor = L.title.lineColor;
            if (L["1"] && L["1"].boxStrokeColor) merged.toc.boxStrokeColor = L["1"].boxStrokeColor;
            for (const k of ["title", "1", "2", "3", "4"]) {
                if (!L[k]) continue;
                L[k].lineWidth = merged.toc.lineWidth;
                L[k].boxStrokeWidth = merged.toc.boxStrokeWidth;
            }
            merged.toc.baseAlignMigrated = "v7";
            aiiDeriveLevelColors(merged.toc);
        }
        // 底纹迁移：旧的三个纯色预设（白底/米色底/黑底）合并为「单色」+ 可自定义颜色
        if (merged.toc) aiiNormalizeBg(merged.toc);

        // 「反向色轮」= 彩虹色轮 + 方向「反」（重复项，2026-10-03 删除下拉项）：
        // 旧配置一次性迁移为 rainbow + dir=rev。
        if (merged.toc && merged.toc.lineColorVari === "rainbowrev") {
            merged.toc.lineColorVari = "rainbow";
            merged.toc.lineColorVariDir = "rev";
        }
        if (merged.toc && merged.toc.boxColorVari === "rainbowrev") {
            merged.toc.boxColorVari = "rainbow";
            merged.toc.boxColorVariDir = "rev";
        }

        // 连接点默认大小 3.5 → 2（2026-10-02 用户定稿）：只迁移仍等于"旧默认值"的层级，
        // 用户自己调过的大小不动。
        if (merged.toc && !merged.toc.dotSizeMigrated) {
            if (Number(merged.toc.dotSize) === 3.5) merged.toc.dotSize = 2;
            const DL = merged.toc.levels || {};
            for (const k of ["title", "1", "2", "3", "4"]) {
                if (DL[k] && Number(DL[k].dotSize) === 3.5) DL[k].dotSize = 2;
            }
            merged.toc.dotSizeMigrated = true;
        }

        const lang = merged.language || "zh";

        const codeMethod = merged.codeCountMethod || "line";

        // 若仍未有 rowConfigs/display，使用当前语言默认
        if (!merged.rowConfigs) {
            merged.rowConfigs = deepClone(getDefaultLangConfig(lang, codeMethod).rowConfigs);
        }
        if (!merged.display) {
            merged.display = deepClone(getDefaultLangConfig(lang, codeMethod).display);
        }

        // 补全新增 tag 的 display 项
        const defaults = makeDisplayDefaults(lang, codeMethod);
        for (const key of Object.keys(defaults)) {
            if (!merged.display[key]) merged.display[key] = Object.assign({}, defaults[key]);
        }

        // 规范化 rowConfigs：保证 6 行 × 5 槽位齐全、槽位字段完整。
        // 历史数据/手工编辑可能导致行数或槽位数缺失，缺失会让设置页在渲染时抛异常而整体空白，
        // 用户将再也无法进入设置界面自行修复，因此必须在加载阶段兜底补全。
        const SLOT_FIELDS = { tag: "none", bodyShow: "hide", propPolicy: "none" };
        if (!Array.isArray(merged.rowConfigs)) merged.rowConfigs = [];
        for (let i = 0; i < 6; i++) {
            const row = merged.rowConfigs[i];
            if (!row || typeof row !== "object") {
                merged.rowConfigs[i] = { slots: [], alignment: "justify", indent: 0 };
            }
            if (merged.rowConfigs[i].indent == null) merged.rowConfigs[i].indent = 0;
            if (!merged.rowConfigs[i].alignment) merged.rowConfigs[i].alignment = "justify";
            if (!Array.isArray(merged.rowConfigs[i].slots)) merged.rowConfigs[i].slots = [];
            const slots = merged.rowConfigs[i].slots;
            for (let j = 0; j < 5; j++) {
                const slot = slots[j];
                if (!slot || typeof slot !== "object") {
                    slots[j] = Object.assign({}, SLOT_FIELDS);
                } else {
                    if (slot.tag == null) slot.tag = SLOT_FIELDS.tag;
                    if (slot.bodyShow == null) slot.bodyShow = SLOT_FIELDS.bodyShow;
                    if (slot.propPolicy == null) slot.propPolicy = SLOT_FIELDS.propPolicy;
                }
            }
        }

        // 兼容旧版无 presets 字段
        if (!Array.isArray(merged.presets) || merged.presets.length === 0) {
            merged.presets = deepClone(DEFAULT_SETTINGS.presets);
        } else {
            // 补齐到 4 个预设
            while (merged.presets.length < 4) {
                merged.presets.push({ name: (merged.language === "en" ? "Preset " : "预设") + (merged.presets.length + 1), settings: null });
            }
            // 确保每个 preset 有 name 字段
            for (let i = 0; i < merged.presets.length; i++) {
                if (!merged.presets[i]) merged.presets[i] = { name: (merged.language === "en" ? "Preset " : "预设") + (i + 1), settings: null };
                if (!merged.presets[i].name) merged.presets[i].name = (merged.language === "en" ? "Preset " : "预设") + (i + 1);
            }
        }
        if (typeof merged.selectedPreset !== "number" || merged.selectedPreset < 0 || merged.selectedPreset >= merged.presets.length) {
            merged.selectedPreset = 0;
        }

        // 兜底补全 toc 配置（新增字段兼容旧数据）
        if (!merged.toc || typeof merged.toc !== "object") merged.toc = aiiMakeDefaultTocSettings(merged.language);
        else {
            // 迁移旧版画布底色字段（bgType/bgGradient）到新结构，避免旧设置丢失
            if (merged.toc.bgMode === undefined) {
                if (merged.toc.bgType === "gradient") {
                    merged.toc.bgMode = "preset";
                    const gradMap = { g1: "light", g2: "cool", g3: "bluegray", g4: "warm" };
                    merged.toc.bgPreset = gradMap[merged.toc.bgGradient] || "light";
                } else {
                    merged.toc.bgMode = "custom";
                    merged.toc.bgCustomType = "solid";
                    merged.toc.bgCustomColor = merged.toc.bgColor || "#f7f7f7";
                }
            }
            const def = aiiMakeDefaultTocSettings(merged.language);
            for (const k of Object.keys(def)) if (merged.toc[k] === undefined) merged.toc[k] = def[k];
            aiiTocEnsureLevels(merged.toc);
            aiiTocMaterializeLevels(merged.toc);
        }
        if (!merged.tocMap || typeof merged.tocMap !== "object") merged.tocMap = {};

        merged.version = DEFAULT_SETTINGS.version;
        this.settings = merged;
    }

    async saveSettings() {
        // 设置已完全扁平化，不再按语言保存多份 rowConfigs/display
        await this.saveData(this.settings);
        // 自动保存当前设置到当前预设
        await this.saveCurrentPreset();
    }

    async saveSettingsWithoutPreset() {
        await this.saveData(this.settings);
    }

    async saveCurrentPreset() {
        const s = this.settings;
        if (s.selectedPreset >= 0 && s.selectedPreset < s.presets.length) {
            s.presets[s.selectedPreset].settings = exportSettingsForPreset(s);
            await this.saveData(s);
        }
    }

    async runAll() {
        try {
            const file = this.app.workspace.getActiveFile();
            if (!file) { new Notice(tr(this.settings.language, "noticeNoFile")); return; }
            if (file.extension !== "md") { new Notice(tr(this.settings.language, "noticeOnlyMd")); return; }

            const content = await this.app.vault.read(file);
            const stat = file.stat || { mtime: Date.now(), ctime: Date.now() };
            this.validateRowConfigs();
            const { finalContent, stats } = await this.processContent(content, stat, file);

            if (finalContent !== content) {
                await this.app.vault.modify(file, finalContent);
                new Notice(tr(this.settings.language, "noticeUpdated"));
            } else {
                new Notice(tr(this.settings.language, "noticeNoChange"));
            }
        } catch (err) {
            console.error("[article-info-inserter] runAll error:", err);
            const lang = this.settings?.language || "zh";
            new Notice((tr(lang, "noticeRunError") || "执行失败") + ": " + (err?.message || String(err)));
        }
    }

    async importLocalImages(bodyContent, file) {
        const s = this.settings;
        const insertedMap = {};
        for (let i = 1; i <= 4; i++) {
            const tag = "link_image_" + i;
            const d = s.display[tag];
            if (!d || !d.url) continue;
            const rawUrl = String(d.url).trim();
            const info = resolveImageUrlInfo(rawUrl, file, this.app);
            const label = String(d.linkName || "");
            const forceImage = d.forceImage || false;

            if (!info || info.type === "network") {
                // 网络图片/链接：直接按原 URL 插入
                const isImg = forceImage || isImageUrl(rawUrl);
                insertedMap[tag] = { url: rawUrl, isImage: isImg, label };
                continue;
            }
            if (info.type === "unknown") {
                insertedMap[tag] = { url: rawUrl, isImage: forceImage, label };
                continue;
            }

            const isImg = forceImage || isImageUrl(rawUrl);
            if (!isImg) {
                // 本地非图片链接：按原路径插入
                insertedMap[tag] = { url: rawUrl, isImage: false, label };
                continue;
            }

            // 本地图片：统一复制到 Obsidian 附件目录并按 MD5 命名
            const copied = await copyImageToVault(info, file, this.app);
            if (copied) {
                const noteRelativeUrl = vaultPathToNoteRelative(copied.relativePath, file.parent ? file.parent.path : "");
                insertedMap[tag] = { url: noteRelativeUrl, isImage: true, md5: copied.md5, label };
            } else {
                insertedMap[tag] = { url: rawUrl, isImage: true, label };
            }
        }

        // 文档结构图：若某行选中了 toc_diagram，则生成 SVG 并插入
        const usedLinkImageTags = this.getDisplayedLinkImageTags();
        if (usedLinkImageTags.has("toc_diagram")) {
            const tocHeadings = aiiParseHeadings(bodyContent);
            if (!tocHeadings || !tocHeadings.length) {
                // 正文没有标题：按设计不生成结构图，但给出提示，避免误判为失效
                new Notice(tr(this.settings.language, "noticeTocNoHeadings"));
            } else {
                const tocImg = await this.generateTocImage(bodyContent, file);
                if (tocImg) {
                    insertedMap["toc_diagram"] = { url: tocImg.url, isImage: true, md5: tocImg.md5, label: "" };
                }
            }
        }

        return { bodyContent, insertedMap };
    }

    async processContent(content, stat, file) {
        const fmRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
        const match = content.match(fmRegex);
        let yamlSection = match ? match[1] : "";
        let bodyContent = match ? content.substring(match[0].length) : content;

        const { insertedMap } = await this.importLocalImages(bodyContent, file);
        bodyContent = await this.removeOldMarker(bodyContent, file, insertedMap);
        const stats = this.calculateStats(bodyContent, stat, insertedMap);

        const markers = this.buildMarkers(stats, insertedMap);
        const finalYaml = this.updateYaml(yamlSection, stats);

        let body = bodyContent.replace(/^[\r\n]+/, "").replace(/[\s]+$/, "");
        let parts = [];
        if (markers.startText) parts.push(markers.startText);
        if (body) parts.push(body);
        if (markers.endText) parts.push(markers.endText);
        let result = parts.join("\n\n");
        if (markers.endText) result += "\n";

        const finalContent = finalYaml ? "---\n" + finalYaml + "\n---\n\n" + result : result;
        return { finalContent, stats };
    }

    async generateTocImage(bodyContent, file) {
        const s = this.settings;
        const toc = s.toc || {};
        const headings = aiiParseHeadings(bodyContent);
        if (!headings || headings.length === 0) return null;
        const noteTitle = file.basename || "";
        const id = "toc-" + (await computeMd5(file.path) || "x").slice(0, 12);
        const opts = Object.assign({}, toc, { genId: id });
        const svg = generateTocSvg(headings, opts, noteTitle);
        if (!svg) return null;
        const svgBuf = Buffer.from(svg, "utf8");
        const newMd5 = await computeMd5(svgBuf);

        const folder = resolveAttachmentFolder(aiiSafeAttachmentPath(this.app.vault), file);
        // 文件名带内容指纹：内容一变文件名就变，正文中链接随之改变。
        // 这是规避 Obsidian 图片缓存的关键——Obsidian 把图片渲染成 app://local/<路径>?<mtime>，
        // 若路径与链接都不变，笔记不会重新渲染，页面会一直显示旧的缓存图（必须重开笔记才更新）。
        const targetName = id + "-" + newMd5.slice(0, 8) + ".svg";
        const targetRelativePath = folder ? normalizePath(folder + "/" + targetName) : targetName;

        // ═══ 检测式替换（用户定义的逻辑） ═══
        // 每次执行：扫描附件文件夹中全部图片的 md5，与"最后一次成功插入"记录的 md5 完全一致的
        // 一律删除（不依赖文件名/路径，附件被重命名也能命中）；随后按当前设置重新插入，
        // 并记录新图片的 md5，供下一次比对。
        const prev = s.tocMap ? s.tocMap[file.path] : null;
        const IMG_EXT_RE = /\.(png|jpg|jpeg|gif|bmp|svg|webp|heic|jxl|avif)$/i;
        // 其它笔记仍在引用的结构图路径：内容 md5 相同时也不得删除，避免跨笔记互删
        const referencedByOthers = new Set(
            Object.entries(s.tocMap || {})
                .filter(([p]) => p !== file.path)
                .map(([, v]) => v && v.path).filter(Boolean).map(p => normalizePath(p))
        );
        const deleteByMd5Scan = async (prevMd5) => {
            if (!prevMd5) return 0;
            let removed = 0;
            try {
                const cand = this.app.vault.getFiles().filter(f =>
                    (!folder || f.path.startsWith(folder + "/")) && IMG_EXT_RE.test(f.path));
                for (const f of cand) {
                    try {
                        if (referencedByOthers.has(normalizePath(f.path))) continue;   // 被其它笔记引用的图不动
                        const buf = await this.app.vault.readBinary(f);
                        if ((await computeMd5(buf)) === prevMd5) {
                            await this.app.vault.delete(f); // vault.delete 走索引，避免 adapter.remove 留下幽灵 TFile
                            removed++;
                        }
                    } catch (e) { /* 单个文件失败不影响其余 */ }
                }
            } catch (e) {
                console.warn("[article-info-inserter] 结构图附件夹 md5 扫描失败:", e);
            }
            return removed;
        };
        // 删除上一次插入的结构图。
        // ⚠️ 性能：官方 plugin-review.md 明确点名 "Avoid iterating all files"，禁止一上来就
        //    遍历整个附件夹并逐个 readBinary。这里按代价从小到大分三级，命中即停：
        //      ① 上次记录的路径还在 → 校验内容 md5 后删除（只读 1 个文件）
        //      ② 路径失效（附件被移动/重命名）→ 按文件名家族匹配（只比对文件名，不读内容）
        //      ③ 仍找不到 → 才回退「全附件夹按内容 md5 扫描」（代价最高，仅作兜底）
        if (prev) {
            const prevPath = prev.path ? normalizePath(prev.path) : "";
            const prevMd5 = prev.md5 ? String(prev.md5).toLowerCase() : "";
            let done = false;
            // ① 路径命中：必须校验 md5 —— 该路径可能已被用户自己的图片占用，不能凭路径就删
            if (prevPath && !referencedByOthers.has(prevPath)) {
                const af = this.app.vault.getAbstractFileByPath(prevPath);
                if (af) {
                    try {
                        const buf = await this.app.vault.readBinary(af);
                        if (!prevMd5 || (await computeMd5(buf)) === prevMd5) {
                            await this.app.vault.delete(af);
                            done = true;
                        }
                    } catch (e) { /* 读/删失败 → 落到 ②③ */ }
                }
            }
            // ② 文件名家族（toc-<id>[-<md5 前 8 位>].svg）：旧数据与新版命名都能命中
            if (!done && prev.id) {
                try {
                    const famRePrev = new RegExp("^" + prev.id + "(-[0-9a-f]{8})?\\.svg$");
                    const hit = this.app.vault.getFiles().find(f =>
                        (!folder || f.path.startsWith(folder + "/"))
                        && famRePrev.test(f.path.split("/").pop())
                        && !referencedByOthers.has(normalizePath(f.path)));
                    if (hit) { await this.app.vault.delete(hit); done = true; }
                } catch (e) { /* 忽略 */ }
            }
            // ③ 兜底：全附件夹按内容 md5 扫描（仅当附件被改名/移出附件夹时才会走到这里）
            if (!done && prevMd5) await deleteByMd5Scan(prevMd5);
        }

        // 再清理本笔记结构图的其它历史文件（指纹不同的旧版本 / 旧命名 toc-<id>.svg），
        // 保证附件夹里始终只有当前这一张，不会因为 tocMap 记录丢失而堆积。
        try {
            const famRe = new RegExp("^" + id + "(-[0-9a-f]{8})?\\.svg$");
            const stale = this.app.vault.getFiles().filter(f =>
                (!folder || f.path.startsWith(folder + "/")) && famRe.test(f.path.split("/").pop()));
            for (const f of stale) await this.app.vault.delete(f);
        } catch (e) { /* 忽略 */ }

        // 写出新文件：目标路径若仍有残留（例如与上次内容不同未被扫描命中），先删再建
        const parent = targetRelativePath.split("/").slice(0, -1).join("/");
        if (parent) {
            const pf = this.app.vault.getAbstractFileByPath(parent);
            if (!pf) await this.app.vault.createFolder(parent);
        }
        const existing = this.app.vault.getAbstractFileByPath(normalizePath(targetRelativePath));
        if (existing) await this.app.vault.delete(existing);
        await this.app.vault.createBinary(targetRelativePath, svgBuf);

        // 记录本次 md5 与路径，供下次刷新删除
        if (!s.tocMap) s.tocMap = {};
        s.tocMap[file.path] = { id, md5: newMd5, path: targetRelativePath };
        try { await this.saveData(s); } catch (e) { /* 忽略 */ }

        const noteRelativeUrl = vaultPathToNoteRelative(targetRelativePath, file.parent ? file.parent.path : "");
        return { url: noteRelativeUrl, md5: newMd5, id };
    }

    async removeOldMarker(text, file, insertedMap) {
        // 本插件写入的标记：**单行完整** <div … data-aii="marker">…</div>
        // 2026-10-05 起改为「围栏感知 + 单行完整」匹配：
        //   ① 代码块 / 教程里引用的示例不再被误删（原先纯文本正则不认 ```）；
        //   ② 「有开无闭」的半个标签不再跨行吞掉中间的用户正文。
        let result = aiiStripMarkerLines(text);
        // 兼容早期可能残留的 HTML 注释标记 <!-- aii-marker-start/end -->（同样围栏感知）
        result = aiiStripLegacyCommentMarkers(result);

            // 图片/链接去重：从正文两端扫描「插件写入区块」（遇首个正文行即停），
            // 本地图按文件内容 MD5、网络图按规范化 URL、普通链接按 URL/文字，命中计划项即删整行。
            const tags = insertedMap ? Object.keys(insertedMap) : [];
            if (tags.length > 0) {
                const ext = "png|jpg|jpeg|gif|bmp|svg|webp|heic|jxl|avif";
                const md5TokenRe = new RegExp("([a-f0-9]{32})\\.(" + ext + ")", "gi");
                const markerRe2 = /data-aii=["']marker["']/;

                // 计划插入的本地图片：以文件内容 MD5 为准（用户要求"计算即将插入本地图片的 MD5"），
                // 文件名 md5 兜底；网络图片收集其规范化 URL 用于 URL 比对。
                const plannedImageMd5 = new Set();
                const plannedNetworkUrl = new Set();
                for (const tag of tags) {
                    const info = insertedMap[tag];
                    if (!info || !info.isImage) continue;
                    const url = info.url || "";
                    if (/^https?:\/\//i.test(url)) {
                        plannedNetworkUrl.add(normalizeBasicUrl(url).toLowerCase());
                        continue;
                    }
                    if (info.md5) plannedImageMd5.add(String(info.md5).toLowerCase());
                    const uMd5 = extractMd5FromFilename(url);
                    if (uMd5) plannedImageMd5.add(uMd5);
                }

                // 任一图片链接都视为区块行（本地或网络），由后续 MD5/URL 比对决定删留。
                const lineHasImage = (line) => {
                    const urls = extractImageUrls(line);
                    if (urls.length > 0) return true;
                    let m; md5TokenRe.lastIndex = 0;
                    while ((m = md5TokenRe.exec(line))) {
                        if (!/https?:\/\//i.test(line.slice(0, m.index))) return true;
                    }
                    return false;
                };
                // 某行是否是「插件写入的链接」（与计划链接的 URL/文字一致）
                const isPlannedLinkLine = (line) => {
                    const parsed = parseLinkImageLine(line);
                    if (!parsed || parsed.isImage) return false;
                    for (const tag of tags) {
                        const info = insertedMap[tag];
                        if (!info || info.isImage) continue;
                        if (parsed.url === info.url || parsed.label === info.label) return true;
                    }
                    return false;
                };
                // 某行是否属于「插件写入区块」：空行 / marker / 图片（本地或网络）/ 插件链接
                const isBlockLine = (line) =>
                    (!line || !line.trim()) || markerRe2.test(line) ||
                    lineHasImage(line) || isPlannedLinkLine(line);

                const lines = result.split("\n");
                const winIdx = new Set();
                for (let j = lines.length - 1; j >= 0; j--) {
                    if (isBlockLine(lines[j])) winIdx.add(j); else break;
                }
                for (let j = 0; j < lines.length; j++) {
                    if (isBlockLine(lines[j])) winIdx.add(j); else break;
                }

                // 计算某行本地图片的 md5（文件内容优先，命名 md5 兜底）
                const md5OfLine = async (line) => {
                    const urls = extractImageUrls(line);
                    for (const u of urls) {
                        if (/^https?:\/\//i.test(u)) continue;
                        const mm = await resolveLocalImageMd5(u, file, this.app);
                        if (mm) return mm;
                    }
                    let m; md5TokenRe.lastIndex = 0;
                    while ((m = md5TokenRe.exec(line))) {
                        if (!/https?:\/\//i.test(line.slice(0, m.index))) return m[1].toLowerCase();
                    }
                    return null;
                };

                const toRemove = new Set();
                for (const idx of winIdx) {
                    try {
                        const line = lines[idx];
                        if (!line) continue;
                        // 本地图片：按文件内容 MD5 去重
                        const mm = await md5OfLine(line);
                        if (mm && plannedImageMd5.has(mm)) { toRemove.add(idx); continue; }
                        // 网络图片：按规范化 URL 去重
                        const urls = extractImageUrls(line);
                        let netHit = false;
                        for (const u of urls) {
                            if (/^https?:\/\//i.test(u) && plannedNetworkUrl.has(normalizeBasicUrl(u).toLowerCase())) { netHit = true; break; }
                        }
                        if (netHit) { toRemove.add(idx); continue; }
                        // 非图片链接：按 URL/文字去重
                        const parsed = parseLinkImageLine(line);
                        if (parsed && !parsed.isImage) {
                            for (const tag of tags) {
                                const info = insertedMap[tag];
                                if (!info || info.isImage) continue;
                                if (parsed.url === info.url || parsed.label === info.label) { toRemove.add(idx); break; }
                            }
                        }
                    } catch (e) {
                        console.warn("[article-info-inserter] 去重单行处理失败，已跳过该行:", e);
                    }
                }

                // 跨行尖括号 Markdown 图片（格式化插件可能把长 URL 折行）：
                // 折行后组件行往往不被识别为「区块行」，上面的窗口扫描会漏掉，
                // 因此在整篇范围内补一次跨行图片匹配，命中计划项即删其整段。
                const crossHits = findAngleImageRanges(lines, 0, lines.length - 1);
                for (const hit of crossHits) {
                    try {
                        if (/^https?:\/\//i.test(hit.url)) {
                            if (plannedNetworkUrl.has(normalizeBasicUrl(hit.url).toLowerCase())) {
                                for (let k = hit.start; k <= hit.end; k++) toRemove.add(k);
                            }
                            continue;
                        }
                        const mm = await resolveLocalImageMd5(hit.url, file, this.app);
                        if (mm && plannedImageMd5.has(mm)) {
                            for (let k = hit.start; k <= hit.end; k++) toRemove.add(k);
                        }
                    } catch (e) {
                        console.warn("[article-info-inserter] 去重跨行图片处理失败，已跳过:", e);
                    }
                }

                if (toRemove.size > 0) {
                    // 发布版不打印调试信息（原先这里会输出计划插入的 md5 集合，既刷屏又涉及用户数据）
                    result = lines.filter((_, idx) => !toRemove.has(idx)).join("\n");
                }

                // 文档结构图可能位于正文任意位置（不只在头/尾），需全局去重，避免刷新重复插入。
                // 注意：必须放在窗口去重之后，否则 result 会被后续 filter 覆盖而失效。
                try {
                    const tocInfo = insertedMap ? insertedMap["toc_diagram"] : null;
                    if (tocInfo && tocInfo.isImage) {
                        const tocId = "toc-" + (await computeMd5(file.path)).slice(0, 12).toLowerCase();
                        // 按当前文件对应的 toc id 删除 Markdown 图片行（支持尖括号/无尖括号、后接 URL 参数；
                        // 兼容旧命名 toc-<id>.svg 与新的内容指纹命名 toc-<id>-<md5前8位>.svg）
                        // 2026-10-05：改为「单行 + 围栏感知」（[^)\r\n] 禁止跨行、代码块内不动），
                        // 与标记删除共用同一套规则，避免把教程里引用的图片行误删。
                        const tocLineRe = new RegExp("^[ \\t]*!\\[[^\\]]*\\]\\(<[^)\\r\\n]*" + tocId + "(-[0-9a-f]{8})?\\.svg[^)\\r\\n]*\\)>?[ \\t]*\\r?$", "i");
                        result = aiiProcessOutsideFences(result, (line) => (tocLineRe.test(line) ? "" : undefined));
                        // 方式2：按上一次实际插入的 URL 精确兜底（兼容附件路径被移动等情况）
                        if (tocInfo.url) {
                            const esc = String(tocInfo.url).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                            const urlLineRe = new RegExp("^[ \\t]*!\\[[^\\]]*\\]\\(<?" + esc + ">?\\)[ \\t]*\\r?$", "i");
                            result = aiiProcessOutsideFences(result, (line) => (urlLineRe.test(line) ? "" : undefined));
                        }
                    }
                } catch (e) {
                    console.warn("[article-info-inserter] 结构图全局去重失败:", e);
                }
            }

        result = result.replace(/^\r?\n+/, "");
        return result;
    }

    getDisplayedRows() {
        const s = this.settings;
        const idxs = [];
        for (let i = 0; i < s.prependRows; i++) idxs.push(i);
        const endStartIdx = Math.max(0, 3 - s.appendRows);
        for (let i = endStartIdx; i < 3; i++) idxs.push(3 + i);
        return idxs;
    }

    getDisplayedLinkImageTags() {
        const s = this.settings;
        const set = new Set();
        for (const idx of this.getDisplayedRows()) {
            const row = s.rowConfigs[idx];
            if (!row || !row.slots) continue;
            for (const slot of row.slots) {
                if (slot && slot.tag && tagMeta(slot.tag).isLinkImage) set.add(slot.tag);
            }
        }
        return set;
    }

    calculateStats(text, stat, insertedMap) {
        const s = this.settings;
        const ext = "png|jpg|jpeg|gif|bmp|svg|webp|heic|jxl|avif";
        const wikiImgRe = new RegExp("!\\[\\[([^\\]]+\\.(" + ext + "))(\\|[^\\]]+)?\\]\\]", "gi");
        const mdImgRe = /!\[[^\]]*\]\(([^)]+)\)/gi;
        const wikiEmbedRe = /!\[\[([^\]]+)\]\]/gi;
        const mdLinkRe = /(?<!!)\[([^\]]*?)\]\(([^)]*?)\)/g;
        const wikiLinkRe = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
        const footnoteRefRe = /\[\^[^\]]+\]/g;
        const obsCommentRe = /%%[\s\S]*?%%/g;
        const htmlCommentRe = /<!--[\s\S]*?-->/g;
        const codeBlockRe = /```[\s\S]*?```/g;
        const inlineCodeRe = /`[^`\n]+`/g;
        const htmlTagRe = /<[^>]+>/g;
        const bareUrlRe = /https?:\/\/\S+/g;
        const embedRe = /!\[\[[^\]]+\]\]/g;
        const hashtagRe = /#[^\s#]+/g;
        const latexBlockRe = /\$\$[\s\S]*?\$\$/g;
        const latexInlineRe = /\$[^$\n]+\$/g;
        const emojiRe = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;

        // 各类计数（在原始文本上操作，互不影响）
        const wikiImages = text.match(wikiImgRe) || [];
        const mdImagesRaw = text.match(mdImgRe) || [];
        function isNetworkPath(p) { return /^https?:\/\//i.test(p); }
        // 剥掉 Markdown 图片 URL 的尖括号包裹（![...](<url>)），否则扩展名判断会因末尾多出的 ">" 误判
        const stripAngle = (u) => { const mm = u.match(/^<(.+)>$/); return mm ? mm[1] : (u || ""); };

        let localImageCount = 0, networkImageCount = 0;
        const mdImages = mdImagesRaw.filter(m => {
            const url = stripAngle((m.match(/\(([^)]+)\)/) || ["", ""])[1] || "");
            const isImg = isImageUrl(url);
            if (isImg) {
                if (isNetworkPath(url)) networkImageCount++;
                else localImageCount++;
            }
            return isImg;
        });
        for (const m of wikiImages) {
            const path = (m.match(/!\[\[([^\]|]+)/) || ["", ""])[1];
            if (isNetworkPath(path)) networkImageCount++;
            else localImageCount++;
        }
        let imageCount = wikiImages.length + mdImages.length;

        // 计算“实际会写入文档”的追加图片/链接（仅显示行，隐藏行不计数）
        let appendedImageCount = 0, appendedImageLocal = 0, appendedImageNetwork = 0, appendedLinkCount = 0;
        if (insertedMap) {
            const displayed = this.getDisplayedLinkImageTags();
            for (const [tag, info] of Object.entries(insertedMap)) {
                if (!displayed.has(tag)) continue;
                if (info.isImage) {
                    appendedImageCount++;
                    if (isNetworkPath(stripAngle(info.url))) appendedImageNetwork++;
                    else appendedImageLocal++;
                } else {
                    appendedLinkCount++;
                }
            }
        }
        // 追加图片是否计入“图片数”：受“本插件追加的图片不计数”控制
        if (!s.excludeAppendedImages) {
            imageCount += appendedImageCount;
            localImageCount += appendedImageLocal;
            networkImageCount += appendedImageNetwork;
        }

        // 嵌入数：Obsidian 内部嵌入 ![[...]] 中除图片以外的内容（图片计入 image_count）
        // 防御：两个正则边界不完全一致时（如 ![[a.png|300]] 的别名写法）避免出现负数
        const allWikiEmbeds = text.match(wikiEmbedRe) || [];
        const embedCount = Math.max(0, allWikiEmbeds.length - wikiImages.length);

        // 注释
        const commentCount = (text.match(obsCommentRe) || []).length +
                             (text.match(htmlCommentRe) || []).length;

        // 脚注
        // 一致性修正：exclude* 类开关（排除注释/脚注/代码块/嵌入）语义为「字数统计时排除」，
        // 不应把统计项本身清零——否则与 comment_count / code_count / embed_count 行为矛盾。
        // （唯一例外是 excludeAppendedImages，其文案明确为「追加的图片不计数」，故影响 image_count。）
        const footnoteCount = (text.match(footnoteRefRe) || []).length;

        // 代码统计：按块数或行数
        const codeBlocks = text.match(codeBlockRe) || [];
        let codeCount = 0;
        if (s.codeCountMethod === "block") {
            codeCount = codeBlocks.length;
        } else {
            for (const block of codeBlocks) {
                codeCount += block.split(/\r?\n/).filter(l => l.trim() !== "").length;
            }
        }

        // 链接数统计：
        // 语义界定（避免开关互相干扰）：
        //   ·「排除链接不可见部分」是【字数统计】规则（外部链接排除 URL、内部链接只保留别名），
        //     不应影响“这篇文章里有几条链接”这个事实统计。
        //   ·「链接数不计入图片链接」是【链接计数】规则，独立决定图片 URL 是否算作一条链接。
        // 因此两个开关各自独立生效，不再耦合。（stripAngle 已在图片统计段定义，此处复用）

        let linkCount = 0;

        // 1) Markdown 链接 [文字](url)
        const mdLinkMatches = text.match(mdLinkRe) || [];
        for (const m of mdLinkMatches) {
            const url = stripAngle((m.match(/\(([^)]*)\)/) || ["", ""])[1]);
            if (s.linkCountExcludeImages && isImageUrl(url)) continue;
            linkCount++;
        }

        // 2) Wiki 链接 [[target]]（排除 ![[嵌入]]）
        const wikiRe = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;
        let wm;
        while ((wm = wikiRe.exec(text)) !== null) {
            if (wm.index > 0 && text[wm.index - 1] === "!") continue;
            if (s.linkCountExcludeImages && isImageUrl(wm[1])) continue;
            linkCount++;
        }

        // 3) 裸 URL：先完整剥离 Markdown / Wiki 链接结构以及 Markdown 图片结构，
        //    避免链接别名本身是 URL 时被重复计数（如 [https://a.com](https://a.com) 算成两条）。
        //    同时把图片 URL 从 ![...](<url>) / ![...](url) 中释放出来并去掉 <>/() 定界符，
        //    否则末尾带 >/) 的 URL 会让 isImageUrl 识别失败，导致「链接数不计入图片链接」开关失效。
        const linkFreeText = text
            .replace(mdLinkRe, " ")
            .replace(wikiLinkRe, " ")
            .replace(/!\[[^\]]*\]\(<([^)]+)>\)/g, " $1 ")
            .replace(/!\[[^\]]*\]\(([^)]+)\)/g, " $1 ");
        const bareUrls = linkFreeText.match(bareUrlRe) || [];
        for (const m of bareUrls) {
            if (s.linkCountExcludeImages && isImageUrl(m)) continue;
            linkCount++;
        }

        // 追加的链接（非图片）计入链接数（仅实际写入文档的显示行）
        linkCount += appendedLinkCount;
        // 追加图片计入链接数（联动）：仅当“链接数计入图片”且“图片追加计入”时
        if (!s.linkCountExcludeImages && !s.excludeAppendedImages) {
            linkCount += appendedImageCount;
        }

        // 字数统计：在副本上操作
        let countText = text;

        countText = countText.replace(wikiImgRe, "");
        countText = countText.replace(mdImgRe, "");
        if (s.excludeCodeBlocks) countText = countText.replace(codeBlockRe, "");
        if (s.excludeInlineCode) countText = countText.replace(inlineCodeRe, "");
        if (s.excludeEmbeds) countText = countText.replace(embedRe, "");
        if (s.excludeHashtags) countText = countText.replace(hashtagRe, "");
        if (s.excludeLatex) {
            countText = countText.replace(latexBlockRe, "");
            countText = countText.replace(latexInlineRe, "");
        }
        countText = countText.replace(htmlTagRe, "");
        if (s.excludeComments) {
            countText = countText.replace(obsCommentRe, "");
            countText = countText.replace(htmlCommentRe, "");
        }
        if (s.excludeFootnotes) countText = countText.replace(footnoteRefRe, "");

        if (s.excludeLinkInvisible) {
            countText = countText.replace(wikiLinkRe, "$1");
            countText = countText.replace(mdLinkRe, "$1");
            countText = countText.replace(bareUrlRe, "");
        }

        // 字符数：受"是否计入标点"(countPunctuation) 与 "是否计入换行和空格"(charCountMethod) 双重控制。
        // 标准规则：字符数默认计入标点；关闭"计入标点"时，标点在字符数中同样被剔除（与「字数」一致）。
        let charBase = countText;
        if (!s.countPunctuation) {
            charBase = charBase.replace(PUNCT_RE, "");
        }
        let charCount = 0;
        if (s.charCountMethod === "include_whitespace") {
            charCount = charBase.length;
        } else {
            charCount = charBase.replace(/\s/g, "").length;
        }

        // 字数：汉字 + 中文标点 + 英文单词/数字 + Emoji（可选）
        const chineseRegex = s.countPunctuation
            ? /[\u4e00-\u9fa5\u3000-\u303F\uFF01-\uFF60\u2014\u2026]/g
            : /[\u4e00-\u9fa5]/g;
        const chinese = (countText.match(chineseRegex) || []).length;
        const english = (countText.match(/[a-zA-Z0-9]+/g) || []).length;
        const emoji = s.countEmoji ? (countText.match(emojiRe) || []).length : 0;
        const wordCount = chinese + english + emoji;

        const readingTime = wordCount / s.readingSpeed;
        const pageCount = wordCount / s.pageSize;

        return {
            wordCount,
            characterCount: charCount,
            readingTime,
            pageCount,
            imageCount,
            localImageCount,
            networkImageCount,
            embedCount,
            commentCount,
            footnoteCount,
            codeCount,
            linkCount,
            createdDate: stat.ctime ? new Date(stat.ctime) : new Date(),
            modifiedDate: stat.mtime ? new Date(stat.mtime) : new Date()
        };
    }

    buildMarkers(stats, insertedMap) {
        const s = this.settings;
        const self = this;
        const startRows = [];
        const endRows = [];

        function fmtValue(tag, value) {
            const d = s.display[tag] || {};
            const color = d.color || "";

            if (tagMeta(tag).isLinkImage) {
                const info = insertedMap && insertedMap[tag];
                const rawUrl = info ? info.url : ((d.url || "").trim());
                if (!rawUrl) return null;
                const forceImage = d.forceImage || false;
                const label = d.linkName || "";
                const normalizedUrl = normalizeBasicUrl(rawUrl);
                // 基本净化：去除会破坏 <...> Markdown 包装或注入 HTML 的属性字符
                const safeUrl = normalizedUrl.replace(/[\r\n<>"]/g, "");
                const isImg = forceImage || isImageUrl(safeUrl) || (info && info.isImage);
                const mdLabel = label.replace(/\[/g, "\\[").replace(/\]/g, "\\]");
                const urlPart = `<${safeUrl}>`;
                const text = isImg
                    ? `![${mdLabel}](${urlPart})`
                    : (mdLabel ? `[${mdLabel}](${urlPart})` : `[${normalizedUrl}](${urlPart})`);
                return { text, isLinkImage: true, isRawMarkdown: true, color: "" };
            }

            let text = "";
            if (tag === "author") {
                text = (d.prefix || "") + (d.suffix || "");
            } else if (tagMeta(tag).isCustom) {
                text = d.text || "";
            } else {
                const pre = d.prefix || "";
                const suf = d.suffix || "";
                let v = value;
                if (tag === "reading_time") {
                    v = s.readingTimeDecimal ? value.toFixed(1) : String(Math.ceil(value) || 1);
                } else if (tag === "page_count") {
                    v = s.pageCountDecimal ? value.toFixed(1) : String(Math.ceil(value) || 1);
                } else if (tag === "created_time" || tag === "modified_time") {
                    const withClock = tag === "created_time" ? s.timeWithClockCreated : s.timeWithClockModified;
                    v = self.formatBodyDate(value, withClock);
                } else {
                    v = String(value);
                }
                text = pre + v + suf;
            }
            if (!text) return null;
            return { text, color, bold: !!d.bold, italic: !!d.italic };
        }

        function processSlot(slot) {
            if (!slot || slot.tag === "none") return null;
            const key = TAG_STATS_KEY[slot.tag];
            const val = key ? stats[key] : undefined;
            return fmtValue(slot.tag, val);
        }

        function renderPartHtml(part) {
            if (part.isLinkImage) return part.text; // 链接/图片为原生 Markdown 格式，URL 已在 fmtValue 中净化
            const raw = escapeHtml(part.text);
            if (!part.bold && !part.italic && !part.color) return raw;
            // 加粗/倾斜用语义标签；颜色用 span
            let inner = (part.bold ? "<strong>" : "") + (part.italic ? "<em>" : "") + raw + (part.italic ? "</em>" : "") + (part.bold ? "</strong>" : "");
            if (part.color) {
                const c = escapeHtml(part.color);
                return `<span style="color:${c} !important;">${inner}</span>`;
            }
            return inner;
        }

        function wrapRow(inner, row) {
            const align = row.alignment || "justify";
            const indent = Number(row.indent) || 0;
            const padding = indent > 0 ? `padding-left:${indent}em;` : "";
            return `<div style="text-align:${align};${padding}" data-aii="marker">${inner}</div>`;
        }

        function buildRow(row, targetArray) {
            if (!row) return;
            const parts = [];
            let linkImageCount = 0;
            let nonLinkImageCount = 0;
            for (const slot of row.slots) {
                const p = processSlot(slot);
                if (!p) continue;
                if (p.isLinkImage) linkImageCount++;
                else nonLinkImageCount++;
                parts.push(p);
            }
            if (parts.length === 0) return;

            if (linkImageCount > 0 && s.linkImageSingleWarning && (linkImageCount > 1 || nonLinkImageCount > 0)) {
                new Notice(tr(s.language, "noticeLinkImageOnly"));
                const first = parts.find(p => p.isLinkImage);
                targetArray.push({ html: first.text, alignment: row.alignment, indent: row.indent, isRawMarkdown: true });
                return;
            }

            const sep = s.separator || "｜";
            if (linkImageCount > 0) {
                // 链接/图片单独作为一行原生 Markdown
                for (const p of parts) {
                    if (p.isLinkImage) targetArray.push({ html: p.text, alignment: row.alignment, indent: row.indent, isRawMarkdown: true });
                }
            } else {
                const inner = parts.map(renderPartHtml).join(sep);
                targetArray.push({ html: wrapRow(inner, row), alignment: row.alignment, indent: row.indent });
            }
        }

        // 首行按正序启用
        for (let i = 0; i < s.prependRows; i++) {
            buildRow(s.rowConfigs[i], startRows);
        }
        // 尾行按倒序启用：选择 N 行时启用最后 N 个尾行（尾行3优先）
        const endStartIdx = Math.max(0, 3 - s.appendRows);
        for (let i = endStartIdx; i < 3; i++) {
            buildRow(s.rowConfigs[3 + i], endRows);
        }

        const startText = startRows.map(r => r.html).join("\n\n");
        const endText = endRows.map(r => r.html).join("\n\n");
        return { startText, endText, startRows, endRows };
    }

    formatBodyDate(date, withClock) {
        const y = date.getFullYear();
        const M = date.getMonth() + 1;
        const D = date.getDate();
        let str = y + "年" + M + "月" + D + "日";
        if (withClock !== false) {
            const h = String(date.getHours()).padStart(2, "0");
            const m = String(date.getMinutes()).padStart(2, "0");
            str += " " + h + ":" + m;
        }
        return str;
    }

    formatYamlDate(date, withClock) {
        const y = date.getFullYear();
        const M = String(date.getMonth() + 1).padStart(2, "0");
        const D = String(date.getDate()).padStart(2, "0");
        let str = y + "-" + M + "-" + D;
        if (withClock !== false) {
            const h = String(date.getHours()).padStart(2, "0");
            const m = String(date.getMinutes()).padStart(2, "0");
            const sec = String(date.getSeconds()).padStart(2, "0");
            str += " " + h + ":" + m + ":" + sec;
        }
        return str;
    }

    updateYaml(yaml, stats) {
        const s = this.settings;
        let y = yaml;

        function applyPolicy(key, policy, value) {
            if (!key) return;
            const lineRegex = new RegExp("^" + key + ":.*$", "gm");
            const hasKey = lineRegex.test(y);
            if (policy === "write") {
                const line = key + ": " + value;
                if (hasKey) y = y.replace(lineRegex, line);
                else y = y + (y.endsWith("\n") ? "" : "\n") + line + "\n";
            } else if (policy === "delete") {
                y = y.replace(lineRegex, "").replace(/^\n+/, "");
            } else if (policy === "clear") {
                if (hasKey) y = y.replace(lineRegex, key + ":");
            }
        }

        // 收集所有需要写入的属性（同一个 key 后写覆盖先写，以最后出现的 slot 为准）
        const propPolicies = {};
        function collect(rowsOffset, count) {
            for (let i = 0; i < count; i++) {
                const row = s.rowConfigs[rowsOffset + i];
                if (!row) continue;
                for (const slot of row.slots) {
                    const meta = tagMeta(slot.tag);
                    if (meta.prop && slot.propPolicy && slot.propPolicy !== "none") {
                        propPolicies[meta.prop] = { policy: slot.propPolicy, tag: slot.tag };
                    }
                }
            }
        }
        collect(0, s.prependRows);
        // 尾行倒序启用
        const endStartIdx = Math.max(0, 3 - s.appendRows);
        collect(3 + endStartIdx, s.appendRows);

        for (const [key, info] of Object.entries(propPolicies)) {
            let value = "";
            switch (info.tag) {
                case "word_count": value = stats.wordCount; break;
                case "character_count": value = stats.characterCount; break;
                case "reading_time": value = s.readingTimeDecimal ? stats.readingTime.toFixed(1) : String(Math.ceil(stats.readingTime) || 1); break;
                case "page_count": value = s.pageCountDecimal ? stats.pageCount.toFixed(1) : String(Math.ceil(stats.pageCount) || 1); break;
                case "image_count": value = stats.imageCount; break;
                case "local_image_count": value = stats.localImageCount; break;
                case "network_image_count": value = stats.networkImageCount; break;
                case "embed_count": value = stats.embedCount; break;
                case "comment_count": value = stats.commentCount; break;
                case "footnote_count": value = stats.footnoteCount; break;
                case "code_count": value = stats.codeCount; break;
                case "link_count": value = stats.linkCount; break;
                case "created_time": value = this.formatYamlDate(stats.createdDate, s.timeWithClockCreated); break;
                case "modified_time": value = this.formatYamlDate(stats.modifiedDate, s.timeWithClockModified); break;
                case "author": {
                    const d = s.display.author || {};
                    value = d.suffix || "";
                    break;
                }
                case "custom_1":
                case "custom_2":
                case "custom_3": {
                    const d = s.display[info.tag] || {};
                    value = d.text || "";
                    break;
                }
            }
            applyPolicy(key, info.policy, value);
        }

        y = y.trim();
        return y === "" ? "" : y;
    }

    validateRowConfigs() {
        const s = this.settings;
        const seenTags = new Map();
        const propPolicyMap = new Map();
        const duplicateTags = new Set();
        const conflictProps = new Set();

        function visit(rowIdx, slotIdx, slot) {
            if (!slot || slot.tag === "none") return;
            if (seenTags.has(slot.tag)) {
                duplicateTags.add(slot.tag);
            } else {
                seenTags.set(slot.tag, { rowIdx, slotIdx });
            }
            const meta = tagMeta(slot.tag);
            if (meta.prop && slot.propPolicy && slot.propPolicy !== "none") {
                if (propPolicyMap.has(meta.prop) && propPolicyMap.get(meta.prop) !== slot.propPolicy) {
                    conflictProps.add(meta.prop);
                }
                propPolicyMap.set(meta.prop, slot.propPolicy);
            }
        }

        const startCount = s.prependRows;
        const endStartIdx = Math.max(0, 3 - s.appendRows);
        for (let i = 0; i < startCount; i++) {
            const row = s.rowConfigs[i];
            if (!row) continue;
            row.slots.forEach((slot, idx) => visit(i, idx, slot));
        }
        for (let i = endStartIdx; i < 3; i++) {
            const row = s.rowConfigs[3 + i];
            if (!row) continue;
            row.slots.forEach((slot, idx) => visit(3 + i, idx, slot));
        }

        const L = (key, ...args) => fmtTr(s.language, key, ...args);
        if (duplicateTags.size > 0) {
            const names = Array.from(duplicateTags).map(t => getTagLabel(s, t)).join("、");
            new Notice(L("noticeDuplicateTag", names));
        }
        if (conflictProps.size > 0) {
            const names = Array.from(conflictProps).map(t => getTagLabel(s, t)).join("、");
            new Notice(L("noticePropConflict", names));
        }
    }
};

// ═══════════════════════════════════════════════════════════════
// 设置面板
// ═══════════════════════════════════════════════════════════════
class ArticleInfoSettingTab extends PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
        this.activeTab = "append";
    }

    buildTocTab(tabContent) {
        const self = this;
        const s = this.plugin.settings;
        const toc = s.toc;
        aiiTocEnsureLevels(toc);
        aiiTocMaterializeLevels(toc);
        const LVS = toc.levels;
        const save = async () => { await self.plugin.saveSettings(); self.refreshPreview(); };
        const L = (key) => tr(s.language, key);

        // 顶部：重置本页设置（回到当前「样式」方案的初始设置）
        const topRow = tabContent.createEl("div", { cls: "aii-display-row aii-toc-row" });
        topRow.createEl("div", { cls: "aii-display-tag", text: L("文章结构图设置") });
        const resetBtn = topRow.createEl("button", { text: L("重置本页设置"), cls: "aii-preset-btn aii-preset-reset" });
        resetBtn.style.flex = "0 0 auto";
        resetBtn.addEventListener("click", async () => {
            aiiApplyTocScheme(self.plugin.settings.toc, self.plugin.settings.toc.appliedScheme || "mindmap");
            await self.plugin.saveSettings();
            self.display();
        });

        // ── 模块卡片 + 标签|控件 成对网格（两对一行）──
        // extra(titleEl)：可选，用于在模块标题行右侧追加内容（如「恢复默认」按钮）
        const module = (title, extra) => {
            const m = tabContent.createEl("div", { cls: "aii-toc-module" });
            const tEl = m.createEl("div", { text: title, cls: "aii-toc-module-title" });
            tEl.style.display = "flex";
            tEl.style.alignItems = "center";
            tEl.style.gap = "8px";
            if (extra) extra(tEl);
            return m.createEl("div", { cls: "aii-toc-grid" });
        };
        const lab = (g, text) => g.createEl("span", { text, cls: "aii-toc-label" });
        const txt = (g, labelText, placeholder, value, onChange, span) => {
            if (labelText !== null) lab(g, labelText);
            const inp = g.createEl("input", { type: "text", value: String(value), placeholder: placeholder || "", cls: "aii-inline-text" });
            if (span) inp.style.gridColumn = "2 / -1";
            inp.addEventListener("change", async () => { await onChange(inp.value); await save(); });
            return inp;
        };
        const num = (g, labelText, placeholder, value, onChange, fallback) => {
            if (labelText !== null) lab(g, labelText);
            const inp = g.createEl("input", { type: "text", value: String(value), placeholder: placeholder || "", cls: "aii-inline-num" });
            inp.addEventListener("change", async () => { let n = Number(inp.value); if (isNaN(n)) n = fallback; await onChange(n); await save(); });
            return inp;
        };
        const sel = (g, labelText, options, value, onChange, span) => {
            if (labelText !== null) lab(g, labelText);
            const sl = g.createEl("select", { cls: "aii-inline-select" });
            for (const o of options) sl.createEl("option", { text: o[1], value: o[0] });
            sl.value = value;
            if (span) sl.style.gridColumn = "2 / -1";
            sl.addEventListener("change", async () => { await onChange(sl.value); await save(); });
            return sl;
        };
        const tog = (g, labelText, value, onChange) => {
            if (labelText !== null) lab(g, labelText);
            const cb = g.createEl("input", { type: "checkbox", cls: "aii-toc-check" });
            cb.checked = !!value;
            cb.addEventListener("change", async () => { await onChange(cb.checked); await save(); });
            return cb;
        };
        const color = (g, labelText, value, onChange) => {
            if (labelText !== null) lab(g, labelText);
            const cw = g.createEl("div", { cls: "aii-color-wrap" });
            const ci = cw.createEl("input", { type: "color", value, cls: "aii-color-input" });
            ci.addEventListener("change", async () => { await onChange(ci.value); await save(); });
            return ci;
        };
        const fmtGroup = (g, labelText, valBold, onBold, valItalic, onItalic) => {
            if (labelText !== null) lab(g, labelText);
            const fw = g.createEl("div", { cls: "aii-format-wrap" });
            const b = fw.createEl("button", { text: "B", cls: "aii-format-btn" + (valBold ? " aii-format-active" : "") });
            b.addEventListener("click", async () => { const nv = !b.classList.contains("aii-format-active"); b.classList.toggle("aii-format-active", nv); await onBold(nv); await save(); });
            const i = fw.createEl("button", { text: "I", cls: "aii-format-btn" + (valItalic ? " aii-format-active" : "") });
            i.addEventListener("click", async () => { const nv = !i.classList.contains("aii-format-active"); i.classList.toggle("aii-format-active", nv); await onItalic(nv); await save(); });
            return fw;
        };
        const disable = (el, off) => { if (!el) return; el.disabled = off; el.classList.toggle("aii-disabled", off); };

        // ═══ 总体设置 ═══
        let g = module(L("总体设置"));

        const NUM2_STYLE = "width:34px;flex:0 0 34px;min-width:0;text-align:center;";  // 约 2.5 个数字宽（用户 2026-10-03）

        // 行1：排列方向 · 起始角度 · 偏移角（仅放射状可用）
        const genRow = g.createEl("div", { cls: "aii-toc-inline-row", attr: { style: "grid-column: 1 / -1;" }});
        genRow.createEl("span", { text: L("排列方向"), cls: "aii-toc-lead-label" });
        const layoutSel = genRow.createEl("select", { cls: "aii-inline-select", attr: { style: "width:auto;flex:0 1 auto;min-width:0;" } });
        [["horizontal", L("横向排布")], ["vertical", L("纵向排布")], ["radial", L("放射状")]].forEach(([v, t]) => layoutSel.createEl("option", { text: t, value: v }));
        layoutSel.value = toc.layout || "horizontal";
        layoutSel.addEventListener("change", async () => { toc.layout = layoutSel.value; await save(); self.display(); });   // 重绘：对齐/位置行需按布局启用或置灰
        genRow.createEl("span", { text: "·", cls: "aii-toc-sep" });
        const isRadial = (toc.layout || "horizontal") === "radial";
        const pairStartDeg = genRow.createEl("div", { cls: "aii-toc-pair" });
        pairStartDeg.createEl("span", { text: L("起始角度"), cls: "aii-toc-pair-label", attr: { title: L("仅对第一个一级标题生效；0 = 正上方，顺时针递增（仅放射状）") } });
        const startDegInp = pairStartDeg.createEl("input", { type: "text", value: String(toc.radialStartAngle != null ? toc.radialStartAngle : 0), placeholder: "0", cls: "aii-inline-num aii-toc-pair-num", attr: { id: "aii-toc-startdeg", style: NUM2_STYLE }});
        startDegInp.addEventListener("change", async () => { let n = Number(startDegInp.value); toc.radialStartAngle = isNaN(n) ? 0 : ((n % 360) + 360) % 360; await save(); });
        genRow.createEl("span", { text: "·", cls: "aii-toc-sep" });
        const pairOffDeg = genRow.createEl("div", { cls: "aii-toc-pair" });
        pairOffDeg.createEl("span", { text: L("偏移角"), cls: "aii-toc-pair-label", attr: { title: L("相邻同级标题之间的角度间隔；0 = 按标题数量自动均分 360°（仅放射状）") } });
        const offDegInp = pairOffDeg.createEl("input", { type: "text", value: String(toc.radialOffsetAngle != null ? toc.radialOffsetAngle : 0), placeholder: "0", cls: "aii-inline-num aii-toc-pair-num", attr: { id: "aii-toc-offdeg", style: NUM2_STYLE }});
        offDegInp.addEventListener("change", async () => { let n = Number(offDegInp.value); toc.radialOffsetAngle = isNaN(n) ? 0 : ((n % 360) + 360) % 360; await save(); });
        if (!isRadial) {
            [startDegInp, offDegInp].forEach(el => disable(el, true));
            genRow.createEl("span", { text: L("（仅放射状）"), cls: "aii-toc-pair-label" });
        }

        // 行2：表头名称 · 渲染范围（全部标题 | 范围 [起] 到 [止] 章）
        const rangeRow = g.createEl("div", { cls: "aii-toc-inline-row", attr: { style: "grid-column: 1 / -1;" }});
        rangeRow.createEl("span", { text: L("表头名称"), cls: "aii-toc-lead-label" });
        const titleInp = rangeRow.createEl("input", { type: "text", value: String(toc.title), placeholder: L("文档结构"), cls: "aii-inline-text", attr: { style: "flex:1 1 100px;min-width:0;" }});
        titleInp.addEventListener("change", async () => { toc.title = titleInp.value.trim(); await save(); });
        rangeRow.createEl("span", { text: "·", cls: "aii-toc-sep" });
        rangeRow.createEl("span", { text: L("渲染范围"), cls: "aii-toc-inline-group-label" });
        const pairAll = rangeRow.createEl("div", { cls: "aii-toc-pair" });
        const rangeAllCb = pairAll.createEl("input", { type: "radio", name: "aii-toc-range", value: "all", cls: "aii-toc-radio", attr: { id: "aii-toc-range-all" }});
        pairAll.createEl("label", { text: L("全部标题"), cls: "aii-toc-pair-label", attr: { for: "aii-toc-range-all" }});
        rangeRow.createEl("span", { text: "|", cls: "aii-toc-sep" });
        const pairRange = rangeRow.createEl("div", { cls: "aii-toc-pair" });
        const rangeRangeCb = pairRange.createEl("input", { type: "radio", name: "aii-toc-range", value: "range", cls: "aii-toc-radio", attr: { id: "aii-toc-range-range" }});
        pairRange.createEl("label", { text: L("范围"), cls: "aii-toc-pair-label", attr: { for: "aii-toc-range-range" }});
        const startInp = pairRange.createEl("input", { type: "text", value: String(toc.rangeStart), placeholder: "1", cls: "aii-inline-num aii-toc-pair-num", attr: { id: "aii-toc-range-start", style: NUM2_STYLE }});
        pairRange.createEl("span", { text: L("到"), cls: "aii-toc-pair-label" });
        const endInp = pairRange.createEl("input", { type: "text", value: String(toc.rangeEnd), placeholder: "0", cls: "aii-inline-num aii-toc-pair-num", attr: { id: "aii-toc-range-end", style: NUM2_STYLE }});
        pairRange.createEl("span", { text: L("章"), cls: "aii-toc-pair-label" });
        const syncRange = () => {
            const all = toc.rangeMode === "all";
            rangeAllCb.checked = all;
            rangeRangeCb.checked = !all;
            disable(startInp, all);
            disable(endInp, all);
        };
        rangeAllCb.addEventListener("change", async () => { if (rangeAllCb.checked) { toc.rangeMode = "all"; await save(); syncRange(); }});
        rangeRangeCb.addEventListener("change", async () => { if (rangeRangeCb.checked) { toc.rangeMode = "range"; await save(); syncRange(); }});
        startInp.addEventListener("change", async () => { let n = Number(startInp.value); if (isNaN(n) || n < 1) n = 1; toc.rangeStart = n; toc.rangeMode = "range"; await save(); syncRange(); });
        endInp.addEventListener("change", async () => { let n = Number(endInp.value); toc.rangeEnd = isNaN(n) ? 0 : n; toc.rangeMode = "range"; await save(); syncRange(); });
        syncRange();

        // 画布尺寸：宽度 · 高度 · 边距（原「画布设置」模块并入）
        const sizeRow = g.createEl("div", { cls: "aii-toc-inline-row", attr: { style: "grid-column: 1 / -1;" }});
        sizeRow.createEl("span", { text: L("画布尺寸"), cls: "aii-toc-inline-group-label" });
        const pairW = sizeRow.createEl("div", { cls: "aii-toc-pair" });
        pairW.createEl("span", { text: L("宽度"), cls: "aii-toc-pair-label" });
        const widthInp = pairW.createEl("input", { type: "text", value: String(toc.width), placeholder: "0", cls: "aii-inline-num aii-toc-pair-num", attr: { id: "aii-toc-width" }});
        widthInp.addEventListener("change", async () => { let n = Number(widthInp.value); toc.width = isNaN(n) ? 0 : n; await save(); });
        sizeRow.createEl("span", { text: "·", cls: "aii-toc-sep" });
        const pairH = sizeRow.createEl("div", { cls: "aii-toc-pair" });
        pairH.createEl("span", { text: L("高度"), cls: "aii-toc-pair-label" });
        const heightInp = pairH.createEl("input", { type: "text", value: String(toc.height), placeholder: "0", cls: "aii-inline-num aii-toc-pair-num", attr: { id: "aii-toc-height" }});
        heightInp.addEventListener("change", async () => { let n = Number(heightInp.value); toc.height = isNaN(n) ? 0 : n; await save(); });
        sizeRow.createEl("span", { text: "·", cls: "aii-toc-sep" });
        const pairM = sizeRow.createEl("div", { cls: "aii-toc-pair" });
        pairM.createEl("span", { text: L("边距"), cls: "aii-toc-pair-label" });
        const marginInp = pairM.createEl("input", { type: "text", value: String(toc.margin), placeholder: "18", cls: "aii-inline-num aii-toc-pair-num", attr: { id: "aii-toc-margin" }});
        marginInp.addEventListener("change", async () => { let n = Number(marginInp.value); toc.margin = isNaN(n) ? 18 : Math.max(0, n); await save(); });

        // 布局间距：层级间距 / 行间距 / 文字行高（Mindmap NextGen 同类参数）
        const gapRow = g.createEl("div", { cls: "aii-toc-inline-row", attr: { style: "grid-column: 1 / -1;" }});
        gapRow.createEl("span", { text: L("布局间距"), cls: "aii-toc-inline-group-label" });
        const pairGX = gapRow.createEl("div", { cls: "aii-toc-pair" });
        pairGX.createEl("span", { text: L("层级"), cls: "aii-toc-pair-label" });
        const gapXInp = pairGX.createEl("input", { type: "text", value: String(toc.gapX != null ? toc.gapX : 32), placeholder: "32", cls: "aii-inline-num aii-toc-pair-num", attr: { id: "aii-toc-gapx" }});
        gapRow.createEl("span", { text: "·", cls: "aii-toc-sep" });
        const pairGY = gapRow.createEl("div", { cls: "aii-toc-pair" });
        pairGY.createEl("span", { text: L("行距"), cls: "aii-toc-pair-label" });
        const gapYInp = pairGY.createEl("input", { type: "text", value: String(toc.gapY != null ? toc.gapY : 18), placeholder: "18", cls: "aii-inline-num aii-toc-pair-num", attr: { id: "aii-toc-gapy" }});
        gapRow.createEl("span", { text: "·", cls: "aii-toc-sep" });
        const pairLH = gapRow.createEl("div", { cls: "aii-toc-pair" });
        pairLH.createEl("span", { text: L("行高"), cls: "aii-toc-pair-label" });
        const lhInp = pairLH.createEl("input", { type: "text", value: String(toc.lineHeight != null ? toc.lineHeight : 1.35), placeholder: "1.35", cls: "aii-inline-num aii-toc-pair-num", attr: { id: "aii-toc-lineheight" }});
        gapXInp.addEventListener("change", async () => { let n = Number(gapXInp.value); toc.gapX = isNaN(n) ? 32 : Math.max(10, n); await save(); });
        gapYInp.addEventListener("change", async () => { let n = Number(gapYInp.value); toc.gapY = isNaN(n) ? 18 : Math.max(4, n); await save(); });
        lhInp.addEventListener("change", async () => { let n = Number(lhInp.value); toc.lineHeight = isNaN(n) ? 1.35 : Math.max(1, n); await save(); });

        // ═══ 全局样式（按自定义样式同构分组：底纹 / 下级连线 / 节点框 / 文字）═══
        // 联动语义（2026-09-29 晚用户定稿）：全局改动**无条件覆盖**每级同名字段；
        // 自定义改动后实际显示优先按自定义值（渲染端读每级值），直到下次全局改动再被覆盖
        // —— 样式的最终决定权在自定义选项的当前值。
        const applyGlobalToLevels = (field, newVal) => {
            toc[field] = newVal;
            for (const k of ["title", "1", "2", "3", "4"]) {
                const l = toc.levels && toc.levels[k];
                if (l) l[field] = newVal;
            }
        };
        // 全局改动后保存并重绘设置页：每级矩阵同步显示新值（联动可见）
        const saveRedraw = async () => { await save(); self.display(); };
        // 「反向色轮」= 彩虹色轮 + 方向「反」，属重复项，已删除（2026-10-03）——
        // 旧配置里的 rainbowrev 由 loadSettings 一次性迁移为 rainbow + dir=rev。
        const VARI_OPTS = [
            ["off", L("不变色")],
            ["shades", L("深浅渐变")],
            ["analogous", L("邻近色环")],
            ["complement", L("互补对照")],
            ["contrast", L("反差色")],
            ["triad", L("三角色环")],
            ["rainbow", L("彩虹色轮")]
        ];
        const VARI_DIM_OPTS = [
            ["level", L("按层级")],
            ["chapter", L("按章节")]
        ];
        // 字体清单（全局字体下拉与矩阵「字体」下拉共用）
        const fontFamilies = [
            ["Microsoft YaHei", L("微软雅黑")],
            ["DengXian", L("等线")],
            ["Source Han Sans SC", L("思源黑体")],
            ["Source Han Serif SC", L("思源宋体")],
            ["Noto Sans CJK SC", "Noto Sans CJK SC"],
            ["PingFang SC", L("苹方")],
            ["SimHei", L("黑体")],
            ["SimSun", L("宋体")],
            ["STHeiti", L("华文黑体")],
            ["STSong", L("华文宋体")],
            ["Arial", "Arial"],
            ["Georgia", "Georgia"],
            ["Times New Roman", "Times New Roman"],
            ["sans-serif", L("无衬线")],
            ["serif", L("衬线")],
            ["custom", L("自定义...")]
        ];
        // 底纹预设纯色（自定义颜色输入框初值用）
        const presetSolidsMap = { white: "#ffffff", beige: "#F5F0E6", dark: "#1a1a1a" };
        const curBgColor = () => toc.bgMode === "custom" ? (toc.bgCustomColor || "#ffffff") : (presetSolidsMap[toc.bgPreset] || "#f7f7f7");

        // ── 全局 = 自定义矩阵每一项的批量入口 ──
        // MOD_GROUPS 列出各模块在全局样式中暴露的全部设置（与「自定义样式」矩阵逐行对应），
        // 供各分节「恢复默认」按钮使用；列全才能保证"一项都能在全局一次设好"。
        const MOD_GROUPS = {
            bg: ["bgMode", "bgPreset", "bgCustomColor", "bgCustomType", "bgCustomGradient", "bgGradientType", "bgGradientAngle", "bgGradientStrength", "bgGradientReverse"],
            line: ["lineShape", "lineWidth", "arcAngle", "lineColor", "lineColorVari", "lineColorVariDim", "lineColorVariStrength", "lineColorVariDir"],
            box: ["boxShape", "boxStrokeWidth", "boxColor", "boxStrokeColor", "boxColorVari", "boxColorVariDim", "boxColorVariStrength", "boxColorVariDir",
                  "levelAlignment", "textOnLine", "boxWidthMode", "avoidSecondary", "showSequence", "nodeDots", "dotSize"],
            text: ["textColor", "fontSize", "wrapMode", "boxMaxChars", "fontFamily", "textBold", "textItalic",
                   "headerFontFamily", "headerFontSize", "headerTextColor", "headerBold", "headerItalic", "headerWrapMode", "headerMaxChars"]
        };
        // 全局字段 → 每级字段名（值语义相同、仅改名者）
        const G2L = { arcAngle: "lineArc", textOnLine: "boxPosition", levelAlignment: "align" };
        const LV_KEYS = ["title", "1", "2", "3", "4"];
        const deformOfBI = () => (toc.textBold && toc.textItalic) ? "bolditalic" : (toc.textBold ? "bold" : (toc.textItalic ? "italic" : "normal"));
        // 写全局值 + 无条件覆盖每级同义字段（每级没有该字段的自动跳过）
        const setGlobal = (field, val) => {
            toc[field] = val;
            const lf = G2L[field] || field;
            for (const k of LV_KEYS) { const l = toc.levels && toc.levels[k]; if (l && l[lf] !== undefined) l[lf] = val; }
        };
        // 把「布尔型」全局开关同步到每级的三态字段
        const setGlobalDots = (on) => { toc.nodeDots = on; for (const k of LV_KEYS) toc.levels[k].dotStyle = on ? "solid" : "none"; };
        const setGlobalSeq = (on) => { toc.showSequence = on; for (const k of LV_KEYS) toc.levels[k].sequence = on ? "on" : "off"; };
        // 恢复默认：把该模块的设置回到「当前方案」的初始值，并覆盖每级
        const resetModule = async (fields) => {
            const key = toc.appliedScheme || "mindmap";
            const base = aiiMakeDefaultTocSettings(s.language);
            base.lineColorVari = "off"; base.boxColorVari = "off";
            Object.assign(base, AII_TOC_SCHEMES[key] || {});
            for (const f of fields) {
                if (base[f] === undefined) continue;
                const v = base[f];
                if (f === "showSequence") setGlobalSeq(!!v);
                else if (f === "nodeDots") setGlobalDots(v !== false);
                else if (f === "avoidSecondary") { toc[f] = v !== false; for (const k of LV_KEYS) toc.levels[k].avoidSecondary = v !== false; }
                else setGlobal(f, v);
            }
            const d = deformOfBI();
            for (const k of LV_KEYS) toc.levels[k].fontDeform = d;
            aiiNormalizeBg(toc);   // 底纹恢复默认后可能是 preset+white → 归一为「单色」（否则颜色选择器被禁用）
            aiiDeriveLevelColors(toc);
            await saveRedraw();
        };
        // 模块/分节的「恢复默认」：小图标按钮（↺），尺寸统一、紧跟标题
        const mkResetBtn = (host, fields) => {
            const b = host.createEl("button", { cls: "aii-toc-mini-btn", attr: { title: L("恢复默认"), "aria-label": L("恢复默认") } });
            b.createEl("span", { text: "↺", attr: { style: "pointer-events:none;" } });
            b.addEventListener("click", () => resetModule(fields));
            return b;
        };
        // 分节标题（接近黑的深灰）+ 该模块的「恢复默认」
        const gSecTitle = (text, fields) => {
            const row = g.createEl("div", { cls: "aii-toc-inline-row", attr: { style: "grid-column: 1 / -1;flex-wrap:nowrap;gap:8px;" } });
            row.createEl("span", { text, cls: "aii-toc-sectitle" });
            if (fields) mkResetBtn(row, fields);
            return row;
        };
        // 模块标题右侧「恢复默认」= 整个全局样式模块（底纹+连线+框+文字）回到当前方案初始值
        g = module(L("全局样式"), (t) => mkResetBtn(t, MOD_GROUPS.bg.concat(MOD_GROUPS.line, MOD_GROUPS.box, MOD_GROUPS.text)));

        // 底纹方案（整体底纹，大范围设置置顶）：单行紧凑布局；单色（可自定义）+ 预设渐变 + 自定义-渐变
        const bgRow = g.createEl("div", { cls: "aii-toc-inline-row", attr: { style: "grid-column: 1 / -1;flex-wrap:nowrap;gap:6px;" }});
        bgRow.createEl("span", { text: L("底纹方案"), cls: "aii-toc-inline-group-label", attr: { style: "flex:0 0 auto;" } });
        bgRow.createEl("span", { text: L("背景"), cls: "aii-toc-lead-label", attr: { style: "flex:0 0 auto;" } });
        const bgTypeSel = bgRow.createEl("select", { cls: "aii-inline-select", attr: { style: "width:auto;flex:0 1 auto;min-width:0;" }});
        // 单色（三大纯色预设合并而来，颜色可自定义，默认白底）+ 预设渐变 + 自定义-渐变
        [
            ["solid", L("单色")],
            ["warm", L("暖橙渐变")], ["cool", L("紫蓝渐变")], ["bluegray", L("蓝灰渐变")], ["light", L("浅灰渐变")],
            ["gradient", L("自定义-渐变")]
        ].forEach(([v, t]) => bgTypeSel.createEl("option", { text: t, value: v }));
        const BG_GRAD_PRESETS = ["warm", "cool", "bluegray", "light"];
        const curBgKey = () => {
            if (toc.bgMode === "custom") return toc.bgCustomType === "gradient" ? "gradient" : "solid";
            return BG_GRAD_PRESETS.indexOf(toc.bgPreset) >= 0 ? toc.bgPreset : "solid";
        };
        bgTypeSel.value = curBgKey();
        bgTypeSel.addEventListener("change", async () => {
            const v = bgTypeSel.value;
            if (v === "solid") {                        // 单色：默认白底，颜色用右侧色点自定义
                toc.bgMode = "custom"; toc.bgCustomType = "solid";
                if (!toc.bgCustomColor) toc.bgCustomColor = "#ffffff";
            } else if (v === "gradient") {              // 自定义-渐变
                toc.bgMode = "custom"; toc.bgCustomType = "gradient";
            } else {                                    // 预设渐变
                toc.bgMode = "preset"; toc.bgPreset = v;
            }
            await saveRedraw();
        });
        const bgCw = bgRow.createEl("div", { cls: "aii-color-wrap", attr: { style: "flex:0 0 auto;" } });
        const bgCi = bgCw.createEl("input", { type: "color", value: curBgColor(), cls: "aii-color-input" });
        bgCi.addEventListener("change", async () => { toc.bgMode = "custom"; toc.bgCustomColor = bgCi.value; await saveRedraw(); });
        bgRow.createEl("span", { text: "·", cls: "aii-toc-sep", attr: { style: "flex:0 0 auto;" } });
        bgRow.createEl("span", { text: L("渐变"), cls: "aii-toc-pair-label", attr: { style: "flex:0 0 auto;" } });
        const gradPair = bgRow.createEl("div", { cls: "aii-toc-pair", attr: { style: "gap:3px;flex:0 1 auto;min-width:0;" }});
        const bgVarSel = gradPair.createEl("select", { cls: "aii-inline-select aii-toc-pair-sel", attr: { id: "aii-toc-bgvar", style: "width:auto;min-width:0;" }});
        [["light", L("浅色(提亮)")], ["dark", L("深色(压暗)")]].forEach(([v, t]) => bgVarSel.createEl("option", { text: t, value: v }));
        bgVarSel.value = toc.bgCustomGradient;
        bgVarSel.addEventListener("change", async () => { toc.bgMode = "custom"; toc.bgCustomType = "gradient"; toc.bgCustomGradient = bgVarSel.value; await save(); });
        const bgDirSel = gradPair.createEl("select", { cls: "aii-inline-select aii-toc-pair-sel", attr: { id: "aii-toc-bgdir", style: "width:auto;min-width:0;" }});
        [["linear", L("线性")], ["radial", L("径向")]].forEach(([v, t]) => bgDirSel.createEl("option", { text: t, value: v }));
        bgDirSel.value = toc.bgGradientType;
        bgDirSel.addEventListener("change", async () => { toc.bgMode = "custom"; toc.bgCustomType = "gradient"; toc.bgGradientType = bgDirSel.value; await save(); syncBgUi(); });
        const bgStrSel = gradPair.createEl("select", { cls: "aii-inline-select aii-toc-pair-sel", attr: { id: "aii-toc-bgstrength", style: "width:auto;min-width:0;" }});
        [["strong", L("强")], ["mid", L("中")], ["weak", L("弱")]].forEach(([v, t]) => bgStrSel.createEl("option", { text: t, value: v }));
        bgStrSel.value = toc.bgGradientStrength || "mid";
        bgStrSel.addEventListener("change", async () => { toc.bgMode = "custom"; toc.bgCustomType = "gradient"; toc.bgGradientStrength = bgStrSel.value; await save(); });
        bgRow.createEl("span", { text: "·", cls: "aii-toc-sep", attr: { style: "flex:0 0 auto;" } });
        bgRow.createEl("span", { text: L("角度"), cls: "aii-toc-pair-label", attr: { style: "flex:0 0 auto;" } });
        const bgAngleInp = bgRow.createEl("input", { type: "text", value: String(toc.bgGradientAngle), placeholder: "180", cls: "aii-inline-num aii-toc-pair-num", attr: { id: "aii-toc-bgangle", style: NUM2_STYLE + "flex:0 0 auto;" }});
        bgAngleInp.addEventListener("change", async () => { let n = Number(bgAngleInp.value); toc.bgMode = "custom"; toc.bgCustomType = "gradient"; toc.bgGradientAngle = Math.max(0, Math.min(360, isNaN(n) ? 180 : n)); await save(); });
        // 方向（正/反）：渐变首尾色对调；「单色」时无可变色，控件置灰
        bgRow.createEl("span", { text: "·", cls: "aii-toc-sep", attr: { style: "flex:0 0 auto;" } });
        bgRow.createEl("span", { text: L("方向"), cls: "aii-toc-pair-label", attr: { style: "flex:0 0 auto;", title: L("渐变方向：正=按当前角度/深浅，反=首尾色对调；「单色」无法变色") } });
        const bgRevSel = bgRow.createEl("select", { cls: "aii-inline-select aii-toc-pair-sel", attr: { id: "aii-toc-bgrev", style: "width:auto;min-width:0;" }});
        [["fwd", L("正")], ["rev", L("反")]].forEach(([v, t]) => bgRevSel.createEl("option", { text: t, value: v }));
        bgRevSel.value = toc.bgGradientReverse ? "rev" : "fwd";
        bgRevSel.addEventListener("change", async () => { toc.bgGradientReverse = bgRevSel.value === "rev"; await saveRedraw(); });

        const syncBgUi = () => {
            const custom = toc.bgMode === "custom";
            const isG = custom && toc.bgCustomType === "gradient";
            // 「方向」对**预设渐变**同样有效（暖橙/紫蓝/蓝灰/浅灰），只有「单色」无渐变可反向
            const isGrad = isG || (!custom && BG_GRAD_PRESETS.indexOf(toc.bgPreset) >= 0);
            bgTypeSel.value = curBgKey();
            disable(bgCi, !custom);          // 预设渐变时颜色不可改；「单色」/「自定义-渐变」可改
            disable(bgVarSel, !isG);
            disable(bgDirSel, !isG);
            disable(bgStrSel, !isG);
            disable(bgRevSel, !isGrad);
            disable(bgAngleInp, !isG || toc.bgGradientType !== "linear");
        };
        syncBgUi();

        // 全局基准色（连线色/框底色/描边色）：改动后按「基准色 + 变色规则」重新派生每级颜色
        const gColor = (row, label, field) => {
            row.createEl("span", { text: label, cls: "aii-toc-lead-label" });
            const cw = row.createEl("div", { cls: "aii-color-wrap" });
            const ci = cw.createEl("input", { type: "color", value: toc[field] || "#000000", cls: "aii-color-input" });
            ci.addEventListener("change", async () => {
                toc[field] = ci.value;
                aiiDeriveLevelColors(toc);
                await saveRedraw();
            });
        };
        // 变色规则（方案/维度/强度）：并入颜色所在行（同为"颜色"控制），改动后同步派生各级颜色
        const mkVariInline = (row, leadLabel, modeField, dimField, strField, dirField) => {
            row.createEl("span", { text: leadLabel, cls: "aii-toc-lead-label" });
            row.createEl("span", { text: L("方案"), cls: "aii-toc-pair-label" });
            const modeSel = row.createEl("select", { cls: "aii-inline-select", attr: { style: "width:auto;flex:0 1 auto;min-width:0;" } });
            VARI_OPTS.forEach(([v, t]) => modeSel.createEl("option", { text: t, value: v }));
            modeSel.value = toc[modeField] || "off";
            modeSel.addEventListener("change", async () => { toc[modeField] = modeSel.value; aiiDeriveLevelColors(toc); await saveRedraw(); });
            row.createEl("span", { text: "·", cls: "aii-toc-sep" });
            row.createEl("span", { text: L("维度"), cls: "aii-toc-pair-label", attr: { title: L("按层级=同级颜色不变、不同级变色；按章节=同层级内各章节也依次变色") } });
            const dimSel = row.createEl("select", { cls: "aii-inline-select", attr: { style: "width:auto;flex:0 1 auto;min-width:0;" } });
            VARI_DIM_OPTS.forEach(([v, t]) => dimSel.createEl("option", { text: t, value: v }));
            dimSel.value = toc[dimField] || "level";
            dimSel.addEventListener("change", async () => { toc[dimField] = dimSel.value; aiiDeriveLevelColors(toc); await saveRedraw(); });
            row.createEl("span", { text: "·", cls: "aii-toc-sep" });
            row.createEl("span", { text: L("强度"), cls: "aii-toc-pair-label", attr: { title: L("0~10：0=与基准色相同，10=剧烈变化") } });
            const strInp = row.createEl("input", { type: "text", value: String(toc[strField] != null ? toc[strField] : 5), placeholder: "5", cls: "aii-inline-num aii-toc-pair-num", attr: { style: NUM2_STYLE } });
            strInp.addEventListener("change", async () => { let n = Number(strInp.value); toc[strField] = isNaN(n) ? 5 : Math.max(0, Math.min(10, Math.round(n))); aiiDeriveLevelColors(toc); await saveRedraw(); });
            // 方向（正/反）：同一方案的反向变化（彩虹→反向色轮、深浅→由浅到深…）；「不变色」时无意义
            row.createEl("span", { text: "·", cls: "aii-toc-sep" });
            row.createEl("span", { text: L("方向"), cls: "aii-toc-pair-label", attr: { title: L("该变色方案的反向变化：彩虹→反向色轮、深浅→由浅到深；「不变色」时无效") } });
            const dirSel = row.createEl("select", { cls: "aii-inline-select", attr: { style: "width:auto;flex:0 1 auto;min-width:0;" } });
            [["fwd", L("正")], ["rev", L("反")]].forEach(([v, t]) => dirSel.createEl("option", { text: t, value: v }));
            dirSel.value = toc[dirField] === "rev" ? "rev" : "fwd";
            disable(dirSel, (toc[modeField] || "off") === "off");   // 「不变色」时方向无意义 → 置灰
            dirSel.addEventListener("change", async () => { toc[dirField] = dirSel.value; aiiDeriveLevelColors(toc); await saveRedraw(); });
        };
        // （MOD_GROUPS / setGlobal / resetModule / mkResetBtn / gSecTitle 已上移至模块创建之前）

        // ── 下级连线（本级连向下级的线）── 线型/粗细/弧度 · 连线色 + 变色规则（颜色一组，合并一行）
        gSecTitle(L("下级连线（本级连向下级的线）"), MOD_GROUPS.line);
        const lineTypeRow = g.createEl("div", { cls: "aii-toc-inline-row", attr: { style: "grid-column: 1 / -1;flex-wrap:nowrap;" }});
        lineTypeRow.createEl("span", { text: L("连线线型"), cls: "aii-toc-inline-group-label" });
        const gLineShapeSel = lineTypeRow.createEl("select", { cls: "aii-inline-select", attr: { style: "width:auto;flex:0 1 auto;min-width:0;" } });
        [["arc", L("曲线")], ["rightangle", L("直线")]].forEach(([v, t]) => gLineShapeSel.createEl("option", { text: t, value: v }));
        gLineShapeSel.value = (toc.lineShape === "auto" ? "arc" : (toc.lineShape || "arc"));
        gLineShapeSel.addEventListener("change", async () => { setGlobal("lineShape", gLineShapeSel.value); await saveRedraw(); });
        lineTypeRow.createEl("span", { text: "·", cls: "aii-toc-sep" });
        lineTypeRow.createEl("span", { text: L("粗细"), cls: "aii-toc-pair-label" });
        const gLineWidthInp = lineTypeRow.createEl("input", { type: "text", value: String(toc.lineWidth), placeholder: "1", cls: "aii-inline-num aii-toc-pair-num", attr: { style: NUM2_STYLE } });
        gLineWidthInp.addEventListener("change", async () => { let n = Number(gLineWidthInp.value); if (isNaN(n) || n <= 0) n = 1; setGlobal("lineWidth", n); await saveRedraw(); });
        lineTypeRow.createEl("span", { text: "·", cls: "aii-toc-sep" });
        lineTypeRow.createEl("span", { text: L("弧度"), cls: "aii-toc-pair-label", attr: { title: L("曲线转角锐利度 0~10：0=直线，7.5=转角锐利，10=最锐；选「直线」时不生效") } });
        const gArcInp = lineTypeRow.createEl("input", { type: "text", value: String(toc.arcAngle), placeholder: "7.5", cls: "aii-inline-num aii-toc-pair-num", attr: { style: NUM2_STYLE } });
        gArcInp.addEventListener("change", async () => {
            let n = Number(gArcInp.value); if (isNaN(n)) n = 7.5; n = Math.max(0, Math.min(10, n));
            setGlobal("arcAngle", n);   // 同步每级 lineArc
            await saveRedraw();
        });
        // 连线色 + 连线变色（同为颜色控制，合并一行）：全局连线色 = 一级引出线的基准色
        const gLineColorRow = g.createEl("div", { cls: "aii-toc-inline-row", attr: { style: "grid-column: 1 / -1;flex-wrap:nowrap;" }});
        gColor(gLineColorRow, L("连线色"), "lineColor");
        gLineColorRow.createEl("span", { text: "·", cls: "aii-toc-sep" });
        mkVariInline(gLineColorRow, L("变色"), "lineColorVari", "lineColorVariDim", "lineColorVariStrength", "lineColorVariDir");

        // ── 节点框 ── 形状/粗细 · 框底色/描边色 + 变色规则 · 对齐位置/宽度/避让/序号/连接点
        gSecTitle(L("节点框"), MOD_GROUPS.box);
        const shapeRow = g.createEl("div", { cls: "aii-toc-inline-row", attr: { style: "grid-column: 1 / -1;" }});
        shapeRow.createEl("span", { text: L("框线方案"), cls: "aii-toc-inline-group-label" });
        shapeRow.createEl("span", { text: L("节点框形状"), cls: "aii-toc-lead-label" });
        const shapeSel = shapeRow.createEl("select", { cls: "aii-inline-select", attr: { style: "width:auto;flex:0 1 auto;min-width:0;" } });
        [["underline", L("下划线")], ["rect", L("矩形")], ["rounded", L("圆角矩形")], ["capsule", L("胶囊")], ["none", L("无底纹")]].forEach(([v, t]) => shapeSel.createEl("option", { text: t, value: v }));
        shapeSel.value = toc.boxShape || "underline";
        shapeSel.addEventListener("change", async () => { applyGlobalToLevels("boxShape", shapeSel.value); await saveRedraw(); });
        shapeRow.createEl("span", { text: "·", cls: "aii-toc-sep" });
        shapeRow.createEl("span", { text: L("框线粗细"), cls: "aii-toc-pair-label" });
        const gStrokeInp = shapeRow.createEl("input", { type: "text", value: String(toc.boxStrokeWidth), placeholder: "1", cls: "aii-inline-num aii-toc-pair-num", attr: { style: NUM2_STYLE } });
        gStrokeInp.addEventListener("change", async () => { let n = Number(gStrokeInp.value); if (isNaN(n) || n <= 0) n = 1; applyGlobalToLevels("boxStrokeWidth", n); await saveRedraw(); });
        const gBoxColorRow = g.createEl("div", { cls: "aii-toc-inline-row", attr: { style: "grid-column: 1 / -1;flex-wrap:nowrap;" }});
        gColor(gBoxColorRow, L("框底色"), "boxColor");
        gColor(gBoxColorRow, L("描边色"), "boxStrokeColor");
        gBoxColorRow.createEl("span", { text: "·", cls: "aii-toc-sep" });
        mkVariInline(gBoxColorRow, L("变色"), "boxColorVari", "boxColorVariDim", "boxColorVariStrength", "boxColorVariDir");

        // 对齐/位置 · 宽度（对应矩阵「对齐/位置」「宽度」两行）
        const alignRow = g.createEl("div", { cls: "aii-toc-inline-row", attr: { style: "grid-column: 1 / -1;flex-wrap:nowrap;" }});
        alignRow.createEl("span", { text: L("对齐/位置"), cls: "aii-toc-inline-group-label" });
        const gAlignSel = alignRow.createEl("select", { cls: "aii-inline-select", attr: { style: "width:auto;flex:0 1 auto;min-width:0;" } });
        [["left", L("左对齐")], ["center", L("居中对齐")], ["right", L("右对齐")]].forEach(([v, t]) => gAlignSel.createEl("option", { text: t, value: v }));
        gAlignSel.value = toc.levelAlignment || "left";
        gAlignSel.addEventListener("change", async () => { setGlobal("levelAlignment", gAlignSel.value); await saveRedraw(); });
        const gPosSel = alignRow.createEl("select", { cls: "aii-inline-select", attr: { style: "width:auto;flex:0 1 auto;min-width:0;" } });
        [["above", L("连线以上")], ["center", L("连线上")], ["below", L("连线以下")]].forEach(([v, t]) => gPosSel.createEl("option", { text: t, value: v }));
        gPosSel.value = toc.textOnLine || "center";
        gPosSel.addEventListener("change", async () => { setGlobal("textOnLine", gPosSel.value); await saveRedraw(); });
        alignRow.createEl("span", { text: "·", cls: "aii-toc-sep" });
        alignRow.createEl("span", { text: L("宽度"), cls: "aii-toc-pair-label" });
        const gWidthSel = alignRow.createEl("select", { cls: "aii-inline-select", attr: { style: "width:auto;flex:0 1 auto;min-width:0;" } });
        [["auto", L("按字数")], ["uniform", L("等宽")]].forEach(([v, t]) => gWidthSel.createEl("option", { text: t, value: v }));
        gWidthSel.value = toc.boxWidthMode || "auto";
        gWidthSel.addEventListener("change", async () => { setGlobal("boxWidthMode", gWidthSel.value); await saveRedraw(); });

        // 避让次级 · 显示序号 · 连接点（对应矩阵同名三行）
        const miscRow = g.createEl("div", { cls: "aii-toc-inline-row", attr: { style: "grid-column: 1 / -1;flex-wrap:nowrap;" }});
        miscRow.createEl("span", { text: L("避让次级"), cls: "aii-toc-inline-group-label" });
        const gAvoidCb = miscRow.createEl("input", { type: "checkbox", cls: "aii-toc-check" });
        gAvoidCb.checked = toc.avoidSecondary !== false;
        gAvoidCb.addEventListener("change", async () => {
            toc.avoidSecondary = gAvoidCb.checked;
            for (const k of LV_KEYS) toc.levels[k].avoidSecondary = gAvoidCb.checked;
            await saveRedraw();
        });
        miscRow.createEl("span", { text: "·", cls: "aii-toc-sep" });
        miscRow.createEl("span", { text: L("显示序号"), cls: "aii-toc-pair-label" });
        const gSeqSel = miscRow.createEl("select", { cls: "aii-inline-select", attr: { style: "width:auto;flex:0 1 auto;min-width:0;" } });
        [["on", L("显示")], ["off", L("隐藏")]].forEach(([v, t]) => gSeqSel.createEl("option", { text: t, value: v }));
        gSeqSel.value = toc.showSequence ? "on" : "off";
        gSeqSel.addEventListener("change", async () => { setGlobalSeq(gSeqSel.value === "on"); await saveRedraw(); });
        miscRow.createEl("span", { text: "·", cls: "aii-toc-sep" });
        miscRow.createEl("span", { text: L("连接点"), cls: "aii-toc-pair-label" });
        const gDotCb = miscRow.createEl("input", { type: "checkbox", cls: "aii-toc-check" });
        gDotCb.checked = toc.nodeDots !== false;
        gDotCb.addEventListener("change", async () => { setGlobalDots(gDotCb.checked); await saveRedraw(); });
        const gDotSizeInp = miscRow.createEl("input", { type: "text", value: String(toc.dotSize != null ? toc.dotSize : 2), placeholder: "2", cls: "aii-inline-num aii-toc-pair-num", attr: { style: NUM2_STYLE } });
        gDotSizeInp.addEventListener("change", async () => {
            const n = Number(gDotSizeInp.value);
            setGlobal("dotSize", isNaN(n) ? 2 : n);
            await saveRedraw();
        });

        // ── 文字 ── 两行同构：「全局」= 全局文字样式（无条件下发每级）；「表头」= 表头名称样式 ──
        // 每行顺序：<行名> · 字体下拉 · B · I · 字号 · 颜色 · 行数控制（按字数/按行数 + 数值）
        // 字体下拉自身已说明用途，不再额外写「字体」二字（用户 2026-10-05）。
        // 行数控制：wrapMode="chars"（每行最多 N 字）|"lines"（拆成 N 行）；数值 0=不限制、1=不拆。
        gSecTitle(L("文字"), MOD_GROUPS.text);
        const HEADER_FIELD = {
            fontFamily: "headerFontFamily", bold: "headerBold", italic: "headerItalic",
            fontSize: "headerFontSize", textColor: "headerTextColor",
            wrapMode: "headerWrapMode", maxChars: "headerMaxChars"
        };
        // 全局 B/I → 每级 fontDeform（与旧行为一致）
        const applyGlobalDeform = () => {
            const d = deformOfBI();
            for (const k of LV_KEYS) toc.levels[k].fontDeform = d;
        };
        const GLOBAL_TEXT_IO = {
            get: (k) => {
                if (k === "bold") return !!toc.textBold;
                if (k === "italic") return !!toc.textItalic;
                if (k === "maxChars") return Number(toc.boxMaxChars) || 0;
                if (k === "textColor") return aiiUnifiedTextColor(toc) || toc.textColor;
                return toc[k];
            },
            set: (k, v) => {
                if (k === "bold") { toc.textBold = !!v; applyGlobalDeform(); return; }
                if (k === "italic") { toc.textItalic = !!v; applyGlobalDeform(); return; }
                if (k === "wrapMode") { toc.wrapMode = v; return; }        // 行数控制模式为全局级
                if (k === "maxChars") { applyGlobalToLevels("boxMaxChars", v); return; }
                // 字体/字号/颜色：无条件覆盖每级（文字色不参与「变色」派生，必须直接下发）
                applyGlobalToLevels(k, v);
            }
        };
        const HEADER_TEXT_IO = {
            get: (k) => toc[HEADER_FIELD[k]],
            set: (k, v) => { toc[HEADER_FIELD[k]] = v; }
        };
        const mkTextRow = (rowLabel, io) => {
            const row = g.createEl("div", { cls: "aii-toc-inline-row", attr: { style: "grid-column: 1 / -1;flex-wrap:nowrap;" }});
            row.createEl("span", { text: rowLabel, cls: "aii-toc-lead-label", attr: { style: "flex:0 0 auto;" } });
            // 字体下拉宽度只留约 4 个汉字（够「微软雅黑」）
            const fontSel = row.createEl("select", { cls: "aii-inline-select", attr: { style: "width:80px;flex:0 0 80px;min-width:80px;max-width:80px;" } });
            fontFamilies.filter(([v]) => v !== "custom").forEach(([v, t]) => fontSel.createEl("option", { text: t, value: v }));
            fontSel.value = io.get("fontFamily") || "Microsoft YaHei";
            fontSel.addEventListener("change", async () => { io.set("fontFamily", fontSel.value); await saveRedraw(); });
            row.createEl("span", { text: "·", cls: "aii-toc-sep" });
            const bBtn = row.createEl("button", { text: "B", cls: "aii-format-btn" + (io.get("bold") ? " aii-format-active" : ""), attr: { title: L("加粗") } });
            const iBtn = row.createEl("button", { text: "I", cls: "aii-format-btn" + (io.get("italic") ? " aii-format-active" : ""), attr: { title: L("斜体") } });
            bBtn.addEventListener("click", async () => { io.set("bold", !io.get("bold")); await saveRedraw(); });
            iBtn.addEventListener("click", async () => { io.set("italic", !io.get("italic")); await saveRedraw(); });
            row.createEl("span", { text: "·", cls: "aii-toc-sep" });
            row.createEl("span", { text: L("字号"), cls: "aii-toc-lead-label" });
            const szInp = row.createEl("input", { type: "text", value: String(io.get("fontSize")), placeholder: "14", cls: "aii-inline-num aii-toc-pair-num", attr: { style: NUM2_STYLE } });
            szInp.addEventListener("change", async () => { let n = Number(szInp.value); if (isNaN(n) || n < 8) n = 14; io.set("fontSize", n); await saveRedraw(); });
            row.createEl("span", { text: "·", cls: "aii-toc-sep" });
            row.createEl("span", { text: L("颜色"), cls: "aii-toc-lead-label" });
            const cw = row.createEl("div", { cls: "aii-color-wrap" });
            const ci = cw.createEl("input", { type: "color", value: io.get("textColor") || "#000000", cls: "aii-color-input" });
            ci.addEventListener("change", async () => { io.set("textColor", ci.value); await saveRedraw(); });
            row.createEl("span", { text: "·", cls: "aii-toc-sep" });
            row.createEl("span", { text: L("行数控制"), cls: "aii-toc-pair-label", attr: { title: L("按字数=每行最多 N 字自动换行（0=不限）；按行数=标题拆成 N 行显示（1=不拆）") } });
            const wrapSel = row.createEl("select", { cls: "aii-inline-select", attr: { style: "width:auto;flex:0 1 auto;min-width:0;" } });
            [["chars", L("按字数")], ["lines", L("按行数")]].forEach(([v, t]) => wrapSel.createEl("option", { text: t, value: v }));
            wrapSel.value = io.get("wrapMode") === "lines" ? "lines" : "chars";
            wrapSel.addEventListener("change", async () => { io.set("wrapMode", wrapSel.value); await saveRedraw(); });
            const maxInp = row.createEl("input", { type: "text", value: String(Number(io.get("maxChars")) || 0), placeholder: "0", cls: "aii-inline-num aii-toc-pair-num", attr: { style: NUM2_STYLE } });
            maxInp.addEventListener("change", async () => { let n = Number(maxInp.value); if (isNaN(n) || n < 0) n = 0; io.set("maxChars", n); await saveRedraw(); });
            return row;
        };
        mkTextRow(L("全局"), GLOBAL_TEXT_IO);
        mkTextRow(L("表头"), HEADER_TEXT_IO);

        // 底纹方案已上移至「全局样式」首位（大范围→小范围排序：底纹→配色→连线→框→文字）

        // ═══ 每级样式矩阵（设置项 × 文章标题/一~四级） ═══
        g = module(L("自定义样式"));
        const MXLVS = [
            ["title", L("文章标题")],
            ["1", L("一级标题")],
            ["2", L("二级标题")],
            ["3", L("三级标题")],
            ["4", L("四级标题")]
        ];
        const matrix = g.createEl("div", { cls: "aii-toc-matrix", attr: { style: "grid-column:1/-1;width:100%;max-width:100%;min-width:0;box-sizing:border-box;display:grid;grid-template-columns:max-content repeat(5, minmax(0, 1fr));gap:5px 4px;align-items:center;" } });
        // 表头行：层级文字 + 显隐勾选框（勾选=显示；勾到几级排到几级）
        matrix.createEl("div", { cls: "aii-toc-mhead", text: L("设置项") });
        for (const [k, t] of MXLVS) {
            const head = matrix.createEl("div", { cls: "aii-toc-mhead", attr: { style: "display:flex;align-items:center;justify-content:center;gap:4px;" }});
            head.createEl("span", { text: t });
            const cb = head.createEl("input", { type: "checkbox", cls: "aii-toc-check" });
            cb.checked = LVS[k].visible !== false;
            cb.addEventListener("change", async () => { LVS[k].visible = cb.checked; await save(); });
        }
        // 段落行（横跨整表）
        const msec = (text) => matrix.createEl("div", { cls: "aii-toc-msec", text });
        // 设置行：返回 5 个单元格容器
        const mrow = (labelText) => {
            matrix.createEl("div", { cls: "aii-toc-mrowlab", text: labelText });
            return MXLVS.map(([k]) => matrix.createEl("div", { cls: "aii-toc-mcell" }));
        };
        const mSel = (cell, options, value, onChange) => {
            const sl = cell.createEl("select", { cls: "aii-inline-select aii-toc-msel" });
            for (const o of options) sl.createEl("option", { text: o[1], value: o[0] });
            sl.value = value;
            sl.addEventListener("change", async () => { await onChange(sl.value); await save(); });
            return sl;
        };
        const mNum = (cell, value, onChange, placeholder) => {
            const inp = cell.createEl("input", { type: "text", value: value === "" ? "" : String(value), placeholder: placeholder || "", cls: "aii-inline-num aii-toc-mnum" });
            inp.addEventListener("change", async () => { await onChange(inp.value); await save(); });
            return inp;
        };
        // 继承式颜色：圆点 + ×（× = 恢复当前已选取样式的每级配色，无快照时回退全局色）
        const snapColor = (key, field, globalVal) => {
            const s = toc.schemeSnap && toc.schemeSnap[key];
            return (s && s[field]) ? s[field] : globalVal;
        };
        const mColor = (cell, key, field, globalVal, afterChange) => {
            const wrap = cell.createEl("div", { cls: "aii-toc-cell" });
            const ci = wrap.createEl("input", { type: "color", value: LVS[key][field] || globalVal, cls: "aii-color-input aii-color-sm" });
            const x = wrap.createEl("button", { text: "×", cls: "aii-toc-clear" });
            const sync = () => {
                x.classList.toggle("aii-toc-clear-on", false);
                ci.title = L("自定义颜色（点 × 恢复当前样式初始色）");
            };
            ci.addEventListener("change", async () => { LVS[key][field] = ci.value; if (afterChange) await afterChange(); await save(); sync(); });
            x.addEventListener("click", async () => { const v = snapColor(key, field, globalVal); LVS[key][field] = v; await save(); ci.value = v; sync(); });
            sync();
        };
        const mDisable = (cell) => { cell.createEl("span", { text: "—", cls: "aii-toc-na" }); };
        // 放射状连线"直角"等价直线（矩阵连线形状行选项切换用）
        const isRadialLayout = (toc.layout || "horizontal") === "radial";

        // 一格两个数字输入（如 字号/字数、粗细/弧度）：flex 均分，不压叠
        const mPairNum = (cell, specs) => {
            const wrap = cell.createEl("div", { cls: "aii-toc-cell" });
            for (const s of specs) {
                const inp = wrap.createEl("input", { type: "text", value: s.value === "" ? "" : String(s.value), placeholder: s.placeholder || "", cls: "aii-inline-num aii-toc-mnum", attr: { style: "flex:1 1 0;width:auto;min-width:0;" } });
                inp.addEventListener("change", async () => { await s.onChange(inp.value); await save(); });
            }
        };
        // 文字样式：B + I + 色点 + ×（× 一次重置变形与颜色）
        const deformStr = (bold, italic) => bold && italic ? "bolditalic" : (bold ? "bold" : (italic ? "italic" : "normal"));
        const effBI = (k) => {
            const d = LVS[k].fontDeform;
            return {
                w: d ? (d === "bold" || d === "bolditalic") : !!toc.textBold,
                i: d ? (d === "italic" || d === "bolditalic") : !!toc.textItalic
            };
        };
        const mTextStyle = (cell, key) => {
            const wrap = cell.createEl("div", { cls: "aii-toc-cell" });
            const bi = effBI(key);
            const b = wrap.createEl("button", { text: "B", cls: "aii-format-btn" + (bi.w ? " aii-format-active" : "") });
            const ib = wrap.createEl("button", { text: "I", cls: "aii-format-btn" + (bi.i ? " aii-format-active" : "") });
            const ci = wrap.createEl("input", { type: "color", value: LVS[key].textColor || toc.textColor, cls: "aii-color-input aii-color-sm" });
            const x = wrap.createEl("button", { text: "×", cls: "aii-toc-clear" });
            const syncBI = () => { const s = effBI(key); b.classList.toggle("aii-format-active", s.w); ib.classList.toggle("aii-format-active", s.i); };
            b.addEventListener("click", async () => { const s = effBI(key); LVS[key].fontDeform = deformStr(!s.w, s.i); await save(); syncBI(); });
            ib.addEventListener("click", async () => { const s = effBI(key); LVS[key].fontDeform = deformStr(s.w, !s.i); await save(); syncBI(); });
            ci.addEventListener("change", async () => { LVS[key].textColor = ci.value; await save(); });
            x.addEventListener("click", async () => {
                const snap = toc.schemeSnap && toc.schemeSnap[key];
                LVS[key].fontDeform = (snap && snap.fontDeform) ? snap.fontDeform : deformStr(!!toc.textBold, !!toc.textItalic);
                LVS[key].textColor = snapColor(key, "textColor", toc.textColor);
                await save(); ci.value = LVS[key].textColor; syncBI();
            });
        };
        // 底色/描边：两个色点 + ×（× 一次重置两个颜色）
        const mBoxColors = (cell, key) => {
            const wrap = cell.createEl("div", { cls: "aii-toc-cell" });
            const c1 = wrap.createEl("input", { type: "color", value: LVS[key].boxColor || toc.boxColor, cls: "aii-color-input aii-color-sm" });
            const c2 = wrap.createEl("input", { type: "color", value: LVS[key].boxStrokeColor || toc.boxStrokeColor, cls: "aii-color-input aii-color-sm" });
            const x = wrap.createEl("button", { text: "×", cls: "aii-toc-clear" });
            const sync = () => {
                c1.title = L("底色（点 × 恢复当前样式初始色）");
                c2.title = L("描边色（点 × 恢复当前样式初始色）");
                x.classList.toggle("aii-toc-clear-on", false);
            };
            c1.addEventListener("change", async () => { LVS[key].boxColor = c1.value; await save(); sync(); });
            c2.addEventListener("change", async () => { LVS[key].boxStrokeColor = c2.value; await save(); sync(); });
            x.addEventListener("click", async () => {
                LVS[key].boxColor = snapColor(key, "boxColor", toc.boxColor);
                LVS[key].boxStrokeColor = snapColor(key, "boxStrokeColor", toc.boxStrokeColor);
                await save(); c1.value = LVS[key].boxColor; c2.value = LVS[key].boxStrokeColor; sync();
            });
            sync();
        };

        // 字体：内置列表 + 「自定义...」时在同行显示字体名输入框（写入 fontFamilyCustom）
        // 渲染器 fontFamilyOf：f === "custom" → fontFamilyCustom（空则回退全局字体）
        const mFont = (cell, key) => {
            const wrap = cell.createEl("div", { cls: "aii-toc-cell" });
            const cur = LVS[key].fontFamily || toc.fontFamily || "";
            const isCustom = cur === "custom";
            const sl = wrap.createEl("select", { cls: "aii-inline-select aii-toc-msel", attr: { style: "width:auto;flex:" + (isCustom ? "0 0 auto" : "1 1 0") + ";min-width:0;max-width:100%;" } });
            fontFamilies.forEach(([v, t]) => sl.createEl("option", { text: t, value: v }));
            sl.value = isCustom ? "custom" : cur;
            const inp = wrap.createEl("input", { type: "text", value: LVS[key].fontFamilyCustom || "", placeholder: L("字体名"), cls: "aii-inline-num aii-toc-mnum", attr: { style: "width:auto;flex:1 1 0;min-width:0;" + (isCustom ? "" : ";display:none") } });
            const sync = () => {
                const c = sl.value === "custom";
                inp.style.display = c ? "" : "none";
                sl.style.flex = c ? "0 0 auto" : "1 1 0";
            };
            sl.addEventListener("change", async () => { LVS[key].fontFamily = sl.value; await save(); sync(); });
            inp.addEventListener("change", async () => { LVS[key].fontFamilyCustom = inp.value.trim(); await save(); });
            sync();
        };

        // 所有选项均为具体值（样式切换时一次性注入，无L("默认/全局")概念）
        // 矩阵行序（大范围→小范围）：下级连线 → 节点框 → 文字
        msec(L("下级连线（本级连向下级的线）"));
        // 语义：每列控制「该级节点 → 其下级」的连线；文章标题列即 标题→一级 的线。
        // 四级标题没有下级，该列连线设置不生效。
        const LINE_NA = (c) => { mDisable(c); return null; };
        let cells = mrow(L("颜色"));
        MXLVS.forEach(([k]) => { const c = cells.shift(); if (k === "4") { LINE_NA(c); return; } mColor(c, k, "lineColor", toc.lineColor); });
        cells = mrow(L("粗细/弧度"));
        // 弧度 = 曲线转角锐利度，值域 **0~10**（0=直线，7.5=转角锐利，10=最锐）。
        // 左框＝线宽，右框＝弧度；留空即跟随全局。
        MXLVS.forEach(([k]) => {
            const c = cells.shift();
            if (k === "4") { LINE_NA(c); return; }
            mPairNum(c, [
                { value: LVS[k].lineWidth, placeholder: String(toc.lineWidth), onChange: v => { LVS[k].lineWidth = v.trim(); } },
                { value: LVS[k].lineArc, placeholder: String(toc.arcAngle), onChange: v => { LVS[k].lineArc = v.trim(); } }
            ]);
            const tip = c.querySelector("input.aii-toc-mnum:last-child") || c.querySelectorAll("input")[1];
            if (tip) { tip.title = L("弧度（0~10）：0=直线，7.5=转角锐利，10=最锐。留空跟随全局。"); tip.placeholder = String(toc.arcAngle); }
        });
        cells = mrow(L("连线形状"));
        MXLVS.forEach(([k]) => {
            const c = cells.shift();
            if (k === "4") { LINE_NA(c); return; }
            // 放射状：直角等价于直线；横向/纵向：直角=折线
            const shapeOpts = isRadialLayout
                ? [["arc", L("曲线")], ["rightangle", L("直线")]]
                : [["arc", L("弧形")], ["rightangle", L("直角")]];
            mSel(c, shapeOpts, LVS[k].lineShape === "auto" ? "arc" : LVS[k].lineShape, v => { LVS[k].lineShape = v; });
        });

        msec(L("节点框"));
        // 对齐 / 位置：横向=生效；放射状=仅对本级"横排分支"生效（用户确认保留可编辑，不置灰）
        // 对齐/位置合并为一行（紧凑）：每格 = 对齐下拉 + 位置下拉 并排
        cells = mrow(L("对齐/位置"));
        MXLVS.forEach(([k]) => {
            const c = cells.shift();
            const wrap = c.createEl("div", { cls: "aii-toc-cell" });
            const sA = wrap.createEl("select", { cls: "aii-inline-select aii-toc-msel", attr: { style: "flex:1 1 0;min-width:0;" } });
            [["left", L("左对齐")], ["center", L("居中对齐")], ["right", L("右对齐")]].forEach(([v, t]) => sA.createEl("option", { text: t, value: v }));
            sA.value = LVS[k].align;
            sA.addEventListener("change", async () => { LVS[k].align = sA.value; await save(); });
            const sP = wrap.createEl("select", { cls: "aii-inline-select aii-toc-msel", attr: { style: "flex:1 1 0;min-width:0;" } });
            [["above", L("连线以上")], ["center", L("连线上")], ["below", L("连线以下")]].forEach(([v, t]) => sP.createEl("option", { text: t, value: v }));
            sP.value = LVS[k].boxPosition;
            sP.addEventListener("change", async () => { LVS[k].boxPosition = sP.value; await save(); });
        });
        cells = mrow(L("形状"));
        MXLVS.forEach(([k]) => { const c = cells.shift(); mSel(c, [["underline", L("下划线")], ["rect", L("矩形")], ["rounded", L("圆角矩形")], ["capsule", L("胶囊")], ["none", L("无底纹")]], LVS[k].boxShape, v => { LVS[k].boxShape = v; }); });
        cells = mrow(L("框线粗细"));
        MXLVS.forEach(([k]) => {
            const c = cells.shift();
            const wrap = c.createEl("div", { cls: "aii-toc-cell" });
            // 下划线形态=线粗；矩形/圆角/胶囊=描边宽
            const inp = wrap.createEl("input", { type: "text", value: LVS[k].boxStrokeWidth === "" ? "" : String(LVS[k].boxStrokeWidth), placeholder: String(toc.boxStrokeWidth), cls: "aii-inline-num aii-toc-mnum", attr: { style: "flex:1 1 0;width:auto;min-width:0;" } });
            inp.addEventListener("change", async () => { LVS[k].boxStrokeWidth = inp.value.trim(); await save(); });
        });
        cells = mrow(L("宽度"));
        MXLVS.forEach(([k]) => { const c = cells.shift(); mSel(c, [["uniform", L("等宽")], ["auto", L("按字数")]], LVS[k].boxWidthMode, v => { LVS[k].boxWidthMode = v; }); });
        cells = mrow(L("避让次级"));
        MXLVS.forEach(([k]) => {
            const c = cells.shift();
            const wrap = c.createEl("div", { cls: "aii-toc-cell", attr: { style: "justify-content:center;" } });
            const cb = wrap.createEl("input", { type: "checkbox", cls: "aii-toc-check", attr: { title: L("避让次级：勾选=本级标题的位置受下一级占用空间影响；不勾=本级按自身间距分布，只由引线表示父子关系") } });
            cb.checked = (LVS[k].avoidSecondary !== false);
            cb.addEventListener("change", async () => { LVS[k].avoidSecondary = cb.checked; await save(); });
        });
        cells = mrow(L("显示序号"));
        MXLVS.forEach(([k]) => { const c = cells.shift(); if (k === "title") { mDisable(c); return; } mSel(c, [["on", L("显示")], ["off", L("隐藏")]], LVS[k].sequence, v => { LVS[k].sequence = v; }); });
        cells = mrow(L("底色/描边"));
        MXLVS.forEach(([k]) => mBoxColors(cells.shift(), k));
        cells = mrow(L("连接点"));
        MXLVS.forEach(([k]) => {
            const c = cells.shift();
            const wrap = c.createEl("div", { cls: "aii-toc-cell" });
            const sl = wrap.createEl("select", { cls: "aii-inline-select aii-toc-msel", attr: { style: "flex:1 1 0;min-width:0;" } });
            [["none", L("不显示")], ["hollow", L("空心")], ["solid", L("实心")]].forEach(([v, t]) => sl.createEl("option", { text: t, value: v }));
            sl.value = LVS[k].dotStyle || "solid";
            sl.addEventListener("change", async () => { LVS[k].dotStyle = sl.value; await save(); });
            const inp = wrap.createEl("input", { type: "text", value: String(LVS[k].dotSize != null ? LVS[k].dotSize : 3.5), placeholder: "2", cls: "aii-inline-num aii-toc-mnum", attr: { style: "flex:1 1 0;width:auto;min-width:0;" } });
            inp.addEventListener("change", async () => { const n = Number(inp.value); LVS[k].dotSize = isNaN(n) ? 2 : n; await save(); });
        });

        // 对齐/位置仅横向布局生效：非横向时上方两行已置灰并标注L("（仅横向）")
        // 下级连线组已上移至矩阵首（行序：连线→框→文字）

        // 文字（框中的字，小范围，置于矩阵末）
        msec(L("文字"));
        cells = mrow(L("字号/字or行数"));
        MXLVS.forEach(([k]) => {
            const c = cells.shift();
            mPairNum(c, [
                { value: LVS[k].fontSize, placeholder: String(toc.fontSize), onChange: v => { LVS[k].fontSize = v.trim(); } },
                { value: LVS[k].boxMaxChars, placeholder: String(Number(toc.boxMaxChars) || 0), onChange: v => { LVS[k].boxMaxChars = v.trim(); } }
            ]);
            const tip = c.querySelectorAll("input.aii-toc-mnum")[1];
            if (tip) tip.title = L("含义跟随全局「行数控制」模式：按字数=每行最多 N 字；按行数=拆成 N 行。0/留空=跟随全局。");
        });
        cells = mrow(L("文字样式"));
        MXLVS.forEach(([k]) => mTextStyle(cells.shift(), k));
        cells = mrow(L("字体"));
        MXLVS.forEach(([k]) => { mFont(cells.shift(), k); });
    }

    display() {
        const containerEl = this.containerEl;
        containerEl.empty();
        const s = this.plugin.settings;
        const L = (key) => tr(s.language, key);

        // 注入样式
        this.injectStyles(containerEl);

        // 顶部栏：效果预览（随页面滚动，不 sticky）
        const previewBar = containerEl.createDiv({ cls: "aii-preview-bar" });
        this.buildPreviewBar(previewBar);

        // 顶部控制栏：语言 + 执行 + 全部重置 + 预设
        const topBar = containerEl.createDiv({ cls: "aii-top-bar" });
        this.buildTopBar(topBar);

        // 标签导航
        const tabNav = containerEl.createDiv({ cls: "aii-tab-nav" });
        const tabs = [
            { id: "append", label: L("tabAppend") },
            { id: "rules", label: L("tabRules") },
            { id: "display", label: L("tabDisplay") },
            { id: "toc", label: L("tabToc") }
        ];
        for (const t of tabs) {
            const btn = tabNav.createEl("button", { cls: "aii-tab-btn", text: t.label });
            if (t.id === this.activeTab) btn.addClass("aii-active");
            btn.addEventListener("click", () => {
                this.activeTab = t.id;
                this.display();
            });
        }

        // 标签内容区
        const tabContent = containerEl.createDiv({ cls: "aii-tab-content" });
        if (this.activeTab === "append") this.buildAppendTab(tabContent);
        else if (this.activeTab === "rules") this.buildRulesTab(tabContent);
        else if (this.activeTab === "display") this.buildDisplayTab(tabContent);
        else if (this.activeTab === "toc") this.buildTocTab(tabContent);

        // 底部警示
        const warn = containerEl.createDiv({ cls: "aii-warning" });
        warn.createEl("strong", { text: L("warnTitle") });
        warn.createEl("div", { text: L("warnText") });
    }

    injectStyles(containerEl) {
        try {
            // 先清除旧样式块（容器内 + 全文档）再写入：保证样式始终与当前代码一致
            // （设置窗口跨插件重载保持打开时，旧 #aii-style 会驻留导致新 CSS 不生效）
            const stale = containerEl.querySelector("#aii-style");
            if (stale) stale.remove();
            document.querySelectorAll("style#aii-style").forEach(s => { if (s !== stale) s.remove(); });
            const style = document.createElement("style");
            style.id = "aii-style";
            style.textContent = `
                .aii-preview-bar { padding: 4px 0 6px; border-bottom: 1px solid var(--background-modifier-border); }
                .aii-preview-header { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 6px; }
                .aii-preview-header h3 { margin: 0; font-size: var(--font-ui-medium); }
                .aii-preview-fold { font-size: var(--font-ui-smaller); color: var(--text-muted); display: inline-flex; align-items: center; gap: 4px; cursor: pointer; }
                .aii-preview-fold input { margin: 0; }
                .aii-preview-box { background: var(--background-secondary); padding: 8px 12px; border-radius: 4px; margin: 4px 0; white-space: pre-wrap; word-break: break-all; overflow-wrap: anywhere; max-width: 100%; font-size: var(--font-ui-smaller); line-height: 1.5; overflow-x: auto; }
                .aii-preview-box svg, .aii-preview-box img { max-width: 100%; height: auto; }
                .aii-preview-hint { font-size: var(--font-ui-smaller); color: var(--text-warning, #d97706); margin: 2px 0 6px; }
                .aii-preview-row { margin: 2px 0; }
                .aii-top-bar { display: flex; gap: 6px; align-items: center; padding: 6px 0; border-bottom: 1px solid var(--background-modifier-border); margin-bottom: 8px; flex-wrap: wrap; }
                .aii-top-bar select { font-size: var(--font-ui-small); padding: 2px 6px; height: 28px; border-radius: 4px; border: 1px solid var(--background-modifier-border); background: var(--background-primary); }
                .aii-top-bar button { height: 28px; padding: 0 8px; }
                .aii-preset-group { display: inline-flex; align-items: center; flex-shrink: 0; gap: 3px; margin-left: auto; padding: 2px 4px; border: 1px solid var(--background-modifier-border); border-radius: 4px; background: var(--background-primary); white-space: nowrap; }
                .aii-preset-title { font-size: var(--font-ui-smallest); color: var(--interactive-accent); margin-right: 2px; }
                .aii-preset-btn { min-width: 22px; padding: 0 4px; height: 24px; font-size: var(--font-ui-smallest); border: 1px solid var(--interactive-accent); background: var(--background-primary); color: var(--interactive-accent); border-radius: 4px; cursor: pointer; }
                .aii-preset-btn.aii-preset-active { background: var(--interactive-accent); color: var(--text-on-accent); }
                .aii-preset-btn.aii-preset-reset { min-width: 36px; border-color: var(--text-error, #ef4444); color: var(--text-error, #ef4444); background: var(--background-primary); }
                .aii-preset-btn.aii-preset-reset.aii-preset-active { background: var(--text-error, #ef4444); color: var(--text-on-accent); }
                .aii-tab-nav { display: flex; gap: 6px; margin-bottom: 12px; }
                .aii-tab-btn { flex: 1; padding: 6px 4px; border: 1px solid var(--background-modifier-border); background: var(--background-secondary); border-radius: 4px; cursor: pointer; font-size: var(--font-ui-smaller); }
                .aii-tab-btn.aii-active { background: var(--interactive-accent); color: var(--text-on-accent); border-color: var(--interactive-accent); }
                .aii-tab-content { padding-bottom: 20px; }
                .aii-hint { font-size: var(--font-ui-small); font-weight: 600; color: var(--text-normal); margin: 6px 0 10px; }
                .aii-hint-body { background: rgba(234, 179, 8, 0.12); border: 1px solid rgba(234, 179, 8, 0.5); padding: 2px 6px; border-radius: 4px; }
                .aii-hint-prop { background: rgba(59, 130, 246, 0.12); border: 1px solid rgba(59, 130, 246, 0.5); padding: 2px 6px; border-radius: 4px; }
                .aii-row { display: flex; flex-direction: column; gap: 4px; margin-bottom: 10px; }
                .aii-row-header { display: flex; justify-content: space-between; align-items: center; }
                .aii-row-label { font-size: var(--font-ui-smaller); color: var(--text-muted); }
                .aii-row-actions { display: flex; align-items: center; gap: 6px; font-size: var(--font-ui-smaller); }
                .aii-row-actions select { height: 22px; font-size: var(--font-ui-smallest); padding: 2px 4px; }
                .aii-row-actions button { height: 22px; font-size: var(--font-ui-smallest); }
                .aii-row-actions input.aii-indent-input { width: 42px; height: 22px; font-size: var(--font-ui-smallest); padding: 2px 4px; }
                .aii-slots { display: flex; gap: 4px; }
                .aii-slot { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 2px; }
                .aii-slot select { width: 100%; font-size: var(--font-ui-smallest); padding: 2px 4px; height: 24px; border-radius: 3px; border: 1px solid var(--background-modifier-border); background: var(--background-primary); }
                .aii-slot select.aii-body-select { background: rgba(234, 179, 8, 0.12); border-color: rgba(234, 179, 8, 0.5); }
                .aii-slot select.aii-prop-select { background: rgba(59, 130, 246, 0.12); border-color: rgba(59, 130, 246, 0.5); }
                .aii-display-row { display: flex; gap: 6px; align-items: center; margin-bottom: 6px; width: 100%; }
                .aii-display-row button { flex: 0 0 auto; }
                .aii-display-tag { flex: 0 0 auto; min-width: 72px; max-width: 200px; font-size: var(--font-ui-small); color: var(--text-normal); text-align: left; padding-left: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .aii-input-pair { flex: 1 1 0; display: flex; gap: 6px; min-width: 0; }
                .aii-input-pair input { box-sizing: border-box; min-width: 0; flex: 1 1 0; width: 100%; height: 28px; line-height: 20px; padding: 4px 6px; }
                .aii-input-pair .aii-prefix { flex: 2 1 0; }
                .aii-input-pair .aii-suffix { flex: 1 1 0; }
                .aii-input-pair.aii-author-pair .aii-prefix { flex: 1 1 0; }
                .aii-input-pair.aii-author-pair .aii-suffix { flex: 2 1 0; }
                .aii-input-pair .aii-link-name { flex: 1 1 0; }
                .aii-input-pair .aii-link-url { flex: 2 1 0; }
                .aii-input-pair .aii-custom-text { flex: 1 1 0; }
                .aii-warning { margin-top: 14px; padding: 10px 12px; border: 1px solid var(--warning, #d97706); border-radius: 6px; background: rgba(217,119,6,0.08); font-size: 0.9em; line-height: 1.5; white-space: pre-wrap; }
                .aii-warning strong { display: block; margin-bottom: 4px; }
                .aii-disabled { opacity: 0.45; pointer-events: none; }
                .aii-link-image-row { display: flex; gap: 8px; align-items: center; margin-bottom: 4px; }
                .aii-preview-hide-label { font-size: var(--font-ui-smaller); color: var(--text-muted); }
                .aii-preview-actions { margin-left: auto; display: flex; gap: 6px; align-items: center; }
                .aii-preview-actions select { font-size: var(--font-ui-smaller); height: 24px; }
                .aii-preview-actions button { height: 24px; }
                .aii-hidden { display: none; }
                .aii-rules-grid { display: grid; grid-template-columns: auto 1fr 1fr; gap: 8px 16px; align-items: center; margin: 8px 0 12px; }
                .aii-rules-grid > .aii-rules-label { justify-self: start; font-weight: 500; white-space: nowrap; }
                .aii-rules-grid > .aii-inline-toggle { justify-self: end; }
                .aii-inline-toggle { display: flex; align-items: center; gap: 6px; justify-content: flex-end; }
                .aii-inline-toggle label { font-size: var(--font-ui-smaller); color: var(--text-muted); white-space: nowrap; }
                .aii-color-input { width: 22px; height: 22px; padding: 0; border: 1px solid var(--background-modifier-border); border-radius: 50%; background: none; cursor: pointer; overflow: hidden; }
                .aii-color-wrap { flex: 0 0 auto; display: flex; align-items: center; gap: 2px; justify-content: flex-end; }
                .aii-color-clear { width: 20px; height: 20px; padding: 0; line-height: 1; font-size: var(--font-ui-smallest); }
                .aii-format-wrap { flex: 0 0 auto; display: flex; align-items: center; gap: 2px; }
                .aii-toc-module { border: 1px solid var(--background-modifier-border); border-radius: 6px; padding: 10px 12px; margin-bottom: 18px; background: var(--background-primary); max-width: min(880px, 100%); box-sizing: border-box; min-width: 0; }
                .aii-toc-row { max-width: 880px; }
                .aii-toc-grid { display: grid; grid-template-columns: max-content minmax(0, 1fr) max-content minmax(0, 1fr); gap: 8px 12px; align-items: center; min-width: 0; }
                .aii-toc-label { font-size: var(--font-ui-small); color: var(--text-normal); text-align: right; white-space: nowrap; justify-self: end; }
                .aii-toc-grid .aii-inline-select, .aii-toc-grid .aii-inline-text { width: 100%; min-width: 0; }
                .aii-toc-grid .aii-inline-num { width: 84px; }
                .aii-toc-grid .aii-color-wrap { justify-self: start; }
                .aii-toc-check { width: 16px; height: 16px; margin: 0; }
                .aii-toc-radio { width: 16px; height: 16px; margin: 0; }
                .aii-toc-matrix { display: grid; grid-template-columns: max-content repeat(5, minmax(0, 1fr)); gap: 5px 0; align-items: center; min-width: 0; width: 100%; box-sizing: border-box; }
                .aii-toc-mhead { font-size: var(--font-ui-small); font-weight: 700; color: var(--text-normal); text-align: center; padding: 4px 2px; border-bottom: 2px solid var(--background-modifier-border); border-left: 1px solid var(--background-modifier-border); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .aii-toc-mhead:first-child { border-left: none; }
                .aii-toc-msec { grid-column: 1 / -1; font-size: var(--font-ui-small); font-weight: 600; color: var(--text-normal); opacity: 0.88; background: var(--background-secondary); border-radius: 4px; padding: 4px 0; margin-top: 2px; text-align: left; }
                .aii-toc-mrowlab { font-size: var(--font-ui-small); color: var(--text-normal); text-align: right; white-space: nowrap; padding-right: 6px; }
                .aii-toc-mcell { display: flex; align-items: center; justify-content: center; gap: 2px; min-width: 0; border-left: 1px solid var(--background-modifier-border); padding-left: 6px; }
                .aii-toc-mcell > * { min-width: 0; }
                .aii-toc-msel { width: 100%; min-width: 0; font-size: var(--font-ui-smallest); padding: 1px 2px; }
                .aii-toc-mnum { width: 100%; min-width: 0; max-width: 100%; font-size: var(--font-ui-smallest); padding: 2px 4px; }
                .aii-toc-inline-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
                /* 分节标题（下级连线/节点框/文字）：比正文略深的灰（接近黑、比黑稍浅），
                   与模块大标题（--text-normal / 700）靠字重与轻微透明度区分 */
                .aii-toc-sectitle { font-size: var(--font-ui-small); font-weight: 600; color: var(--text-normal); opacity: 0.88; margin-top: 4px; }
                /* 模块/分节「恢复默认」小图标按钮：统一尺寸、紧跟标题 */
                .aii-toc-mini-btn { width: 20px; height: 20px; min-width: 20px; flex: 0 0 auto; padding: 0; display: inline-flex; align-items: center; justify-content: center; font-size: 13px; line-height: 1; border: 1px solid var(--background-modifier-border); background: var(--background-primary); color: var(--text-muted); border-radius: 4px; cursor: pointer; }
                .aii-toc-mini-btn:hover { color: var(--text-normal); border-color: var(--text-muted); }
                .aii-toc-inline-group-label { font-size: var(--font-ui-small); color: var(--text-normal); white-space: nowrap; }
                .aii-toc-lead-label { font-size: var(--font-ui-small); color: var(--text-normal); white-space: nowrap; }
                .aii-toc-pair { display: inline-flex; align-items: center; gap: 4px; }
                .aii-toc-pair-label { font-size: var(--font-ui-small); color: var(--text-muted); white-space: nowrap; }
                /* 数字框宽度 ≈ 2.5 个数字（用户 2026-10-03：原来太宽、挤占空间） */
                .aii-toc-pair-num { width: 34px !important; min-width: 34px !important; flex: 0 0 auto !important; }
                /* 例外：画布尺寸/边距/间距/行高 需要 3~4 位数字 */
                #aii-toc-width, #aii-toc-height, #aii-toc-margin, #aii-toc-gapx, #aii-toc-gapy, #aii-toc-lineheight { width: 54px !important; min-width: 54px !important; }
                .aii-toc-pair-sel { min-width: 60px; }
                .aii-toc-sep { color: var(--text-faint); font-size: var(--font-ui-small); user-select: none; padding: 0 2px; }
                .aii-toc-cell { display: flex; align-items: center; gap: 3px; min-width: 0; width: 100%; }
                .aii-color-sm { width: 22px; height: 22px; }
                .aii-toc-clear { width: 18px; height: 18px; padding: 0; line-height: 1; font-size: var(--font-ui-smallest); flex: 0 0 auto; }
                .aii-toc-clear-on { opacity: 0.4; }
                .aii-toc-na { color: var(--text-faint); text-align: center; }
                .aii-toc-module-title { display: block; margin: 0 0 10px 0; padding: 0; margin-inline-start: 0; padding-inline-start: 0; text-indent: 0; text-align: left; font-size: var(--font-ui-small); font-weight: 700; color: var(--text-normal); }
                .aii-toc-module .aii-display-row { margin-bottom: 6px; flex-wrap: wrap; }
                .aii-toc-module .aii-display-row:last-child { margin-bottom: 0; }
                .aii-toc-row { align-items: center; min-height: 28px; }
                .aii-toc-tag { min-width: 92px; max-width: 120px; font-size: var(--font-ui-small); color: var(--text-normal); }
                .aii-toc-label { font-size: var(--font-ui-small); color: var(--text-muted); white-space: nowrap; margin-right: 4px; }
                .aii-toc-toggle { flex: 0 0 auto; min-width: auto; margin-right: 8px; }
                .aii-toc-toggle span { min-width: auto; text-align: left; }
                .aii-inline-label { font-size: var(--font-ui-smaller); color: var(--text-muted); white-space: nowrap; margin-right: 2px; }
                .aii-format-btn { min-width: 20px; height: 20px; padding: 0 3px; line-height: 1; font-size: var(--font-ui-smallest); border: 1px solid var(--background-modifier-border); background: var(--background-primary); color: var(--text-muted); border-radius: 3px; cursor: pointer; }
                .aii-format-btn.aii-format-active { border-color: var(--interactive-accent); color: var(--interactive-accent); font-weight: 700; }
                .aii-force-image-toggle { flex: 0 0 90px; display: inline-flex; align-items: center; gap: 4px; justify-content: flex-end; white-space: nowrap; font-size: var(--font-ui-small); color: var(--text-normal); cursor: pointer; }
                .aii-force-image-toggle input[type="checkbox"] { width: auto; height: auto; min-width: 16px; min-height: 16px; margin: 0; flex: 0 0 auto; }
                .aii-force-image-toggle span { text-align: right; min-width: 2em; }
                .aii-tab-content { padding-left: 0; padding-right: 0; }
                .aii-tab-content > h3 { margin-left: 0; margin-right: 0; padding-left: 0; }
                .aii-tab-content .setting-item { align-items: center; }
                .aii-tab-content .setting-item-info { padding: 4px 0; }
                .aii-short-input { width: 64px !important; min-width: 64px !important; flex: 0 0 auto !important; }
                .aii-inline-text { flex: 1 1 0; min-width: 80px; height: 26px; box-sizing: border-box; padding: 2px 6px; }
                .aii-inline-num { height: 26px; box-sizing: border-box; padding: 2px 6px; }
                .aii-toc-grid .aii-toc-cell .aii-toc-mnum { width: auto !important; min-width: 0 !important; flex: 1 1 0 !important; }
                .aii-inline-label { font-size: var(--font-ui-small); color: var(--text-muted); white-space: nowrap; }
                .aii-inline-select { height: 24px; font-size: var(--font-ui-small); padding: 2px 4px; border-radius: 3px; border: 1px solid var(--background-modifier-border); background: var(--background-primary); }
                .aii-row-count-wrap { display: flex; align-items: center; gap: 4px; margin: 6px 0 10px; font-size: var(--font-ui-small); }
                .aii-row-count-wrap select { font-size: var(--font-ui-small); padding: 2px 6px; height: 26px; border-radius: 4px; border: 1px solid var(--background-modifier-border); background: var(--background-primary); }
                .aii-sort-mode-wrap { display: flex; align-items: center; gap: 10px; margin: 4px 0 12px; }
                .aii-sort-mode-label { display: inline-flex; align-items: center; gap: 4px; padding: 4px 10px; border: 1px solid var(--text-error, #ef4444); border-radius: 4px; color: var(--text-error, #ef4444); cursor: pointer; font-size: var(--font-ui-small); background: rgba(239,68,68,0.06); }
                .aii-sort-mode-label.aii-sort-active { background: rgba(239,68,68,0.16); }
                .aii-sort-mode-label input[type="checkbox"] { margin: 0; }
                .aii-drag-handle { cursor: grab; user-select: none; color: var(--text-muted); padding: 2px 4px; border-radius: 3px; }
                .aii-drag-handle:active { cursor: grabbing; }
                .aii-row-handle { font-size: 16px; line-height: 1; }
                .aii-slot-handle { display: block; text-align: center; font-size: 12px; line-height: 1; margin-bottom: 2px; }
                .aii-sortable-slot { border: 1px dashed var(--background-modifier-border); border-radius: 4px; padding: 2px; background: rgba(var(--background-secondary-rgb),0.3); }
                .aii-modal-buttons { display: flex; justify-content: flex-end; gap: 10px; margin-top: 20px; }
                .aii-modal-buttons button { height: 32px; padding: 0 16px; }
            `;
            containerEl.appendChild(style);
        } catch (e) {
            console.error("[article-info-inserter] injectStyles failed", e);
        }
    }

    buildPreviewBar(el) {
        const s = this.plugin.settings;
        const L = (key) => tr(s.language, key);

        const header = el.createDiv({ cls: "aii-preview-header" });
        header.createEl("h3", { text: L("previewTitle") });
        header.createEl("span", { cls: "aii-preview-hide-label", text: L("previewHideLabel") });
        const makeFold = (labelKey, settingKey) => {
            const wrap = header.createEl("label", { cls: "aii-preview-fold" });
            const cb = wrap.createEl("input", { type: "checkbox" });
            cb.checked = s[settingKey];
            wrap.appendText(" " + L(labelKey));
            cb.addEventListener("change", async () => {
                s[settingKey] = cb.checked;
                await this.plugin.saveSettings();
                this.refreshPreviewLayout();
            });
        };
        makeFold("previewFoldYaml", "previewFoldYaml");
        makeFold("previewFoldStart", "previewFoldStart");
        makeFold("previewFoldEnd", "previewFoldEnd");

        this.yamlLabel = el.createEl("div", { cls: "setting-item-description", text: L("previewYamlLabel") });
        this.yamlBox = el.createEl("div", { cls: "aii-preview-box" });
        // 结构图提示条：正文无标题时显示（由 refreshPreview 控制显隐）
        this.tocHintEl = el.createEl("div", { cls: "aii-preview-hint" });
        this.tocHintEl.style.display = "none";
        this.startLabel = el.createEl("div", { cls: "setting-item-description", text: L("previewStartLabel") });
        this.startBox = el.createEl("div", { cls: "aii-preview-box" });
        this.endLabel = el.createEl("div", { cls: "setting-item-description", text: L("previewEndLabel") });
        this.endBox = el.createEl("div", { cls: "aii-preview-box" });
        this.refreshPreview();
        this.refreshPreviewLayout();
    }

    refreshPreviewLayout() {
        const s = this.plugin.settings;
        if (this.yamlBox) this.yamlBox.style.display = s.previewFoldYaml ? "none" : "";
        if (this.yamlLabel) this.yamlLabel.style.display = s.previewFoldYaml ? "none" : "";
        if (this.startBox) this.startBox.style.display = s.previewFoldStart ? "none" : "";
        if (this.startLabel) this.startLabel.style.display = s.previewFoldStart ? "none" : "";
        if (this.endBox) this.endBox.style.display = s.previewFoldEnd ? "none" : "";
        if (this.endLabel) this.endLabel.style.display = s.previewFoldEnd ? "none" : "";
    }

    buildTopBar(el) {
        const self = this;
        const s = this.plugin.settings;
        const L = (key, ...args) => fmtTr(s.language, key, ...args);

        // 「language」标签：中英两种界面下都显示同一个词（用户指定，不做翻译）
        el.createEl("span", { text: "language", cls: "aii-inline-label" });
        const langSelect = el.createEl("select");
        langSelect.createEl("option", { text: L("langOptZh"), value: "zh" });
        langSelect.createEl("option", { text: L("langOptEn"), value: "en" });
        langSelect.value = s.language;
        langSelect.addEventListener("change", async () => {
            const oldLang = s.language;
            const newLang = langSelect.value;
            s.language = newLang;

            // 转译 display 中的默认值：如果某字段仍等于旧语言默认值，则换成新语言默认值；
            // 用户自定义过的字段（如作者名字、链接 URL）保持不变。
            translateDisplayDefaults(s.display, oldLang, newLang, s.codeCountMethod);

            await self.plugin.saveSettings();
            self.display();
        });

        const runBtn = el.createEl("button", { text: L("btnRun"), cls: "mod-cta" });
        runBtn.addEventListener("click", () => self.plugin.runAll());

        const restoreBtn = el.createEl("button", { text: L("btnRestore"), cls: "mod-warning" });
        restoreBtn.addEventListener("click", () => {
            const confirmMsg = s.language === "zh"
                ? "当前所有设置（包括当前语言下的行配置、显示自定义、统计规则）将恢复为默认。"
                : "Current settings for this language (row config, display custom, counting rules) will be reset to defaults.";
            new ConfirmModal(
                this.app,
                L("confirmTitle"),
                confirmMsg,
                L("confirmText"),
                L("cancelText"),
                async () => {
                    const keptLang = s.language;
                    self.plugin.settings = makeDefaultSettings();
                    self.plugin.settings.language = keptLang;
                    // 转译 display 默认值为当前语言
                    translateDisplayDefaults(self.plugin.settings.display, "zh", keptLang, self.plugin.settings.codeCountMethod);
                    await self.plugin.saveSettingsWithoutPreset();
                    new Notice(L("noticeRestored"));
                    self.display();
                }
            ).open();
        });

        // 预设区（位于顶部栏右侧）
        const presetGroup = el.createDiv({ cls: "aii-preset-group" });
        presetGroup.createEl("span", { text: L("presetTitle"), cls: "aii-preset-title" });

        for (let i = 0; i < s.presets.length; i++) {
            const preset = s.presets[i];
            const btn = presetGroup.createEl("button", {
                text: String(i + 1),
                cls: "aii-preset-btn" + (s.selectedPreset === i ? " aii-preset-active" : "")
            });
            btn.addEventListener("click", async () => {
                if (s.selectedPreset === i) return;
                // 自动保存当前设置到旧预设
                await self.plugin.saveSettings();
                // 切换到新预设
                const presetData = s.presets[i].settings;
                if (presetData) {
                    self.applyPresetSettings(presetData);
                } else {
                    // 未保存过的预设：加载默认设置
                    const keptLang = s.language;
                    const keptPresets = deepClone(s.presets);
                    self.plugin.settings = makeDefaultSettings();
                    self.plugin.settings.language = keptLang;
                    self.plugin.settings.presets = keptPresets;
                    translateDisplayDefaults(self.plugin.settings.display, "zh", keptLang, self.plugin.settings.codeCountMethod);
                }
                self.plugin.settings.selectedPreset = i;
                await self.plugin.saveSettingsWithoutPreset();
                new Notice(L("noticePresetLoaded", i + 1));
                self.display();
            });
        }

        const resetPresetBtn = presetGroup.createEl("button", {
            text: L("btnResetPreset"),
            cls: "aii-preset-btn aii-preset-reset"
        });
        resetPresetBtn.addEventListener("click", () => {
            new ConfirmModal(
                this.app,
                L("confirmTitle"),
                L("confirmResetPreset"),
                L("confirmText"),
                L("cancelText"),
                async () => {
                    const keptLang = s.language;
                    const keptPresets = deepClone(s.presets);
                    const keptSelected = s.selectedPreset;
                    self.plugin.settings = makeDefaultSettings();
                    self.plugin.settings.language = keptLang;
                    self.plugin.settings.presets = keptPresets;
                    self.plugin.settings.selectedPreset = keptSelected;
                    translateDisplayDefaults(self.plugin.settings.display, "zh", keptLang, self.plugin.settings.codeCountMethod);
                    await self.plugin.saveSettings();
                    new Notice(L("noticePresetReset"));
                    self.display();
                }
            ).open();
        });
    }

    exportPresetSettings() {
        return exportSettingsForPreset(this.plugin.settings);
    }

    applyPresetSettings(presetSettings) {
        const s = this.plugin.settings;
        const keptPresets = deepClone(s.presets);
        const keptSelected = s.selectedPreset;
        const merged = deepClone(presetSettings);
        // 若旧预设缺少 toc（新增功能前保存的），用默认 toc 补全，避免切换后该板块失效
        if (!merged.toc || typeof merged.toc !== "object") {
            merged.toc = aiiMakeDefaultTocSettings(s.language);
        } else {
            const hadLevels = merged.toc.levels !== undefined;  // 旧预设无 levels：补空级设置保持其原有外观
            const def = aiiMakeDefaultTocSettings(s.language);
            for (const k of Object.keys(def)) if (merged.toc[k] === undefined) merged.toc[k] = def[k];
            if (!hadLevels) merged.toc.levels = {};
            aiiTocEnsureLevels(merged.toc);
            aiiTocMaterializeLevels(merged.toc);
        }
        Object.assign(s, merged);
        s.presets = keptPresets;
        s.selectedPreset = keptSelected;
    }

    buildAppendTab(el) {
        const self = this;
        const s = this.plugin.settings;
        const L = (key) => tr(s.language, key);
        const sortMode = !!this.sortMode;

        const hint = el.createEl("div", { cls: "aii-hint" });
        hint.createEl("span", { cls: "aii-hint-body", text: L("appendHintBody") });
        hint.appendText("　");
        hint.createEl("span", { cls: "aii-hint-prop", text: L("appendHintProp") });

        // 排序模式开关
        const sortWrap = el.createDiv({ cls: "aii-sort-mode-wrap" });
        const sortLabel = sortWrap.createEl("label", { cls: "aii-sort-mode-label" + (sortMode ? " aii-sort-active" : "") });
        const sortCb = sortLabel.createEl("input", { type: "checkbox" });
        sortCb.checked = sortMode;
        sortLabel.appendText(" " + L("sortMode"));
        sortWrap.createEl("span", { cls: "aii-hint", text: L("sortModeHint") });
        sortCb.addEventListener("change", () => {
            this.sortMode = sortCb.checked;
            this.display();
        });

        // 行数选择：下拉框直接插入到数字位置
        const rowCountWrap = el.createDiv({ cls: "aii-row-count-wrap" });
        const parts = L("appendRowCount").split(/\{x\}|\{y\}/);
        rowCountWrap.createEl("span", { text: parts[0] });
        const prependSelect = rowCountWrap.createEl("select");
        prependSelect.disabled = sortMode;
        rowCountWrap.createEl("span", { text: parts[1] || "" });
        const appendSelect = rowCountWrap.createEl("select");
        appendSelect.disabled = sortMode;
        rowCountWrap.createEl("span", { text: parts[2] || "" });
        for (let i = 0; i <= 3; i++) {
            prependSelect.createEl("option", { text: String(i), value: String(i) });
            appendSelect.createEl("option", { text: String(i), value: String(i) });
        }
        prependSelect.value = String(s.prependRows);
        appendSelect.value = String(s.appendRows);

        function onRowCountChange() {
            s.prependRows = Number(prependSelect.value);
            s.appendRows = Number(appendSelect.value);
            self.plugin.saveSettings().then(() => {
                self.display();
                self.refreshPreview();
            });
        }
        prependSelect.addEventListener("change", onRowCountChange);
        appendSelect.addEventListener("change", onRowCountChange);

        const setupRowDrag = (handle, rowIndex) => {
            handle.addEventListener("dragstart", (e) => {
                e.dataTransfer.setData("text/aii-row", String(rowIndex));
                e.dataTransfer.effectAllowed = "move";
            });
        };

        const buildRowHeader = (rowEl, rowIndex, labelText) => {
            const row = s.rowConfigs[rowIndex];
            const header = rowEl.createDiv({ cls: "aii-row-header" });
            if (sortMode) {
                const handle = header.createEl("span", { cls: "aii-drag-handle aii-row-handle", text: "≡", attr: { draggable: "true" } });
                setupRowDrag(handle, rowIndex);
                header.createEl("span", { cls: "aii-row-label", text: labelText });
                rowEl.addEventListener("dragover", (e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; });
                rowEl.addEventListener("drop", async (e) => {
                    e.preventDefault();
                    const src = Number(e.dataTransfer.getData("text/aii-row"));
                    if (isNaN(src) || src === rowIndex) return;
                    if (Math.floor(src / 3) !== Math.floor(rowIndex / 3)) return;
                    const configs = s.rowConfigs;
                    const tmp = configs[src];
                    configs[src] = configs[rowIndex];
                    configs[rowIndex] = tmp;
                    await self.plugin.saveSettings();
                    self.display();
                });
            } else {
                header.createEl("span", { cls: "aii-row-label", text: labelText });
                const actions = header.createDiv({ cls: "aii-row-actions" });

                actions.createEl("span", { text: L("alignName") + "：" });
                const alignSelect = actions.createEl("select");
                [
                    { v: "justify", l: L("alignJustify") },
                    { v: "left", l: L("alignLeft") },
                    { v: "center", l: L("alignCenter") },
                    { v: "right", l: L("alignRight") }
                ].forEach(o => alignSelect.createEl("option", { text: o.l, value: o.v }));
                alignSelect.value = row.alignment || "justify";
                alignSelect.addEventListener("change", async () => {
                    row.alignment = alignSelect.value;
                    await self.plugin.saveSettings();
                    self.refreshPreview();
                });

                actions.createEl("span", { text: L("rowIndent") });
                const indentInput = actions.createEl("input", { type: "number", value: String(row.indent || 0), cls: "aii-indent-input" });
                indentInput.min = "0";
                indentInput.addEventListener("change", async () => {
                    row.indent = Math.max(0, Number(indentInput.value) || 0);
                    await self.plugin.saveSettings();
                    self.refreshPreview();
                });
                actions.createEl("span", { text: L("rowIndentUnit") });

                const resetBtn = actions.createEl("button", { text: L("btnReset") });
                resetBtn.addEventListener("click", async () => {
                    const defaults = getDefaultLangConfig(s.language).rowConfigs[rowIndex];
                    s.rowConfigs[rowIndex] = deepClone(defaults);
                    await self.plugin.saveSettings();
                    self.display();
                });
            }
        };

        // 首行
        for (let i = 0; i < 3; i++) {
            const hidden = !sortMode && i >= s.prependRows;
            const rowEl = el.createDiv({ cls: "aii-row" + (hidden ? " aii-hidden" : "") });
            buildRowHeader(rowEl, i, L("rowLabelStart") + (i + 1));
            const slotsEl = rowEl.createDiv({ cls: "aii-slots" });
            this.buildRowSlots(slotsEl, i, sortMode);
        }

        // 尾行：倒序启用。选择 N 行时启用最后 N 个尾行（尾行3优先）
        const endStartIdx = Math.max(0, 3 - s.appendRows);
        for (let i = 0; i < 3; i++) {
            const enabled = i >= endStartIdx;
            const hidden = !sortMode && !enabled;
            const rowEl = el.createDiv({ cls: "aii-row" + (hidden ? " aii-hidden" : "") });
            buildRowHeader(rowEl, 3 + i, L("rowLabelEnd") + (i + 1));
            const slotsEl = rowEl.createDiv({ cls: "aii-slots" });
            this.buildRowSlots(slotsEl, 3 + i, sortMode);
        }
    }


    buildRowSlots(container, rowIndex, sortMode = false) {
        const self = this;
        const s = this.plugin.settings;
        const L = (key) => tr(s.language, key);
        // 防御：行或槽位数据异常时自动补齐，避免设置页因单点脏数据整体空白
        if (!Array.isArray(s.rowConfigs)) s.rowConfigs = [];
        let row = s.rowConfigs[rowIndex];
        if (!row || typeof row !== "object") {
            row = s.rowConfigs[rowIndex] = { slots: [], alignment: "justify", indent: 0 };
        }
        if (!Array.isArray(row.slots)) row.slots = [];

        for (let i = 0; i < 5; i++) {
            let slot = row.slots[i];
            if (!slot || typeof slot !== "object") {
                slot = row.slots[i] = { tag: "none", bodyShow: "hide", propPolicy: "none" };
            }
            if (slot.tag == null) slot.tag = "none";
            if (slot.bodyShow == null) slot.bodyShow = "hide";
            if (slot.propPolicy == null) slot.propPolicy = "none";
            const slotEl = container.createDiv({ cls: "aii-slot" + (sortMode ? " aii-sortable-slot" : "") });
            if (sortMode) {
                const handle = slotEl.createEl("span", { cls: "aii-drag-handle aii-slot-handle", text: "⋮⋮", attr: { draggable: "true" } });
                handle.addEventListener("dragstart", (e) => {
                    e.dataTransfer.setData("text/aii-slot-row", String(rowIndex));
                    e.dataTransfer.setData("text/aii-slot", String(i));
                    e.dataTransfer.effectAllowed = "move";
                });
                slotEl.addEventListener("dragover", (e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; });
                slotEl.addEventListener("drop", async (e) => {
                    e.preventDefault();
                    const srcRow = Number(e.dataTransfer.getData("text/aii-slot-row"));
                    const srcSlot = Number(e.dataTransfer.getData("text/aii-slot"));
                    if (isNaN(srcRow) || isNaN(srcSlot) || srcRow !== rowIndex || srcSlot === i) return;
                    const slots = s.rowConfigs[rowIndex].slots;
                    const tmp = slots[srcSlot];
                    slots[srcSlot] = slots[i];
                    slots[i] = tmp;
                    await self.plugin.saveSettings();
                    self.display();
                });
            }

            const tagSelect = slotEl.createEl("select");
            if (sortMode) tagSelect.disabled = true;
            for (const tagId of TAG_OPTIONS) {
                tagSelect.createEl("option", { text: self.tagLabel(tagId), value: tagId });
            }
            tagSelect.value = slot.tag;

            const bodySelect = slotEl.createEl("select", { cls: "aii-body-select" });
            if (sortMode) bodySelect.disabled = true;
            bodySelect.createEl("option", { text: L("bodyShow"), value: "show" });
            bodySelect.createEl("option", { text: L("bodyHide"), value: "hide" });
            bodySelect.value = slot.bodyShow;

            const propSelect = slotEl.createEl("select", { cls: "aii-prop-select" });
            if (sortMode) propSelect.disabled = true;
            propSelect.createEl("option", { text: L("propNone"), value: "none" });
            propSelect.createEl("option", { text: L("propWrite"), value: "write" });
            propSelect.createEl("option", { text: L("propDelete"), value: "delete" });
            propSelect.createEl("option", { text: L("propClear"), value: "clear" });
            propSelect.value = slot.propPolicy;

            if (!sortMode) {
                function save() {
                    slot.tag = tagSelect.value;
                    slot.bodyShow = bodySelect.value;
                    slot.propPolicy = propSelect.value;
                    self.plugin.saveSettings().then(() => {
                        if (self.activeTab === "display") self.display();
                        else self.refreshPreview();
                    });
                }
                tagSelect.addEventListener("change", () => {
                    const oldTag = slot.tag;
                    const newTag = tagSelect.value;
                    if (oldTag === "none" && newTag !== "none") {
                        bodySelect.value = "show";
                        propSelect.value = "none";
                    } else if (oldTag !== "none" && newTag === "none") {
                        bodySelect.value = "hide";
                        propSelect.value = "none";
                    }
                    save();
                });
                bodySelect.addEventListener("change", save);
                propSelect.addEventListener("change", save);
            }
        }
    }


    tagLabel(tagId) {
        return getTagLabel(this.plugin.settings, tagId);
    }

    buildRulesTab(el) {
        const self = this;
        const s = this.plugin.settings;
        const L = (key) => tr(s.language, key);

        el.createEl("h3", { text: L("rulesWordTitle") });
        new Setting(el).setName(L("rulesCountPunctuation")).setDesc(L("rulesCountPunctuationDesc"))
            .addToggle(t => t.setValue(s.countPunctuation).onChange(async v => { s.countPunctuation = v; await self.plugin.saveSettings(); self.refreshPreview(); }));

        el.createEl("h3", { text: L("rulesReadingTitle") });
        new Setting(el).setName(L("rulesReadingSpeed"))
            .addText(t => t.setValue(String(s.readingSpeed)).onChange(async v => { const n = Number(v); s.readingSpeed = isNaN(n) || n < 1 ? 300 : n; await self.plugin.saveSettings(); self.refreshPreview(); }));
        new Setting(el).setName(L("rulesPageSize"))
            .addText(t => t.setValue(String(s.pageSize)).onChange(async v => { const n = Number(v); s.pageSize = isNaN(n) || n < 1 ? 600 : n; await self.plugin.saveSettings(); self.refreshPreview(); }));

        // 显示 1 位小数 / 显示具体时间：四开关两列右对齐
        const grid = el.createDiv({ cls: "aii-rules-grid" });
        grid.createEl("span", { cls: "aii-rules-label", text: L("rulesDecimal") });
        const rdWrap = grid.createDiv({ cls: "aii-inline-toggle" });
        rdWrap.createEl("label", { text: L("rulesDecimalReadingTime") });
        new ToggleComponent(rdWrap).setValue(s.readingTimeDecimal).onChange(async v => { s.readingTimeDecimal = v; await self.plugin.saveSettings(); self.refreshPreview(); });
        const pdWrap = grid.createDiv({ cls: "aii-inline-toggle" });
        pdWrap.createEl("label", { text: L("rulesDecimalPageCount") });
        new ToggleComponent(pdWrap).setValue(s.pageCountDecimal).onChange(async v => { s.pageCountDecimal = v; await self.plugin.saveSettings(); self.refreshPreview(); });

        grid.createEl("span", { cls: "aii-rules-label", text: L("timeShowClock") });
        const ctWrap = grid.createDiv({ cls: "aii-inline-toggle" });
        ctWrap.createEl("label", { text: L("timeCreated") });
        new ToggleComponent(ctWrap).setValue(s.timeWithClockCreated).onChange(async v => { s.timeWithClockCreated = v; await self.plugin.saveSettings(); self.refreshPreview(); });
        const mtWrap = grid.createDiv({ cls: "aii-inline-toggle" });
        mtWrap.createEl("label", { text: L("timeModified") });
        new ToggleComponent(mtWrap).setValue(s.timeWithClockModified).onChange(async v => { s.timeWithClockModified = v; await self.plugin.saveSettings(); self.refreshPreview(); });

        el.createEl("h3", { text: L("rulesFilterTitle") });
        new Setting(el).setName(L("rulesCharMethod")).setDesc(L("rulesCharMethodDesc"))
            .addDropdown(dd => dd
                .addOption("exclude_whitespace", L("charMethodExcludeWs"))
                .addOption("include_whitespace", L("charMethodIncludeWs"))
                .setValue(s.charCountMethod)
                .onChange(async v => { s.charCountMethod = v; await self.plugin.saveSettings(); self.refreshPreview(); }));
        new Setting(el).setName(L("rulesExcludeComments")).setDesc(L("rulesExcludeCommentsDesc"))
            .addToggle(t => t.setValue(s.excludeComments).onChange(async v => { s.excludeComments = v; await self.plugin.saveSettings(); self.refreshPreview(); }));
        new Setting(el).setName(L("rulesExcludeCode")).setDesc(L("rulesExcludeCodeDesc"))
            .addToggle(t => t.setValue(s.excludeCodeBlocks).onChange(async v => { s.excludeCodeBlocks = v; await self.plugin.saveSettings(); self.refreshPreview(); }));
        new Setting(el).setName(L("rulesExcludeInlineCode")).setDesc(L("rulesExcludeInlineCodeDesc"))
            .addToggle(t => t.setValue(s.excludeInlineCode).onChange(async v => { s.excludeInlineCode = v; await self.plugin.saveSettings(); self.refreshPreview(); }));
        new Setting(el).setName(L("rulesExcludeLinkInvisible")).setDesc(L("rulesExcludeLinkInvisibleDesc"))
            .addToggle(t => t.setValue(s.excludeLinkInvisible).onChange(async v => { s.excludeLinkInvisible = v; await self.plugin.saveSettings(); self.refreshPreview(); }));
        new Setting(el).setName(L("rulesLinkExcludeImages")).setDesc(L("rulesLinkExcludeImagesDesc"))
            .addToggle(t => t.setValue(s.linkCountExcludeImages).onChange(async v => { s.linkCountExcludeImages = v; await self.plugin.saveSettings(); self.refreshPreview(); }));
        new Setting(el).setName(L("rulesExcludeAppendedImages")).setDesc(L("rulesExcludeAppendedImagesDesc"))
            .addToggle(t => t.setValue(s.excludeAppendedImages).onChange(async v => { s.excludeAppendedImages = v; await self.plugin.saveSettings(); self.refreshPreview(); }));
        new Setting(el).setName(L("rulesExcludeFootnotes")).setDesc(L("rulesExcludeFootnotesDesc"))
            .addToggle(t => t.setValue(s.excludeFootnotes).onChange(async v => { s.excludeFootnotes = v; await self.plugin.saveSettings(); self.refreshPreview(); }));
        new Setting(el).setName(L("rulesCodeCountTitle"))
            .addDropdown(dd => dd
                .addOption("block", L("codeCountBlock"))
                .addOption("line", L("codeCountLine"))
                .setValue(s.codeCountMethod)
                .onChange(async v => {
                    const oldMethod = s.codeCountMethod;
                    s.codeCountMethod = v;
                    // 同步更新“代码”显示默认单位：仅当用户未自定义时才跟随变化
                    const oldSuffix = getCodeCountSuffix(oldMethod, s.language);
                    const newSuffix = getCodeCountSuffix(v, s.language);
                    const cd = s.display.code_count || {};
                    if (cd.suffix === oldSuffix) {
                        cd.suffix = newSuffix;
                    }
                    await self.plugin.saveSettings();
                    self.display();
                    self.refreshPreview();
                }));
        new Setting(el).setName(L("rulesExcludeEmbeds")).setDesc(L("rulesExcludeEmbedsDesc"))
            .addToggle(t => t.setValue(s.excludeEmbeds).onChange(async v => { s.excludeEmbeds = v; await self.plugin.saveSettings(); self.refreshPreview(); }));
        new Setting(el).setName(L("rulesExcludeHashtags")).setDesc(L("rulesExcludeHashtagsDesc"))
            .addToggle(t => t.setValue(s.excludeHashtags).onChange(async v => { s.excludeHashtags = v; await self.plugin.saveSettings(); self.refreshPreview(); }));
        new Setting(el).setName(L("rulesExcludeLatex")).setDesc(L("rulesExcludeLatexDesc"))
            .addToggle(t => t.setValue(s.excludeLatex).onChange(async v => { s.excludeLatex = v; await self.plugin.saveSettings(); self.refreshPreview(); }));
        new Setting(el).setName(L("rulesCountEmoji")).setDesc(L("rulesCountEmojiDesc"))
            .addToggle(t => t.setValue(s.countEmoji).onChange(async v => { s.countEmoji = v; await self.plugin.saveSettings(); self.refreshPreview(); }));
        new Setting(el).setName(L("linkImageSingleWarning")).setDesc(L("linkImageSingleWarningDesc"))
            .addToggle(t => t.setValue(s.linkImageSingleWarning).onChange(async v => { s.linkImageSingleWarning = v; await self.plugin.saveSettings(); }));
    }

    buildDisplayTab(el) {
        const self = this;
        const s = this.plugin.settings;
        const L = (key) => tr(s.language, key);

        el.createEl("h3", { text: L("displayTitle") });
        el.createEl("div", { cls: "setting-item-description", text: L("displayDesc") });

        const usedTags = new Set();
        for (const row of s.rowConfigs) {
            if (!row) continue;
            for (const slot of row.slots) {
                if (slot.tag && slot.tag !== "none") usedTags.add(slot.tag);
            }
        }

        // 分隔符（移到显示自定义 tab）
        const sepWrap = el.createDiv({ cls: "aii-display-row" });
        sepWrap.createEl("span", { text: L("separatorName") });
        const sepInput = sepWrap.createEl("input", { type: "text", value: s.separator, placeholder: "｜" });
        sepInput.style.width = "60px";
        sepInput.addEventListener("change", async () => {
            s.separator = sepInput.value;
            await self.plugin.saveSettings();
            self.refreshPreview();
        });
        const sepDesc = sepWrap.createEl("span", { cls: "aii-hint", text: L("separatorDesc") });
        sepDesc.style.marginLeft = "8px";

        if (usedTags.size === 0) {
            el.createEl("div", { cls: "setting-item-description", text: L("noneText") });
            return;
        }

        const sorted = Array.from(usedTags).sort((a, b) => TAG_OPTIONS.indexOf(a) - TAG_OPTIONS.indexOf(b));
        for (const tagId of sorted) {
            this.buildDisplayRow(el, tagId);
        }
    }

    buildDisplayRow(el, tagId) {
        const self = this;
        const s = this.plugin.settings;
        const L = (key) => tr(s.language, key);
        const meta = tagMeta(tagId);
        const d = s.display[tagId] || {};
        const defaults = makeDisplayDefaults(s.language, s.codeCountMethod)[tagId] || {};

        const row = el.createDiv({ cls: "aii-display-row" });
        row.createEl("div", { cls: "aii-display-tag", text: self.tagLabel(tagId) });
        const pair = row.createDiv({ cls: tagId === "author" ? "aii-input-pair aii-author-pair" : "aii-input-pair" });

        if (meta.isLinkImage) {
            const nameInput = pair.createEl("input", { type: "text", value: d.linkName || "", cls: "aii-link-name" });
            nameInput.placeholder = L("displayLinkName");
            const urlInput = pair.createEl("input", { type: "text", value: d.url || "", cls: "aii-link-url" });
            urlInput.placeholder = L("displayUrl");
            const forceWrap = row.createEl("label", { cls: "aii-force-image-toggle" });
            const forceCb = forceWrap.createEl("input", { type: "checkbox" });
            forceCb.checked = d.forceImage || false;
            forceWrap.createEl("span", { text: L("displayForceImage") });

            async function saveLink() {
                d.linkName = nameInput.value;
                d.url = urlInput.value;
                d.forceImage = forceCb.checked;
                await self.plugin.saveSettings();
                self.refreshPreview();
            }
            nameInput.addEventListener("change", saveLink);
            urlInput.addEventListener("change", saveLink);
            urlInput.addEventListener("paste", (evt) => {
                const text = (evt.clipboardData || window.clipboardData).getData("text");
                if (!text) return;
                const trimmed = text.trim();
                const wrappedInQuotes = (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
                    (trimmed.startsWith("'") && trimmed.endsWith("'"));
                if (!wrappedInQuotes) return;
                evt.preventDefault();
                const cleaned = trimmed.slice(1, -1).trim();
                urlInput.value = cleaned;
                d.url = cleaned;
                self.plugin.saveSettings().then(() => self.refreshPreview());
            });
            forceCb.addEventListener("change", saveLink);
        } else if (tagId === "author" || !meta.isCustom) {
            const preInput = pair.createEl("input", { type: "text", value: d.prefix || "", cls: "aii-prefix" });
            preInput.placeholder = L("displayPrefix");
            const sufInput = pair.createEl("input", { type: "text", value: d.suffix || "", cls: "aii-suffix" });
            sufInput.placeholder = L("displaySuffix");

            const formatWrap = row.createEl("div", { cls: "aii-format-wrap" });
            const boldBtn = formatWrap.createEl("button", { text: "B", cls: "aii-format-btn" + (d.bold ? " aii-format-active" : "") });
            const italicBtn = formatWrap.createEl("button", { text: "I", cls: "aii-format-btn" + (d.italic ? " aii-format-active" : "") });
            boldBtn.title = L("加粗");
            italicBtn.title = L("斜体");

            const colorWrap = row.createEl("div", { cls: "aii-color-wrap" });
            const colorInput = colorWrap.createEl("input", { type: "color", value: d.color || "#000000", cls: "aii-color-input" });
            const clearColor = colorWrap.createEl("button", { text: "×", cls: "aii-color-clear" });
            clearColor.title = L("colorClear") || "清除颜色";

            async function saveText() {
                d.prefix = preInput.value;
                d.suffix = sufInput.value;
                await self.plugin.saveSettings();
                self.refreshPreview();
            }
            preInput.addEventListener("change", saveText);
            sufInput.addEventListener("change", saveText);
            colorInput.addEventListener("change", async () => {
                d.color = colorInput.value;
                await self.plugin.saveSettings();
                self.refreshPreview();
            });
            clearColor.addEventListener("click", async () => {
                d.color = "";
                colorInput.value = "#000000";
                await self.plugin.saveSettings();
                self.refreshPreview();
            });
            boldBtn.addEventListener("click", async () => {
                d.bold = !d.bold;
                boldBtn.classList.toggle("aii-format-active", d.bold);
                await self.plugin.saveSettings();
                self.refreshPreview();
            });
            italicBtn.addEventListener("click", async () => {
                d.italic = !d.italic;
                italicBtn.classList.toggle("aii-format-active", d.italic);
                await self.plugin.saveSettings();
                self.refreshPreview();
            });
        } else {
            const textInput = pair.createEl("input", { type: "text", value: d.text || "", cls: "aii-custom-text" });
            textInput.placeholder = L("customRowWhole");

            const formatWrap = row.createEl("div", { cls: "aii-format-wrap" });
            const boldBtn = formatWrap.createEl("button", { text: "B", cls: "aii-format-btn" + (d.bold ? " aii-format-active" : "") });
            const italicBtn = formatWrap.createEl("button", { text: "I", cls: "aii-format-btn" + (d.italic ? " aii-format-active" : "") });
            boldBtn.title = L("加粗");
            italicBtn.title = L("斜体");

            const colorWrap = row.createEl("div", { cls: "aii-color-wrap" });
            const colorInput = colorWrap.createEl("input", { type: "color", value: d.color || "#000000", cls: "aii-color-input" });
            const clearColor = colorWrap.createEl("button", { text: "×", cls: "aii-color-clear" });
            clearColor.title = L("colorClear") || "清除颜色";

            async function saveCustom() {
                d.text = textInput.value;
                await self.plugin.saveSettings();
                self.refreshPreview();
            }
            textInput.addEventListener("change", saveCustom);
            colorInput.addEventListener("change", async () => {
                d.color = colorInput.value;
                await self.plugin.saveSettings();
                self.refreshPreview();
            });
            clearColor.addEventListener("click", async () => {
                d.color = "";
                colorInput.value = "#000000";
                await self.plugin.saveSettings();
                self.refreshPreview();
            });
            boldBtn.addEventListener("click", async () => {
                d.bold = !d.bold;
                boldBtn.classList.toggle("aii-format-active", d.bold);
                await self.plugin.saveSettings();
                self.refreshPreview();
            });
            italicBtn.addEventListener("click", async () => {
                d.italic = !d.italic;
                italicBtn.classList.toggle("aii-format-active", d.italic);
                await self.plugin.saveSettings();
                self.refreshPreview();
            });
        }

        row.createEl("button", { text: L("btnReset") }).addEventListener("click", async () => {
            s.display[tagId] = Object.assign({}, defaults);
            await self.plugin.saveSettings();
            self.display();
            self.refreshPreview();
        });
    }

    async refreshPreview() {
        try {
            const plugin = this.plugin;
            const s = plugin.settings;
            const L = (key) => tr(s.language, key);

            // 先构造预览用 insertedMap（与执行时一致），供去重与计数共用
            const previewInsertedMap = {};
            for (let i = 1; i <= 4; i++) {
                const tag = "link_image_" + i;
                const d = s.display[tag];
                if (!d || !d.url) continue;
                previewInsertedMap[tag] = {
                    url: d.url,
                    isImage: d.forceImage || isImageUrl(d.url),
                    label: d.linkName || ""
                };
            }

            let previewSample;
            let previewStat = { ctime: Date.now(), mtime: Date.now() };

            // 优先用当前活动笔记的真实正文做预览，让“效果预览”与执行结果一致；
            // 没有活动文件或读取失败时回退到内置示例文本。
            const activeFile = plugin.app && plugin.app.workspace && plugin.app.workspace.getActiveFile
                ? plugin.app.workspace.getActiveFile()
                : null;
            if (activeFile && activeFile.extension === "md") {
                try {
                    const content = await plugin.app.vault.read(activeFile);
                    const fm = content.match(/^---\r?\n[\s\S]*?\r?\n---\r?\n/);
                    let body = fm ? content.slice(fm[0].length) : content;
                    // 标记清除统一交给 removeOldMarker（围栏感知 + 单行完整），
                    // ⛔ 此处不再单独用一套正则：原先那套无行首锚点、可跨行，比写入路径更宽松，
                    //    会把行中间提及 data-aii="marker" 的普通文字也一起删掉（2026-10-05 实测）。
                    // 与“执行文章信息插入”保持一致：对正文中与 link_image_* 重复的网络图/链接做去重，
                    // 否则预览图片数会比实际写入结果多算（已配置为追加项的网络图在正文里又出现一次）。
                    body = await plugin.removeOldMarker(body, activeFile, previewInsertedMap);
                    previewSample = body;
                    const stat = activeFile.stat || {};
                    previewStat = { ctime: stat.ctime || Date.now(), mtime: stat.mtime || Date.now() };
                } catch (e) {
                    previewSample = null;
                }
            }

            if (!previewSample) {
                // 预览区示例文本：包含中英文、本地/网络图片、Markdown 链接与 Wiki 链接。
                previewSample = `Hello, world! 这是一段用于预览的示例文本，包含 空格 与 标点。

我们可以在这里测试字数统计效果。这段文字里有中英文混合 content，以及几个链接和图片。

![](https://mmbiz.qpic.cn/example/640?tp=webp)

![](<./assets/example.png>)

访问 [示例网站](https://example.com) 获取更多信息，也可以查看 [[内部链接示例]]。`;
            }

            // 文档结构图预览：生成 SVG 并以内联 data URI 插入，不写文件、不污染正文
            let tocNoHeadings = false;
            if (plugin.getDisplayedLinkImageTags().has("toc_diagram")) {
                const headings = aiiParseHeadings(previewSample);
                if (headings && headings.length) {
                    const noteTitle = (activeFile && activeFile.basename) || "";
                    const svg = generateTocSvg(headings, Object.assign({}, s.toc, { genId: "toc-preview" }), noteTitle);
                    if (svg) {
                        const dataUri = "data:image/svg+xml;base64," + Buffer.from(svg, "utf8").toString("base64");
                        previewInsertedMap["toc_diagram"] = { url: dataUri, isImage: true, label: "" };
                    }
                } else {
                    tocNoHeadings = true;   // 正文无标题：结构图不出现，用提示条说明原因
                }
            }
            if (this.tocHintEl) {
                if (tocNoHeadings) {
                    this.tocHintEl.textContent = L("tocNoHeadingsHint");
                    this.tocHintEl.style.display = "";
                } else {
                    this.tocHintEl.style.display = "none";
                }
            }

            const stats = plugin.calculateStats(previewSample, previewStat, previewInsertedMap);
            const markers = plugin.buildMarkers(stats, previewInsertedMap);
            const yaml = plugin.updateYaml("", stats);

            const renderBox = (box, rows) => {
                if (!box) return;
                box.innerHTML = "";
                if (!rows || rows.length === 0) {
                    box.textContent = L("noneText");
                    return;
                }
                for (const row of rows) {
                    const div = box.createDiv({ cls: "aii-preview-row" });
                    div.style.textAlign = row.alignment === "justify" ? "justify" : row.alignment;
                    div.style.paddingLeft = (Number(row.indent) || 0) > 0 ? `${Number(row.indent)}em` : "";

                    if (row.isRawMarkdown) {
                        // 基础模式：直接显示原生 Markdown 图片/链接的渲染效果
                        const img = row.html.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
                        const link = row.html.match(/^\[([^\]]*)\]\(([^)]+)\)$/);
                        if (img) {
                            let src = img[2];
                            if (src.startsWith("<") && src.endsWith(">")) src = src.slice(1, -1);
                            const imgEl = div.createEl("img", { attr: { src: src, alt: img[1] } });
                            imgEl.style.maxWidth = "100%";
                        } else if (link) {
                            div.createEl("a", { text: link[1] || link[2], attr: { href: link[2] } });
                        } else {
                            div.textContent = row.html;
                        }
                        continue;
                    }

                    const m = row.html.match(/^<div[^>]*data-aii=["']marker["'][^>]*>([\s\S]*)<\/div>$/);
                    const content = m ? m[1] : row.html;
                    div.innerHTML = content;
                }
            };

            if (this.yamlBox) this.yamlBox.textContent = yaml || L("noneText");
            renderBox(this.startBox, markers.startRows);
            renderBox(this.endBox, markers.endRows);
        } catch (e) {
            console.error("[article-info-inserter] refreshPreview error:", e);
        }
    }
}

module.exports = ArticleInfoInserterPlugin;
