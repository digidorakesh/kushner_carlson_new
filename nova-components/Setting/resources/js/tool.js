Nova.booting((Vue, router, store) => {
    router.addRoutes([
        {
            name: 'setting',
            path: '/setting',
            component: require('./components/Tool'),
        },
    ])
})
