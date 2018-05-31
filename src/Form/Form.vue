<template>
    <div>
        <p v-html="formData.title"></p>
        <form id="vw-user-form-registration" @submit.prevent="handleSubmit" novalidate="true">
            <form-field v-for="field in formData.properties" :key="field.id" :field="field" v-on:change="handleChange"></form-field>
            <input type="submit" value="Submit" :disabled="isDisabled">
        </form>
    </div>
</template>

<script>

    import FormField from "./FormField";

    import _ from 'lodash';

    export default {

        components: {
            FormField
        },
        mounted(){
            const requiredFields = _.filter( this.formData.properties, 'required' );
            for( let i = 0, m = requiredFields.length; i<m;i++){
                this.requiredFields[ requiredFields[i].id ] = {
                    valid: false
                }
            }
        },
        methods: {
            handleSubmit() {
                this.submit(this.userData);
            },
            handleChange( payload ){
                this.userData[ payload.id ] = payload.value;
                this.isDisabled = false;
            },
            submit(){
                console.error( 'The submit() method should be overridden.' )
            }
        },
        data() {
            return {
                userData: {},
                formData: {},
                isDisabled: true,
                requiredFields: {}
            }
        },
    }
</script>