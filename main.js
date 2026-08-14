const { Plugin, Notice, PluginSettingTab, Setting } = require("obsidian");

// ─────────────────────────────────────
// 多语言文案
// ─────────────────────────────────────
const I18N = {
    zh: {
        ribbonTitle: "更新字数与图片统计",
        commandName: "更新字数与图片统计",
        noticeNoFile: "没有打开的文件",
        noticeOnlyMd: "只支持 Markdown 文件",
        noticeUpdated: "更新完成: {w}字, {i}张图",
        noticeNoChange: "统计结果未变化",
        noticeRestored: "已恢复默认设置",

        langName: "界面语言",
        langDesc: "中文 / English",
        langOptZh: "中文",
        langOptEn: "English",

        sectionBody: "① 正文中显示的内容",
        setNameWord: "显示字数",
        setDescWord: "在正文中插入字数统计",
        setNameImage: "显示图片数量",
        setDescImage: "在正文中插入图片统计",
        setNameReading: "显示阅读用时",
        setDescReading: "在字数之后、图片之前插入阅读用时",
        setNameModified: "显示完成时间",
        setDescModified: "在正文中插入文章最后编辑时间",
        setNameTimeClock: "完成时间含具体时间",
        setDescTimeClock: "开启后日期后附加 时:分（24小时制）；同时控制属性区是否带时间",
        setNameAuthor: "显示作者/自定义",
        setDescAuthor: "在正文中插入自定义文本（不写入属性区）",
        setNameAuthorText: "作者/自定义文本",
        setDescAuthorText: "正文标记中显示的自定义文本",
        setNameWpm: "每分钟阅读字数",
        setDescWpm: "用于计算阅读用时，与上方开关独立，始终可调整",

        sectionFm: "② 属性中显示的内容",
        setNameFmEnabled: "启用属性区写入",
        setDescFmEnabled: "总开关：关闭后下方字段的下拉框仍可独立设置删除/清空策略",
        fmDropChar: "char_count（字数）",
        fmDropRead: "reading_time（阅读用时）",
        fmDropImage: "image_count（图片数）",
        fmDropModified: "modified_time（完成时间）",
        fmOptWrite: "写入字段及数值",
        fmOptDelete: "不写入/删除字段及数值",
        fmOptClear: "保留字段但无数值",

        sectionBodySettings: "③ 正文显示内容设置",
        inputWordPrefix: "字数前缀文字",
        inputWordUnit: "字数后单位",
        inputReadingPrefix: "阅读时长前缀",
        inputReadingUnit: "阅读时长单位",
        inputImagePrefix: "图片数前缀",
        inputImageUnit: "图片后单位",
        inputModifiedPrefix: "完成时间前缀",
        inputSeparator: "分隔符",
        btnReset: "重置",

        sectionPosition: "④ 位置设置",
        posDesc: "选择每个元素放置在全文开头还是末尾；放在末尾时，其后会保留有且仅有一个空行。",
        posNameWord: "字数位置",
        posNameReading: "阅读用时位置",
        posNameImage: "图片数位置",
        posNameModified: "完成时间位置",
        posNameAuthor: "作者/自定义位置",
        posOptStart: "全文开头",
        posOptEnd: "全文末尾",

        sectionPreview: "⑤ 效果预览",
        prevYamlLabel: "属性区（Frontmatter）：",
        prevStartLabel: "正文开头标记（无则显示“无”）：",
        prevEndLabel: "正文末尾标记（无则显示“无”）：",
        noneText: "无",

        sectionOps: "⑥ 操作",
        btnRun: "执行更新",
        btnRestore: "恢复默认设置",

        warnTitle: "⚠️ 使用警示",
        warnText: "插件清除旧的文章信息标记使用的是格式匹配：凡是符合「*[XXX]*」格式的行都会被删除。因此使用本插件时，请勿在笔记中自行设置这种格式；另外，添加信息标记后，如果调整了标记格式，也会导致再次执行时无法清除旧有标记。"
    },
    en: {
        ribbonTitle: "Update word & image stats",
        commandName: "Update word & image stats",
        noticeNoFile: "No file is open",
        noticeOnlyMd: "Only Markdown files are supported",
        noticeUpdated: "Updated: {w} chars, {i} images",
        noticeNoChange: "Stats unchanged",
        noticeRestored: "Settings restored to defaults",

        langName: "Interface language",
        langDesc: "Chinese / English",
        langOptZh: "中文",
        langOptEn: "English",

        sectionBody: "① Content shown in body",
        setNameWord: "Show word count",
        setDescWord: "Insert the word count into the note body",
        setNameImage: "Show image count",
        setDescImage: "Insert the image count into the note body",
        setNameReading: "Show reading time",
        setDescReading: "Insert estimated reading time after word count and before image count",
        setNameModified: "Show completion time",
        setDescModified: "Insert the note's last-modified time into the body",
        setNameTimeClock: "Include clock time",
        setDescTimeClock: "When on, append HH:mm (24h) to the date; also controls whether the Frontmatter time is included",
        setNameAuthor: "Show author / custom text",
        setDescAuthor: "Insert custom text into the body (not written to Frontmatter)",
        setNameAuthorText: "Author / custom text",
        setDescAuthorText: "Custom text shown in the body marker",
        setNameWpm: "Words per minute",
        setDescWpm: "Used to estimate reading time; independent of the toggles above and always adjustable",

        sectionFm: "② Content in Frontmatter",
        setNameFmEnabled: "Enable Frontmatter writing",
        setDescFmEnabled: "Master switch: even when off, the dropdowns below can still set delete/clear policies independently",
        fmDropChar: "char_count (word count)",
        fmDropRead: "reading_time (reading time)",
        fmDropImage: "image_count (image count)",
        fmDropModified: "modified_time (completion time)",
        fmOptWrite: "Write field and value",
        fmOptDelete: "Do not write / delete field and value",
        fmOptClear: "Keep field but no value",

        sectionBodySettings: "③ Body display settings",
        inputWordPrefix: "Word count prefix",
        inputWordUnit: "Word count unit",
        inputReadingPrefix: "Reading time prefix",
        inputReadingUnit: "Reading time unit",
        inputImagePrefix: "Image count prefix",
        inputImageUnit: "Image count unit",
        inputModifiedPrefix: "Completion time prefix",
        inputSeparator: "Separator",
        btnReset: "Reset",

        sectionPosition: "④ Position settings",
        posDesc: "Choose whether each element is placed at the start or the end of the note; an element at the end keeps exactly one trailing blank line.",
        posNameWord: "Word count position",
        posNameReading: "Reading time position",
        posNameImage: "Image count position",
        posNameModified: "Completion time position",
        posNameAuthor: "Author / custom position",
        posOptStart: "Start of note",
        posOptEnd: "End of note",

        sectionPreview: "⑤ Live preview",
        prevYamlLabel: "Frontmatter:",
        prevStartLabel: 'Body start marker (shows "None" if empty):',
        prevEndLabel: 'Body end marker (shows "None" if empty):',
        noneText: "None",

        sectionOps: "⑥ Actions",
        btnRun: "Run update",
        btnRestore: "Restore defaults",

        warnTitle: "⚠️ Warning",
        warnText: "The plugin clears old article-info markers by format matching: any line matching the `*[XXX]*` format will be deleted. Therefore, do not manually set this format in your notes. Also, after the marker is added, if you change the marker format, re-running the plugin will not be able to clear the old marker."
    }
};

function tr(lang, key) {
    var dict = I18N[lang] || I18N.zh;
    return dict[key] != null ? dict[key] : key;
}

// ─────────────────────────────────────
// 默认设置
// ─────────────────────────────────────
const DEFAULT_SETTINGS = {
    language: "zh",

    bodyShowWord: true,
    bodyShowImage: true,
    bodyShowReading: false,
    bodyShowModified: true,
    bodyShowAuthor: true,
    timeWithClock: true,
    wordsPerMinute: 300,

    fmEnabled: true,
    fmCharCount: "write",
    fmReadTime: "delete",
    fmImageCount: "write",
    fmModifiedTime: "write",

    wordPrefix: "全文共: ",
    wordUnit: " 字",
    readingPrefix: "阅读用时约 ",
    readingUnit: " 分钟",
    imagePrefix: "图片共: ",
    imageUnit: " 张",
    modifiedPrefix: "本文完成于：",
    authorText: "作者：XXX",
    separator: "丨",

    wordPosition: "start",
    readingPosition: "start",
    imagePosition: "start",
    modifiedPosition: "start",
    authorPosition: "start"
};

// ─────────────────────────────────────
// 插件主类
// ─────────────────────────────────────
module.exports = class AutoStatsPlugin extends Plugin {
    async onload() {
        await this.loadSettings();
        this.addSettingTab(new AutoStatsSettingTab(this.app, this));

        this.addRibbonIcon("file-text", tr(this.settings.language, "ribbonTitle"), async () => {
            await this.runAll();
        });

        this.addCommand({
            id: "update-frontmatter-stats",
            name: tr(this.settings.language, "commandName"),
            callback: async () => { await this.runAll(); }
        });
    }

    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    async saveSettings() {
        await this.saveData(this.settings);
    }

    async runAll() {
        const file = this.app.workspace.getActiveFile();
        if (!file) { new Notice(tr(this.settings.language, "noticeNoFile")); return; }
        if (file.extension !== "md") { new Notice(tr(this.settings.language, "noticeOnlyMd")); return; }

        const content = await this.app.vault.read(file);
        const mtime = file.stat ? file.stat.mtime : Date.now();
        const { finalContent, stats } = this.processContent(content, mtime);

        if (finalContent !== content) {
            await this.app.vault.modify(file, finalContent);
            const msg = tr(this.settings.language, "noticeUpdated")
                .replace("{w}", stats.wordCount).replace("{i}", stats.imageCount);
            new Notice(msg);
        } else {
            new Notice(tr(this.settings.language, "noticeNoChange"));
        }
    }

    processContent(content, mtime) {
        const fmRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
        const match = content.match(fmRegex);
        let yamlSection = match ? match[1] : "";
        let bodyContent = match ? content.substring(match[0].length) : content;

        bodyContent = this.removeOldMarker(bodyContent);

        const stats = this.calculateStats(bodyContent);
        stats.modifiedDate = mtime ? new Date(mtime) : new Date();

        const markers = this.buildMarkers(stats);
        const finalYaml = this.updateYaml(yamlSection, stats);

        // 规整正文：去除首尾多余空白/空行，保证重复执行幂等
        let body = bodyContent.replace(/^[\r\n]+/, "").replace(/[\s]+$/, "");

        // 组装：开头标记 / 正文 / 末尾标记，相邻以一个空行分隔
        let parts = [];
        if (markers.startText) parts.push(markers.startText);
        if (body) parts.push(body);
        if (markers.endText) parts.push(markers.endText);
        let result = parts.join("\n\n");
        if (markers.endText) result += "\n"; // 末尾标记后保留一个换行（即一个空行）

        const finalContent = finalYaml ? "---\n" + finalYaml + "\n---\n\n" + result : result;

        return { finalContent, stats };
    }

    removeOldMarker(text) {
        // 精确匹配行首的 *[...]* 整行（开头/末尾位置都能命中）
        var re = /^[ \t]*\*\[[^]*?]\*[ \t]*(\r?\n)?/gm;
        var result = text.replace(re, "");
        result = result.replace(/^\r?\n+/, "");
        return result;
    }

    calculateStats(text) {
        var EXT = "png|jpg|jpeg|gif|bmp|svg|webp|heic|jxl|avif";

        // Wiki 双链图片
        var wikiRe = new RegExp(
            "!\\[\\[([^\\]]+\\.(" + EXT + "))(\\|[^\\]]+)?\\]\\]", "gi"
        );
        // 标准 MD 图片 —— 只匹配到第一个 )
        var mdRe = new RegExp(
            "!\\[[^\\]]*\\]\\(([^)]+)\\)", "gi"
        );

        // 图片计数（在原始文本上匹配，绝不替换正文）
        var wikiMatches = text.match(wikiRe) || [];
        var mdMatches = text.match(mdRe) || [];

        var EXT_RE = new RegExp("\\.(" + EXT + ")([?#]|$)", "i");
        var WX_RE = /wx_fmt=/i;

        var imageCount = 0;
        // wiki 双链全部算图片
        imageCount += wikiMatches.length;
        // md 图片：需含扩展名或 wx_fmt 参数
        for (var i = 0; i < mdMatches.length; i++) {
            // 提取 URL 部分
            var m = mdMatches[i].match(/\(([^)]+)\)/);
            if (m && (EXT_RE.test(m[1]) || WX_RE.test(m[1]))) {
                imageCount++;
            }
        }

        // 字数统计：在副本上操作
        var countText = text;

        // 移除图片语法
        countText = countText.replace(wikiRe, "");
        countText = countText.replace(mdRe, "");

        // 移除代码块
        countText = countText.replace(/```[\s\S]*?```/g, "");
        // 移除行内代码
        countText = countText.replace(/`[^`\n]+`/g, "");
        // 移除 HTML
        countText = countText.replace(/<[^>]+>/g, "");

        // 双链 → 保留文字
        countText = countText.replace(/\[\[([^\]|]+)(?:\|[^\]]+)?\]\]/g, "$1");
        // 链接 → 保留文字
        countText = countText.replace(/\[([^\]]*?)\]\([^)]*?\)/g, "$1");
        // 裸 URL
        countText = countText.replace(/https?:\/\/\S+/g, "");

        // 字数：汉字 + 中文标点（CJK 标点 U+3000–U+303F、全角标点 U+FF01–U+FF60、破折号 U+2014、省略号 U+2026）
        var chinese = (countText.match(/[\u4e00-\u9fa5\u3000-\u303F\uFF01-\uFF60\u2014\u2026]/g) || []).length;
        var english = (countText.match(/[a-zA-Z0-9]+/g) || []).length;
        var wordCount = chinese + english;
        var readingTime = Math.ceil(wordCount / this.settings.wordsPerMinute) || 1;

        return { wordCount: wordCount, imageCount: imageCount, readingTime: readingTime };
    }

    // 构建开头/末尾两组标记文本（不含外围空行，由 processContent 负责拼接）
    buildMarkers(stats) {
        var s = this.settings;
        var self = this;
        var startParts = [];
        var endParts = [];

        function addPart(position, part) {
            if (position === "end") endParts.push(part);
            else startParts.push(part);
        }

        if (s.bodyShowWord)      addPart(s.wordPosition,     s.wordPrefix     + stats.wordCount    + s.wordUnit);
        if (s.bodyShowReading)   addPart(s.readingPosition,  s.readingPrefix  + stats.readingTime  + s.readingUnit);
        if (s.bodyShowImage)     addPart(s.imagePosition,    s.imagePrefix    + stats.imageCount   + s.imageUnit);
        if (s.bodyShowModified)  addPart(s.modifiedPosition, s.modifiedPrefix + self.formatBodyDate(stats.modifiedDate));
        if (s.bodyShowAuthor && s.authorText) addPart(s.authorPosition, s.authorText);

        var startText = startParts.length > 0 ? "*[" + startParts.join(s.separator) + "]*" : "";
        var endText   = endParts.length   > 0 ? "*[" + endParts.join(s.separator)   + "]*" : "";
        return { startText: startText, endText: endText };
    }

    // 正文日期：20xx年x月x日 HH:mm（24小时制，月/日不补零）
    formatBodyDate(date) {
        var y = date.getFullYear();
        var M = date.getMonth() + 1;
        var D = date.getDate();
        var str = y + "年" + M + "月" + D + "日";
        if (this.settings.timeWithClock) {
            var h = String(date.getHours()).padStart(2, "0");
            var m = String(date.getMinutes()).padStart(2, "0");
            str += " " + h + ":" + m;
        }
        return str;
    }

    // 属性区日期：YYYY-MM-DD HH:mm:ss 或 YYYY-MM-DD（Obsidian 日期/日期时间习惯）
    formatYamlDate(date) {
        var y = date.getFullYear();
        var M = String(date.getMonth() + 1).padStart(2, "0");
        var D = String(date.getDate()).padStart(2, "0");
        var str = y + "-" + M + "-" + D;
        if (this.settings.timeWithClock) {
            var h = String(date.getHours()).padStart(2, "0");
            var m = String(date.getMinutes()).padStart(2, "0");
            var sec = String(date.getSeconds()).padStart(2, "0");
            str += " " + h + ":" + m + ":" + sec;
        }
        return str;
    }

    updateYaml(yaml, stats) {
        var s = this.settings;
        var y = yaml;
        var modifiedStr = this.formatYamlDate(stats.modifiedDate);

        var enabled = s.fmEnabled;
        y = this.applyFmPolicy(y, "char_count",    s.fmCharCount,    stats.wordCount,   enabled);
        y = this.applyFmPolicy(y, "reading_time",  s.fmReadTime,     stats.readingTime, enabled);
        y = this.applyFmPolicy(y, "image_count",   s.fmImageCount,   stats.imageCount,  enabled);
        y = this.applyFmPolicy(y, "modified_time", s.fmModifiedTime, modifiedStr,       enabled);

        y = y.trim();
        return y === "" ? "" : y;
    }

    applyFmPolicy(yaml, key, policy, value, isEnabled) {
        var lineRegex = new RegExp("^" + key + ":.*$", "gm");
        var hasKey = lineRegex.test(yaml);

        if (isEnabled && policy === "write") {
            var line = key + ": " + value;
            if (hasKey) return yaml.replace(lineRegex, line);
            return yaml + (yaml.endsWith("\n") ? "" : "\n") + line + "\n";
        }
        if (policy === "delete") {
            var result = yaml.replace(lineRegex, "").replace(/^\n+/, "");
            return result;
        }
        if (policy === "clear") {
            if (hasKey) return yaml.replace(lineRegex, key + ":");
            return yaml;
        }
        return yaml;
    }

    escapeRegExp(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
};

// ─────────────────────────────────────
// 设置面板
// ─────────────────────────────────────
class AutoStatsSettingTab extends PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display() {
        var containerEl = this.containerEl;
        containerEl.empty();

        var s = this.plugin.settings;
        var self = this;
        var L = function (key) { return tr(self.plugin.settings.language, key); };

        // 界面语言
        new Setting(containerEl).setName(L("langName")).setDesc(L("langDesc"))
            .addDropdown(function (dd) { return dd
                .addOption("zh", L("langOptZh"))
                .addOption("en", L("langOptEn"))
                .setValue(s.language)
                .onChange(function (v) {
                    self.plugin.settings.language = v;
                    self.plugin.saveSettings().then(function () { self.display(); });
                }); });

        // ① 正文中显示的内容
        containerEl.createEl("h3", { text: L("sectionBody") });

        new Setting(containerEl).setName(L("setNameWord")).setDesc(L("setDescWord"))
            .addToggle(function (t) { return t.setValue(s.bodyShowWord).onChange(function (v) {
                s.bodyShowWord = v; self.plugin.saveSettings().then(function () { self.display(); });
            }); });

        new Setting(containerEl).setName(L("setNameImage")).setDesc(L("setDescImage"))
            .addToggle(function (t) { return t.setValue(s.bodyShowImage).onChange(function (v) {
                s.bodyShowImage = v; self.plugin.saveSettings().then(function () { self.display(); });
            }); });

        new Setting(containerEl).setName(L("setNameReading")).setDesc(L("setDescReading"))
            .addToggle(function (t) { return t.setValue(s.bodyShowReading).onChange(function (v) {
                s.bodyShowReading = v; self.plugin.saveSettings().then(function () { self.display(); });
            }); });

        new Setting(containerEl).setName(L("setNameModified")).setDesc(L("setDescModified"))
            .addToggle(function (t) { return t.setValue(s.bodyShowModified).onChange(function (v) {
                s.bodyShowModified = v; self.plugin.saveSettings().then(function () { self.display(); });
            }); });

        new Setting(containerEl).setName(L("setNameTimeClock")).setDesc(L("setDescTimeClock"))
            .addToggle(function (t) { return t.setValue(s.timeWithClock).onChange(function (v) {
                s.timeWithClock = v; self.plugin.saveSettings().then(function () { self.refreshPreview(); });
            }); });

        new Setting(containerEl).setName(L("setNameAuthor")).setDesc(L("setDescAuthor"))
            .addToggle(function (t) { return t.setValue(s.bodyShowAuthor).onChange(function (v) {
                s.bodyShowAuthor = v; self.plugin.saveSettings().then(function () { self.display(); });
            }); });

        new Setting(containerEl).setName(L("setNameAuthorText")).setDesc(L("setDescAuthorText"))
            .addText(function (t) { return t.setPlaceholder("作者：XXX").setValue(s.authorText)
                .onChange(function (v) {
                    s.authorText = v;
                    self.plugin.saveSettings().then(function () { self.refreshPreview(); });
                }); })
            .addButton(function (btn) { return btn.setButtonText(L("btnReset")).setClass("mod-warning")
                .onClick(function () {
                    s.authorText = DEFAULT_SETTINGS.authorText;
                    self.plugin.saveSettings().then(function () { self.display(); });
                }); });

        new Setting(containerEl).setName(L("setNameWpm")).setDesc(L("setDescWpm"))
            .addText(function (t) { return t.setValue(String(s.wordsPerMinute)).onChange(function (v) {
                var n = Number(v);
                s.wordsPerMinute = (isNaN(n) || n < 1) ? 300 : n;
                self.plugin.saveSettings().then(function () { self.refreshPreview(); });
            }); });

        // ② 属性中显示的内容
        containerEl.createEl("h3", { text: L("sectionFm") });

        new Setting(containerEl).setName(L("setNameFmEnabled")).setDesc(L("setDescFmEnabled"))
            .addToggle(function (t) { return t.setValue(s.fmEnabled).onChange(function (v) {
                s.fmEnabled = v; self.plugin.saveSettings().then(function () { self.display(); });
            }); });

        self.addFmDropdown(containerEl, L("fmDropChar"), "fmCharCount");
        self.addFmDropdown(containerEl, L("fmDropRead"), "fmReadTime");
        self.addFmDropdown(containerEl, L("fmDropImage"), "fmImageCount");
        self.addFmDropdown(containerEl, L("fmDropModified"), "fmModifiedTime");

        // ③ 正文显示内容设置
        containerEl.createEl("h3", { text: L("sectionBodySettings") });

        function addInput(name, key, placeholder) {
            new Setting(containerEl).setName(name)
                .addText(function (text) { return text.setPlaceholder(placeholder).setValue(self.plugin.settings[key])
                    .onChange(function (v) {
                        self.plugin.settings[key] = v;
                        self.plugin.saveSettings().then(function () { self.refreshPreview(); });
                    }); })
                .addButton(function (btn) { return btn.setButtonText(L("btnReset")).setClass("mod-warning")
                    .onClick(function () {
                        self.plugin.settings[key] = DEFAULT_SETTINGS[key];
                        self.plugin.saveSettings().then(function () { self.display(); });
                    }); });
        }

        addInput(L("inputWordPrefix"), "wordPrefix", "全文共: ");
        addInput(L("inputWordUnit"), "wordUnit", "字");
        addInput(L("inputReadingPrefix"), "readingPrefix", "阅读用时约 ");
        addInput(L("inputReadingUnit"), "readingUnit", "分钟");
        addInput(L("inputImagePrefix"), "imagePrefix", "图片共: ");
        addInput(L("inputImageUnit"), "imageUnit", "张");
        addInput(L("inputModifiedPrefix"), "modifiedPrefix", "本文完成于：");
        addInput(L("inputSeparator"), "separator", "丨");

        // ④ 位置设置
        containerEl.createEl("h3", { text: L("sectionPosition") });
        containerEl.createEl("div", { cls: "setting-item-description", text: L("posDesc") });

        self.addPositionDropdown(containerEl, L("posNameWord"), "wordPosition");
        self.addPositionDropdown(containerEl, L("posNameReading"), "readingPosition");
        self.addPositionDropdown(containerEl, L("posNameImage"), "imagePosition");
        self.addPositionDropdown(containerEl, L("posNameModified"), "modifiedPosition");
        self.addPositionDropdown(containerEl, L("posNameAuthor"), "authorPosition");

        // ⑤ 效果预览
        containerEl.createEl("h3", { text: L("sectionPreview") });

        containerEl.createEl("div", { cls: "setting-item-description", text: L("prevYamlLabel") });
        var yamlBox = containerEl.createEl("pre", { cls: "auto-stats-preview-yaml" });
        yamlBox.style.cssText = "background:var(--background-secondary);padding:8px 12px;border-radius:4px;margin:4px 0 12px;white-space:pre-wrap;font-family:monospace;";

        containerEl.createEl("div", { cls: "setting-item-description", text: L("prevStartLabel") });
        var startBox = containerEl.createEl("pre", { cls: "auto-stats-preview-start" });
        startBox.style.cssText = "background:var(--background-secondary);padding:8px 12px;border-radius:4px;margin:4px 0 12px;white-space:pre-wrap;word-break:break-all;";

        containerEl.createEl("div", { cls: "setting-item-description", text: L("prevEndLabel") });
        var endBox = containerEl.createEl("pre", { cls: "auto-stats-preview-end" });
        endBox.style.cssText = "background:var(--background-secondary);padding:8px 12px;border-radius:4px;margin:4px 0 12px;white-space:pre-wrap;word-break:break-all;";

        self.refreshPreview(yamlBox, startBox, endBox);

        // ⑥ 操作
        containerEl.createEl("h3", { text: L("sectionOps") });

        new Setting(containerEl)
            .addButton(function (btn) { return btn.setButtonText(L("btnRun")).setCta()
                .onClick(function () { return self.plugin.runAll(); }); })
            .addButton(function (btn) { return btn.setButtonText(L("btnRestore")).setClass("mod-warning")
                .onClick(function () {
                    self.plugin.settings = Object.assign({}, DEFAULT_SETTINGS);
                    self.plugin.saveSettings().then(function () {
                        self.display();
                        new Notice(L("noticeRestored"));
                    });
                }); });

        // ⚠️ 使用警示（界面最下方）
        var warnTitle = containerEl.createEl("h3", { text: L("warnTitle") });
        warnTitle.style.cssText = "color:var(--warning, #d97706);margin-top:20px;";
        var warn = containerEl.createEl("div", { cls: "auto-stats-warning" });
        warn.style.cssText = "padding:10px 12px;border:1px solid var(--warning, #d97706);border-radius:6px;background:rgba(217,119,6,0.08);color:var(--text-normal);font-size:0.9em;line-height:1.6;white-space:pre-wrap;";
        warn.textContent = L("warnText");
    }

    addFmDropdown(containerEl, label, key) {
        var self = this;
        var cur = this.plugin.settings[key];
        var L = function (k) { return tr(self.plugin.settings.language, k); };
        new Setting(containerEl).setName(label).setDesc(L("setDescFmEnabled"))
            .addDropdown(function (dd) { return dd
                .addOption("write",  L("fmOptWrite"))
                .addOption("delete", L("fmOptDelete"))
                .addOption("clear",  L("fmOptClear"))
                .setValue(cur)
                .onChange(function (v) {
                    self.plugin.settings[key] = v;
                    self.plugin.saveSettings().then(function () { self.display(); });
                }); });
    }

    addPositionDropdown(containerEl, label, key) {
        var self = this;
        var cur = this.plugin.settings[key];
        var L = function (k) { return tr(self.plugin.settings.language, k); };
        new Setting(containerEl).setName(label).setDesc(L("posDesc"))
            .addDropdown(function (dd) { return dd
                .addOption("start", L("posOptStart"))
                .addOption("end",   L("posOptEnd"))
                .setValue(cur)
                .onChange(function (v) {
                    self.plugin.settings[key] = v;
                    self.plugin.saveSettings().then(function () { self.refreshPreview(); });
                }); });
    }

    refreshPreview(yamlEl, startEl, endEl) {
        var plugin = this.plugin;
        var s = plugin.settings;
        var L = function (key) { return tr(plugin.settings.language, key); };

        var previewWordCount = 1234;
        var previewImageCount = 3;
        var previewReadingTime = Math.ceil(previewWordCount / s.wordsPerMinute) || 1;
        var previewDate = new Date();

        var startParts = [];
        var endParts = [];
        function addPart(position, part) {
            if (position === "end") endParts.push(part);
            else startParts.push(part);
        }

        if (s.bodyShowWord)      addPart(s.wordPosition,     s.wordPrefix     + previewWordCount    + s.wordUnit);
        if (s.bodyShowReading)   addPart(s.readingPosition,  s.readingPrefix  + previewReadingTime  + s.readingUnit);
        if (s.bodyShowImage)     addPart(s.imagePosition,    s.imagePrefix    + previewImageCount   + s.imageUnit);
        if (s.bodyShowModified)  addPart(s.modifiedPosition, s.modifiedPrefix + plugin.formatBodyDate(previewDate));
        if (s.bodyShowAuthor && s.authorText) addPart(s.authorPosition, s.authorText);

        var startText = startParts.length > 0 ? "*[" + startParts.join(s.separator) + "]*" : L("noneText");
        var endText   = endParts.length   > 0 ? "*[" + endParts.join(s.separator)   + "]*" : L("noneText");

        var modifiedStr = plugin.formatYamlDate(previewDate);
        var yamlLines = [];
        if (s.fmEnabled) {
            if (s.fmCharCount    === "write") yamlLines.push("char_count: "    + previewWordCount);
            if (s.fmReadTime     === "write") yamlLines.push("reading_time: "  + previewReadingTime);
            if (s.fmImageCount   === "write") yamlLines.push("image_count: "   + previewImageCount);
            if (s.fmModifiedTime === "write") yamlLines.push("modified_time: " + modifiedStr);
            if (yamlLines.length === 0) yamlLines.push("(属性区为空)");
        } else {
            yamlLines.push("# 总开关已关闭，以下为各字段策略：");
            yamlLines.push("char_count:     → " + s.fmCharCount);
            yamlLines.push("reading_time:   → " + s.fmReadTime);
            yamlLines.push("image_count:    → " + s.fmImageCount);
            yamlLines.push("modified_time:  → " + s.fmModifiedTime);
        }

        var yEl = yamlEl  || this.containerEl.querySelector(".auto-stats-preview-yaml");
        var sEl = startEl || this.containerEl.querySelector(".auto-stats-preview-start");
        var eEl = endEl   || this.containerEl.querySelector(".auto-stats-preview-end");
        if (yEl) yEl.textContent = yamlLines.join("\n");
        if (sEl) sEl.textContent = startText;
        if (eEl) eEl.textContent = endText;
    }
}
