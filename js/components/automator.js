Vue.component("automator", {
    props: ["automator"],
    computed: {
        isResourceUpgrade: function()
        {
            return this.automator.upgrade instanceof ResourceUpgrade;
        }
    },
    template: `<div class="automator">
<div>
    <h4>{{automator.name}}</h4>
    <p>{{automator.description}}</p>
    <label>tenpo wile: tenpo Sekunta <input type="number" v-model.number.lazy="automator.desiredInterval" step="0.1"/></label>
    <label><input type="checkbox" v-model="automator.active"/> Active</label>
</div>
<upgrade :upgrade="automator.upgrade" v-if="!isResourceUpgrade"></upgrade>
<resource-upgrade :upgrade="automator.upgrade" v-else></resource-upgrade>
</div>`
});