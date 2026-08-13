const { Plugin, Notice, PluginSettingTab, Setting } = require("obsidian");

// ─────────────────────────────────────
// 默认设置
// ─────────────────────────────────────
const DEFAULT_SETTINGS = {
    bodyShowWord: true,
    bodyShowImage: true,
    bodyShowReading: false,
    wordsPerMinute: 300,

    fmEnabled: true,
    fmCharCount: "write",
    fmReadTime: "delete",
    fmImageCount: "write",

    wordPrefix: "全文共: ",
    wordUnit: " 字",
    readingPrefix: "阅读用时约 ",
    readingUnit: " 分钟",
    imagePrefix: "图片共: ",
    imageUnit: " 张",
    separator: "，"
};

// ─────────────────────────────────────
// 插件主类
// ─────────────────────────────────────
module.exports = class AutoStatsPlugin extends Plugin {
    async onload() {
        await this.loadSettings();
        this.addSettingTab(new AutoStatsSettingTab(this.app, this));

        this.addRibbonIcon("file-text", "更新字数与图片统计", async () => {
            await this.runAll();
        });

        this.addCommand({
            id: "update-frontmatter-stats",
            name: "更新字数与图片统计",
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
        if (!file) { new Notice("没有打开的文件"); return; }
        if (file.extension !== "md") { new Notice("只支持 Markdown 文件"); return; }

        const content = await this.app.vault.read(file);
        const { finalContent, stats } = this.processContent(content);

        if (finalContent !== content) {
            await this.app.vault.modify(file, finalContent);
            new Notice("更新完成: " + stats.wordCount + "字, " + stats.imageCount + "张图");
        } else {
            new Notice("统计结果未变化");
        }
    }

    processContent(content) {
        const fmRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n/;
        const match = content.match(fmRegex);
        let yamlSection = match ? match[1] : "";
        let bodyContent = match ? content.substring(match[0].length) : content;

        bodyContent = this.removeOldMarker(bodyContent);

        const stats = this.calculateStats(bodyContent);

        const marker = this.buildMarker(stats);

        const finalYaml = this.updateYaml(yamlSection, stats);

        const finalBody = marker + bodyContent;
        const finalContent = finalYaml ? "---\n" + finalYaml + "\n---\n\n" + finalBody : finalBody;

        return { finalContent, stats };
    }

    removeOldMarker(text) {
        // 精确匹配行首的 *[...]* 整行
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

        var chinese = (countText.match(/[\u4e00-\u9fa5]/g) || []).length;
        var english = (countText.match(/[a-zA-Z0-9]+/g) || []).length;
        var wordCount = chinese + english;
        var readingTime = Math.ceil(wordCount / this.settings.wordsPerMinute) || 1;

        return { wordCount: wordCount, imageCount: imageCount, readingTime: readingTime };
    }

    buildMarker(stats) {
        var s = this.settings;
        var parts = [];
        if (s.bodyShowWord)    parts.push(s.wordPrefix    + stats.wordCount    + s.wordUnit);
        if (s.bodyShowReading) parts.push(s.readingPrefix + stats.readingTime  + s.readingUnit);
        if (s.bodyShowImage)   parts.push(s.imagePrefix   + stats.imageCount   + s.imageUnit);
        if (parts.length === 0) return "";
        return "*[" + parts.join(s.separator) + "]*\n\n";
    }

    updateYaml(yaml, stats) {
        var s = this.settings;
        var y = yaml;

        if (s.fmEnabled) {
            y = this.applyFmPolicy(y, "char_count",  s.fmCharCount,  stats.wordCount,    true);
            y = this.applyFmPolicy(y, "reading_time",   s.fmReadTime,   stats.readingTime, true);
            y = this.applyFmPolicy(y, "image_count", s.fmImageCount, stats.imageCount,  true);
        } else {
            y = this.applyFmPolicy(y, "char_count",  s.fmCharCount,  stats.wordCount,    false);
            y = this.applyFmPolicy(y, "reading_time",   s.fmReadTime,   stats.readingTime, false);
            y = this.applyFmPolicy(y, "image_count", s.fmImageCount, stats.imageCount,  false);
        }

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

        // ① 正文中显示的内容
        containerEl.createEl("h3", { text: "① 正文中显示的内容" });

        var s = this.plugin.settings;

        var self = this;

        new Setting(containerEl).setName("显示字数").setDesc("在正文顶部插入字数统计")
            .addToggle(function(t) { return t.setValue(s.bodyShowWord).onChange(function(v) {
                s.bodyShowWord = v; self.plugin.saveSettings().then(function(){ self.display(); });
            }); });

        new Setting(containerEl).setName("显示图片数量").setDesc("在正文顶部插入图片统计")
            .addToggle(function(t) { return t.setValue(s.bodyShowImage).onChange(function(v) {
                s.bodyShowImage = v; self.plugin.saveSettings().then(function(){ self.display(); });
            }); });

        new Setting(containerEl).setName("显示阅读用时").setDesc("在字数之后、图片之前插入阅读用时")
            .addToggle(function(t) { return t.setValue(s.bodyShowReading).onChange(function(v) {
                s.bodyShowReading = v; self.plugin.saveSettings().then(function(){ self.display(); });
            }); });

        new Setting(containerEl).setName("每分钟阅读字数").setDesc("用于计算阅读用时，与上方开关独立，始终可调整")
            .addText(function(t) { return t.setValue(String(s.wordsPerMinute)).onChange(function(v) {
                var n = Number(v);
                s.wordsPerMinute = (isNaN(n) || n < 1) ? 300 : n;
                self.plugin.saveSettings().then(function(){ self.refreshPreview(); });
            }); });

        // ② 属性中显示的内容
        containerEl.createEl("h3", { text: "② 属性中显示的内容" });

        new Setting(containerEl).setName("启用属性区写入").setDesc("总开关：关闭后下方三个字段的下拉框仍可独立设置删除/清空策略")
            .addToggle(function(t) { return t.setValue(s.fmEnabled).onChange(function(v) {
                s.fmEnabled = v; self.plugin.saveSettings().then(function(){ self.display(); });
            }); });

        self.addFmDropdown(containerEl, "char_count（字数）",  "fmCharCount");
        self.addFmDropdown(containerEl, "reading_time（阅读用时）", "fmReadTime");
        self.addFmDropdown(containerEl, "image_count（图片数）", "fmImageCount");

        // ③ 正文显示内容设置
        containerEl.createEl("h3", { text: "③ 正文显示内容设置" });

        function addInput(name, key, placeholder) {
            new Setting(containerEl).setName(name)
                .addText(function(text) { return text.setPlaceholder(placeholder).setValue(self.plugin.settings[key])
                    .onChange(function(v) {
                        self.plugin.settings[key] = v;
                        self.plugin.saveSettings().then(function(){ self.refreshPreview(); });
                    }); })
                .addButton(function(btn) { return btn.setButtonText("重置").setClass("mod-warning")
                    .onClick(function() {
                        self.plugin.settings[key] = DEFAULT_SETTINGS[key];
                        self.plugin.saveSettings().then(function(){ self.display(); });
                    }); });
        }

        addInput("字数前缀文字",   "wordPrefix",   "全文共: ");
        addInput("字数后单位",     "wordUnit",     "字");
        addInput("阅读时长前缀",   "readingPrefix","阅读用时约 ");
        addInput("阅读时长单位",   "readingUnit",  "分钟");
        addInput("图片数前缀",     "imagePrefix",  "图片共: ");
        addInput("图片后单位",     "imageUnit",    "张");
        addInput("分隔符",         "separator",    "，");

        // ④ 效果预览
        containerEl.createEl("h3", { text: "④ 效果预览" });

        containerEl.createEl("div", { cls: "setting-item-description", text: "属性区（Frontmatter）：" });
        var yamlBox = containerEl.createEl("pre", { cls: "auto-stats-preview-yaml" });
        yamlBox.style.cssText = "background:var(--background-secondary);padding:8px 12px;border-radius:4px;margin:4px 0 12px;white-space:pre-wrap;font-family:monospace;";

        containerEl.createEl("div", { cls: "setting-item-description", text: "正文标记行（Body Marker）：" });
        var bodyBox = containerEl.createEl("pre", { cls: "auto-stats-preview-body" });
        bodyBox.style.cssText = "background:var(--background-secondary);padding:8px 12px;border-radius:4px;margin:4px 0 12px;white-space:pre-wrap;word-break:break-all;";

        self.refreshPreview(yamlBox, bodyBox);

        // ⑤ 操作
        containerEl.createEl("h3", { text: "⑤ 操作" });

        new Setting(containerEl)
            .addButton(function(btn) { return btn.setButtonText("执行更新").setCta()
                .onClick(function() { return self.plugin.runAll(); }); })
            .addButton(function(btn) { return btn.setButtonText("恢复默认设置").setClass("mod-warning")
                .onClick(function() {
                    self.plugin.settings = Object.assign({}, DEFAULT_SETTINGS);
                    self.plugin.saveSettings().then(function(){
                        self.display();
                        new Notice("已恢复默认设置");
                    });
                }); });
    }

    addFmDropdown(containerEl, label, key) {
        var self = this;
        var cur = this.plugin.settings[key];
        new Setting(containerEl).setName(label).setDesc("选择该字段在属性区中的处理方式")
            .addDropdown(function(dd) { return dd
                .addOption("write",  "写入字段及数值")
                .addOption("delete", "不写入/删除字段及数值")
                .addOption("clear",  "保留字段但无数值")
                .setValue(cur)
                .onChange(function(v) {
                    self.plugin.settings[key] = v;
                    self.plugin.saveSettings().then(function(){ self.display(); });
                }); });
    }

    refreshPreview(yamlEl, bodyEl) {
        var ms = { wordCount: 1234, imageCount: 3, readingTime: 5 };
        var s = this.plugin.settings;

        var parts = [];
        if (s.bodyShowWord)    parts.push(s.wordPrefix    + ms.wordCount    + s.wordUnit);
        if (s.bodyShowReading) parts.push(s.readingPrefix + ms.readingTime  + s.readingUnit);
        if (s.bodyShowImage)   parts.push(s.imagePrefix   + ms.imageCount   + s.imageUnit);
        var bodyMarker = parts.length > 0
            ? "*[" + parts.join(s.separator) + "]*"
            : "(未启用任何正文统计项)";

        var yamlLines = [];
        if (s.fmEnabled) {
            if (s.fmCharCount  === "write") yamlLines.push("char_count: "  + ms.wordCount);
            if (s.fmReadTime   === "write") yamlLines.push("reading_time: "   + ms.readingTime);
            if (s.fmImageCount === "write") yamlLines.push("image_count: " + ms.imageCount);
            if (yamlLines.length === 0) yamlLines.push("(属性区为空)");
        } else {
            yamlLines.push("# 总开关已关闭，以下为各字段策略：");
            yamlLines.push("char_count:   → " + s.fmCharCount);
            yamlLines.push("reading_time:    → " + s.fmReadTime);
            yamlLines.push("image_count:  → " + s.fmImageCount);
        }

        var yEl = yamlEl || this.containerEl.querySelector(".auto-stats-preview-yaml");
        var bEl = bodyEl || this.containerEl.querySelector(".auto-stats-preview-body");
        if (yEl) yEl.textContent = yamlLines.join("\n");
        if (bEl) bEl.textContent = bodyMarker;
    }
}
