<template>
    <vw-form :form-data="formData"></vw-form>
</template>

<script>

    import {HTTP_Vuew} from '../common/http_proxy';

    /**
     * Forms
     */
    import VwForm from "../Form/Form";
    import userFormJSON from '../Form/user-registration.json';

    export default {

        components: {
            VwForm
        },

        props: [],

        mounted() {
            console.log(userFormJSON);
        },

        methods: {
            submit( data ) {

                console.log(data);

                const vm = this;

                HTTP_Vuew.get( 'user/register', {
                    params: {
                        'poo': 'pooop'
                    }
                }).then(res => {
                    console.log(res.data);
                });
            }
        },

        data() {
            return {
                formData: userFormJSON
            }
        }

    };
</script>
