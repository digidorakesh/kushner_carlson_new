<template>
    <div class="relative">
        <div v-if="loading" class="rounded-lg flex items-center justify-center absolute pin z-50 bg-40 -m-4">
            <loader class="text-60" />
        </div>

        <div>
        <heading class="mb-6">Setting Tool</heading>
        <tabs>
            <tab name="Application Site">
                <div class="card">
                    <form @submit.prevent="updateSetting">
                        <div>
                            <div class="flex border-b border-40">
                                <div class="w-1/4 px-8 py-6">
                                    <label class="inline-block text-80 h-9 pt-2">Site Name</label>
                                    <p class="text-sm leading-normal text-80 italic"></p>
                                </div>
                                <div class="w-3/4 px-8 py-6">
                                    <textarea v-model="app.sms_messgae" name="sms_messgae" placeholder="SMS Message" class="w-full form-control form-input form-input-bordered" cols="4" rows="10"></textarea>
                                    <div v-if="errors['data.app.sms_messgae']" :class="['help-text error-text mt-2 text-danger']">
                                        @{{ errors['data.app.sms_messgae'][0] }}
                                    </div> 
                                </div>
                            </div>
                            
                            <!--  <div class="flex border-b border-40">
                                <div class="w-1/4 px-8 py-6">
                                    <label class="inline-block text-80 h-9 pt-2">Logo</label>
                                    <p class="text-sm leading-normal text-80 italic"></p>
                                </div>
                                <div class="w-1/2 px-8 py-6">
                                    <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
                                    <input v-model="app.logo" placeholder="Logo" type="hidden" class="w-full form-control form-input form-input-bordered">
                                    <div v-if="errors['data.app.logo']" :class="['help-text error-text mt-2 text-danger']">
                                        @{{ errors['data.app.logo'][0] }}
                                    </div>
                                     <img :src="getLogo(app.logo)" height="150" width="auto"/>  
                                </div>
                            </div> -->
                           
                            <div class="flex border-b border-40">
                                <div class="w-1/4 px-8 py-6">
                                    <label class="inline-block text-80 h-9 pt-2" for="Version">Send Hours Before Appointment</label>
                                    <p class="text-sm leading-normal text-80 italic"></p>
                                </div>
                                <div class="w-1/4 px-8 py-6">
                                    <input v-model="app.before_hours" placeholder="Send Hours Before Appointment" type="number" class="w-full form-control form-input form-input-bordered">
                                    <div v-if="errors['data.app.before_hours']" :class="['help-text error-text mt-2 text-danger']">
                                        @{{ errors['data.app.before_hours'][0] }}
                                    </div> 
                                </div>
                            </div>

                        </div>
                        <div class="bg-30 flex px-8 py-4">
                            <button type="submit" class="ml-auto btn btn-default btn-primary mr-3">
                                Save Setting
                            </button>
                        </div>
                    </form>
                </div>
            </tab>
        </tabs>
    </div>
    </div>
</template>

<script>
import ToggleSetting from './partials/Toggle'
import TextSetting from './partials/Text'



const setting = {
    name: null,
    version: null
}

const social_profile = {
    facebook_url: null,
 }

export default {
    components: {
        ToggleSetting,
        TextSetting
    },

    data: () => ({
        loading: false,
        saving: '',
        settings: {'name':'test','copyright_year':'1378'},
        app: {'sms_messgae':'','before_hours':''},
        settingConfig: [],
        errors: [],
        file:'',
    }),

    mounted() {
        const vm = this

        // Nova.request().get('/nova-vendor/setting')
        //     .then(response => {
        //         vm.settingConfig = response.data.settingConfig
        //         vm.settings = response.data.settings
        //         setTimeout(() => { vm.loading = false }, 200)
        // })

          vm.loadDefaultSetting()
    },

    methods: {
        handleToggle(key) {
            this.settings[key] = !this.settings[key]
        },

        handleInput(input) {
            this.settings[input.key] = input.value
        },

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
        loadDefaultSetting() {
            Nova.request().get("/nova-vendor/setting")
                .then(response => {
                    this.app = response.data.setting.app
                    setTimeout(() => { this.loading = false }, 200)   
                })
                .catch(() => this.error = true)
        },
        updateSetting() {
                this.loading = true 
                this.errors = [];
                console.log(this.app)
                Nova.request().put("/nova-vendor/setting",{data:{app:this.app}})
                .then(response => {
                    this.app = response.data.setting.app
                    this.admin = response.data.setting.admin
                    setTimeout(() => { this.loading = false }, 200)
                    this.$toasted.success(response.data.message, {
                        duration : 3000,
                         //onComplete : () => window.location.reload(true)
                    })
                })
                .catch((error) => {
                   // console.log(error.response.data.errors)
                     this.errors = error.response.data.errors;
                     setTimeout(() => { this.loading = false }, 200)
                    // console.log(this.errors['data.app.name'])
                 })
        },
         /*
        Handles a change on the file upload
      */
      handleFileUpload(){
       // console.log(this.$refs.file.files)
        this.file = this.$refs.file.files[0];
         this.loading = true;
        const fd = new FormData();
             fd.append('image',this.file,this.file.name)
                Nova.request().post("/nova-vendor/setting/uploadImage",fd)
                .then(response => {
                    this.app.logo = response.data;
                    setTimeout(() => { this.loading = false }, 200)
                    this.$toasted.success(response.data.message, {
                        duration : 3000,
                        // onComplete : () => window.location.reload(true)
                    })
                })
                .catch((error) => {
                    console.log(error.response.data.errors)
                     this.errors = error.response.data.errors;
                     setTimeout(() => { this.loading = false }, 200)
                    // console.log(this.errors['data.app.name'])
                })
              // setTimeout(() => { this.loading = false }, 200)

      },
      getLogo(logo){

        return '../uploads/'+logo;

      },
    }
}
</script>
