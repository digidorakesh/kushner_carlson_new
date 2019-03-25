<template>
    <div class="relative">
        <div v-if="loading" class="rounded-lg flex items-center justify-center absolute pin z-50 bg-40 -m-4">
            <loader class="text-60" />
        </div>

        <div>
        <heading class="mb-6">Edit Newsletter</heading>
                <div class="card px-6 py-3">
                            <div class="flex border-b border-40">
                                <div class="w-1/4 py-4"> 
                                    <h4 class="font-normal text-80">ID</h4>
                                </div> 
                            <div class="w-3/4 py-4">
                            <p class="text-90">{{data.id}}</p>
                            </div>
                        </div>

                        <div class="flex border-b border-40">
                                <div class="w-1/4 py-4"> 
                                    <h4 class="font-normal text-80">Title</h4>
                                </div> 
                            <div class="w-3/4 py-4">
                            <p class="text-90">{{data.title}}</p>
                            </div>
                        </div>

                        <div class="flex border-b border-40">
                                <div class="w-1/4 py-4"> 
                                    <h4 class="font-normal text-80">Content</h4>
                                </div> 
                            <div class="w-3/4 py-4">
                            <p class="text-90">{{data.content}}</p>
                            </div>
                        </div>

                        <div class="flex border-b border-40">
                                <div class="w-1/4 py-4"> 
                                    <h4 class="font-normal text-80">Status</h4>
                                </div> 
                            <div class="w-3/4 py-4">
                            <p class="text-90">{{data.status}}</p>
                            </div>
                        </div>
                </div>
            </div>
        </div>
</template>

<script>

const setting = {
    name: null,
    version: null
}

const social_profile = {
    facebook_url: null,
 }

export default {
    data: () => ({
        loading: true,
        data: {},
        errors: [],
        file:'',
     }),

    mounted() {
          const vm = this
           vm.loadData()
    },

    methods: {
       
        saveAndReload(groupName) {
            this.saving = groupName

            let settingsToUpdate = {}

            let keys = this.settingConfig
                .filter(g => g.name == groupName)[0].settings
                .map(settingItem => settingItem.key)

            keys.forEach(key => {
                settingsToUpdate[key] = this.settings[key]
            })

            Nova.request().post('/nova-vendor/setting', { settings: settingsToUpdate })
                .then((response) => {
                    if (response.status == 202) {
                        this.saving = ''
                        this.$toasted.show('Settings saved!', { type: 'success' })
                    }
                })
                .catch((error) => {
                    console.log(error)
                    this.saving = ''
                })
        },
        loadData() {
            Nova.request().get("/nova-vendor/newsletter/getdata/"+this.$route.params.id)
                .then(response => {
                    this.data = response.data.data
                    setTimeout(() => { this.loading = false }, 200)   
                })
                .catch(() => this.error = true)
        },
            }
}
</script>
