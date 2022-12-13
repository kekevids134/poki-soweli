Vue.component("settings-menu", {
    data: function ()
    {
        return {
            settings: game.settings,
            exportString: "nimi awen sina li kama lon ni. o awen e ona.",
            themes: mod.themes,
            names: mod.layerNames,
            fonts: mod.fonts,
            saves: mod.saves
        }
    },
    mounted: function()
    {
        this.$refs.exportBox.onfocus = e => textBoxFocused = true;
        this.$refs.exportBox.onblur = e => textBoxFocused = false;
    },
    beforeDestroy: function()
    {
        this.$refs.exportBox.onfocus = null;
        this.$refs.exportBox.onblur = null;
    },
    methods: {
        save: () => functions.saveGame(),
        clear: function()
        {
            this.exportString = "";
        },
        download: function()
        {
            this.exportGame();

            const date = new Date();
            const dateString = [date.getFullYear(), date.getMonth() + 1, date.getDate()].map(d => d.toString().padStart(2, "0")).join("-") + "-" +
                [date.getHours(), date.getMinutes(), date.getSeconds()].map(d => d.toString().padStart(2, "0")).join("");

            let a = document.createElement("a");
            a.style.display = "none";
            document.body.appendChild(a);
            a.href = "data:application/octet-stream;charset=utf-8," + this.exportString;
            a.download = mod.primaryName+mod.secondaryName+dateString+".txt";
            a.click();
            document.body.removeChild(a);
        },
        paste: function()
        {
            navigator.permissions.query({name: "clipboard-read"}).then(result =>
            {
                if(result.state === "granted" || result.state === "prompt")
                {
                    navigator.clipboard.readText().then(text =>
                    {
                        this.exportString = text;
                    })
                }
            });
        },
        copy: function()
        {
            navigator.permissions.query({name: "clipboard-write"}).then(result =>
            {
                if(result.state === "granted" || result.state === "prompt")
                {
                    navigator.clipboard.writeText(this.exportString).then(function()
                    {
                        functions.createNotification(new Notification(NOTIFICATION_SUCCESS, "Copied to Clipboard", "images/save.svg"));
                    })
                }
            });
        },
        exportGame: function()
        {
            this.exportString = functions.getSaveString();
        },
        importGame: function()
        {
            const ret = functions.loadGame(this.exportString);
            if(game.settings.notifications)
            {
                if(!ret)
                {
                    functions.createNotification(new Notification(NOTIFICATION_ERROR, "Error occured while importing...", "images/save.svg"));
                }
                else if(ret === -1)
                {
                    functions.createNotification(new Notification(NOTIFICATION_ERROR, "CoNfUsIoN"));
                }
                else
                {
                    functions.createNotification(new Notification(NOTIFICATION_SUCCESS, "Game imported!", "images/save.svg"));
                }
            }
            game.settings.tab = "Layers";
        },
        hardResetGame: () => functions.hardResetGame(),
        setTheme: css => functions.setTheme(css),
        setNames: js => functions.setNames(js),
        setFont: css => functions.setFont(css),
        setSave: info => functions.setSave(info),
        volatilityUnlocked: () => functions.maxLayerUnlocked() >= 2
    },
    template: `<div class="settings">
<div class="settings-panel-container">
    <div class="settings-panel">
        <label>lon e poki ale <input type="checkbox" v-model="settings.showAllLayers"/></label>
        <label>lon e poki nanpa <input type="checkbox" v-model="settings.showLayerOrdinals"/></label>
    </div>
    <div class="settings-panel">
        <label>lon e poki <input :disabled="settings.showAllLayers" type="number" min="1" max="5" v-model.number="settings.showMinLayers"/></label>
        <label>lon e poki pini <input :disabled="settings.showAllLayers" type="number" min="1" max="5" v-model.number="settings.showMaxLayers"/></label>
    </div>
    <div class="settings-panel">
        <label>"esun mute mute" li esun luka luka taso <input type="checkbox" v-model="settings.buyMaxAlways10"/></label>
        <label>ken ala esun mute mute lon poki pini <input type="checkbox" v-model="settings.disableBuyMaxOnHighestLayer"/></label>
        <label v-if="volatilityUnlocked()">ilo li ken esun e mute mute <input type="checkbox" v-model="settings.autoMaxAll"/></label>
        <label>ilo li ken sewi e poki pini <input type="checkbox" v-model="settings.autoPrestigeHighestLayer"/></label>
    </div>
    <div class="settings-panel">
        <label>lon e kule pi ijo poki <input type="checkbox" v-model="settings.resourceColors"/></label>
        <label>lon e suno pi ijo poki <input type="checkbox" v-model="settings.resourceGlow"/></label>
        <label>lon e sona sin <input type="checkbox" v-model="settings.newsTicker"/></label>
        <label>lon e sona suli <input type="checkbox" v-model="settings.notifications"/></label>
        <label>lon e sona suli awen <input type="checkbox" v-model="settings.saveNotifications"/></label>
        <label>lon e ijo wile <input type="checkbox" v-model="settings.confirmations"/></label>
    </div>
    <div class="settings-panel">
        <span>lukin pi ijo suli</span><br/>
        <fieldset>
            <label><input type="radio" value="0" v-model.number="settings.titleStyle"/> ala</label><br/>
            <label><input type="radio" value="1" v-model.number="settings.titleStyle"/> lukin Motd</label><br/>
            <label><input type="radio" value="2" v-model.number="settings.titleStyle"/> poki lon</label>
        </fieldset>
    </div>
    <div class="settings-panel">
        <label>musi pi lon ala <input type="checkbox" v-model="settings.offlineProgress"/><br/>(o kama suli e tenpo lon)</label>
    </div>
</div>
<div class="settings-row">
    <label>lukin ale <button :class="{selected: settings.theme === t[1]}" v-for="t in themes" @click="setTheme(t[1])">{{t[0]}}</button></label>
</div>
<div class="settings-row">
    <label>nimi poki <button :class="{selected: settings.layerNames === t[1]}" v-for="t in names" @click="setNames(t[1])">{{t[0]}}</button></label>
</div>
<div class="settings-row">
    <label>lukin nimi <button :class="{selected: settings.font === t[1]}" v-for="t in fonts" @click="setFont(t[1])">{{t[0]}}</button></label>
</div>
<div class="settings-row">
    <button @click="save()">awen e musi</button>
    <button @click="exportGame()">kama jo e nimi musi</button>
    <button @click="importGame()">pana e nimi musi</button>
    <button @click="hardResetGame()">weka e musi</button>
</div>
<div class="settings-row">
    <button :class="{selected: settings.saveInfo === t[1]}" v-for="t in saves" @click="setSave(t[1])">{{t[0]}}</button>
</div>
<div class="settings-row">
    <textarea ref="exportBox" class="export" v-model="exportString"></textarea>
</div>
<div class="settings-row">
    <button @click="copy()">kama jo e ni lon supa</button>
    <button @click="paste()">pana e ijo lon supa</button>
    <button @click="clear()">weka</button>
    <button @click="download()">kama jo e ni lon lipu nimi .txt</button>
</div>
<div class="settings-row">
    <p>Controls: sina wile esun mute mute la o kepeken nena "m"<br/>
    sina wile tawa poki ante la o kepeken nena pi sitelen nasin pi sewi ala pi anpa ala<br/>
    sina wile sewi e poki la o kepeken e nena p<br/>
    First Letter of a tab ([L]ayers, [S]ettings) to select it; C to select Achievements(can't really do this in toki pona)</p>
</div>
<div class="credits">
    <h2>sona poki</h2><br>
    <h3>nanpa poki(poki nanpa wan li nanpa 0):</h3>
    <input type="input" min="1" max="Infinity" id="layerID">
    <button onclick="functions.layerFinder(document.getElementById('layerID').value)">kama jo e sona poki</button><br>
    <h3>sona poki:</h3><br>
    <h4>nimi poki: <a id="layernameoutput"></a></h4><br>
    <h5>kule: <a id="layercoloroutput"></a></h5><br>
    <h5>suno: <a id="layerglowoutput"></a></h5>
</div>
<div class="credits">
    <h4>pona(kepeken toki inli)</h4>
    <p>Inspiration: Antimatter Dimensions by hevipelle, Infinite Layers by dan-simon</p>
    <p>Original Game (Omega Layers) created by VeproGames</p>
    <p>Powered by vue.js and break_eternity.min.js</p>
    <p>Toki Pona by Sonja Lang (jan Sonja)</p>
    <p>` + mod.primaryName + mod.secondaryName + ` v` + mod.version +`</p>
    ` + ((mod.primaryName + mod.secondaryName) !== "ωEngine" ? ("<p>Built with ωEngine v" + mod.engineVer + "</p>") : "") + `
</div>
</div>`
})
