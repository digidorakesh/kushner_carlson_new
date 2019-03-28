Nova.booting((Vue, router, store) => {
    Vue.component('index-time-field', require('./components/IndexField'))
    Vue.component('detail-time-field', require('./components/DetailField'))
    Vue.component('form-time-field', require('./components/FormField'))
})
