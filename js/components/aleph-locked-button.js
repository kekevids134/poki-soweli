Vue.component("aleph-locked-button", {
    props: ["aleph"],
    methods: {
        totalAleph: () => game.alephLayer.aleph,
        Decimal: (x) => new Decimal(x)
    },
    template: `<button @click="$emit('click')" :disabled="Decimal(totalAleph()).lt(aleph)">
    <span v-if="Decimal(totalAleph()).lt(aleph)">o tawa <span class="aleph">ℵ</span> {{aleph}} </span>
    <span v-else><slot></slot></span>
</button>`
})
