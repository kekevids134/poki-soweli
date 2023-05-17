Vue.component("current-challenge", {
    methods: {
        getCurrentChallenge: function()
        {
            return game.currentChallenge;
        },
        getCurrentLayer: function()
        {
            return game.currentChallenge.layer;
        }
    },
    template: `<div class="current-challenge">
<p>tenpo ni la sina lon ma ike <layer-colored-text :layer="getCurrentLayer()" v-html="getCurrentChallenge().name"></layer-colored-text>.</p>
<button @click="getCurrentChallenge().leave()">Leave Challenge</button>
</div>`
})