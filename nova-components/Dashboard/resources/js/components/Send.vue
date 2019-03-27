<template>
    <div class="relative">
        <div v-if="loading" class="rounded-lg flex items-center justify-center absolute pin z-50 bg-40 -m-4">
            <loader class="text-60" />
        </div>

        <div>
        <heading class="mb-6">Send Newsletter</heading>
                <div class="card">
                    <form @submit.prevent="send">
                        <div>
                            <!--div class="flex border-b border-40">
                                <div class="w-1/4 px-8 py-6">
                                    <label class="inline-block text-80 h-9 pt-2">Title</label>
                                    <p class="text-sm leading-normal text-80 italic"></p>
                                </div>
                                <div class="w-3/4 px-8 py-6">
                                    <input v-model="data.title" name="name" placeholder="Title" type="text" class="w-full form-control form-input form-input-bordered">
                                    <div v-if="errors['data.title']" :class="['help-text error-text mt-2 text-danger']">
                                        @{{ errors['data.title'][0] }}
                                    </div> 
                                </div>
                            </div-->
                         
                            <div class="flex border-b border-40">
                                <div class="w-1/4 px-8 py-6">
                                    <label class="inline-block text-80 h-9 pt-2" for="Subscriber">Subscriber</label>
                                    <p class="text-sm leading-normal text-80 italic"></p>
                                </div>

                                <div class="w-1/4 px-8 py-6">
                                    <select v-model="data.subscriber" class="w-full form-control form-input form-input-bordered">
                                        <option value="">-Select Subscriber-</option>
                                        <option value="all">All</option>
                                        <option v-for="subscriber in subscribers" :value="subscriber.email">{{ subscriber.email }}</option>
                                    </select>
                                    <div v-if="errors['data.subscriber']" :class="['help-text error-text mt-2 text-danger']">
                                        @{{ errors['data.subscriber'][0] }}
                                    </div> 
                                </div>
                            </div>

                            <div class="flex border-b border-40">
                                <div class="w-1/4 px-8 py-6">
                                    <label class="inline-block text-80 h-9 pt-2" for="Newsletter">Newsletter</label>
                                    <p class="text-sm leading-normal text-80 italic"></p>
                                </div>
                                <div class="w-1/4 px-8 py-6">
                                    <select v-model="data.newsletter" class="w-full form-control form-input form-input-bordered">
                                        <option value="">-Select Newsletter-</option>
                                        <option v-for="newsletter in newsletters" :value="newsletter.id">{{ newsletter.title }}</option>
                                    </select>
                                    <div v-if="errors['data.newsletter']" :class="['help-text error-text mt-2 text-danger']">
                                        @{{ errors['data.newsletter'][0] }}
                                    </div> 
                                </div>
                            </div>

                            
                        </div>
                        <div class="bg-30 flex px-8 py-4">
                            <button type="submit" class="ml-auto btn btn-default btn-primary mr-3">
                                Send
                            </button>
                        </div>
                    </form>
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
        errors: [],
        file:'',
        subscribers:[],
        newsletters:[],
        data:{'subscriber':'','newsletter':''},
     }),

    mounted() {
        const vm = this
        this.loading = false;
        vm.getSubscriber()
    },

    methods: {
        getSubscriber() {
            Nova.request().get("/nova-vendor/newsletter/getSubscriber/")
                .then(response => {
                    this.subscribers = response.data.subscribers
                    this.newsletters = response.data.newsletter
                    setTimeout(() => { this.loading = false }, 200)   
                })
                .catch(() => this.error = true)
        },
        send() {
                this.loading = true 
                this.errors = [];
                Nova.request().post("/nova-vendor/newsletter/send",{data:this.data})
                .then(response => {
                     this.data = response.data.data
                    setTimeout(() => { this.loading = false }, 200)
                    if(response.data.status == 1){
                        this.$toasted.success(response.data.message, {
                        duration : 3000,
                        // onComplete : () => this.$router.push('/newsletter')
                    })

                    }else{
                        setTimeout(() => { this.loading = false }, 200)
                        this.$toasted.error(response.data.message, {
                        duration : 2000,
                        //onComplete : () => this.$router.push('/newsletter')
                    })

                    }
                    
                })
                .catch((error) => {
                    console.log(error.response.data.errors)
                     this.errors = error.response.data.errors;
                     setTimeout(() => { this.loading = false }, 200)
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
                    //console.log(error.response.data.errors)
                     this.errors = error.response.data.errors;
                     setTimeout(() => { this.loading = false }, 200)
                    // console.log(this.errors['data.app.name'])
                })
              // setTimeout(() => { this.loading = false }, 200)

      },
    }
}
</script>
