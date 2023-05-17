Vue.component("generator-table",{
    props: ["generators"],
    template: `<table class="generator-table">
    <thead>
        <th>nanpa</th>
        <th>sina jo e ni...</th>
        <th>esun</th>
        <th>esun luka luka</th>
    </thead>
    <generator v-for="(g, i) in generators" :key="i" :generator="g"></generator>
</table>`
});