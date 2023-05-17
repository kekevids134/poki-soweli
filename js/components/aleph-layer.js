Vue.component("aleph-layer", {
    data: function()
    {
        return {
            aleph: game.alephLayer
        }
    },
    computed: {
        canProduceAleph: function()
        {
            return this.aleph.getAlephBoostFromLayer().gt(0);
        },
        isSoftCapped: function()
        {
            return this.aleph.aleph.gt(1e300);
        }
    },
    methods: {
        formatNumber: (n, prec, prec1000, lim) => functions.formatNumber(n, prec, prec1000, lim),
        highestLayer: () => functions.maxLayerUnlocked()
    },
    template: `<div class="aleph-layer">
<div class="resource">
    <p>sina jo e  <span class="aleph">ℵ</span> {{formatNumber(aleph.aleph, 2, 2, 1e9)}} </p>
    <p>sina kama jo e <span class="aleph">ℵ</span> {{formatNumber(aleph.getAlephGain(), 2, 2, 1e9)}} lon tenpo Sekunta ale</p>
</div>
<div class="boosts">
    <div v-if="canProduceAleph">
        <p>poki sewi sina li <resource-name :layerid="highestLayer()"></resource-name>, li pana e x{{formatNumber(aleph.getAlephBoostFromLayer(), 2, 2)}} tawa <span class="aleph">ℵ</span></p>
    </div>
    <div v-else>
        <p>sina wile kama jo e ni la sina wile tawa poki <resource-name :layerid="3"></resource-name> </p>
    </div>
</div>
<div class="tabs">
    <button @click="aleph.maxAll()">kama jo e ijo pona ale ken(M)</button>
</div>
<div class="upgrades">
    <aleph-upgrade :upgrade="aleph.upgrades.alephGain"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.alephGainBonus"></aleph-upgrade>
</div>
<div class="upgrades">
    <aleph-upgrade :upgrade="aleph.upgrades.deltaBoost"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.alephBoost"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.powerGenerators"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.prestigeNoPowerBoost"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.betterBetaFormula"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.alephBoost2"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.prestigeRewards"></aleph-upgrade>
    <aleph-upgrade :upgrade="aleph.upgrades.layerExponentialBoost"></aleph-upgrade>
</div>
</div>`
});