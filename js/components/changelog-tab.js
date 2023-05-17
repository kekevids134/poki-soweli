Vue.component("changelog-tab", {
    template: `<div class="changelog-tab">
    <guide-item>
        <template v-slot:title>v0.0.3</template>
        <template v-slot:text>MORE TRANSLATIONS!!!!!
        </template>
    </guide-item>
    <guide-item>
        <template v-slot:title>v0.0.2.1</template>
        <template v-slot:text>THE TINIEST BUG FIX EVER!!!!!!!!!!
        </template>
    </guide-item>
    <guide-item>
        <template v-slot:title>v0.0.2</template>
        <template v-slot:text>i think i'm done with the settings??
        </template>
    </guide-item>
    <guide-item>
        <template v-slot:title>v0.0.1</template>
        <template v-slot:text>doing the settings, like 75% of the way there
        </template>
    </guide-item>
</div>`
})