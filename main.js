const { Plugin, Notice, PluginSettingTab, Setting, ToggleComponent, Modal, normalizePath } = require("obsidian");

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
        noticeRestored: "已恢复默认设置",
        noticeLinkImageOnly: "链接与图片所在行只能单独显示图片或链接，请将该行其他标签移除",
        noticeInvalidUrl: "无效的链接或图片地址",
        noticeRunError: "执行失败",

        langName: "界面语言",
        langOptZh: "中文",
        langOptEn: "English",

        previewTitle: "效果预览",
        previewYamlLabel: "属性区（Frontmatter）：",
        previewStartLabel: "正文开头标记（无则显示“无”）：",
        previewEndLabel: "正文末尾标记（无则显示“无”）：",
        noneText: "无",
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
        slotLabel: "标签",
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
        displayColor: "文字颜色",
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
        warnText: "本插件在正文中插入一行 HTML 块（<div data-aii=\"marker\">…</div>）来实现对齐、缩进与定位，导出 HTML/Word 时不会额外打印隐藏内容。使用本插件时，请勿自行设置该格式；调整对齐、缩进或文字颜色后，再次执行会正常替换已插入的标记。\n注意：某些主题会将加粗+斜体的连续三个星号（***…***）渲染为多彩字，关闭该主题的对应效果即可正常显示。"
    },
    en: {
        ribbonTitle: "Update article info",
        commandName: "Update article info",
        noticeNoFile: "No file is open",
        noticeOnlyMd: "Only Markdown files are supported",
        noticeUpdated: "Updated",
        noticeNoChange: "Stats unchanged",
        noticeRestored: "Settings restored to defaults",
        noticeLinkImageOnly: "A row containing a link/image tag can only display that image or link. Please remove other tags from this row.",
        noticeInvalidUrl: "Invalid link or image URL",
        noticeRunError: "Execution failed",

        langName: "Interface language",
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
        slotLabel: "Tag",
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
        displayColor: "Text color",
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
        warnText: "This plugin inserts a single-line HTML block (`<div data-aii=\"marker\">…</div>`) into the note body for alignment, indentation and locating markers. It will not print extra hidden content when exporting to HTML/Word. Do not manually use this format. Changing alignment, indentation or text color will still replace the inserted markers correctly on re-run.\nNote: some themes render bold+italic (***...***) as multicolored text; disabling that theme's effect restores normal display."
    }
};

function tr(lang, key) {
    const dict = I18N[lang] || I18N.zh;
    return dict[key] != null ? dict[key] : key;
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

// 首次运行（无本地配置）时，根据 Obsidian 或系统语言自动选择默认语言：
// 中文（含简体/繁体）→ 中文；非中文 → 英文。
function detectDefaultLanguage() {
    try {
        const obsLang = (typeof window !== "undefined") ? window.localStorage.getItem("app-locale") : null;
        if (obsLang && /^zh/i.test(obsLang)) return "zh";
        const sysLang = (typeof navigator !== "undefined" && navigator.language) || "";
        if (/^zh/i.test(sysLang)) return "zh";
    } catch (e) {
        // 读取失败则回退到英文
    }
    return "en";
}

function makeDefaultSettings() {
    const lang = detectDefaultLanguage();
    const codeCountMethod = "line";
    const defaultConfig = getDefaultLangConfig(lang, codeCountMethod);
    return {
        version: "2.0.2",
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
        linkImageSingleWarning: false,

        separator: "｜",
        previewFoldYaml: false,
        previewFoldStart: false,
        previewFoldEnd: false,

        display: deepClone(defaultConfig.display),

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
function escapeRegExp(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

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

function isImageUrl(url) {
    if (!url) return false;
    const ext = "png|jpg|jpeg|gif|bmp|svg|webp|heic|jxl|avif";
    const u = String(url);
    // 常见图片扩展名
    if (new RegExp("\\.(" + ext + ")([?#]|$)", "i").test(u)) return true;
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
    if ((info.type === "vault" || info.type === "external") && info.absolutePath) {
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
    const folder = resolveAttachmentFolder(app.vault.getConfig("attachmentFolderPath"), file);
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

// ═══════════════════════════════════════════════════════════════
// 插件主类
// ═══════════════════════════════════════════════════════════════
module.exports = class ArticleInfoInserterPlugin extends Plugin {
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

    async removeOldMarker(text, file, insertedMap) {
        // 本插件写入的标记：单行 <div ... data-aii="marker">...</div>
        const markerRe = /^[ \t]*<div[^>]*data-aii=["']marker["'][^>]*>[\s\S]*?<\/div>[ \t]*\r?\n?/gm;
        let result = text.replace(markerRe, "");
        // 兼容早期可能残留的 HTML 注释标记 <!-- aii-marker-start/end -->
        const commentRe = /^[ \t]*<!--\s*aii-marker-start\s*-->[ \t]*\r?\n[\s\S]*?\r?\n[ \t]*<!--\s*aii-marker-end\s*-->[ \t]*\r?\n?/gm;
        result = result.replace(commentRe, "");

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
                    result = lines.filter((_, idx) => !toRemove.has(idx)).join("\n");
                    console.log("[article-info-inserter] 去重：计划本地md5 =", plannedImageMd5.size,
                        "计划网络url =", plannedNetworkUrl.size,
                        "删除行数 =", toRemove.size, "md5 =", [...plannedImageMd5]);
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

        // 3) 裸 URL：先完整剥离 Markdown / Wiki 链接结构，
        //    避免链接别名本身是 URL 时被重复计数（如 [https://a.com](https://a.com) 算成两条）
        const linkFreeText = text.replace(mdLinkRe, " ").replace(wikiLinkRe, " ");
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

        const L = (key, ...args) => {
            let text = tr(s.language, key);
            for (let i = 0; i < args.length; i++) text = text.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
            return text;
        };
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
            { id: "display", label: L("tabDisplay") }
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

        // 底部警示
        const warn = containerEl.createDiv({ cls: "aii-warning" });
        warn.createEl("strong", { text: L("warnTitle") });
        warn.createEl("div", { text: L("warnText") });
    }

    injectStyles(containerEl) {
        try {
            if (containerEl.querySelector("#aii-style")) return;
            const style = document.createElement("style");
            style.id = "aii-style";
            style.textContent = `
                .aii-preview-bar { padding: 4px 0 6px; border-bottom: 1px solid var(--background-modifier-border); }
                .aii-preview-header { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 6px; }
                .aii-preview-header h3 { margin: 0; font-size: var(--font-ui-medium); }
                .aii-preview-fold { font-size: var(--font-ui-smaller); color: var(--text-muted); display: inline-flex; align-items: center; gap: 4px; cursor: pointer; }
                .aii-preview-fold input { margin: 0; }
                .aii-preview-box { background: var(--background-secondary); padding: 8px 12px; border-radius: 4px; margin: 4px 0; white-space: pre-wrap; word-break: break-all; overflow-wrap: anywhere; max-width: 100%; font-size: var(--font-ui-smaller); line-height: 1.5; }
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
                .aii-color-input { width: 60px; height: 24px; padding: 0; border: none; background: none; cursor: pointer; }
                .aii-color-wrap { flex: 0 0 auto; display: flex; align-items: center; gap: 2px; justify-content: flex-end; }
                .aii-color-clear { width: 20px; height: 20px; padding: 0; line-height: 1; font-size: var(--font-ui-smallest); }
                .aii-format-wrap { flex: 0 0 auto; display: flex; align-items: center; gap: 2px; }
                .aii-format-btn { min-width: 20px; height: 20px; padding: 0 3px; line-height: 1; font-size: var(--font-ui-smallest); border: 1px solid var(--background-modifier-border); background: var(--background-primary); color: var(--text-muted); border-radius: 3px; cursor: pointer; }
                .aii-format-btn.aii-format-active { border-color: var(--interactive-accent); color: var(--interactive-accent); font-weight: 700; }
                .aii-force-image-toggle { flex: 0 0 90px; display: inline-flex; align-items: center; gap: 4px; justify-content: flex-end; white-space: nowrap; font-size: var(--font-ui-small); color: var(--text-normal); cursor: pointer; }
                .aii-force-image-toggle input[type="checkbox"] { width: auto; height: auto; min-width: 16px; min-height: 16px; margin: 0; flex: 0 0 auto; }
                .aii-force-image-toggle span { text-align: right; min-width: 2em; }
                .aii-tab-content { padding-left: 0; padding-right: 0; }
                .aii-tab-content > h3 { margin-left: 0; margin-right: 0; padding-left: 0; }
                .aii-tab-content .setting-item { align-items: center; }
                .aii-tab-content .setting-item-info { padding: 4px 0; }
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
        const L = (key, ...args) => {
            let text = tr(s.language, key);
            for (let i = 0; i < args.length; i++) text = text.replace(new RegExp("\\{" + i + "\\}", "g"), args[i]);
            return text;
        };

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
        Object.assign(s, deepClone(presetSettings));
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
            boldBtn.title = "加粗";
            italicBtn.title = "倾斜";

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
            boldBtn.title = "加粗";
            italicBtn.title = "倾斜";

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

    refreshPreview() {
        const plugin = this.plugin;
        const s = plugin.settings;
        const L = (key) => tr(s.language, key);

        // 预览区示例文本：包含中英文、本地/网络图片、Markdown 链接与 Wiki 链接。
        // 预览统计直接调用 calculateStats，确保预览数值与正文运行逻辑一致。
        const previewSample = `Hello, world! 这是一段用于预览的示例文本，包含 空格 与 标点。

我们可以在这里测试字数统计效果。这段文字里有中英文混合 content，以及几个链接和图片。

![](https://mmbiz.qpic.cn/example/640?tp=webp)

![](<./assets/example.png>)

访问 [示例网站](https://example.com) 获取更多信息，也可以查看 [[内部链接示例]]。`;
        const previewStat = { ctime: Date.now(), mtime: Date.now() };

        // 先构造预览用 insertedMap，再调用 calculateStats（顺序不可颠倒）
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
                        const imgEl = div.createEl("img", { attr: { src: img[2], alt: img[1] } });
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
    }
}
