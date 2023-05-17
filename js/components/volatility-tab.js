Vue.component("volatility-tab", {
    data: function()
    {
        return {
            volatility: game.volatility
        }
    },
    template: `<div class="volatility-tab">
<p class="description">sina lon ni la sina ken kama jo e ijo pona li pali e ni: poki anpa sina li weka ala</p>
<div class="upgrades">
    <upgrade :upgrade="volatility.layerVolatility"></upgrade>
    <upgrade :upgrade="volatility.autoMaxAll"></upgrade>
    <upgrade :upgrade="volatility.prestigePerSecond"></upgrade>
</div>
</div>`
});