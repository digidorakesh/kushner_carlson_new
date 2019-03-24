import Paginate from 'vuejs-paginate';

Nova.booting((Vue, router, store) => {
    Vue.component('paginate', Paginate)
    Vue.use(require('vue-moment'));
Vue.directive('color-swatch', function (el, binding) {
	el.style.backgroundColor = binding.value
})
    router.addRoutes([
         {
            name: 'dashboard',
            path: '/dashboard',
            component: require('./components/Index'),
        },
        {
            name: 'reminder-create',
            path: '/reminder/new',
            component: require('./components/Create'),
        },
        {
            name: 'reminder-edit',
            path: '/reminder/:id/edit',
            component: require('./components/Tool'),
            props: route => {
	            return {
	                id: route.params.id
	            }
        	}
        },
        {
            name: 'reminder-detail',
            path: '/reminder/:id/view/',
            component: require('./components/Details'),
             props: route => {
	            return {
	                id: route.params.id
	            }
        	}
        },
        {
            name: 'reminder-send',
            path: '/reminder/send',
            component: require('./components/Send'),
        },
    ])
})
