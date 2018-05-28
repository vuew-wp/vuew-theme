<template>
    <div>
        <p v-html="formData.title"></p>
        <form id="vw-user-form-registration" @submit.prevent="handleSubmit" novalidate="true">
            <form-field v-for="field in formData.properties" :key="field.id" :field="field" v-on:keyup="handleChange"></form-field>
            <input type="submit" value="Submit">
        </form>
    </div>
</template>

<script>

    import FormField from "./FormField";

    export default {

        components: {
            FormField
        },
        mounted(){
           // console.log(this.fields)
        },
        methods: {
            handleSubmit() {
                //this.formPayload;
                this.$parent.submit(this.formModel)
            },
            handleChange( payload ){
                this.formModel[ payload.id ] = payload.value;
                console.log("CHAMNGED",this.formModel,this.formData);
            }
        },
        props: {
            formData: {
                type: Object
            },
        },
        data() {
            return {
                formModel: {}
            }
        },
    }
</script>