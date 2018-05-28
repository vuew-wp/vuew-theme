<template>
    <form>
        <!--<label class="uk-form-label uk-width-1-1 uk-h2" for="search">Search</label>-->
        <v-select v-model="selected" :options="['foo','bar']"></v-select>
    </form>
</template>

<script>

    import vSelect from 'vue-select'

    export default {

        props: [
            'defaultValue'
        ],

        components:{
            vSelect
        },

        data(){
            return {
                selected: null
            }
        }

    };
</script>
