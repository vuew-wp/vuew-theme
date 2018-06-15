<template>
    <div class="uk-padding-large">
        <h3 class="uk-h3" v-html="formData.title"></h3>
        <p v-html="status"></p>
        <form @submit.prevent="handleSubmit" novalidate="true" class="uk-grid uk-form-stacked">

            <div v-for="field in formData.properties" :key="field.id" class="uk-width-1-1">

                <form-field v-if="'text' === field.type || 'email' === field.type" :field="field"
                            v-on:input="handleChange"/>

                <form-field-password v-else-if="'password' === field.type" :field="field"
                                     v-on:input="handleChange"/>

            </div>

            <div class="uk-width-1-1">
                <input type="submit" value="Submit" class="uk-button uk-button-default" :disabled="isDisabled">
            </div>

        </form>
    </div>
</template>

<script>


    import _ from 'lodash';
    import {HTTP_Vuew} from '../common/http_proxy';

    import FormField from "./FormField";
    import FormFieldPassword from "./FormFieldPassword";

    export default {

        components: {
            FormField,
            FormFieldPassword,
        },
        mounted() {
            const requiredFields = _.filter(this.formData.properties, 'required');
            for (let i = 0, m = requiredFields.length; i < m; i++) {
                this.requiredFields[requiredFields[i].id] = {
                    valid: false
                }
            }
        },
        methods: {
            handleSubmit() {
                this.submit(this.userData);
            },
            handleChange(payload) {
                this.userData[ payload.id ] = payload.value;
                this.requiredFields[ payload.id ].valid = payload.valid;

                this.isDisabled = _.findKey(this.requiredFields, [ 'valid', false ]);

            },
            submit( data ) {
                this.status = "Submitting info...";
                data['nonce'] = Vuew.nonces.userAuth;
                HTTP_Vuew.post( this.endPoint, {
                    params: data
                }).then(response => {
                    this.status = response.data.message;
                }).catch(error => {
                    this.handleError(error.response.data);
                });
            },
            handleError( data ){
                console.log(data);
                this.status = data.message;
            }
        },
        data() {
            return {
                status: "",
                userData: {},
                formData: {},
                isDisabled: true,
                requiredFields: {}
            }
        },
    }
</script>